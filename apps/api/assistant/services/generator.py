import os
import re
from typing import List, Tuple, Optional
from django.conf import settings
from assistant.models import AssistantKnowledgeChunk

PHONE_REGEX = re.compile(r"(\+84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}")
EMAIL_REGEX = re.compile(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+")


def extract_lead_info(message: str) -> dict:
    """Extract contact information and inquiry intent from user message."""
    phone_match = PHONE_REGEX.search(message)
    email_match = EMAIL_REGEX.search(message)

    phone = phone_match.group(0) if phone_match else None
    email = email_match.group(0) if email_match else None

    # Estimate pax if mentioned (e.g., 2 người, 4 khách, gia đình 3 người)
    pax_match = re.search(r"(\d+)\s*(người|khách|pax|vé)", message.lower())
    estimated_pax = int(pax_match.group(1)) if pax_match else 2

    # Guess contact name if introduced
    name_match = re.search(r"(mình là|tôi tên|tên tôi là|tôi là|anh|chị)\s+([A-ZĐÀÁẢÃẠ][a-zđàáảãạ]+(?:\s+[A-ZĐÀÁẢÃẠ][a-zđàáảãạ]+)?)", message)
    contact_name = name_match.group(2) if name_match else "Khách hàng STAR"

    return {
        "has_contact": bool(phone or email),
        "phone_number": phone,
        "email": email,
        "estimated_pax": estimated_pax,
        "contact_name": contact_name,
    }


def generate_response(
    query: str,
    chunks: List[AssistantKnowledgeChunk],
    locale: str = "vi",
) -> Tuple[str, List[str]]:
    """
    Generate an intelligent, grounded response and list of recommended tour slugs.
    """
    lead_info = extract_lead_info(query)
    is_en = locale == "en"

    # Extract recommended tour slugs from chunks
    recommended_tour_slugs = []
    for c in chunks:
        if c.entity_type == AssistantKnowledgeChunk.EntityType.TOUR:
            if c.entity_slug not in recommended_tour_slugs:
                recommended_tour_slugs.append(c.entity_slug)
        meta_tours = (c.metadata or {}).get("recommended_tour_slugs", [])
        for s in meta_tours:
            if s not in recommended_tour_slugs:
                recommended_tour_slugs.append(s)

    # If external OPENAI_API_KEY is available, we can invoke LLM API
    api_key = getattr(settings, "OPENAI_API_KEY", os.getenv("OPENAI_API_KEY", ""))
    if api_key:
        try:
            import urllib.request
            import json

            context_texts = "\n\n---\n\n".join(
                [f"[{c.entity_type.upper()}: {c.title} (slug: {c.entity_slug})]\n" + (c.content_vi if not is_en else (c.content_en or c.content_vi)) for c in chunks]
            )

            system_prompt = (
                "You are STAR Concierge, an elite luxury travel advisor for STAR Travels Vietnam.\n"
                "Rules:\n"
                "1. Always maintain a gracious, refined, and warmly hospitable tone.\n"
                "2. Strictly use ONLY the information in the provided [KNOWLEDGE BASE]. Never invent prices, nonexistent destinations, or policies.\n"
                "3. When recommending a tour, embed the code [TOUR_CARD: slug] at the end of the paragraph so the UI renders the interactive tour card.\n"
                "4. If the user provides a phone number or asks for a callback, warmly confirm that a travel specialist will reach out within 15 minutes."
            )

            messages = [
                {"role": "system", "content": f"{system_prompt}\n\n[KNOWLEDGE BASE]:\n{context_texts}"},
                {"role": "user", "content": query},
            ]

            req_data = json.dumps({
                "model": "gpt-4o-mini",
                "messages": messages,
                "temperature": 0.4,
            }).encode("utf-8")

            req = urllib.request.Request(
                "https://api.openai.com/v1/chat/completions",
                data=req_data,
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {api_key}",
                },
            )

            with urllib.request.urlopen(req, timeout=12) as response:
                res_json = json.loads(response.read().decode("utf-8"))
                reply_text = res_json["choices"][0]["message"]["content"]

                # Extract any [TOUR_CARD: slug]
                found_slugs = re.findall(r"\[TOUR_CARD:\s*([\w-]+)\]", reply_text)
                for s in found_slugs:
                    if s not in recommended_tour_slugs:
                        recommended_tour_slugs.append(s)

                return reply_text, recommended_tour_slugs[:2]
        except Exception:
            pass  # Fallback gracefully to grounded synthesis

    # Grounded synthesis fallback (Runs without external API key)
    if is_en:
        if lead_info["has_contact"]:
            reply = (
                f"Thank you, {lead_info['contact_name']}! We have received your contact number "
                f"({lead_info['phone_number'] or lead_info['email']}). "
                f"A STAR Travels private concierge will reach out to you within 15 minutes to assist with tailored arrangements."
            )
            return reply, recommended_tour_slugs[:2]

        if not chunks:
            return (
                "Currently, our knowledge base and curated catalog do not have pre-packaged itineraries matching your request. "
                "For customized private itineraries or direct concierge consultation, please reach out via our [Contact Page](/contact) "
                "or call our 24/7 hotline at +84 (0) 24 3999 8888.",
                [],
            )

        tour_chunk = next((c for c in chunks if c.entity_type == AssistantKnowledgeChunk.EntityType.TOUR), None)
        if tour_chunk:
            meta = tour_chunk.metadata or {}
            price_formatted = f"{int(meta.get('price', 0)):,} VND" if meta.get("price") else "Special rate"
            reply = (
                f"Greetings! For your inquiry, STAR Travels warmly recommends:\n\n"
                f"**{tour_chunk.title}** ({meta.get('duration', 'Curated Package')})\n"
                f"- **Starting from:** {price_formatted} per guest\n"
                f"- **Departure:** {meta.get('departure', 'Vietnam')}\n\n"
                f"Enjoy seamless VIP service, fine dining, and handpicked local accommodations. "
                f"You can review the full day-by-day itinerary below [TOUR_CARD: {tour_chunk.entity_slug}]."
            )
            return reply, [tour_chunk.entity_slug]

        first_chunk = chunks[0]
        return (
            f"Regarding **{first_chunk.title}**:\n\n{first_chunk.content_en or first_chunk.content_vi}\n\n"
            f"Would you like recommendations for all-inclusive tours or private luxury transfers for this destination?",
            recommended_tour_slugs[:2],
        )

    # Vietnamese response
    if lead_info["has_contact"]:
        reply = (
            f"Dạ cảm ơn Quý khách {lead_info['contact_name']}! STAR Travels đã ghi nhận thông tin liên hệ "
            f"**{lead_info['phone_number'] or lead_info['email']}** (Dự kiến {lead_info['estimated_pax']} khách). "
            f"Chuyên viên tư vấn hành trình cao cấp của STAR sẽ liên hệ lại qua điện thoại/Zalo trong vòng 15 phút "
            f"để hoàn thiện lịch trình chi tiết và gửi báo giá ưu đãi nhất cho gia đình mình ạ!"
        )
        return reply, recommended_tour_slugs[:2]

    # Checking policy or specific FAQ
    policy_chunk = next((c for c in chunks if c.entity_type == AssistantKnowledgeChunk.EntityType.POLICY), None)
    if policy_chunk and any(kw in query.lower() for kw in ["chính sách", "hoàn hủy", "đặt cọc", "trẻ em", "phụ thu"]):
        reply = (
            f"Dạ về **{policy_chunk.title}**, STAR Travels xin chia sẻ quy định minh bạch như sau ạ:\n\n"
            f"{policy_chunk.content_vi}\n\n"
            f"Quý khách có cần tư vấn thêm về ngày khởi hành hoặc hỗ trợ đặt tour trọn gói không ạ?"
        )
        return reply, recommended_tour_slugs[:1]

    # Checking heritage and historical inquiry
    heritage_chunk = next(
        (c for c in chunks if (c.metadata or {}).get("category") == "heritage_history"),
        None,
    )

    if heritage_chunk:
        meta = heritage_chunk.metadata or {}
        tour_chunk = next((c for c in chunks if c.entity_type == AssistantKnowledgeChunk.EntityType.TOUR), None)
        active_slug = tour_chunk.entity_slug if tour_chunk else (recommended_tour_slugs[0] if recommended_tour_slugs else None)

        # 1. Season & Weather query
        if any(kw in query.lower() for kw in ["mùa nào", "thời tiết", "tháng mấy", "mùa đẹp nhất", "thời điểm", "nhiệt độ", "săn mây", "lúa chín", "tam giác mạch", "mùa khô", "mùa mưa", "nước nổi"]):
            best_time = meta.get("best_time_to_visit", "")
            tour_callout = (
                f"\n\nSTAR Travels hiện có sẵn lịch trình trọn gói mùa đẹp nhất [TOUR_CARD: {active_slug}]. "
                f"Quý khách có muốn giữ chỗ hoặc nhận báo giá ưu đãi không ạ?"
                if active_slug else ""
            )
            reply = (
                f"Dạ về **thời điểm lý tưởng để ghé thăm {heritage_chunk.title}**, STAR Concierge xin chia sẻ kinh nghiệm chuẩn xác nhất ạ:\n\n"
                f"🌤️ **Thời điểm vàng:** {best_time or 'Quanh năm đều có nét đẹp riêng biệt'}\n\n"
                f"Quý khách hãy sắp xếp thời gian vào khung tháng này để tận hưởng trọn vẹn khí hậu mát mẻ và cảnh sắc ngoạn mục nhất của danh thắng nhé ạ!"
                f"{tour_callout}"
            )
            return reply, [active_slug] if active_slug else recommended_tour_slugs[:1]

        # 2. Cuisine & Specialty food query
        if any(kw in query.lower() for kw in ["ăn gì", "đặc sản", "món ngon", "ẩm thực", "quán ăn", "món ăn", "ăn uống", "uống gì", "món nào ngon"]):
            dishes = meta.get("signature_cuisine", [])
            dishes_text = "\n".join([f"• **{d}**" for d in dishes]) if dishes else "Ẩm thực bản địa trù phú tươi ngon"
            tour_callout = (
                f"\n\nTrong các hành trình trọn gói của STAR Travels [TOUR_CARD: {active_slug}], "
                f"chúng em đều đưa các món đặc sản trứ danh này vào thực đơn tiêu chuẩn để Quý khách thưởng thức chuẩn vị nhất ạ!"
                if active_slug else ""
            )
            reply = (
                f"Dạ đến với **{heritage_chunk.title}**, Quý khách nhất định không nên bỏ qua những món ăn đặc sản tinh hoa này ạ:\n\n"
                f"{dishes_text}"
                f"{tour_callout}"
            )
            return reply, [active_slug] if active_slug else recommended_tour_slugs[:1]

        # 3. Insider tips & Duration query
        if any(kw in query.lower() for kw in ["kinh nghiệm", "chuẩn bị gì", "lưu ý", "trang phục", "đi mấy ngày", "mấy ngày", "lịch trình"]):
            tips = meta.get("insider_tips", [])
            tips_text = "\n".join([f"• {t}" for t in tips]) if tips else "Hãy chuẩn bị giày đi bộ thoải mái và tinh thần sẵn sàng khám phá."
            duration = meta.get("ideal_duration", "2N1Đ hoặc 3N2Đ")
            tour_callout = (
                f"\n\nQuý khách có thể xem nhanh hành trình từng ngày chuẩn 5 sao qua thẻ tour bên dưới [TOUR_CARD: {active_slug}] ạ!"
                if active_slug else ""
            )
            reply = (
                f"Dạ để chuyến đi đến **{heritage_chunk.title}** an tâm và trọn vẹn nhất, STAR Concierge xin chia sẻ các mẹo thực tế:\n\n"
                f"⏱️ **Thời lượng lý tưởng:** Nên dành khoảng **{duration}** để trải nghiệm thong thả.\n\n"
                f"💡 **Mẹo & Lưu ý từ Concierge:**\n{tips_text}"
                f"{tour_callout}"
            )
            return reply, [active_slug] if active_slug else recommended_tour_slugs[:1]

        # 4. History & Legend query
        if any(
            kw in query.lower()
            for kw in [
                "lịch sử", "huyền tích", "sự tích", "truyền thuyết", "nguồn gốc", "tên gọi",
                "vua", "thế kỷ", "triều đại", "xưa", "cổ", "thương cảng", "chùa cầu", "hoa lư",
                "yersin", "bảo đại", "mã pí lèng", "tháp bà", "poshanư", "mạc cửu", "địa chất", "history", "legend"
            ]
        ):
            tour_callout = (
                f"\n\nĐể tận mắt chiêm ngưỡng và chạm vào di sản nghìn năm này, STAR Travels có hành trình trọn gói tinh hoa "
                f"[TOUR_CARD: {active_slug}] với hướng dẫn viên bản địa am hiểu sâu sắc lịch sử để đồng hành cùng Quý khách ạ!"
                if active_slug
                else "\n\nQuý khách có muốn STAR Travels gợi ý tour trọn gói khám phá danh lam di sản này không ạ?"
            )
            reply = (
                f"Dạ về lịch sử và huyền tích của **{heritage_chunk.title}**, STAR Concierge xin chia sẻ cùng Quý khách:\n\n"
                f"{heritage_chunk.content_vi}"
                f"{tour_callout}"
            )
            return reply, [active_slug] if active_slug else recommended_tour_slugs[:1]

    # Recommending tour package
    tour_chunk = next((c for c in chunks if c.entity_type == AssistantKnowledgeChunk.EntityType.TOUR), None)
    if tour_chunk:
        meta = tour_chunk.metadata or {}
        price_formatted = f"{int(meta.get('price', 0)):,} VNĐ/khách" if meta.get("price") else "Giá liên hệ"
        reply = (
            f"Dạ chào Quý khách! Dựa trên mong muốn của mình, STAR Travels xin gợi ý hành trình trải nghiệm được đánh giá cao nhất:\n\n"
            f"🌟 **{tour_chunk.title}**\n"
            f"• **Thời lượng:** {meta.get('duration', 'Trọn gói cao cấp')}\n"
            f"• **Khởi hành từ:** {meta.get('departure', 'Việt Nam')}\n"
            f"• **Mức giá ưu đãi:** **{price_formatted}**\n\n"
            f"Hành trình đã bao gồm trọn gói hướng dẫn viên bản địa, phòng nghỉ tiêu chuẩn và bữa ăn ẩm thực đặc sản. "
            f"Quý khách có thể xem nhanh lịch trình chi tiết qua thẻ tour bên dưới [TOUR_CARD: {tour_chunk.entity_slug}]. "
            f"Nếu cần giữ chỗ hoặc tư vấn riêng, Quý khách chỉ cần để lại số điện thoại hoặc Zalo nhé ạ!"
        )
        return reply, [tour_chunk.entity_slug]

    dest_chunk = next((c for c in chunks if c.entity_type == AssistantKnowledgeChunk.EntityType.DESTINATION), None)
    if dest_chunk:
        reply = (
            f"Dạ về điểm đến **{dest_chunk.title}**, đây là một trong những kỳ quan tuyệt đẹp của du lịch Việt Nam:\n\n"
            f"{dest_chunk.content_vi.split('\n')[0]}\n\n"
            f"STAR Travels hiện có các gói tour trọn gói và xe đưa đón riêng tại đây. "
            f"Quý khách dự kiến đi mấy ngày và vào khoảng thời gian nào để em gửi lịch trình phù hợp nhất ạ?"
        )
        return reply, recommended_tour_slugs[:2]

    return (
        "Dạ hiện tại trong kho dữ liệu và danh mục tour của STAR Travels chưa có thông tin có sẵn cho yêu cầu này của Quý khách. "
        "Để được hỗ trợ thiết kế lịch trình riêng theo yêu cầu cá nhân hóa hoặc nhận tư vấn trực tiếp từ chuyên viên, "
        "Quý khách vui lòng liên hệ trực tiếp với chúng em qua trang [Liên Hệ & Tư Vấn Riêng](/contact) hoặc gọi hotline +84 (0) 24 3999 8888 (hỗ trợ 24/7) nhé ạ!",
        [],
    )
