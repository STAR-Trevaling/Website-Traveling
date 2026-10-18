"""Versioned, deterministic policy over Jev judgements."""

from __future__ import annotations

from dataclasses import dataclass

from .contracts import Evidence, Judgement, Passage


@dataclass(frozen=True)
class GatePolicy:
    version: str = "travel-evidence-v1"
    relevant_min: float = 0.55
    support_min: float = 0.65
    injection_block_at: float = 0.70
    conflict_at: float = 0.80
    max_evidence: int = 4

    def classify(self, passage: Passage, judgment: Judgement) -> Evidence:
        if judgment.prompt_injection >= self.injection_block_at:
            decision = "exclude"
        elif (
            judgment.premise_conflict >= self.conflict_at
            and judgment.relevance >= self.relevant_min
        ):
            decision = "conflict"
        elif (
            judgment.relevance >= self.relevant_min and judgment.answer_support >= self.support_min
        ):
            decision = "include"
        else:
            decision = "exclude"
        # Rank primarily by directly relevant, answer-bearing evidence.
        grade = 0.65 * judgment.relevance + 0.35 * judgment.answer_support
        return Evidence(passage, judgment, decision, grade)


def select_evidence(
    evaluated: list[Evidence], policy: GatePolicy
) -> tuple[list[Evidence], list[Evidence]]:
    ranked = sorted(evaluated, key=lambda item: (-item.rerank_score, item.passage.chunk_id))
    accepted = [item for item in ranked if item.decision == "include"][: policy.max_evidence]
    conflicts = [item for item in ranked if item.decision == "conflict"][: policy.max_evidence]
    return accepted, conflicts
