import json
import logging
import time
import urllib.error
import urllib.request

from django.conf import settings

from assistant.services.generator import (
    EMAIL_REGEX,
    PHONE_REGEX,
    check_prompt_security_guardrail,
)

logger = logging.getLogger(__name__)

ALLOWED_ROUTES = (
    "knowledge",
    "discovery",
    "itinerary",
    "lead_inquiry",
    "clarify",
    "security_refusal",
    "emergency",
    "conversational",
)


def sanitize_for_router(text: str) -> str:
    """Mask potential phone numbers and emails to reduce PII exposure before routing."""
    sanitized = PHONE_REGEX.sub("[PHONE_REDACTED]", text)
    sanitized = EMAIL_REGEX.sub("[EMAIL_REDACTED]", sanitized)
    return sanitized.strip()


def classify_route_deterministic(
    query: str,
    locale: str = "vi",
    chunks_count: int = 0,
    has_contact: bool = False,
    has_confirmed_consent: bool = False,
) -> str | None:
    """
    Deterministic route classifier. Returns a definitive route string when
    intent signals are clear and unambiguous, or None when input is ambiguous.
    """
    q_lower = query.lower()

    # 1. Prompt Injection / Security Refusal
    guardrail_reply, _ = check_prompt_security_guardrail(query, [], locale=locale)
    if guardrail_reply:
        return "security_refusal"

    # 2. Emergency & Safety Inquiries (medical, police, rescue, natural disaster)
    emergency_indicators = [
        "cấp cứu",
        "cap cuu",
        "tai nạn",
        "tai nan",
        "ngộ độc",
        "ngo doc",
        "cứu hộ",
        "cuu ho",
        "chìm tàu",
        "chim tau",
        "sạt lở",
        "sat lo",
        "mất hộ chiếu",
        "mat ho chieu",
        "bị cướp",
        "bi cuop",
        "bị lừa đảo",
        "bi lua dao",
        "hotline khẩn cấp",
        "hotline khan cap",
        "công an",
        "cong an",
        "cảnh sát",
        "canh sat",
        "113",
        "114",
        "115",
        "emergency",
        "ambulance",
        "police",
        "hospital",
    ]
    if any(ind in q_lower for ind in emergency_indicators):
        return "emergency"

    # 2.5 Conversational & Persona Inquiries (Greetings, self-intro, chit-chat, thanks)
    conversational_indicators = [
        "xin chào",
        "xin chao",
        "chào em",
        "chao em",
        "chào bạn",
        "chao ban",
        "chào bé sao",
        "chao be sao",
        "hello",
        "hi em",
        "hi bạn",
        "hey",
        "alo",
        "bạn là ai",
        "em là ai",
        "ban la ai",
        "em là ai thế",
        "em ten gi",
        "bạn tên gì",
        "bạn có khỏe không",
        "em khỏe không",
        "hôm nay thế nào",
        "kể chuyện",
        "kể cho tôi nghe",
        "tại sao nên đi du lịch",
        "cảm ơn",
        "cam on",
        "thank you",
        "thanks",
        "tạm biệt",
        "tam biet",
        "bye",
        "good morning",
        "good evening",
        "ngủ ngon",
    ]
    q_stripped = q_lower.strip().strip("!?,.")
    if q_stripped in {
        "chao",
        "chào",
        "hi",
        "hello",
        "hey",
        "alo",
        "xin chao",
        "xin chào",
        "hi em",
        "chào em",
        "chao em",
        "chào bạn",
        "chao ban",
        "bạn là ai",
        "em là ai",
        "ban la ai",
    }:
        return "conversational"

    has_tour_indicators = any(
        k in q_lower
        for k in [
            "giá tour",
            "đặt tour",
            "bao nhiêu tiền",
            "báo giá",
            "lịch trình",
            "resort",
            "khách sạn",
            "hotel",
            "2 ngày",
            "3 ngày",
            "4 ngày",
            "e-visa",
            "thị thực",
            "thời tiết",
        ]
    )
    if any(ind in q_lower for ind in conversational_indicators) and not has_tour_indicators:
        return "conversational"

    # 3. Lead Inquiry with confirmed consent
    if has_contact and has_confirmed_consent:
        return "lead_inquiry"

    # 4. Itinerary Planning Intent
    itinerary_indicators = [
        "lịch trình",
        "2 ngày 1 đêm",
        "3 ngày 2 đêm",
        "4 ngày 3 đêm",
        "itinerary",
        "gợi ý lịch trình",
        "lộ trình",
        "kế hoạch đi",
        "lịch trình tour",
    ]
    if any(ind in q_lower for ind in itinerary_indicators):
        return "itinerary"

    # 4. Catalog Discovery Intent (Tours, Hotels, Dining)
    discovery_indicators = [
        "giá tour",
        "đặt tour",
        "tour du lịch",
        "resort 5 sao",
        "khách sạn",
        "nhà hàng michelin",
        "báo giá tour",
        "giá vé",
        "book tour",
        "hotel",
        "tour package",
    ]
    if any(ind in q_lower for ind in discovery_indicators):
        return "discovery"

    # 5. Clear Knowledge Inquiry (Visa, Weather, Safety, Transport, Culture, Currency)
    knowledge_indicators = [
        "e-visa",
        "thị thực",
        "nhập cảnh",
        "thời tiết",
        "mùa nào đẹp",
        "khẩn cấp",
        "công an",
        "cấp cứu",
        "113",
        "115",
        "tiền tệ",
        "đổi tiền",
        "quy định trang phục",
        "chùa chiền",
        "lịch sử",
        "huyền tích",
        "chính sách",
        "hoàn hủy",
        "trẻ em",
        "phụ thu",
    ]
    if any(ind in q_lower for ind in knowledge_indicators):
        return "knowledge"

    # 6. Ambiguous / Vague queries requiring clarification
    ambiguous_indicators = [
        "rảnh tuần sau",
        "đi chơi đâu đó",
        "chỗ nào vui",
        "chỗ nào ăn ngon",
        "nghỉ ngơi",
        "có gì hay không",
        "gợi ý gì không",
        "buồn quá",
        "bất kỳ đâu",
    ]
    if any(ind in q_lower for ind in ambiguous_indicators):
        return None  # Candidate for Jev router pilot or clarify fallback

    return None


