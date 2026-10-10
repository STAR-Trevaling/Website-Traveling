#!/usr/bin/env python3
"""
STAR Travels - SVG UML Diagram Generator
Generates 8 high-resolution, pixel-perfect, standalone vector SVG diagrams
for both `docs/diagrams/` and `apps/public-site/public/diagrams/`.
Enables instant graphical viewing in VS Code, browsers, and the Next.js app.
"""

from pathlib import Path


def get_svg_wrapper(title, width=1650, height=1050, content=""):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%" style="background:#FFFFFF; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <defs>
    <!-- Drop Shadow Filter -->
    <filter id="card-shadow" x="-5%" y="-5%" width="110%" height="115%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0F172A" flood-opacity="0.08"/>
    </filter>
    
    <!-- UML Markers -->
    <marker id="arrow-sync" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0F172A" />
    </marker>
    <marker id="arrow-open" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9" fill="none" stroke="#64748B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
    </marker>
    <marker id="arrow-comp" viewBox="0 0 16 10" refX="1" refY="5" markerWidth="14" markerHeight="9" orient="auto-start-reverse">
      <polygon points="1,5 8,1 15,5 8,9" fill="#0F172A" stroke="#0F172A" stroke-width="1.5" />
    </marker>
    <marker id="arrow-inherit" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="10" markerHeight="10" orient="auto-start-reverse">
      <polygon points="1,1 11,6 1,11" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.8" />
    </marker>
    <marker id="arrow-include" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9" fill="none" stroke="#DA251D" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
    </marker>
  </defs>

  <!-- Background Grid -->
  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" stroke-width="1"/>
  </pattern>
  <rect width="{width}" height="{height}" fill="url(#grid)" />

  {content}
