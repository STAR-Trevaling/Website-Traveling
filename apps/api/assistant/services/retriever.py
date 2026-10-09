import re

from assistant.models import AssistantKnowledgeChunk

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
}

REGION_KEYWORDS = {
    "north": ["miền bắc", "phía bắc", "bắc bộ", "hà nội", "tây bắc", "đông bắc", "north"],
    "central": ["miền trung", "trung bộ", "duyên hải", "central"],
    "south": ["miền nam", "nam bộ", "sài gòn", "tây nam bộ", "đồng bằng sông cửu long", "south"],
}


def search_knowledge(
    query: str, locale: str = "vi", limit: int = 4
) -> list[AssistantKnowledgeChunk]:
    """
    Hybrid retriever finding the most relevant knowledge chunks for the query.
    Uses multi-field search and semantic entity routing.
    """
    clean_query = query.lower().strip()
    words = re.findall(r"\w+", clean_query)

    # 1. Identify matched destinations
    matched_dest_slugs = []
    for slug, synonyms in DESTINATION_KEYWORDS.items():
        if any(syn in clean_query for syn in synonyms):
            matched_dest_slugs.append(slug)

    # 2. Identify matched regions
    matched_regions = []
    for reg, synonyms in REGION_KEYWORDS.items():
        if any(syn in clean_query for syn in synonyms):
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

    scored_chunks: list[tuple[int, AssistantKnowledgeChunk]] = []
    chunks = list(AssistantKnowledgeChunk.objects.all())

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

        # Keyword matching
        for w in words:
            if len(w) >= 3:
                if w in title:
                    score += 15
                if w in slug:
                    score += 10
                if w in content:
                    score += 2

        if score > 0:
            scored_chunks.append((score, chunk))

    # Sort descending by score
    scored_chunks.sort(key=lambda item: item[0], reverse=True)

    results = [item[1] for item in scored_chunks[:limit]]

    # Fallback to featured tours if no specific matches found
    if not results:
        results = list(
            AssistantKnowledgeChunk.objects.filter(
                entity_type=AssistantKnowledgeChunk.EntityType.TOUR
            )[:limit]
        )

    return results
