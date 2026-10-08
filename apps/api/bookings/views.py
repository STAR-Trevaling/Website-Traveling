import logging
import uuid

from django.utils import timezone
from rest_framework import permissions, viewsets

from integrations.models import IntegrationOutbox
from integrations.tasks import dispatch_outbox_event

from .models import Booking
from .serializers import BookingSerializer

logger = logging.getLogger(__name__)


class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = (permissions.AllowAny,)
    http_method_names = ("get", "post", "head", "options")

    def get_queryset(self):
        user = self.request.user
        if user and user.is_authenticated and getattr(user, "is_staff", False):
            return Booking.objects.select_related("tour", "customer").all()
        if user and user.is_authenticated:
            return Booking.objects.filter(customer=user).select_related("tour")
        return Booking.objects.none()

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        booking = serializer.save(customer=user)

        # Transactional Outbox event for Odoo ERP sync
        try:
            event_id = str(uuid.uuid4())
            envelope = {
                "event_id": event_id,
                "event_type": "booking.created",
                "event_version": 1,
                "source": "website",
                "occurred_at": timezone.now().isoformat(),
                "data": {
                    "booking_id": str(booking.id),
                    "booking_code": booking.booking_code,
                    "contact_name": booking.contact_name,
                    "contact_email": booking.contact_email,
                    "contact_phone": booking.contact_phone,
                    "tour_slug": booking.tour.slug if booking.tour else None,
                    "departure_date": booking.departure_date.isoformat()
                    if booking.departure_date
                    else None,
                    "pax_adults": booking.pax_adults,
                    "pax_children": booking.pax_children,
                    "total_amount": str(booking.total_amount),
                    "currency": booking.currency,
                    "special_requests": booking.special_requests,
                },
            }
            outbox = IntegrationOutbox.objects.create(
                event_id=event_id,
                event_type="booking.created",
                event_version=1,
                source="website",
                payload=envelope,
                state=IntegrationOutbox.State.PENDING,
            )
            dispatch_outbox_event.delay(str(outbox.id))
        except Exception as exc:
            logger.warning(f"Failed to enqueue booking outbox event: {exc}")
