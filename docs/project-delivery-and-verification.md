# STAR Travels — Kế Hoạch Triển Khai & Báo Cáo Nghiệm Thu Dự Án (Project Delivery & Verification Master Report)

> **Tài liệu hợp nhất:** Lộ trình thực thi đa phân hệ (Phases 0–9 Sub-agent Execution Plan), Tiêu chuẩn nghiệm thu Quality Gates và Báo cáo kiểm định môi trường (Validation Report)  
> **Dự án:** STAR Travels Vietnam — Nền tảng Du lịch & Trải nghiệm Bản địa  
> **Phạm vi hợp nhất:** Kế hoạch thực thi Backend-first MVP + Báo cáo thẩm định tĩnh & môi trường CI/CD  

---

## 1. Hợp Đồng Thực Thi Toàn Cục Của Sub-Agent (Global Sub-Agent Contract)

Mọi Sub-Agent khi thực thi các hạng mục trong dự án BẮT BUỘC tuân thủ:
1. Đọc `AGENTS.md` theo đúng thứ tự ưu tiên.
2. Đọc toàn bộ 6 file canonical context trong thư mục `context/`.
3. Kiểm tra module mục tiêu, tests lân cận, migrations, API routes và cấu hình.
4. Để `Jev` phân loại và chọn chuỗi skill tối thiểu hữu ích.
5. Chỉ làm việc trong phạm vi phân hệ (phase) được giao trừ khi có lỗi chặn chéo đã được chứng minh.
6. Thêm/điều chỉnh test trước khi tuyên bố hoàn thành phân hệ.
7. Chạy đầy đủ các cổng kiểm tra chất lượng (Quality Gates).
8. Cập nhật `context/progress-tracker.md` chỉ sau khi tiến độ được xác minh thành công.
9. Báo cáo danh sách file thay đổi, tests đã chạy, ảnh hưởng dữ liệu/bảo mật và rủi ro còn tồn đọng.

---

## 2. Lộ Trình Triển Khai Chi Tiết Các Phân Hệ (Phased Implementation Plan)

### Phân hệ 0 — Nền Tảng Hạ Tầng (Phase 0: Platform Baseline)
- **Sub-agent:** `platform-foundation-agent`
- **Nhiệm vụ:**
  - Khởi tạo dự án Python 3.12 / Django 5.2 theo cấu trúc gói hướng domain (modular monolith).
  - Cấu hình biến môi trường và kết nối PostgreSQL 17 / PostGIS.
  - Thiết lập phân trang, bộ lọc và OpenAPI schema mặc định cho Django REST Framework.
  - Cấu hình Redis & Celery worker không gắn chặt logic domain.
  - Endpoint kiểm tra sức khỏe `/healthz` và tài liệu Swagger `/api/v1/docs/`.
  - Dockerfile & `docker-compose.yml` đa tầng cho PostGIS, Redis, API, Worker và Web.
  - Cài đặt Ruff, mypy, pytest và CI workflow.

### Phân hệ 1 — Định Danh & Phân Quyền (Phase 1: Identity & Authorization)
- **Sub-agent:** `identity-agent`
- **Nhiệm vụ:**
  - Định nghĩa Custom User model với khóa chính UUIDv4 trước đợt migration đầu tiên.
  - Thiết lập phân quyền vai trò (Role-based access: `customer`, `partner`, `staff`, `admin`).
  - Hợp đồng API current-user `/api/v1/auth/me/`.
  - Đăng ký User model trong Django Admin với cơ chế bảo vệ quyền hạn chặt chẽ.

### Phân hệ 2 — Khám Phá Điểm Đến & Danh Thắng (Phase 2: Destination & Place Discovery)
- **Sub-agent:** `discovery-agent`
- **Nhiệm vụ:**
  - Mô hình hóa Điểm đến (`Destination`) và Danh lam thắng cảnh (`Place`).
  - Lưu trữ tọa độ PostGIS `PointField(geography=True, SRID 4326)`.
  - Ràng buộc toàn vẹn dữ liệu, chỉ mục không gian SP-GiST và B-Tree slug.
  - API đọc dữ liệu công khai, tìm kiếm theo bán kính không gian PostGIS, lọc theo vùng miền.
  - Chặn rò rỉ dữ liệu bản nháp (draft/inactive) ra ngoài public.

