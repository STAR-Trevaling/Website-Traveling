import logging
import re
from typing import Any

from django.db.models import Q

from assistant.models import AssistantKnowledgeChunk
from destinations.models import Destination
from tours.models import Tour

logger = logging.getLogger(__name__)

DESTINATION_ALIASES: dict[str, str] = {
    "hạ long": "ha-long",
    "ha long": "ha-long",
    "halong": "ha-long",
    "đà nẵng": "da-nang",
    "da nang": "da-nang",
    "danang": "da-nang",
    "phú quốc": "phu-quoc",
    "phu quoc": "phu-quoc",
    "phuquoc": "phu-quoc",
    "sa pa": "sa-pa",
    "sapa": "sa-pa",
    "hà nội": "ha-noi",
    "ha noi": "ha-noi",
    "hanoi": "ha-noi",
    "huế": "hue",
    "hue": "hue",
    "hội an": "hoi-an",
    "hoi an": "hoi-an",
    "hoian": "hoi-an",
    "ninh bình": "ninh-binh",
    "ninh binh": "ninh-binh",
    "nha trang": "nha-trang",
    "nhatrang": "nha-trang",
    "sài gòn": "ho-chi-minh",
    "sai gon": "ho-chi-minh",
    "hồ chí minh": "ho-chi-minh",
    "ho chi minh": "ho-chi-minh",
    "tphcm": "ho-chi-minh",
    "quy nhơn": "quy-nhon",
    "quy nhon": "quy-nhon",
    "đà lạt": "da-lat",
    "da lat": "da-lat",
}


