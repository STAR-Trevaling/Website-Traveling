"""Offline deterministic contract/security tests; no network, Django or DB required."""

from __future__ import annotations

import tempfile
import unittest
from pathlib import Path
from unittest.mock import Mock, patch

from assistant.jev_rag_v2.contracts import Judgement, Passage
from assistant.jev_rag_v2.gating import GatePolicy
from assistant.jev_rag_v2.generation import ChatGenerator
from assistant.jev_rag_v2.http_client import ProviderError
from assistant.jev_rag_v2.ingestion import chunk_text, extract_local_file
from assistant.jev_rag_v2.jev import JevJudge, redact_pii
from assistant.jev_rag_v2.pipeline import JevRagPipeline
from assistant.jev_rag_v2.store import PgVectorStore


def doc(code="one", txt="Vịnh Hạ Long thuộc Quảng Ninh."):
    return Passage(
        "destination:ha-long", code, "Vịnh Hạ Long", txt, "/destinations/ha-long/", "destination"
    )


class FakeRetriever:
    def __init__(self, docs):
        self.docs = docs

    def search(self, query, limit):
        return self.docs[:limit]


class FakeJudge:
    def __init__(self, answers):
        self.answers = answers
        self.queries = []

    def assess(self, query, passage):
        self.queries.append(query)
        return self.answers[passage.chunk_id]


class FakeGenerator:
    def __init__(self):
        self.calls = 0

    def generate(self, query, evidence, conflicts):
        self.calls += 1
        return "Vịnh Hạ Long nằm ở Quảng Ninh [S1]."


class TestPipeline(unittest.TestCase):
    def test_empty_corpus_abstains_without_llm(self):
        llm = FakeGenerator()
        ans = JevRagPipeline(FakeRetriever([]), FakeJudge({}), llm).ask("Vịnh Hạ Long ở đâu?")
        self.assertEqual(ans.status, "abstained")
        self.assertEqual(llm.calls, 0)

    def test_valid_evidence_answers_with_sources(self):
        llm = FakeGenerator()
        judge = FakeJudge({"one": Judgement(0.95, 0.93, 0.02, 0.01)})
        result = JevRagPipeline(FakeRetriever([doc()]), judge, llm).ask("Vịnh Hạ Long ở đâu?")
        self.assertEqual(result.status, "answered")
        self.assertEqual(result.sources[0]["id"], "S1")
        self.assertEqual(result.sources[0]["url"], "/destinations/ha-long/")
        self.assertEqual(llm.calls, 1)

    def test_injection_is_blocked_before_generation(self):
        llm = FakeGenerator()
        judge = FakeJudge({"one": Judgement(0.99, 0.99, 0.98, 0.01)})
        result = JevRagPipeline(FakeRetriever([doc()]), judge, llm).ask("Vịnh Hạ Long ở đâu?")
        self.assertEqual(result.status, "abstained")
        self.assertEqual(llm.calls, 0)

    def test_irrelevant_document_is_rejected(self):
        llm = FakeGenerator()
        result = JevRagPipeline(
            FakeRetriever([doc()]), FakeJudge({"one": Judgement(0.25, 0.2, 0.01)}), llm
        ).ask("Lãi suất ngân hàng?")
        self.assertEqual(result.reason, "insufficient_evidence")

    def test_conflicting_premise_preserved_for_correction(self):
        judge = FakeJudge({"one": Judgement(0.94, 0.5, 0.01, 0.94)})
        result = JevRagPipeline(FakeRetriever([doc()]), judge, FakeGenerator()).ask(
            "Vịnh Hạ Long nằm ở Hà Nội?"
        )
        self.assertEqual(result.status, "answered")

    def test_duplicate_chunks_only_evaluated_once(self):
        judge = FakeJudge({"one": Judgement(0.91, 0.98, 0.01)})
        result = JevRagPipeline(FakeRetriever([doc(), doc()]), judge, FakeGenerator()).ask(
            "Vịnh Hạ Long?"
        )
        self.assertEqual(result.evaluated, 1)

    def test_timeout_provider_fails_closed(self):
        bad = Mock()
        bad.assess.side_effect = ProviderError("down")
        result = JevRagPipeline(FakeRetriever([doc()]), bad, FakeGenerator()).ask("Vịnh Hạ Long?")
        self.assertEqual(result.status, "error")
        self.assertEqual(result.reason, "jev_unavailable")

    def test_limits(self):
        result = JevRagPipeline(FakeRetriever([doc()]), FakeJudge({}), FakeGenerator()).ask(
            "x" * 2001
        )
        self.assertEqual(result.reason, "invalid_query")


