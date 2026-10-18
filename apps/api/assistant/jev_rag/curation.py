"""Backfill curated/published sources into a pgvector store.

Run under transaction.atomic() for each source. Avoid signals on every save:
wire after the existing approved CMS commit, using the existing Celery worker.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from .ingestion import chunk_text, extract_local_file


@dataclass
class IngestionService:
    store: Any
    embedder: Any

    def index_text(
        self,
        *,
        source_id: str,
        source_type: str,
        title: str,
        text: str,
        url: str,
        locale: str = "vi",
        published: bool = False,
    ) -> int:
        if not published:
            self.store.unpublish(source_id)
            return 0
        chunks = chunk_text(f"{title}\n{text}")
        if not chunks:
            self.store.unpublish(source_id)
            return 0
        if self.store.source_unchanged(
            source_id=source_id, source_type=source_type, url=url, locale=locale, chunks=chunks
        ):
            return len(chunks)
        vectors = self.embedder.embed([c.text for c in chunks])
        return self.store.upsert_chunks(
            source_id=source_id,
            source_type=source_type,
            title=title,
            url=url,
            chunks=chunks,
            vectors=vectors,
            locale=locale,
            published=True,
        )

    def index_file(
        self,
        *,
        source_id: str,
        title: str,
        file_path: Any,
        url: str,
        published: bool,
        locale: str = "vi",
    ) -> int:
        text = extract_local_file(file_path)
        return self.index_text(
            source_id=source_id,
            source_type="document",
            title=title,
            text=text,
            url=url,
            published=published,
            locale=locale,
        )
