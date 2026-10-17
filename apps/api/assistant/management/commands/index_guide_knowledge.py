from django.core.management.base import BaseCommand

from assistant.data.vietnam_travel_guides import VIETNAM_TRAVEL_GUIDES
from assistant.models import AssistantKnowledgeChunk


class Command(BaseCommand):
    help = "Index curated practical travel guide knowledge chunks (Weather, Visa, Transport, Safety, Culture, Currency, Festivals) into RAG Knowledge Store"

    def handle(self, *args, **options):
        self.stdout.write(
            "Bắt đầu nạp tri thức Cẩm Nang Du Lịch (Travel Info Hub) vào RAG Knowledge Base..."
        )
        indexed_count = 0

        for item in VIETNAM_TRAVEL_GUIDES:
            metadata: dict[str, object] = {
                "category": str(item.get("category", "guide")),
                "title_en": str(item.get("title_en", "")),
            }
            raw_meta = item.get("metadata")
            if isinstance(raw_meta, dict):
                metadata.update(raw_meta)

            chunk, created = AssistantKnowledgeChunk.objects.update_or_create(
                entity_type=AssistantKnowledgeChunk.EntityType.GUIDE,
                entity_slug=str(item["slug"]),
                defaults={
                    "title": str(item["title"]),
                    "content_vi": str(item["content_vi"]),
                    "content_en": str(item.get("content_en", "")),
                    "metadata": metadata,
                },
            )
            action_text = "Đã tạo mới" if created else "Đã cập nhật"
            self.stdout.write(f"- {action_text}: {item['title']} (slug: {item['slug']})")
            indexed_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Hoàn thành! Đã nạp thành công {indexed_count} chuyên mục Cẩm Nang Du Lịch thực dụng vào Assistant Knowledge Store."
            )
        )
