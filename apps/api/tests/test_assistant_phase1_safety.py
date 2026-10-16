import pytest
from rest_framework.test import APIClient

from accounts.models import User
from assistant.models import (
    AssistantConversation,
    AssistantKnowledgeChunk,
    AssistantLeadCapture,
)
from integrations.models import IntegrationOutbox


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def user_a():
    return User.objects.create_user(
        username="user_a", email="usera@example.com", password="password123"
    )


@pytest.fixture
def user_b():
    return User.objects.create_user(
        username="user_b", email="userb@example.com", password="password123"
    )


@pytest.mark.django_db
def test_session_isolation_authenticated_users(api_client, user_a, user_b):
    """User B cannot read User A's conversation via ?session_token=..."""
    conv_a = AssistantConversation.objects.create(
        user=user_a,
        session_token="sess_user_a_secret_token_1234567890",
        title="User A Trip Planning",
    )

    # User B authenticates
    api_client.force_authenticate(user=user_b)

    # User B tries to list/get User A's conversation
    response = api_client.get(
        f"/api/v1/assistant/conversations/?session_token={conv_a.session_token}"
    )
    assert response.status_code == 200
    data = response.json()
    # Must NOT return User A's conversation
    assert len(data.get("results", [])) == 0 or len(data) == 0


@pytest.mark.django_db
def test_anonymous_cannot_hijack_authenticated_conversation(api_client, user_a):
    """Anonymous client cannot post or read messages on an authenticated user's session token."""
    conv_a = AssistantConversation.objects.create(
        user=user_a,
        session_token="sess_user_a_secret_token_9999999999",
        title="User A Secret Trip",
    )

    # Anonymous user tries to send chat message using User A's session token
    response = api_client.post(
        "/api/v1/assistant/conversations/chat/",
        data={
            "session_token": conv_a.session_token,
            "message": "Hello, can I read your conversation?",
            "locale": "vi",
        },
        format="json",
    )
    assert response.status_code in [200, 403]
    if response.status_code == 200:
        data = response.json()
        # Must have allocated a NEW session token for anonymous, not hijacked User A's conversation
        assert data["session_token"] != conv_a.session_token
        # User A's conversation message count must still be 0
        assert conv_a.messages.count() == 0


@pytest.mark.django_db
def test_unconsented_phone_does_not_create_crm_lead(api_client):
    """Mentioning a phone casually (e.g. asking about hotline) must NOT trigger lead capture or CRM outbox."""
    initial_leads = AssistantLeadCapture.objects.count()
    initial_outbox = IntegrationOutbox.objects.filter(event_type="ai.lead.created").count()

    response = api_client.post(
        "/api/v1/assistant/conversations/chat/",
        data={
            "message": "Hôm trước có số điện thoại 0987654321 gọi cho tôi từ STAR phải không em?",
            "locale": "vi",
        },
        format="json",
    )
    assert response.status_code == 200
    data = response.json()
    assert data["lead_captured"] is False

    # Verify no lead created in DB
    assert AssistantLeadCapture.objects.count() == initial_leads
    # Verify no Outbox event queued to Odoo CRM
    assert IntegrationOutbox.objects.filter(event_type="ai.lead.created").count() == initial_outbox


@pytest.mark.django_db
def test_consented_lead_creates_lead_and_outbox_once(api_client):
    """When user explicitly provides contact for consultation, create lead and outbox once."""
    response = api_client.post(
        "/api/v1/assistant/conversations/chat/",
        data={
            "message": "Tôi là Nam, nhờ STAR tư vấn đặt tour Hạ Long cho 3 người, sđt 0912345678",
            "locale": "vi",
            "confirm_lead": True,
        },
        format="json",
    )
    assert response.status_code == 200
    data = response.json()
    assert data["lead_captured"] is True

    lead = AssistantLeadCapture.objects.filter(phone_number="0912345678").first()
    assert lead is not None
    assert lead.estimated_pax == 3

    outbox = IntegrationOutbox.objects.filter(
        event_type="ai.lead.created", payload__data__phone_number="0912345678"
    ).first()
    assert outbox is not None


@pytest.mark.django_db
def test_duplicate_lead_prevention_in_same_conversation(api_client):
    """Sending the same consultation request twice in the same conversation must NOT duplicate CRM outbox events."""
    session_token = "sess_idempotency_test_token_12345678"
    payload = {
        "session_token": session_token,
        "message": "Tôi là Lan, sđt 0933445566 cần tư vấn tour Phú Quốc",
        "locale": "vi",
        "confirm_lead": True,
    }

    # First request
    res1 = api_client.post("/api/v1/assistant/conversations/chat/", data=payload, format="json")
    assert res1.status_code == 200
    assert res1.json()["lead_captured"] is True

    lead_count_1 = AssistantLeadCapture.objects.filter(phone_number="0933445566").count()
    outbox_count_1 = IntegrationOutbox.objects.filter(
        event_type="ai.lead.created", payload__data__phone_number="0933445566"
    ).count()
    assert lead_count_1 == 1
    assert outbox_count_1 == 1

    # Second request (refresh or repeated send)
    res2 = api_client.post("/api/v1/assistant/conversations/chat/", data=payload, format="json")
    assert res2.status_code == 200

    lead_count_2 = AssistantLeadCapture.objects.filter(phone_number="0933445566").count()
    outbox_count_2 = IntegrationOutbox.objects.filter(
        event_type="ai.lead.created", payload__data__phone_number="0933445566"
    ).count()
    assert lead_count_2 == 1, "Duplicate lead created!"
    assert outbox_count_2 == 1, "Duplicate outbox event created for CRM!"


@pytest.mark.django_db
def test_input_length_limit(api_client):
    """Message exceeding maximum length (2000 chars) must return HTTP 400."""
    huge_message = "A" * 2500
    response = api_client.post(
        "/api/v1/assistant/conversations/chat/",
        data={"message": huge_message, "locale": "vi"},
        format="json",
    )
    assert response.status_code == 400
    assert "error" in response.json()


@pytest.mark.django_db
def test_response_contract_additive_fields(api_client):
    """Response must contain additive fields: recommended_guides, sources, route, status."""
    AssistantKnowledgeChunk.objects.create(
        entity_type=AssistantKnowledgeChunk.EntityType.GUIDE,
        entity_slug="guide-visa-entry-policy",
        title="Chính Sách Thị Thực Việt Nam 2026",
        content_vi="Miễn thị thực 45 ngày cho 25 quốc gia.",
        metadata={"guide_route": "/guide/visa", "category": "visa"},
    )

    response = api_client.post(
        "/api/v1/assistant/conversations/chat/",
        data={
            "message": "Người nước ngoài được miễn visa Việt Nam bao nhiêu ngày?",
            "locale": "vi",
        },
        format="json",
    )
    assert response.status_code == 200
    data = response.json()

    assert "message" in data
    assert "session_token" in data
    assert "recommended_tours" in data
    assert "recommended_guides" in data
    assert "sources" in data
    assert "route" in data
    assert data["status"] == "ok"
