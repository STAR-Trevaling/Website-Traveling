#!/usr/bin/env python3
"""
STAR Travels - Automated Draw.io UML Diagram Generator & Interactive Suite (Master Edition)
Generates:
1. Multi-page .drawio XML suite at docs/star-travels-uml.drawio & docs/diagrams/
2. 8 Individual single-page .drawio diagrams in docs/diagrams/
3. Interactive drag-and-drop HTML editor at docs/diagrams/interactive-editor.html
4. 1-click launcher script docs/diagrams/mo-so-do-keo-tha.bat
5. .vscode settings to bind .drawio to graphical Draw.io extension
"""

import xml.etree.ElementTree as ET
from xml.dom import minidom
from pathlib import Path


class DrawioBuilder:
    def __init__(self):
        self.root = ET.Element("mxfile", {
            "host": "app.diagrams.net",
            "modified": "2026-10-09T00:00:00.000Z",
            "agent": "STAR-Travels-Drawio-Master-Suite",
            "version": "24.0.0",
            "type": "device"
        })

    def add_page(self, name, page_id, width=1650, height=1050):
        diagram = ET.SubElement(self.root, "diagram", {"name": name, "id": page_id})
        model = ET.SubElement(diagram, "mxGraphModel", {
            "dx": "1422",
            "dy": "794",
            "grid": "1",
            "gridSize": "10",
            "guides": "1",
            "tooltips": "1",
            "connect": "1",
            "arrows": "1",
            "fold": "1",
            "page": "1",
            "pageScale": "1",
            "pageWidth": str(width),
            "pageHeight": str(height),
            "background": "#FFFFFF"
        })
        cell_root = ET.SubElement(model, "root")
        ET.SubElement(cell_root, "mxCell", {"id": "0"})
        ET.SubElement(cell_root, "mxCell", {"id": "1", "parent": "0"})
        return cell_root

    @staticmethod
    def add_node(parent, cell_id, value, style, x, y, w, h):
        cell = ET.SubElement(parent, "mxCell", {
            "id": cell_id,
            "value": value,
            "style": style,
            "vertex": "1",
            "parent": "1"
        })
        ET.SubElement(cell, "mxGeometry", {
            "x": str(x),
            "y": str(y),
            "width": str(w),
            "height": str(h),
            "as": "geometry"
        })
        return cell

    @staticmethod
    def add_edge(parent, edge_id, value, style, source_id, target_id):
        cell = ET.SubElement(parent, "mxCell", {
            "id": edge_id,
            "value": value,
            "style": style,
            "edge": "1",
            "parent": "1",
            "source": source_id,
            "target": target_id
        })
        ET.SubElement(cell, "mxGeometry", {"relative": "1", "as": "geometry"})
        return cell

    def add_title_block(self, parent, page_prefix, title, subtitle, scope_notes, x=40, y=30, w=580, h=80):
        title_val = (
            f"&lt;b style=&quot;font-size:14px; color:#0F172A;&quot;&gt;{title}&lt;/b&gt;&lt;br&gt;"
            f"&lt;font color=&quot;#475569&quot; style=&quot;font-size:11px;&quot;&gt;{subtitle}&lt;br&gt;"
            f"&lt;i&gt;Phạm vi:&lt;/i&gt; {scope_notes}&lt;/font&gt;"
        )
        title_style = (
            "rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#F8FAFC;"
            "strokeColor=#94A3B8;strokeWidth=1.2;align=left;spacingLeft=14;shadow=1;"
        )
        return self.add_node(parent, f"{page_prefix}-title-block", title_val, title_style, x, y, w, h)

    def add_legend_card(self, parent, page_prefix, items, x=1320, y=30, w=290, h=85):
        legend_content = "&lt;b style=&quot;font-size:11px; color:#0F172A;&quot;&gt;CHÚ GIẢI (LEGEND)&lt;/b&gt;&lt;br&gt;"
        for color, label in items:
            legend_content += f"■ &lt;font color=&quot;{color}&quot;&gt;●&lt;/font&gt; {label}&lt;br&gt;"
        legend_style = (
            "rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFFFFF;"
            "strokeColor=#CBD5E1;strokeWidth=1;align=left;spacingLeft=10;fontSize=10;shadow=1;"
        )
        return self.add_node(parent, f"{page_prefix}-legend-block", legend_content, legend_style, x, y, w, h)

    def to_xml_string(self):
        rough_string = ET.tostring(self.root, "utf-8")
        reparsed = minidom.parseString(rough_string)
        return reparsed.toprettyxml(indent="  ")


# Reusable Styles
actor_style = (
    "shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;"
    "fillColor=#1E293B;strokeColor=#0F172A;fontColor=#0F172A;fontStyle=1;fontSize=12;"
)
assoc_style = (
    "endArrow=none;html=1;edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;"
    "jumpStyle=arc;jumpSize=6;strokeColor=#475569;strokeWidth=1.5;"
)
inc_style = (
    "endArrow=open;dashed=1;html=1;edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;"
    "jumpStyle=arc;jumpSize=6;strokeColor=#DA251D;strokeWidth=1.5;labelBackgroundColor=#FFFFFF;"
)
call_sync_style = (
    "html=1;verticalAlign=bottom;endArrow=block;endFill=1;edgeStyle=orthogonalEdgeStyle;"
    "rounded=1;arcSize=10;jumpStyle=arc;jumpSize=6;strokeColor=#0F172A;strokeWidth=1.5;"
    "labelBackgroundColor=#FFFFFF;fontSize=11;"
)
return_style = (
    "html=1;verticalAlign=bottom;endArrow=open;endFill=0;dashed=1;endSize=8;"
    "edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;jumpStyle=arc;jumpSize=6;"
    "strokeColor=#64748B;strokeWidth=1.2;labelBackgroundColor=#FFFFFF;fontSize=11;"
)
comp_arrow_style = (
    "startArrow=diamond;startFill=1;endArrow=none;html=1;edgeStyle=orthogonalEdgeStyle;"
    "rounded=1;arcSize=10;jumpStyle=arc;jumpSize=6;strokeColor=#0F172A;strokeWidth=1.5;"
    "labelBackgroundColor=#FFFFFF;fontSize=11;"
)
ll_style = (
    "shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;"
    "container=1;dropTarget=0;collapsible=0;recursiveResize=0;outlineConnect=0;"
    "size=42;fillColor=#1E293B;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=12;"
)
act_style = "rounded=0;whiteSpace=wrap;html=1;fillColor=#CBD5E1;strokeColor=#475569;"


