# STAR Travels — Bộ Biểu Đồ Thiết Kế UML Toàn Diện (UML 2.5)

Tài liệu này tổng hợp **toàn bộ 8 biểu đồ UML chuẩn hóa (OMG UML 2.5.1)** của nền tảng **STAR Travels**. 

> [!TIP]
> **Các cách xem và kéo thả diagram trực tiếp:**
> 1. **Kéo thả thật 100% trong Trình duyệt (Không cần cài gì):** 
>    - Click đúp vào file [`docs/diagrams/mo-so-do-keo-tha.bat`](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/docs/diagrams/mo-so-do-keo-tha.bat) hoặc mở trực tiếp [`docs/diagrams/interactive-editor.html`](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/docs/diagrams/interactive-editor.html).
>    - Trình duyệt sẽ mở ngay không gian làm việc Draw.io với đầy đủ 8 tab, thanh công cụ bên trái, cho phép **kéo thả khối, nối dây, đổi màu và xuất file** trực tiếp!
> 2. **Chỉnh sửa kéo thả ngay trong VS Code:**
>    - Cài extension **Draw.io Integration** (`hediet.vscode-drawio`). Dự án đã cấu hình sẵn trong `.vscode/settings.json`, sau khi cài extension bạn chỉ cần click vào bất kỳ file nào trong thư mục [`docs/diagrams/`](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/docs/diagrams/) là VS Code sẽ mở bảng vẽ kéo thả ngay trong tab editor.
> 3. **Xem tĩnh trong Markdown:** Các hình vẽ Mermaid bên dưới giúp bạn xem nhanh tổng quan ngay trong file markdown (`Ctrl + Shift + V`).

---

## 1. Biểu Đồ Use Case Tổng Thể (UML Use Case Diagram)

Phân định ranh giới hệ thống **STAR Travels Platform**, 5 tác nhân (Actors) và 11 Use Case cốt lõi.

```mermaid
flowchart LR
    subgraph ACTORS_LEFT [Tác Nhân Phía Người Dùng]
        Traveler["Du Khách (Traveler)"]
        Partner["Đối Tác Dịch Vụ (Merchant Partner)"]
    end

    subgraph SYSTEM_BOUNDARY [STAR Travels Platform System Boundary]
        UC1(["UC-1: Khám phá Điểm đến & Tour"])
        UC2(["UC-2: Định vị GPS & Tìm gần nhất (Haversine)"])
        UC3(["UC-3: Đặt Tour Trọn Gói"])
        UC3A(["UC-3.1: Thanh toán Trực tuyến VNPay/VietQR"])
        UC4(["UC-4: Tiếp thị liên kết Đối tác (Referral 1.5s)"])
        UC4A(["UC-4.1: Đồng bộ Lead sang Odoo 18"])
        UC5(["UC-5: Tư vấn với AI Concierge"])
        UC6(["UC-6: Nộp Hồ sơ Hợp tác B2B"])
        UC7(["UC-7: Xét duyệt Đối tác Atomic"])
        UC8(["UC-8: Đăng nhập & Xác thực JWT BFF"])
        UC9(["UC-9: Quản trị & Giám sát DLQ"])
    end

    subgraph ACTORS_RIGHT [Hệ Thống Ngoại Vi & Quản Trị]
        Admin["Quản Trị Viên (Admin)"]
        PaymentGW["Cổng Thanh Toán (VNPay/VietQR)"]
        OdooERP["Odoo 18 ERP (CRM Backoffice)"]
    end

    Traveler --> UC1
    Traveler --> UC2
    Traveler --> UC3
    UC3 -.->|«include»| UC3A
    UC3A --> PaymentGW
    Traveler --> UC4
    UC4 -.->|«include»| UC4A
    UC4A --> OdooERP
    Traveler --> UC5
    Traveler --> UC8
    Partner --> UC6
    Partner --> UC8
    Admin --> UC7
    Admin --> UC9
```

---

## 2. Biểu Đồ Lớp Miền Nghiệp Vụ (Domain Class Diagram)

Cấu trúc 10 thực thể dữ liệu chính thuộc 13 Bounded Contexts trong kiến trúc Monolith mô-đun:

