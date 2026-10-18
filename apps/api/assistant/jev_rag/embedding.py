"""OpenAI-compatible embedding endpoint; no implicit model/provider switching."""

from __future__ import annotations

import math
from dataclasses import dataclass

from .http_client import ProviderError, post_json


@dataclass(frozen=True)
class EmbeddingClient:
    endpoint: str
    api_key: str
    model: str
    dimensions: int = 1536
    timeout: float = 15.0

    def embed(self, texts: list[str]) -> list[list[float]]:
        if not texts:
            return []
        if not self.model or self.dimensions < 1:
            raise ValueError("Embedding model/dimensions required")
        result = post_json(
            self.endpoint, self.api_key, {"model": self.model, "input": texts}, self.timeout
        )
        rows = result.get("data", [])
        if not isinstance(rows, list) or len(rows) != len(texts):
            raise ProviderError("Embedding response count mismatch")
        ordered = sorted(rows, key=lambda item: item["index"])
        vectors = [x.get("embedding") for x in ordered]
        if any(
            not isinstance(v, list)
            or len(v) != self.dimensions
            or not all(isinstance(n, (int, float)) and math.isfinite(n) for n in v)
            for v in vectors
        ):
            raise ProviderError("Embedding response dimension or numeric value invalid")
        return [[float(n) for n in v] for v in vectors]
