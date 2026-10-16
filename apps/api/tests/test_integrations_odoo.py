import hashlib
import hmac
import json
import uuid

import pytest
from django.conf import settings
from rest_framework.test import APIClient

from destinations.models import Destination
from integrations.models import Inquiry, IntegrationEvent, IntegrationOutbox


@pytest.fixture
def api_client():
    return APIClient()


@pytest.mark.django_db(transaction=True)
def test_inquiry_creation_creates_outbox_event(api_client, monkeypatch):
    # Mock celery task delay
    dispatched = []
    monkeypatch.setattr(
        "integrations.tasks.dispatch_outbox_event.delay",
        lambda outbox_id: dispatched.append(outbox_id),
    )

    payload = {
        "full_name": "Nguyễn Văn Du Khách",
        "email": "traveler@example.com",
        "phone": "0912345678",
        "destination_slug": "ha-long",
        "tour_slug": "tour-ha-long-cruise-2n1d",
        "guests": 2,
        "message": "Tôi muốn tư vấn tour du thuyền Hạ Long 2N1Đ.",
        "inquiry_type": "tour_booking",
        "source": "website",
    }

    response = api_client.post("/api/v1/inquiries/", data=payload, format="json")
    assert response.status_code == 201
    res_data = response.json()
    assert res_data["success"] is True

    # Assert Inquiry stored in DB
    inquiry = Inquiry.objects.get(id=res_data["inquiry_id"])
    assert inquiry.full_name == "Nguyễn Văn Du Khách"
    assert inquiry.phone == "0912345678"

    # Assert Outbox record created
    outbox = IntegrationOutbox.objects.get(event_id=res_data["event_id"])
    assert outbox.event_type == "inquiry.created"
    assert outbox.state == IntegrationOutbox.State.PENDING
    assert outbox.payload["data"]["customer"]["name"] == "Nguyễn Văn Du Khách"

    # Assert Celery task triggered
    assert len(dispatched) == 1
    assert dispatched[0] == str(outbox.id)


@pytest.mark.django_db(transaction=True)
def test_odoo_webhook_unauthorized_without_hmac(api_client):
    payload = {
        "event_id": str(uuid.uuid4()),
        "event_type": "destination.published",
        "data": {"slug": "ha-long", "name": "Hạ Long"},
    }
    response = api_client.post(
        "/api/v1/integrations/v1/odoo/events",
        data=json.dumps(payload),
        content_type="application/json",
    )
    assert response.status_code == 401


@pytest.mark.django_db(transaction=True)
def test_odoo_webhook_destination_published_and_idempotency(api_client):
    secret = getattr(settings, "ODOO_WEBHOOK_SECRET", "")
    event_id = str(uuid.uuid4())
    payload = {
        "event_id": event_id,
        "event_type": "destination.published",
        "event_version": 1,
        "source": "odoo",
        "data": {
            "slug": "ninh-binh-test",
            "destination": {
                "name": "Ninh Bình Tràng An Test",
                "country": "Việt Nam",
                "summary": "Kỳ quan Tràng An",
                "description": "Mô tả chi tiết",
                "image_url": "https://example.com/image.jpg",
                "hero_image_url": "https://example.com/hero.jpg",
                "starting_price": 950000.0,
                "latitude": 20.2506,
                "longitude": 105.9745,
            },
        },
    }

    raw_body = json.dumps(payload).encode("utf-8")
    sig = hmac.new(secret.encode("utf-8"), raw_body, hashlib.sha256).hexdigest()

    # First attempt: should succeed and create record
    response = api_client.post(
        "/api/v1/integrations/v1/odoo/events",
        data=raw_body,
        content_type="application/json",
        HTTP_X_SIGNATURE_SHA256=sig,
    )
    assert response.status_code == 200
    assert response.json()["status"] == "synced"
    assert response.json()["created"] is True

    # Assert Destination in DB
    dest = Destination.objects.get(slug="ninh-binh-test")
    assert dest.name == "Ninh Bình Tràng An Test"
    assert dest.is_published is True

    # Assert Inbound IntegrationEvent logged
    inbound_log = IntegrationEvent.objects.get(external_event_id=event_id)
    assert inbound_log.state == IntegrationEvent.State.PROCESSED

    # Second attempt (Idempotency Replay): same payload & event ID
    response_replay = api_client.post(
        "/api/v1/integrations/v1/odoo/events",
        data=raw_body,
        content_type="application/json",
        HTTP_X_SIGNATURE_SHA256=sig,
    )
    assert response_replay.status_code == 200
    assert response_replay.json()["status"] == "synced"
    # Ensure no duplicates
    assert Destination.objects.filter(slug="ninh-binh-test").count() == 1
