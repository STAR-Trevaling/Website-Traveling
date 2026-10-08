import hashlib
import hmac
import logging
import uuid

from django.conf import settings
from django.contrib.gis.geos import Point
from django.utils import timezone
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from content.models import Article
from destinations.models import Destination
from partners.models import PartnerApplication
from places.models import Category, Place
from tours.models import Tour

from .models import IntegrationEvent, IntegrationOutbox
from .serializers import InquiryCreateSerializer, OdooWebhookEventSerializer
from .tasks import dispatch_outbox_event

logger = logging.getLogger(__name__)


class InquiryCreateView(APIView):
    """
    Public API endpoint for inquiries, tour consultations, and bookings.
    Persists Inquiry, creates Outbox event, and enqueues Celery dispatch to Odoo CRM.
    """

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = InquiryCreateSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        inquiry = serializer.save()

        # Build canonical payload envelope
        event_id = str(uuid.uuid4())
        envelope = {
            "event_id": event_id,
            "event_type": "inquiry.created",
            "event_version": 1,
            "source": inquiry.source or "website",
            "occurred_at": timezone.now().isoformat(),
            "data": {
                "inquiry_id": str(inquiry.id),
                "customer": {
                    "name": inquiry.full_name,
                    "email": inquiry.email,
                    "phone": inquiry.phone,
                    "identity_provider": inquiry.source,
                },
                "interest": {
                    "type": inquiry.inquiry_type,
                    "destination_slug": inquiry.destination_slug,
                    "tour_slug": inquiry.tour_slug,
                    "travel_date": str(inquiry.travel_date) if inquiry.travel_date else None,
                    "traveler_count": inquiry.guests,
                    "message": inquiry.message,
                },
                "source_metadata": {
                    "channel": inquiry.source,
                    "ip": request.META.get("REMOTE_ADDR"),
                    "user_agent": request.META.get("HTTP_USER_AGENT", ""),
                },
            },
        }

        outbox = IntegrationOutbox.objects.create(
            event_id=event_id,
            event_type="inquiry.created",
            event_version=1,
            source=inquiry.source,
            payload=envelope,
            state=IntegrationOutbox.State.PENDING,
        )

        # Trigger Celery asynchronous dispatch
        try:
            dispatch_outbox_event.delay(str(outbox.id))
        except Exception as e:
            logger.warning(f"Could not immediately dispatch Celery task: {e}")

        return Response(
            {
                "success": True,
                "inquiry_id": str(inquiry.id),
                "event_id": event_id,
                "message": "Inquiry successfully recorded and queued for CRM processing.",
            },
            status=status.HTTP_201_CREATED,
        )


