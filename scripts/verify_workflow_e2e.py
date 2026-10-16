"""
Verification Script: End-to-End Concierge Workflow & Failure Modes
Validates:
1. Full Workflow: User -> Next.js / Django -> Router -> RAG / Planner -> Response -> UI
2. Itinerary Planning Feasibility (Đà Lạt 3N2Đ, 4 triệu)
3. Honest No-Data handling on unknown destinations
4. Lead capture & Odoo Outbox event creation upon confirmed consent
5. Jev Router Dual-Mode Analysis (Deterministic vs Jev API / Fallback)
"""

import os
import sys
import json
import uuid
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

BASE_DIR = Path(__file__).resolve().parent.parent
api_path = BASE_DIR / "apps" / "api"
if api_path.exists():
    sys.path.insert(0, str(api_path))
else:
    sys.path.insert(0, str(BASE_DIR))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
os.environ.setdefault("DJANGO_DEBUG", "1")

import django
django.setup()

from django.test import RequestFactory
from assistant.views import AssistantConversationViewSet
from assistant.models import AssistantConversation, AssistantLeadCapture, AssistantMessage
from integrations.models import IntegrationOutbox
from assistant.services.jev_router import JevRouteSelector, classify_route_deterministic

def test_workflow():
    factory = RequestFactory()
    view = AssistantConversationViewSet.as_view({"post": "chat"})
    
    print("=" * 80)
    print("E2E WORKFLOW VERIFICATION REPORT")
    print("=" * 80)

    # -------------------------------------------------------------
    # 1. Đà Lạt 3N2Đ Itinerary Planning Flow
    # -------------------------------------------------------------
    print("\n[TEST 1] ITINERARY PLANNING: Đà Lạt 3N2Đ, 4 triệu VNĐ, thong thả")
    payload1 = {
        "message": "Gợi ý lịch trình Đà Lạt 3 ngày 2 đêm ngân sách 4 triệu giúp mình với, nhịp đi thong thả",
        "locale": "vi",
        "session_token": f"sess_test_dalat_{uuid.uuid4().hex[:8]}"
    }
    req1 = factory.post("/api/v1/assistant/conversations/chat/", data=json.dumps(payload1), content_type="application/json")
    resp1 = view(req1)
    
    assert resp1.status_code == 200, f"Expected 200, got {resp1.status_code}"
    data1 = resp1.data
    has_plan = bool(data1.get("itinerary_plan"))
    budget_est = data1.get("itinerary_plan", {}).get("estimated_budget") if has_plan else None
    tours = data1.get("recommended_tours", [])
    sources = data1.get("sources", [])
    
    print(f"Status Code        : {resp1.status_code}")
    print(f"Has Itinerary Plan : {has_plan}")
    print(f"Estimated Budget   : {budget_est:,} VNĐ" if budget_est else "None")
    print(f"Tour Cards Count   : {len(tours)} (e.g. {tours[0]['slug'] if tours else 'None'})")
    print(f"Sources Count      : {len(sources)}")
    print(f"Sample Message     :\n{data1.get('message')[:350]}...\n")

    # -------------------------------------------------------------
    # 2. Honest No-Data Path (Unknown Destination)
    # -------------------------------------------------------------
    print("\n[TEST 2] NO-DATA PATH: Điểm đến ngoài phạm vi dữ liệu (Atlantis / Sao Hỏa)")
    payload2 = {
        "message": "Lập cho tôi lịch trình đi Atlantis 4 ngày 3 đêm ngân sách 10 triệu",
        "locale": "vi",
        "session_token": f"sess_test_unknown_{uuid.uuid4().hex[:8]}"
    }
    req2 = factory.post("/api/v1/assistant/conversations/chat/", data=json.dumps(payload2), content_type="application/json")
    resp2 = view(req2)
    
    data2 = resp2.data
    is_honest = "chưa có dữ liệu" in data2.get("message", "").lower() or "chưa có thông tin" in data2.get("message", "").lower() or "chưa có dữ liệu lịch trình" in data2.get("message", "").lower()
    print(f"Status Code        : {resp2.status_code}")
    print(f"Honest Abstention  : {is_honest}")
    print(f"Response Excerpt   :\n{data2.get('message')[:250]}...\n")

    # -------------------------------------------------------------
    # 3. Lead Capture & Odoo CRM Sync with Consent
    # -------------------------------------------------------------
    print("\n[TEST 3] LEAD CAPTURE & ODOO CRM OUTBOX EVENT: SĐT + Explicit Consent")
    session_token_lead = f"sess_test_lead_{uuid.uuid4().hex[:8]}"
    payload3 = {
        "message": "Tôi muốn đặt tour Hạ Long cho 3 người, gọi lại tư vấn cho tôi theo sđt 0987654321, tôi là Trần Minh",
        "locale": "vi",
        "session_token": session_token_lead,
        "consent": True
    }
    req3 = factory.post("/api/v1/assistant/conversations/chat/", data=json.dumps(payload3), content_type="application/json")
    resp3 = view(req3)
    
    data3 = resp3.data
    lead_captured = data3.get("lead_captured", False)
    
    # Check DB Lead Capture
    lead_record = AssistantLeadCapture.objects.filter(phone_number="0987654321").order_by("-created_at").first()
    
    # Check Integration Outbox for Odoo CRM
    outbox_event = IntegrationOutbox.objects.filter(event_type="ai.lead.created").order_by("-created_at").first()
    
    print(f"Status Code        : {resp3.status_code}")
    print(f"Lead Captured Flag : {lead_captured}")
    print(f"Lead in DB         : {bool(lead_record)} (Name: {lead_record.contact_name if lead_record else ''}, Phone: {lead_record.phone_number if lead_record else ''}, Pax: {lead_record.estimated_pax if lead_record else ''})")
    print(f"Odoo Outbox Event  : {bool(outbox_event)} (Event: {outbox_event.event_type if outbox_event else ''}, State: {outbox_event.state if outbox_event else ''})")
    if outbox_event:
        print(f"Outbox Payload     : {json.dumps(outbox_event.payload.get('data', {}), ensure_ascii=False)}")

    # -------------------------------------------------------------
    # 4. Lead Capture Without Consent (Refusal to Sync)
    # -------------------------------------------------------------
    print("\n[TEST 4] PHONE NUMBER WITHOUT CONSENT: Không được gửi sang CRM")
    payload4 = {
        "message": "Số điện thoại của khách sạn ở Phú Quốc là bao nhiêu? Số của tôi 0911223344",
        "locale": "vi",
        "session_token": f"sess_test_noconsent_{uuid.uuid4().hex[:8]}",
        "consent": False
    }
    req4 = factory.post("/api/v1/assistant/conversations/chat/", data=json.dumps(payload4), content_type="application/json")
    resp4 = view(req4)
    data4 = resp4.data
    unconfirmed_lead = AssistantLeadCapture.objects.filter(phone_number="0911223344").first()
    print(f"Lead Captured Flag : {data4.get('lead_captured')}")
    print(f"Saved in CRM Lead  : {bool(unconfirmed_lead)} (Correct behavior: False)")

    # -------------------------------------------------------------
    # 5. Jev Router Dual-Mode Evaluation
    # -------------------------------------------------------------
    print("\n[TEST 5] JEV ROUTER DUAL-MODE EVALUATION")
    test_queries = [
        ("Lịch trình Đà Lạt 3N2Đ", "itinerary query"),
        ("Giá tour Hạ Long bao nhiêu", "discovery query"),
        ("Quy định visa vào Việt Nam", "knowledge query"),
        ("Rảnh rỗi muốn đi chơi đâu đó vui vui", "ambiguous query"),
        ("Báo giá cho tôi vào số 0988888888", "lead with consent"),
    ]
    
    print(f"{'Query':<38} | {'Type':<18} | {'Det Route':<15} | {'Jev Router Decision Source'}")
    print("-" * 90)
    for q, qtype in test_queries:
        route, source = JevRouteSelector.select_route(
            query=q,
            locale="vi",
            chunks_count=1 if "visa" in q.lower() else 0,
            has_contact="0988888888" in q,
            has_confirmed_consent="báo giá" in q.lower(),
        )
        print(f"{q[:36]:<38} | {qtype:<18} | {route:<15} | {source}")

    print("\n" + "=" * 80)
    print("ALL WORKFLOW VERIFICATION CHECKS COMPLETED")
    print("=" * 80)

if __name__ == "__main__":
    test_workflow()