class ItineraryPlanner:
    """
    Minimal, deterministic itinerary planner grounded in published database
    entities (Destination, Tour, Curated Heritage Places).
    Enforces parameter validation, honest no-data paths, and verified source citations.
    """

    @classmethod
    def extract_itinerary_params(cls, message: str) -> dict[str, Any]:
        """Extract destination, days, budget, pace, and interests from user query."""
        msg_lower = message.lower()

        # 1. Destination Extraction
        destination_slug = None
        destination_raw = None
        for alias, slug in DESTINATION_ALIASES.items():
            if alias in msg_lower:
                destination_slug = slug
                destination_raw = alias
                break

        if not destination_slug:
            # Fallback regex extraction: "đi Đà Lạt", "tới Nha Trang", "khám phá Huế"
            match = re.search(
                r"(?:đi|đến|tới|ở|tại|khám phá|du lịch|cho|to|in)\s+([A-ZÀ-Ỹa-zà-ỹ\s]+?)(?=\s+(?:\d+\s*(?:ngày|day|đêm|d)|ngân sách|budget|thong thả|vừa phải|dày đặc|$))",
                message,
                re.IGNORECASE,
            )
            if match:
                destination_raw = match.group(1).strip()

        # 2. Days Extraction
        days = 3  # default
        days_match = re.search(r"(\d+)\s*(?:ngày|ngay|day|days|d\b)", msg_lower)
        if days_match:
            try:
                days = int(days_match.group(1))
            except ValueError:
                days = 3

        # 3. Budget Extraction
        budget = None
        budget_match = re.search(r"(\d+(?:[.,]\d+)?)\s*(?:triệu|tr\b|m\b|k\b|vnd|vnđ)", msg_lower)
        if budget_match:
            try:
                val = float(budget_match.group(1).replace(",", "."))
                unit = budget_match.group(0).lower()
                if "k" in unit:
                    budget = val * 1_000
                elif any(u in unit for u in ["triệu", "tr", "m"]):
                    budget = val * 1_000_000
                else:
                    budget = val
            except ValueError:
                budget = None

        # 4. Pace Extraction
        pace = "moderate"
        if any(w in msg_lower for w in ["thong thả", "thong tha", "nhẹ nhàng", "nhe nhang", "nghỉ dưỡng", "relaxed"]):
            pace = "relaxed"
        elif any(w in msg_lower for w in ["dày đặc", "day dac", "năng động", "nang dong", "khám phá nhiều", "fast", "packed"]):
            pace = "fast"

        # 5. Interests Extraction
        interests = []
        interest_keywords = {
            "biển": "beach",
            "ẩm thực": "cuisine",
            "văn hóa": "culture",
            "di sản": "heritage",
            "sinh thái": "nature",
            "chụp ảnh": "photography",
            "nghỉ dưỡng": "resort",
            "lịch sử": "history",
        }
        for kw, tag in interest_keywords.items():
            if kw in msg_lower:
                interests.append(tag)

        return {
            "destination_slug": destination_slug,
            "destination_raw": destination_raw,
            "days": days,
            "budget": budget,
            "pace": pace,
            "interests": interests,
        }

    @classmethod
    def validate_bounds(cls, days: int) -> tuple[bool, str | None]:
        """Validate input boundaries: 1 <= days <= 14."""
        if days < 1 or days > 14:
            return (
                False,
                f"Thời gian gợi ý lịch trình hợp lệ là từ 1 đến 14 ngày (bạn đang yêu cầu {days} ngày). "
                "Quý khách vui lòng chọn khoảng thời gian phù hợp để em thiết kế lịch trình tối ưu nhất nhé ạ!",
            )
        return True, None

    @classmethod
    def plan_itinerary(
        cls,
        params: dict[str, Any],
        locale: str = "vi",
    ) -> dict[str, Any]:
        """
        Builds a grounded, verified itinerary from published database entities.
        Returns a structured plan with honest fallback when data is missing.
        """
        days = int(params.get("days", 3))
        dest_slug = params.get("destination_slug")
        dest_raw = params.get("destination_raw") or ""
        budget = params.get("budget")
        pace = params.get("pace", "moderate")

        # 1. Bounds Validation
        is_valid, bound_error = cls.validate_bounds(days)
        if not is_valid:
            return {
                "success": False,
                "error": "bounds_invalid",
                "message": bound_error or "Số ngày không hợp lệ.",
                "days_plan": [],
                "sources": [],
                "recommended_tours": [],
            }

        # 2. Query Published Destination
        dest = None
        if dest_slug:
            dest = Destination.objects.filter(slug=dest_slug, is_published=True).first()

        if not dest and dest_raw:
            dest = Destination.objects.filter(
                Q(name__icontains=dest_raw) | Q(name_en__icontains=dest_raw) | Q(slug__icontains=dest_raw),
                is_published=True,
            ).first()

        # Honest No-Data State if destination is not in published DB
        if not dest:
            dest_name_display = dest_raw or "điểm đến này"
            no_data_msg = (
                f"Dạ hiện tại STAR Travels chưa có dữ liệu lịch trình chính thức được kiểm duyệt cho '{dest_name_display}' "
                "(hoặc điểm đến hiện chưa được mở bán trên nền tảng).\n\n"
                "STAR Travels hiện hỗ trợ thiết kế lịch trình chuyên sâu cho các thiên đường du lịch hàng đầu như: "
                "**Hạ Long, Đà Nẵng, Phú Quốc, Sa Pa, Ninh Bình, Huế, Hội An, Hà Nội**.\n\n"
                "Quý khách có thể yêu cầu lịch trình tại các điểm đến trên hoặc kết nối với chuyên viên tư vấn riêng của chúng em nhé ạ!"
            )
            return {
                "success": False,
                "error": "no_published_data",
                "message": no_data_msg,
                "days_plan": [],
                "sources": [],
                "recommended_tours": [],
            }

        # 3. Query Published Tours for this Destination
        published_tours = list(
            Tour.objects.filter(
                Q(destination=dest) | Q(destination_name__icontains=dest.name) | Q(slug__icontains=dest.slug),
                is_published=True,
            ).order_by("-is_featured", "-rating")[:3]
        )

        # 4. Query Published Heritage/Place Knowledge Chunks
        place_chunks = list(
            AssistantKnowledgeChunk.objects.filter(
                entity_type=AssistantKnowledgeChunk.EntityType.PLACE,
                metadata__destination_slug=dest.slug,
            )[:5]
        )

        # 5. Assemble Day-by-Day Itinerary Plan
        days_plan: list[dict[str, Any]] = []
        base_tour = published_tours[0] if published_tours else None

        tour_itinerary: list[dict[str, Any]] = (base_tour.itinerary or []) if base_tour else []

        for day_num in range(1, days + 1):
            if day_num <= len(tour_itinerary):
                ti = tour_itinerary[day_num - 1]
                day_title = ti.get("title", f"Khám phá {dest.name}")
                morning = ti.get("morning", f"Tham quan điểm nổi bật tại {dest.name}")
                afternoon = ti.get("afternoon", "Trải nghiệm văn hóa & cảnh sắc thiên nhiên")
                evening = ti.get("evening", "Thưởng thức ẩm thực địa phương đặc sản")
            else:
                # Supplement with real place landmarks from knowledge chunks
                place_idx = (day_num - 1) % max(1, len(place_chunks))
                place_item = place_chunks[place_idx] if place_chunks else None
                landmark_name = place_item.title if place_item else f"Thắng cảnh {dest.name}"

                day_title = f"Khám Phá Chiều Sâu Di Sản: {landmark_name}"
                morning = f"Khởi hành tham quan di tích và thắng cảnh {landmark_name}, check-in không gian thiên nhiên."
                afternoon = "Tự do dạo phố, trải nghiệm các làng nghề truyền thống và tìm hiểu nếp sống bản địa."
                evening = "Thưởng thức ẩm thực đêm, dạo chợ đêm hoặc ngắm cảnh thành phố về đêm."

            # Adjust description based on pace
            if pace == "relaxed":
                morning = f"[Nhịp thong thả] {morning}. Thưởng thức cà phê thư giãn ngắm cảnh."
                afternoon = f"[Nghỉ ngơi] {afternoon}. Dành thời gian nghỉ ngơi thư thái."
            elif pace == "fast":
                morning = f"[Khởi hành sớm] {morning}. Tiếp tục check-in các điểm lân cận."
                afternoon = f"[Tăng tốc trải nghiệm] {afternoon} kết hợp trải nghiệm hoạt động vận động."

            days_plan.append(
                {
                    "day": day_num,
                    "title": day_title,
                    "morning": morning,
                    "afternoon": afternoon,
                    "evening": evening,
                }
            )

        # 6. Budget Estimation & Inclusions Analysis
        base_tour_price = float(base_tour.price) if base_tour else 0.0
        has_tour_package = base_tour is not None

        tour_inclusions = base_tour.included if (base_tour and isinstance(base_tour.included, list)) else []
        incl_text = " ".join(tour_inclusions).lower()
        has_room_incl = any(k in incl_text for k in ["khách sạn", "resort", "phòng", "homestay", "lưu trú"])
        has_meal_incl = any(k in incl_text for k in ["ăn", "bữa", "buffet", "ẩm thực"])

        if has_tour_package:
            # Package already covers hotel room, tour transport, and scheduled meals
            # Out-of-pocket allowance is strictly for personal discretionary spend (drinks, optional excluded activities, gifts)
            daily_allowance = 250_000.0
            estimated_budget = int(base_tour_price + (days * daily_allowance))
            cost_breakdown_str = (
                f"• **Chi tiết dự toán:**\n"
                f"  - Giá tour trọn gói cơ sở: **{int(base_tour_price):,} VNĐ** "
                f"*(bao gồm: {', '.join(tour_inclusions[:3]) if tour_inclusions else 'phòng lưu trú, xe đưa đón và các bữa ăn chính'})*.\n"
                f"  - Dự trù chi phí cá nhân ngoài tour: ~**{int(days * daily_allowance):,} VNĐ** "
                f"*(~{int(daily_allowance):,} VNĐ/ngày cho đồ uống ngoài gói, vé vui chơi tự chọn, quà lưu niệm)*."
            )
        else:
            # Self-guided trip: Room ~700k + 3 Meals ~350k + Local transport/tickets ~150k = ~1.2M/day
            daily_allowance = 1_200_000.0
            estimated_budget = int(days * daily_allowance)
            cost_breakdown_str = (
                f"• **Chi tiết dự toán tự túc:** ~**{estimated_budget:,} VNĐ** "
                f"*(ước tính ~{int(daily_allowance):,} VNĐ/ngày gồm phòng lưu trú 3 sao, 3 bữa ăn và vé tham quan cơ bản)*."
            )

        budget_notes = ""
        if budget:
            budget_val = float(budget)
            diff = budget_val - estimated_budget
            pct = (diff / budget_val) * 100 if budget_val > 0 else 0

            if budget_val >= estimated_budget:
                if pct >= 20.0:
                    budget_notes = (
                        f"\n\n**Đánh giá ngân sách:** Mức ngân sách dự kiến của Quý khách ({int(budget_val):,} VNĐ) "
                        f"rất thoải mái, còn dư khoảng ~{int(diff):,} VNĐ (~{int(pct)}% dự phòng). "
                        f"Quý khách có thể nâng hạng phòng khách sạn hoặc trải nghiệm thêm các dịch vụ ăn uống cao cấp."
                    )
                elif pct >= 5.0:
                    budget_notes = (
                        f"\n\n**Đánh giá ngân sách:** Mức ngân sách dự kiến của Quý khách ({int(budget_val):,} VNĐ) "
                        f"phù hợp và vừa vặn cho chuyến đi, còn dư khoảng ~{int(diff):,} VNĐ (~{int(pct)}% dự phòng) cho các chi phí phát sinh."
                    )
                else:
                    budget_notes = (
                        f"\n\n**Đánh giá ngân sách:** Mức ngân sách dự kiến của Quý khách ({int(budget_val):,} VNĐ) "
                        f"tương đối sát với mức dự toán tối thiểu (dự phòng chỉ còn ~{int(diff):,} VNĐ, tương đương ~{pct:.1f}%). "
                        f"Mức dự phòng này không đủ an toàn để coi là thoải mái; Quý khách nên chuẩn bị thêm một khoản dự phòng "
                        f"(~500,000 - 1,000,000 VNĐ) để chi tiêu cá nhân và xử lý phát sinh được chủ động hơn."
                    )
            else:
                shortage = estimated_budget - budget_val
                budget_notes = (
                    f"\n\n**Đánh giá ngân sách:** Mức ngân sách {int(budget_val):,} VNĐ hiện thấp hơn mức dự toán tối ưu "
                    f"(~{estimated_budget:,} VNĐ/khách, thiếu khoảng ~{int(shortage):,} VNĐ). "
                    f"Quý khách có thể cân nhắc chọn dịch vụ lưu trú tiết kiệm hơn hoặc điều chỉnh số ngày lưu trú."
                )

        # 7. Transit logistics and realistic travel time
        transit_info = ""
        if dest.slug == "da-lat":
            transit_info = (
                "\n\n**Thông tin di chuyển & khoảng cách thực tế (Đà Lạt):**\n"
                "• Sân bay Liên Khương ↔ Trung tâm TP. Đà Lạt: ~30 - 32 km (thời gian di chuyển ô tô/taxi khoảng 40 - 45 phút qua cao tốc Liên Khương - Prenn, không thuộc bán kính nội ô).\n"
                "• Tuyến Đồi chè Cầu Đất (phía Đông Nam, cách trung tâm ~22 km) và Hồ Tuyền Lâm (phía Tây Nam, cách trung tâm ~7 km) nằm ở hai hướng khác nhau, khoảng cách giữa 2 điểm khoảng ~28 km (~45 - 50 phút di chuyển đường đèo). Khuyến nghị sắp xếp buổi sáng săn mây Cầu Đất, buổi trưa về trung tâm nghỉ ngơi và dùng bữa trước khi sang Hồ Tuyền Lâm vào buổi chiều để đảm bảo thể lực và an toàn di chuyển.\n"
                "• Dinh III & Thác Datanla: nằm ở phía Nam thành phố; Thác Datanla nằm ngay trên trục đèo Prenn hướng ra sân bay Liên Khương (~25 km, ~30 phút), rất thuận tiện bố trí vào sáng ngày về."
            )
        elif dest.slug == "ha-long":
            transit_info = (
                "\n\n**Thông tin di chuyển & khoảng cách thực tế (Hạ Long):**\n"
                "• Hà Nội ↔ Bến du thuyền Quốc tế Tuần Châu / Hạ Long: ~150 km (khoảng 2.5 - 3 giờ di chuyển qua cao tốc Hà Nội - Hải Phòng - Quảng Ninh).\n"
                "• Các điểm tham quan hang Luồn, Hang Sửng Sốt, đảo Ti Tốp nằm trên tuyến hải trình vịnh, di chuyển hoàn toàn bằng tàu du lịch hoặc cano trung chuyển."
            )

        # 8. Build Markdown Reply Text
        pace_label = "Vừa phải" if pace == "moderate" else ("Thong thả" if pace == "relaxed" else "Dày đặc")
        markdown_lines = [
            "Dạ chào Quý khách! Dựa trên cơ sở dữ liệu điểm đến chính thức của STAR Travels, em xin gửi gợi ý lịch trình trải nghiệm chi tiết:\n",
            f"**LỊCH TRÌNH KHÁM PHÁ {dest.name.upper()} {days} NGÀY {max(1, days - 1)} ĐÊM**\n",
            f"• **Điểm đến:** {dest.name}\n",
            f"• **Thời lượng:** {days} Ngày {max(1, days - 1)} Đêm\n",
            f"• **Nhịp độ trải nghiệm:** {pace_label}\n",
            f"• **Ước tính ngân sách tham khảo:** ~**{estimated_budget:,} VNĐ/khách** *(chưa gồm vé máy bay mùa cao điểm)*.\n",
            f"{cost_breakdown_str}",
            f"{budget_notes}\n\n",
            "---",
            "### LỊCH TRÌNH TỪNG NGÀY CHI TIẾT:",
        ]

        for dp in days_plan:
            markdown_lines.append(
                f"\n**Ngày {dp['day']}: {dp['title']}**\n"
                f"• **Buổi sáng:** {dp['morning']}\n"
                f"• **Buổi chiều:** {dp['afternoon']}\n"
                f"• **Buổi tối:** {dp['evening']}"
            )

        tour_callout = ""
        recommended_tour_slugs = []
        if published_tours:
            tour_callout = (
                f"\n\n**Tour trọn gói gợi ý:** Quý khách có thể tham khảo ngay hành trình được tổ chức chuyên nghiệp "
                f"của STAR Travels qua thẻ bên dưới:\n"
                f"[TOUR_CARD: {published_tours[0].slug}]"
            )
            recommended_tour_slugs = [t.slug for t in published_tours]

        markdown_lines.append(tour_callout)
        markdown_lines.append(transit_info)
        markdown_lines.append(
            "\n\n*Lưu ý: Lịch trình trên là gợi ý tham khảo dựa trên dữ liệu điểm đến và tour đã công bố của STAR Travels. "
            "Thứ tự các điểm tham quan và thời gian di chuyển thực tế cần được điều chỉnh linh hoạt theo điều kiện giao thông, thời tiết và chuyến bay thực tế của Quý khách.*"
        )
        markdown_lines.append(
            "\n\nQuý khách có muốn chuyên viên STAR Travels tư vấn tùy chỉnh riêng lịch trình này theo ngày khởi hành cụ thể hoặc giữ chỗ tour không ạ?"
        )

        full_reply = "".join(markdown_lines)

        # 9. Provenance Sources
        sources: list[dict[str, Any]] = [
            {
                "entity_type": "destination",
                "entity_id": str(dest.id),
                "slug": dest.slug,
                "title": dest.name,
                "url": f"/destinations/{dest.slug}",
            }
        ]
        for t in published_tours:
            t_source: dict[str, Any] = {
                "entity_type": "tour",
                "entity_id": str(t.id),
                "slug": t.slug,
                "title": t.title,
                "url": f"/tours/{t.slug}",
            }
            sources.append(t_source)
        for p in place_chunks:
            p_source: dict[str, str | None] = {
                "entity_type": "place",
                "entity_id": str(p.entity_id) if p.entity_id else None,
                "slug": p.entity_slug,
                "title": p.title,
                "url": f"/experiences/{p.entity_slug}",
            }
            sources.append(p_source)

        return {
            "success": True,
            "destination_name": dest.name,
            "destination_slug": dest.slug,
            "days": days,
            "pace": pace,
            "estimated_budget": estimated_budget,
            "message": full_reply,
            "days_plan": days_plan,
            "recommended_tour_slugs": recommended_tour_slugs,
            "sources": sources,
            "structured_plan": {
                "destination": dest.name,
                "destination_slug": dest.slug,
                "days": days,
                "pace": pace,
                "days_plan": days_plan,
                "estimated_budget": estimated_budget,
                "disclaimer": "Lịch trình đề xuất dựa trên dữ liệu điểm đến và tour đã công bố của STAR Travels.",
            },
        }