### Phân hệ 3 — Vòng Đời Đối Tác B2B (Phase 3: Partner Lifecycle)
- **Sub-agent:** `partner-workflow-agent`
- **Nhiệm vụ:**
  - Mô hình hóa Hồ sơ đối tác (`PartnerApplication`), Doanh nghiệp (`Organization`) và Thành viên (`PartnerMembership`).
  - Máy trạng thái tường minh: `submitted -> under_review -> approved / rejected`.
  - Sử dụng `transaction.atomic` và `select_for_update` chống tranh chấp phê duyệt (race condition).
  - Tự động nâng cấp quyền tài khoản khi được phê duyệt và ghi nhật ký kiểm toán bất biến (Audit Log).

### Phân hệ 4 — Nội Dung Biên Tập & Cẩm Nang (Phase 4: Editorial Content)
- **Sub-agent:** `content-agent`
- **Nhiệm vụ:**
  - Mô hình hóa Bài viết cẩm nang (`Article`) liên kết với Điểm đến và Danh lam thắng cảnh.
  - Vòng đời xuất bản, thời gian đăng tải, tag phân loại.
  - Public API chỉ hiển thị các bài viết đã được phê duyệt xuất bản (`is_published=True`).

### Phân hệ 5 — Đánh Giá & Yêu Thích (Phase 5: Reviews & Favorites)
- **Sub-agent:** `community-agent`
- **Nhiệm vụ:**
  - Ràng buộc cơ sở dữ liệu: Mỗi người dùng chỉ đánh giá 1 lần trên mỗi địa danh (`UNIQUE(user_id, place_id)`).
  - Ràng buộc điểm đánh giá từ 1 đến 5 sao tại tầng DB.
  - Yêu cầu xác thực khi ghi nhận đánh giá; người dùng ẩn danh chỉ được đọc.
  - Tự động cập nhật điểm đánh giá trung bình (`rating_average`) và số lượt đánh giá (`rating_count`).

### Phân hệ 6 — Vận Hành & Trình Diễn Dữ Liệu (Phase 6: Operations & Demoability)
- **Sub-agent:** `demo-ops-agent`
- **Nhiệm vụ:**
  - Đăng ký toàn bộ operational models trong Django Admin.
  - Lệnh seed dữ liệu idempotent `python manage.py seed_demo`: nạp trọn vẹn 12 điểm đến, 10 trải nghiệm, 8 tour trọn gói, 4 bài viết cẩm nang 100% Việt Nam.

### Phân hệ 7 — Cổng Chất Lượng & Phát Hành (Phase 7: Release Quality Gate)
- **Sub-agent:** `quality-release-agent`
- **Nhiệm vụ:**
  - Kiểm tra trạng thái migration (`makemigrations --check`).
  - Kiểm tra định dạng mã nguồn (Ruff, ESLint).
  - Kiểm tra tĩnh kiểu dữ liệu (mypy, TypeScript compile).
  - Chạy toàn bộ test suites và kiểm tra deployment checks.

### Phân hệ 8 — Tích Hợp Nâng Cao (Phase 8: External Capabilities)
- Quản lý dịch vụ bên ngoài thông qua Ports & Adapters:
  - Bản đồ & Geocoding.
  - Lưu trữ đám mây hình ảnh (Cloudflare R2 / AWS S3).
  - Gửi email thông báo giao dịch (Transactional Email).
  - Chống spam / bot (Cloudflare Turnstile).

### Phân hệ 9 — Giao Diện Người Dùng Công Khai (Phase 9: Activated Customer Frontend)
- **Sub-agent:** `frontend-agent`
- **Nhiệm vụ:**
  - Phát triển toàn bộ ứng dụng Next.js 15.5 App Router (`apps/public-site`).
  - Hoàn thiện 23 tuyến đường, hệ thống song ngữ i18n Việt - Anh, kho dữ liệu Seed tập trung `@/data/seed`.
  - Tích hợp chuẩn nhận diện thương hiệu STAR (Logo vàng kim 5 cánh `#EAB308` kết hợp chữ *Star* script).
  - Tích hợp widget Trợ lý AI du lịch với phong cách "Nền đỏ sao vàng".

