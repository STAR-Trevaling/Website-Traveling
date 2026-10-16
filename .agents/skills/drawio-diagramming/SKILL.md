---
name: drawio-diagramming
description: |
  Interactive UML & system architecture diagramming using Draw.io (diagrams.net).
  Provides complete technical mastery and design aesthetics for crafting professional,
  OMG UML 2.5 compliant, visually stunning software architecture diagrams.
  Covers standard UML notations (Use Case, Class, Sequence, Component, Package, State Machine,
  Activity, Deployment), modern SaaS color palettes, orthogonal line routing, typography,
  and drag-and-drop editable multi-page .drawio XML generation.

  Relevant when:
    - Creating, updating, or reviewing editable Draw.io (.drawio) diagrams.
    - Building complete UML suites for system architectures, data models, and workflows.
    - Exporting interactive, drag-and-drop diagrams for software engineering design.
    - Elevating diagram visual aesthetics (Stripe/Linear/Apple design standard) and UML correctness.
---

# Draw.io (diagrams.net) UML & Architecture Diagramming Standard

Draw.io (diagrams.net) là nền tảng vẽ sơ đồ mã nguồn mở, độc lập nền tảng và lưu trữ dạng XML cấu trúc (`.drawio` hoặc `.drawio.xml`). Bản tài liệu này quy định **chuẩn mực kỹ thuật (OMG UML 2.5 Compliance)** kết hợp với **triết lý thẩm mỹ cao cấp (Aesthetic Design System)**, giúp tạo ra các bộ sơ đồ kiến trúc phần mềm vừa chuẩn xác tuyệt đối về mặt kỹ thuật, vừa đẹp mắt, hiện đại và sẵn sàng cho các buổi bảo vệ dự án, thuyết trình nhà đầu tư, hoặc tài liệu kỹ thuật doanh nghiệp.

---

## 1. Triết Lý Thiết Kế: "Vẽ Đẹp và Vẽ Chuẩn"

Một sơ đồ kiến trúc đạt chuẩn doanh nghiệp phải thỏa mãn đồng thời hai tiêu chí:

```
                  ┌──────────────────────────────────────────────┐
                  │          ENTERPRISE ARCHITECTURE             │
                  │             DIAGRAM STANDARD                 │
                  └──────────────────────┬───────────────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                               ▼
     ┌────────────────────────┐                     ┌────────────────────────┐
     │       VẼ CHUẨN         │                     │        VẼ ĐẸP          │
     │  (OMG UML 2.5 Norms)   │                     │   (Aesthetic System)   │
     ├────────────────────────┤                     ├────────────────────────┤
     │ • Đúng loại mũi tên    │                     │ • Bảng màu SaaS HSL    │
     │ • Đúng kiểu đường nét  │                     │ • Dây bo tròn (arc)    │
     │ • Ngăn Class 3 phần    │                     │ • Lưới 10px / 20px     │
     │ • Lifeline & Activation│                     │ • Đổ bóng tinh tế      │
     │ • Combined Fragments   │                     │ • Title Block & Legend │
     │ • Trigger/Guard syntax │                     │ • Phân tầng thị giác   │
     └────────────────────────┘                     └────────────────────────┘
```

1. **VẼ CHUẨN (Standards Compliance):**
   - Tuân thủ đặc tả **OMG UML 2.5.1**.
   - Phân biệt chính xác giữa: *Association*, *Aggregation*, *Composition*, *Generalization*, *Realization*, *Dependency*.
   - Khung *Combined Fragment* trong Sequence Diagram (`alt`, `opt`, `loop`, `par`) phải có guard condition `[điều kiện]`.
   - Lifeline trong Sequence Diagram phải có *Activation Bar* thể hiện thời gian thực thi.
   - State Machine phải có *Initial state* (chấm đen), *Final state* (bullseye), và cú pháp chuyển đổi `Trigger [Guard] / Action`.

2. **VẼ ĐẸP (Aesthetic Excellence - Tiêu chuẩn Stripe / Linear / Apple):**
   - **Tuyệt đối không dùng màu gốc thô:** Không dùng đỏ cờ (`#FF0000`), xanh lá chói (`#00FF00`), xanh lam rực (`#0000FF`). Sử dụng bảng màu phối HSL êm dịu, tương phản cao theo WCAG AA.
   - **Tất cả đường nối (Connectors) là Orthogonal bo tròn:** `edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;`. Không đi dây chéo xiên xẹo cắt ngang qua thân hộp khác.
   - **Cầu nhảy (Jump Arcs) tại giao lộ:** `jumpStyle=arc;jumpSize=6;` khi 2 dây bắt buộc giao nhau để người đọc không nhầm lẫn ngã tư.
   - **Khoảng trắng thông thoáng (Negative Space):** Cách biên tối thiểu 40px, khoảng cách giữa các node cùng cấp tối thiểu 20px–30px.
   - **Khối Tiêu Đề & Chú Giải (Title Block & Legend):** Mỗi trang sơ đồ chuyên nghiệp đều phải có Title Card (Tên biểu đồ, Phạm vi, Phiên bản) và Legend (Bảng giải thích mã màu & loại đường).

