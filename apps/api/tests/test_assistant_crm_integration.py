import json
import uuid
from typing import Any
from unittest.mock import MagicMock, patch

import pytest
from assistant.models import AssistantConversation, AssistantLeadCapture
from integrations.models import IntegrationOutbox
from integrations.tasks import dispatch_outbox_event

dispatch_task: Any = dispatch_outbox_event


@pytest.mark.django_db
def test_outbox_to_odoo_lead_dispatch_success():
    """Verify that a pending outbox event successfully updates to DELIVERED and syncs lead."""
    conv = AssistantConversation.objects.create(session_token=f"sess_{uuid.uuid4().hex[:8]}")
    lead = AssistantLeadCapture.objects.create(
        conversation=conv,
        contact_name="Lê Hoàng",
        phone_number="0901234567",
        sync_state=AssistantLeadCapture.SyncState.PENDING,
    )

    event_id = str(uuid.uuid4())
    outbox = IntegrationOutbox.objects.create(
        event_id=event_id,
        event_type="ai.lead.created",
        event_version=1,
        source="ai_assistant",
        payload={
            "event_id": event_id,
            "event_type": "ai.lead.created",
            "data": {
                "lead_capture_id": str(lead.id),
                "contact_name": lead.contact_name,
                "phone_number": lead.phone_number,
            },
        },
        state=IntegrationOutbox.State.PENDING,
    )

    mock_resp_data = json.dumps({"status": "success", "lead_id": 12345}).encode("utf-8")
    mock_resp = MagicMock()
    mock_resp.getcode.return_value = 200
    mock_resp.read.return_value = mock_resp_data

    mock_cm = MagicMock()
    mock_cm.__enter__.return_value = mock_resp

    with patch("urllib.request.urlopen", return_value=mock_cm) as mock_urlopen:
        dispatch_res = dispatch_task.apply(args=[str(outbox.id)]).get()
        assert dispatch_res is True

        call_args = mock_urlopen.call_args[0]
        req = call_args[0]
        assert req.get_header("Idempotency-key") == event_id

    outbox.refresh_from_db()
    lead.refresh_from_db()

    assert outbox.state == IntegrationOutbox.State.DELIVERED
    assert outbox.http_status == 200
    assert outbox.delivered_at is not None
    assert lead.sync_state == AssistantLeadCapture.SyncState.SYNCED
    assert lead.odoo_lead_id == 12345


@pytest.mark.django_db
def test_outbox_dispatch_idempotency():
    """Verify that an already DELIVERED outbox event is not re-sent over network."""
    outbox = IntegrationOutbox.objects.create(
        event_id=str(uuid.uuid4()),
        event_type="ai.lead.created",
        payload={"event_type": "ai.lead.created", "data": {}},
        state=IntegrationOutbox.State.DELIVERED,
    )

    with patch("urllib.request.urlopen") as mock_urlopen:
        res = dispatch_task.apply(args=[str(outbox.id)]).get()
        assert res is True
        assert not mock_urlopen.called


@pytest.mark.django_db
def test_outbox_dispatch_exhaustion_marks_failed():
    """Verify that exhausting retries marks both Outbox and Lead as FAILED."""
    conv = AssistantConversation.objects.create(session_token=f"sess_{uuid.uuid4().hex[:8]}")
    lead = AssistantLeadCapture.objects.create(
        conversation=conv,
        phone_number="0977889900",
        sync_state=AssistantLeadCapture.SyncState.PENDING,
    )
    outbox = IntegrationOutbox.objects.create(
        event_id=str(uuid.uuid4()),
        event_type="ai.lead.created",
        payload={"data": {"lead_capture_id": str(lead.id)}},
        state=IntegrationOutbox.State.PENDING,
        max_retries=1,
        retry_count=0,
    )

    with patch("urllib.request.urlopen", side_effect=Exception("Gateway Timeout 504")):
        with patch.object(dispatch_task, "max_retries", 1):
            dispatch_task.apply(args=[str(outbox.id)], retries=1)

    outbox.refresh_from_db()
    lead.refresh_from_db()

    assert outbox.state == IntegrationOutbox.State.FAILED
    assert lead.sync_state == AssistantLeadCapture.SyncState.FAILED
    assert "Gateway Timeout 504" in outbox.last_error
