"""Explicit Django wiring. Import only inside a Django request/management command.

Call from the existing assistant chat endpoint behind JEV_EVIDENCE_ENABLED.
No new public endpoint, session store or CRM workflow is introduced.
"""

from __future__ import annotations

import os

from .embedding import EmbeddingClient
from .generation import ChatGenerator
from .jev import JevJudge
from .pipeline import JevRagPipeline
from .store import HybridRetriever, PgVectorStore


def make_pipeline(*, locale: str = "vi") -> JevRagPipeline:
    from django.db import connection

    required = (
        "TYPESAFE_API_KEY",
        "RAG_EMBEDDING_API_KEY",
        "RAG_EMBEDDING_ENDPOINT",
        "RAG_EMBEDDING_MODEL",
        "RAG_CHAT_API_KEY",
        "RAG_CHAT_ENDPOINT",
        "RAG_CHAT_MODEL",
    )
    missing = [name for name in required if not os.environ.get(name)]
    if missing:
        raise RuntimeError("Missing Jev/RAG settings: " + ", ".join(missing))
    dim = int(os.environ.get("RAG_EMBEDDING_DIMENSIONS", "1536"))
    embedder = EmbeddingClient(
        os.environ["RAG_EMBEDDING_ENDPOINT"],
        os.environ["RAG_EMBEDDING_API_KEY"],
        os.environ["RAG_EMBEDDING_MODEL"],
        dim,
    )
    store = PgVectorStore(connection=connection, dimension=dim)
    retriever = HybridRetriever(store=store, embedder=embedder, locale=locale)
    judge = JevJudge(api_key=os.environ["TYPESAFE_API_KEY"])
    generator = ChatGenerator(
        os.environ["RAG_CHAT_ENDPOINT"],
        os.environ["RAG_CHAT_API_KEY"],
        os.environ["RAG_CHAT_MODEL"],
    )
    return JevRagPipeline(retriever, judge, generator)