def populate_page_1(builder):
    p1 = builder.add_page("1. Use Case Diagram", "page-1-use-case", width=1650, height=1050)
    builder.add_title_block(
        p1, "p1",
        "STAR Travels — Sơ Đồ Use Case Tổng Thể (UML 2.5)",
        "Chuẩn: OMG UML 2.5.1 | Ranh giới: STAR Monolith & Cổng Ngoại vi",
        "Đặt Tour, Thanh toán, Tiếp thị liên kết Đối tác, AI Concierge, B2B Onboarding",
        x=40, y=30, w=540, h=80
    )
    builder.add_legend_card(
        p1, "p1",
        [
            ("#DA251D", "Use Case Trọng Tâm (STAR Red)"),
            ("#0284C7", "Use Case Cơ Bản (Catalogs & Auth)"),
            ("#D97706", "Use Case Tích Hợp Ngoại Vi (Payment/ERP)"),
        ],
        x=1320, y=30, w=270, h=80
    )
    builder.add_node(
        p1, "p1-box", "STAR Travels Platform System Boundary",
        "swimlane;startSize=32;html=1;whiteSpace=wrap;collapsible=0;recursiveResize=0;expand=0;fillColor=#F8FAFC;strokeColor=#475569;strokeWidth=1.5;fontStyle=1;fontSize=13;fontColor=#1E293B;",
        280, 130, 960, 880
    )
    builder.add_node(p1, "act-traveler", "Traveler\n(Du khách)", actor_style, 80, 290, 60, 110)
    builder.add_node(p1, "act-partner", "Merchant Partner\n(Đối tác dịch vụ)", actor_style, 80, 710, 60, 110)
    builder.add_node(p1, "act-admin", "System Administrator\n(Quản trị viên)", actor_style, 1380, 270, 60, 110)
    builder.add_node(p1, "act-payment", "Payment Gateway\n(VNPay / VietQR)", actor_style, 1380, 510, 60, 110)
    builder.add_node(p1, "act-erp", "Odoo 18 ERP\n(CRM & Backoffice)", actor_style, 1380, 750, 60, 110)

    uc_style = "ellipse;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;fontStyle=1;fontSize=11;fontColor=#0369A1;shadow=1;"
    uc_star_style = "ellipse;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#DA251D;strokeWidth=2;fontStyle=1;fontSize=11;fontColor=#7F1D1D;shadow=1;"
    uc_sec_style = "ellipse;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=1.5;fontStyle=1;fontSize=11;fontColor=#78350F;shadow=1;"

    builder.add_node(p1, "uc-1", "UC-1: Khám phá Điểm đến,\nTour trọn gói & Cẩm nang", uc_style, 340, 180, 230, 65)
    builder.add_node(p1, "uc-2", "UC-2: Định vị GPS & Tìm quán,\nKhách sạn gần nhất (Haversine)", uc_star_style, 340, 280, 240, 70)
    builder.add_node(p1, "uc-3", "UC-3: Đặt Tour Trọn Gói\n& Phòng vệ giá Server-side", uc_star_style, 340, 390, 230, 70)
    builder.add_node(p1, "uc-3a", "UC-3.1: Thanh toán Trực tuyến\n(VNPay Thẻ/QR & VietQR NAPAS)", uc_sec_style, 680, 390, 240, 70)
    builder.add_node(p1, "uc-4", "UC-4: Chuyển tiếp Đặt chỗ\nĐối tác (Affiliate Referral 1.5s)", uc_star_style, 340, 500, 240, 70)
    builder.add_node(p1, "uc-4a", "UC-4.1: Đồng bộ Lead Chuyển đổi\nsang Odoo 18 CRM Lead", uc_sec_style, 680, 500, 240, 70)
    builder.add_node(p1, "uc-5", "UC-5: Trò chuyện & Nhận tư vấn\nvới Trợ lý STAR AI Concierge", uc_star_style, 340, 610, 240, 70)
    builder.add_node(p1, "uc-6", "UC-6: Nộp Hồ sơ Hợp tác B2B\n(Trở thành Đối tác Lữ hành)", uc_style, 340, 720, 230, 65)
    builder.add_node(p1, "uc-7", "UC-7: Xét duyệt Đối tác B2B\n& Phân quyền Tổ chức Atomic", uc_style, 680, 720, 240, 65)
    builder.add_node(p1, "uc-8", "UC-8: Đăng nhập & Xác thực bảo mật\n(BFF HttpOnly Cookies)", uc_style, 340, 820, 230, 65)
    builder.add_node(p1, "uc-9", "UC-9: Quản trị Nội dung,\nKiểm toán Audit & Giám sát DLQ", uc_style, 680, 820, 240, 65)

    builder.add_edge(p1, "e1", "", assoc_style, "act-traveler", "uc-1")
    builder.add_edge(p1, "e2", "", assoc_style, "act-traveler", "uc-2")
    builder.add_edge(p1, "e3", "", assoc_style, "act-traveler", "uc-3")
    builder.add_edge(p1, "e4", "«include»", inc_style, "uc-3", "uc-3a")
    builder.add_edge(p1, "e5", "", assoc_style, "uc-3a", "act-payment")
    builder.add_edge(p1, "e6", "", assoc_style, "act-traveler", "uc-4")
    builder.add_edge(p1, "e7", "«include»", inc_style, "uc-4", "uc-4a")
    builder.add_edge(p1, "e8", "", assoc_style, "uc-4a", "act-erp")
    builder.add_edge(p1, "e9", "", assoc_style, "act-traveler", "uc-5")
    builder.add_edge(p1, "e10", "", assoc_style, "act-partner", "uc-6")
    builder.add_edge(p1, "e11", "", assoc_style, "act-admin", "uc-7")
    builder.add_edge(p1, "e12", "", assoc_style, "act-admin", "uc-9")
    builder.add_edge(p1, "e13", "", assoc_style, "act-traveler", "uc-8")
    builder.add_edge(p1, "e14", "", assoc_style, "act-partner", "uc-8")


