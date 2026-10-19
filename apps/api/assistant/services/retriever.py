import re
import unicodedata

from django.db.models import Q

from assistant.models import AssistantKnowledgeChunk


def strip_vietnamese_diacritics(text: str) -> str:
    """Normalize Vietnamese diacritics into ASCII equivalent for robust search matching."""
    text = text.replace("đ", "d").replace("Đ", "D")
    text = unicodedata.normalize("NFKD", text)
    return "".join(c for c in text if not unicodedata.combining(c)).lower()


DESTINATION_KEYWORDS = {
    "ha-long": ["hạ long", "ha long", "vịnh hạ long", "lan hạ", "bái tử long"],
    "da-lat": ["đà lạt", "da lat", "thành phố ngàn hoa", "langbiang", "tuyền lâm"],
    "phu-quoc": ["phú quốc", "phu quoc", "đảo ngọc", "sao beach", "an thới"],
    "sa-pa": ["sa pa", "sapa", "fansipan", "mường hoa", "hàm rồng"],
    "hoi-an": ["hội an", "hoi an", "phố cổ", "sông hoài", "chùa cầu"],
    "ninh-binh": ["ninh bình", "ninh binh", "tràng an", "tam cốc", "bái đính", "hoa lư"],
    "hue": ["huế", "hue", "cố đô", "sông hương", "đại nội", "thiên mụ"],
    "ha-giang": ["hà giang", "ha giang", "mã pí lèng", "đồng văn", "lũng cú", "nho quế"],
    "da-nang": ["đà nẵng", "da nang", "bà nà", "cầu vàng", "mỹ khê", "ngũ hành sơn"],
    "nha-trang": ["nha trang", "nhatrang", "vịnh nha trang", "hòn mun", "tháp bà", "ponagar"],
    "mui-ne": ["mũi né", "mui ne", "phan thiết", "đồi cát", "bàu trắng", "poshanư"],
    "can-tho": ["cần thơ", "can tho", "chợ nổi", "cái răng", "ninh kiều", "miền tây", "sông nước"],
    "quang-binh": [
        "quảng bình",
        "phong nha",
        "kẻ bàng",
        "sơn đoòng",
        "động thiên đường",
        "hang tối",
    ],
    "cao-bang": ["cao bằng", "bản giốc", "thác bản giốc", "ngườm ngao", "pác bó", "suối lê nin"],
    "ho-chi-minh": [
        "sài gòn",
        "saigon",
        "tp hcm",
        "hồ chí minh",
        "dinh độc lập",
        "củ chi",
        "địa đạo",
    ],
    "con-dao": ["côn đảo", "hàng dương", "võ thị sáu", "bà phi yến", "chuồng cọp"],
    "quy-nhon": ["quy nhơn", "kỳ co", "eo gió", "bình định", "quang trung", "tháp đôi"],
    "phu-yen": ["phú yên", "gành đá đĩa", "mũi điện", "đại lãnh", "vũng rô", "đầm ô loan"],
    "pu-luong": ["pù luông", "mai châu", "bản đôn", "bản lác", "cọn nước"],
    "yen-tu": ["yên tử", "trúc lâm", "chùa đồng", "trần nhân tông"],
    "ha-noi": [
        "hà nội",
        "ha noi",
        "hanoi",
        "hn",
        "thủ đô",
        "thăng long",
        "hồ gươm",
        "ho guom",
        "phố cổ",
        "pho co",
        "hồ tây",
        "ho tay",
        "tràng tiền",
        "metropole",
        "capella",
    ],
}

REGION_KEYWORDS = {
    "north": ["miền bắc", "phía bắc", "bắc bộ", "hà nội", "tây bắc", "đông bắc", "north"],
    "central": ["miền trung", "trung bộ", "duyên hải", "central"],
    "south": ["miền nam", "nam bộ", "sài gòn", "tây nam bộ", "đồng bằng sông cửu long", "south"],
}

