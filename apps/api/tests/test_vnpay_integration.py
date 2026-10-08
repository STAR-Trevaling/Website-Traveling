from decimal import Decimal
from unittest.mock import patch

import pytest
from rest_framework.test import APIClient

from bookings.models import Booking
from integrations.models import IntegrationOutbox
from payments.adapters.vnpay import VNPayAdapter
from payments.models import PaymentTransaction
from payments.services import PaymentService


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def vnpay_adapter():
    return VNPayAdapter(
        tmn_code="TEST_TMN",
        hash_secret="TEST_HASH_SECRET_KEY_1234567890",
        payment_url="https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
        return_url="http://localhost:3000/payment/return",
    )


@pytest.fixture
def payment_service(vnpay_adapter):
    return PaymentService(vnpay_adapter=vnpay_adapter)


@pytest.fixture
def sample_booking(db):
    return Booking.objects.create(
        booking_code="ST-202610-TEST01",
        contact_name="Nguyễn Văn A",
        contact_email="nguyenvana@example.com",
        contact_phone="0901234567",
        pax_adults=2,
        total_amount=Decimal("5000000.00"),
        currency="VND",
        status=Booking.Status.PENDING,
        payment_status="unpaid",
    )


def test_vnpay_adapter_url_generation_and_signature(vnpay_adapter):
    result = vnpay_adapter.generate_payment_url(
        txn_ref="ST-202610-TEST01_1728384000",
        amount=5000000,
        order_info="Thanh toan don hang ST-202610-TEST01",
        client_ip="127.0.0.1",
        locale="vn",
        bank_code="VNBANK",
    )

    url = result["payment_url"]
    assert "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?" in url
    assert "vnp_Amount=500000000" in url  # Multiplied by 100
    assert "vnp_Command=pay" in url
    assert "vnp_CurrCode=VND" in url
    assert "vnp_Locale=vn" in url
    assert "vnp_TmnCode=TEST_TMN" in url
    assert "vnp_TxnRef=ST-202610-TEST01_1728384000" in url
    assert "vnp_BankCode=VNBANK" in url
    assert "vnp_SecureHash=" in url

    # Test signature verification on generated params
    signed_data = dict(result["params"])
    signed_data["vnp_SecureHash"] = result["secure_hash"]
    assert vnpay_adapter.verify_ipn_signature(signed_data) is True


def test_vnpay_ipn_signature_verification_failure(vnpay_adapter, payment_service, db):
    tampered_data = {
        "vnp_Amount": "500000000",
        "vnp_TxnRef": "ST-202610-TEST01_1728384000",
        "vnp_ResponseCode": "00",
        "vnp_SecureHash": "invalid_tampered_hash_12345",
    }
    rsp = payment_service.process_vnpay_ipn(tampered_data)
    assert rsp["RspCode"] == "97"
    assert rsp["Message"] == "Invalid Checksum"


def test_vnpay_ipn_order_not_found(vnpay_adapter, payment_service, db):
    # Valid signature for non-existent transaction
    payload = {
        "vnp_Amount": "500000000",
        "vnp_Command": "pay",
        "vnp_ResponseCode": "00",
        "vnp_TmnCode": vnpay_adapter.tmn_code,
        "vnp_TxnRef": "NON_EXISTENT_TXN_REF",
    }
    sorted_items = sorted(payload.items())
    import urllib.parse

    query_string = urllib.parse.urlencode(sorted_items, quote_via=urllib.parse.quote_plus)
    payload["vnp_SecureHash"] = vnpay_adapter._hmac_sha512(vnpay_adapter.hash_secret, query_string)

    rsp = payment_service.process_vnpay_ipn(payload)
    assert rsp["RspCode"] == "01"
    assert rsp["Message"] == "Order not found"


