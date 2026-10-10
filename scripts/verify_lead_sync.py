#!/usr/bin/env python3
"""
Verification Script: Lead Synchronization Flow between Public Site, Django Backend, Admin, and Odoo CRM.
"""
import io
import json
import os
import sys
import uuid
from unittest.mock import MagicMock, patch

# Configure Django settings
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(BASE_DIR, "apps", "api"))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
os.environ.setdefault("DJANGO_DEBUG", "1")

import django
django.setup()

from django.contrib import admin
from django.utils import timezone
from integrations.models import Inquiry, IntegrationOutbox, IntegrationEvent
from assistant.models import AssistantLeadCapture
from partners.models import PartnerApplication
from bookings.models import Booking
from integrations.tasks import dispatch_outbox_event


class MockHttpResponse:
    def __init__(self, data: dict, status_code: int = 200):
        self.data = data
        self.status_code = status_code

    def getcode(self):
        return self.status_code

    def read(self):
        return json.dumps(self.data).encode("utf-8")

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        pass


def test_admin_registrations():
    print("--- 1. Testing Django Admin Registrations ---")
    assert Inquiry in admin.site._registry, "Inquiry must be registered in Admin"
    assert IntegrationOutbox in admin.site._registry, "IntegrationOutbox must be registered in Admin"
    assert IntegrationEvent in admin.site._registry, "IntegrationEvent must be registered in Admin"
    assert AssistantLeadCapture in admin.site._registry, "AssistantLeadCapture must be registered in Admin"
    assert PartnerApplication in admin.site._registry, "PartnerApplication must be registered in Admin"
    assert Booking in admin.site._registry, "Booking must be registered in Admin"

    inquiry_admin = admin.site._registry[Inquiry]
    assert "dispatch_to_odoo_action" in inquiry_admin.actions
    assert "mark_as_synced_action" in inquiry_admin.actions

    lead_admin = admin.site._registry[AssistantLeadCapture]
    assert "retry_odoo_sync_action" in lead_admin.actions
    assert "mark_as_synced_action" in lead_admin.actions

    partner_admin = admin.site._registry[PartnerApplication]
    assert "approve_applications_action" in partner_admin.actions
    assert "reject_applications_action" in partner_admin.actions

    print("[OK] All 6 Models and their Admin Actions are registered successfully!")


def test_inquiry_sync_flow():
    print("\n--- 2. Testing Inquiry Sync Flow ---")
    mock_inquiry_id = uuid.uuid4()
    mock_event_id = str(uuid.uuid4())
    mock_outbox_id = uuid.uuid4()

    mock_inquiry = MagicMock(spec=Inquiry)
    mock_inquiry.id = mock_inquiry_id
    mock_inquiry.status = Inquiry.Status.PENDING
    mock_inquiry.odoo_lead_id = None

    mock_outbox = MagicMock(spec=IntegrationOutbox)
    mock_outbox.id = mock_outbox_id
    mock_outbox.event_id = mock_event_id
    mock_outbox.event_type = "inquiry.created"
    mock_outbox.state = IntegrationOutbox.State.PENDING
    mock_outbox.payload = {
        "event_id": mock_event_id,
        "event_type": "inquiry.created",
        "data": {
            "inquiry_id": str(mock_inquiry_id),
            "customer": {"name": "Nguyen Van Test", "phone": "0987654321"},
        },
    }

    mock_resp = MockHttpResponse({"status": "success", "lead_id": 888}, status_code=200)

    with patch("integrations.models.IntegrationOutbox.objects.get", return_value=mock_outbox), \
         patch("integrations.models.Inquiry.objects.filter") as mock_filter, \
         patch("urllib.request.urlopen", return_value=mock_resp):

        mock_filter.return_value.first.return_value = mock_inquiry

        # Execute dispatch task
        res = dispatch_outbox_event(str(mock_outbox_id))
        assert res is True
        assert mock_outbox.state == IntegrationOutbox.State.DELIVERED
        assert mock_inquiry.status == Inquiry.Status.SYNCED
        assert mock_inquiry.odoo_lead_id == 888
        mock_inquiry.save.assert_called_with(update_fields=["status", "odoo_lead_id"])

    print("[PASS] Inquiry -> Outbox -> Odoo CRM sync & state update (SYNCED + odoo_lead_id=888) PASSED!")