STOP_WORDS = {
    "tour",
    "tours",
    "du",
    "lịch",
    "muốn",
    "đặt",
    "hỏi",
    "cho",
    "của",
    "với",
    "các",
    "những",
    "được",
    "không",
    "mình",
    "tôi",
    "bạn",
    "ngày",
    "đêm",
    "người",
    "khách",
    "nào",
    "gì",
    "sao",
    "đi",
    "đến",
    "tại",
    "nơi",
    "ở",
    "có",
    "và",
    "hoặc",
    "là",
    "thì",
    "mà",
    "hay",
    "hãy",
    "em",
    "anh",
    "chị",
    "ơi",
    "nhé",
    "ạ",
    "nam",
    "bắc",
    "trung",
    "đông",
    "tây",
    "việt",
    "đảo",
    "núi",
    "sông",
    "biển",
    "vịnh",
    "thành",
    "phố",
    "the",
    "and",
    "for",
    "with",
    "trip",
    "travel",
    "about",
    "what",
    "where",
    "when",
    "how",
    "can",
    "you",
    "are",
    "have",
    "from",
    "please",
    "want",
    "like",
}


def search_knowledge(
    query: str, locale: str = "vi", limit: int = 4
) -> list[AssistantKnowledgeChunk]:
    """
    Hybrid retriever finding the most relevant knowledge chunks for the query.
    Uses multi-field search and semantic entity routing.
    """
    clean_query = query.lower().strip()
    unaccent_query = strip_vietnamese_diacritics(clean_query)
    words = re.findall(r"\w+", clean_query)

    # 1. Identify matched destinations (bilingual & accent-insensitive)
    matched_dest_slugs = []
    for slug, synonyms in DESTINATION_KEYWORDS.items():
        if any(
            syn in clean_query or strip_vietnamese_diacritics(syn) in unaccent_query
            for syn in synonyms
        ):
            matched_dest_slugs.append(slug)

    # 2. Identify matched regions
    matched_regions = []
    for reg, synonyms in REGION_KEYWORDS.items():
        if any(
            syn in clean_query or strip_vietnamese_diacritics(syn) in unaccent_query
            for syn in synonyms
        ):
            matched_regions.append(reg)

    # 3. Policy & FAQ inquiry detection
    is_policy_inquiry = any(
        kw in clean_query
        for kw in [
            "chính sách",
            "hoàn hủy",
            "đặt cọc",
            "hủy tour",
            "trẻ em",
            "phụ thu",
            "bảo hiểm",
            "quy định",
            "policy",
            "refund",
            "cancel",
        ]
    )

    # 4. History & Culture inquiry detection
    is_history_inquiry = any(
        kw in clean_query
        for kw in [
            "lịch sử",
            "sự tích",
            "huyền tích",
            "truyền thuyết",
            "nguồn gốc",
            "tên gọi",
            "vua",
            "thế kỷ",
            "triều đại",
            "xưa",
            "cổ",
            "thương cảng",
            "chùa cầu",
            "hoa lư",
            "yersin",
            "bảo đại",
            "mã pí lèng",
            "con đường hạnh phúc",
            "mạc cửu",
            "tháp bà",
            "poshanư",
            "sơn đoòng",
            "phong nha",
            "mỹ sơn",
            "bản giốc",
            "yên tử",
            "củ chi",
            "côn đảo",
            "võ thị sáu",
            "gành đá đĩa",
            "eo gió",
            "history",
            "legend",
            "dynasty",
            "ancient",
            "heritage",
        ]
    )

    # 5. Season & Weather inquiry detection
    is_season_inquiry = any(
        kw in clean_query
        for kw in [
            "mùa nào",
            "thời tiết",
            "tháng mấy",
            "mùa đẹp nhất",
            "thời điểm",
            "nhiệt độ",
            "săn mây",
            "lúa chín",
            "tam giác mạch",
            "mùa khô",
            "mùa mưa",
            "mùa bão",
            "nước nổi",
            "season",
            "weather",
            "best time",
            "when to visit",
            "climate",
        ]
    )

    # 6. Gastronomy & Local Food inquiry detection
    is_cuisine_inquiry = any(
        kw in clean_query
        for kw in [
            "ăn gì",
            "đặc sản",
            "món ngon",
            "ẩm thực",
            "quán ăn",
            "món ăn",
            "ăn uống",
            "uống gì",
            "món nào ngon",
            "food",
            "cuisine",
            "specialty",
            "dish",
            "eat",
        ]
    )

    # 7. Insider Tips & Duration inquiry detection
    is_tips_inquiry = any(
        kw in clean_query
        for kw in [
            "kinh nghiệm",
            "chuẩn bị gì",
            "lưu ý",
            "trang phục",
            "đi mấy ngày",
            "mấy ngày",
            "lịch trình",
            "cần mang gì",
            "tips",
            "itinerary",
            "duration",
            "how many days",
        ]
    )

    # 8. Visa & Entry inquiry detection
    is_visa_inquiry = any(
        kw in clean_query
        for kw in [
            "visa",
            "e-visa",
            "evisa",
            "thị thực",
            "nhập cảnh",
            "hộ chiếu",
            "passport",
            "miễn thị thực",
            "visa waiver",
            "45 ngày",
            "90 ngày",
            "lệ phí visa",
            "cổng xuất nhập cảnh",
            "entry permit",
        ]
    )

    # 9. Domestic Transport & Airport transfers detection
    is_transport_inquiry = any(
        kw in clean_query
        for kw in [
            "di chuyển",
            "máy bay",
            "sân bay",
            "đón sân bay",
            "tàu hỏa",
            "đường sắt",
            "limousine",
            "xe khách",
            "grab",
            "xanh sm",
            "taxi",
            "nội bài",
            "tân sơn nhất",
            "cam ranh",
            "liên khương",
            "airport",
            "transit",
            "flight",
            "train",
            "transfer",
        ]
    )

    # 10. Safety & Emergency hotlines detection
    is_safety_inquiry = any(
        kw in clean_query
        for kw in [
            "an toàn",
            "khẩn cấp",
            "công an",
            "cứu hỏa",
            "cấp cứu",
            "113",
            "114",
            "115",
            "112",
            "bảo hiểm",
            "dòng chảy xa bờ",
            "rip current",
            "đuối nước",
            "leo núi an toàn",
            "tai nạn",
            "emergency",
            "safety",
            "ambulance",
            "police",
            "insurance",
        ]
    )

    # 11. Culture, Dress code & Etiquette detection
    is_culture_inquiry = any(
        kw in clean_query
        for kw in [
            "văn hóa",
            "trang phục",
            "đền chùa",
            "mặc gì",
            "chùa chiền",
            "mặc cả",
            "trả giá",
            "tiền tip",
            "tiền boa",
            "chào hỏi",
            "cấm kỵ",
            "cắm đũa",
            "xưng hô",
            "culture",
            "etiquette",
            "dress code",
            "temple",
            "tipping",
            "bargaining",
            "taboo",
        ]
    )

    # 12. Currency, Money exchange & Daily costs detection
    is_currency_inquiry = any(
        kw in clean_query
        for kw in [
            "tiền tệ",
            "đổi tiền",
            "tiền mặt",
            "ngân hàng",
            "tiệm vàng",
            "tỷ giá",
            "chi phí",
            "bao nhiêu tiền",
            "500k",
            "20k",
            "polymer",
            "vietqr",
            "quẹt thẻ",
            "credit card",
            "currency",
            "exchange rate",
            "budget",
            "cost per day",
        ]
    )

    # 13. Festivals & Seasonal events detection
    is_festival_inquiry = any(
        kw in clean_query
        for kw in [
            "lễ hội",
            "sự kiện",
            "tết",
            "pháo hoa",
            "diff",
            "chùa hương",
            "trung thu",
            "đền hùng",
            "festival hoa",
            "đua bò",
            "lịch lễ hội",
            "festival",
            "event",
            "celebration",
        ]
    )

    # Build candidate Q filter for DB-level filtering instead of loading all chunks
    candidates_q = Q()
    if matched_dest_slugs:
        dest_filter = (
            Q(entity_slug__in=matched_dest_slugs)
            | Q(metadata__destination_slug__in=matched_dest_slugs)
            | Q(metadata__slug__in=matched_dest_slugs)
        )
        for d_slug in matched_dest_slugs:
            dest_filter |= Q(title__icontains=d_slug.replace("-", " "))
        candidates_q |= dest_filter

    if matched_regions:
        candidates_q |= Q(metadata__region__in=matched_regions)

    if is_policy_inquiry:
        candidates_q |= Q(entity_type=AssistantKnowledgeChunk.EntityType.POLICY) | Q(
            metadata__category="policy"
        )

    if is_history_inquiry:
        candidates_q |= Q(metadata__category="heritage_history")

    if (
        is_visa_inquiry
        or is_transport_inquiry
        or is_safety_inquiry
        or is_culture_inquiry
        or is_currency_inquiry
        or is_festival_inquiry
        or is_season_inquiry
    ):
        candidates_q |= Q(entity_type=AssistantKnowledgeChunk.EntityType.GUIDE)

    # Keyword tokens (words >= 3 chars excluding stopwords, limit to top 8 tokens for DB candidate query)
    keyword_words = [w for w in words if len(w) >= 3 and w not in STOP_WORDS][:8]
    if keyword_words:
        kw_q = Q()
        for w in keyword_words:
            kw_q |= Q(title__icontains=w) | Q(entity_slug__icontains=w)
        candidates_q |= kw_q

    # If no candidate signals matched at all (e.g. empty or non-matching query)
    if not candidates_q:
        return []

    # Retrieve candidate chunks from database with an upper bound limit
    chunks = list(AssistantKnowledgeChunk.objects.filter(candidates_q).distinct()[:100])
    if not chunks:
        return []

    scored_chunks: list[tuple[int, AssistantKnowledgeChunk]] = []

    for chunk in chunks:
        score = 0
        slug = chunk.entity_slug.lower()
        title = chunk.title.lower()
        content = (
            chunk.content_vi if locale == "vi" else (chunk.content_en or chunk.content_vi)
        ).lower()
        meta = chunk.metadata or {}

        # Destination match
        for dest_slug in matched_dest_slugs:
            if (
                dest_slug in slug
                or dest_slug == meta.get("slug")
                or dest_slug == meta.get("destination_slug")
            ):
                score += 50
            if dest_slug.replace("-", " ") in title:
                score += 40

        # Region match
        for reg in matched_regions:
            if meta.get("region") == reg:
                score += 30

        # Policy match
        if is_policy_inquiry and chunk.entity_type == AssistantKnowledgeChunk.EntityType.POLICY:
            score += 60

        # Guide chunks specialized matching
        if chunk.entity_type == AssistantKnowledgeChunk.EntityType.GUIDE:
            guide_cat = meta.get("category", "")
            if is_visa_inquiry and guide_cat in ["visa", "guide_visa"]:
                score += 95
            if is_season_inquiry and guide_cat in ["weather", "guide_weather"]:
                score += 85
            if is_transport_inquiry and guide_cat in ["transport", "guide_transport"]:
                score += 90
            if is_safety_inquiry and guide_cat in ["safety", "guide_safety"]:
                score += 95
            if is_culture_inquiry and guide_cat in ["culture", "guide_culture"]:
                score += 90
            if is_currency_inquiry and guide_cat in ["currency", "guide_currency"]:
                score += 90
            if is_festival_inquiry and guide_cat in ["festivals", "guide_festivals"]:
                score += 90

        # History & Heritage match
        if is_history_inquiry and meta.get("category") == "heritage_history":
            score += 80

        # Season & Climate match
        if is_season_inquiry and meta.get("best_time_to_visit"):
            score += 70

        # Gastronomy & Food match
        if is_cuisine_inquiry and meta.get("signature_cuisine"):
            score += 70

        # Insider Tips & Duration match
        if is_tips_inquiry and (meta.get("insider_tips") or meta.get("ideal_duration")):
            score += 60

        # Keyword matching (excluding generic stopwords)
        for w in words:
            if len(w) >= 3 and w not in STOP_WORDS:
                if w in title:
                    score += 15
                if w in slug:
                    score += 10
                if w in content:
                    score += 2

        if score >= 20:
            scored_chunks.append((score, chunk))

    # Sort descending by score
    scored_chunks.sort(key=lambda item: item[0], reverse=True)

    results = [item[1] for item in scored_chunks[:limit]]

    # NO fallback to random tours when score is 0 or no results match!
    # Returning empty list allows honest no-evidence detection.
    return results
