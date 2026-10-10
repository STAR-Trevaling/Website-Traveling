#!/usr/bin/env python
"""
Verification Suite for:
1. Marketing Attribution & UTM Tracking (Inquiry & Outbox Payload).
2. Inventory Hold Slot Release & Expiration Sweep (PaymentTransaction & Booking).
"""

import os
import sys
from datetime import timedelta
from decimal import Decimal
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

BASE_DIR = Path(__file__).resolve().parent.parent
API_DIR = BASE_DIR / "apps" / "api"
sys.path.insert(0, str(API_DIR))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
os.environ.setdefault("DJANGO_SECRET_KEY", "test-secret-key-for-verification-only-1234567890")
os.environ.setdefault("DJANGO_DEBUG", "1")
os.environ.setdefault("PYTEST_CURRENT_TEST", "1")

import django
django.setup()


from unittest.mock import MagicMock, patch
from rest_framework.test import APIRequestFactory

from bookings.serializers import BookingSerializer
from integrations.serializers import InquiryCreateSerializer
from integrations.views import InquiryCreateView
from payments.models import PaymentTransaction
from payments.tasks import sweep_expired_payments


def test_marketing_attribution_serializer():
    print("▶ 1. Checking InquiryCreateSerializer & BookingSerializer UTM handling...")

    inquiry_data = {
        "full_name": "Nguyen Van A (Ad Lead)",
        "email": "lead.adwords@startravels.vn",
        "phone": "0987654321",
        "destination_slug": "ha-long",
        "tour_slug": "tour-ha-long-cruise-2n1d",
        "travel_date": "2026-11-20",
        "guests": 2,
        "message": "Quan tam tour du thuyen Ha Long qua quang cao Google.",
        "inquiry_type": "tour_booking",
        "source": "google_ads",
        "metadata": {
            "utm": {
                "utm_source": "google",
                "utm_medium": "cpc",
                "utm_campaign": "halong-super-sale-2026",
                "utm_content": "luxury-yacht-video",
                "utm_term": "du thuyen ha long 5 sao",
                "gclid": "Cj0KCQjw_test_click_id_12345",
                "landing_page": "/tours/tour-ha-long-cruise-2n1d?utm_source=google",
                "referrer": "https://www.google.com/",
            }
        },
    }

    serializer = InquiryCreateSerializer(data=inquiry_data)
    assert serializer.is_valid(), f"Inquiry serializer errors: {serializer.errors}"
    validated_meta = serializer.validated_data.get("metadata", {})
    assert validated_meta.get("utm", {}).get("utm_source") == "google"
    assert validated_meta.get("utm", {}).get("utm_campaign") == "halong-super-sale-2026"
    assert validated_meta.get("utm", {}).get("gclid") == "Cj0KCQjw_test_click_id_12345"
    print("  ✓ InquiryCreateSerializer validates metadata and UTM attribution correctly.")

    booking_data = {
        "tour_slug_input": "tour-ha-long-cruise-2n1d",
        "contact_name": "Tran Thi B",
        "contact_email": "booking@startravels.vn",
        "contact_phone": "0912345678",
        "pax_adults": 2,
        "pax_children": 1,
        "metadata": {
            "utm": {
                "utm_source": "facebook",
                "utm_medium": "cpc",
                "utm_campaign": "autumn-discovery-2026",
                "fbclid": "IwAR_sample_fbclid",
            }
        },
    }

    booking_serializer = BookingSerializer(data=booking_data)
    assert booking_serializer.is_valid(), f"Booking serializer errors: {booking_serializer.errors}"
    assert booking_serializer.validated_data.get("metadata", {}).get("utm", {}).get("utm_source") == "facebook"
    print("  ✓ BookingSerializer accepts and validates metadata with UTM tracking data.")


