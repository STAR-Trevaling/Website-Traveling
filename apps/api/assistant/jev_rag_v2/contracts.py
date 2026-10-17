"""Provider-independent contracts. Pure Python, importable without Django."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Protocol


@dataclass(frozen=True)
class Passage:
    source_id: str
    chunk_id: str
    title: str
    text: str
    url: str
    source_type: str = "article"
    language: str = "vi"
    rank_score: float = 0.0
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass(frozen=True)
class Judgement:
    relevance: float
    answer_support: float
    prompt_injection: float
    premise_conflict: float = 0.0


@dataclass(frozen=True)
class Evidence:
    passage: Passage
    judgement: Judgement
    decision: str  # include, conflict, exclude
    rerank_score: float


@dataclass(frozen=True)
class Answer:
    status: str  # answered, abstained, error
    text: str
    sources: tuple[dict[str, str], ...] = ()
    reason: str = ""
    evaluated: int = 0


class Retriever(Protocol):
    def search(self, query: str, limit: int) -> list[Passage]: ...


class Judge(Protocol):
    def assess(self, query: str, passage: Passage) -> Judgement: ...


class Generator(Protocol):
    def generate(self, query: str, evidence: list[Evidence], conflicts: list[Evidence]) -> str: ...


class Embedder(Protocol):
    def embed(self, texts: list[str]) -> list[list[float]]: ...