def populate_page_2(builder):
    p2 = builder.add_page("2. Domain Class Diagram", "page-2-class", width=1750, height=1150)
    builder.add_title_block(
        p2, "p2",
        "STAR Travels — Sơ Đồ Lớp Miền Nghiệp Vụ (Domain Class Diagram)",
        "Chuẩn: OMG UML 2.5.1 | Bounded Contexts: 13 Mô-đun Clean Architecture",
        "10 Thực thể chính, Multiplicities chuẩn, Ký hiệu Composition/Association/Aggregation",
        x=40, y=30, w=580, h=80
    )
    builder.add_legend_card(
        p2, "p2",
        [
            ("#DA251D", "Core Domain (Tour, Booking)"),
            ("#0F766E", "Spatial & Catalog (Destinations)"),
            ("#1D4ED8", "Hospitality Referral (Hotel, Dining)"),
            ("#C2410C", "Financial Transactions (VNPay, VietQR)")
        ],
        x=1420, y=30, w=280, h=95
    )
    class_head = (
        "swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;"
        "horizontal=1;startSize=30;horizontalStack=0;resizeParent=1;resizeParentMax=0;"
        "resizeLast=0;collapsible=1;marginBottom=0;html=1;shadow=1;"
    )
    row_style = (
        "text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
        "spacingLeft=8;spacingRight=6;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];"
        "portConstraint=eastwest;whiteSpace=wrap;html=1;fontSize=11;fontColor=#0F172A;"
    )
    builder.add_node(p2, "cls-user", "User\n«accounts_user»", class_head + "fillColor=#1E293B;strokeColor=#0F172A;fontColor=#FFFFFF;", 60, 140, 240, 190)
    builder.add_node(p2, "cls-user-body", "- id: UUID\n- email: String (Unique)\n- phone: String (Indexed)\n- role: RoleEnum\n- is_active: Boolean\n- date_joined: DateTime\n--\n+ check_password(raw): bool\n+ is_partner_owner(): bool", row_style, 60, 170, 240, 160)

    builder.add_node(p2, "cls-dest", "Destination\n«destinations_destination»", class_head + "fillColor=#0F766E;strokeColor=#115E59;fontColor=#FFFFFF;", 380, 140, 250, 180)
    builder.add_node(p2, "cls-dest-body", "- id: UUID\n- slug: String (Unique)\n- name: String / name_en: String\n- region: RegionEnum\n- location: PointField (SRID 4326)\n- is_published: Boolean\n--\n+ get_published_tours(): QuerySet\n+ calculate_nearby_places(rad): List", row_style, 380, 170, 250, 150)

    builder.add_node(p2, "cls-tour", "Tour\n«tours_tour»", class_head + "fillColor=#DA251D;strokeColor=#B91C1C;fontColor=#FFFFFF;", 710, 140, 270, 200)
    builder.add_node(p2, "cls-tour-body", "- id: UUID\n- destination_id: UUID (FK)\n- slug: String (Unique)\n- title: String / title_en: String\n- price: Decimal (Authority)\n- duration_days: Integer\n- itinerary: JSONB\n- is_active: Boolean\n--\n+ calculate_total(pax): Decimal\n+ verify_slot_availability(date): bool", row_style, 710, 170, 270, 170)

    builder.add_node(p2, "cls-booking", "Booking\n«bookings_booking»", class_head + "fillColor=#B91C1C;strokeColor=#991B1B;fontColor=#FFFFFF;", 1070, 140, 290, 230)
    builder.add_node(p2, "cls-booking-body", "- id: UUID\n- code: String (STAR-YYYYMM-XXXX)\n- user_id: UUID (FK Nullable)\n- item_type: BookingItemTypeEnum\n- item_id: UUID\n- status: BookingStatusEnum\n- total_price: Decimal (Server-calc)\n- metadata: JSONB\n- created_at: DateTime\n--\n+ transition_to(status): void\n+ mark_paid_and_emit_outbox(): void", row_style, 1070, 170, 290, 200)

    builder.add_node(p2, "cls-payment", "PaymentTransaction\n«payments_transaction»", class_head + "fillColor=#C2410C;strokeColor=#9A3412;fontColor=#FFFFFF;", 1440, 140, 260, 200)
    builder.add_node(p2, "cls-payment-body", "- id: UUID\n- booking_id: UUID (FK)\n- gateway: GatewayEnum\n- amount: Decimal\n- transaction_code: String\n- status: TxStatusEnum\n- raw_ipn_payload: JSONB\n--\n+ verify_signature(secret): bool\n+ reconcile_with_booking(): void", row_style, 1440, 170, 260, 170)

    builder.add_node(p2, "cls-acc", "Accommodation\n«Hospitality Referral»", class_head + "fillColor=#1D4ED8;strokeColor=#1E40AF;fontColor=#FFFFFF;", 60, 480, 240, 180)
    builder.add_node(p2, "cls-acc-body", "- id: UUID\n- slug: String (Unique)\n- destination_id: UUID (FK)\n- name: String\n- category: String\n- location: {lat: Float, lng: Float}\n- partner_name: String\n- referral_url: URLString\n--\n+ distance_to(coords): Float\n+ generate_referral_payload(): dict", row_style, 60, 510, 240, 150)

    builder.add_node(p2, "cls-res", "Restaurant\n«Dining Referral»", class_head + "fillColor=#4338CA;strokeColor=#3730A3;fontColor=#FFFFFF;", 380, 480, 250, 180)
    builder.add_node(p2, "cls-res-body", "- id: UUID\n- slug: String (Unique)\n- destination_id: UUID (FK)\n- name: String\n- cuisine_type: String\n- location: {lat: Float, lng: Float}\n- partner_name: String\n- booking_url: URLString\n--\n+ distance_to(coords): Float\n+ generate_referral_payload(): dict", row_style, 380, 510, 250, 150)

    builder.add_node(p2, "cls-partner", "PartnerApplication\n«partners_partnerapplication»", class_head + "fillColor=#475569;strokeColor=#334155;fontColor=#FFFFFF;", 710, 480, 270, 200)
    builder.add_node(p2, "cls-partner-body", "- id: UUID\n- user_id: UUID (FK)\n- business_name: String\n- tax_id: String (MST)\n- license_number: String\n- status: PartnerStatusEnum\n- reviewed_by_id: UUID (FK)\n--\n+ approve_and_create_org(adm): Org\n+ reject(reason): void", row_style, 710, 510, 270, 170)

    builder.add_node(p2, "cls-rag", "KnowledgeChunk\n«assistant_knowledge_chunk»", class_head + "fillColor=#854D0E;strokeColor=#713F12;fontColor=#FFFFFF;", 1070, 480, 270, 180)
    builder.add_node(p2, "cls-rag-body", "- id: UUID\n- title: String\n- category: String\n- content: Text\n- embedding: Vector(1536)\n- metadata: JSONB\n--\n+ hybrid_search(vec, text): List\n+ extract_citations(): List", row_style, 1070, 510, 270, 150)

    builder.add_node(p2, "cls-audit", "AuditEvent\n«audit_auditevent»", class_head + "fillColor=#374151;strokeColor=#1F2937;fontColor=#FFFFFF;", 1440, 480, 250, 170)
    builder.add_node(p2, "cls-audit-body", "- id: UUID\n- actor_id: UUID\n- action: String\n- entity_type: String\n- entity_id: UUID\n- change_diff: JSONB\n- timestamp: DateTime\n--\n+ log_privileged_transition(): void", row_style, 1440, 510, 250, 140)

    builder.add_edge(p2, "rel1", "1  ---<*>  1..*", comp_arrow_style, "cls-dest", "cls-tour")
    builder.add_edge(p2, "rel2", "1  ---  0..*", assoc_style, "cls-tour", "cls-booking")
    builder.add_edge(p2, "rel3", "1  ---<*>  1", comp_arrow_style, "cls-booking", "cls-payment")
    builder.add_edge(p2, "rel4", "1  ---  0..*", assoc_style, "cls-user", "cls-booking")
    builder.add_edge(p2, "rel5", "1  ---<*>  1..*", comp_arrow_style, "cls-dest", "cls-acc")
    builder.add_edge(p2, "rel6", "1  ---<*>  1..*", comp_arrow_style, "cls-dest", "cls-res")
    builder.add_edge(p2, "rel7", "1  ---  0..1", assoc_style, "cls-user", "cls-partner")


