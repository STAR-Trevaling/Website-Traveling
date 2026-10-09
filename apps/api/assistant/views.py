import logging
import uuid

from django.utils import timezone
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from integrations.models import IntegrationOutbox
from integrations.tasks import dispatch_outbox_event

from .models import (
    AssistantConversation,
    AssistantKnowledgeChunk,
    AssistantLeadCapture,
    AssistantMessage,
)
from .serializers import (
    AssistantConversationSerializer,
    AssistantKnowledgeChunkSerializer,
    AssistantLeadCaptureSerializer,
)

logger = logging.getLogger(__name__)


class AssistantConversationViewSet(viewsets.ModelViewSet):
    serializer_class = AssistantConversationSerializer
    permission_classes = (permissions.AllowAny,)
    lookup_field = "session_token"
    http_method_names = ("get", "post", "head", "options")

    def get_queryset(self):
        token = self.request.query_params.get("session_token")
        if token:
            return AssistantConversation.objects.filter(session_token=token)
        user = self.request.user
        if user and user.is_authenticated and getattr(user, "is_staff", False):
            return AssistantConversation.objects.all()
        return AssistantConversation.objects.none()

    @action(detail=False, methods=("post",), url_path="chat")
    def chat(self, request):
        from tours.models import Tour

        from .services.generator import extract_lead_info, generate_response
        from .services.retriever import search_knowledge

        message = request.data.get("message", "").strip()
        if not message:
            return Response({"error": "Message is required"}, status=status.HTTP_400_BAD_REQUEST)

        session_token = request.data.get("session_token")
        if not session_token:
            session_token = f"sess_{uuid.uuid4().hex[:12]}"

        locale = request.data.get("locale", "vi")
        user = request.user if request.user.is_authenticated else None

        conversation, _ = AssistantConversation.objects.get_or_create(
            session_token=session_token,
            defaults={"user": user, "locale": locale, "title": message[:50]},
        )

        # 1. Save User Message
        AssistantMessage.objects.create(
            conversation=conversation,
            role=AssistantMessage.Role.USER,
            content=message,
        )

        # 2. RAG Knowledge Retrieval
        chunks = search_knowledge(query=message, locale=locale, limit=4)

        # 3. Grounded Synthesis
        reply_text, recommended_tour_slugs = generate_response(
            query=message, chunks=chunks, locale=locale
        )

        # 4. Fetch Rich Tour Cards
        import re

        found_slugs = re.findall(r"\[TOUR_CARD:\s*([\w-]+)\]", reply_text)
        for s in found_slugs:
            if s not in recommended_tour_slugs:
                recommended_tour_slugs.append(s)

        tour_cards = []
        if recommended_tour_slugs:
            matched_tours = Tour.objects.filter(slug__in=recommended_tour_slugs, is_published=True)
            for t in matched_tours:
                tour_cards.append(
                    {
                        "slug": t.slug,
                        "title": t.title_en if locale == "en" and t.title_en else t.title,
                        "price": int(t.price),
                        "duration": t.duration_en
                        if locale == "en" and t.duration_en
                        else t.duration,
                        "departure": t.departure_en
                        if locale == "en" and t.departure_en
                        else t.departure,
                        "image": t.image_url,
                    }
                )

        # 4.1 Fetch Accommodation Referral Cards
        found_acc_slugs = re.findall(r"\[ACCOMMODATION_CARD:\s*([\w-]+)\]", reply_text)
        accommodation_cards = []
        if found_acc_slugs:
            try:
                from accommodations.models import Accommodation

                matched_accs = Accommodation.objects.filter(slug__in=found_acc_slugs, is_active=True)
                for acc in matched_accs:
                    accommodation_cards.append(
                        {
                            "id": str(acc.id),
                            "slug": acc.slug,
                            "name": acc.name_en if locale == "en" and acc.name_en else acc.name,
                            "category": acc.category,
                            "star_rating": acc.star_rating,
                            "price_from": str(acc.price_from) if acc.price_from else None,
                            "image_url": acc.image_url,
                            "partner_name": acc.partner_name,
                            "partner_booking_url": acc.partner_booking_url,
                            "rating_average": float(acc.rating_average),
                            "rating_count": acc.rating_count,
                            "address": acc.address,
                        }
                    )
            except Exception:
                pass

        # 4.2 Fetch Restaurant Referral Cards
        found_res_slugs = re.findall(r"\[RESTAURANT_CARD:\s*([\w-]+)\]", reply_text)
        restaurant_cards = []
        if found_res_slugs:
            try:
                from restaurants.models import Restaurant

                matched_ress = Restaurant.objects.filter(slug__in=found_res_slugs, is_active=True)
                for res_item in matched_ress:
                    restaurant_cards.append(
                        {
                            "id": str(res_item.id),
                            "slug": res_item.slug,
                            "name": res_item.name_en if locale == "en" and res_item.name_en else res_item.name,
                            "cuisine_type": res_item.cuisine_type,
                            "price_range": res_item.price_range,
                            "image_url": res_item.image_url,
                            "contact_type": res_item.contact_type,
                            "contact_value": res_item.contact_value,
                            "rating_average": float(res_item.rating_average),
                            "rating_count": res_item.rating_count,
                            "address": res_item.address,
                        }
                    )
            except Exception:
                pass

        # 5. Lead Information Capture & Odoo CRM Sync
        lead_info = extract_lead_info(message)
        lead_captured = False
        if lead_info["has_contact"]:
            lead_captured = True
            lead = AssistantLeadCapture.objects.create(
                conversation=conversation,
                contact_name=lead_info["contact_name"],
                phone_number=lead_info["phone_number"] or "",
                email=lead_info["email"] or "",
                estimated_pax=lead_info["estimated_pax"],
                chat_summary=f"Khách hỏi: {message}\nAI trả lời: {reply_text[:200]}",
                sync_state=AssistantLeadCapture.SyncState.PENDING,
            )
            # Enqueue Outbox event to Odoo CRM
            try:
                event_id = str(uuid.uuid4())
                envelope = {
                    "event_id": event_id,
                    "event_type": "ai.lead.created",
                    "event_version": 1,
                    "source": "ai_assistant",
                    "occurred_at": timezone.now().isoformat(),
                    "data": {
                        "lead_capture_id": str(lead.id),
                        "contact_name": lead.contact_name,
                        "phone_number": lead.phone_number,
                        "email": lead.email,
                        "estimated_pax": lead.estimated_pax,
                        "chat_summary": lead.chat_summary,
                    },
                }
                outbox = IntegrationOutbox.objects.create(
                    event_id=event_id,
                    event_type="ai.lead.created",
                    event_version=1,
                    source="ai_assistant",
                    payload=envelope,
                    state=IntegrationOutbox.State.PENDING,
                )
                dispatch_outbox_event.delay(str(outbox.id))
            except Exception as exc:
                logger.warning(f"Failed to enqueue ai.lead.created outbox event: {exc}")

        # 6. Save Assistant Message
        AssistantMessage.objects.create(
            conversation=conversation,
            role=AssistantMessage.Role.ASSISTANT,
            content=reply_text,
            structured_payload={
                "tours": tour_cards,
                "accommodations": accommodation_cards,
                "restaurants": restaurant_cards,
            },
        )

        return Response(
            {
                "session_token": conversation.session_token,
                "message": reply_text,
                "recommended_tours": tour_cards,
                "recommended_accommodations": accommodation_cards,
                "recommended_restaurants": restaurant_cards,
                "lead_captured": lead_captured,
            }
        )


