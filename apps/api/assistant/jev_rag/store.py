"""Minimal PostgreSQL pgvector hybrid store; parameterized queries.

Accepts a Django connection object (django.db.connection). pgvector extension
and schema must be created by a reviewed migration before use.
"""

from __future__ import annotations

import json
import math
from dataclasses import dataclass
from typing import Any

from .contracts import Passage


@dataclass
class PgVectorStore:
    connection: Any
    dimension: int = 1536
    rrf_k: int = 60

    def _vector_literal(self, vector: list[float]) -> str:
        if len(vector) != self.dimension or not all(
            isinstance(n, (int, float)) and math.isfinite(n) for n in vector
        ):
            raise ValueError("Invalid embedding vector dimension/value")
        return "[" + ",".join(format(float(n), ".9g") for n in vector) + "]"

    def source_unchanged(
        self, *, source_id: str, source_type: str, url: str, locale: str, chunks: list[Any]
    ) -> bool:
        """Avoid embedding API calls for unchanged approved source versions."""
        import hashlib

        expected = {
            hashlib.sha256(f"{source_type}:{source_id}:{c.index}".encode()).hexdigest(): c.digest
            for c in chunks
        }
        with self.connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT chunk_id, content_hash, source_type, source_url, locale, published
                FROM assistant_rag_vector_chunk WHERE source_id=%s
            """,
                [source_id],
            )
            existing = cursor.fetchall()
        return (
            bool(expected)
            and len(existing) == len(expected)
            and all(
                id_ in expected
                and expected[id_] == digest
                and kind == source_type
                and link == url
                and lang == locale
                and published
                for id_, digest, kind, link, lang, published in existing
            )
        )

    def upsert_chunks(
        self,
        *,
        source_id: str,
        source_type: str,
        title: str,
        url: str,
        chunks: list[Any],
        vectors: list[list[float]],
        locale: str = "vi",
        published: bool = False,
    ) -> int:
        if not published:
            raise ValueError("Only approved/published content may be indexed")
        if not url.startswith("/") or url.startswith("//"):
            raise ValueError("Only canonical local source URLs allowed")
        if len(chunks) != len(vectors):
            raise ValueError("Chunk/embedding count mismatch")
        import hashlib

        rows = []
        for ch, vector in zip(chunks, vectors, strict=False):
            chunk_id = hashlib.sha256(f"{source_type}:{source_id}:{ch.index}".encode()).hexdigest()
            rows.append(
                (
                    chunk_id,
                    source_id,
                    source_type,
                    title,
                    ch.text,
                    locale,
                    url,
                    ch.digest,
                    self._vector_literal(vector),
                    True,
                    "{}",
                )
            )
        # Caller controls transaction: all upserts + prune must commit atomically.
        with self.connection.cursor() as cursor:
            for params in rows:
                cursor.execute(
                    """
                    INSERT INTO assistant_rag_vector_chunk
                      (chunk_id, source_id, source_type, title, content, locale, source_url,
                       content_hash, embedding, published, metadata)
                    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s::vector,%s,%s::jsonb)
                    ON CONFLICT (chunk_id) DO UPDATE SET
                      title = EXCLUDED.title, content = EXCLUDED.content,
                      content_hash = EXCLUDED.content_hash, locale = EXCLUDED.locale,
                      source_url = EXCLUDED.source_url, embedding = EXCLUDED.embedding,
                      published = EXCLUDED.published, updated_at = now()
                    WHERE assistant_rag_vector_chunk.content_hash IS DISTINCT FROM EXCLUDED.content_hash
                       OR assistant_rag_vector_chunk.embedding IS DISTINCT FROM EXCLUDED.embedding
                       OR assistant_rag_vector_chunk.published IS DISTINCT FROM EXCLUDED.published
                       OR assistant_rag_vector_chunk.source_url IS DISTINCT FROM EXCLUDED.source_url
                       OR assistant_rag_vector_chunk.title IS DISTINCT FROM EXCLUDED.title
                       OR assistant_rag_vector_chunk.locale IS DISTINCT FROM EXCLUDED.locale
                """,
                    params,
                )
            keep = [r[0] for r in rows]
            if keep:
                cursor.execute(
                    "DELETE FROM assistant_rag_vector_chunk WHERE source_id=%s AND NOT (chunk_id = ANY(%s))",
                    [source_id, keep],
                )
            else:
                cursor.execute(
                    "DELETE FROM assistant_rag_vector_chunk WHERE source_id=%s", [source_id]
                )
        return len(rows)

    def unpublish(self, source_id: str) -> None:
        with self.connection.cursor() as cursor:
            cursor.execute("DELETE FROM assistant_rag_vector_chunk WHERE source_id=%s", [source_id])

    def hybrid_search(
        self, query: str, query_vector: list[float], limit: int = 8, locale: str = "vi"
    ) -> list[Passage]:
        """Exact cosine + PostgreSQL FTS shortlist, fused with RRF in Python.

        Does not add ANN complexity at small travel-catalog sizes. Locale is
        restricted to published content. All user inputs are SQL parameters.
        """
        limit = min(max(1, limit), 30)
        pool = min(90, limit * 4)
        with self.connection.cursor() as cursor:
            # Dual-path lexical retrieval: direct 'simple' + immutable unaccent for Vietnamese diacritics
            try:
                cursor.execute(
                    """
                    SELECT chunk_id,source_id,source_type,title,content,source_url,locale,metadata
                    FROM assistant_rag_vector_chunk
                    WHERE published=TRUE AND locale=%s
                      AND (
                          to_tsvector('simple', title || ' ' || content) @@ plainto_tsquery('simple', %s)
                          OR to_tsvector('simple', f_unaccent(title || ' ' || content)) @@ plainto_tsquery('simple', f_unaccent(%s))
                      )
                    ORDER BY ts_rank(to_tsvector('simple', f_unaccent(title || ' ' || content)),
                                     plainto_tsquery('simple', f_unaccent(%s))) DESC, chunk_id
                    LIMIT %s
                """,
                    [locale, query, query, query, pool],
                )
            except Exception:
                cursor.execute(
                    """
                    SELECT chunk_id,source_id,source_type,title,content,source_url,locale,metadata
                    FROM assistant_rag_vector_chunk
                    WHERE published=TRUE AND locale=%s
                      AND to_tsvector('simple',title || ' ' || content) @@ plainto_tsquery('simple',%s)
                    ORDER BY ts_rank(to_tsvector('simple',title || ' ' || content),
                                     plainto_tsquery('simple',%s)) DESC, chunk_id
                    LIMIT %s
                """,
                    [locale, query, query, pool],
                )
            lexical = cursor.fetchall()
            cursor.execute(
                """
                SELECT chunk_id,source_id,source_type,title,content,source_url,locale,metadata
                FROM assistant_rag_vector_chunk
                WHERE published=TRUE AND locale=%s
                ORDER BY embedding <=> %s::vector, chunk_id
                LIMIT %s
            """,
                [locale, self._vector_literal(query_vector), pool],
            )
            semantic = cursor.fetchall()
        merged: dict[str, tuple[tuple, float]] = {}
        for group in (lexical, semantic):
            for rank, row in enumerate(group, 1):
                old = merged.get(row[0])
                merged[row[0]] = (row, (old[1] if old else 0) + 1.0 / (self.rrf_k + rank))
        ranked = sorted(merged.values(), key=lambda item: (-item[1], item[0][0]))[:limit]
        result = []
        for row, score in ranked:
            meta = row[7]
            if isinstance(meta, str):
                meta = json.loads(meta)
            result.append(
                Passage(
                    source_id=row[1],
                    chunk_id=row[0],
                    source_type=row[2],
                    title=row[3],
                    text=row[4],
                    url=row[5],
                    language=row[6],
                    metadata=meta or {},
                    rank_score=score,
                )
            )
        return result


@dataclass
class HybridRetriever:
    store: PgVectorStore
    embedder: Any
    locale: str = "vi"

    def search(self, query: str, limit: int = 8) -> list[Passage]:
        vector = self.embedder.embed([query])[0]
        return self.store.hybrid_search(query, vector, limit=limit, locale=self.locale)
