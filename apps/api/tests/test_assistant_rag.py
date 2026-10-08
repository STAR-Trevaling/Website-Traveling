import pytest
from rest_framework.test import APIClient

from assistant.models import (
    AssistantConversation,
    AssistantKnowledgeChunk,
    AssistantLeadCapture,
)
from assistant.services.generator import extract_lead_info, generate_response
from assistant.services.retriever import search_knowledge
from integrations.models import IntegrationOutbox


@pytest.mark.django_db
def test_retriever_and_generator_flow():
    # Setup knowledge chunk
    AssistantKnowledgeChunk.objects.create(
        entity_type=AssistantKnowledgeChunk.EntityType.TOUR,
        entity_slug="tour-ha-long-cruise-2n1d",
        title="Du Thuyền 5 Sao Vịnh Hạ Long 2N1Đ",
        content_vi="Du thuyền 5 sao đẳng cấp tại Vịnh Hạ Long và Lan Hạ. Giá vé 3.200.000 VNĐ.",
        metadata={"price": 3200000, "region": "north", "departure": "Hà Nội", "duration": "2N1Đ"},
    )

    # Test retriever
    results = search_knowledge(query="Tôi muốn đi du thuyền hạ long 2 ngày", locale="vi")
    assert len(results) > 0
    assert any(c.entity_slug == "tour-ha-long-cruise-2n1d" for c in results)

    # Test generator
    reply, tour_slugs = generate_response("Gợi ý tour hạ long", results, locale="vi")
    assert "Hạ Long" in reply or "Du Thuyền" in reply
    assert "tour-ha-long-cruise-2n1d" in tour_slugs

    # Test lead extraction
    lead = extract_lead_info("Mình là Tuấn, sđt 0912345678 cần tư vấn 4 người")
    assert lead["has_contact"] is True
    assert lead["phone_number"] == "0912345678"
    assert lead["estimated_pax"] == 4


@pytest.mark.django_db
def test_assistant_chat_api_endpoint():
    client = APIClient()

    # Pre-create knowledge chunk
    AssistantKnowledgeChunk.objects.create(
        entity_type=AssistantKnowledgeChunk.EntityType.TOUR,
        entity_slug="tour-ha-long-cruise-2n1d",
        title="Du Thuyền 5 Sao Vịnh Hạ Long",
        content_vi="Trải nghiệm du thuyền 5 sao vịnh Hạ Long.",
        metadata={"price": 3200000, "region": "north", "slug": "tour-ha-long-cruise-2n1d"},
    )

    payload = {
        "message": "Tôi là Hương, số điện thoại 0987654321 muốn hỏi tour Hạ Long cho 2 người",
        "locale": "vi",
    }

    response = client.post("/api/v1/assistant/conversations/chat/", data=payload, format="json")
    assert response.status_code == 200
    data = response.json()

    assert "session_token" in data
    assert "message" in data
    assert data["lead_captured"] is True

    # Check database records created
    conv = AssistantConversation.objects.get(session_token=data["session_token"])
    assert conv.messages.count() == 2  # 1 user + 1 assistant

    lead = AssistantLeadCapture.objects.filter(phone_number="0987654321").first()
    assert lead is not None

    # Check Outbox event created
    outbox = IntegrationOutbox.objects.filter(event_type="ai.lead.created").first()
    assert outbox is not None
    assert outbox.payload["data"]["phone_number"] == "0987654321"