```mermaid
classDiagram
    direction TB

    class User {
        +UUID id
        +String email
        +String phone
        +RoleEnum role
        +Boolean is_active
        +DateTime date_joined
        +check_password(raw) bool
        +is_partner_owner() bool
    }

    class Destination {
        +UUID id
        +String slug
        +String name
        +RegionEnum region
        +PointField location
        +Boolean is_published
        +get_published_tours() QuerySet
        +calculate_nearby_places(rad) List
    }

    class Tour {
        +UUID id
        +UUID destination_id
        +String slug
        +String title
        +Decimal price
        +Integer duration_days
        +JSONB itinerary
        +calculate_total(pax) Decimal
        +verify_slot_availability(date) bool
    }

    class Booking {
        +UUID id
        +String code
        +UUID user_id
        +BookingItemTypeEnum item_type
        +UUID item_id
        +BookingStatusEnum status
        +Decimal total_price
        +JSONB metadata
        +transition_to(status) void
        +mark_paid_and_emit_outbox() void
    }

    class PaymentTransaction {
        +UUID id
        +UUID booking_id
        +GatewayEnum gateway
        +Decimal amount
        +String transaction_code
        +TxStatusEnum status
        +JSONB raw_ipn_payload
        +verify_signature(secret) bool
        +reconcile_with_booking() void
    }

    class Accommodation {
        +UUID id
        +String slug
        +UUID destination_id
        +String name
        +String category
        +Point location
        +String partner_name
        +String referral_url
        +distance_to(coords) Float
        +generate_referral_payload() dict
    }

    class Restaurant {
        +UUID id
        +String slug
        +UUID destination_id
        +String name
        +String cuisine_type
        +Point location
        +String partner_name
        +String booking_url
        +distance_to(coords) Float
        +generate_referral_payload() dict
    }

    class PartnerApplication {
        +UUID id
        +UUID user_id
        +String business_name
        +String tax_id
        +String license_number
        +PartnerStatusEnum status
        +approve_and_create_org(admin) Organization
        +reject(reason) void
    }

    class KnowledgeChunk {
        +UUID id
        +String title
        +String category
        +Text content
        +Vector1536 embedding
        +hybrid_search(vec, text) List
    }

    class AuditEvent {
        +UUID id
        +UUID actor_id
        +String action
        +String entity_type
        +UUID entity_id
        +JSONB change_diff
        +DateTime timestamp
    }

    Destination "1" *-- "1..*" Tour : Chứa đựng (Composition)
    Tour "1" <-- "0..*" Booking : Được đặt bởi
    User "1" <-- "0..*" Booking : Thuộc về
    Booking "1" *-- "1" PaymentTransaction : Thanh toán (Composition)
    Destination "1" *-- "1..*" Accommodation : Tọa lạc tại
    Destination "1" *-- "1..*" Restaurant : Tọa lạc tại
    User "1" <-- "0..1" PartnerApplication : Nộp hồ sơ
```

---

## 3. Biểu Đồ Tuần Tự: Đặt Tour & Thanh Toán Trực Tuyến

Luồng đặt Tour trực tuyến với cơ chế bảo vệ giá độc quyền từ phía Server (Server-side price protection) và xác thực chữ ký số HMAC-SHA512:

```mermaid
sequenceDiagram
    autonumber
    actor Traveler as Du Khách (Browser)
    participant Web as Next.js Web (Client)
    participant BFF as BFF Proxy (/api/auth)
    participant API as Django Bookings API
    participant DB as PostgreSQL 17
    participant GW as Cổng Thanh Toán (VNPay/VietQR)

    Traveler->>Web: Chọn ngày khởi hành, số khách -> Bấm 'Đặt ngay'
    Web->>BFF: Gửi POST /api/v1/bookings/ (Kèm HttpOnly Cookie)
    BFF->>API: Chuyển tiếp Request + Header Authorization Bearer
    activate API
    API->>DB: Truy vấn Tour.price chính xác từ DB (Bỏ qua giá client)
    DB-->>API: Trả về bản ghi Tour có giá thẩm quyền
    API->>DB: Tính total = price * pax & Tạo Booking (Status: pending)
    API-->>Web: Trả về Booking ID + Tổng tiền chính xác
    deactivate API
    Web->>Traveler: Điều hướng sang /booking/[id]/payment
    Traveler->>GW: Chọn phương thức (VNPay/VietQR) -> Quét mã / Nhập thẻ
    activate GW
    GW-->>Traveler: Hiển thị giao diện thanh toán an toàn
    GW->>API: Gửi Webhook IPN Server-to-Server (Kèm chữ ký HMAC)
    deactivate GW
    activate API
    API->>API: Xác thực chữ ký HMAC-SHA512
    API->>DB: Cập nhật Booking -> 'confirmed' & Lưu PaymentTransaction
    API-->>Web: Trả kết quả thành công qua Polling/Webhook
    deactivate API
    Web->>Traveler: Chuyển hướng sang trang hoàn tất /booking/[id]/success
```