def test_vnpay_ipn_invalid_amount(vnpay_adapter, payment_service, sample_booking, db):
    txn_ref = f"{sample_booking.booking_code}_amount_test"
    PaymentTransaction.objects.create(
        booking=sample_booking,
        transaction_code=txn_ref,
        provider="vnpay",
        amount=sample_booking.total_amount,  # 5,000,000 VND
        currency="VND",
        status=PaymentTransaction.Status.PENDING,
        idempotency_key=f"vnpay:{txn_ref}",
    )

    # VNPay sends 2,000,000 VND instead of 5,000,000 VND
    payload = {
        "vnp_Amount": "200000000",  # 2,000,000 * 100
        "vnp_Command": "pay",
        "vnp_ResponseCode": "00",
        "vnp_TmnCode": vnpay_adapter.tmn_code,
        "vnp_TxnRef": txn_ref,
    }
    import urllib.parse

    sorted_items = sorted(payload.items())
    query_string = urllib.parse.urlencode(sorted_items, quote_via=urllib.parse.quote_plus)
    payload["vnp_SecureHash"] = vnpay_adapter._hmac_sha512(vnpay_adapter.hash_secret, query_string)

    rsp = payment_service.process_vnpay_ipn(payload)
    assert rsp["RspCode"] == "04"
    assert rsp["Message"] == "Invalid amount"


@patch("payments.services.dispatch_outbox_event.delay")
def test_vnpay_ipn_success_confirms_booking_and_emits_outbox(
    mock_dispatch, vnpay_adapter, payment_service, sample_booking, db
):
    txn_ref = f"{sample_booking.booking_code}_success_test"
    PaymentTransaction.objects.create(
        booking=sample_booking,
        transaction_code=txn_ref,
        provider="vnpay",
        amount=sample_booking.total_amount,  # 5,000,000 VND
        currency="VND",
        status=PaymentTransaction.Status.PENDING,
        idempotency_key=f"vnpay:{txn_ref}",
    )

    payload = {
        "vnp_Amount": "500000000",
        "vnp_BankCode": "NCB",
        "vnp_BankTranNo": "VNP14285992",
        "vnp_CardType": "ATM",
        "vnp_Command": "pay",
        "vnp_OrderInfo": f"Thanh toan don hang {sample_booking.booking_code}",
        "vnp_PayDate": "20261008183000",
        "vnp_ResponseCode": "00",
        "vnp_TmnCode": vnpay_adapter.tmn_code,
        "vnp_TransactionNo": "14285992",
        "vnp_TransactionStatus": "00",
        "vnp_TxnRef": txn_ref,
    }
    import urllib.parse

    sorted_items = sorted(payload.items())
    query_string = urllib.parse.urlencode(sorted_items, quote_via=urllib.parse.quote_plus)
    payload["vnp_SecureHash"] = vnpay_adapter._hmac_sha512(vnpay_adapter.hash_secret, query_string)

    rsp = payment_service.process_vnpay_ipn(payload)
    assert rsp["RspCode"] == "00"
    assert rsp["Message"] == "Confirm Success"

    # Verify transaction record
    txn = PaymentTransaction.objects.get(transaction_code=txn_ref)
    assert txn.status == PaymentTransaction.Status.SUCCESS
    assert txn.provider_ref == "14285992"
    assert txn.completed_at is not None

    # Verify booking status
    sample_booking.refresh_from_db()
    assert sample_booking.status == Booking.Status.CONFIRMED
    assert sample_booking.payment_status == "captured"

    # Verify Outbox event created
    outbox = IntegrationOutbox.objects.filter(event_type="booking.paid").first()
    assert outbox is not None
    assert outbox.payload["data"]["booking_code"] == sample_booking.booking_code
    assert outbox.payload["data"]["transaction_code"] == txn_ref
    assert mock_dispatch.called