def populate_page_3(builder):
    p3 = builder.add_page("3. Seq - Tour Booking", "page-3-seq-booking", width=1650, height=1050)
    builder.add_title_block(
        p3, "p3",
        "STAR Travels — Sơ Đồ Tuần Tự: Đặt Tour & Thanh Toán Trực Tuyến",
        "Chuẩn: OMG UML 2.5.1 Sequence Diagram | Cơ chế: Server-side Price recalculation",
        "Luồng gọi đồng bộ, thanh kích hoạt (Activation), xác thực chữ ký HMAC SHA512",
        x=40, y=30, w=580, h=80
    )
    builder.add_legend_card(
        p3, "p3",
        [
            ("#0F172A", "Cuộc gọi đồng bộ (Sync Call - Solid Arrow)"),
            ("#64748B", "Kết quả trả về (Return - Dashed Arrow)"),
            ("#CBD5E1", "Thanh kích hoạt thực thi (Activation Bar)")
        ],
        x=1320, y=30, w=290, h=80
    )
    builder.add_node(p3, "ll-trav", "Traveler\n(Trình duyệt)", ll_style, 70, 130, 140, 880)
    builder.add_node(p3, "ll-web", "Next.js Web\n(TourBookingCard)", ll_style, 290, 130, 150, 880)
    builder.add_node(p3, "ll-bff", "BFF Auth Proxy\n(/api/auth/*)", ll_style, 520, 130, 140, 880)
    builder.add_node(p3, "ll-api", "Django Bookings\n(/api/v1/bookings/)", ll_style, 750, 130, 150, 880)
    builder.add_node(p3, "ll-db", "PostgreSQL 17\n(Tour & Ledger)", ll_style, 990, 130, 140, 880)
    builder.add_node(p3, "ll-gw", "Payment Gateway\n(VNPay / VietQR)", ll_style, 1220, 130, 150, 880)

    builder.add_node(p3, "act-w1", "", act_style, 360, 200, 12, 100)
    builder.add_node(p3, "act-a1", "", act_style, 820, 240, 12, 160)
    builder.add_node(p3, "act-d1", "", act_style, 1055, 270, 12, 110)
    builder.add_node(p3, "act-gw", "", act_style, 1290, 520, 12, 180)
    builder.add_node(p3, "act-a2", "", act_style, 820, 640, 12, 140)

    builder.add_edge(p3, "m1", "1. Chọn ngày, số lượng khách -> Bấm 'Đặt ngay'", call_sync_style, "ll-trav", "ll-web")
    builder.add_edge(p3, "m2", "2. Gửi request kèm Cookie HttpOnly", call_sync_style, "ll-web", "ll-bff")
    builder.add_edge(p3, "m3", "3. Forward request + Bearer JWT Header", call_sync_style, "ll-bff", "ll-api")
    builder.add_edge(p3, "m4", "4. Query Tour.price thật từ DB (Bỏ qua giá client)", call_sync_style, "ll-api", "ll-db")
    builder.add_edge(p3, "m5", "5. Trả về Tour record chính xác", return_style, "ll-db", "ll-api")
    builder.add_edge(p3, "m6", "6. Calculate total = price * pax & Tạo Booking pending", call_sync_style, "ll-api", "ll-db")
    builder.add_edge(p3, "m7", "7. Return Booking ID + Total Price chính xác", return_style, "ll-api", "ll-web")
    builder.add_edge(p3, "m8", "8. Điều hướng sang trang thanh toán /booking/[id]/payment", call_sync_style, "ll-web", "ll-trav")
    builder.add_edge(p3, "m9", "9. Chọn VNPay / VietQR -> Tạo payment URL / EMVCo QR", call_sync_style, "ll-trav", "ll-gw")
    builder.add_edge(p3, "m10", "10. Du khách quét QR hoặc nhập thẻ thanh toán", call_sync_style, "ll-trav", "ll-gw")
    builder.add_edge(p3, "m11", "11. Webhook Server-to-Server IPN (Xác thực chữ ký HMAC)", call_sync_style, "ll-gw", "ll-api")
    builder.add_edge(p3, "m12", "12. Cập nhật Booking -> 'confirmed' & Tạo Transaction", call_sync_style, "ll-api", "ll-db")
    builder.add_edge(p3, "m13", "13. Polling / Webhook nhận kết quả thành công -> /booking/[id]/success", call_sync_style, "ll-api", "ll-web")


def populate_page_4(builder):
    p4 = builder.add_page("4. Seq - Referral Tracking", "page-4-seq-referral", width=1650, height=1000)
    builder.add_title_block(
        p4, "p4",
        "STAR Travels — Sơ Đồ Tuần Tự: Tiếp Thị Liên Kết Đối Tác (Affiliate Referral)",
        "Chuẩn: OMG UML 2.5.1 Sequence Diagram | Cơ chế: Non-blocking beacon tracking",
        "Modal cảnh báo 1.5s, navigator.sendBeacon, Outbox event và đồng bộ Odoo CRM Lead",
        x=40, y=30, w=600, h=80
    )
    builder.add_legend_card(
        p4, "p4",
        [
            ("#0F172A", "Tác vụ người dùng / Gọi hệ thống"),
            ("#DA251D", "Beacon ngầm không chặn luồng trình duyệt"),
            ("#D97706", "Đồng bộ CRM Lead sang Odoo 18")
        ],
        x=1320, y=30, w=290, h=80
    )
    builder.add_node(p4, "r-trav", "Traveler\n(Khách tham quan)", ll_style, 90, 130, 140, 830)
    builder.add_node(p4, "r-catalog", "Hospitality Catalog\n(/accommodations | /restaurants)", ll_style, 330, 130, 180, 830)
    builder.add_node(p4, "r-modal", "Advisory Modal\n(ReferralAdvisoryModal)", ll_style, 590, 130, 170, 830)
    builder.add_node(p4, "r-api", "Django Referral API\n(POST /referrals/track/)", ll_style, 840, 130, 170, 830)
    builder.add_node(p4, "r-outbox", "Transactional Outbox\n& Celery Worker", ll_style, 1090, 130, 170, 830)
    builder.add_node(p4, "r-partner", "Partner Booking Site\n(Booking.com / Agoda)", ll_style, 1340, 130, 160, 830)

    builder.add_node(p4, "r-act1", "", act_style, 670, 280, 12, 120)
    builder.add_node(p4, "r-act2", "", act_style, 920, 370, 12, 100)
    builder.add_node(p4, "r-act3", "", act_style, 1170, 480, 12, 120)

    builder.add_edge(p4, "rm1", "1. Click 'Đặt ngay qua Booking.com' / 'Đặt bàn'", call_sync_style, "r-trav", "r-catalog")
    builder.add_edge(p4, "rm2", "2. Mở Modal thông báo chuyển tiếp đối tác chính hãng", call_sync_style, "r-catalog", "r-modal")
    builder.add_edge(p4, "rm3", "3. Khách bấm 'Tiếp tục chuyển trang'", call_sync_style, "r-trav", "r-modal")
    builder.add_edge(p4, "rm4", "4. navigator.sendBeacon() gửi tracking ngầm không nghẽn", call_sync_style, "r-modal", "r-api")
    builder.add_edge(p4, "rm5", "5. Lưu Booking record ('accommodation_referral')", call_sync_style, "r-api", "r-outbox")
    builder.add_edge(p4, "rm6", "6. Đẩy sự kiện CRM Lead sang Odoo 18 [REFERRAL_LEAD]", call_sync_style, "r-outbox", "r-outbox")
    builder.add_edge(p4, "rm7", "7. Chuyển hướng trình duyệt sang URL đối tác sau 1.5s", call_sync_style, "r-modal", "r-partner")


