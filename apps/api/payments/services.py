import logging
import uuid
from decimal import Decimal
from typing import Any

from django.db import transaction
from django.utils import timezone
from rest_framework.exceptions import ValidationError

from bookings.models import Booking
from integrations.models import IntegrationOutbox
from integrations.tasks import dispatch_outbox_event

from .adapters.vietqr import VietQRAdapter
from .adapters.vnpay import VNPayAdapter
from .models import PaymentTransaction

logger = logging.getLogger(__name__)


class PaymentService:
    def __init__(
        self,
        vnpay_adapter: VNPayAdapter | None = None,
        vietqr_adapter: VietQRAdapter | None = None,
    ):
        self.vnpay = vnpay_adapter or VNPayAdapter()
        self.vietqr = vietqr_adapter or VietQRAdapter()

    def create_vnpay_payment(
        self,
        booking_code: str,
        client_ip: str,
        bank_code: str | None = None,
        locale: str = "vn",
        return_url: str | None = None,
    ) -> dict[str, Any]:
        """
        Generates VNPay payment URL for a valid booking and persists PaymentTransaction.
        """
        booking = Booking.objects.filter(booking_code=booking_code).first()
        if not booking:
            raise ValidationError(
                {"booking_code": f"Không tìm thấy đơn đặt tour với mã {booking_code}."}
            )

        if booking.status in (Booking.Status.PAID, Booking.Status.COMPLETED):
            raise ValidationError(
                {"booking_code": "Đơn đặt tour đã được thanh toán thành công trước đó."}
            )

        if booking.status == Booking.Status.CANCELLED:
            raise ValidationError({"booking_code": "Đơn đặt tour đã bị hủy, không thể thanh toán."})

        now = timezone.now()
        timestamp = int(now.timestamp())
        txn_ref = f"{booking.booking_code}_{timestamp}"
        order_info = f"Thanh toan don hang {booking.booking_code}"

        # Generate payment URL via adapter
        gen_result = self.vnpay.generate_payment_url(
            txn_ref=txn_ref,
            amount=float(booking.total_amount),
            order_info=order_info,
            client_ip=client_ip,
            bank_code=bank_code,
            locale=locale,
            return_url=return_url,
            created_at=now,
            expire_minutes=15,
        )

        # Create PaymentTransaction record
        txn = PaymentTransaction.objects.create(
            booking=booking,
            transaction_code=txn_ref,
            provider=PaymentTransaction.Provider.VNPAY,
            amount=booking.total_amount,
            currency=booking.currency,
            status=PaymentTransaction.Status.PENDING,
            idempotency_key=f"vnpay:{txn_ref}",
            request_payload=gen_result["params"],
            expires_at=gen_result["expires_at"],
        )

        return {
            "payment_url": gen_result["payment_url"],
            "transaction_code": txn.transaction_code,
            "booking_code": booking.booking_code,
            "amount": str(booking.total_amount),
            "currency": booking.currency,
            "gateway": "vnpay",
            "expires_at": gen_result["expires_at"].isoformat(),
        }

    def create_vietqr_payment(
        self,
        booking_code: str,
        expires_minutes: int = 15,
    ) -> dict[str, Any]:
        """
        Generates VietQR payload (NAPAS QuickLink, pure EMVCo string, and fallback bank details)
        for a valid booking and persists PaymentTransaction in PENDING state.
        """
        booking = Booking.objects.filter(booking_code=booking_code).first()
        if not booking:
            raise ValidationError(
                {"booking_code": f"Không tìm thấy đơn đặt tour với mã {booking_code}."}
            )

        if booking.status in (Booking.Status.PAID, Booking.Status.COMPLETED):
            raise ValidationError(
                {"booking_code": "Đơn đặt tour đã được thanh toán thành công trước đó."}
            )

        if booking.status == Booking.Status.CANCELLED:
            raise ValidationError({"booking_code": "Đơn đặt tour đã bị hủy, không thể thanh toán."})

        now = timezone.now()
        timestamp = int(now.timestamp())
        txn_ref = f"{booking.booking_code}_{timestamp}"

        # Generate VietQR payload via adapter
        qr_res = self.vietqr.generate_qr_payload(
            txn_ref=txn_ref,
            booking_code=booking.booking_code,
            amount=booking.total_amount,
            expires_minutes=expires_minutes,
            created_at=now,
        )

        # Update booking payment method
        booking.payment_method = "vietqr"
        booking.save(update_fields=["payment_method", "updated_at"])

        # Create PaymentTransaction record
        txn = PaymentTransaction.objects.create(
            booking=booking,
            transaction_code=txn_ref,
            provider=PaymentTransaction.Provider.VIETQR,
            amount=booking.total_amount,
            currency=booking.currency,
            status=PaymentTransaction.Status.PENDING,
            idempotency_key=f"vietqr:{txn_ref}",
            request_payload=qr_res["payload"],
            expires_at=qr_res["expires_at"],
        )

        return {
            "payment_id": str(txn.id),
            "transaction_code": txn.transaction_code,
            "booking_code": booking.booking_code,
            "amount": str(booking.total_amount),
            "currency": booking.currency,
            "gateway": "vietqr",
            "status": txn.status,
            "expires_at": qr_res["expires_at"].isoformat(),
            "qr_code_url": qr_res["quicklink_url"],
            "emvco_payload": qr_res["emvco_payload"],
            "bank_info": qr_res["bank_info"],
        }

    @transaction.atomic
    def process_vnpay_ipn(self, data: dict[str, Any]) -> dict[str, str]:
        """
        Processes server-to-server VNPay IPN webhook according to specification.
        Returns standardized JSON response for VNPay.
        """
        # Step 1: Verify Checksum signature first
        if not self.vnpay.verify_ipn_signature(data):
            logger.warning("VNPay IPN signature verification failed.")
            return {"RspCode": "97", "Message": "Invalid Checksum"}

        txn_ref = data.get("vnp_TxnRef")
        if not txn_ref:
            return {"RspCode": "01", "Message": "Order not found"}

        # Step 2: Check txn_ref exists in database with row-level lock
        txn = (
            PaymentTransaction.objects.select_for_update()
            .filter(transaction_code=str(txn_ref))
            .select_related("booking")
            .first()
        )
        if not txn:
            logger.warning(f"VNPay IPN transaction not found: {txn_ref}")
            return {"RspCode": "01", "Message": "Order not found"}

        # Step 3: Check amount matches
        raw_vnp_amount = data.get("vnp_Amount")
        if raw_vnp_amount is None:
            return {"RspCode": "04", "Message": "Invalid amount"}

        try:
            vnp_amount = Decimal(int(str(raw_vnp_amount))) / Decimal(100)
        except (TypeError, ValueError):
            return {"RspCode": "04", "Message": "Invalid amount"}

        if txn.amount != vnp_amount:
            logger.warning(
                f"VNPay IPN amount mismatch for {txn_ref}: expected {txn.amount}, received {vnp_amount}"
            )
            return {"RspCode": "04", "Message": "Invalid amount"}

        # Step 4: Check Idempotency - if already success, do not double-process
        if txn.status == PaymentTransaction.Status.SUCCESS:
            logger.info(f"VNPay IPN transaction {txn_ref} already confirmed previously.")
            return {"RspCode": "02", "Message": "Order already confirmed"}

        response_code = str(data.get("vnp_ResponseCode", ""))
        provider_ref = str(data.get("vnp_TransactionNo", ""))

        # Step 5: If ResponseCode == '00', payment succeeded
        if response_code == "00":
            now = timezone.now()
            txn.status = PaymentTransaction.Status.SUCCESS
            txn.provider_ref = provider_ref
            txn.response_payload = data
            txn.completed_at = now
            txn.save(update_fields=["status", "provider_ref", "response_payload", "completed_at"])

            booking = txn.booking
            if booking:
                booking.status = Booking.Status.CONFIRMED
                booking.payment_status = "captured"
                booking.save(update_fields=["status", "payment_status", "updated_at"])

                # Emit Transactional Outbox Event for Odoo ERP sync
                try:
                    event_id = str(uuid.uuid4())
                    envelope = {
                        "event_id": event_id,
                        "event_type": "booking.paid",
                        "event_version": 1,
                        "source": "vnpay_gateway",
                        "occurred_at": now.isoformat(),
                        "data": {
                            "booking_id": str(booking.id),
                            "booking_code": booking.booking_code,
                            "transaction_code": txn.transaction_code,
                            "gateway_transaction_no": txn.provider_ref,
                            "amount": float(txn.amount),
                            "currency": txn.currency,
                            "paid_at": now.isoformat(),
                        },
                    }
                    outbox = IntegrationOutbox.objects.create(
                        event_id=event_id,
                        event_type="booking.paid",
                        event_version=1,
                        source="vnpay_gateway",
                        payload=envelope,
                        state=IntegrationOutbox.State.PENDING,
                    )
                    dispatch_outbox_event.delay(str(outbox.id))
                except Exception as exc:
                    logger.warning(f"Failed to enqueue booking.paid outbox event: {exc}")

                logger.info(
                    f"VNPay IPN payment success for booking {booking.booking_code} ({txn_ref})"
                )
            return {"RspCode": "00", "Message": "Confirm Success"}

        # Step 6: If ResponseCode != '00', payment failed
        txn.status = PaymentTransaction.Status.FAILED
        txn.error_code = response_code
        txn.response_payload = data
        txn.save(update_fields=["status", "error_code", "response_payload"])

        logger.info(f"VNPay IPN payment failed with code {response_code} for {txn_ref}")
        return {"RspCode": "00", "Message": "Confirm Success"}

    @transaction.atomic
    def confirm_vietqr_payment(
        self,
        identifier: str,
        payload: dict[str, Any],
    ) -> dict[str, Any]:
        """
        Processes inbound VietQR confirmation from Odoo ERP (manual accounting confirmation or SePay).
        Updates transaction state to SUCCESS and booking state to PAID.
        """
        # 1. Lookup transaction by UUID id or transaction_code
        query = PaymentTransaction.objects.select_for_update().select_related("booking")
        txn = None
        try:
            val_uuid = uuid.UUID(str(identifier))
            txn = query.filter(id=val_uuid).first()
        except (ValueError, TypeError):
            pass

        if not txn:
            txn = query.filter(transaction_code=str(identifier)).first()

        if not txn:
            raise ValidationError(
                {"detail": f"Không tìm thấy giao dịch thanh toán với mã {identifier}."}
            )

        # 2. Check Idempotency: if already SUCCESS, return idempotent acknowledgement
        if txn.status == PaymentTransaction.Status.SUCCESS:
            logger.info(f"VietQR transaction {txn.transaction_code} already confirmed previously.")
            return {
                "status": "already_confirmed",
                "message": "Giao dịch đã được xác nhận thanh toán trước đó.",
                "payment_id": str(txn.id),
                "transaction_code": txn.transaction_code,
                "booking_code": txn.booking.booking_code if txn.booking else "",
                "state": "success",
            }

        # 3. Check amount match (log warning if mismatch per Odoo contract)
        raw_amount_confirmed = payload.get("amount_confirmed")
        if raw_amount_confirmed is not None:
            try:
                amount_confirmed = Decimal(str(raw_amount_confirmed))
                if amount_confirmed != txn.amount:
                    logger.warning(
                        f"VietQR confirmation amount mismatch for {txn.transaction_code}: "
                        f"expected {txn.amount}, confirmed {amount_confirmed}. Accepting per Odoo decision."
                    )
            except (ValueError, TypeError):
                logger.warning(f"Could not parse amount_confirmed: {raw_amount_confirmed}")

        # 4. Update transaction
        now = timezone.now()
        confirmed_by = str(payload.get("confirmed_by", payload.get("source", "odoo_erp")))
        txn.status = PaymentTransaction.Status.SUCCESS
        txn.provider_ref = confirmed_by
        txn.response_payload = payload
        txn.completed_at = now
        txn.save(update_fields=["status", "provider_ref", "response_payload", "completed_at"])

        # 5. Update booking state to PAID & captured
        booking = txn.booking
        if booking:
            booking.status = Booking.Status.PAID
            booking.payment_status = "captured"
            booking.payment_method = "vietqr"
            booking.save(update_fields=["status", "payment_status", "payment_method", "updated_at"])

            # Emit Transactional Outbox Event for Odoo ERP sync
            try:
                event_id = str(uuid.uuid4())
                envelope = {
                    "event_id": event_id,
                    "event_type": "booking.paid",
                    "event_version": 1,
                    "source": "vietqr_odoo_confirm",
                    "occurred_at": now.isoformat(),
                    "data": {
                        "booking_id": str(booking.id),
                        "booking_code": booking.booking_code,
                        "transaction_code": txn.transaction_code,
                        "gateway_transaction_no": txn.provider_ref,
                        "amount": float(txn.amount),
                        "currency": txn.currency,
                        "paid_at": now.isoformat(),
                        "source": payload.get("source", "manual_odoo_ui"),
                    },
                }
                outbox = IntegrationOutbox.objects.create(
                    event_id=event_id,
                    event_type="booking.paid",
                    event_version=1,
                    source="vietqr_odoo_confirm",
                    payload=envelope,
                    state=IntegrationOutbox.State.PENDING,
                )
                dispatch_outbox_event.delay(str(outbox.id))
            except Exception as exc:
                logger.warning(f"Failed to enqueue booking.paid outbox event for VietQR: {exc}")

            logger.info(
                f"VietQR payment confirmed for booking {booking.booking_code} "
                f"({txn.transaction_code}) by {confirmed_by}"
            )

        return {
            "status": "success",
            "message": "Xác nhận thanh toán VietQR thành công.",
            "payment_id": str(txn.id),
            "transaction_code": txn.transaction_code,
            "booking_code": booking.booking_code if booking else "",
            "state": "success",
        }

    def query_transaction_status(self, identifier: str) -> dict[str, Any] | None:
        """
        Queries database transaction state for frontend return/polling verification.
        Accepts either transaction UUID (id) or transaction_code.
        """
        query = PaymentTransaction.objects.select_related("booking")
        txn = None
        try:
            val_uuid = uuid.UUID(str(identifier))
            txn = query.filter(id=val_uuid).first()
        except (ValueError, TypeError):
            pass

        if not txn:
            txn = query.filter(transaction_code=str(identifier)).first()

        if not txn:
            return None

        # Auto-expire pending transaction if expired_at has passed
        if (
            txn.status == PaymentTransaction.Status.PENDING
            and txn.expires_at
            and timezone.now() > txn.expires_at
        ):
            txn.status = PaymentTransaction.Status.EXPIRED
            txn.save(update_fields=["status"])

        booking_code = txn.booking.booking_code if txn.booking else ""

        return {
            "payment_id": str(txn.id),
            "transaction_code": txn.transaction_code,
            "booking_code": booking_code,
            "state": txn.status,
            "status": txn.status,
            "amount": str(txn.amount),
            "currency": txn.currency,
            "gateway": txn.provider,
            "provider_ref": txn.provider_ref,
            "created_at": txn.created_at.isoformat(),
            "completed_at": txn.completed_at.isoformat() if txn.completed_at else None,
            "expires_at": txn.expires_at.isoformat() if txn.expires_at else None,
            "is_paid": txn.status == PaymentTransaction.Status.SUCCESS,
        }