class JevRouteSelector:
    """
    Thin, single-decision-point runtime router for the Travel Concierge.
    Uses closed candidate routes with strict schema validation and fallback.
    """

    @classmethod
    def select_route(
        cls,
        query: str,
        locale: str = "vi",
        chunks_count: int = 0,
        has_contact: bool = False,
        has_confirmed_consent: bool = False,
    ) -> tuple[str, str]:
        """
        Determines the execution route for the chat pipeline.
        Returns: (route_name: str, decision_source: str)
        """
        # 1. Evaluate deterministic router first (zero latency, zero cost)
        det_route = classify_route_deterministic(
            query=query,
            locale=locale,
            chunks_count=chunks_count,
            has_contact=has_contact,
            has_confirmed_consent=has_confirmed_consent,
        )
        if det_route:
            return det_route, "deterministic"

        # 2. Check feature flag for Jev runtime pilot
        is_jev_enabled = getattr(settings, "JEV_ROUTER_ENABLED", False)
        api_key = getattr(settings, "JEV_API_KEY", "")
        endpoint = getattr(settings, "JEV_API_ENDPOINT", "https://api.jev.ai/v1/choice")
        timeout = getattr(settings, "JEV_TIMEOUT_SECONDS", 2.0)

        if not is_jev_enabled or not api_key:
            # Deterministic fallback when Jev pilot is disabled
            if chunks_count > 0:
                fallback_route = "knowledge"
            else:
                fallback_route = "conversational" if len(query.strip()) < 80 else "clarify"
            return fallback_route, "deterministic_fallback"

        # 3. Invoke Jev Choice API with sanitized input and closed choices
        sanitized_query = sanitize_for_router(query)
        candidate_choices = [
            "knowledge",
            "discovery",
            "itinerary",
            "lead_inquiry",
            "conversational",
            "clarify",
        ]

        payload = {
            "task": "Classify user travel inquiry into exactly one candidate route.",
            "input": sanitized_query,
            "locale": locale,
            "choices": candidate_choices,
        }

        start_time = time.time()
        try:
            req_data = json.dumps(payload).encode("utf-8")
            req = urllib.request.Request(
                endpoint,
                data=req_data,
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {api_key}",
                    "User-Agent": "STARTravels-Concierge-JevRouter/1.0",
                },
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=timeout) as resp:  # nosec B310
                resp_data = json.loads(resp.read().decode("utf-8"))
                chosen_choice = resp_data.get("choice") or resp_data.get("route")
                latency_ms = int((time.time() - start_time) * 1000)

                if chosen_choice in ALLOWED_ROUTES:
                    logger.info(
                        "Jev route selected: %s in %sms (candidates: %s)",
                        chosen_choice,
                        latency_ms,
                        candidate_choices,
                    )
                    return chosen_choice, "jev_choice"

                logger.warning(
                    "Jev returned unrecognized choice: %s; falling back",
                    chosen_choice,
                )
        except Exception as exc:
            latency_ms = int((time.time() - start_time) * 1000)
            logger.warning(
                "Jev runtime call failed in %sms: %s; falling back to clarify",
                latency_ms,
                exc,
            )

        # 4. Safe fallback if Jev choice fails or is invalid
        fallback_route = "knowledge" if chunks_count > 0 else "clarify"
        return fallback_route, "jev_error_fallback"