def populate_page_5(builder):
    p5 = builder.add_page("5. Seq - GPS Geolocation", "page-5-seq-gps", width=1650, height=1000)
    builder.add_title_block(
        p5, "p5",
        "STAR Travels — Sơ Đồ Tuần Tự: Định Vị Vị Trí & Gợi Ý Gần Nhất (GPS Haversine)",
        "Chuẩn: OMG UML 2.5.1 Sequence Diagram | Pháp lý: Nghị định 13/2023/NĐ-CP (PDPD)",
        "Yêu cầu quyền tường minh (Explicit Consent), tính toán khoảng cách Client-side, không lưu vết ngầm",
        x=40, y=30, w=620, h=80
    )
    builder.add_legend_card(
        p5, "p5",
        [
            ("#0F172A", "Tương tác người dùng & Xử lý Web"),
            ("#0284C7", "Trình duyệt kiểm tra quyền riêng tư"),
            ("#DA251D", "Huy hiệu Gợi ý STAR Hàng đầu")
        ],
        x=1320, y=30, w=290, h=80
    )
    builder.add_node(p5, "g-user", "Traveler\n(Người dùng)", ll_style, 100, 130, 140, 830)
    builder.add_node(p5, "g-ui", "Catalog Wizard UI\n(accommodations-catalog)", ll_style, 370, 130, 180, 830)
    builder.add_node(p5, "g-browser", "Browser Geolocation\n(navigator.geolocation)", ll_style, 660, 130, 170, 830)
    builder.add_node(p5, "g-geo", "Geo Utilities\n(@/lib/geo-utils.ts)", ll_style, 940, 130, 160, 830)
    builder.add_node(p5, "g-cards", "Catalog Cards\n(AccommodationCard)", ll_style, 1210, 130, 170, 830)

    builder.add_node(p5, "g-act1", "", act_style, 455, 200, 12, 100)
    builder.add_node(p5, "g-act2", "", act_style, 740, 260, 12, 130)
    builder.add_node(p5, "g-act3", "", act_style, 1015, 450, 12, 110)
    builder.add_node(p5, "g-act4", "", act_style, 1290, 600, 12, 80)

    builder.add_edge(p5, "gm1", "1. Bấm nút 'Tìm gần vị trí của tôi'", call_sync_style, "g-user", "g-ui")
    builder.add_edge(p5, "gm2", "2. Gọi getCurrentPosition() (Tuân thủ NĐ 13/2023)", call_sync_style, "g-ui", "g-browser")
    builder.add_edge(p5, "gm3", "3. Trình duyệt hỏi popup cho phép quyền vị trí", call_sync_style, "g-browser", "g-user")
    builder.add_edge(p5, "gm4", "4. Người dùng bấm Cho phép (Allow)", call_sync_style, "g-user", "g-browser")
    builder.add_edge(p5, "gm5", "5. Trả về tọa độ {latitude, longitude}", return_style, "g-browser", "g-geo")
    builder.add_edge(p5, "gm6", "6. findNearestDestination() nhận diện thành phố gần nhất", call_sync_style, "g-geo", "g-geo")
    builder.add_edge(p5, "gm7", "7. calculateDistanceKm() tính công thức Haversine từng item", call_sync_style, "g-geo", "g-ui")
    builder.add_edge(p5, "gm8", "8. formatDistance() định dạng mét/km & Sắp xếp gần nhất", call_sync_style, "g-ui", "g-cards")
    builder.add_edge(p5, "gm9", "9. Gắn huy hiệu '✦ GỢI Ý STAR HÀNG ĐẦU (~850 m)' lên card đầu tiên", call_sync_style, "g-cards", "g-user")


