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
  - Phát triển toàn bộ ứng dụng Next.js 15 App Router (`apps/public-site`).
  - Hoàn thiện 19 tuyến đường, hệ thống song ngữ i18n Việt - Anh, kho dữ liệu Seed `@/data/seed`.
  - Tích hợp chuẩn nhận diện thương hiệu STAR (Logo vàng kim 5 cánh).
  - Tích hợp widget Trợ lý AI du lịch với phong cách cờ đỏ sao vàng.

---

## 3. Báo Cáo Kiểm Định Môi Trường & Kết Quả Thẩm Định (Validation Report)

### 3.1. Các Hạng Mục Đã Kiểm Định Thành Công Trong Môi Trường (Executed Successfully)
- **Xác thực Canonical Context:** `python scripts/validate_context.py` vượt qua 100% các tiêu chí cấu trúc.
- **Phân tích Cú pháp Tĩnh (AST Sanity):** `python scripts/static_sanity.py` quét toàn bộ mã nguồn Python, không phát hiện lỗi cú pháp.
- **Biên dịch Bytecode Python:** `python -m compileall -q apps/api scripts` hoàn thành không có lỗi.
- **Kiểm định Cấu hình JSON & YAML:** Đã phân tích hợp lệ cú pháp `docker-compose.yml`, `.github/workflows/ci.yml` và toàn bộ các tệp `.json`.
- **Phân tích Cú pháp TypeScript (TSC):** Toàn bộ mã nguồn `apps/public-site` và `packages/contracts` vượt qua kiểm tra ngữ pháp TypeScript.
- **Rà soát Thương hiệu:** Toàn bộ dự án đã chuẩn hóa 100% sang thương hiệu **STAR** (STAR Travels), loại bỏ sạch sẽ các tiền tố cũ.

### 3.2. Lưu Ý Về Môi Trường Kiểm Thử Offline & CI/CD Khuyến Nghị
Trong môi trường container nội bộ không có kết nối Internet trực tiếp, việc cài đặt phụ thuộc từ xa (pip install / npm install) bị hạn chế. Do đó, các cổng kiểm thử đầy đủ đã được lập trình sẵn trong file CI:
- Đường dẫn: `.github/workflows/ci.yml`.
- Các bước bao gồm:
  1. `python manage.py makemigrations --check --dry-run`
  2. `python manage.py migrate` trên database PostGIS
  3. `ruff check .` và `ruff format --check .`
  4. `mypy apps/api`
  5. `pytest apps/api/tests/`
  6. `npm run typecheck` và `npm run build` trên `apps/public-site`
  7. Docker image build & Compose runtime test

### 3.3. Chứng Nhận Độ Chuẩn Xác Giao Diện (UI Parity Note)
- Trang chủ Next.js sử dụng chính xác tỉ lệ desktop 1197px, bộ font sang trọng (Playfair, Yellowtail, Inter), dải màu cẩm thạch ngọc bích và bố cục các khối theo đúng tài liệu thiết kế Anima reference.
- Bộ 5 ảnh chụp đối chiếu gốc được lưu trữ nguyên vẹn tại `docs/design-reference/` và mã nguồn đối chiếu được lưu tại `docs/reference/anima-original/`.