class OdooWebhookReceiverView(APIView):
    """
    Inbound Webhook receiver from Odoo 18 CMS (destination.published, place.published, article.published, partner.approved).
    Protected by HMAC-SHA256 signature and Idempotency key.
    """

    permission_classes = [AllowAny]

    def _verify_hmac(self, request):
        secret = getattr(
            settings, "ODOO_WEBHOOK_SECRET", "star_travels_super_secret_webhook_key_2026"
        )
        sig_header = request.headers.get("X-Signature-SHA256")
        if not sig_header:
            return False

        raw_body = request.body
        computed_sig = hmac.new(secret.encode("utf-8"), raw_body, hashlib.sha256).hexdigest()
        return hmac.compare_digest(sig_header, computed_sig)

    def post(self, request, *args, **kwargs):
        if not self._verify_hmac(request):
            return Response(
                {
                    "type": "https://star-travels.com/errors/unauthorized",
                    "title": "Unauthorized",
                    "status": 401,
                    "detail": "Invalid or missing HMAC-SHA256 signature in X-Signature-SHA256 header.",
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        serializer = OdooWebhookEventSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        event_data = serializer.validated_data
        event_id = event_data["event_id"]
        event_type = event_data["event_type"]
        source = event_data.get("source", "odoo")
        data = event_data["data"]

        # 1. Idempotency Check
        raw_hash = hashlib.sha256(request.body).hexdigest()
        existing_event = IntegrationEvent.objects.filter(
            source=source, external_event_id=event_id
        ).first()

        if existing_event:
            if (
                existing_event.state == IntegrationEvent.State.PROCESSED
                and existing_event.response_json
            ):
                logger.info(
                    f"Idempotent replay detected for event {event_id}. Returning cached response."
                )
                return Response(existing_event.response_json, status=status.HTTP_200_OK)
            event_record = existing_event
        else:
            event_record = IntegrationEvent.objects.create(
                source=source,
                external_event_id=event_id,
                event_type=event_type,
                event_version=event_data.get("event_version", 1),
                payload_hash=raw_hash,
                raw_payload=request.data,
                state=IntegrationEvent.State.PENDING,
            )

        # 2. Dispatch domain logic
        try:
            result = self._process_domain_event(event_type, data)
            event_record.state = IntegrationEvent.State.PROCESSED
            event_record.processed_at = timezone.now()
            event_record.response_json = result
            event_record.save(update_fields=["state", "processed_at", "response_json"])
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            logger.exception(f"Error processing Odoo event {event_id}: {e}")
            event_record.state = IntegrationEvent.State.FAILED
            event_record.last_error = str(e)
            event_record.save(update_fields=["state", "last_error"])
            return Response(
                {
                    "type": "https://star-travels.com/errors/internal_error",
                    "title": "Processing Error",
                    "status": 500,
                    "detail": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def _process_domain_event(self, event_type, data):
        """Map Odoo CMS/Partner authoring payload into Django serving models."""
        if event_type in ("destination.published", "destination.updated"):
            dest_info = data.get("destination") or data
            slug = data.get("slug") or dest_info.get("slug")
            name = dest_info.get("name", "")
            lat = float(dest_info.get("latitude") or 0.0)
            lng = float(dest_info.get("longitude") or 0.0)
            center = Point(lng, lat, srid=4326) if (lat and lng) else None

            dest, created = Destination.objects.update_or_create(
                slug=slug,
                defaults={
                    "name": name,
                    "country": dest_info.get("country", "Việt Nam"),
                    "summary": dest_info.get("summary", ""),
                    "description": dest_info.get("description", ""),
                    "image_url": dest_info.get("image_url", ""),
                    "hero_image_url": dest_info.get("hero_image_url", ""),
                    "starting_price": dest_info.get("starting_price"),
                    "center": center,
                    "is_published": True,
                },
            )
            return {
                "status": "synced",
                "model": "Destination",
                "slug": dest.slug,
                "created": created,
            }

        elif event_type in ("place.published", "place.updated"):
            place_info = data.get("place") or data
            slug = data.get("slug") or place_info.get("slug")
            name = place_info.get("name", "")
            dest_slug = place_info.get("destination_slug")
            cat_slug = place_info.get("category_slug")

            dest = Destination.objects.filter(slug=dest_slug).first()
            category = Category.objects.filter(slug=cat_slug).first()

            lat = float(place_info.get("latitude") or 0.0)
            lng = float(place_info.get("longitude") or 0.0)
            location = Point(lng, lat, srid=4326)

            if not dest or not category:
                raise ValueError(f"Destination '{dest_slug}' or Category '{cat_slug}' not found.")

            place, created = Place.objects.update_or_create(
                slug=slug,
                defaults={
                    "name": name,
                    "destination": dest,
                    "category": category,
                    "short_description": place_info.get("short_description", ""),
                    "description": place_info.get("description", ""),
                    "image_url": place_info.get("image_url", ""),
                    "overlay_image_url": place_info.get("overlay_image_url", ""),
                    "address": place_info.get("address", ""),
                    "website_url": place_info.get("website_url", ""),
                    "location": location,
                    "average_rating": place_info.get("average_rating", 0.0),
                    "review_count": place_info.get("review_count", 0),
                    "is_published": True,
                },
            )
            return {"status": "synced", "model": "Place", "slug": place.slug, "created": created}

        elif event_type in ("article.published", "article.updated"):
            art_info = data.get("article") or data
            slug = data.get("slug") or art_info.get("slug")
            dest_slug = art_info.get("destination_slug")
            dest = Destination.objects.filter(slug=dest_slug).first() if dest_slug else None

            article, created = Article.objects.update_or_create(
                slug=slug,
                defaults={
                    "title": art_info.get("title", ""),
                    "excerpt": art_info.get("excerpt", ""),
                    "body": art_info.get("body", ""),
                    "cover_image": art_info.get("cover_image", ""),
                    "destination": dest,
                    "status": Article.Status.PUBLISHED,
                    "published_at": timezone.now(),
                },
            )
            return {
                "status": "synced",
                "model": "Article",
                "slug": article.slug,
                "created": created,
            }

        elif event_type in ("tour.published", "tour.updated"):
            tour_info = data.get("tour") or data
            slug = data.get("slug") or tour_info.get("slug")
            dest_slug = tour_info.get("destination_slug")
            dest = Destination.objects.filter(slug=dest_slug).first() if dest_slug else None

            tour, created = Tour.objects.update_or_create(
                slug=slug,
                defaults={
                    "title": tour_info.get("title", ""),
                    "title_en": tour_info.get("title_en", ""),
                    "destination": dest,
                    "destination_name": tour_info.get(
                        "destination_name", dest.name if dest else ""
                    ),
                    "destination_name_en": tour_info.get(
                        "destination_name_en", dest.name_en if dest else ""
                    ),
                    "duration": tour_info.get("duration", ""),
                    "duration_en": tour_info.get("duration_en", ""),
                    "departure": tour_info.get("departure", ""),
                    "departure_en": tour_info.get("departure_en", ""),
                    "group_size": tour_info.get("group_size", ""),
                    "group_size_en": tour_info.get("group_size_en", ""),
                    "price": tour_info.get("price", 0),
                    "original_price": tour_info.get("original_price"),
                    "rating": tour_info.get("rating", 5.0),
                    "review_count": tour_info.get("review_count", 0),
                    "image_url": tour_info.get("image", tour_info.get("image_url", "")),
                    "overview": tour_info.get("overview", ""),
                    "overview_en": tour_info.get("overview_en", ""),
                    "highlights": tour_info.get("highlights", []),
                    "itinerary": tour_info.get("itinerary", []),
                    "included": tour_info.get("included", []),
                    "excluded": tour_info.get("excluded", []),
                    "region": tour_info.get("region", "north"),
                    "is_published": True,
                    "is_featured": tour_info.get("is_featured", False),
                },
            )
            return {"status": "synced", "model": "Tour", "slug": tour.slug, "created": created}

        elif event_type in ("partner.approved",):
            app_id = data.get("application_id")
            app = PartnerApplication.objects.filter(id=app_id).first() if app_id else None
            if app:
                app.status = PartnerApplication.Status.APPROVED
                app.save(update_fields=["status"])
                org = getattr(app, "organization", None)
                if org:
                    org.is_active = True
                    org.save(update_fields=["is_active"])
                return {
                    "status": "synced",
                    "model": "PartnerApplication",
                    "id": str(app.id),
                    "approved": True,
                }
            return {"status": "acknowledged", "detail": f"Application {app_id} not found."}

        return {"status": "ignored", "event_type": event_type}