def test_inquiry_outbox_envelope_marketing():
    print("▶ 2. Checking InquiryCreateView Outbox envelope marketing attribution...")

    factory = APIRequestFactory()
    request_payload = {
        "full_name": "Le Van C",
        "email": "levanc@example.com",
        "phone": "0901234567",
        "destination_slug": "hoi-an",
        "inquiry_type": "consultation",
        "source": "tiktok_ads",
        "utm": {
            "utm_source": "tiktok",
            "utm_medium": "video",
            "utm_campaign": "hoi-an-lantern-festival",
            "utm_content": "reel_v2",
            "landing_page": "/destinations/hoi-an",
        },
    }

    request = factory.post("/api/v1/inquiries/", request_payload, format="json")

    # Mock the save and Outbox create to verify envelope construction without DB write
    mock_inquiry = MagicMock()
    mock_inquiry.id = "inq-123456"
    mock_inquiry.full_name = request_payload["full_name"]
    mock_inquiry.email = request_payload["email"]
    mock_inquiry.phone = request_payload["phone"]
    mock_inquiry.source = request_payload["source"]
    mock_inquiry.destination_slug = request_payload["destination_slug"]
    mock_inquiry.tour_slug = ""
    mock_inquiry.travel_date = None
    mock_inquiry.guests = 1
    mock_inquiry.message = ""
    mock_inquiry.inquiry_type = request_payload["inquiry_type"]
    mock_inquiry.metadata = {}

    with patch("integrations.views.InquiryCreateSerializer.save", return_value=mock_inquiry), \
         patch("integrations.views.IntegrationOutbox.objects.create") as mock_outbox_create, \
         patch("integrations.views.dispatch_outbox_event.delay"):

        view = InquiryCreateView.as_view()
        response = view(request)

        assert response.status_code == 201
        assert mock_outbox_create.called

        # Verify envelope passed to IntegrationOutbox
        created_kwargs = mock_outbox_create.call_args[1]
        payload = created_kwargs["payload"]
        marketing = payload["data"]["marketing"]

        assert marketing["utm_source"] == "tiktok"
        assert marketing["utm_medium"] == "video"
        assert marketing["utm_campaign"] == "hoi-an-lantern-festival"
        assert marketing["landing_page"] == "/destinations/hoi-an"

        print("  ✓ Outbox envelope includes full marketing UTM attribution payload for Odoo CRM.")


def test_hold_slot_expiration_sweep_logic():
    print("▶ 3. Checking Inventory Hold Slot Release & Expiration Sweep logic...")

    # Mock expired PaymentTransaction and its associated Booking
    mock_booking = MagicMock()
    mock_booking.booking_code = "STAR-TRIP-999"
    mock_booking.status = "pending"
    mock_booking.payment_status = "unpaid"

    mock_txn = MagicMock()
    mock_txn.transaction_code = "TXN-EXPIRE-999"
    mock_txn.status = PaymentTransaction.Status.PENDING
    mock_txn.booking = mock_booking

    mock_queryset = [mock_txn]

    with patch("payments.models.PaymentTransaction.objects.filter") as mock_filter:
        mock_filter.return_value.select_related.return_value = mock_queryset

        swept_count = sweep_expired_payments()

        assert swept_count == 1
        assert mock_txn.status == PaymentTransaction.Status.EXPIRED
        assert mock_txn.save.called
        assert mock_booking.status == "cancelled"
        assert mock_booking.payment_status == "expired"
        assert mock_booking.save.called

    print("  ✓ PaymentTransaction transitions to EXPIRED.")
    print("  ✓ Pending Booking transitions to CANCELLED with payment_status='expired' (Hold Released).")


def main():
    print("=" * 65)
    print("STAR TRAVELS - MARKETING ATTRIBUTION & HOLD SWEEP VERIFICATION")
    print("=" * 65)

    test_marketing_attribution_serializer()
    test_inquiry_outbox_envelope_marketing()
    test_hold_slot_expiration_sweep_logic()

    print("=" * 65)
    print("✅ ALL MARKETING ATTRIBUTION & HOLD SWEEP CHECKS PASSED!")
    print("=" * 65)


if __name__ == "__main__":
    main()