---

## 2. Hệ Thống Ký Hiệu Chuẩn OMG UML 2.5

### 2.1. Ma Trận Mũi Tên & Đường Dây Chuẩn (Connectors & Arrows)

| Quan Hệ UML | Ý Nghĩa Kỹ Thuật | Kiểu Đường & Mũi Tên | Chuỗi mxCell Style Chuẩn |
| :--- | :--- | :--- | :--- |
| **Association** | Liên kết thông thường hai chiều | Nét liền, **không mũi tên** | `endArrow=none;html=1;edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#475569;strokeWidth=1.5;` |
| **Directed Association** | Điều hướng một chiều / Gọi hàm | Nét liền, **mũi tên hở nhọn** | `endArrow=open;endFill=0;html=1;edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1E293B;strokeWidth=1.5;` |
| **Aggregation** | Quan hệ Chứa đựng (Weak - Has-a) | Nét liền, **kim cương RỖNG** ở đầu Whole | `startArrow=diamond;startFill=0;endArrow=none;html=1;edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0F172A;strokeWidth=1.5;` |
| **Composition** | Quan hệ Sở hữu vòng đời (Strong - Owns) | Nét liền, **kim cương ĐẶC** ở đầu Whole | `startArrow=diamond;startFill=1;endArrow=none;html=1;edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0F172A;strokeWidth=1.5;` |
| **Generalization** | Kế thừa (Inheritance / Is-a) | Nét liền, **tam giác RỖNG ĐÓNG** ở đầu Cha | `endArrow=block;endFill=0;html=1;edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0F172A;strokeWidth=1.5;` |
| **Realization** | Cài đặt Interface / Hợp đồng | Nét đứt, **tam giác RỖNG ĐÓNG** ở đầu Interface | `endArrow=block;endFill=0;dashed=1;html=1;edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0F172A;strokeWidth=1.5;` |
| **Dependency** | Phụ thuộc mềm (Uses-a) | Nét đứt, **mũi tên hở nhọn** | `endArrow=open;endFill=0;dashed=1;html=1;edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748B;strokeWidth=1.5;` |
| **Include / Extend** | Quan hệ Use Case đặc thù | Nét đứt, nhãn `«include»` / `«extend»` | `endArrow=open;dashed=1;html=1;edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#DA251D;strokeWidth=1.5;labelBackgroundColor=#FFFFFF;` |
| **Sequence Synch Call** | Gọi hàm đồng bộ (Chờ phản hồi) | Nét liền, **tam giác ĐẶC ĐEN** | `endArrow=block;endFill=1;html=1;rounded=0;strokeColor=#0F172A;strokeWidth=1.5;labelBackgroundColor=#FFFFFF;` |
| **Sequence Asynch Call** | Gọi bất đồng bộ (Fire-and-forget) | Nét liền, **mũi tên hở nhọn** | `endArrow=open;endFill=0;html=1;rounded=0;strokeColor=#0F172A;strokeWidth=1.5;labelBackgroundColor=#FFFFFF;` |
| **Sequence Return** | Phản hồi kết quả (Reply message) | Nét đứt, **mũi tên hở nhọn** | `endArrow=open;endFill=0;dashed=1;endSize=8;html=1;rounded=0;strokeColor=#64748B;strokeWidth=1.2;labelBackgroundColor=#FFFFFF;` |

### 2.2. Cấu Trúc Khối Lớp UML (Class Diagram Standard)

Một lớp UML chuẩn phải có cấu trúc **3 ngăn (3-compartment stack)**:
1. **Ngăn Tiêu Đề (Header):** Tên lớp in đậm, căn giữa. Có thể đính kèm Stereotype như `«entity»`, `«service»`, hoặc tên bảng DB bên dưới.
2. **Ngăn Thuộc Tính (Attributes):** Căn trái, ký hiệu tầm vực visibility rõ ràng:
   - `+` Public
   - `-` Private
   - `#` Protected
   - `~` Package
   - Cú pháp: `<visibility> <name>: <type> [multiplicity] = <default>`
