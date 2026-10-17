"""Index approved database catalog entities (Destinations, Tours, Places, Articles, Guides)

into pgvector store for Jev RAG v2.
Idempotent: skips re-embedding unchanged sources using SHA256 content hashes.
"""

from __future__ import annotations

import os

from django.core.management.base import BaseCommand, CommandError
from django.db import connection, transaction

from assistant.jev_rag_v2.curation import IngestionService
from assistant.jev_rag_v2.embedding import EmbeddingClient
from assistant.jev_rag_v2.store import PgVectorStore


class Command(BaseCommand):
    help = "Index published catalog items (destinations, tours, places, guides, stories) into pgvector."

    def add_arguments(self, parser):
        parser.add_argument("--locale", choices=["vi", "en"], default="vi")
        parser.add_argument(
            "--prune", action="store_true", help="Unpublish vector chunks for inactive records"
        )

    def handle(self, *args, **options):
        locale = options["locale"]
        dim = int(os.environ.get("RAG_EMBEDDING_DIMENSIONS", "1536"))
        required = ("RAG_EMBEDDING_ENDPOINT", "RAG_EMBEDDING_API_KEY", "RAG_EMBEDDING_MODEL")
        if any(not os.getenv(name) for name in required):
            raise CommandError(
                "Embedding provider must be configured explicitly: " + ", ".join(required)
            )

        embed = EmbeddingClient(
            os.environ["RAG_EMBEDDING_ENDPOINT"],
            os.environ["RAG_EMBEDDING_API_KEY"],
            os.environ["RAG_EMBEDDING_MODEL"],
            dim,
        )
        store = PgVectorStore(connection, dimension=dim)
        ingestion = IngestionService(store, embed)

        total_indexed = 0

        # 1. Destinations
        try:
            from destinations.models import Destination

            for dest in Destination.objects.all():
                is_pub = getattr(dest, "is_published", True)
                title = (
                    dest.name_en if locale == "en" and getattr(dest, "name_en", "") else dest.name
                )
                desc = (
                    (dest.description_en or dest.summary_en or "")
                    if locale == "en"
                    else (dest.description or dest.summary or "")
                )
                with transaction.atomic():
                    count = ingestion.index_text(
                        source_id=f"destination:{dest.slug}",
                        source_type="destination",
                        title=title,
                        text=f"{dest.name}\n{desc}".strip(),
                        url=f"/destinations/{dest.slug}",
                        locale=locale,
                        published=is_pub,
                    )
                    total_indexed += count
            self.stdout.write(self.style.SUCCESS("Indexed destinations."))
        except Exception as exc:
            self.stdout.write(self.style.WARNING(f"Skipping destinations: {exc}"))

        # 2. Tours
        try:
            from tours.models import Tour

            for tour in Tour.objects.all():
                is_pub = getattr(tour, "is_published", True)
                title = (
                    tour.title_en
                    if locale == "en" and getattr(tour, "title_en", "")
                    else tour.title
                )
                overview = (
                    getattr(tour, "overview_en", "")
                    if locale == "en" and getattr(tour, "overview_en", "")
                    else getattr(tour, "overview", "")
                )
                with transaction.atomic():
                    count = ingestion.index_text(
                        source_id=f"tour:{tour.slug}",
                        source_type="tour",
                        title=title,
                        text=f"{title}\n{overview}".strip(),
                        url=f"/tours/{tour.slug}",
                        locale=locale,
                        published=is_pub,
                    )
                    total_indexed += count
            self.stdout.write(self.style.SUCCESS("Indexed tours."))
        except Exception as exc:
            self.stdout.write(self.style.WARNING(f"Skipping tours: {exc}"))

        # 3. Places / Experiences
        try:
            from places.models import Place

            for place in Place.objects.all():
                is_pub = getattr(place, "is_published", True)
                title = (
                    place.name_en
                    if locale == "en" and getattr(place, "name_en", "")
                    else place.name
                )
                desc = (
                    (place.description_en or place.short_description_en or "")
                    if locale == "en"
                    else (place.description or place.short_description or "")
                )
                with transaction.atomic():
                    count = ingestion.index_text(
                        source_id=f"place:{place.slug}",
                        source_type="place",
                        title=title,
                        text=f"{title}\n{desc}".strip(),
                        url=f"/experiences/{place.slug}",
                        locale=locale,
                        published=is_pub,
                    )
                    total_indexed += count
            self.stdout.write(self.style.SUCCESS("Indexed places."))
        except Exception as exc:
            self.stdout.write(self.style.WARNING(f"Skipping places: {exc}"))

        # 4. Curated Travel Guides (Travel Info Hub)
        try:
            from assistant.data.vietnam_travel_guides import VIETNAM_TRAVEL_GUIDES

            for item in VIETNAM_TRAVEL_GUIDES:
                title = (
                    str(item.get("title_en") or item["title"])
                    if locale == "en"
                    else str(item["title"])
                )
                text = (
                    str(item.get("content_en") or item.get("content_vi", ""))
                    if locale == "en"
                    else str(item.get("content_vi", ""))
                )
                metadata_obj = item.get("metadata")
                guide_route = (
                    metadata_obj.get("guide_route") if isinstance(metadata_obj, dict) else None
                )
                guide_url = str(guide_route or f"/guide/{item['slug']}")
                with transaction.atomic():
                    count = ingestion.index_text(
                        source_id=f"guide:{item['slug']}",
                        source_type="guide",
                        title=title,
                        text=f"{title}\n{text}".strip(),
                        url=guide_url,
                        locale=locale,
                        published=True,
                    )
                    total_indexed += count
            self.stdout.write(self.style.SUCCESS("Indexed curated travel guides."))
        except Exception as exc:
            self.stdout.write(self.style.WARNING(f"Skipping curated travel guides: {exc}"))

        # 5. Guide Articles (Database directory)
        try:
            from guides.models import GuideArticle

            for guide in GuideArticle.objects.select_related("category").all():
                is_pub = getattr(guide, "is_published", True)
                title = (
                    guide.title_en
                    if locale == "en" and getattr(guide, "title_en", "")
                    else guide.title
                )
                body = (
                    (guide.summary_en or "") + "\n" + (guide.body_en or "")
                    if locale == "en"
                    else (guide.summary or "") + "\n" + (guide.body or "")
                )
                guide_url = (
                    f"/guide/{guide.category.slug}"
                    if getattr(guide, "category", None)
                    else f"/guide/{guide.slug}"
                )
                with transaction.atomic():
                    count = ingestion.index_text(
                        source_id=f"guide-article:{guide.slug}",
                        source_type="guide",
                        title=title,
                        text=f"{title}\n{body}".strip(),
                        url=guide_url,
                        locale=locale,
                        published=is_pub,
                    )
                    total_indexed += count
            self.stdout.write(self.style.SUCCESS("Indexed database guide articles."))
        except Exception as exc:
            self.stdout.write(self.style.WARNING(f"Skipping database guide articles: {exc}"))

        # 6. Articles / Stories
        try:
            from content.models import Article

            for article in Article.objects.all():
                is_pub = getattr(article, "status", "published") == "published"
                title = article.title
                excerpt = getattr(article, "excerpt", "") or ""
                body = getattr(article, "body", "") or ""
                text = f"{title}\n{excerpt}\n{body}".strip()
                with transaction.atomic():
                    count = ingestion.index_text(
                        source_id=f"article:{article.slug}",
                        source_type="article",
                        title=title,
                        text=text,
                        url=f"/stories/{article.slug}",
                        locale=locale,
                        published=is_pub,
                    )
                    total_indexed += count
            self.stdout.write(self.style.SUCCESS("Indexed articles."))
        except Exception as exc:
            self.stdout.write(self.style.WARNING(f"Skipping articles: {exc}"))

        self.stdout.write(
            self.style.SUCCESS(f"Catalog indexing complete. Total chunks synced: {total_indexed}")
        )
