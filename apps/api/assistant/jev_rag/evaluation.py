"""Offline evaluation metrics for JEV RAG pipeline (no network)."""
from __future__ import annotations


def evaluate(rows: list[dict]) -> dict:
    positive = [r for r in rows if r.get("answerable") and r.get("gold_ids")]
    negatives = [r for r in rows if not r.get("answerable")]
    hit1 = sum(any(x in r["gold_ids"] for x in r.get("predicted_ids", [])[:1]) for r in positive)
    hit3 = sum(any(x in r["gold_ids"] for x in r.get("predicted_ids", [])[:3]) for r in positive)
    refused = sum(r.get("status") == "abstained" for r in negatives)
    false_refused = sum(r.get("status") == "abstained" for r in positive)
    false_answer = sum(r.get("status") == "answered" for r in negatives)
    return {
        "positive": len(positive),
        "negative": len(negatives),
        "hit_at_1": hit1 / len(positive) if positive else None,
        "hit_at_3": hit3 / len(positive) if positive else None,
        "negative_correct_abstention": refused / len(negatives) if negatives else None,
        "negative_false_answer_rate": false_answer / len(negatives) if negatives else None,
        "positive_false_abstention": false_refused / len(positive) if positive else None,
    }