---

## 4. Biểu Đồ Tuần Tự: Tiếp Thị Liên Kết Đối Tác (Affiliate Referral)

Mô hình tiếp thị liên kết (Booking.com, Agoda, TableCheck) sử dụng `navigator.sendBeacon()` không gây gián đoạn và đồng bộ CRM Lead sang Odoo 18:

```mermaid
sequenceDiagram
    autonumber
    actor Traveler as Khách Tham Quan
    participant Catalog as Trang Khách Sạn / Nhà Hàng
    participant Modal as ReferralAdvisoryModal (1.5s)
    participant API as Django Referral API
    participant Outbox as Transactional Outbox & Celery
    participant Partner as Trang Đối Tác (Booking.com/Agoda)

    Traveler->>Catalog: Bấm nút 'Đặt phòng qua Booking.com' / 'Đặt bàn'
    Catalog->>Modal: Hiển thị Modal thông báo chuyển tiếp minh bạch
    Modal-->>Traveler: Đếm ngược 1.5s hoặc bấm 'Tiếp tục chuyển trang'
    Modal->>API: navigator.sendBeacon(POST /api/v1/referrals/track/)
    activate API
    API->>Outbox: Lưu Booking ('accommodation_referral') + Outbox Event
    deactivate API
    activate Outbox
    Outbox->>Outbox: Celery Worker đẩy sự kiện sang Odoo 18 CRM Lead
    deactivate Outbox
    Modal->>Partner: Chuyển hướng trình duyệt sang liên kết đối tác chính thức
```

---

## 5. Biểu Đồ Tuần Tự: Định Vị Vị Trí & Sắp Xếp Khoảng Cách (GPS Haversine)

Quy trình phát hiện vị trí địa lý tuân thủ **Nghị định 13/2023/NĐ-CP** (bảo vệ dữ liệu cá nhân), tính khoảng cách phía Client bằng công thức Haversine:

```mermaid
sequenceDiagram
    autonumber
    actor User as Người Dùng
    participant UI as Catalog Wizard UI
    participant Browser as Trình Duyệt (Geolocation API)
    participant GeoUtils as geo-utils.ts (Haversine Engine)
    participant Cards as AccommodationCard / RestaurantCard

    User->>UI: Nhấn nút 'Tìm gần vị trí của tôi'
    UI->>Browser: Gọi navigator.geolocation.getCurrentPosition()
    Browser-->>User: Hiện thông báo xin quyền: Cho phép truy cập vị trí?
    User->>Browser: Người dùng bấm 'Cho phép (Allow)'
    Browser-->>GeoUtils: Trả về tọa độ thực {latitude, longitude}
    activate GeoUtils
    GeoUtils->>GeoUtils: findNearestDestination() xác định tỉnh/thành gần nhất
    GeoUtils->>UI: calculateDistanceKm() tính khoảng cách Haversine từng địa điểm
    deactivate GeoUtils
    UI->>Cards: formatDistance() định dạng mét/km và sắp xếp thứ tự tăng dần
    Cards-->>User: Đưa quán gần nhất lên đầu kèm huy hiệu '✦ GỢI Ý STAR HÀNG ĐẦU (~850 m)'
```

---

## 6. Biểu Đồ Thành Phần Kiến Trúc (Component Architecture)

Cấu trúc phân tầng Monolith mô-đun phân định rõ ràng giữa **Presentation**, **Contracts**, **13 Bounded Contexts**, và **Persistence**:

```mermaid
flowchart TD
    subgraph PRESENTATION [Tầng Trình Diễn: apps/public-site (Next.js 15)]
        AppRouter["App Router (25 Routes SSR & RSC)"]
        SearchCapsule["Dark Capsule Search & Hero"]
        GeoEngine["Geolocation & Haversine Engine"]
        ReferralEngine["Referral Advisory & Beacon"]
        AIChatWidget["AI Concierge Drawer Widget"]
        BFFProxy["BFF Auth Proxy (/api/auth/*)"]
    end

    subgraph CONTRACTS [Tầng Hợp Đồng: packages/contracts]
        TSTypes["TypeScript Interfaces (@travel/contracts)"]
        OpenAPISpec["OpenAPI 3.1 Specification"]
        Enums["Shared Enums (Booking, Roles, Status)"]
    end

    subgraph BACKEND_MONOLITH [Tầng Nghiệp Vụ Lõi: apps/api (Django 5.2 & DRF)]
        APIRoot["REST API Root (/api/v1/)"]
        AccountsCtx["Accounts Context (JWT Auth, RBAC)"]
        CatalogsCtx["Catalogs Context (Destinations, Tours)"]
        HospitalityCtx["Hospitality Context (Hotels, Dining)"]
        BookingsCtx["Bookings & Payments Context"]
        AIRagCtx["AI Concierge Context (pgvector)"]
        PartnersCtx["Partners Context (State Machine)"]
        OutboxCtx["Transactional Outbox & Celery Worker"]
        AuditCtx["Audit & Throttling Guard"]
    end

    subgraph PERSISTENCE [Tầng Dữ Liệu & Hạ Tầng]
        PG[(PostgreSQL 17 + PostGIS 3.5)]
        Redis[(Redis 7 Cache & Broker)]
        OdooERP[(Odoo 18 ERP)]
    end

    AppRouter --> TSTypes
    BFFProxy -->|HTTP JSON-RPC / REST| APIRoot
    APIRoot --> AccountsCtx
    APIRoot --> CatalogsCtx
    APIRoot --> HospitalityCtx
    APIRoot --> BookingsCtx
    APIRoot --> AIRagCtx
    APIRoot --> PartnersCtx

    CatalogsCtx --> PG
    BookingsCtx --> PG
    AIRagCtx --> PG
    OutboxCtx --> Redis
    OutboxCtx -->|Webhooks| OdooERP
```

---

## 7. Biểu Đồ Máy Trạng Thái (UML State Machine Diagram)

### 7.1. Vòng Đời Trạng Thái Booking (`bookings_booking`)
```mermaid
stateDiagram-v2
    [*] --> PendingPayment : Khởi tạo Booking [Tour hợp lệ]
    PendingPayment --> Confirmed : Nhận Webhook IPN thành công [HMAC hợp lệ]
    PendingPayment --> Failed : Quá hạn 15 phút / Cổng thanh toán báo lỗi
    Confirmed --> Completed : Kết thúc chuyến đi / Mở đánh giá
    Completed --> [*] : Lưu trữ sổ cái (Archive)
    Failed --> [*] : Giải phóng chỗ trống
```

### 7.2. Vòng Đời Xét Duyệt Đối Tác Lữ Hành B2B (`partners_partnerapplication`)
```mermaid
stateDiagram-v2
    [*] --> Submitted : Nộp đơn đăng ký [Mã số thuế hợp lệ]
    Submitted --> UnderReview : Quản trị viên mở hồ sơ kiểm tra
    UnderReview --> Approved : Chấp thuận [Tạo Organization & Nâng quyền Atomic]
    UnderReview --> Rejected : Từ chối [Gửi email kèm lý do cụ thể]
    Approved --> [*] : Kích hoạt tài khoản đối tác
    Rejected --> [*] : Lưu vết kiểm toán
```

---

## 8. Biểu Đồ Triển Khai Hạ Tầng (UML Deployment Diagram)

Kiến trúc phân bổ trên phần cứng vật lý, môi trường thực thi và các Container Docker:

