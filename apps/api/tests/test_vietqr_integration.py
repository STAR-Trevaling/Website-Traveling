import hashlib
import hmac
import json
from datetime import timedelta
from decimal import Decimal
from unittest.mock import patch

import pytest
from django.conf import settings
from django.utils import timezone
from rest_framework.test import APIClient

from bookings.models import Booking
from integrations.models import IntegrationOutbox
from payments.models import PaymentTransaction
from payments.tasks import sweep_expired_payments


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def sample_booking(db):
    return Booking.objects.create(
        booking_code="ST-202610-VQR01",
        contact_name="Trần Thị B",
        contact_email="tranthib@example.com",
        contact_phone="0912345678",
        pax_adults=1,
        total_amount=Decimal("3500000.00"),
        currency="VND",
        status=Booking.Status.PENDING,
        payment_status="unpaid",
    )


@pytest.mark.django_db
def test_vietqr_create_payment_api(api_client, sample_booking):
    payload = {
        "booking_code": sample_booking.booking_code,
        "gateway": "vietqr",
    }
    response = api_client.post("/api/v1/payments/create/", data=payload, format="json")
    assert response.status_code == 201

    data = response.json()
    assert data["gateway"] == "vietqr"
    assert data["booking_code"] == sample_booking.booking_code
    assert data["status"] == "pending"
    assert "qr_code_url" in data
    assert "emvco_payload" in data
    assert "bank_info" in data
    assert data["bank_info"]["transfer_content"] == sample_booking.booking_code
    assert data["bank_info"]["amount"] == 3500000

    # Verify database persistence
    txn = PaymentTransaction.objects.get(transaction_code=data["transaction_code"])
    assert txn.status == PaymentTransaction.Status.PENDING
    assert txn.provider == PaymentTransaction.Provider.VIETQR
    assert txn.amount == Decimal("3500000.00")

    sample_booking.refresh_from_db()
    assert sample_booking.payment_method == "vietqr"


@pytest.mark.django_db
def test_vietqr_status_polling_api(api_client, sample_booking):
    create_res = api_client.post(
        "/api/v1/payments/create/",
        data={"booking_code": sample_booking.booking_code, "gateway": "vietqr"},
        format="json",
    )
    payment_id = create_res.json()["payment_id"]

    # Poll status by UUID
    status_res = api_client.get(f"/api/v1/payments/{payment_id}/status/")
    assert status_res.status_code == 200
    status_data = status_res.json()
    assert status_data["state"] == "pending"
    assert status_data["is_paid"] is False


@pytest.mark.django_db
def test_vietqr_confirm_hmac_unauthorized(api_client, sample_booking):
    create_res = api_client.post(
        "/api/v1/payments/create/",
        data={"booking_code": sample_booking.booking_code, "gateway": "vietqr"},
        format="json",
    )
    payment_id = create_res.json()["payment_id"]

    confirm_payload = {
        "payment_id": payment_id,
        "confirmed_by": "accounting_user",
        "amount_confirmed": 3500000,
        "source": "manual_odoo_ui",
    }

    # 1. Without HMAC signature header -> 401
    res_no_sig = api_client.post(
        f"/api/v1/payments/{payment_id}/vietqr-confirm/",
        data=confirm_payload,
        format="json",
    )
    assert res_no_sig.status_code == 401

    # 2. With invalid / tampered HMAC signature -> 401
    res_bad_sig = api_client.post(
        f"/api/v1/payments/{payment_id}/vietqr-confirm/",
        data=confirm_payload,
        format="json",
        HTTP_X_SIGNATURE_SHA256="invalid_tampered_signature_hex",
    )
    assert res_bad_sig.status_code == 401


@pytest.mark.django_db
def test_vietqr_confirm_success_and_idempotency(api_client, sample_booking):
    create_res = api_client.post(
        "/api/v1/payments/create/",
        data={"booking_code": sample_booking.booking_code, "gateway": "vietqr"},
        format="json",
    )
    payment_id = create_res.json()["payment_id"]
    secret = getattr(settings, "ODOO_WEBHOOK_SECRET", "")

    confirm_payload = {
        "payment_id": payment_id,
        "confirmed_by": "odoo_accountant_01",
        "confirmed_at": timezone.now().isoformat(),
        "amount_confirmed": 3500000,
        "source": "manual_odoo_ui",
    }
    raw_body = json.dumps(confirm_payload).encode("utf-8")
    sig = hmac.new(secret.encode("utf-8"), raw_body, hashlib.sha256).hexdigest()

    with patch("payments.services.dispatch_outbox_event.delay") as mock_dispatch:
        # Call 1: Success confirmation
        res = api_client.post(
            f"/api/v1/payments/{payment_id}/vietqr-confirm/",
            data=raw_body,
            content_type="application/json",
            HTTP_X_SIGNATURE_SHA256=sig,
        )
        assert res.status_code == 200
        assert res.json()["status"] == "success"

        # Verify DB updates
        txn = PaymentTransaction.objects.get(id=payment_id)
        assert txn.status == PaymentTransaction.Status.SUCCESS
        assert txn.provider_ref == "odoo_accountant_01"

        sample_booking.refresh_from_db()
        assert sample_booking.status == Booking.Status.PAID
        assert sample_booking.payment_status == "captured"

        # Verify Outbox event
        assert IntegrationOutbox.objects.filter(event_type="booking.paid").exists()
        assert mock_dispatch.called

        # Call 2: Idempotent replay call from Odoo
        res_replay = api_client.post(
            f"/api/v1/payments/{payment_id}/vietqr-confirm/",
            data=raw_body,
            content_type="application/json",
            HTTP_X_SIGNATURE_SHA256=sig,
        )
        assert res_replay.status_code == 200
        assert res_replay.json()["status"] == "already_confirmed"


@pytest.mark.django_db
def test_vietqr_expiration_sweep(sample_booking):
    # Create an expired pending transaction
    past_time = timezone.now() - timedelta(minutes=20)
    txn = PaymentTransaction.objects.create(
        booking=sample_booking,
        transaction_code="ST-EXPIRE-TEST-01",
        provider=PaymentTransaction.Provider.VIETQR,
        amount=sample_booking.total_amount,
        status=PaymentTransaction.Status.PENDING,
        idempotency_key="vietqr:ST-EXPIRE-TEST-01",
        expires_at=past_time,
    )

    count = sweep_expired_payments()
    assert count >= 1

    txn.refresh_from_db()
    assert txn.status == PaymentTransaction.Status.EXPIRED
