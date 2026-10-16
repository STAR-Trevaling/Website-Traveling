import pytest
from assistant.models import (
    AssistantConversation,
    AssistantKnowledgeChunk,
    AssistantLeadCapture,
)
from assistant.services.itinerary_planner import ItineraryPlanner
from destinations.models import Destination
from integrations.models import IntegrationOutbox
from rest_framework.test import APIClient
from tours.models import Tour


@pytest.fixture(autouse=True)
def seed_itinerary_data(db):
    """Seed published destination, tour with itinerary, and place chunks."""
    dest = Destination.objects.create(
        slug="ha-long",
        name="Vịnh Hạ Long",
        name_en="Ha Long Bay",
        country="Việt Nam",
        summary="Kỳ quan thiên nhiên thế giới UNESCO",
        description="Vịnh Hạ Long với hàng ngàn đảo đá vôi kỳ vĩ.",
        starting_price=3200000,
        is_published=True,
    )

    Destination.objects.create(
        slug="secret-island",
        name="Đảo Tuyệt Mật",
        country="Việt Nam",
        summary="Điểm đến chưa công bố",
        description="Chưa mở bán cho khách.",
        is_published=False,  # UNPUBLISHED
    )

    tour = Tour.objects.create(
        slug="tour-ha-long-cruise-2n1d",
        title="Du Thuyền 5 Sao Vịnh Hạ Long 2N1Đ",
        title_en="5-Star Ha Long Bay Cruise 2D1N",
        destination=dest,
        destination_name="Hạ Long",
        duration="2N1Đ",
        departure="Hà Nội",
        price=3200000,
        itinerary=[
            {
                "day": 1,
                "title": "Hà Nội — Vịnh Hạ Long — Du Thuyền",
                "morning": "Xe đón tại phố cổ Hà Nội",
                "afternoon": "Nhận phòng du thuyền, ăn trưa buffet, chèo kayak hang Luồn",
                "evening": "Tiệc trà hoàng hôn, gala dinner hải sản",
            },
            {
                "day": 2,
                "title": "Hang Sửng Sốt — Bến Cảng — Hà Nội",
                "morning": "Tập Thái Cực Quyền trên boong tàu, thăm Hang Sửng Sốt",
                "afternoon": "Thưởng thức bữa trưa sớm, cập bến",
                "evening": "Xe đưa về điểm đón Hà Nội",
            },
        ],
        is_published=True,
    )

    AssistantKnowledgeChunk.objects.create(
        entity_type=AssistantKnowledgeChunk.EntityType.PLACE,
        entity_slug="hang-sung-sot",
        title="Hang Sửng Sốt — Vịnh Hạ Long",
        content_vi="Hang Sửng Sốt là một trong những hang động đẹp nhất Vịnh Hạ Long.",
        metadata={"destination_slug": "ha-long"},
    )

    AssistantKnowledgeChunk.objects.create(
        entity_type=AssistantKnowledgeChunk.EntityType.TOUR,
        entity_id=tour.id,
        entity_slug=tour.slug,
        title=tour.title,
        content_vi=f"Tour: {tour.title}. Giá: {tour.price:,} VNĐ.",
        metadata={"price": 3200000, "slug": tour.slug, "is_published": True},
    )


def test_extract_itinerary_params():
    query = "Lên giúp mình lịch trình đi Hạ Long 3 ngày với ngân sách 5 triệu thong thả nhé"
    params = ItineraryPlanner.extract_itinerary_params(query)
    assert params["destination_slug"] == "ha-long"
    assert params["days"] == 3
    assert params["budget"] == 5_000_000.0
    assert params["pace"] == "relaxed"


def test_validate_bounds():
    valid, _ = ItineraryPlanner.validate_bounds(3)
    assert valid is True

    invalid_low, err_low = ItineraryPlanner.validate_bounds(0)
    assert invalid_low is False
    assert err_low is not None

    invalid_high, err_high = ItineraryPlanner.validate_bounds(15)
    assert invalid_high is False
    assert err_high is not None


def test_plan_itinerary_happy_path(db):
    params = {
        "destination_slug": "ha-long",
        "days": 2,
        "pace": "moderate",
        "budget": 4_500_000.0,
    }
    result = ItineraryPlanner.plan_itinerary(params=params, locale="vi")
    assert result["success"] is True
    assert result["destination_name"] == "Vịnh Hạ Long"
    assert len(result["days_plan"]) == 2
    assert "Hang Sửng Sốt" in result["message"]
    assert "TOUR_CARD: tour-ha-long-cruise-2n1d" in result["message"]
    assert len(result["sources"]) > 0
    assert any(s["slug"] == "ha-long" for s in result["sources"])


