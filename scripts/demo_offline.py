"""Offline functional demo. Fakes are deliberately test/demo-only, never production adapters."""
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "apps/api"))
from assistant.jev_rag.contracts import Judgement, Passage
from assistant.jev_rag.pipeline import JevRagPipeline


class DemoRetriever:
    def search(self, query, limit):
        return [
            Passage(
                "demo:dalat",
                "demo-1",
                "Đà Lạt",
                "Đà Lạt thuộc tỉnh Lâm Đồng.",
                "/destinations/da-lat/",
                "destination",
            )
        ]


class DemoJudge:
    def assess(self, query, passage):
        return Judgement(0.99, 0.99, 0.01)


class DemoGenerator:
    def generate(self, query, evidence, conflicts):
        return "Đà Lạt thuộc tỉnh Lâm Đồng [S1]."


if __name__ == "__main__":
    result = JevRagPipeline(DemoRetriever(), DemoJudge(), DemoGenerator()).ask("Đà Lạt ở đâu?")
    print(result)