```mermaid
flowchart TB
    subgraph CLIENT_NODE [Thiết Bị Khách «device»]
        Browser["Trình Duyệt Web Hiện Đại<br/>(Chrome, Safari, Firefox)<br/>- Web Geolocation API<br/>- SendBeacon API"]
    end

    subgraph EDGE_NODE [Máy Chủ Biên: Vercel / Cloudflare «execution environment»]
        NextApp["Node.js 20 LTS Runtime<br/>- Next.js 15.5 App Router<br/>- SSR / RSC Engine<br/>- BFF Cookie Auth Proxy"]
        CDN["Cloudflare Anycast CDN<br/>(Cache Static Assets)"]
    end

    subgraph PROD_HOST [Máy Chủ Sản Xuất: Linux Ubuntu 24.04 LTS «device»]
        subgraph DOCKER_POD [Docker Compose Production Pod]
            ContainerAPI["Container: backend (api)<br/>Python 3.12 + Django 5.2 Gunicorn<br/>- DRF REST API (Port 8000)<br/>- Spatial Query Engine"]
            ContainerWorker["Container: worker (celery)<br/>Celery 5 Async Tasks<br/>- Outbox Dispatcher sang Odoo<br/>- Giám sát DLQ"]
            ContainerRedis["Container: redis<br/>Redis 7 Alpine (Port 6379)<br/>- Cache Store & Celery Broker"]
            ContainerDB["Container: db<br/>PostgreSQL 17 + PostGIS 3.5 (Port 5432)<br/>- Spatial Geography SRID 4326<br/>- pgvector Embeddings (1536 dim)"]
        end
    end

    Browser -->|HTTPS TLS 1.3 / Port 443| NextApp
    NextApp -->|Internal HTTP / Port 8000| ContainerAPI
    ContainerAPI -->|TCP 5432| ContainerDB
    ContainerAPI -->|TCP 6379| ContainerRedis
    ContainerWorker -->|TCP 6379| ContainerRedis
    ContainerWorker -->|TCP 5432| ContainerDB
```

---

## 9. Tóm Tắt Vị Trí Lưu Trữ Toàn Bộ Tài Liệu & Sơ Đồ
 
| Hạng Mục | Đường Dẫn File | Định Dạng & Cách Sử Dụng |
| :--- | :--- | :--- |
| **Trình soạn thảo kéo thả Draw.io 1-Click** | [`docs/diagrams/interactive-editor.html`](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/docs/diagrams/interactive-editor.html) / [`mo-so-do-keo-tha.bat`](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/docs/diagrams/mo-so-do-keo-tha.bat) | **Mở trực tiếp trên Chrome/Edge:** Nhúng giao diện Draw.io đầy đủ với 8 tab, thanh hình khối bên trái, kéo thả trực quan 100%, có nút tải file về máy. |
| **Thư mục 8 file Draw.io riêng lẻ** | [`docs/diagrams/`](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/docs/diagrams/) | Chứa 8 file `.drawio` độc lập cho từng biểu đồ (`01-use-case-diagram.drawio`, `02-domain-class-diagram.drawio`, v.v.). |
| **Bản vẽ Draw.io tổng thể (8 Tab)** | [`docs/star-travels-uml.drawio`](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/docs/star-travels-uml.drawio) | File XML đa trang; mở bằng [app.diagrams.net](https://app.diagrams.net/) hoặc extension VS Code `hediet.vscode-drawio` để kéo thả. |
| **Tài liệu xem trực tiếp Markdown** | [`docs/uml-diagrams.md`](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/docs/uml-diagrams.md) | File Markdown tích hợp Mermaid đồ họa; mở bằng `Ctrl + Shift + V` trong VS Code. |
| **Script sinh sơ đồ tự động** | [`scripts/generate_drawio_uml.py`](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/scripts/generate_drawio_uml.py) | Script Python sinh ra XML Draw.io đạt chuẩn OMG UML 2.5 và bộ công cụ kéo thả. |
| **Hướng dẫn kỹ năng vẽ** | [`.agents/skills/drawio-diagramming/SKILL.md`](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/.agents/skills/drawio-diagramming/SKILL.md) | Cẩm nang chuẩn mực thiết kế sơ đồ, quy tắc đi dây, bảng màu và 10 điều răn kỹ sư đồ họa. |
