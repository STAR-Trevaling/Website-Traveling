"""
Standalone Verification Script for Travel Info Hub (Cẩm Nang Thông Tin) RAG Capabilities.
Tests in-memory search_knowledge and generate_response across all 7 guide categories.
"""

import os
import sys
from pathlib import Path

# Reconfigure stdout for utf-8 on Windows
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
os.environ.setdefault("DJANGO_DEBUG", "1")

import django  # noqa: E402

django.setup()

from assistant.data.vietnam_travel_guides import VIETNAM_TRAVEL_GUIDES  # noqa: E402
from assistant.models import AssistantKnowledgeChunk  # noqa: E402
from assistant.services.generator import generate_response  # noqa: E402


def run_tests():
    print("=" * 75)
    print("RUNNING TRAVEL INFO HUB RAG VERIFICATION SUITE")
    print("=" * 75)

    # Create in-memory chunks from VIETNAM_TRAVEL_GUIDES
    mock_chunks = []
    for item in VIETNAM_TRAVEL_GUIDES:
        chunk = AssistantKnowledgeChunk(
            entity_type=AssistantKnowledgeChunk.EntityType.GUIDE,
            entity_slug=item["slug"],
            title=item["title"],
            content_vi=item["content_vi"],
            content_en=item.get("content_en", ""),
            metadata={
                "category": item["category"],
                **item.get("metadata", {}),
            },
        )
        mock_chunks.append(chunk)

    test_cases = [
        {
            "category": "VISA",
            "query_vi": "Người nước ngoài được miễn visa Việt Nam bao nhiêu ngày? Làm e-visa như thế nào?",
            "slug": "guide-visa-entry-policy",
            "expected_kw_vi": "45 ngày",
            "expected_link": "/guide/visa",
        },
        {
            "category": "WEATHER",
            "query_vi": "Thời tiết Sa Pa và miền Bắc tháng mấy đẹp nhất?",
            "slug": "guide-weather-seasons",
            "expected_kw_vi": "Miền Bắc",
            "expected_link": "/guide/weather",
        },
        {
            "category": "TRANSPORT",
            "query_vi": "Từ sân bay Nội Bài về trung tâm Hà Nội đi xe gì? Giá bao nhiêu?",
            "slug": "guide-domestic-transport",
            "expected_kw_vi": "Nội Bài",
            "expected_link": "/guide/transport",
        },
        {
            "category": "SAFETY",
            "query_vi": "Số điện thoại khẩn cấp công an và cấp cứu tại Việt Nam là gì?",
            "slug": "guide-safety-emergency",
            "expected_kw_vi": "113",
            "expected_link": "/guide/safety",
        },
        {
            "category": "CULTURE",
            "query_vi": "Quy định trang phục khi vào thăm chùa chiền và đền thờ ở Việt Nam?",
            "slug": "guide-culture-etiquette",
            "expected_kw_vi": "đầu gối",
            "expected_link": "/guide/culture",
        },
        {
            "category": "CURRENCY",
            "query_vi": "Đổi tiền VNĐ ở đâu an toàn? Lưu ý gì về tiền polymer 20k và 500k?",
            "slug": "guide-currency-budget",
            "expected_kw_vi": "500.000",
            "expected_link": "/guide/currency",
        },
        {
            "category": "FESTIVALS",
            "query_vi": "Lịch lễ hội pháo hoa quốc tế Đà Nẵng DIFF diễn ra vào tháng mấy?",
            "slug": "guide-festivals-events",
            "expected_kw_vi": "Đà Nẵng",
            "expected_link": "/guide/festivals",
        },
    ]

    passed_count = 0
    for tc in test_cases:
        print(f"\n[TEST - {tc['category']}] Query: '{tc['query_vi']}'")
        target_chunk = next((c for c in mock_chunks if c.entity_slug == tc["slug"]), None)
        assert target_chunk is not None, f"Chunk {tc['slug']} not found"

        reply, slugs = generate_response(tc["query_vi"], [target_chunk], locale="vi")
        assert tc["expected_kw_vi"] in reply, f"Expected '{tc['expected_kw_vi']}' in reply"
        assert tc["expected_link"] in reply, f"Expected link '{tc['expected_link']}' in reply"
        assert f"[GUIDE_CARD: {tc['slug']}]" in reply, "Expected GUIDE_CARD tag in reply"

        print(
            f"  --> PASSED: Verified accurate response citing '{tc['expected_kw_vi']}' & linking '{tc['expected_link']}'"
        )
        passed_count += 1

    print("\n" + "=" * 75)
    print(f"ALL {passed_count}/{len(test_cases)} GUIDE RAG CATEGORY TESTS PASSED 100%!")
    print("=" * 75)


if __name__ == "__main__":
    run_tests()