3. **Ngăn Phương Thức (Operations):** Căn trái, cú pháp:
   - `<visibility> <name>(<param>: <type>): <return_type>`

---

## 3. Bảng Màu Thẩm Mỹ STAR SaaS Palette

Áp dụng bảng màu thiết kế phối hợp hài hòa, đáp ứng tiêu chuẩn tiếp cận thị giác cao cấp:

| Nhóm Vai Trò | Fill Color | Stroke Color | Text Color | Ứng Dụng Trong Sơ Đồ |
| :--- | :--- | :--- | :--- | :--- |
| **Brand Primary (STAR Crimson)** | `#FEF2F2` (Nền nhạt) / `#DA251D` (Header) | `#B91C1C` | `#FFFFFF` (trên nền đỏ) / `#7F1D1D` (trên nền nhạt) | Thực thể cốt lõi (Tour, Booking), Use Case trọng tâm |
| **Database & Persistence (Indigo)** | `#EFF6FF` / `#1D4ED8` | `#1E40AF` | `#FFFFFF` / `#1E3A8A` | PostgreSQL, PostGIS, Redis, Entity Data Models |
| **Services & Presentation (Slate)** | `#F8FAFC` / `#1E293B` | `#0F172A` | `#FFFFFF` / `#0F172A` | Next.js Web, Lifeline Headers, Actors, Microservices |
| **Integrations & Gateway (Amber)** | `#FEF3C7` / `#D97706` | `#B45309` | `#FFFFFF` / `#78350F` | VNPay, VietQR, Booking.com, Agoda, Odoo 18 ERP |
| **AI & Smart Features (Gold)** | `#FEF9C3` / `#CA8A04` | `#A16207` | `#FFFFFF` / `#713F12` | STAR AI Concierge, RAG Embeddings, Hybrid Search |
| **Security & Audits (Coral)** | `#FFF1F2` / `#E11D48` | `#BE123C` | `#FFFFFF` / `#881337` | JWT Proxy, Rate Limiter, Decree 13/2023, Audit Ledger |
| **System Boundary / Container** | `#F8FAFC` | `#94A3B8` | `#334155` | Hộp ranh giới hệ thống, Package, Swimlane |

---

## 4. Thư Viện mxCell Styles Dành Cho Draw.io

### 4.1. Use Case Diagram Elements
```xml
<!-- Actor Stick Figure -->
<mxCell id="actor" value="Traveler&#xa;(Du khách)" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#1E293B;strokeColor=#0F172A;fontColor=#0F172A;fontStyle=1;fontSize=12;" vertex="1" parent="1"/>

<!-- Core Use Case Capsule (Red Highlight) -->
<mxCell id="uc_star" value="UC-3: Đặt Tour Trọn Gói&#xa;&amp; Phòng vệ giá Server-side" style="ellipse;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#DA251D;strokeWidth=2;fontStyle=1;fontSize=12;fontColor=#7F1D1D;shadow=1;" vertex="1" parent="1"/>

<!-- Standard Use Case Capsule -->
<mxCell id="uc_std" value="UC-1: Khám phá Điểm đến,&#xa;Tour trọn gói &amp; Cẩm nang" style="ellipse;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;fontStyle=1;fontSize=12;fontColor=#0369A1;shadow=1;" vertex="1" parent="1"/>

<!-- System Boundary -->
<mxCell id="sys_box" value="STAR Travels Platform System Boundary" style="swimlane;startSize=32;html=1;whiteSpace=wrap;collapsible=0;recursiveResize=0;expand=0;fillColor=#F8FAFC;strokeColor=#475569;strokeWidth=1.5;fontStyle=1;fontSize=13;fontColor=#1E293B;" vertex="1" parent="1"/>
```

### 4.2. Class Diagram Elements (Stack Layout)
```xml
<!-- Class Box Parent (Header) -->
<mxCell id="cls_tour" value="&lt;b&gt;Tour&lt;/b&gt;&lt;br&gt;&lt;i&gt;«tours_tour»&lt;/i&gt;" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=32;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;html=1;fillColor=#DA251D;strokeColor=#B91C1C;fontColor=#FFFFFF;shadow=1;" vertex="1" parent="1"/>

<!-- Class Attributes & Methods Row -->
<mxCell id="cls_tour_body" value="- id: UUID&#xa;- slug: String (Unique)&#xa;- title: String&#xa;- price: Decimal (Authority)&#xa;- itinerary: JSONB&#xa;--&#xa;+ calculate_total(pax): Decimal&#xa;+ verify_slot_availability(date): bool" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=8;spacingRight=6;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;fontSize=11;fontColor=#0F172A;" vertex="1" parent="1"/>
```

