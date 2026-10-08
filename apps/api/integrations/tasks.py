import hashlib
import hmac
import json
import logging
import urllib.error
import urllib.request

from celery import shared_task
from django.conf import settings
from django.utils import timezone

from .models import Inquiry, IntegrationOutbox

logger = logging.getLogger(__name__)


@shared_task(bind=True, max_retries=5)
def dispatch_outbox_event(self, outbox_id):
    """
    Asynchronously dispatch a single Outbox event to Odoo with HMAC signature & exponential backoff.
    """
    try:
        outbox = IntegrationOutbox.objects.get(id=outbox_id)
    except IntegrationOutbox.DoesNotExist:
        logger.error(f"Outbox record {outbox_id} does not exist.")
        return False

    if outbox.state == IntegrationOutbox.State.DELIVERED:
        return True

    odoo_base = getattr(settings, "ODOO_BASE_URL", "http://localhost:8069").rstrip("/")
    secret = getattr(settings, "ODOO_WEBHOOK_SECRET", "star_travels_super_secret_webhook_key_2026")

    endpoint_map = {
        "inquiry.created": f"{odoo_base}/api/v1/travel/inquiry",
        "lead.created": f"{odoo_base}/api/v1/travel/inquiry",
        "partner.application.created": f"{odoo_base}/api/v1/travel/partner-application",
    }
    url = endpoint_map.get(outbox.event_type, f"{odoo_base}/api/v1/travel/inquiry")

    raw_body = json.dumps(outbox.payload).encode("utf-8")
    signature = hmac.new(secret.encode("utf-8"), raw_body, hashlib.sha256).hexdigest()

    headers = {
        "Content-Type": "application/json",
        "User-Agent": "StarTravels-Django/1.0",
        "X-Signature-SHA256": signature,
        "X-Event-Type": outbox.event_type,
        "X-Event-ID": outbox.event_id,
        "Idempotency-Key": outbox.event_id,
    }

    req = urllib.request.Request(url, data=raw_body, headers=headers, method="POST")

    try:
        with urllib.request.urlopen(req, timeout=10) as resp:  # nosec B310
            status_code = resp.getcode()
            resp_body = resp.read().decode("utf-8")
            if 200 <= status_code < 300:
                outbox.state = IntegrationOutbox.State.DELIVERED
                outbox.delivered_at = timezone.now()
                outbox.http_status = status_code
                outbox.last_error = ""
                outbox.save(update_fields=["state", "delivered_at", "http_status", "last_error"])

                # Update linked Inquiry status if available
                try:
                    resp_data = json.loads(resp_body)
                    inquiry_id = outbox.payload.get("data", {}).get("inquiry_id")
                    if inquiry_id:
                        inquiry = Inquiry.objects.filter(id=inquiry_id).first()
                        if inquiry:
                            inquiry.status = Inquiry.Status.SYNCED
                            inquiry.odoo_lead_id = resp_data.get("lead_id")
                            inquiry.save(update_fields=["status", "odoo_lead_id"])
                except Exception as update_err:
                    logger.warning(f"Could not update inquiry status: {update_err}")

                logger.info(
                    f"Successfully dispatched Outbox Event {outbox.event_id} to Odoo ({status_code})"
                )
                return True
    except urllib.error.HTTPError as e:
        err_msg = f"HTTP {e.code}: {e.read().decode('utf-8', errors='ignore')}"
        status_code = e.code
    except Exception as e:
        err_msg = f"Network error: {str(e)}"
        status_code = 0

    # Failure handling
    new_retries = self.request.retries + 1
    outbox.retry_count = new_retries
    outbox.last_error = err_msg
    outbox.http_status = status_code

    if new_retries >= outbox.max_retries:
        outbox.state = IntegrationOutbox.State.FAILED
        outbox.save(update_fields=["state", "retry_count", "last_error", "http_status"])
        logger.error(f"Permanently failed Outbox Event {outbox.event_id}: {err_msg}")
    else:
        # Exponential backoff countdown: 10s, 30s, 90s, 270s
        countdown = 10 * (3 ** (new_retries - 1))
        outbox.next_retry_at = timezone.now() + timezone.timedelta(seconds=countdown)
        outbox.save(update_fields=["retry_count", "next_retry_at", "last_error", "http_status"])
        logger.warning(f"Retrying Outbox Event {outbox.event_id} in {countdown}s: {err_msg}")
        raise self.retry(exc=Exception(err_msg), countdown=countdown)


@shared_task
def sweep_pending_outbox():
    """Periodic task to pick up pending outbox events that are due for retry."""
    now = timezone.now()
    pending = IntegrationOutbox.objects.filter(
        state=IntegrationOutbox.State.PENDING, next_retry_at__lte=now
    )[:50]
    for rec in pending:
        dispatch_outbox_event.delay(str(rec.id))
    return len(pending)