def populate_page_6(builder):
    p6 = builder.add_page("6. Component Architecture", "page-6-component", width=1650, height=1100)
    builder.add_title_block(
        p6, "p6",
        "STAR Travels — Sơ Đồ Thành Phần & Gói Kiến Trúc (Component & Package)",
        "Chuẩn: OMG UML 2.5.1 Component Diagram | Mô hình: Modular Monolith",
        "Presentation (Next.js 15), Contracts Layer, 13 Bounded Contexts (Django 5.2)",
        x=40, y=30, w=590, h=80
    )
    builder.add_legend_card(
        p6, "p6",
        [
            ("#3B82F6", "Frontend Module (Next.js 15 App Router)"),
            ("#64748B", "Hợp đồng dùng chung (@travel/contracts)"),
            ("#0F766E", "Backend Bounded Contexts (Django/DRF)")
        ],
        x=1320, y=30, w=290, h=80
    )
    comp_style = (
        "shape=module;align=left;spacingLeft=24;verticalAlign=middle;whiteSpace=wrap;html=1;"
        "fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;fontStyle=1;fontSize=11;shadow=1;"
    )
    pkg_style = (
        "shape=folder;fontStyle=1;tabWidth=140;tabHeight=30;tabPosition=left;html=1;boundedLbl=1;"
        "fillColor=#F8FAFC;strokeColor=#475569;strokeWidth=1.5;fontSize=13;fontColor=#1E293B;"
    )
    builder.add_node(p6, "pkg-front", "Frontend Presentation Layer (apps/public-site)", pkg_style, 60, 130, 440, 890)
    builder.add_node(p6, "cmp-app", "Next.js 15 App Router\n(25 Routes: SSR & RSC)", comp_style, 90, 190, 360, 70)
    builder.add_node(p6, "cmp-search", "Dark Capsule Search & Wizard\n(Home Search & Concierge)", comp_style, 90, 290, 360, 70)
    builder.add_node(p6, "cmp-geo", "Geolocation & Distance Engine\n(navigator.geolocation & Haversine)", comp_style, 90, 390, 360, 70)
    builder.add_node(p6, "cmp-referral", "Referral Advisory & Beacon\n(navigator.sendBeacon 1.5s)", comp_style, 90, 490, 360, 70)
    builder.add_node(p6, "cmp-ai-client", "AI Assistant Drawer Widget\n(Streaming Chat & Cards)", comp_style, 90, 590, 360, 70)
    builder.add_node(p6, "cmp-i18n", "Bilingual i18n Context\n(LanguageProvider Cookie Sync)", comp_style, 90, 690, 360, 70)
    builder.add_node(p6, "cmp-bff", "BFF Auth Cookie Proxy\n(HttpOnly JWT /api/auth/*)", comp_style, 90, 790, 360, 70)

    builder.add_node(p6, "pkg-contracts", "Shared Contracts Layer (packages/contracts)", pkg_style, 560, 130, 420, 420)
    builder.add_node(p6, "cmp-ts-types", "TypeScript Data Models\n(@travel/contracts)", comp_style, 590, 200, 350, 70)
    builder.add_node(p6, "cmp-openapi", "OpenAPI 3.1 Specification\n(drf-spectacular sync)", comp_style, 590, 310, 350, 70)
    builder.add_node(p6, "cmp-enums", "Shared Status Enums\n(Booking, Partner, Roles)", comp_style, 590, 420, 350, 70)

    builder.add_node(p6, "pkg-back", "Backend Core Modular Monolith (apps/api)", pkg_style, 1040, 130, 520, 890)
    builder.add_node(p6, "cmp-drf-root", "Django 5.2 REST API Root\n(Versioned /api/v1/)", comp_style, 1070, 190, 450, 65)
    builder.add_node(p6, "cmp-accounts-ctx", "Accounts Bounded Context\n(JWT Auth, RBAC, Custom User)", comp_style, 1070, 275, 450, 65)
    builder.add_node(p6, "cmp-catalog-ctx", "Catalogs & PostGIS Context\n(Destinations, Places, Tours)", comp_style, 1070, 360, 450, 65)
    builder.add_node(p6, "cmp-hospitality-ctx", "Hospitality & Referral Context\n(Accommodations, Restaurants)", comp_style, 1070, 445, 450, 65)
    builder.add_node(p6, "cmp-booking-ctx", "Bookings & Payments Engine\n(Price Protection, VNPay, VietQR)", comp_style, 1070, 530, 450, 65)
    builder.add_node(p6, "cmp-ai-rag-ctx", "AI Concierge & RAG Context\n(pgvector Embeddings, Guardrails)", comp_style, 1070, 615, 450, 65)
    builder.add_node(p6, "cmp-partner-ctx", "Partner State Machine Context\n(Atomic Approval, Row Locks)", comp_style, 1070, 700, 450, 65)
    builder.add_node(p6, "cmp-outbox-ctx", "Transactional Outbox & Celery\n(Dead Letter Queue, Odoo Sync)", comp_style, 1070, 785, 450, 65)
    builder.add_node(p6, "cmp-audit-ctx", "Audit & Security Context\n(DRF Throttling, Immutable Log)", comp_style, 1070, 870, 450, 65)

    builder.add_edge(p6, "c1", "HTTP /api/v1/*", call_sync_style, "cmp-bff", "cmp-drf-root")
    builder.add_edge(p6, "c2", "Uses Contract Types", call_sync_style, "cmp-app", "cmp-ts-types")
    builder.add_edge(p6, "c3", "Generates OpenAPI Spec", call_sync_style, "cmp-drf-root", "cmp-openapi")


def populate_page_7(builder):
    p7 = builder.add_page("7. State Machine Diagram", "page-7-state-machine", width=1650, height=1000)
    builder.add_title_block(
        p7, "p7",
        "STAR Travels — Sơ Đồ Máy Trạng Thái (State Machine Diagram)",
        "Chuẩn: OMG UML 2.5.1 State Machine | Quy chuẩn: Trigger [Guard] / Action",
        "1. Vòng đời Trạng thái Booking | 2. Vòng đời Xét duyệt Đối tác Lữ hành B2B",
        x=40, y=30, w=590, h=80
    )
    builder.add_legend_card(
        p7, "p7",
        [
            ("#0F172A", "Điểm bắt đầu (Initial) / Kết thúc (Final)"),
            ("#DA251D", "Trạng thái hợp lệ (Active State Box)"),
            ("#475569", "Chuyển tiếp có điều kiện: Trigger [Guard] / Action")
        ],
        x=1300, y=30, w=310, h=80
    )
    state_style = (
        "rounded=1;arcSize=30;whiteSpace=wrap;html=1;fillColor=#FEF2F2;"
        "strokeColor=#DA251D;strokeWidth=1.5;fontStyle=1;fontSize=11;fontColor=#7F1D1D;shadow=1;"
    )
    init_style = "ellipse;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#0F172A;"
    final_style = "ellipse;html=1;shape=endState;fillColor=#1E293B;strokeColor=#0F172A;"

    builder.add_node(p7, "box-sm1", "1. Booking Lifecycle State Machine (bookings_booking)", "swimlane;startSize=30;html=1;fillColor=#F8FAFC;strokeColor=#475569;fontStyle=1;fontSize=12;", 60, 130, 700, 820)
    builder.add_node(p7, "b-init", "", init_style, 390, 190, 30, 30)
    builder.add_node(p7, "b-pending", "Pending Payment\n(Chờ thanh toán VNPay/VietQR)", state_style, 290, 270, 230, 70)
    builder.add_node(p7, "b-confirmed", "Confirmed / Paid\n(Đã xác nhận & Thanh toán)", state_style, 140, 450, 220, 70)
    builder.add_node(p7, "b-failed", "Failed / Cancelled\n(Thất bại / Hủy giữ chỗ)", state_style, 460, 450, 220, 70)
    builder.add_node(p7, "b-completed", "Completed\n(Tour hoàn thành)", state_style, 140, 630, 220, 70)
    builder.add_node(p7, "b-end", "", final_style, 390, 800, 30, 30)

    builder.add_edge(p7, "be1", "Create Booking [valid tour]", call_sync_style, "b-init", "b-pending")
    builder.add_edge(p7, "be2", "IPN Success [valid HMAC] / emit_outbox()", call_sync_style, "b-pending", "b-confirmed")
    builder.add_edge(p7, "be3", "Timeout [>15m] / Gateway Failed", call_sync_style, "b-pending", "b-failed")
    builder.add_edge(p7, "be4", "Trip Finished / create_review_token()", call_sync_style, "b-confirmed", "b-completed")
    builder.add_edge(p7, "be5", "Close Ledger / archive()", call_sync_style, "b-completed", "b-end")
    builder.add_edge(p7, "be6", "Release Slot Lock", call_sync_style, "b-failed", "b-end")

    builder.add_node(p7, "box-sm2", "2. Partner Application State Machine (partners_partnerapplication)", "swimlane;startSize=30;html=1;fillColor=#F8FAFC;strokeColor=#475569;fontStyle=1;fontSize=12;", 840, 130, 700, 820)
    builder.add_node(p7, "p-init", "", init_style, 1170, 190, 30, 30)
    builder.add_node(p7, "p-submitted", "Submitted\n(Đã nộp hồ sơ trực tuyến)", state_style, 1070, 270, 230, 70)
    builder.add_node(p7, "p-review", "Under Review\n(Đang thẩm định giấy phép)", state_style, 1070, 430, 230, 70)
    builder.add_node(p7, "p-approved", "Approved\n(Tạo Organization & Nâng quyền)", state_style, 910, 610, 230, 70)
    builder.add_node(p7, "p-rejected", "Rejected\n(Từ chối có lý do cụ thể)", state_style, 1230, 610, 220, 70)
    builder.add_node(p7, "p-end", "", final_style, 1170, 800, 30, 30)

    builder.add_edge(p7, "pe1", "POST /partner/ [valid MST]", call_sync_style, "p-init", "p-submitted")
    builder.add_edge(p7, "pe2", "Admin opens review", call_sync_style, "p-submitted", "p-review")
    builder.add_edge(p7, "pe3", "Approve [atomic transaction] / create_org()", call_sync_style, "p-review", "p-approved")
    builder.add_edge(p7, "pe4", "Reject [reason provided] / notify()", call_sync_style, "p-review", "p-rejected")
    builder.add_edge(p7, "pe5", "Audit Logged", call_sync_style, "p-approved", "p-end")
    builder.add_edge(p7, "pe6", "Notify Partner Email", call_sync_style, "p-rejected", "p-end")