### Phân hệ 10 — Hạ Tầng Thanh Toán Đa Kênh & Quyết Toán Booking (Phase 10: Payments & Booking Settlement)
- **Sub-agent:** `payments-agent`
- **Nhiệm vụ:**
  - Xây dựng Bounded Context `apps/api/payments/` theo mô hình Ports & Adapters.
  - Tích hợp cổng VNPay 2.1.0 Sandbox: URL generation với alphabetic sorting, UTC+7 timestamp (`vnp_CreateDate`, `vnp_ExpireDate` = +15m), mã hóa `quote_plus`, mã băm HMAC-SHA512.
  - Xử lý Server-to-Server IPN Webhook (`POST /api/v1/payments/webhook/vnpay/`): Xác thực chữ ký số -> Kiểm tra đơn hàng -> Kiểm tra số tiền -> Kiểm tra Idempotency -> Xử lý mã phản hồi (`00` thành công kích hoạt Outbox `booking.paid`, các mã khác ghi nhận thất bại nhưng bảo toàn booking `pending_payment` cho khách thử lại).
  - Tích hợp chuyển khoản ngân hàng VietQR NAPAS 247:
    - Bộ tạo mã QR EMVCo thuần Python kèm thuật toán CRC16-CCITT (đa thức 0x1021, init 0xFFFF).
    - Bộ sinh URL ảnh QuickLink (`img.vietqr.io`).
    - Webhook nội bộ nhận xác nhận từ Odoo ERP (`POST /api/v1/payments/<id>/vietqr-confirm/`) bảo vệ bởi chữ ký HMAC-SHA256 (`X-Signature-SHA256`).
  - Tác vụ nền Celery `payments.tasks.sweep_expired_payments` chạy định kỳ mỗi 5 phút quét dọn giao dịch quá hạn.
  - Bộ kiểm thử đặc tả độc lập: `apps/api/payments/verify_vnpay_spec.py` và `apps/api/payments/verify_vietqr_spec.py` (100% green).
  - Frontend Next.js: Trang thanh toán tương tác `/booking/[id]/payment` (bộ chọn cổng, countdown timer, auto-polling mỗi 5s), màn hình chúc mừng `/booking/[id]/success`, trang callback `/payment/return` (polling backend mỗi 3s), và trang theo dõi lịch sử `/account/bookings`.

### Phân hệ 11 — Tri Thức Di Sản Lịch Sử RAG & AI Concierge (Phase 11: Authentic Vietnam Heritage & RAG Grounding)
- **Sub-agent:** `ai-concierge-agent`
- **Nhiệm vụ:**
  - Xây dựng tập dữ liệu di sản lịch sử 11 danh thắng Việt Nam `apps/api/assistant/data/vietnam_heritage_history.py`.
  - Lệnh quản trị nạp tri thức tự động `python manage.py index_heritage_knowledge` (tích hợp trong `seed_demo`).
  - Lưu trữ 58 chunk vector trong PostgreSQL (`assistant_knowledge_chunk`).
  - Nâng cấp bộ truy xuất lai `retriever.py` với dynamic keyword boost (+80 score) cho câu hỏi lịch sử.
  - Bộ sinh câu trả lời `generator.py` dẫn dắt văn phong lịch thiệp và trích xuất thẻ Tour tương tác `[TOUR_CARD: slug]`.
  - Route Handler Next.js `apps/public-site/src/app/api/assistant/chat/route.ts` proxy an toàn tới backend trong Docker container.
  - Tự động thu thập Lead (`AssistantLeadCapture`) và đẩy sang Odoo CRM (`crm.lead`) qua Outbox `ai.lead.created`.
  - Bộ kiểm thử hồi quy `apps/api/tests/test_assistant_rag.py` (`test_heritage_history_rag`).