def test_ai_lead_capture_sync_flow():
    print("\n--- 3. Testing AI Lead Capture Sync Flow ---")
    mock_lead_id = uuid.uuid4()
    mock_event_id = str(uuid.uuid4())
    mock_outbox_id = uuid.uuid4()

    mock_lead = MagicMock(spec=AssistantLeadCapture)
    mock_lead.id = mock_lead_id
    mock_lead.sync_state = AssistantLeadCapture.SyncState.PENDING
    mock_lead.odoo_lead_id = None

    mock_outbox = MagicMock(spec=IntegrationOutbox)
    mock_outbox.id = mock_outbox_id
    mock_outbox.event_id = mock_event_id
    mock_outbox.event_type = "ai.lead.created"
    mock_outbox.state = IntegrationOutbox.State.PENDING
    mock_outbox.payload = {
        "event_id": mock_event_id,
        "event_type": "ai.lead.created",
        "data": {
            "lead_capture_id": str(mock_lead_id),
            "contact_name": "Le Thi Khach AI",
            "phone_number": "0912345678",
        },
    }

    mock_resp = MockHttpResponse({"status": "success", "lead_id": 999}, status_code=200)

    with patch("integrations.models.IntegrationOutbox.objects.get", return_value=mock_outbox), \
         patch("assistant.models.AssistantLeadCapture.objects.filter") as mock_lead_filter, \
         patch("urllib.request.urlopen", return_value=mock_resp):

        mock_lead_filter.return_value.first.return_value = mock_lead

        res = dispatch_outbox_event(str(mock_outbox_id))
        assert res is True
        assert mock_outbox.state == IntegrationOutbox.State.DELIVERED
        assert mock_lead.sync_state == AssistantLeadCapture.SyncState.SYNCED
        assert mock_lead.odoo_lead_id == 999
        mock_lead.save.assert_called_with(update_fields=["sync_state", "odoo_lead_id"])

    print("[PASS] AI Assistant Lead -> Outbox -> Odoo CRM sync (SYNCED + odoo_lead_id=999) PASSED!")


def test_referral_booking_sync_flow():
    print("\n--- 4. Testing Referral Booking Sync Flow ---")
    mock_booking_id = uuid.uuid4()
    mock_event_id = str(uuid.uuid4())
    mock_outbox_id = uuid.uuid4()

    mock_booking = MagicMock(spec=Booking)
    mock_booking.id = mock_booking_id
    mock_booking.odoo_order_id = None

    mock_outbox = MagicMock(spec=IntegrationOutbox)
    mock_outbox.id = mock_outbox_id
    mock_outbox.event_id = mock_event_id
    mock_outbox.event_type = "referral.created"
    mock_outbox.state = IntegrationOutbox.State.PENDING
    mock_outbox.payload = {
        "event_id": mock_event_id,
        "event_type": "referral.created",
        "data": {
            "booking_id": str(mock_booking_id),
            "contact_name": "Tran Thi Referral",
            "item_name": "Vinpearl Resort",
        },
    }

    mock_resp = MockHttpResponse({"status": "success", "lead_id": 777}, status_code=200)

    with patch("integrations.models.IntegrationOutbox.objects.get", return_value=mock_outbox), \
         patch("bookings.models.Booking.objects.filter") as mock_booking_filter, \
         patch("urllib.request.urlopen", return_value=mock_resp):

        mock_booking_filter.return_value.first.return_value = mock_booking

        res = dispatch_outbox_event(str(mock_outbox_id))
        assert res is True
        assert mock_outbox.state == IntegrationOutbox.State.DELIVERED
        assert mock_booking.odoo_order_id == 777
        mock_booking.save.assert_called_with(update_fields=["odoo_order_id"])

    print("[PASS] Referral Booking -> Outbox -> Odoo CRM sync (odoo_order_id=777) PASSED!")


def test_outbox_permanent_failure_flow():
    print("\n--- 5. Testing Outbox Permanent Failure Flow ---")
    mock_inquiry_id = uuid.uuid4()
    mock_lead_id = uuid.uuid4()
    mock_outbox_id = uuid.uuid4()

    mock_outbox = MagicMock(spec=IntegrationOutbox)
    mock_outbox.id = mock_outbox_id
    mock_outbox.event_id = str(uuid.uuid4())
    mock_outbox.event_type = "inquiry.created"
    mock_outbox.state = IntegrationOutbox.State.PENDING
    mock_outbox.max_retries = 3
    mock_outbox.payload = {
        "event_id": str(uuid.uuid4()),
        "data": {
            "inquiry_id": str(mock_inquiry_id),
            "lead_capture_id": str(mock_lead_id),
        },
    }

    dispatch_outbox_event.request.retries = 3  # >= max_retries

    with patch("integrations.models.IntegrationOutbox.objects.get", return_value=mock_outbox), \
         patch("integrations.models.Inquiry.objects.filter") as mock_inq_filter, \
         patch("assistant.models.AssistantLeadCapture.objects.filter") as mock_lead_filter, \
         patch("urllib.request.urlopen", side_effect=Exception("Connection refused")):

        res = dispatch_outbox_event(str(mock_outbox_id))

        assert mock_outbox.state == IntegrationOutbox.State.FAILED
        mock_inq_filter.assert_called_with(id=str(mock_inquiry_id))
        mock_inq_filter.return_value.update.assert_called_with(status=Inquiry.Status.FAILED)
        mock_lead_filter.assert_called_with(id=str(mock_lead_id))
        mock_lead_filter.return_value.update.assert_called_with(sync_state=AssistantLeadCapture.SyncState.FAILED)

    print("[PASS] Permanent Failure -> Outbox marked FAILED & source Inquiry/Lead marked FAILED PASSED!")


if __name__ == "__main__":
    print("=" * 60)
    print("STARTING FULL LEAD SYNCHRONIZATION AUDIT SUITE")
    print("=" * 60)
    test_admin_registrations()
    test_inquiry_sync_flow()
    test_ai_lead_capture_sync_flow()
    test_referral_booking_sync_flow()
    test_outbox_permanent_failure_flow()
    print("=" * 60)
    print("ALL 5 LEAD SYNCHRONIZATION VERIFICATION TESTS PASSED (100%)!")
    print("=" * 60)