### 4.3. Sequence Diagram Elements
```xml
<!-- Lifeline with Header -->
<mxCell id="ll_api" value="Django Bookings&#xa;(/api/v1/bookings/)" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;dropTarget=0;collapsible=0;recursiveResize=0;outlineConnect=0;size=42;fillColor=#1E293B;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1"/>

<!-- Activation Bar (Active execution window) -->
<mxCell id="act_bar" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#CBD5E1;strokeColor=#475569;" vertex="1" parent="1"/>

<!-- Combined Fragment Box (alt / opt / loop) -->
<mxCell id="fragment" value="alt [Thanh toán VNPay thành công]" style="shape=umlFrame;whiteSpace=wrap;html=1;width=180;height=28;fillColor=none;strokeColor=#64748B;strokeWidth=1.5;fontStyle=1;fontSize=11;fontColor=#334155;" vertex="1" parent="1"/>
```

### 4.4. Title Block & Legend Box (Khối Tiêu Đề & Chú Giải Chuyên Nghiệp)
```xml
<!-- Professional Title Block -->
<mxCell id="title_block" value="&lt;b style=&quot;font-size:14px;&quot;&gt;STAR Travels — Kiến Trúc Hệ Thống UML&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#64748B&quot;&gt;Phiên bản: 1.0.0 (MVP) | Chuẩn: OMG UML 2.5.1&lt;br&gt;Phạm vi: Booking, Payment, GPS, Affiliate, AI Concierge&lt;/font&gt;" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;spacingLeft=12;shadow=1;" vertex="1" parent="1"/>

<!-- Legend Card -->
<mxCell id="legend_box" value="&lt;b&gt;CHÚ GIẢI (LEGEND)&lt;/b&gt;&lt;br&gt;■ &lt;font color=&quot;#DA251D&quot;&gt;Đỏ STAR:&lt;/font&gt; Nghiệp vụ trọng tâm&lt;br&gt;■ &lt;font color=&quot;#1D4ED8&quot;&gt;Xanh Indigo:&lt;/font&gt; Dữ liệu &amp; CSDL&lt;br&gt;■ &lt;font color=&quot;#D97706&quot;&gt;Vàng Amber:&lt;/font&gt; Cổng tích hợp ngoài" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=left;spacingLeft=10;fontSize=10;" vertex="1" parent="1"/>
```

---

## 5. Danh Mục 8 Biểu Đồ UML Hoàn Chỉnh Của STAR Travels

Dự án STAR Travels triển khai bộ 8 biểu đồ hoàn chỉnh được lưu trữ tại `docs/star-travels-uml.drawio`:

| Tab | Loại Biểu Đồ UML | Đối Tượng / Nội Dung Trình Bày | Tiêu Chuẩn Kỹ Thuật Đạt Được |
| :---: | :--- | :--- | :--- |
| **Tab 1** | **UML Use Case Diagram** | 5 Tác nhân (Traveler, Partner, Admin, Payment Gateway, Odoo ERP), 11 Use Cases chính, System Boundary, quan hệ `«include»`. | Tách rõ Core MVP vs Ngoại vi, phân quyền RBAC |
| **Tab 2** | **UML Domain Class Diagram** | 10 Thực thể cốt lõi (`User`, `Destination`, `Tour`, `Booking`, `PaymentTransaction`, `Accommodation`, `Restaurant`, `PartnerApplication`, `KnowledgeChunk`, `AuditEvent`). | 3 ngăn chuẩn, Composition diamonds, Multiplicities (`1..*`, `0..*`) |
| **Tab 3** | **UML Sequence: Tour Booking** | Luồng Đặt Tour trực tiếp & Thanh toán trực tuyến VNPay / VietQR. | Chống sửa giá client-side, xác thực HMAC SHA512, Atomic ledger |
| **Tab 4** | **UML Sequence: Referral Tracking** | Luồng Chuyển tiếp Tiếp thị liên kết Đối tác (Booking.com / Agoda / TableCheck). | Non-blocking `navigator.sendBeacon`, 1.5s modal, Odoo CRM Lead |
| **Tab 5** | **UML Sequence: GPS Geolocation** | Luồng Định vị vị trí du khách & Sắp xếp quán ăn, khách sạn gần nhất (Haversine). | Tuân thủ Nghị định 13/2023/NĐ-CP (Consent popup), badges khoảng cách |
| **Tab 6** | **UML Component Architecture** | Cấu trúc Monolith Mô-đun (Presentation, Contracts, 13 Bounded Contexts, Persistence). | Clean Architecture, Phân tầng rõ rệt, OpenAPI contracts |
| **Tab 7** | **UML State Machine Diagram** | Vòng đời Trạng thái Booking (6 bước) & Vòng đời Đơn Đối tác B2B (5 bước). | Cú pháp Trigger [Guard] / Effect, Hàng đợi Outbox & Event-driven |
| **Tab 8** | **UML Deployment Diagram** | Kiến trúc Hạ tầng Vật lý & Môi trường Thực thi (Client, Edge CDN, Docker Pod). | Phân biệt `<<device>>` vs `<<execution environment>>` vs `<<artifact>>` |

