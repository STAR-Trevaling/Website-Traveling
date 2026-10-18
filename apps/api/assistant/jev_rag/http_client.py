"""Narrow HTTP JSON boundary: explicit provider, no hidden retry/fallback."""

from __future__ import annotations

import json
import urllib.error
import urllib.parse
import urllib.request
from typing import Any


class ProviderError(RuntimeError):
    pass


def post_json(url: str, api_key: str, body: dict[str, Any], timeout: float) -> dict[str, Any]:
    parsed_url = urllib.parse.urlsplit(url)
    is_local = parsed_url.scheme == "http" and parsed_url.hostname in {
        "localhost",
        "127.0.0.1",
        "::1",
    }
    if parsed_url.scheme != "https" and not is_local:
        raise ProviderError("Provider endpoint must use HTTPS or explicit loopback HTTP")
    if not api_key:
        raise ProviderError("Provider API key is missing")
    request = urllib.request.Request(
        url,
        data=json.dumps(body, ensure_ascii=False).encode("utf-8"),
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:  # nosec B310
            parsed = json.load(response)
    except (urllib.error.URLError, TimeoutError, ValueError, OSError) as exc:
        raise ProviderError(f"Provider call failed: {type(exc).__name__}") from exc
    if not isinstance(parsed, dict):
        raise ProviderError("Unexpected provider response")
    return parsed
