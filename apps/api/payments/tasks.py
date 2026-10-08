import logging

from celery import shared_task
from django.utils import timezone

from .models import PaymentTransaction

logger = logging.getLogger(__name__)


@shared_task
def sweep_expired_payments() -> int:
    """
    Periodic task to sweep and mark pending payment transactions as expired
    if their expiration timestamp (expires_at) has passed.
    """
    now = timezone.now()
    pending_expired = PaymentTransaction.objects.filter(
        status=PaymentTransaction.Status.PENDING,
        expires_at__isnull=False,
        expires_at__lte=now,
    )
    count = pending_expired.update(status=PaymentTransaction.Status.EXPIRED)
    if count > 0:
        logger.info(f"Swept {count} expired payment transactions to 'expired' status.")
    return count