class AssistantLeadCaptureViewSet(viewsets.ModelViewSet):
    serializer_class = AssistantLeadCaptureSerializer
    permission_classes = (permissions.AllowAny,)
    http_method_names = ("get", "post", "head", "options")

    def get_queryset(self):
        user = self.request.user
        if user and user.is_authenticated and getattr(user, "is_staff", False):
            return AssistantLeadCapture.objects.all()
        return AssistantLeadCapture.objects.none()

    def perform_create(self, serializer):
        lead = serializer.save()

        # Transactional Outbox event for Odoo CRM sync
        try:
            event_id = str(uuid.uuid4())
            envelope = {
                "event_id": event_id,
                "event_type": "ai.lead.created",
                "event_version": 1,
                "source": "ai_assistant",
                "occurred_at": timezone.now().isoformat(),
                "data": {
                    "lead_capture_id": str(lead.id),
                    "contact_name": lead.contact_name,
                    "phone_number": lead.phone_number,
                    "email": lead.email,
                    "preferred_destination": lead.preferred_destination,
                    "estimated_pax": lead.estimated_pax,
                    "budget_range": lead.budget_range,
                    "travel_dates": lead.travel_dates,
                    "chat_summary": lead.chat_summary,
                },
            }
            outbox = IntegrationOutbox.objects.create(
                event_id=event_id,
                event_type="ai.lead.created",
                event_version=1,
                source="ai_assistant",
                payload=envelope,
                state=IntegrationOutbox.State.PENDING,
            )
            dispatch_outbox_event.delay(str(outbox.id))
        except Exception as exc:
            logger.warning(f"Failed to enqueue ai.lead.created outbox event: {exc}")


class AssistantKnowledgeChunkViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AssistantKnowledgeChunkSerializer
    permission_classes = (permissions.AllowAny,)
    queryset = AssistantKnowledgeChunk.objects.all()
    filterset_fields = ("entity_type", "entity_slug")
    search_fields = ("title", "content_vi", "entity_slug")