### Phân hệ 12 — Chuẩn Hóa Nhận Diện Cờ Đỏ Sao Vàng & Tối Ưu UX (Phase 12: National Red Theme & UX Hardening)
- **Nhiệm vụ:**
  - Chuyển đổi toàn diện theme từ Teal sang Đỏ Quốc Kỳ Việt Nam (`#DA251D`, hover `#C92018`, dark red `#991B1B` / `#B91C1C`) kết hợp Ngôi sao vàng kim (`#EAB308`).
  - Nâng cấp Dark Glassmorphic Capsule Search Bar (`rounded-full`, `bg-black/50 backdrop-blur-2xl`, nút đỏ) với chế độ bật/tắt thu gọn tức thì.
  - Nâng cấp ảnh danh thắng Unsplash CDN độ phân giải cao 100% Việt Nam, loại bỏ hoàn toàn dữ liệu dummy test.
  - Chu kỳ hiển thị Tooltip thông minh cho AI Widget: Xuất hiện 5 giây mỗi 20 giây một lần với lời chào thân thiện.
  - Bảo mật CodeQL: Khử XSS DOM, lọc safe URL protocol, xóa bỏ nội suy input trong câu trả lời offline.

### Phân hệ 13 — Mô Hình Giới Thiệu Đối Tác Khách Sạn & Nhà Hàng (Phase 13: Accommodations & Restaurants Referral Engine)
- **Nhiệm vụ:**
  - Mở rộng `item_type` trong `bookings_booking`: thêm `'accommodation_referral'` và `'restaurant_referral'`.
  - Xây dựng API tiếp nhận tracking `POST /api/v1/referrals/track/` tạo bản ghi booking và outbox đồng bộ lead CRM Odoo.
  - Không tạo `payments_transaction` cho luồng referral (không thu tiền qua STAR).
  - Kỹ thuật Non-blocking 1.5s background beacon (`navigator.sendBeacon` / `fetch(keepalive)`).
  - Modal khuyến cáo chuyển tiếp đối tác chính hãng `ReferralAdvisoryModal`.
  - Seed dataset 10 Khách sạn 5 sao di sản và 10 Nhà hàng Michelin/đặc sản 100% Việt Nam với tọa độ GPS `{ lat, lng }` thực tế.

### Phân hệ 14 — Định Vị GPS & Gợi Ý Khoảng Cách Haversine (Phase 14: GPS Geolocation & Smart Distance Engine)
- **Nhiệm vụ:**
  - Nút bấm **"Tìm gần vị trí của tôi"** tuân thủ Nghị định 13/2023/NĐ-CP (chỉ kích hoạt khi khách bấm cho phép trên trình duyệt).
  - Thuật toán khoảng cách Haversine `calculateDistanceKm` và định dạng thân thiện `formatDistance` (mét / km).
  - Tự động nhận diện thành phố gần nhất trong 10 trung tâm du lịch trọng điểm của Việt Nam.
  - Tùy chọn sắp xếp "Khoảng cách gần nhất" và huy hiệu `✦ GỢI Ý STAR HÀNG ĐẦU` hiển thị cự ly thực tế trên thẻ.
  - Tích hợp tri thức AI Concierge (`assistant-engine.ts`) nhận diện các câu hỏi "gần tôi", "quanh đây", "định vị".

