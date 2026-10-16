import hashlib
import logging
from typing import Any

from django.core.management.base import BaseCommand
from django.db import transaction

from assistant.data.vietnam_heritage_history import VIETNAM_HERITAGE_HISTORY
from assistant.data.vietnam_travel_guides import VIETNAM_TRAVEL_GUIDES
from assistant.models import AssistantKnowledgeChunk
from destinations.models import Destination
from tours.models import Tour

logger = logging.getLogger(__name__)


def compute_content_hash(text: str) -> str:
    return hashlib.sha256(text.strip().encode("utf-8")).hexdigest()[:16]


class Command(BaseCommand):
    help = (
        "Idempotent reindexing of published travel catalog, guides, heritage, "
        "and policies into the RAG knowledge store with duplicate prevention and optional prune."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--prune",
            action="store_true",
            help="Prune knowledge chunks whose underlying source entity is unpublished or deleted.",
        )
        parser.add_argument(
            "--force",
            action="store_true",
            help="Force rewrite of all knowledge chunks even if content hash is unchanged.",
        )

    @transaction.atomic
    def handle(self, *args, **options):
        prune: bool = options.get("prune", False)
        force: bool = options.get("force", False)

        self.stdout.write("============================================================")
        self.stdout.write("STAR Travels RAG Knowledge Store — Idempotent Reindex")
        self.stdout.write("============================================================")

        created_count = 0
        updated_count = 0
        skipped_count = 0
        pruned_count = 0

        # 1. Index Published Destinations
        destinations = Destination.objects.filter(is_published=True)
        active_dest_slugs = set()
        for dest in destinations:
            active_dest_slugs.add(dest.slug)
            content_vi = f"{dest.name} ({dest.country}). {dest.summary}\n\n{dest.description}"
            content_en = (
                f"{dest.name_en or dest.name} ({dest.country_en or dest.country}). "
                f"{dest.summary_en or dest.summary}\n\n{dest.description_en or dest.description}"
            )
            content_hash = compute_content_hash(content_vi)
            meta: dict[str, Any] = {
                "slug": dest.slug,
                "starting_price": str(dest.starting_price) if dest.starting_price else None,
                "type": "destination",
                "content_hash": content_hash,
                "is_published": True,
            }

            existing = AssistantKnowledgeChunk.objects.filter(
                entity_type=AssistantKnowledgeChunk.EntityType.DESTINATION,
                entity_slug=dest.slug,
            ).first()

            if existing and not force and existing.metadata.get("content_hash") == content_hash:
                skipped_count += 1
                continue

            _, created = AssistantKnowledgeChunk.objects.update_or_create(
                entity_type=AssistantKnowledgeChunk.EntityType.DESTINATION,
                entity_slug=dest.slug,
                defaults={
                    "entity_id": dest.id,
                    "title": dest.name,
                    "content_vi": content_vi,
                    "content_en": content_en,
                    "metadata": meta,
                },
            )
            if created:
                created_count += 1
            else:
                updated_count += 1

        # 2. Index Published Tours
        tours = Tour.objects.filter(is_published=True)
        active_tour_slugs = set()
        for tour in tours:
            active_tour_slugs.add(tour.slug)
            itinerary_text_vi = "\n".join(
                [
                    f"Ngày {d.get('day')}: {d.get('title')} — Sáng: {d.get('morning')} | Chiều: {d.get('afternoon')} | Tối: {d.get('evening')}"
                    for d in (tour.itinerary or [])
                ]
            )
            highlights_text = ", ".join(tour.highlights or [])
            inclusions_text = ", ".join(tour.included or [])
            exclusions_text = ", ".join(tour.excluded or [])

            chunk_body = (
                f"Tour: {tour.title} ({tour.duration})\n"
                f"Điểm đến: {tour.destination_name} (Vùng: {tour.region})\n"
                f"Khởi hành: {tour.departure} | Giá vé: {int(tour.price):,} VNĐ/khách\n"
                f"Tổng quan: {tour.overview}\n"
                f"Điểm nổi bật: {highlights_text}\n"
                f"Lịch trình chi tiết:\n{itinerary_text_vi}\n"
                f"Bao gồm: {inclusions_text}\n"
                f"Không bao gồm: {exclusions_text}"
            )
            content_hash = compute_content_hash(chunk_body)
            meta = {
                "slug": tour.slug,
                "price": float(tour.price),
                "region": tour.region,
                "duration": tour.duration,
                "departure": tour.departure,
                "type": "tour",
                "content_hash": content_hash,
                "is_published": True,
            }

            existing = AssistantKnowledgeChunk.objects.filter(
                entity_type=AssistantKnowledgeChunk.EntityType.TOUR,
                entity_slug=tour.slug,
            ).first()

            if existing and not force and existing.metadata.get("content_hash") == content_hash:
                skipped_count += 1
                continue

            _, created = AssistantKnowledgeChunk.objects.update_or_create(
                entity_type=AssistantKnowledgeChunk.EntityType.TOUR,
                entity_slug=tour.slug,
                defaults={
                    "entity_id": tour.id,
                    "title": tour.title,
                    "content_vi": chunk_body,
                    "content_en": (
                        f"Tour: {tour.title_en or tour.title} ({tour.duration_en or tour.duration}). "
                        f"Price: {int(tour.price):,} VND. Destination: {tour.destination_name_en or tour.destination_name}. "
                        f"Overview: {tour.overview_en or tour.overview}"
                    ),
                    "metadata": meta,
                },
            )
            if created:
                created_count += 1
            else:
                updated_count += 1

        # 3. Index Practical Travel Guides
        for guide in VIETNAM_TRAVEL_GUIDES:
            content_vi_raw = str(guide.get("content_vi") or "")
            content_hash = compute_content_hash(content_vi_raw)
            raw_meta = guide.get("metadata")
            extra_meta: dict[str, Any] = dict(raw_meta) if isinstance(raw_meta, dict) else {}
            meta: dict[str, Any] = {
                "category": str(guide.get("category", "guide")),
                "title_en": str(guide.get("title_en", "")),
                "content_hash": content_hash,
                **extra_meta,
            }

            existing = AssistantKnowledgeChunk.objects.filter(
                entity_type=AssistantKnowledgeChunk.EntityType.GUIDE,
                entity_slug=str(guide["slug"]),
            ).first()

            if existing and not force and existing.metadata.get("content_hash") == content_hash:
                skipped_count += 1
                continue

            _, created = AssistantKnowledgeChunk.objects.update_or_create(
                entity_type=AssistantKnowledgeChunk.EntityType.GUIDE,
                entity_slug=str(guide["slug"]),
                defaults={
                    "title": str(guide["title"]),
                    "content_vi": str(guide["content_vi"]),
                    "content_en": str(guide.get("content_en", "")),
                    "metadata": meta,
                },
            )
            if created:
                created_count += 1
            else:
                updated_count += 1

        # 4. Index Curated Heritage & History
        for item in VIETNAM_HERITAGE_HISTORY:
            dest_slug = str(item.get("destination_slug") or "")
            dest = Destination.objects.filter(slug=dest_slug).first()
            content_hash = compute_content_hash(str(item["content_vi"]))
            meta = {
                "destination_slug": dest_slug,
                "historical_period": item.get("historical_period", ""),
                "unesco_status": item.get("unesco_status", ""),
                "tags": item.get("tags", []),
                "category": "heritage_history",
                "type": "place",
                "content_hash": content_hash,
                "best_time_to_visit": item.get("best_time_to_visit", ""),
                "signature_cuisine": item.get("signature_cuisine", []),
                "must_try_activities": item.get("must_try_activities", []),
                "insider_tips": item.get("insider_tips", []),
                "ideal_duration": item.get("ideal_duration", ""),
                "target_travelers": item.get("target_travelers", []),
                "recommended_tour_slugs": item.get("recommended_tour_slugs", []),
            }

            existing = AssistantKnowledgeChunk.objects.filter(
                entity_type=AssistantKnowledgeChunk.EntityType.PLACE,
                entity_slug=str(item["slug"]),
            ).first()

            if existing and not force and existing.metadata.get("content_hash") == content_hash:
                skipped_count += 1
                continue

            _, created = AssistantKnowledgeChunk.objects.update_or_create(
                entity_type=AssistantKnowledgeChunk.EntityType.PLACE,
                entity_slug=str(item["slug"]),
                defaults={
                    "entity_id": dest.id if dest else None,
                    "title": str(item["landmark_name"]),
                    "content_vi": str(item["content_vi"]),
                    "content_en": str(item.get("content_en", "")),
                    "metadata": meta,
                },
            )
            if created:
                created_count += 1
            else:
                updated_count += 1

        # 5. Index Core Policies
        policy_items = [
            (
                "chinh-sach-dat-tour-va-hoan-huy",
                "Chính sách Đặt tour, Thanh toán và Hoàn hủy",
                "STAR Travels hỗ trợ đặt cọc 50% khi đăng ký tour và thanh toán số còn lại trước ngày khởi hành 03 ngày. Hủy tour trước 07 ngày miễn phí 100%. Hủy tour từ 03-06 ngày phạt 30%. Hủy tour trong vòng 48 giờ phạt 100% chi phí.",
                "STAR Travels requires 50% deposit upon booking, balance paid 3 days prior to departure. Free cancellation up to 7 days before departure.",
            ),
            (
                "chinh-sach-tre-em-va-phu-thu",
                "Chính sách Trẻ em & Phụ thu phòng đơn",
                "Trẻ em dưới 5 tuổi: Miễn phí (ngồi chung ghế xe và ngủ cùng bố mẹ). Trẻ em từ 5 đến 9 tuổi: 75% giá tour người lớn (có ghế riêng, ăn riêng, ngủ cùng bố mẹ). Trẻ em từ 10 tuổi trở lên: Tính 100% giá tour người lớn. Phụ thu phòng đơn áp dụng khi khách đi 1 mình.",
                "Children under 5: Free of charge. Children 5-9: 75% adult price. Children 10+: Full adult price.",
            ),
        ]
        for p_slug, p_title, p_vi, p_en in policy_items:
            content_hash = compute_content_hash(p_vi)
            meta = {"type": "policy", "category": "policy", "slug": p_slug, "content_hash": content_hash}

            existing = AssistantKnowledgeChunk.objects.filter(
                entity_type=AssistantKnowledgeChunk.EntityType.POLICY,
                entity_slug=p_slug,
            ).first()

            if existing and not force and existing.metadata.get("content_hash") == content_hash:
                skipped_count += 1
                continue

            _, created = AssistantKnowledgeChunk.objects.update_or_create(
                entity_type=AssistantKnowledgeChunk.EntityType.POLICY,
                entity_slug=p_slug,
                defaults={
                    "title": p_title,
                    "content_vi": p_vi,
                    "content_en": p_en,
                    "metadata": meta,
                },
            )
            if created:
                created_count += 1
            else:
                updated_count += 1

        # 6. Optional Prune of Unpublished/Deleted Entities
        if prune:
            # Prune Tour chunks whose tour is no longer published
            stale_tours = AssistantKnowledgeChunk.objects.filter(
                entity_type=AssistantKnowledgeChunk.EntityType.TOUR
            ).exclude(entity_slug__in=active_tour_slugs)
            pruned_count += stale_tours.count()
            stale_tours.delete()

            # Prune Destination chunks whose destination is no longer published
            stale_dests = AssistantKnowledgeChunk.objects.filter(
                entity_type=AssistantKnowledgeChunk.EntityType.DESTINATION
            ).exclude(entity_slug__in=active_dest_slugs)
            pruned_count += stale_dests.count()
            stale_dests.delete()

        self.stdout.write(
            self.style.SUCCESS(
                f"Reindexing Complete! Created: {created_count}, Updated: {updated_count}, "
                f"Unchanged/Skipped: {skipped_count}, Pruned: {pruned_count}."
            )
        )
