import logging
import re
import uuid
from typing import Any, cast

from django.conf import settings
from django.utils import timezone
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle

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


class AssistantChatAnonThrottle(AnonRateThrottle):
    scope = "assistant_chat_anon"


class AssistantChatUserThrottle(UserRateThrottle):
    scope = "assistant_chat_user"


class AssistantConversationViewSet(viewsets.ModelViewSet):
    serializer_class = AssistantConversationSerializer
    permission_classes = (permissions.AllowAny,)
    lookup_field = "session_token"
    http_method_names = ("get", "post", "head", "options")

    def get_queryset(self):
        user = self.request.user
        token = self.request.query_params.get("session_token")
        if user and user.is_authenticated:
            if getattr(user, "is_staff", False):
                if token:
                    return AssistantConversation.objects.filter(session_token=token)
                return AssistantConversation.objects.all()
            qs = AssistantConversation.objects.filter(user=user)
            if token:
                qs = qs.filter(session_token=token)
            return qs

        if token:
            # Anonymous users can only query unowned conversations
            return AssistantConversation.objects.filter(session_token=token, user__isnull=True)
        return AssistantConversation.objects.none()

    @action(
        detail=False,
        methods=("post",),
        url_path="chat",
        throttle_classes=(AssistantChatAnonThrottle, AssistantChatUserThrottle),
    )
    def chat(self, request):
        from tours.models import Tour

        from .services.generator import extract_lead_info, generate_response
        from .services.retriever import search_knowledge

        message = request.data.get("message", "").strip()
        if not message:
            return Response({"error": "Message is required"}, status=status.HTTP_400_BAD_REQUEST)

        if len(message) > 2000:
            return Response(
                {"error": "Message length exceeds maximum limit of 2000 characters."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        session_token = request.data.get("session_token")
        user = request.user if request.user.is_authenticated else None
        locale = request.data.get("locale", "vi")

        conversation = None
        if session_token:
            if not re.match(r"^[\w\-]{8,128}$", str(session_token)):
                session_token = f"sess_{uuid.uuid4().hex}"
            else:
                existing = AssistantConversation.objects.filter(session_token=session_token).first()
                if existing:
                    if existing.user is not None:
                        if user is None or existing.user != user:
                            # Hijacking attempt or anonymous reading authenticated session
                            session_token = f"sess_{uuid.uuid4().hex}"
                        else:
                            conversation = existing
                    else:
                        if user is not None:
                            existing.user = user
                            existing.save(update_fields=["user", "updated_at"])
                        conversation = existing

        if not session_token or not conversation:
            if not session_token:
                session_token = f"sess_{uuid.uuid4().hex}"
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

        # 2. Check explicit or contextual lead consent
        lead_info = extract_lead_info(message)
        explicit_consent_param = bool(
            request.data.get("confirm_lead") or request.data.get("consent")
        )
        msg_lower = message.lower()
        consent_keywords = [
            "tư vấn",
            "đặt tour",
            "muốn hỏi tour",
            "báo giá",
            "giữ chỗ",
            "gọi lại cho tôi",
            "hãy gọi cho tôi",
            "nhờ gọi lại",
            "liên hệ lại",
            "liên hệ với tôi",
            "sđt của tôi là",
            "số điện thoại của tôi là",
            "sdt của tôi là",
            "please call me",
            "consult me",
            "contact me",
        ]
        has_intent_consent = any(kw in msg_lower for kw in consent_keywords)
        has_confirmed_consent = explicit_consent_param or has_intent_consent

        # 3. Intent Pre-check (Itinerary / Guardrails / Consent)
        from .services.itinerary_planner import ItineraryPlanner
        from .services.jev_router import JevRouteSelector, classify_route_deterministic

        lead_info = extract_lead_info(message)
        route_det = classify_route_deterministic(
            query=message,
            locale=locale,
            has_contact=bool(lead_info["has_contact"]),
            has_confirmed_consent=has_confirmed_consent,
        )

        itinerary_plan_payload = None
        itinerary_sources = []
        jev_sources: list[dict[str, Any]] = []
        jev_status: str | None = None

        if route_det == "emergency":
            if locale == "en":
                reply_text = (
                    "🚨 **VIETNAM TRAVEL & MEDICAL EMERGENCY HOTLINES (24/7)** 🚨\n\n"
                    "If you or your travel companions are facing an immediate emergency in Vietnam, please contact national emergency services immediately (toll-free 24/7):\n\n"
                    "• **115 - Medical Emergency & Ambulance:** Urgent medical treatment, trauma, accidents, food poisoning.\n"
                    "• **113 - Police & Public Security Rapid Response:** Theft, robbery, assault, fraud, immediate security intervention.\n"
                    "• **114 - Fire & Rescue Services:** Fire incidents, drowning, landslides on mountain passes, or trapped situations.\n"
                    "• **1022 - Vietnam Tourist Support Hotline:** Multilingual emergency assistance and visitor incident reporting.\n"
                    "• **+84 981 84 84 84 - Consular Protection (Ministry of Foreign Affairs):** Urgent protection for foreign tourists, lost passports, and entry visa emergencies.\n\n"
                    "Please remain calm, stay in a safe location, and follow local authority directions. "
                    "The STAR Travels Concierge response team is on standby 24/7 to coordinate local assistance via Hotline: **1900 6868** (International: **+84 24 3999 8888**)."
                )
            else:
                reply_text = (
                    "🚨 **HỖ TRỢ KHẨN CẤP DU LỊCH & Y TẾ VIỆT NAM (EMERGENCY HOTLINES)** 🚨\n\n"
                    "Nếu Quý khách hoặc người thân đang gặp tình huống nguy cấp, xin vui lòng liên hệ ngay các đường dây nóng quốc gia (miễn cước 24/7):\n\n"
                    "• **115 - Cấp cứu Y tế Toàn quốc:** Cấp cứu tai nạn, ngộ độc thực phẩm, cấp cứu y khoa.\n"
                    "• **113 - Công an / Cảnh sát Phản ứng nhanh:** Trình báo mất cắp, hành hung, lừa đảo, an ninh trật tự.\n"
                    "• **114 - Cứu nạn, Cứu hộ & PCCC:** Sự cố hỏa hoạn, đuối nước, sạt lở đèo dốc hoặc mắc kẹt.\n"
                    "• **Tổng đài Hỗ trợ Du khách (Việt Nam):** **1022** (hỗ trợ du khách phản ánh sự cố dịch vụ và cứu nạn địa phương).\n"
                    "• **Tổng đài Bảo hộ Công dân (Bộ Ngoại giao):** **+84 981 84 84 84** (hỗ trợ du khách quốc tế mất hộ chiếu, thị thực khẩn cấp).\n\n"
                    "Quý khách vui lòng giữ bình tĩnh, giữ liên lạc tại vị trí an toàn và làm theo hướng dẫn của lực lượng cứu hộ địa phương. "
                    "Đội ngũ STAR Travels luôn sẵn sàng phối hợp hỗ trợ qua Hotline 24/7: **1900 6868** (Quốc tế: **+84 24 3999 8888**)."
                )
            chunks = []
            recommended_tour_slugs = []
        elif route_det == "itinerary":
            params = ItineraryPlanner.extract_itinerary_params(message)
            itinerary_res = ItineraryPlanner.plan_itinerary(params=params, locale=locale)
            reply_text = itinerary_res["message"]
            recommended_tour_slugs = itinerary_res.get("recommended_tour_slugs", [])
            itinerary_sources = itinerary_res.get("sources", [])
            if itinerary_res.get("success"):
                itinerary_plan_payload = itinerary_res.get("structured_plan")
            chunks = []
        elif getattr(settings, "JEV_EVIDENCE_ENABLED", False):
            from .jev_rag.django_bridge import make_pipeline

            try:
                pipeline = make_pipeline(locale=locale)
                outcome = pipeline.ask(message, locale=locale)
                reply_text = outcome.text
                jev_sources = [
                    {
                        "entity_type": "knowledge",
                        "entity_id": None,
                        "slug": s.get("id", ""),
                        "title": s.get("title", ""),
                        "url": s.get("url", ""),
                    }
                    for s in outcome.sources
                ]
                jev_status = outcome.status
                chunks = []
                recommended_tour_slugs = []
            except Exception as exc:
                logger.warning(
                    "Jev evidence pipeline error: %s; falling back to legacy RAG",
                    exc,
                    exc_info=True,
                )
                chunks = search_knowledge(query=message, locale=locale, limit=4)
                reply_text, recommended_tour_slugs = generate_response(
                    query=message,
                    chunks=chunks,
                    locale=locale,
                    lead_consent=has_confirmed_consent,
                )
                jev_sources = []
                jev_status = None
        else:
            # Build conversation history for multi-turn LLM memory
            history_msgs = []
            if conversation:
                recent_msgs = conversation.messages.order_by("-created_at")[:6]
                for m in reversed(list(recent_msgs)):
                    if m.content != message:
                        history_msgs.append(
                            {
                                "role": "user"
                                if m.role == AssistantMessage.Role.USER
                                else "assistant",
                                "content": m.content,
                            }
                        )

            # JEV Request Analysis Layer: Determine whether RAG retrieval is required
            if route_det == "conversational":
                # Conversational inquiries (greetings, banter, travel stories) bypass RAG retrieval
                # to allow LLM full creative expression without being restricted by empty chunks.
                chunks = []
                reply_text, recommended_tour_slugs = generate_response(
                    query=message,
                    chunks=[],
                    locale=locale,
                    lead_consent=has_confirmed_consent,
                    route="conversational",
                    history=history_msgs,
                )
            else:
                # 3. RAG Knowledge Retrieval for domain/catalog/destination inquiries
                chunks = search_knowledge(query=message, locale=locale, limit=4)

                # 4. Grounded Synthesis
                reply_text, recommended_tour_slugs = generate_response(
                    query=message,
                    chunks=chunks,
                    locale=locale,
                    lead_consent=has_confirmed_consent,
                    route=route_det or "knowledge",
                    history=history_msgs,
                )

        # 4. Fetch Rich Tour Cards
        found_slugs = re.findall(r"\[TOUR_CARD:\s*([\w-]+)\]", reply_text)
        for s in found_slugs:
            if s not in recommended_tour_slugs:
                recommended_tour_slugs.append(s)

        tour_cards = []
        valid_tour_slugs = set()
        if recommended_tour_slugs:
            matched_tours = Tour.objects.filter(slug__in=recommended_tour_slugs, is_published=True)
            for t in matched_tours:
                valid_tour_slugs.add(t.slug)
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

        # Server-side scrubbing: Remove any hallucinated or non-existent [TOUR_CARD] slugs from reply text
        for s in found_slugs:
            if s not in valid_tour_slugs:
                reply_text = re.sub(rf"\[TOUR_CARD:\s*{re.escape(s)}\]", "", reply_text).strip()

        # 4.1 Fetch Accommodation Referral Cards
        found_acc_slugs = re.findall(r"\[ACCOMMODATION_CARD:\s*([\w-]+)\]", reply_text)
        accommodation_cards = []
        valid_acc_slugs = set()
        if found_acc_slugs:
            try:
                from accommodations.models import Accommodation

                matched_accs = Accommodation.objects.filter(
                    slug__in=found_acc_slugs, is_active=True
                )
                for acc in matched_accs:
                    valid_acc_slugs.add(acc.slug)
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
            except Exception as exc:
                logger.warning(
                    "Failed to fetch accommodation referral cards: %s", exc, exc_info=True
                )

        # Server-side scrubbing: Remove non-existent accommodation cards
        for s in found_acc_slugs:
            if s not in valid_acc_slugs:
                reply_text = re.sub(
                    rf"\[ACCOMMODATION_CARD:\s*{re.escape(s)}\]", "", reply_text
                ).strip()

        # 4.2 Fetch Restaurant Referral Cards
        found_res_slugs = re.findall(r"\[RESTAURANT_CARD:\s*([\w-]+)\]", reply_text)
        restaurant_cards = []
        valid_res_slugs = set()
        if found_res_slugs:
            try:
                from restaurants.models import Restaurant

                matched_ress = Restaurant.objects.filter(slug__in=found_res_slugs, is_active=True)
                for res_item in matched_ress:
                    valid_res_slugs.add(res_item.slug)
                    restaurant_cards.append(
                        {
                            "id": str(res_item.id),
                            "slug": res_item.slug,
                            "name": res_item.name_en
                            if locale == "en" and res_item.name_en
                            else res_item.name,
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
            except Exception as exc:
                logger.warning("Failed to fetch restaurant referral cards: %s", exc, exc_info=True)

        # Server-side scrubbing: Remove non-existent restaurant cards
        for s in found_res_slugs:
            if s not in valid_res_slugs:
                reply_text = re.sub(
                    rf"\[RESTAURANT_CARD:\s*{re.escape(s)}\]", "", reply_text
                ).strip()

        # 4.3 Fetch Guide Cards
        found_guide_slugs = re.findall(r"\[GUIDE_CARD:\s*([\w-]+)\]", reply_text)
        guide_cards = []
        valid_guide_slugs = set()
        if found_guide_slugs:
            try:
                guide_chunks = AssistantKnowledgeChunk.objects.filter(
                    entity_type=AssistantKnowledgeChunk.EntityType.GUIDE,
                    entity_slug__in=found_guide_slugs,
                )
                for gc in guide_chunks:
                    valid_guide_slugs.add(gc.entity_slug)
                    meta = gc.metadata or {}
                    guide_title = (
                        str(meta.get("title_en") or gc.title)
                        if locale == "en" and gc.content_en
                        else gc.title
                    )
                    guide_cards.append(
                        {
                            "slug": gc.entity_slug,
                            "href": meta.get("guide_route", f"/guide/{gc.entity_slug}"),
                            "title": guide_title,
                            "category": meta.get("category", "guide"),
                            "shortDesc": (
                                gc.content_en if locale == "en" and gc.content_en else gc.content_vi
                            )[:140]
                            + "...",
                            "badge": "Cẩm Nang STAR",
                            "iconName": "Compass",
                        }
                    )
            except Exception as exc:
                logger.warning("Failed to fetch guide cards: %s", exc, exc_info=True)

        # Server-side scrubbing: Remove non-existent guide cards
        for s in found_guide_slugs:
            if s not in valid_guide_slugs:
                reply_text = re.sub(rf"\[GUIDE_CARD:\s*{re.escape(s)}\]", "", reply_text).strip()

        reply_text = re.sub(r"\n{3,}", "\n\n", reply_text).strip()

        # 5. Lead Information Capture & Odoo CRM Sync with Consent & Idempotency
        lead_captured = False

        if lead_info["has_contact"] and has_confirmed_consent:
            phone_val = (lead_info["phone_number"] or "").strip()
            email_val = (lead_info["email"] or "").strip()

            # Prevent duplicate lead submissions in the same conversation
            already_captured = False
            if phone_val:
                already_captured = AssistantLeadCapture.objects.filter(
                    conversation=conversation, phone_number=phone_val
                ).exists()

            if not already_captured and (phone_val or email_val):
                lead_captured = True
                lead = AssistantLeadCapture.objects.create(
                    conversation=conversation,
                    contact_name=lead_info["contact_name"],
                    phone_number=phone_val,
                    email=email_val,
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
                            "customer": {
                                "name": lead.contact_name or "Khách hàng AI Concierge",
                                "phone": lead.phone_number,
                                "email": lead.email,
                                "identity_provider": "ai_assistant",
                            },
                            "interest": {
                                "type": "ai_consultation",
                                "traveler_count": lead.estimated_pax,
                                "message": lead.chat_summary,
                            },
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
                    cast(Any, dispatch_outbox_event).delay(str(outbox.id))
                except Exception as exc:
                    logger.warning(
                        "Failed to enqueue ai.lead.created outbox event: %s", exc, exc_info=True
                    )

        # 6. Save Assistant Message
        structured_payload: dict[str, Any] = {
            "tours": tour_cards,
            "accommodations": accommodation_cards,
            "restaurants": restaurant_cards,
            "guides": guide_cards,
        }
        if itinerary_plan_payload:
            structured_payload["itinerary_plan"] = itinerary_plan_payload

        AssistantMessage.objects.create(
            conversation=conversation,
            role=AssistantMessage.Role.ASSISTANT,
            content=reply_text,
            structured_payload=structured_payload,
        )

        # 7. Collect verified provenance sources
        sources = list(itinerary_sources) + list(jev_sources)
        ADVENTURE_EXPERIENCE_SLUGS = {
            "canal-cruise",
            "sailing",
            "hiking",
            "camping",
            "scuba-diving",
            "kayaking",
            "rock-climbing",
            "paragliding",
        }
        for c in chunks:
            c_meta = c.metadata or {}
            canonical_url = c_meta.get("guide_route")
            if not canonical_url:
                if c.entity_type == AssistantKnowledgeChunk.EntityType.TOUR:
                    canonical_url = f"/tours/{c.entity_slug}"
                elif c.entity_type == AssistantKnowledgeChunk.EntityType.DESTINATION:
                    canonical_url = f"/destinations/{c.entity_slug}"
                elif c.entity_type == AssistantKnowledgeChunk.EntityType.PLACE:
                    if c.entity_slug in ADVENTURE_EXPERIENCE_SLUGS:
                        canonical_url = f"/experiences/{c.entity_slug}"
                    else:
                        dest_slug = c_meta.get("destination_slug")
                        canonical_url = (
                            f"/destinations/{dest_slug}" if dest_slug else "/destinations"
                        )
                else:
                    canonical_url = "/guide"

            sources.append(
                {
                    "entity_type": c.entity_type,
                    "entity_id": str(c.entity_id) if c.entity_id else None,
                    "slug": c.entity_slug,
                    "title": c.title,
                    "url": canonical_url,
                }
            )

        # 8. Route classification tag (via JevRouteSelector with deterministic priority)
        if route_det == "emergency":
            route = "emergency"
        elif route_det == "itinerary":
            route = "itinerary"
        elif jev_status == "answered":
            route = "knowledge"
            if tour_cards or accommodation_cards or restaurant_cards:
                route = "discovery"
        elif jev_status == "abstained":
            route = "clarify"
        else:
            route, _ = JevRouteSelector.select_route(
                query=message,
                locale=locale,
                chunks_count=len(chunks),
                has_contact=bool(lead_info["has_contact"]),
                has_confirmed_consent=has_confirmed_consent,
            )
            if (tour_cards or accommodation_cards or restaurant_cards) and route not in (
                "security_refusal",
                "emergency",
                "lead_inquiry",
                "itinerary",
            ):
                route = "discovery"
            elif not chunks and route not in (
                "security_refusal",
                "emergency",
                "lead_inquiry",
                "itinerary",
            ):
                route = "clarify"

        return Response(
            {
                "session_token": conversation.session_token,
                "message": reply_text,
                "recommended_tours": tour_cards,
                "recommended_accommodations": accommodation_cards,
                "recommended_restaurants": restaurant_cards,
                "recommended_guides": guide_cards,
                "itinerary_plan": itinerary_plan_payload,
                "sources": sources,
                "route": route,
                "status": "ok",
                "lead_captured": lead_captured,
                "is_ai_generated": True,
                "ai_disclaimer": (
                    "Câu trả lời được sinh tự động bởi Trợ lý AI STAR Concierge. "
                    "Giá niêm yết và tình trạng chỗ trống được đối chiếu trực tiếp từ cơ sở dữ liệu STAR Travels."
                ),
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
            cast(Any, dispatch_outbox_event).delay(str(outbox.id))
        except Exception as exc:
            logger.warning(f"Failed to enqueue ai.lead.created outbox event: {exc}")


class AssistantKnowledgeChunkViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AssistantKnowledgeChunkSerializer
    permission_classes = (permissions.AllowAny,)
    queryset = AssistantKnowledgeChunk.objects.all()
    filterset_fields = ("entity_type", "entity_slug")
    search_fields = ("title", "content_vi", "entity_slug")