def populate_page_8(builder):
    p8 = builder.add_page("8. Deployment Diagram", "page-8-deployment", width=1650, height=1050)
    builder.add_title_block(
        p8, "p8",
        "STAR Travels — Sơ Đồ Triển Khai Hạ Tầng (Deployment Diagram)",
        "Chuẩn: OMG UML 2.5.1 Deployment | Phân loại: Devices, Execution Environments & Artifacts",
        "Edge CDN (Cloudflare), Node.js Runtime (Vercel), Production VM (Docker Pod)",
        x=40, y=30, w=610, h=80
    )
    builder.add_legend_card(
        p8, "p8",
        [
            ("#475569", "Hộp Nút 3D: Thiết bị & Môi trường thực thi"),
            ("#2563EB", "Mô-đun Artifact Container nội bộ"),
            ("#0F172A", "Giao thức kết nối mạng có bảo mật (TLS/TCP)")
        ],
        x=1300, y=30, w=310, h=80
    )
    node_style = (
        "shape=cube;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;"
        "darkOpacity=0.08;darkOpacity2=0.15;fillColor=#F8FAFC;strokeColor=#475569;"
        "strokeWidth=1.5;fontStyle=1;fontSize=12;fontColor=#1E293B;"
    )
    art_style = (
        "shape=module;align=left;spacingLeft=24;verticalAlign=middle;whiteSpace=wrap;html=1;"
        "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.5;fontStyle=1;fontSize=11;shadow=1;"
    )
    builder.add_node(p8, "d-client", "Client Device Node\n«device» (Desktop / Mobile)", node_style, 60, 140, 330, 270)
    builder.add_node(p8, "d-browser", "Modern Web Browser\n(Chrome, Safari, Edge)\n- Geolocation API (NĐ 13/2023)\n- SendBeacon Non-blocking", art_style, 90, 210, 270, 150)

    builder.add_node(p8, "d-edge", "Vercel / Next.js Server Node\n«execution environment»", node_style, 460, 140, 350, 360)
    builder.add_node(p8, "d-next-app", "Node.js 20 LTS Runtime\n- Next.js 15.5 App Router\n- SSR / RSC Engine\n- BFF Cookie Handler", art_style, 490, 210, 290, 130)
    builder.add_node(p8, "d-static", "Public Assets CDN Cache\n(Cloudflare Anycast)", art_style, 490, 360, 290, 100)

    builder.add_node(p8, "d-backend-host", "Production VM / Cloud Host Node\n«device» (Linux Ubuntu 24.04 LTS)", node_style, 880, 130, 680, 850)
    builder.add_node(p8, "d-cnt-api", "Docker: backend (api)\nPython 3.12 + Django 5.2 Gunicorn\n- DRF REST API Root\n- Spatial Query Engine (PostGIS)\n- Outbox Publisher", art_style, 920, 200, 370, 120)
    builder.add_node(p8, "d-cnt-worker", "Docker: worker (celery)\nCelery 5 Async Task Engine\n- Outbox Dispatcher to Odoo\n- Health Monitoring & DLQ Alert", art_style, 920, 350, 370, 110)
    builder.add_node(p8, "d-cnt-redis", "Docker: redis (cache & broker)\nRedis 7 Alpine\n- Cache Store (Port 6379)\n- Celery Message Broker", art_style, 920, 490, 370, 100)
    builder.add_node(p8, "d-cnt-db", "Docker: db (primary store)\nPostgreSQL 17 + PostGIS 3.5\n- ACID Transactional Store\n- Geography SRID 4326 Index\n- pgvector Embeddings (Port 5432)", art_style, 920, 620, 370, 140)
    builder.add_node(p8, "d-backup", "Automated Backup Scripts\n(scripts/backup_db.ps1 / .sh)\n- Daily Compressed Dump\n- Retention 30 days", art_style, 920, 790, 370, 100)

    builder.add_edge(p8, "de1", "HTTPS TLS 1.3 / Port 443", call_sync_style, "d-browser", "d-next-app")
    builder.add_edge(p8, "de2", "Internal REST / HTTP (Port 8000)", call_sync_style, "d-next-app", "d-cnt-api")
    builder.add_edge(p8, "de3", "UNIX Socket / TCP 5432", call_sync_style, "d-cnt-api", "d-cnt-db")
    builder.add_edge(p8, "de4", "Redis Protocol / TCP 6379", call_sync_style, "d-cnt-api", "d-cnt-redis")
    builder.add_edge(p8, "de5", "Broker AMQP / TCP 6379", call_sync_style, "d-cnt-worker", "d-cnt-redis")
    builder.add_edge(p8, "de6", "DB Connection / TCP 5432", call_sync_style, "d-cnt-worker", "d-cnt-db")


PAGE_BUILDERS = [
    ("01-use-case-diagram.drawio", populate_page_1),
    ("02-domain-class-diagram.drawio", populate_page_2),
    ("03-seq-tour-booking.drawio", populate_page_3),
    ("04-seq-referral-tracking.drawio", populate_page_4),
    ("05-seq-gps-geolocation.drawio", populate_page_5),
    ("06-component-architecture.drawio", populate_page_6),
    ("07-state-machine-diagram.drawio", populate_page_7),
    ("08-deployment-diagram.drawio", populate_page_8),
]


