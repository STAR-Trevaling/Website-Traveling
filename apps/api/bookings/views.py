import logging
import uuid

from django.utils import timezone
from rest_framework import permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from accommodations.models import Accommodation
from integrations.models import IntegrationOutbox
from integrations.tasks import dispatch_outbox_event
from restaurants.models import Restaurant

from .models import Booking
from .serializers import BookingSerializer, ReferralTrackSerializer

logger = logging.getLogger(__name__)


class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = (permissions.AllowAny,)
    http_method_names = ("get", "post", "head", "options")

    def get_queryset(self):
        user = self.request.user
        if user and user.is_authenticated and getattr(user, "is_staff", False):
            return Booking.objects.select_related(
                "tour", "customer", "accommodation", "restaurant"
            ).all()
        if user and user.is_authenticated:
            return Booking.objects.filter(customer=user).select_related(
                "tour", "accommodation", "restaurant"
            )
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
                    "customer": {
                        "name": booking.contact_name,
                        "email": booking.contact_email,
                        "phone": booking.contact_phone,
                    },
                    "tour_slug": booking.tour.slug if booking.tour else None,
                    "departure_date": booking.departure_date.isoformat()
                    if booking.departure_date
                    else None,
                    "pax_adults": booking.pax_adults,
                    "pax_children": booking.pax_children,
                    "total_amount": str(booking.total_amount),
                    "currency": booking.currency,
                    "special_requests": booking.special_requests,
                    "interest": {
                        "type": "tour_booking",
                        "tour_slug": booking.tour.slug if booking.tour else None,
                        "travel_date": booking.departure_date.isoformat()
                        if booking.departure_date
                        else None,
                        "traveler_count": booking.pax_adults + booking.pax_children,
                        "message": booking.special_requests or "",
                    },
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
            logger.warning(f"Failed to create outbox event for booking {booking.id}: {exc}")


class ReferralTrackView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = ReferralTrackSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        item_type = data["item_type"]
        item_id = data["item_id"]
        contact_name = (data.get("contact_name") or "").strip()
        contact_phone = (data.get("contact_phone") or "").strip()
        contact_email = (data.get("contact_email") or "").strip()

        accommodation_obj = None
        restaurant_obj = None
        referral_partner_name = ""
        referral_target_url = ""

        if item_type == Booking.ItemType.ACCOMMODATION_REFERRAL:
            accommodation_obj = Accommodation.objects.filter(id=item_id, is_active=True).first()
            if not accommodation_obj:
                return Response(
                    {"detail": "Khách sạn không tồn tại hoặc đã ngừng hoạt động."},
                    status=status.HTTP_404_NOT_FOUND,
                )
            referral_partner_name = accommodation_obj.partner_name or "Hotel Partner"
            referral_target_url = accommodation_obj.partner_booking_url
            code_prefix = "ACC"
            item_title = accommodation_obj.name
        elif item_type == Booking.ItemType.RESTAURANT_REFERRAL:
            restaurant_obj = Restaurant.objects.filter(id=item_id, is_active=True).first()
            if not restaurant_obj:
                return Response(
                    {"detail": "Nhà hàng không tồn tại hoặc đã ngừng hoạt động."},
                    status=status.HTTP_404_NOT_FOUND,
                )
            referral_partner_name = restaurant_obj.name
            referral_target_url = restaurant_obj.contact_value
            code_prefix = "RES"
            item_title = restaurant_obj.name
        else:
            return Response(
                {"detail": "Loại giới thiệu không hợp lệ."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        code_suffix = uuid.uuid4().hex[:6].upper()
        booking_code = f"REF-{code_prefix}-{code_suffix}"

        user = request.user if request.user.is_authenticated else None

        booking = Booking.objects.create(
            booking_code=booking_code,
            item_type=item_type,
            customer=user,
            tour=None,
            accommodation=accommodation_obj,
            restaurant=restaurant_obj,
            referral_partner_name=referral_partner_name,
            referral_target_url=referral_target_url,
            contact_name=contact_name,
            contact_phone=contact_phone,
            contact_email=contact_email,
            status=Booking.Status.REFERRED,
            total_amount=None,
            unit_price=None,
            currency="VND",
            payment_method="referral",
            payment_status="not_applicable",
        )

        # Trigger Transactional Outbox event 'referral.created' for Odoo CRM lead sync
        try:
            event_id = str(uuid.uuid4())
            now = timezone.now()
            has_contact = bool(
                booking.contact_name or booking.contact_phone or booking.contact_email
            )
            destination_slug = ""
            commission_rate = 0.0
            estimated_val = 1000000.0
            if accommodation_obj:
                destination_slug = (
                    accommodation_obj.destination.slug
                    if getattr(accommodation_obj, "destination", None)
                    else ""
                )
                commission_rate = float(accommodation_obj.partner_commission_rate or 0.0)
                estimated_val = float(accommodation_obj.price_from or 2000000.0)
            elif restaurant_obj:
                destination_slug = (
                    restaurant_obj.destination.slug
                    if getattr(restaurant_obj, "destination", None)
                    else ""
                )
                commission_rate = float(restaurant_obj.partner_commission_rate or 0.0)
                estimated_val = 1000000.0

            envelope = {
                "event_id": event_id,
                "event_type": "referral.created",
                "event_version": 1,
                "source": "website_referral",
                "occurred_at": now.isoformat(),
                "data": {
                    "booking_id": str(booking.id),
                    "booking_code": booking.booking_code,
                    "item_type": booking.item_type,
                    "item_id": str(item_id),
                    "item_name": item_title,
                    "partner_name": booking.referral_partner_name,
                    "referral_partner_name": booking.referral_partner_name,
                    "destination": destination_slug,
                    "target_url": booking.referral_target_url,
                    "contact_name": booking.contact_name or None,
                    "contact_phone": booking.contact_phone or None,
                    "contact_email": booking.contact_email or None,
                    "has_contact_info": has_contact,
                    "has_contact_lead": has_contact,
                    "partner_commission_rate": commission_rate,
                    "estimated_value": estimated_val,
                    "referred_at": now.isoformat(),
                },
            }
            outbox = IntegrationOutbox.objects.create(
                event_id=event_id,
                event_type="referral.created",
                event_version=1,
                source="website_referral",
                payload=envelope,
                state=IntegrationOutbox.State.PENDING,
            )
            dispatch_outbox_event.delay(str(outbox.id))
        except Exception as exc:
            logger.warning(f"Failed to emit referral.created outbox event: {exc}")

        return Response(
            {
                "booking_id": str(booking.id),
                "booking_code": booking.booking_code,
                "redirect_url": referral_target_url,
            },
            status=status.HTTP_201_CREATED,
        )
