"""Evaluate recorded independent retrieval/evidence predictions (no network).

JSONL rows: {"id":"...","gold_ids":["..."],"answerable":true,
             "predicted_ids":["..."],"status":"answered|abstained|error"}
Run separately for BASELINE, RAG, JEV+RAG over the SAME fixed corpus.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path


def evaluate(rows):
    positive = [r for r in rows if r["answerable"] and r["gold_ids"]]
    negatives = [r for r in rows if not r["answerable"]]
    hit1 = sum(any(x in r["gold_ids"] for x in r["predicted_ids"][:1]) for r in positive)
    hit3 = sum(any(x in r["gold_ids"] for x in r["predicted_ids"][:3]) for r in positive)
    refused = sum(r["status"] == "abstained" for r in negatives)
    false_refused = sum(r["status"] == "abstained" for r in positive)
    false_answer = sum(r["status"] == "answered" for r in negatives)
    return {
        "positive": len(positive),
        "negative": len(negatives),
        "hit_at_1": hit1 / len(positive) if positive else None,
        "hit_at_3": hit3 / len(positive) if positive else None,
        "negative_correct_abstention": refused / len(negatives) if negatives else None,
        "negative_false_answer_rate": false_answer / len(negatives) if negatives else None,
        "positive_false_abstention": false_refused / len(positive) if positive else None,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("predictions", type=Path)
    args = parser.parse_args()
    rows = [json.loads(line) for line in args.predictions.read_text(encoding="utf-8").splitlines() if line.strip()]
    print(json.dumps(evaluate(rows), indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
