import logging

from celery import shared_task
from django.utils import timezone

from .models import PaymentTransaction

logger = logging.getLogger(__name__)


@shared_task
def sweep_expired_payments() -> int:
    """
    Periodic task to sweep and mark pending payment transactions as expired
    if their expiration timestamp (expires_at) has passed, releasing the booking inventory hold slot.
    """
    now = timezone.now()
    pending_expired = PaymentTransaction.objects.filter(
        status=PaymentTransaction.Status.PENDING,
        expires_at__isnull=False,
        expires_at__lte=now,
    ).select_related("booking")

    count = 0
    for txn in pending_expired:
        txn.status = PaymentTransaction.Status.EXPIRED
        txn.save(update_fields=["status"])

        booking = txn.booking
        if booking and booking.status == "pending" and booking.payment_status in ("unpaid", "pending"):
            booking.status = "cancelled"
            booking.payment_status = "expired"
            booking.save(update_fields=["status", "payment_status", "updated_at"])
            logger.info(
                f"[HOLD-RELEASE] Released expired hold slot for booking {booking.booking_code} (TXN: {txn.transaction_code})."
            )
        count += 1

    if count > 0:
        logger.info(f"Swept {count} expired payment transactions and released booking hold slots.")
    return count