</svg>"""


def svg_title_card(title, subtitle, scope, x=40, y=30, w=600, h=80):
    return f"""
    <g filter="url(#card-shadow)">
      <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="#F8FAFC" stroke="#94A3B8" stroke-width="1.2"/>
      <text x="{x+16}" y="{y+26}" font-size="14" font-weight="700" fill="#0F172A">{title}</text>
      <text x="{x+16}" y="{y+46}" font-size="11" fill="#475569">{subtitle}</text>
      <text x="{x+16}" y="{y+64}" font-size="11" fill="#64748B" font-style="italic">Phạm vi: {scope}</text>
    </g>
    """


def svg_legend_card(items, x=1310, y=30, w=300, h=85):
    lines = []
    for i, (col, text) in enumerate(items):
        lines.append(f"""
        <circle cx="{x+18}" cy="{y+32 + i*18}" r="5" fill="{col}"/>
        <text x="{x+30}" y="{y+36 + i*18}" font-size="11" fill="#334155">{text}</text>
        """)
    joined_lines = "\n".join(lines)
    return f"""
    <g filter="url(#card-shadow)">
      <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
      <text x="{x+16}" y="{y+18}" font-size="11" font-weight="700" fill="#0F172A">CHÚ GIẢI (LEGEND)</text>
      {joined_lines}
    </g>
    """


def build_svg_01_use_case():
    title = "STAR Travels — Sơ Đồ Use Case Tổng Thể (OMG UML 2.5)"
    sub = "Chuẩn: OMG UML 2.5.1 | Ranh giới: STAR Monolith & Cổng Ngoại vi"
    scope = "Đặt Tour, Thanh toán, Tiếp thị liên kết Đối tác, AI Concierge, B2B Onboarding"
    
    t_card = svg_title_card(title, sub, scope, x=40, y=30, w=580, h=80)
    l_card = svg_legend_card([
        ("#DA251D", "Use Case Trọng Tâm (STAR Red)"),
        ("#0284C7", "Use Case Cơ Bản (Catalogs & Auth)"),
        ("#D97706", "Use Case Tích Hợp Ngoại Vi (Payment/ERP)")
    ], x=1310, y=30, w=300, h=85)

    def actor(label, sublabel, x, y):
        return f"""
        <g transform="translate({x}, {y})">
          <circle cx="25" cy="20" r="14" fill="#1E293B" stroke="#0F172A" stroke-width="2"/>
          <line x1="25" y1="34" x2="25" y2="70" stroke="#0F172A" stroke-width="3"/>
          <line x1="0" y1="48" x2="50" y2="48" stroke="#0F172A" stroke-width="3"/>
          <line x1="25" y1="70" x2="5" y2="105" stroke="#0F172A" stroke-width="3"/>
          <line x1="25" y1="70" x2="45" y2="105" stroke="#0F172A" stroke-width="3"/>
          <text x="25" y="125" text-anchor="middle" font-size="12" font-weight="700" fill="#0F172A">{label}</text>
          <text x="25" y="140" text-anchor="middle" font-size="11" fill="#475569">{sublabel}</text>
        </g>
        """

    def use_case(text_lines, x, y, w, h, fill="#FFFFFF", stroke="#0284C7", text_color="#0369A1", sw=1.5):
        t_spans = []
        start_y = y + h/2 - (len(text_lines)-1)*8
        for i, t in enumerate(text_lines):
            t_spans.append(f'<text x="{x + w/2}" y="{start_y + i*16}" text-anchor="middle" font-size="11" font-weight="700" fill="{text_color}">{t}</text>')
        return f"""
        <g filter="url(#card-shadow)">
          <ellipse cx="{x + w/2}" cy="{y + h/2}" rx="{w/2}" ry="{h/2}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>
          {"".join(t_spans)}
        </g>
        """

    content = f"""
    {t_card}
    {l_card}

    <!-- System Boundary -->
    <rect x="280" y="130" width="980" height="880" rx="10" fill="#F8FAFC" stroke="#475569" stroke-width="1.8" filter="url(#card-shadow)"/>
    <rect x="280" y="130" width="980" height="34" rx="10" fill="#E2E8F0"/>
    <text x="770" y="152" text-anchor="middle" font-size="13" font-weight="700" fill="#1E293B">STAR Travels Platform System Boundary</text>

    <!-- Actors -->
    {actor("Traveler", "(Du khách)", 80, 270)}
    {actor("Merchant Partner", "(Đối tác dịch vụ)", 80, 700)}
    {actor("System Admin", "(Quản trị viên)", 1400, 250)}
    {actor("Payment Gateway", "(VNPay / VietQR)", 1400, 490)}
    {actor("Odoo 18 ERP", "(CRM & Backoffice)", 1400, 740)}

    <!-- Use Cases Left Column -->
    {use_case(["UC-1: Khám phá Điểm đến,", "Tour trọn gói & Cẩm nang"], 340, 180, 230, 65, "#FFFFFF", "#0284C7", "#0369A1")}
    {use_case(["UC-2: Định vị GPS & Tìm quán,", "Khách sạn gần nhất (Haversine)"], 340, 290, 240, 70, "#FEF2F2", "#DA251D", "#7F1D1D", 2)}
    {use_case(["UC-3: Đặt Tour Trọn Gói", "& Phòng vệ giá Server-side"], 340, 400, 230, 70, "#FEF2F2", "#DA251D", "#7F1D1D", 2)}
    {use_case(["UC-4: Chuyển tiếp Đặt chỗ", "Đối tác (Affiliate Referral 1.5s)"], 340, 510, 240, 70, "#FEF2F2", "#DA251D", "#7F1D1D", 2)}
    {use_case(["UC-5: Trò chuyện & Tư vấn", "với Trợ lý STAR AI Concierge"], 340, 620, 240, 70, "#FEF2F2", "#DA251D", "#7F1D1D", 2)}
    {use_case(["UC-6: Nộp Hồ sơ Hợp tác B2B", "(Trở thành Đối tác Lữ hành)"], 340, 730, 230, 65, "#FFFFFF", "#0284C7", "#0369A1")}
    {use_case(["UC-8: Đăng nhập & Xác thực", "Bảo mật (BFF HttpOnly JWT)"], 340, 830, 230, 65, "#FFFFFF", "#0284C7", "#0369A1")}

    <!-- Use Cases Right Column -->
    {use_case(["UC-3.1: Thanh toán Trực tuyến", "(VNPay Thẻ/QR & VietQR NAPAS)"], 700, 400, 250, 70, "#FEF3C7", "#D97706", "#78350F")}
    {use_case(["UC-4.1: Đồng bộ Lead Chuyển đổi", "sang Odoo 18 CRM Lead"], 700, 510, 250, 70, "#FEF3C7", "#D97706", "#78350F")}
    {use_case(["UC-7: Xét duyệt Đối tác B2B", "& Phân quyền Tổ chức Atomic"], 700, 730, 240, 65, "#FFFFFF", "#0284C7", "#0369A1")}
    {use_case(["UC-9: Quản trị Nội dung,", "Kiểm toán Audit & Giám sát DLQ"], 700, 830, 240, 65, "#FFFFFF", "#0284C7", "#0369A1")}

    <!-- Connecting Lines -->
    <path d="M 140 330 L 340 212" stroke="#475569" stroke-width="1.5" fill="none"/>
    <path d="M 140 330 L 340 325" stroke="#475569" stroke-width="1.5" fill="none"/>
    <path d="M 140 330 L 340 435" stroke="#475569" stroke-width="1.5" fill="none"/>
    <path d="M 140 330 L 340 545" stroke="#475569" stroke-width="1.5" fill="none"/>
    <path d="M 140 330 L 340 655" stroke="#475569" stroke-width="1.5" fill="none"/>
    <path d="M 140 330 L 340 862" stroke="#475569" stroke-width="1.5" fill="none"/>

    <path d="M 140 760 L 340 762" stroke="#475569" stroke-width="1.5" fill="none"/>
    <path d="M 140 760 L 340 862" stroke="#475569" stroke-width="1.5" fill="none"/>

    <path d="M 1400 310 L 940 762" stroke="#475569" stroke-width="1.5" fill="none"/>
    <path d="M 1400 310 L 940 862" stroke="#475569" stroke-width="1.5" fill="none"/>
    <path d="M 1400 550 L 950 435" stroke="#475569" stroke-width="1.5" fill="none"/>
    <path d="M 1400 800 L 950 545" stroke="#475569" stroke-width="1.5" fill="none"/>

    <!-- Include connectors -->
    <path d="M 570 435 L 700 435" stroke="#DA251D" stroke-width="1.5" stroke-dasharray="6,4" marker-end="url(#arrow-include)" fill="none"/>
    <text x="635" y="425" text-anchor="middle" font-size="11" font-weight="700" fill="#DA251D">«include»</text>

    <path d="M 580 545 L 700 545" stroke="#DA251D" stroke-width="1.5" stroke-dasharray="6,4" marker-end="url(#arrow-include)" fill="none"/>
    <text x="640" y="535" text-anchor="middle" font-size="11" font-weight="700" fill="#DA251D">«include»</text>
    """
    return get_svg_wrapper("1. Use Case Diagram", content=content)


def build_svg_02_class():
    title = "STAR Travels — Sơ Đồ Lớp Miền Nghiệp Vụ (Domain Class Diagram)"
    sub = "Chuẩn: OMG UML 2.5.1 | Bounded Contexts: 13 Mô-đun Clean Architecture"
    scope = "10 Thực thể chính, Multiplicities chuẩn, Ký hiệu Composition/Association/Aggregation"
    t_card = svg_title_card(title, sub, scope, x=40, y=30, w=600, h=80)
    l_card = svg_legend_card([
        ("#DA251D", "Core Domain (Tour, Booking)"),
        ("#0F766E", "Spatial & Catalog (Destinations)"),
        ("#1D4ED8", "Hospitality Referral (Hotel, Dining)"),
        ("#C2410C", "Financial Transactions (VNPay, VietQR)")
    ], x=1350, y=30, w=270, h=95)

    def uml_class(name, stereotype, fields, methods, x, y, w, h, header_bg="#1E293B", border_col="#0F172A"):
        field_svg = []
        for i, f in enumerate(fields):
            field_svg.append(f'<text x="{x+10}" y="{y+48 + i*16}" font-size="10.5" fill="#0F172A">{f}</text>')
        
        split_y = y + 48 + len(fields)*16 + 6
        method_svg = []
        for i, m in enumerate(methods):
            method_svg.append(f'<text x="{x+10}" y="{split_y + 16 + i*16}" font-size="10.5" fill="#0F172A">{m}</text>')

        return f"""
        <g filter="url(#card-shadow)">
          <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="#FFFFFF" stroke="{border_col}" stroke-width="1.5"/>
          <path d="M {x} {y+6} Q {x} {y} {x+6} {y} L {x+w-6} {y} Q {x+w} {y} {x+w} {y+6} L {x+w} {y+32} L {x} {y+32} Z" fill="{header_bg}"/>
          <text x="{x+w/2}" y="{y+18}" text-anchor="middle" font-size="12" font-weight="700" fill="#FFFFFF">{name}</text>
          <text x="{x+w/2}" y="{y+29}" text-anchor="middle" font-size="9.5" font-style="italic" fill="#E2E8F0">«{stereotype}»</text>
          {"".join(field_svg)}
          <line x1="{x}" y1="{split_y}" x2="{x+w}" y2="{split_y}" stroke="#CBD5E1" stroke-width="1"/>
          {"".join(method_svg)}
        </g>
        """

    content = f"""
    {t_card}
    {l_card}

    <!-- 1. User -->
    {uml_class("User", "accounts_user", [
        "- id: UUID",
        "- email: String (Unique)",
        "- phone: String (Indexed)",
        "- role: RoleEnum",
        "- is_active: Boolean",
        "- date_joined: DateTime"
    ], [
        "+ check_password(raw): bool",
        "+ is_partner_owner(): bool"
    ], 60, 150, 240, 210, "#1E293B", "#0F172A")}

    <!-- 2. Destination -->
    {uml_class("Destination", "destinations_destination", [
        "- id: UUID",
        "- slug: String (Unique)",
        "- name: String / name_en: String",
        "- region: RegionEnum",
        "- location: PointField (4326)",
        "- is_published: Boolean"
    ], [
        "+ get_published_tours(): QuerySet",
        "+ calculate_nearby_places(rad): List"
    ], 380, 150, 250, 210, "#0F766E", "#115E59")}

    <!-- 3. Tour -->
    {uml_class("Tour", "tours_tour", [
        "- id: UUID",
        "- destination_id: UUID (FK)",
        "- slug: String (Unique)",
        "- title: String / title_en: String",
        "- price: Decimal (Authority)",
        "- duration_days: Integer",
        "- itinerary: JSONB"
    ], [
        "+ calculate_total(pax): Decimal",
        "+ verify_slot_availability(date): bool"
    ], 710, 150, 270, 230, "#DA251D", "#B91C1C")}

    <!-- 4. Booking -->
    {uml_class("Booking", "bookings_booking", [
        "- id: UUID",
        "- code: String (STAR-YYYYMM)",
        "- user_id: UUID (FK Nullable)",
        "- item_type: BookingItemTypeEnum",
        "- item_id: UUID",
        "- status: BookingStatusEnum",
        "- total_price: Decimal (Server-calc)"
    ], [
        "+ transition_to(status): void",
        "+ mark_paid_and_emit_outbox(): void"
    ], 1070, 150, 280, 240, "#B91C1C", "#991B1B")}

    <!-- 5. PaymentTransaction -->
    {uml_class("PaymentTransaction", "payments_transaction", [
        "- id: UUID",
        "- booking_id: UUID (FK)",
        "- gateway: GatewayEnum",
        "- amount: Decimal",
        "- transaction_code: String",
        "- status: TxStatusEnum",
        "- raw_ipn_payload: JSONB"
    ], [
        "+ verify_signature(secret): bool",
        "+ reconcile_with_booking(): void"
    ], 1410, 150, 240, 230, "#C2410C", "#9A3412")}

    <!-- 6. Accommodation -->
    {uml_class("Accommodation", "Hospitality Referral", [
        "- id: UUID",
        "- slug: String (Unique)",
        "- destination_id: UUID (FK)",
        "- name: String",
        "- category: String",
        "- location: {lat, lng}",
        "- referral_url: URLString"
    ], [
        "+ distance_to(coords): Float",
        "+ generate_referral_payload(): dict"
    ], 60, 520, 240, 210, "#1D4ED8", "#1E40AF")}

    <!-- 7. Restaurant -->
    {uml_class("Restaurant", "Dining Referral", [
        "- id: UUID",
        "- slug: String (Unique)",
        "- destination_id: UUID (FK)",
        "- name: String",
        "- cuisine_type: String",
        "- location: {lat, lng}",
        "- booking_url: URLString"
    ], [
        "+ distance_to(coords): Float",
        "+ generate_referral_payload(): dict"
    ], 380, 520, 250, 210, "#4338CA", "#3730A3")}

    <!-- 8. PartnerApplication -->
    {uml_class("PartnerApplication", "partners_partnerapplication", [
        "- id: UUID",
        "- user_id: UUID (FK)",
        "- business_name: String",
        "- tax_id: String (MST)",
        "- license_number: String",
        "- status: PartnerStatusEnum"
    ], [
        "+ approve_and_create_org(adm): Org",
        "+ reject(reason): void"
    ], 710, 520, 270, 210, "#475569", "#334155")}

    <!-- 9. KnowledgeChunk -->
    {uml_class("KnowledgeChunk", "assistant_knowledge_chunk", [
        "- id: UUID",
        "- title: String",
        "- category: String",
        "- content: Text",
        "- embedding: Vector(1536)",
        "- metadata: JSONB"
    ], [
        "+ hybrid_search(vec, text): List",
        "+ extract_citations(): List"
    ], 1070, 520, 280, 210, "#854D0E", "#713F12")}

    <!-- 10. AuditEvent -->
    {uml_class("AuditEvent", "audit_auditevent", [
        "- id: UUID",
        "- actor_id: UUID",
        "- action: String",
        "- entity_type: String",
        "- entity_id: UUID",
        "- change_diff: JSONB",
        "- timestamp: DateTime"
    ], [
        "+ log_privileged_transition(): void"
    ], 1410, 520, 240, 200, "#374151", "#1F2937")}

    <!-- Relationships -->
    <path d="M 630 250 L 710 250" stroke="#0F172A" stroke-width="1.5" marker-start="url(#arrow-comp)" fill="none"/>
    <text x="670" y="242" font-size="10" font-weight="700" fill="#0F172A">1..*</text>

    <path d="M 980 250 L 1070 250" stroke="#475569" stroke-width="1.5" fill="none"/>
    <text x="1000" y="242" font-size="10" font-weight="700" fill="#475569">1</text>
    <text x="1045" y="242" font-size="10" font-weight="700" fill="#475569">0..*</text>

    <path d="M 1350 250 L 1410 250" stroke="#0F172A" stroke-width="1.5" marker-start="url(#arrow-comp)" fill="none"/>
    <text x="1380" y="242" font-size="10" font-weight="700" fill="#0F172A">1</text>

    <path d="M 180 360 L 180 430 L 1180 430 L 1180 390" stroke="#475569" stroke-width="1.5" fill="none"/>
    <text x="190" y="380" font-size="10" font-weight="700" fill="#475569">1</text>
    <text x="1190" y="415" font-size="10" font-weight="700" fill="#475569">0..*</text>

    <path d="M 505 360 L 505 470 L 180 470 L 180 520" stroke="#0F172A" stroke-width="1.5" marker-start="url(#arrow-comp)" fill="none"/>
    <text x="190" y="505" font-size="10" font-weight="700" fill="#0F172A">1..*</text>

    <path d="M 505 360 L 505 520" stroke="#0F172A" stroke-width="1.5" marker-start="url(#arrow-comp)" fill="none"/>
    <text x="515" y="505" font-size="10" font-weight="700" fill="#0F172A">1..*</text>

    <path d="M 300 300 L 340 300 L 340 600 L 710 600" stroke="#475569" stroke-width="1.5" fill="none"/>
    <text x="310" y="292" font-size="10" font-weight="700" fill="#475569">1</text>
    <text x="680" y="592" font-size="10" font-weight="700" fill="#475569">0..1</text>
    """
    return get_svg_wrapper("2. Domain Class Diagram", height=1100, content=content)


def build_svg_03_seq_booking():
    title = "STAR Travels — Sơ Đồ Tuần Tự: Đặt Tour & Thanh Toán Trực Tuyến"
    sub = "Chuẩn: OMG UML 2.5.1 Sequence Diagram | Cơ chế: Server-side Price Protection"
    scope = "Luồng gọi đồng bộ, thanh kích hoạt (Activation), xác thực chữ ký HMAC SHA512"
    t_card = svg_title_card(title, sub, scope, x=40, y=30, w=600, h=80)
    l_card = svg_legend_card([
        ("#0F172A", "Cuộc gọi đồng bộ (Sync Call - Solid Arrow)"),
        ("#64748B", "Kết quả trả về (Return - Dashed Arrow)"),
        ("#CBD5E1", "Thanh kích hoạt thực thi (Activation Bar)")
    ], x=1310, y=30, w=300, h=85)

    lifelines = [
        ("Traveler\n(Trình duyệt)", 130),
        ("Next.js Web\n(TourBookingCard)", 370),
        ("BFF Auth Proxy\n(/api/auth/*)", 610),
        ("Django Bookings\n(/api/v1/bookings/)", 870),
        ("PostgreSQL 17\n(Tour & Ledger)", 1130),
        ("Payment Gateway\n(VNPay / VietQR)", 1400)
    ]

    ll_svg = []
    for label, x in lifelines:
        lines = label.split("\n")
        ll_svg.append(f"""
        <rect x="{x-70}" y="140" width="140" height="42" rx="6" fill="#1E293B" stroke="#0F172A" stroke-width="1.5" filter="url(#card-shadow)"/>
        <text x="{x}" y="157" text-anchor="middle" font-size="11.5" font-weight="700" fill="#FFFFFF">{lines[0]}</text>
        <text x="{x}" y="172" text-anchor="middle" font-size="10" fill="#E2E8F0">{lines[1]}</text>
        <line x1="{x}" y1="182" x2="{x}" y2="920" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="6,4"/>
        """)

    def msg_sync(text, x1, x2, y):
        return f"""
        <line x1="{x1}" y1="{y}" x2="{x2}" y2="{y}" stroke="#0F172A" stroke-width="1.5" marker-end="url(#arrow-sync)"/>
        <rect x="{(x1+x2)/2 - 140}" y="{y-16}" width="280" height="14" fill="#FFFFFF" rx="3"/>
        <text x="{(x1+x2)/2}" y="{y-5}" text-anchor="middle" font-size="10.5" font-weight="600" fill="#0F172A">{text}</text>
        """

    def msg_ret(text, x1, x2, y):
        return f"""
        <line x1="{x1}" y1="{y}" x2="{x2}" y2="{y}" stroke="#64748B" stroke-width="1.3" stroke-dasharray="6,4" marker-end="url(#arrow-open)"/>
        <rect x="{(x1+x2)/2 - 120}" y="{y-16}" width="240" height="14" fill="#FFFFFF" rx="3"/>
        <text x="{(x1+x2)/2}" y="{y-5}" text-anchor="middle" font-size="10.5" fill="#475569">{text}</text>
        """

    content = f"""
    {t_card}
    {l_card}
    {"".join(ll_svg)}

    <!-- Activations -->
    <rect x="364" y="210" width="12" height="110" fill="#CBD5E1" stroke="#475569" stroke-width="1"/>
    <rect x="864" y="260" width="12" height="180" fill="#CBD5E1" stroke="#475569" stroke-width="1"/>
    <rect x="1124" y="300" width="12" height="120" fill="#CBD5E1" stroke="#475569" stroke-width="1"/>
    <rect x="1394" y="580" width="12" height="180" fill="#CBD5E1" stroke="#475569" stroke-width="1"/>
    <rect x="864" y="700" width="12" height="150" fill="#CBD5E1" stroke="#475569" stroke-width="1"/>

    <!-- Messages -->
    {msg_sync("1. Chọn ngày, số lượng khách -> Bấm 'Đặt ngay'", 130, 364, 220)}
    {msg_sync("2. Gửi request POST kèm HttpOnly Cookie", 376, 610, 250)}
    {msg_sync("3. Forward request + Bearer JWT Header", 610, 864, 280)}
    {msg_sync("4. Query Tour.price thật từ DB (Bỏ qua client)", 876, 1124, 310)}
    {msg_ret("5. Trả về Tour record chính xác", 1124, 876, 350)}
    {msg_sync("6. Calculate total = price * pax & Tạo Booking pending", 876, 1124, 390)}
    {msg_ret("7. Return Booking ID + Total Price chính xác", 864, 376, 430)}
    {msg_sync("8. Điều hướng sang /booking/[id]/payment", 364, 130, 480)}
    {msg_sync("9. Chọn VNPay/VietQR -> Tạo payment URL/EMVCo QR", 130, 1394, 540)}
    {msg_sync("10. Du khách quét QR hoặc nhập thẻ thanh toán", 130, 1394, 600)}
    {msg_sync("11. Webhook Server-to-Server IPN (Xác thực HMAC)", 1394, 876, 710)}
    {msg_sync("12. Cập nhật Booking -> 'confirmed' & Lưu Ledger", 876, 1124, 760)}
    {msg_sync("13. Polling / Webhook báo thành công -> /booking/[id]/success", 864, 376, 820)}
    {msg_ret("14. Hiển thị trang hoàn tất chuyến đi", 364, 130, 860)}
    """
    return get_svg_wrapper("3. Sequence Tour Booking", height=1000, content=content)


def build_svg_04_seq_referral():
    title = "STAR Travels — Sơ Đồ Tuần Tự: Tiếp Thị Liên Kết Đối Tác (Affiliate Referral)"
    sub = "Chuẩn: OMG UML 2.5.1 Sequence Diagram | Cơ chế: Non-blocking beacon tracking"
    scope = "Modal cảnh báo 1.5s, navigator.sendBeacon, Outbox event và đồng bộ Odoo CRM Lead"
    t_card = svg_title_card(title, sub, scope, x=40, y=30, w=600, h=80)
    l_card = svg_legend_card([
        ("#0F172A", "Tác vụ người dùng / Gọi hệ thống"),
        ("#DA251D", "Beacon ngầm không chặn luồng trình duyệt"),
        ("#D97706", "Đồng bộ CRM Lead sang Odoo 18")
    ], x=1310, y=30, w=300, h=85)

    lifelines = [
        ("Traveler\n(Khách tham quan)", 130),
        ("Hospitality Catalog\n(/accommodations | /restaurants)", 400),
        ("Advisory Modal\n(ReferralAdvisoryModal)", 680),
        ("Django Referral API\n(POST /referrals/track/)", 960),
        ("Transactional Outbox\n& Celery Worker", 1230),
        ("Partner Booking Site\n(Booking.com / Agoda)", 1480)
    ]

    ll_svg = []
    for label, x in lifelines:
        lines = label.split("\n")
        ll_svg.append(f"""
        <rect x="{x-75}" y="140" width="150" height="42" rx="6" fill="#1E293B" stroke="#0F172A" stroke-width="1.5" filter="url(#card-shadow)"/>
        <text x="{x}" y="157" text-anchor="middle" font-size="11.5" font-weight="700" fill="#FFFFFF">{lines[0]}</text>
        <text x="{x}" y="172" text-anchor="middle" font-size="10" fill="#E2E8F0">{lines[1]}</text>
        <line x1="{x}" y1="182" x2="{x}" y2="880" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="6,4"/>
        """)

    def msg_sync(text, x1, x2, y, col="#0F172A"):
        return f"""
        <line x1="{x1}" y1="{y}" x2="{x2}" y2="{y}" stroke="{col}" stroke-width="1.5" marker-end="url(#arrow-sync)"/>
        <rect x="{(x1+x2)/2 - 150}" y="{y-16}" width="300" height="14" fill="#FFFFFF" rx="3"/>
        <text x="{(x1+x2)/2}" y="{y-5}" text-anchor="middle" font-size="10.5" font-weight="600" fill="{col}">{text}</text>
        """

    content = f"""
    {t_card}
    {l_card}
    {"".join(ll_svg)}

    <!-- Activations -->
    <rect x="674" y="270" width="12" height="180" fill="#CBD5E1" stroke="#475569" stroke-width="1"/>
    <rect x="954" y="380" width="12" height="130" fill="#CBD5E1" stroke="#475569" stroke-width="1"/>
    <rect x="1224" y="470" width="12" height="140" fill="#CBD5E1" stroke="#475569" stroke-width="1"/>

    <!-- Messages -->
    {msg_sync("1. Click 'Đặt phòng qua Booking.com' / 'Đặt bàn'", 130, 400, 230)}
    {msg_sync("2. Mở Modal thông báo chuyển tiếp đối tác chính hãng (1.5s)", 400, 674, 280)}
    {msg_sync("3. Khách bấm 'Tiếp tục chuyển trang' hoặc đếm ngược", 130, 674, 340)}
    {msg_sync("4. navigator.sendBeacon(POST /referrals/track/)", 686, 954, 400, "#DA251D")}
    {msg_sync("5. Lưu Booking record ('accommodation_referral')", 966, 1224, 460)}
    {msg_sync("6. Đẩy sự kiện CRM Lead sang Odoo 18 [REFERRAL_LEAD]", 1236, 1236, 530, "#D97706")}
    {msg_sync("7. Chuyển hướng trình duyệt sang URL đối tác sau 1.5s", 674, 1480, 610)}
    <text x="1480" y="670" text-anchor="middle" font-size="11" font-weight="700" fill="#15803D">✓ Hoàn tất điều hướng an toàn</text>
    """
    return get_svg_wrapper("4. Sequence Referral Tracking", height=950, content=content)


def build_svg_05_seq_gps():
    title = "STAR Travels — Sơ Đồ Tuần Tự: Định Vị Vị Trí & Gợi Ý Gần Nhất (GPS Haversine)"
    sub = "Chuẩn: OMG UML 2.5.1 Sequence Diagram | Pháp lý: Nghị định 13/2023/NĐ-CP (PDPD)"
    scope = "Yêu cầu quyền tường minh (Explicit Consent), tính khoảng cách Client-side, không lưu vết ngầm"
    t_card = svg_title_card(title, sub, scope, x=40, y=30, w=620, h=80)
    l_card = svg_legend_card([
        ("#0F172A", "Tương tác người dùng & Xử lý Web"),
        ("#0284C7", "Trình duyệt kiểm tra quyền riêng tư"),
        ("#DA251D", "Huy hiệu Gợi ý STAR Hàng đầu")
    ], x=1310, y=30, w=300, h=85)

    lifelines = [
        ("Traveler\n(Người dùng)", 140),
        ("Catalog Wizard UI\n(accommodations-catalog)", 440),
        ("Browser Geolocation\n(navigator.geolocation)", 750),
        ("Geo Utilities\n(@/lib/geo-utils.ts)", 1070),
        ("Catalog Cards\n(AccommodationCard)", 1390)
    ]

    ll_svg = []
    for label, x in lifelines:
        lines = label.split("\n")
        ll_svg.append(f"""
        <rect x="{x-75}" y="140" width="150" height="42" rx="6" fill="#1E293B" stroke="#0F172A" stroke-width="1.5" filter="url(#card-shadow)"/>
        <text x="{x}" y="157" text-anchor="middle" font-size="11.5" font-weight="700" fill="#FFFFFF">{lines[0]}</text>
        <text x="{x}" y="172" text-anchor="middle" font-size="10" fill="#E2E8F0">{lines[1]}</text>
        <line x1="{x}" y1="182" x2="{x}" y2="880" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="6,4"/>
        """)

    def msg_sync(text, x1, x2, y, col="#0F172A"):
        return f"""
        <line x1="{x1}" y1="{y}" x2="{x2}" y2="{y}" stroke="{col}" stroke-width="1.5" marker-end="url(#arrow-sync)"/>
        <rect x="{(x1+x2)/2 - 150}" y="{y-16}" width="300" height="14" fill="#FFFFFF" rx="3"/>
        <text x="{(x1+x2)/2}" y="{y-5}" text-anchor="middle" font-size="10.5" font-weight="600" fill="{col}">{text}</text>
        """

    def msg_ret(text, x1, x2, y):
        return f"""
        <line x1="{x1}" y1="{y}" x2="{x2}" y2="{y}" stroke="#64748B" stroke-width="1.3" stroke-dasharray="6,4" marker-end="url(#arrow-open)"/>
        <rect x="{(x1+x2)/2 - 130}" y="{y-16}" width="260" height="14" fill="#FFFFFF" rx="3"/>
        <text x="{(x1+x2)/2}" y="{y-5}" text-anchor="middle" font-size="10.5" fill="#475569">{text}</text>
        """

    content = f"""
    {t_card}
    {l_card}
    {"".join(ll_svg)}

    <!-- Activations -->
    <rect x="434" y="210" width="12" height="100" fill="#CBD5E1" stroke="#475569" stroke-width="1"/>
    <rect x="744" y="270" width="12" height="150" fill="#CBD5E1" stroke="#475569" stroke-width="1"/>
    <rect x="1064" y="470" width="12" height="120" fill="#CBD5E1" stroke="#475569" stroke-width="1"/>
    <rect x="1384" y="630" width="12" height="90" fill="#CBD5E1" stroke="#475569" stroke-width="1"/>

    <!-- Messages -->
    {msg_sync("1. Bấm nút 'Tìm gần vị trí của tôi'", 140, 434, 220)}
    {msg_sync("2. Gọi getCurrentPosition() (Tuân thủ NĐ 13/2023)", 446, 744, 270, "#0284C7")}
    {msg_sync("3. Trình duyệt hiển thị popup xin quyền vị trí", 744, 140, 320)}
    {msg_sync("4. Người dùng bấm Cho phép (Allow)", 140, 744, 370)}
    {msg_ret("5. Trả về tọa độ thực {latitude, longitude}", 744, 1064, 440)}
    {msg_sync("6. findNearestDestination() nhận diện thành phố gần nhất", 1076, 1076, 490)}
    {msg_sync("7. calculateDistanceKm() tính công thức Haversine từng item", 1064, 446, 550)}
    {msg_sync("8. formatDistance() định dạng mét/km & Sắp xếp gần nhất", 446, 1384, 620)}
    {msg_sync("9. Gắn huy hiệu '✦ GỢI Ý STAR HÀNG ĐẦU (~850 m)' lên card đầu tiên", 1384, 140, 700, "#DA251D")}
    """
    return get_svg_wrapper("5. Sequence GPS Geolocation", height=950, content=content)


def build_svg_06_component():
    title = "STAR Travels — Sơ Đồ Thành Phần & Gói Kiến Trúc (Component Architecture)"
    sub = "Chuẩn: OMG UML 2.5.1 Component Diagram | Mô hình: Modular Monolith"
    scope = "Presentation (Next.js 15), Contracts Layer, 13 Bounded Contexts (Django 5.2)"
    t_card = svg_title_card(title, sub, scope, x=40, y=30, w=600, h=80)
    l_card = svg_legend_card([
        ("#3B82F6", "Frontend Module (Next.js 15 App Router)"),
        ("#64748B", "Hợp đồng dùng chung (@travel/contracts)"),
        ("#0F766E", "Backend Bounded Contexts (Django/DRF)")
    ], x=1310, y=30, w=300, h=85)

    def comp(name, subtitle, x, y, w, h, fill="#EFF6FF", stroke="#3B82F6"):
        return f"""
        <g filter="url(#card-shadow)">
          <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="{fill}" stroke="{stroke}" stroke-width="1.5"/>
          <rect x="{x-8}" y="{y+10}" width="16" height="10" rx="2" fill="{fill}" stroke="{stroke}" stroke-width="1.5"/>
          <rect x="{x-8}" y="{y+26}" width="16" height="10" rx="2" fill="{fill}" stroke="{stroke}" stroke-width="1.5"/>
          <text x="{x+24}" y="{y+24}" font-size="12" font-weight="700" fill="#0F172A">{name}</text>
          <text x="{x+24}" y="{y+40}" font-size="10.5" fill="#475569">{subtitle}</text>
        </g>
        """

    def pkg(name, x, y, w, h):
        return f"""
        <g>
          <path d="M {x} {y+28} L {x} {y+h} L {x+w} {y+h} L {x+w} {y+28} Z" fill="#F8FAFC" stroke="#475569" stroke-width="1.5"/>
          <path d="M {x} {y+28} L {x} {y} L {x+140} {y} L {x+160} {y+28} Z" fill="#E2E8F0" stroke="#475569" stroke-width="1.5"/>
          <text x="{x+16}" y="{y+19}" font-size="12" font-weight="700" fill="#1E293B">{name}</text>
        </g>
        """

    content = f"""
    {t_card}
    {l_card}

    <!-- 1. Frontend Package -->
    {pkg("Presentation Layer (apps/public-site)", 60, 140, 440, 850)}
    {comp("Next.js 15 App Router", "25 Routes: SSR, RSC & Metadata", 90, 200, 380, 65)}
    {comp("Dark Capsule Search & Wizard", "Hero Search, Filters & Concierge", 90, 290, 380, 65)}
    {comp("Geolocation & Distance Engine", "navigator.geolocation & Haversine", 90, 380, 380, 65)}
    {comp("Referral Advisory & Beacon", "navigator.sendBeacon 1.5s countdown", 90, 470, 380, 65)}
    {comp("AI Assistant Drawer Widget", "Streaming Chat & Heritage Cards", 90, 560, 380, 65)}
    {comp("Bilingual i18n Context", "LanguageProvider Cookie Sync (VI/EN)", 90, 650, 380, 65)}
    {comp("BFF Auth Cookie Proxy", "HttpOnly JWT /api/auth/* proxy", 90, 740, 380, 65)}

    <!-- 2. Contracts Package -->
    {pkg("Shared Contracts (packages/contracts)", 560, 140, 420, 380)}
    {comp("TypeScript Data Models", "@travel/contracts domain interfaces", 590, 210, 360, 65, "#F8FAFC", "#64748B")}
    {comp("OpenAPI 3.1 Specification", "drf-spectacular schema sync", 590, 305, 360, 65, "#F8FAFC", "#64748B")}
    {comp("Shared Status Enums", "BookingStatus, RoleEnum, Gateway", 590, 400, 360, 65, "#F8FAFC", "#64748B")}

    <!-- 3. Backend Modular Monolith -->
    {pkg("Backend Core (apps/api)", 1040, 140, 530, 850)}
    {comp("Django 5.2 REST API Root", "Versioned /api/v1/ entry points", 1070, 200, 470, 60, "#F0FDF4", "#0F766E")}
    {comp("Accounts Bounded Context", "JWT Auth, RBAC, Custom User Model", 1070, 280, 470, 60, "#F0FDF4", "#0F766E")}
    {comp("Catalogs & PostGIS Context", "Destinations, Places, Tours, Experiences", 1070, 360, 470, 60, "#F0FDF4", "#0F766E")}
    {comp("Hospitality & Referral Context", "Accommodations, Restaurants & Beacons", 1070, 440, 470, 60, "#F0FDF4", "#0F766E")}
    {comp("Bookings & Payments Engine", "Server Price Recalculation, VNPay, VietQR", 1070, 520, 470, 60, "#F0FDF4", "#0F766E")}
    {comp("AI Concierge & RAG Context", "pgvector 1536-dim embeddings, Guardrails", 1070, 600, 470, 60, "#F0FDF4", "#0F766E")}
    {comp("Partner State Machine Context", "Atomic Approval, Organization creation", 1070, 680, 470, 60, "#F0FDF4", "#0F766E")}
    {comp("Transactional Outbox & Celery", "Dead Letter Queue, Odoo CRM Lead Sync", 1070, 760, 470, 60, "#F0FDF4", "#0F766E")}
    {comp("Audit & Security Context", "DRF Throttling, Immutable Audit Ledger", 1070, 840, 470, 60, "#F0FDF4", "#0F766E")}

    <!-- Architectural Connections -->
    <path d="M 470 770 L 1070 230" stroke="#0F172A" stroke-width="2" marker-end="url(#arrow-sync)" fill="none"/>
    <text x="680" y="520" font-size="11" font-weight="700" fill="#0F172A">HTTP REST / JSON-RPC</text>

    <path d="M 470 230 L 590 240" stroke="#3B82F6" stroke-width="1.8" marker-end="url(#arrow-sync)" fill="none"/>
    <path d="M 1070 230 L 950 335" stroke="#0F766E" stroke-width="1.8" marker-end="url(#arrow-sync)" fill="none"/>
    """
    return get_svg_wrapper("6. Component Architecture", height=1050, content=content)


def build_svg_07_state_machine():
    title = "STAR Travels — Sơ Đồ Máy Trạng Thái (State Machine Diagram)"
    sub = "Chuẩn: OMG UML 2.5.1 State Machine | Quy chuẩn: Trigger [Guard] / Action"
    scope = "1. Vòng đời Trạng thái Booking | 2. Vòng đời Xét duyệt Đối tác Lữ hành B2B"
    t_card = svg_title_card(title, sub, scope, x=40, y=30, w=600, h=80)
    l_card = svg_legend_card([
        ("#0F172A", "Điểm bắt đầu (Initial) / Kết thúc (Final)"),
        ("#DA251D", "Trạng thái hợp lệ (Active State Box)"),
        ("#475569", "Chuyển tiếp: Trigger [Guard] / Action")
    ], x=1310, y=30, w=300, h=85)

    def state_box(title, subtitle, x, y, w=220, h=65):
        return f"""
        <g filter="url(#card-shadow)">
          <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="14" fill="#FEF2F2" stroke="#DA251D" stroke-width="1.8"/>
          <text x="{x+w/2}" y="{y+26}" text-anchor="middle" font-size="12" font-weight="700" fill="#7F1D1D">{title}</text>
          <text x="{x+w/2}" y="{y+44}" text-anchor="middle" font-size="10.5" fill="#991B1B">{subtitle}</text>
        </g>
        """

    def trans(text, x1, y1, x2, y2):
        return f"""
        <line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="#0F172A" stroke-width="1.5" marker-end="url(#arrow-sync)"/>
        <rect x="{(x1+x2)/2 - 110}" y="{(y1+y2)/2 - 14}" width="220" height="14" fill="#FFFFFF" rx="2"/>
        <text x="{(x1+x2)/2}" y="{(y1+y2)/2 - 3}" text-anchor="middle" font-size="10" font-weight="600" fill="#334155">{text}</text>
        """

    content = f"""
    {t_card}
    {l_card}

    <!-- 1. Booking State Machine Box -->
    <rect x="60" y="140" width="710" height="830" rx="10" fill="#F8FAFC" stroke="#475569" stroke-width="1.5"/>
    <rect x="60" y="140" width="710" height="34" rx="10" fill="#E2E8F0"/>
    <text x="415" y="162" text-anchor="middle" font-size="12.5" font-weight="700" fill="#1E293B">1. Booking Lifecycle State Machine (bookings_booking)</text>

    <!-- Initial state -->
    <circle cx="415" cy="210" r="14" fill="#1E293B"/>

    {state_box("Pending Payment", "(Chờ thanh toán VNPay/VietQR)", 305, 270)}
    {state_box("Confirmed / Paid", "(Đã xác nhận & Thanh toán)", 140, 450)}
    {state_box("Failed / Cancelled", "(Thất bại / Hủy giữ chỗ)", 470, 450)}
    {state_box("Completed", "(Tour hoàn thành)", 140, 630)}

    <!-- Final state -->
    <circle cx="415" cy="800" r="14" fill="none" stroke="#0F172A" stroke-width="2"/>
    <circle cx="415" cy="800" r="8" fill="#0F172A"/>

    {trans("Create Booking [valid tour]", 415, 224, 415, 270)}
    {trans("IPN Success [valid HMAC] / emit_outbox()", 340, 335, 250, 450)}
    {trans("Timeout [>15m] / Gateway Failed", 490, 335, 580, 450)}
    {trans("Trip Finished / create_review_token()", 250, 515, 250, 630)}
    {trans("Close Ledger / archive()", 250, 695, 401, 800)}
    {trans("Release Slot Lock", 580, 515, 429, 800)}

    <!-- 2. Partner Application State Machine Box -->
    <rect x="850" y="140" width="730" height="830" rx="10" fill="#F8FAFC" stroke="#475569" stroke-width="1.5"/>
    <rect x="850" y="140" width="730" height="34" rx="10" fill="#E2E8F0"/>
    <text x="1215" y="162" text-anchor="middle" font-size="12.5" font-weight="700" fill="#1E293B">2. Partner Application State Machine (partners_partnerapplication)</text>

    <circle cx="1215" cy="210" r="14" fill="#1E293B"/>
    {state_box("Submitted", "(Đã nộp hồ sơ trực tuyến)", 1105, 270)}
    {state_box("Under Review", "(Đang thẩm định giấy phép)", 1105, 430)}
    {state_box("Approved", "(Tạo Organization & Nâng quyền)", 940, 610)}
    {state_box("Rejected", "(Từ chối có lý do cụ thể)", 1270, 610)}

    <circle cx="1215" cy="800" r="14" fill="none" stroke="#0F172A" stroke-width="2"/>
    <circle cx="1215" cy="800" r="8" fill="#0F172A"/>

    {trans("POST /partner/ [valid MST]", 1215, 224, 1215, 270)}
    {trans("Admin opens review", 1215, 335, 1215, 430)}
    {trans("Approve [atomic] / create_org()", 1140, 495, 1050, 610)}
    {trans("Reject [reason provided] / notify()", 1290, 495, 1380, 610)}
    {trans("Audit Logged", 1050, 675, 1201, 800)}
    {trans("Notify Partner Email", 1380, 675, 1229, 800)}
    """
    return get_svg_wrapper("7. State Machine Diagram", height=1020, content=content)


def build_svg_08_deployment():
    title = "STAR Travels — Sơ Đồ Triển Khai Hạ Tầng (Deployment Diagram)"
    sub = "Chuẩn: OMG UML 2.5.1 Deployment | Phân loại: Devices, Execution Environments & Artifacts"
    scope = "Edge CDN (Cloudflare), Node.js Runtime (Vercel), Production VM (Docker Pod)"
    t_card = svg_title_card(title, sub, scope, x=40, y=30, w=610, h=80)
    l_card = svg_legend_card([
        ("#475569", "Hộp Nút 3D: Thiết bị & Môi trường thực thi"),
        ("#2563EB", "Mô-đun Artifact Container nội bộ"),
        ("#0F172A", "Giao thức kết nối mạng bảo mật (TLS/TCP)")
    ], x=1310, y=30, w=300, h=85)

    def node_3d(title, stereotype, x, y, w, h):
        return f"""
        <g filter="url(#card-shadow)">
          <!-- Top face -->
          <polygon points="{x},{y+16} {x+16},{y} {x+w+16},{y} {x+w},{y+16}" fill="#CBD5E1" stroke="#475569" stroke-width="1.5"/>
          <!-- Right face -->
          <polygon points="{x+w},{y+16} {x+w+16},{y} {x+w+16},{y+h-16} {x+w},{y+h}" fill="#94A3B8" stroke="#475569" stroke-width="1.5"/>
          <!-- Front face -->
          <rect x="{x}" y="{y+16}" width="{w}" height="{h-16}" fill="#F8FAFC" stroke="#475569" stroke-width="1.5"/>
          <text x="{x+w/2}" y="{y+38}" text-anchor="middle" font-size="12" font-weight="700" fill="#1E293B">{title}</text>
          <text x="{x+w/2}" y="{y+52}" text-anchor="middle" font-size="10" font-style="italic" fill="#475569">«{stereotype}»</text>
        </g>
        """

    def artifact(title, desc_lines, x, y, w, h):
        d_svg = []
        for i, d in enumerate(desc_lines):
            d_svg.append(f'<text x="{x+24}" y="{y+38 + i*16}" font-size="10.5" fill="#1E3A8A">{d}</text>')
        return f"""
        <g filter="url(#card-shadow)">
          <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="#EFF6FF" stroke="#2563EB" stroke-width="1.5"/>
          <rect x="{x-8}" y="{y+10}" width="16" height="10" rx="2" fill="#EFF6FF" stroke="#2563EB" stroke-width="1.5"/>
          <rect x="{x-8}" y="{y+26}" width="16" height="10" rx="2" fill="#EFF6FF" stroke="#2563EB" stroke-width="1.5"/>
          <text x="{x+24}" y="{y+22}" font-size="11.5" font-weight="700" fill="#0F172A">{title}</text>
          {"".join(d_svg)}
        </g>
        """

    content = f"""
    {t_card}
    {l_card}

    <!-- 1. Client Node -->
    {node_3d("Client Device Node", "device (Desktop/Mobile)", 60, 140, 330, 320)}
    {artifact("Modern Web Browser", [
        "- Chrome, Safari, Edge, Firefox",
        "- Geolocation API (NĐ 13/2023)",
        "- SendBeacon Non-blocking tracking",
        "- LocalStorage & Cookie Store"
    ], 90, 230, 270, 190)}

    <!-- 2. Edge / Web Server Node -->
    {node_3d("Vercel / Next.js Server", "execution environment", 460, 140, 360, 380)}
    {artifact("Node.js 20 LTS Runtime", [
        "- Next.js 15.5 App Router",
        "- SSR & React Server Components",
        "- BFF Cookie Proxy (/api/auth)"
    ], 490, 230, 300, 120)}
    {artifact("Cloudflare Anycast CDN", [
        "- Edge SSL TLS 1.3 Termination",
        "- Static Assets Cache & WAF Guard"
    ], 490, 380, 300, 95)}

    <!-- 3. Production VM Node -->
    {node_3d("Production VM / Cloud Host Node", "device (Linux Ubuntu 24.04 LTS)", 890, 130, 710, 850)}

    {artifact("Docker: backend (api)", [
        "- Python 3.12 + Django 5.2 Gunicorn",
        "- DRF REST API (Port 8000)",
        "- Spatial Query Engine & Outbox Publisher"
    ], 930, 220, 420, 115)}

    {artifact("Docker: worker (celery)", [
        "- Celery 5 Async Task Engine",
        "- Outbox Dispatcher to Odoo ERP",
        "- Dead Letter Queue (DLQ) Alerting"
    ], 930, 360, 420, 110)}

    {artifact("Docker: redis (cache & broker)", [
        "- Redis 7 Alpine (Port 6379)",
        "- Shared Session & Performance Cache",
        "- Celery Message Queue Broker"
    ], 930, 495, 420, 105)}

    {artifact("Docker: db (primary store)", [
        "- PostgreSQL 17 + PostGIS 3.5 (Port 5432)",
        "- Geography SRID 4326 Spatial Index",
        "- pgvector Embeddings (1536 dim)"
    ], 930, 625, 420, 135)}

    {artifact("Automated Backup Scripts", [
        "- scripts/backup_db.ps1 / .sh",
        "- Daily Compressed Dump (30 days retention)"
    ], 930, 785, 420, 95)}

    <!-- Connectors -->
    <path d="M 360 320 L 490 280" stroke="#0F172A" stroke-width="2" marker-end="url(#arrow-sync)" fill="none"/>
    <text x="420" y="295" font-size="10.5" font-weight="700" fill="#0F172A">HTTPS 443</text>

    <path d="M 790 280 L 930 280" stroke="#0F172A" stroke-width="2" marker-end="url(#arrow-sync)" fill="none"/>
    <text x="850" y="272" font-size="10.5" font-weight="700" fill="#0F172A">HTTP 8000</text>

    <path d="M 1350 280 L 1400 280 L 1400 690 L 1350 690" stroke="#0F172A" stroke-width="1.8" marker-end="url(#arrow-sync)" fill="none"/>
    <text x="1410" y="480" font-size="10" font-weight="700" fill="#0F172A">TCP 5432</text>

    <path d="M 1350 540 L 1380 540 L 1380 415 L 1350 415" stroke="#0F172A" stroke-width="1.8" marker-end="url(#arrow-sync)" fill="none"/>
    <text x="1390" y="480" font-size="10" font-weight="700" fill="#0F172A">TCP 6379</text>
    """
    return get_svg_wrapper("8. Deployment Diagram", height=1050, content=content)


SVG_FACTORIES = [
    ("01-use-case-diagram.svg", build_svg_01_use_case),
    ("02-domain-class-diagram.svg", build_svg_02_class),
    ("03-seq-tour-booking.svg", build_svg_03_seq_booking),
    ("04-seq-referral-tracking.svg", build_svg_04_seq_referral),
    ("05-seq-gps-geolocation.svg", build_svg_05_seq_gps),
    ("06-component-architecture.svg", build_svg_06_component),
    ("07-state-machine-diagram.svg", build_svg_07_state_machine),
    ("08-deployment-diagram.svg", build_svg_08_deployment),
]


def main():
    print("Generating 8 high-resolution vector SVGs for STAR Travels UML suite...")
    
    docs_dir = Path("docs/diagrams")
    docs_dir.mkdir(parents=True, exist_ok=True)

    public_dir = Path("apps/public-site/public/diagrams")
    public_dir.mkdir(parents=True, exist_ok=True)

    for filename, factory in SVG_FACTORIES:
        svg_content = factory()
        
        # Save in docs/diagrams/
        (docs_dir / filename).write_text(svg_content, encoding="utf-8")
        # Save in apps/public-site/public/diagrams/
        (public_dir / filename).write_text(svg_content, encoding="utf-8")

        print(f"  [OK] Exported: {filename}")

    print("\nAll 8 SVG diagrams successfully generated in both docs/ and public/!")


if __name__ == "__main__":
    main()