### Phân hệ 15 — Khắc Phục Toàn Diện 44 Điểm Kiểm Toán Sản Xuất (Phase 15: Production-Ready 44-Point Audit Remediation)
- **Nhiệm vụ:**
  - Vá lỗi bảo mật xác thực mock trong production (`apps/public-site/src/app/api/auth/*`).
  - Triệt tiêu nguy cơ thao túng giá (Price Tampering Defense): `total_price` và `unit_price` bắt buộc tính lại từ database.
  - Giới hạn tần suất gọi API bằng DRF Throttling (`AnonRateThrottle`, `UserRateThrottle`).
  - Tích hợp tiêu chuẩn pháp lý Việt Nam: Trang `/privacy` (Nghị định 13/2023/NĐ-CP), Trang `/terms` và chân trang pháp nhân (Nghị định 52/2013/NĐ-CP).
  - Checkbox đồng ý xử lý dữ liệu bắt buộc tại các form đăng ký, liên hệ, đặt tour.
  - Cấu hình HTTP security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`).
  - Tối ưu Core Web Vitals (sub-second LCP, gỡ bỏ `unoptimized` flag) và bổ sung Schema.org `TouristTrip` JSON-LD.
  - Thiết kế Error Boundary phong cách sang trọng Anima `apps/public-site/src/app/error.tsx`.
  - Đạt 100% PASS trên toàn bộ bộ kiểm thử tĩnh và kiểm thử tự động: `tsc --noEmit` (0 lỗi), `eslint` (0 lỗi), `mypy` (0 lỗi), `ruff` (0 lỗi).

---

## 3. Báo Cáo Kiểm Định Môi Trường & Kết Quả Thẩm Định (Validation Report)

### 3.1. Các Hạng Mục Đã Kiểm Định Thành Công Trong Toàn Bộ Dự Án (Executed Successfully)
- **Kiểm định Đặc tả Thanh toán VNPay:** `python apps/api/payments/verify_vnpay_spec.py` — **100% PASSED** (Xác minh chuẩn URL, sắp xếp tham số, HMAC-SHA512, và 5 mã phản hồi IPN 97, 01, 04, 02, 00).
- **Kiểm định Đặc tả Thanh toán VietQR:** `python apps/api/payments/verify_vietqr_spec.py` — **100% PASSED** (Xác minh EMVCo CRC16, QuickLink URL, HMAC-SHA256, Idempotency và Quét quá hạn).
- **Bộ Kiểm Thử Tự Động Backend Pytest:** `docker compose exec backend pytest` — **10 passed in 7.31s (100% green)**.
- **Phân Tích Cú Pháp Tĩnh & Kiểu Dữ Liệu TypeScript:** `npx tsc --noEmit` trên `apps/public-site` và `packages/contracts` — **0 errors (Exit code 0)**.
- **Rà Soát An Ninh & Lỗ Hổng CodeQL:** Đã xử lý triệt để các cảnh báo DOM XSS trên giao diện AI Chat, xác thực an toàn toàn bộ dữ liệu đầu vào và các liên kết sinh ra.
- **Toàn Vẹn Dữ Liệu & Danh Mục 100% Việt Nam:** Cơ sở dữ liệu PostgreSQL lưu trữ sạch sẽ 12 Điểm đến, 10 Trải nghiệm, 8 Tours trọn gói, 4 Bài viết cẩm nang, 58 Chunks tri thức di sản vector, 0 dữ liệu rác, 100% ảnh Unsplash CDN hoạt động ổn định.
- **Xác Thực Canonical Context & Cú Pháp Python:** `python scripts/validate_context.py` và `python scripts/static_sanity.py` vượt qua 100% các tiêu chí.

### 3.2. Chứng Nhận Độ Chuẩn Xác Giao Diện (UI Parity Note)
- Trang chủ Next.js sử dụng chính xác tỉ lệ desktop 1197px, bộ font sang trọng (Playfair, Yellowtail, Inter), dải màu cẩm thạch ngọc bích phối Đỏ Quốc Kỳ Việt Nam và bố cục các khối theo đúng tài liệu thiết kế Anima reference.
- Bộ 5 ảnh chụp đối chiếu gốc được lưu trữ nguyên vẹn tại `docs/design-reference/` làm căn cứ nghiệm thu giao diện trực quan.

---

## 4. Hướng Dẫn Vận Hành & Khởi Chạy Hệ Thống (Operational Runbook)

### 4.1. Khởi động môi trường Docker Monolith
```bash
# 1. Khởi động PostgreSQL 17 (PostGIS), Redis 7, Celery Worker, Django API và Next.js Frontend
docker compose up --build -d

# 2. Kiểm tra trạng thái các container
docker compose ps
```

### 4.2. Khởi tạo Cơ sở dữ liệu & Nạp dữ liệu mẫu
```bash
# Chạy migration cho toàn bộ các app (accounts, destinations, places, tours, bookings, payments, content, reviews, partners, assistant, audit, core)
docker compose exec backend python manage.py migrate

# Nạp 100% dữ liệu mẫu chuẩn Việt Nam và lập chỉ mục 58 chunk tri thức di sản RAG
docker compose exec backend python manage.py seed_demo
```

### 4.3. Chạy các bộ kiểm thử chất lượng
```bash
# Chạy bộ kiểm thử backend Pytest
docker compose exec backend pytest

# Chạy kiểm thử đặc tả thanh toán VNPay độc lập
python apps/api/payments/verify_vnpay_spec.py

# Chạy kiểm thử đặc tả thanh toán VietQR độc lập
python apps/api/payments/verify_vietqr_spec.py

# Kiểm tra kiểu dữ liệu TypeScript frontend
cd apps/public-site && npm run typecheck
```
