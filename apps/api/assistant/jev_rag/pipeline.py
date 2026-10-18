"""Query -> candidate retrieval -> Jev rerank/gate -> generate or abstain."""

from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass, field

from .contracts import Answer, Generator, Judge, Retriever
from .gating import GatePolicy, select_evidence
from .http_client import ProviderError

VI_NO_DOCS = "Xin lỗi, STAR Travels chưa có đủ tài liệu đã xác minh để trả lời câu hỏi này."
EN_NO_DOCS = "STAR Travels does not have enough verified documentation to answer that question."


@dataclass
class JevRagPipeline:
    retriever: Retriever
    judge: Judge
    generator: Generator
    policy: GatePolicy = field(default_factory=GatePolicy)
    candidate_k: int = 8
    max_judgements: int = 8
    max_workers: int = 3

    def ask(self, query: str, locale: str = "vi") -> Answer:
        if not query or len(query) > 2000:
            return Answer("error", "Invalid query", reason="invalid_query")
        no_docs = EN_NO_DOCS if locale == "en" else VI_NO_DOCS
        try:
            candidates = self.retriever.search(query, limit=self.candidate_k)
        except Exception:  # fail closed; the caller logs sanitized traceback with correlation id
            return Answer("error", no_docs, reason="retrieval_failed")
        # Never dispatch duplicate passages or unbounded remote judgments.
        distinct = {p.chunk_id: p for p in candidates if p.text.strip() and p.url.strip()}
        passages = list(distinct.values())[: self.max_judgements]
        if not passages:
            return Answer("abstained", no_docs, reason="no_candidates")
        try:
            with ThreadPoolExecutor(max_workers=self.max_workers) as pool:
                judgments = list(pool.map(lambda p: self.judge.assess(query, p), passages))
            evaluations = [
                self.policy.classify(p, j) for p, j in zip(passages, judgments, strict=False)
            ]
        except (ProviderError, OSError, ValueError):
            return Answer("error", no_docs, reason="jev_unavailable", evaluated=0)
        accepted, conflicts = select_evidence(evaluations, self.policy)
        if not accepted and not conflicts:
            return Answer(
                "abstained", no_docs, reason="insufficient_evidence", evaluated=len(evaluations)
            )
        materials = accepted + conflicts
        sources = tuple(
            {"id": f"S{i}", "title": ev.passage.title, "url": ev.passage.url}
            for i, ev in enumerate(materials, 1)
        )
        try:
            answer = self.generator.generate(query, accepted, conflicts)
        except (ProviderError, OSError, ValueError):
            return Answer("error", no_docs, reason="generation_failed", evaluated=len(evaluations))
        return Answer("answered", answer, sources=sources, evaluated=len(evaluations))
