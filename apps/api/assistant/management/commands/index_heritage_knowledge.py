from django.core.management.base import BaseCommand

from assistant.data.vietnam_heritage_history import VIETNAM_HERITAGE_HISTORY
from assistant.models import AssistantKnowledgeChunk
from destinations.models import Destination


class Command(BaseCommand):
    help = "Index curated historical and cultural heritage knowledge chunks for RAG Assistant"

    def handle(self, *args, **options):
        self.stdout.write("Bắt đầu nạp tri thức lịch sử & văn hóa các danh lam thắng cảnh...")
        indexed_count = 0

        for item in VIETNAM_HERITAGE_HISTORY:
            dest_slug = str(item.get("destination_slug") or "")
            dest = Destination.objects.filter(slug=dest_slug).first()

            chunk, created = AssistantKnowledgeChunk.objects.update_or_create(
                entity_type=AssistantKnowledgeChunk.EntityType.PLACE,
                entity_slug=str(item["slug"]),
                defaults={
                    "entity_id": dest.id if dest else None,
                    "title": str(item["landmark_name"]),
                    "content_vi": str(item["content_vi"]),
                    "content_en": str(item.get("content_en", "")),
                    "metadata": {
                        "destination_slug": dest_slug,
                        "historical_period": item.get("historical_period", ""),
                        "unesco_status": item.get("unesco_status", ""),
                        "tags": item.get("tags", []),
                        "category": "heritage_history",
                        "type": "place",
                        "best_time_to_visit": item.get("best_time_to_visit", ""),
                        "signature_cuisine": item.get("signature_cuisine", []),
                        "must_try_activities": item.get("must_try_activities", []),
                        "insider_tips": item.get("insider_tips", []),
                        "ideal_duration": item.get("ideal_duration", ""),
                        "target_travelers": item.get("target_travelers", []),
                        "recommended_tour_slugs": item.get("recommended_tour_slugs", []),
                    },
                },
            )
            action_text = "Đã tạo mới" if created else "Đã cập nhật"
            self.stdout.write(f"- {action_text}: {item['landmark_name']}")
            indexed_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Hoàn thành! Đã nạp thành công {indexed_count} khối tri thức lịch sử chuyên sâu vào Assistant Knowledge Store."
            )
        )
