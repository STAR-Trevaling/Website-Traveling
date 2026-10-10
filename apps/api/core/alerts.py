import json
import logging
import os
import urllib.error
import urllib.request
from typing import Any, Dict, Optional

from django.conf import settings
from django.utils import timezone

logger = logging.getLogger("star.alerts")


def mask_sensitive_data(data: Any) -> Any:
    """Scrub sensitive keys from telemetry and alert payloads."""
    sensitive_keys = {
        "password",
        "token",
        "secret",
        "hash_secret",
        "vnpay_hash_secret",
        "vnp_hashsecret",
        "cvv",
        "credit_card",
        "card_number",
        "authorization",
        "api_key",
        "cookie",
    }
    if isinstance(data, dict):
        masked = {}
        for k, v in data.items():
            if any(s in str(k).lower() for s in sensitive_keys):
                masked[k] = "[REDACTED]"
            else:
                masked[k] = mask_sensitive_data(v)
        return masked
    elif isinstance(data, (list, tuple)):
        return [mask_sensitive_data(item) for item in data]
    return data



def send_critical_alert(
    title: str,
    message: str,
    context: Optional[Dict[str, Any]] = None,
    severity: str = "critical",
    level: Optional[str] = None,
    webhook_url: Optional[str] = None,
) -> bool:
    """
    Dispatch critical business & operational alerts to Sentry and optional Webhook (Telegram/Slack/Discord).
    Never throws an unhandled exception to prevent disrupting primary business transactions.
    """
    effective_severity = level or severity
    clean_context = mask_sensitive_data(context) if context else {}
    timestamp = timezone.now().isoformat()

    # 1. Log structured alert locally
    logger.error(
        f"[ALERT][{effective_severity.upper()}] {title} - {message} | context: {clean_context}"
    )

    # 2. Forward to Sentry if initialized
    try:
        import sentry_sdk

        if sentry_sdk.is_initialized():
            with sentry_sdk.push_scope() as scope:
                scope.set_level(effective_severity if effective_severity in ("info", "warning", "error", "fatal") else "error")
                scope.set_tag("alert_title", title)
                for k, v in clean_context.items():
                    scope.set_extra(k, v)
                sentry_sdk.capture_message(f"[{effective_severity.upper()}] {title}: {message}")
    except Exception as e:
        logger.debug(f"Sentry alert capture skipped: {e}")

    # 3. Forward to Alert Webhook (Telegram / Slack / Discord / Generic Webhook)
    target_webhook = webhook_url or getattr(settings, "ALERT_WEBHOOK_URL", None) or os.getenv("ALERT_WEBHOOK_URL")
    if not target_webhook:
        return True

    try:
        headers = {"Content-Type": "application/json", "User-Agent": "StarTravels-AlertBot/1.0"}

        # Format depending on destination platform
        lower_url = target_webhook.lower()

        if "slack" in lower_url:
            payload = {
                "text": f"🚨 *[STAR Travels {effective_severity.upper()}] {title}*\n{message}",
                "attachments": [
                    {
                        "color": "#dc2626" if effective_severity == "critical" else "#f59e0b",
                        "fields": [
                            {"title": k, "value": str(v), "short": True}
                            for k, v in list(clean_context.items())[:6]
                        ],
                        "footer": "STAR Travels Monitoring",
                        "ts": int(timezone.now().timestamp()),
                    }
                ],
            }
        elif "discord" in lower_url:
            payload = {
                "content": f"🚨 **[STAR Travels {effective_severity.upper()}] {title}**\n{message}\n```json\n{json.dumps(clean_context, indent=2)}\n```"
            }
        elif "telegram" in lower_url:
            text = f"🚨 *[STAR Travels {effective_severity.upper()}] {title}*\n\n{message}"
            if clean_context:
                text += f"\n\n`{json.dumps(clean_context, ensure_ascii=False)}`"
            payload = {"text": text, "parse_mode": "Markdown"}
        else:
            payload = {
                "system": "STAR Travels Vietnam",
                "severity": effective_severity,
                "title": title,
                "message": message,
                "context": clean_context,
                "timestamp": timestamp,
            }

        body_bytes = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(target_webhook, data=body_bytes, headers=headers, method="POST")
        with urllib.request.urlopen(req, timeout=3) as resp:  # nosec B310
            code = resp.getcode() if callable(getattr(resp, "getcode", None)) else getattr(resp, "status", 200)
            return 200 <= code < 300

    except Exception as webhook_err:
        logger.warning(f"Failed to deliver alert to webhook: {webhook_err}")
        return False