@pytest.mark.django_db
def test_heritage_history_rag():
    # Setup heritage knowledge chunk
    AssistantKnowledgeChunk.objects.create(
        entity_type=AssistantKnowledgeChunk.EntityType.PLACE,
        entity_slug="hoi-an-chua-cau-heritage",
        title="Lịch Sử & Huyền Tích Đô Thị Cổ Hội An & Chùa Cầu",
        content_vi="Đô thị cổ Hội An từng là thương cảng mậu dịch quốc tế Faifo sầm uất thế kỷ 16-17. Chùa Cầu (Lai Viễn Kiều) được các thương nhân Nhật Bản xây dựng vào đầu thế kỷ 17 nhằm trấn yểm thủy quái Mamazu (con Cù) để ngăn ngừa động đất, lũ lụt.",
        content_en="Ancient town of Hoi An (Faifo) 16th-17th century trading port. Japanese Covered Bridge calmed the monster Mamazu.",
        metadata={
            "category": "heritage_history",
            "heritage_name": "Đô thị cổ Hội An & Chùa Cầu",
            "destination_slug": "hoi-an",
            "historical_period": "Thế kỷ 16 - 17 (Thương cảng Faifo - Chúa Nguyễn)",
            "unesco_status": "Di sản Văn hóa Thế giới UNESCO (1999)",
            "recommended_tour_slugs": ["tour-hoi-an-memories-show"],
        },
    )

    # 1. Search with historical query
    results = search_knowledge(
        query="Lịch sử Chùa Cầu Hội An và truyền thuyết thủy quái Mamazu", locale="vi"
    )
    assert len(results) > 0
    assert any(c.entity_slug == "hoi-an-chua-cau-heritage" for c in results)

    # 2. Generate response with grounding
    reply, tour_slugs = generate_response("Kể về sự tích Chùa Cầu Hội An", results, locale="vi")
    assert "Mamazu" in reply or "Chùa Cầu" in reply or "thủy quái" in reply or "Faifo" in reply
    assert "tour-hoi-an-memories-show" in tour_slugs


@pytest.mark.django_db
def test_seasonality_and_cuisine_recommendation_rag():
    # Setup rich landmark knowledge chunk
    AssistantKnowledgeChunk.objects.create(
        entity_type=AssistantKnowledgeChunk.EntityType.PLACE,
        entity_slug="ha-long-heritage-history",
        title="Vịnh Hạ Long & Vịnh Lan Hạ — Huyền Tích Rồng Giáng",
        content_vi="Kỳ quan Vịnh Hạ Long sở hữu làn nước xanh biếc. Thời điểm đẹp nhất là tháng 4-6 và tháng 9-11.",
        content_en="Ha Long Bay world wonder. Best time to visit is April to June and September to November.",
        metadata={
            "category": "heritage_history",
            "destination_slug": "ha-long",
            "best_time_to_visit": "Tháng 4 - 6 và Tháng 9 - 11",
            "signature_cuisine": ["Chả mực giã tay Hạ Long", "Sá sùng Quan Lạn", "Bún bề bề"],
            "insider_tips": [
                "Nên chọn du thuyền 5 sao ngủ đêm trên vịnh",
                "Tránh đi vào tháng 7-8",
            ],
            "ideal_duration": "2N1Đ hoặc 3N2Đ",
            "recommended_tour_slugs": ["tour-ha-long-cruise-2n1d"],
        },
    )

    # 1. Seasonality inquiry
    results_season = search_knowledge(
        query="Du lịch Hạ Long mùa nào đẹp nhất trong năm?", locale="vi"
    )
    assert len(results_season) > 0
    assert any(c.entity_slug == "ha-long-heritage-history" for c in results_season)

    reply_season, slugs_season = generate_response(
        "Hạ Long đi tháng mấy đẹp nhất?", results_season, locale="vi"
    )
    assert "Tháng 4 - 6" in reply_season or "Thời điểm vàng" in reply_season
    assert "tour-ha-long-cruise-2n1d" in slugs_season

    # 2. Cuisine inquiry
    results_food = search_knowledge(query="Đến Hạ Long có món đặc sản gì ngon nên ăn?", locale="vi")
    assert len(results_food) > 0

    reply_food, slugs_food = generate_response("Đến Hạ Long ăn gì ngon?", results_food, locale="vi")
    assert "Chả mực giã tay" in reply_food or "Sá sùng" in reply_food or "đặc sản" in reply_food
    assert "tour-ha-long-cruise-2n1d" in slugs_food