def test_vnpay_ipn_idempotency_duplicate_calls(vnpay_adapter, payment_service, sample_booking, db):
    txn_ref = f"{sample_booking.booking_code}_idempotency_test"
    PaymentTransaction.objects.create(
        booking=sample_booking,
        transaction_code=txn_ref,
        provider="vnpay",
        amount=sample_booking.total_amount,
        currency="VND",
        status=PaymentTransaction.Status.SUCCESS,  # Already confirmed
        idempotency_key=f"vnpay:{txn_ref}",
    )

    payload = {
        "vnp_Amount": "500000000",
        "vnp_Command": "pay",
        "vnp_ResponseCode": "00",
        "vnp_TmnCode": vnpay_adapter.tmn_code,
        "vnp_TransactionNo": "14285992",
        "vnp_TxnRef": txn_ref,
    }
    import urllib.parse

    sorted_items = sorted(payload.items())
    query_string = urllib.parse.urlencode(sorted_items, quote_via=urllib.parse.quote_plus)
    payload["vnp_SecureHash"] = vnpay_adapter._hmac_sha512(vnpay_adapter.hash_secret, query_string)

    # Calling IPN a second time
    rsp = payment_service.process_vnpay_ipn(payload)
    assert rsp["RspCode"] == "02"
    assert rsp["Message"] == "Order already confirmed"


def test_vnpay_ipn_failure_code_keeps_booking_pending(
    vnpay_adapter, payment_service, sample_booking, db
):
    txn_ref = f"{sample_booking.booking_code}_fail_test"
    PaymentTransaction.objects.create(
        booking=sample_booking,
        transaction_code=txn_ref,
        provider="vnpay",
        amount=sample_booking.total_amount,
        currency="VND",
        status=PaymentTransaction.Status.PENDING,
        idempotency_key=f"vnpay:{txn_ref}",
    )

    payload = {
        "vnp_Amount": "500000000",
        "vnp_Command": "pay",
        "vnp_ResponseCode": "24",  # Customer canceled
        "vnp_TmnCode": vnpay_adapter.tmn_code,
        "vnp_TransactionNo": "0",
        "vnp_TxnRef": txn_ref,
    }
    import urllib.parse

    sorted_items = sorted(payload.items())
    query_string = urllib.parse.urlencode(sorted_items, quote_via=urllib.parse.quote_plus)
    payload["vnp_SecureHash"] = vnpay_adapter._hmac_sha512(vnpay_adapter.hash_secret, query_string)

    rsp = payment_service.process_vnpay_ipn(payload)
    assert rsp["RspCode"] == "00"  # Acknowledged

    txn = PaymentTransaction.objects.get(transaction_code=txn_ref)
    assert txn.status == PaymentTransaction.Status.FAILED
    assert txn.error_code == "24"

    sample_booking.refresh_from_db()
    assert sample_booking.status == Booking.Status.PENDING  # Customer can retry


def test_payment_create_endpoint(api_client, sample_booking, db):
    response = api_client.post(
        "/api/v1/payments/create/",
        {
            "booking_code": sample_booking.booking_code,
            "gateway": "vnpay",
            "locale": "vn",
        },
        format="json",
    )
    assert response.status_code == 201
    data = response.json()
    assert "payment_url" in data
    assert "transaction_code" in data
    assert data["amount"] == "5000000.00"
    assert data["gateway"] == "vnpay"


def test_payment_query_endpoint(api_client, sample_booking, db):
    txn_ref = f"{sample_booking.booking_code}_query_test"
    PaymentTransaction.objects.create(
        booking=sample_booking,
        transaction_code=txn_ref,
        provider="vnpay",
        amount=sample_booking.total_amount,
        currency="VND",
        status=PaymentTransaction.Status.SUCCESS,
        idempotency_key=f"vnpay:{txn_ref}",
    )

    response = api_client.get(f"/api/v1/payments/query/?txn_ref={txn_ref}")
    assert response.status_code == 200
    data = response.json()
    assert data["transaction_code"] == txn_ref
    assert data["booking_code"] == sample_booking.booking_code
    assert data["status"] == "success"
    assert data["is_paid"] is True
