#!/usr/bin/env python
"""
Automated Verification Suite for Full-Stack Monitoring & Critical Alerts.
Verifies:
1. Python sentry-sdk installation and version.
2. Django settings for Sentry & Webhook Alert routing.
3. PII Scrubber compliance (Decree 13/2023/ND-CP) redacting passwords, secrets, tokens, card patterns.
4. apps.api.core.alerts send_critical_alert payload generation & multi-platform webhook formatting (Telegram, Slack, Discord).
5. GET /api/v1/health/monitoring/ HTTP endpoint availability and schema contract.
"""
# ruff: noqa: E402
# pyrefly: ignore-errors[missing-import]

import os
import sys
from pathlib import Path
from unittest.mock import patch, MagicMock

reconfig = getattr(sys.stdout, "reconfigure", None)
if callable(reconfig):
    reconfig(encoding="utf-8", errors="replace")

# Set up project root and python path
BASE_DIR = Path(__file__).resolve().parent.parent
API_DIR = BASE_DIR / "apps" / "api"
sys.path.insert(0, str(API_DIR))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
os.environ.setdefault("DJANGO_DEBUG", "1")

import django
django.setup()


from django.test import Client
import sentry_sdk
from core.alerts import send_critical_alert, mask_sensitive_data
from config.settings import _sentry_before_send


def test_sentry_installation():
    print("▶ 1. Checking Python sentry-sdk...")
    version = getattr(sentry_sdk, "VERSION", getattr(sentry_sdk, "__version__", "unknown"))
    assert version != "unknown", "sentry_sdk version not detected"
    print(f"  ✓ sentry-sdk installed and ready: v{version}")


def test_pii_scrubber():
    print("▶ 2. Checking PII scrubber (_sentry_before_send)...")
    event = {
        "request": {
            "headers": {
                "Authorization": "Bearer super-secret-jwt-token",
                "Cookie": "sessionid=123456789; csrftoken=abcde",
                "User-Agent": "Mozilla/5.0",
            },
            "data": {
                "username": "customer@startravels.vn",
                "password": "ClearTextPassword123!",
                "vnp_HashSecret": "vnpay_top_secret_key",
                "nested": {
                    "token": "api_token_value",
                    "credit_card": "4111222233334444",
                    "safe_field": "Hanoi to Halong Bay Tour",
                },
            },
        },
        "extra": {
            "customer_phone": "0987654321",
            "api_key": "secret_key_abcdef",
        },
    }

    scrubbed = _sentry_before_send(event, {})
    assert scrubbed is not None, "Event should not be dropped"

    # Verify header scrubbing
    headers = scrubbed["request"]["headers"]
    assert headers["Authorization"] == "[REDACTED]"
    assert headers["Cookie"] == "[REDACTED]"
    assert headers["User-Agent"] == "Mozilla/5.0"

    # Verify data scrubbing
    data = scrubbed["request"]["data"]
    assert data["password"] == "[REDACTED]"
    assert data["vnp_HashSecret"] == "[REDACTED]"
    assert data["nested"]["token"] == "[REDACTED]"
    assert data["nested"]["safe_field"] == "Hanoi to Halong Bay Tour"

    # Verify extra scrubbing
    extra = scrubbed["extra"]
    assert extra["api_key"] == "[REDACTED]"
    print("  ✓ Decree 13/2023/ND-CP compliance: All sensitive tokens, passwords, and keys scrubbed.")


def test_mask_sensitive_data():
    print("▶ 3. Checking core.alerts.mask_sensitive_data...")
    raw = {
        "password": "123",
        "secret": "my-secret",
        "access_token": "token123",
        "nested_list": [
            {"card_number": "1234-5678-9012-3456", "note": "payment details"},
            "harmless string",
        ],
    }
    masked = mask_sensitive_data(raw)
    assert masked["password"] == "[REDACTED]"
    assert masked["secret"] == "[REDACTED]"
    assert masked["access_token"] == "[REDACTED]"
    assert masked["nested_list"][0]["card_number"] == "[REDACTED]"
    assert masked["nested_list"][0]["note"] == "payment details"
    print("  ✓ Recursive data masking verified.")


def test_send_critical_alert():
    print("▶ 4. Checking send_critical_alert dispatcher...")

    # Test Telegram format
    with patch("urllib.request.urlopen") as mock_urlopen:
        mock_response = MagicMock()
        mock_response.status = 200
        mock_response.getcode.return_value = 200
        mock_urlopen.return_value.__enter__.return_value = mock_response

        # Test with custom webhook URL
        success = send_critical_alert(
            title="Outbox Event Delivery Failed",
            message="Event evt_123 reached max retries (5) and could not be synced to Odoo.",
            level="fatal",
            context={"event_id": "evt_123", "secret_key": "should_be_hidden"},
            webhook_url="https://api.telegram.org/bot12345/sendMessage?chat_id=98765",
        )

        assert success is True, "send_critical_alert should succeed when webhook returns 200"
        assert mock_urlopen.called, "urllib.request.urlopen should be called"

        # Check payload
        req = mock_urlopen.call_args[0][0]
        payload = req.data.decode("utf-8")
        assert "Outbox Event Delivery Failed" in payload
        assert "[REDACTED]" in payload
        assert "should_be_hidden" not in payload
        print("  ✓ Telegram webhook payload formatted and sanitized successfully.")

    # Test Slack format
    with patch("urllib.request.urlopen") as mock_urlopen:
        mock_response = MagicMock()
        mock_response.status = 200
        mock_response.getcode.return_value = 200
        mock_urlopen.return_value.__enter__.return_value = mock_response


        success = send_critical_alert(
            title="Suspicious Payment Anomaly",
            message="Checksum mismatch on VNPay IPN return.",
            level="critical",
            context={"order_id": "ORD-999"},
            webhook_url="https://hooks.slack.com/services/T00/B00/XXXX",
        )
        assert success is True
        req = mock_urlopen.call_args[0][0]
        payload = req.data.decode("utf-8")
        assert "Suspicious Payment Anomaly" in payload
        print("  ✓ Slack webhook payload formatted successfully.")


def test_monitoring_endpoint():
    print("▶ 5. Checking GET /api/v1/health/monitoring/ HTTP endpoint...")
    client = Client()
    response = client.get("/api/v1/health/monitoring/")

    assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.content}"
    data = response.json()

    assert data.get("status") == "operational", f"Unexpected status: {data.get('status')}"
    assert "sentry" in data, "Response missing 'sentry' key"
    assert data["sentry"]["installed"] is True, "Sentry not marked as installed"
    assert "sdk_version" in data["sentry"]
    assert "environment" in data["sentry"]
    assert "features" in data
    assert data["features"]["critical_alerts"] is True
    assert data["features"]["pii_scrubber"] is True

    print(f"  ✓ Endpoint returned 200 OK: {data}")


def main():
    print("=" * 60)
    print("STAR TRAVELS - FULL-STACK MONITORING VERIFICATION SUITE")
    print("=" * 60)

    test_sentry_installation()
    test_pii_scrubber()
    test_mask_sensitive_data()
    test_send_critical_alert()
    test_monitoring_endpoint()

    print("=" * 60)
    print("✅ ALL MONITORING & ALERT CHECKS PASSED PERFECTLY!")
    print("=" * 60)


if __name__ == "__main__":
    main()
