"""Curated local file indexing. Staff-only management command (not a web endpoint).

Example:
 python manage.py index_jev_rag --file docs/approved.pdf --source-id document:abc \
   --title 'Chinh sach tour' --url /guide/tour-policy/ --published
"""

from __future__ import annotations

import os
from pathlib import Path

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from assistant.jev_rag_v2.curation import IngestionService


class Command(BaseCommand):
    help = "Index or unpublish an approved document into pgvector."

    def add_arguments(self, parser):
        parser.add_argument("--file")
        parser.add_argument("--source-id", required=True)
        parser.add_argument("--title")
        parser.add_argument("--url")
        parser.add_argument("--locale", choices=["vi", "en"], default="vi")
        mode = parser.add_mutually_exclusive_group(required=True)
        mode.add_argument("--published", action="store_true")
        mode.add_argument("--unpublish", action="store_true")

    def handle(self, *args, **options):
        # Only index explicitly verified and approved sources; never assume
        # that having a local file makes the content publicly releasable.
        from django.db import connection

        from assistant.jev_rag_v2.embedding import EmbeddingClient
        from assistant.jev_rag_v2.store import PgVectorStore

        source_id = options["source_id"]
        dim = int(os.environ.get("RAG_EMBEDDING_DIMENSIONS", "1536"))
        store = PgVectorStore(connection, dimension=dim)
        if options["unpublish"]:
            with transaction.atomic():
                store.unpublish(source_id)
            self.stdout.write(self.style.SUCCESS(f"Unpublished {source_id}"))
            return
        if not options["file"] or not options["title"] or not options["url"]:
            raise CommandError("--published requires --file, --title and --url")
        required = ("RAG_EMBEDDING_ENDPOINT", "RAG_EMBEDDING_API_KEY", "RAG_EMBEDDING_MODEL")
        if any(not os.getenv(name) for name in required):
            raise CommandError("Embedding provider must be configured explicitly")
        embed = EmbeddingClient(
            os.environ["RAG_EMBEDDING_ENDPOINT"],
            os.environ["RAG_EMBEDDING_API_KEY"],
            os.environ["RAG_EMBEDDING_MODEL"],
            dim,
        )
        ingestion = IngestionService(store, embed)
        with transaction.atomic():
            count = ingestion.index_file(
                source_id=source_id,
                title=options["title"],
                file_path=Path(options["file"]),
                url=options["url"],
                published=True,
                locale=options["locale"],
            )
        self.stdout.write(self.style.SUCCESS(f"Indexed {count} chunks from {source_id}"))