class TestJev(unittest.TestCase):
    def test_real_payload_structure_and_judgement_parsing(self):
        payload = {
            "answers": {
                "relevance": {"type": "score", "score": 3.0, "confidence": 0.9},
                "answer_support": {"type": "noul", "noul": 0.95},
                "prompt_injection": {"type": "noul", "noul": 0.05},
                "premise_conflict": {"type": "noul", "noul": 0.02},
            }
        }
        with patch("assistant.jev_rag_v2.jev.post_json", return_value=payload) as request:
            decision = JevJudge("fake-api-key").assess("Phone: 0911223344", doc())
        self.assertEqual(decision.relevance, 1.0)
        args = request.call_args.args
        self.assertEqual(args[0], "https://api.typesafe.ai/v1/systemone")
        body = args[2]
        self.assertIn("[PHONE]", body["state"]["query"])
        self.assertEqual(
            set(body["questions"]),
            {"relevance", "answer_support", "prompt_injection", "premise_conflict"},
        )

    def test_malformed_decisions_are_not_treated_as_positive(self):
        with (
            patch("assistant.jev_rag_v2.jev.post_json", return_value={"answers": {}}),
            self.assertRaises(ProviderError),
        ):
            JevJudge("fake-key").assess("question", doc())

    def test_pii_redaction(self):
        output = redact_pii("Email a.b@example.com hoặc gọi 0987654321")
        self.assertNotIn("example.com", output)
        self.assertNotIn("0987654321", output)


class TestIngest(unittest.TestCase):
    def test_chunk_ids_and_hashes_are_stable(self):
        one = chunk_text("Hạ Long " * 500)
        two = chunk_text("Hạ Long " * 500)
        self.assertEqual(one, two)
        self.assertGreater(len(one), 1)
        self.assertTrue(all(x.digest for x in one))

    def test_chunking_boundaries(self):
        with self.assertRaises(ValueError):
            chunk_text("text", 100, 200)

    def test_text_document(self):
        with tempfile.TemporaryDirectory() as td:
            f = Path(td) / "guide.md"
            f.write_text("Tour Hạ Long", encoding="utf-8")
            self.assertEqual(extract_local_file(f), "Tour Hạ Long")

    def test_unsupported_extension(self):
        with tempfile.TemporaryDirectory() as td:
            f = Path(td) / "malware.exe"
            f.write_bytes(b"binary")
            with self.assertRaises(ValueError):
                extract_local_file(f)


class TestStorage(unittest.TestCase):
    def test_embedding_dimension_is_enforced(self):
        store = PgVectorStore(Mock(), dimension=3)
        self.assertEqual(store._vector_literal([1.0, 2.0, 3.0]), "[1,2,3]")
        with self.assertRaises(ValueError):
            store._vector_literal([1.0, 2.0])


class TestGeneration(unittest.TestCase):
    def test_rejects_hallucinated_citation_ids(self):
        result = {"choices": [{"message": {"content": "Unknown [S9]"}}]}
        with (
            patch("assistant.jev_rag_v2.generation.post_json", return_value=result),
            self.assertRaises(ProviderError),
        ):
            ChatGenerator("https://example.com/v1/chat/completions", "key", "model").generate(
                "Q", [GatePolicy().classify(doc(), Judgement(0.99, 0.99, 0.01))], []
            )

    def test_rejects_answers_without_citation(self):
        result = {"choices": [{"message": {"content": "Unknown"}}]}
        with (
            patch("assistant.jev_rag_v2.generation.post_json", return_value=result),
            self.assertRaises(ProviderError),
        ):
            ChatGenerator("https://example.com/v1/chat/completions", "key", "model").generate(
                "Q", [GatePolicy().classify(doc(), Judgement(0.99, 0.99, 0.01))], []
            )


class TestCuration(unittest.TestCase):
    def test_unchanged_source_avoids_embedding_call(self):
        from assistant.jev_rag_v2.curation import IngestionService

        store = Mock()
        store.source_unchanged.return_value = True
        emb = Mock()
        count = IngestionService(store, emb).index_text(
            source_id="destination:1",
            source_type="destination",
            title="Hạ Long",
            text="Nằm ở Quảng Ninh",
            url="/destinations/ha-long",
            published=True,
        )
        self.assertEqual(count, 1)
        emb.embed.assert_not_called()
        store.upsert_chunks.assert_not_called()

    def test_unpublish_removes_vectors_without_embedding(self):
        from assistant.jev_rag_v2.curation import IngestionService

        store, emb = Mock(), Mock()
        result = IngestionService(store, emb).index_text(
            source_id="destination:1",
            source_type="destination",
            title="Hạ Long",
            text="Draft",
            url="/destinations/ha-long",
            published=False,
        )
        self.assertEqual(result, 0)
        store.unpublish.assert_called_once_with("destination:1")
        emb.embed.assert_not_called()

    def test_canonical_url_rejects_external_or_protocol_relative(self):
        store = PgVectorStore(Mock())
        with self.assertRaises(ValueError):
            store.upsert_chunks(
                source_id="x",
                source_type="article",
                title="x",
                url="//evil.test/",
                chunks=[],
                vectors=[],
                published=True,
            )


class TestEvaluation(unittest.TestCase):
    def test_hit_metrics_and_false_abstention(self):
        import sys
        from pathlib import Path

        sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "scripts"))
        from eval_predictions import evaluate

        report = evaluate(
            [
                {
                    "answerable": True,
                    "gold_ids": ["a"],
                    "predicted_ids": ["b", "a"],
                    "status": "answered",
                },
                {"answerable": False, "gold_ids": [], "predicted_ids": [], "status": "abstained"},
            ]
        )
        self.assertEqual(report["hit_at_1"], 0)
        self.assertEqual(report["hit_at_3"], 1)
        self.assertEqual(report["negative_correct_abstention"], 1)


if __name__ == "__main__":
    unittest.main()