def test_plan_itinerary_failure_unknown_destination(db):
    params = {
        "destination_raw": "Thành Phố Atlantis Kỳ Bí",
        "days": 3,
        "pace": "moderate",
    }
    result = ItineraryPlanner.plan_itinerary(params=params, locale="vi")
    assert result["success"] is False
    assert result["error"] == "no_published_data"
    assert "chưa có dữ liệu lịch trình chính thức" in result["message"]
    assert len(result["days_plan"]) == 0


def test_plan_itinerary_failure_invalid_bounds():
    params = {
        "destination_slug": "ha-long",
        "days": 30,
    }
    result = ItineraryPlanner.plan_itinerary(params=params, locale="vi")
    assert result["success"] is False
    assert result["error"] == "bounds_invalid"
    assert "1 đến 14 ngày" in result["message"]


def test_plan_itinerary_failure_unpublished_destination(db):
    params = {
        "destination_slug": "secret-island",
        "days": 2,
    }
    result = ItineraryPlanner.plan_itinerary(params=params, locale="vi")
    assert result["success"] is False
    assert result["error"] == "no_published_data"


def test_chat_api_e2e_itinerary_flow(db):
    client = APIClient()
    conv = AssistantConversation.objects.create(session_token="test_itin_sess_token")

    payload = {
        "session_token": conv.session_token,
        "message": "Gợi ý lịch trình 2 ngày 1 đêm tại Hạ Long",
        "locale": "vi",
    }
    resp = client.post("/api/v1/assistant/conversations/chat/", payload, format="json")
    assert resp.status_code == 200
    data = resp.data
    assert data["route"] == "itinerary"
    assert data["itinerary_plan"] is not None
    assert data["itinerary_plan"]["destination"] == "Vịnh Hạ Long"
    assert len(data["recommended_tours"]) > 0
    assert data["recommended_tours"][0]["slug"] == "tour-ha-long-cruise-2n1d"
    assert len(data["sources"]) > 0


def test_chat_api_itinerary_lead_consultation_with_consent(db):
    client = APIClient()
    conv = AssistantConversation.objects.create(session_token="test_lead_sess_token")

    payload = {
        "session_token": conv.session_token,
        "message": "Tôi muốn tư vấn lịch trình tour Hạ Long này, sđt của tôi là 0988776655",
        "locale": "vi",
        "confirmed_consent": True,
    }
    resp = client.post("/api/v1/assistant/conversations/chat/", payload, format="json")
    assert resp.status_code == 200
    assert resp.data["lead_captured"] is True
    assert AssistantLeadCapture.objects.filter(phone_number="0988776655").exists()
    assert IntegrationOutbox.objects.filter(event_type="ai.lead.created").exists()


def test_plan_itinerary_tight_budget_warning(db):
    """Verify that a budget with tiny buffer (<5%) does NOT claim to be comfortable, but issues a warning."""
    # Estimated budget for Ha Long 2 days is 3.2M + 2 * 250k = 3.7M
    # If user provides budget of 3,750,000 (diff = 50k, 1.33% buffer)
    params = {
        "destination_slug": "ha-long",
        "days": 2,
        "pace": "moderate",
        "budget": 3_750_000.0,
    }
    result = ItineraryPlanner.plan_itinerary(params=params, locale="vi")
    assert result["success"] is True
    msg = result["message"]
    assert "rất thoải mái" not in msg
    assert "tương đối sát với mức dự toán tối thiểu" in msg
    assert "không đủ an toàn để coi là thoải mái" in msg


def test_plan_itinerary_transit_realism_dalat(db):
    """Verify realistic transit distances and no unproven route optimization claim."""
    Destination.objects.create(
        slug="da-lat",
        name="Đà Lạt",
        country="Việt Nam",
        starting_price=2150000,
        is_published=True,
    )
    params = {
        "destination_slug": "da-lat",
        "days": 3,
        "pace": "relaxed",
    }
    result = ItineraryPlanner.plan_itinerary(params=params, locale="vi")
    assert result["success"] is True
    msg = result["message"]
    # Verify realistic distances
    assert "30 - 32 km" in msg
    assert "Liên Khương" in msg
    assert "Cầu Đất" in msg
    assert "Hồ Tuyền Lâm" in msg
    # Verify no unproven optimization claims
    assert "tối ưu dựa trên dữ liệu" not in msg
    assert "gợi ý tham khảo" in msg