---

## 6. Quy Trình Tạo & Cập Nhật Tự Động (Automation Workflow)

### 6.1. Nguyên Tắc Lập Trình Python Generator
Khi viết script sinh Draw.io XML (như `scripts/generate_drawio_uml.py`):
1. **Tính toán Tọa độ theo Lưới Toán Học:** Luôn căn `x`, `y`, `w`, `h` chia hết cho 10 (ví dụ: `w=240`, `h=70`, `gap=30`).
2. **Luôn bật Bo Tròn & Cầu Nhảy cho Connectors:**
   ```python
   CONNECTOR_STYLE = (
       "html=1;edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;"
       "jumpStyle=arc;jumpSize=6;strokeColor=#334155;strokeWidth=1.5;"
       "labelBackgroundColor=#FFFFFF;fontSize=11;"
   )
   ```
3. **Quản lý ID Tường Minh:** Đặt ID có tiền tố biểu thị trang và loại phần tử (ví dụ: `p1-uc-3`, `p2-cls-tour`, `p3-ll-api`) để tránh xung đột khi nối dây.
4. **Tích hợp Title Block & Legend:** Đảm bảo mọi trang diagram đều được tự động gắn thẻ Tiêu Đề và Chú Giải.

### 6.2. Các Bước Thao Tác Với File `.drawio`
1. **Chạy script tái tạo:**
   ```bash
   python scripts/generate_drawio_uml.py
   ```
2. **Mở và Chỉnh Sửa Trực Tiếp:**
   - **Cách 1 (Trình duyệt):** Truy cập [app.diagrams.net](https://app.diagrams.net/) -> Kéo thả trực tiếp file `docs/star-travels-uml.drawio` vào cửa sổ trình duyệt.
   - **Cách 2 (VS Code Extension):** Cài đặt extension `hediet.vscode-drawio`, mở trực tiếp file trong VS Code để kéo thả giao diện đồ họa.
3. **Xuất Bản Vẽ:**
   - Trong giao diện Draw.io: Chọn `File` -> `Export as` -> `SVG` (Khuyên dùng cho tài liệu vector không vỡ nét) hoặc `PNG` (Dành cho slide thuyết trình).

---

## 7. Bộ Tiêu Chí Đánh Giá Bản Vẽ (10 Điều Răn Kỹ Sư Đồ Họa)

Trước khi nghiệm thu bất kỳ bản vẽ nào, hãy tự kiểm tra theo 10 tiêu chí sau:

- [ ] **1. Mũi tên chính xác:** Kế thừa dùng tam giác rỗng, Composition dùng kim cương đặc, Interface dùng nét đứt tam giác rỗng.
- [ ] **2. Không dây xiên chéo:** 100% đường nối dùng `orthogonalEdgeStyle` có bo góc mềm mại.
- [ ] **3. Không trùng đè đường dây:** Nơi 2 dây giao nhau bắt buộc có cầu nhảy (`jumpStyle=arc`).
- [ ] **4. Chữ không bị đè:** Mọi nhãn trên dây đều có nền trắng (`labelBackgroundColor=#FFFFFF`).
- [ ] **5. Màu sắc phối hợp:** Sử dụng đúng bảng màu STAR SaaS, không dùng màu chói mắt.
- [ ] **6. Ngăn Class đúng chuẩn:** Class Box chia đủ 3 ngăn (Tên, Thuộc tính, Phương thức) kèm ký hiệu tầm vực (+, -, #).
- [ ] **7. Lifeline & Activation Bar:** Sequence diagram có thanh kích hoạt mô tả đúng thời điểm xử lý của component.
- [ ] **8. Cú pháp Guard rõ ràng:** Mọi rẽ nhánh trong Sequence (`alt`) và State Machine đều có điều kiện trong ngoặc vuông `[condition]`.
- [ ] **9. Có Tiêu Đề & Chú Giải:** Góc trên hoặc dưới có Title Block và Legend giải thích ngữ nghĩa.
- [ ] **10. Kéo thả độc lập:** File XML mở mượt mà trên Draw.io mà không bị lỗi layout hay đè chữ.