def generate_interactive_html(xml_content: str) -> str:
    escaped_xml = xml_content.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    return f"""<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>STAR Travels — Bảng Vẽ UML Kéo Thả Trực Quan (Draw.io Native)</title>
    <style>
        * {{ box-sizing: border-box; margin: 0; padding: 0; }}
        body, html {{ width: 100%; height: 100%; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0F172A; }}
        #header {{
            height: 56px;
            background: #1E293B;
            border-bottom: 1px solid #334155;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            color: #F8FAFC;
        }}
        .brand {{
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
            font-weight: 700;
        }}
        .star-badge {{
            background: #DA251D;
            color: #FFFFFF;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.5px;
        }}
        .actions {{
            display: flex;
            align-items: center;
            gap: 10px;
        }}
        .btn {{
            background: #0284C7;
            color: #FFFFFF;
            border: none;
            padding: 7px 14px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            text-decoration: none;
        }}
        .btn:hover {{ background: #0369A1; }}
        .btn-secondary {{
            background: #334155;
            color: #E2E8F0;
        }}
        .btn-secondary:hover {{ background: #475569; }}
        #frame-container {{
            width: 100%;
            height: calc(100% - 56px);
            position: relative;
        }}
        iframe {{
            width: 100%;
            height: 100%;
            border: none;
            display: block;
        }}
        #loading-overlay {{
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: #0F172A;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #94A3B8;
            font-size: 14px;
            gap: 16px;
            z-index: 10;
            transition: opacity 0.3s;
        }}
        .spinner {{
            width: 36px;
            height: 36px;
            border: 3px solid #334155;
            border-top-color: #DA251D;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }}
        @keyframes spin {{ to {{ transform: rotate(360deg); }} }}
    </style>
</head>
<body>
    <div id="header">
        <div class="brand">
            <span class="star-badge">STAR Travels</span>
            <span>Bảng Vẽ Thiết Kế UML Kéo Thả Trực Quan (8 Tab Chuẩn OMG UML 2.5)</span>
        </div>
        <div class="actions">
            <button class="btn btn-secondary" onclick="exportXml()">📥 Tải File .drawio Về Máy</button>
            <a class="btn" href="https://app.diagrams.net/" target="_blank" rel="noreferrer">🌐 Mở Trên app.diagrams.net</a>
        </div>
    </div>
    <div id="frame-container">
        <div id="loading-overlay">
            <div class="spinner"></div>
            <div>Đang nạp 8 tab biểu đồ vào Draw.io kéo thả...</div>
        </div>
        <iframe id="drawio-iframe" src="https://embed.diagrams.net/?embed=1&ui=atlas&spin=1&proto=json&saveAndExit=0&noSaveBtn=0&noExitBtn=1"></iframe>
    </div>

    <textarea id="raw-xml-data" style="display:none;">{escaped_xml}</textarea>

    <script>
        const iframe = document.getElementById('drawio-iframe');
        const loading = document.getElementById('loading-overlay');
        const xmlTextarea = document.getElementById('raw-xml-data');
        const xmlContent = xmlTextarea.value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

        window.addEventListener('message', function(evt) {{
            if (!evt.data || typeof evt.data !== 'string') return;
            try {{
                const msg = JSON.parse(evt.data);
                if (msg.event === 'init') {{
                    iframe.contentWindow.postMessage(JSON.stringify({{
                        action: 'load',
                        autosave: 1,
                        xml: xmlContent
                    }}), '*');
                    setTimeout(() => {{
                        loading.style.opacity = '0';
                        setTimeout(() => loading.style.display = 'none', 300);
                    }}, 600);
                }} else if (msg.event === 'export') {{
                    downloadFile('star-travels-uml.drawio', msg.data);
                }}
            }} catch (e) {{}}
        }});

        function exportXml() {{
            iframe.contentWindow.postMessage(JSON.stringify({{
                action: 'export',
                format: 'xml'
            }}), '*');
        }}

        function downloadFile(filename, data) {{
            const blob = new Blob([data], {{ type: 'application/xml' }});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }}
    </script>
</body>
</html>
"""


def main():
    print("Generating comprehensive Draw.io UML suite & interactive tools...")
    
    # 1. Multi-page builder
    master_builder = DrawioBuilder()
    for _, populator in PAGE_BUILDERS:
        populator(master_builder)
    master_xml = master_builder.to_xml_string()

    # Write root file
    root_drawio = Path("docs/star-travels-uml.drawio")
    root_drawio.write_text(master_xml, encoding="utf-8")
    print(f"  [OK] Master multi-page suite: {root_drawio}")

    # 2. Diagrams directory with individual files
    diagrams_dir = Path("docs/diagrams")
    diagrams_dir.mkdir(parents=True, exist_ok=True)

    # Write suite into diagrams dir as well
    (diagrams_dir / "star-travels-complete-suite.drawio").write_text(master_xml, encoding="utf-8")

    # Generate each single file
    for filename, populator in PAGE_BUILDERS:
        single_builder = DrawioBuilder()
        populator(single_builder)
        single_path = diagrams_dir / filename
        single_path.write_text(single_builder.to_xml_string(), encoding="utf-8")
        print(f"  [OK] Single diagram: {single_path.name}")

    # 3. Interactive HTML editor
    html_content = generate_interactive_html(master_xml)
    html_path = diagrams_dir / "interactive-editor.html"
    html_path.write_text(html_content, encoding="utf-8")
    print(f"  [OK] Interactive HTML drag-and-drop editor: {html_path}")

    # 4. Windows 1-click launcher .bat
    bat_content = "@echo off\r\necho Dang mo Bang Ve UML Keo Tha STAR Travels...\r\nstart \"\" \"%~dp0interactive-editor.html\"\r\n"
    bat_path = diagrams_dir / "mo-so-do-keo-tha.bat"
    bat_path.write_text(bat_content, encoding="utf-8")
    print(f"  [OK] 1-Click launcher: {bat_path}")

    # 5. VS Code settings for .drawio integration
    vscode_dir = Path(".vscode")
    vscode_dir.mkdir(parents=True, exist_ok=True)
    
    extensions_json = (
        '{\n'
        '  "recommendations": [\n'
        '    "hediet.vscode-drawio"\n'
        '  ]\n'
        '}\n'
    )
    (vscode_dir / "extensions.json").write_text(extensions_json, encoding="utf-8")

    settings_json = (
        '{\n'
        '  "workbench.editorAssociations": {\n'
        '    "*.drawio": "hediet.vscode-drawio"\n'
        '  }\n'
        '}\n'
    )
    (vscode_dir / "settings.json").write_text(settings_json, encoding="utf-8")
    print("  [OK] VS Code settings configured for hediet.vscode-drawio")

    print("\nAll deliverables generated successfully!")


if __name__ == "__main__":
    main()
