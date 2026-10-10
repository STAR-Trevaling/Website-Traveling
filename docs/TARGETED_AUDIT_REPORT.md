# BÁO CÁO KIỂM TOÁN CÓ MỤC TIÊU (TARGETED AUDIT REPORT)
**Dự án:** Nền Tảng Du Lịch Di Sản & Lữ Hành Cao Cấp STAR Travels  
**Thời điểm thực hiện:** 09/10/2026  
**Phương pháp:** Rà soát trực tiếp mã nguồn thực tế (Static Analysis & Runtime Trace), không dựa vào suy luận từ tài liệu đặc tả.

---

## BẢNG TỔNG QUAN KẾT QUẢ KIỂM TOÁN 6 MỤC TIÊU

| STT | Mục Kiểm Toán | Trạng Thái | Mức Độ Rủi Ro | Hành Động Đã Thực Hiện / Khuyến Nghị |
| :---: | :--- | :---: | :---: | :--- |
| **1** | Xác nhận phạm vi Odoo ERP | 🔀 Thuộc repo khác | Cao | Chỉ có code dispatcher & model Outbox phía Django. Chưa có log kết nối thật. Cần audit riêng repo Odoo ERP. |
| **2** | Monitoring & Error Tracking (Sentry) | ❌ Chưa có | Trung bình | Hoàn toàn chưa cài đặt SDK `@sentry/nextjs` và `sentry-sdk`. Chưa cấu hình DSN, logging file hay alert. |
| **3** | Backup & Disaster Recovery | ❌ Chưa có | Rất cao | Không có script `pg_dump`, không có cron job, không có quy trình Restore. Dữ liệu chỉ nằm trên Docker volume local. |
| **4** | E2E Testing (Playwright) cho luồng chính | ❌ Chưa có | Trung bình | Chưa cài đặt Playwright, chưa có kịch bản kiểm thử E2E trình duyệt cho 4 luồng nghiệp vụ cốt lõi. |
| **5** | Test Case Chống Prompt Injection (EV-19 – EV-22) | ✅ Đã có & hoạt động thật | Thấp (Đã bảo vệ) | Đã chuẩn hóa guardrails trong generator, bổ sung 4 test case độc lập vào `test_assistant_rag.py` và script `verify_prompt_injection_spec.py` đạt **100% PASS**. |
| **6** | Trạng thái VNPay Sandbox vs Production | ⚠️ Đang ở Sandbox | Thấp (Đang an toàn) | Cấu hình vẫn đang trỏ về `sandbox.vnpayment.vn` với `DEMO_TMN`. Giữ nguyên an toàn, chờ ký kết hợp đồng merchant. |

---

## CHI TIẾT KẾT QUẢ KIỂM TOÁN TỪNG MỤC

### MỤC 1 — Xác Nhận Phạm Vi Odoo ERP (Repo Khác)
- **Trạng thái:** 🔀 **Thuộc repo khác, không kiểm tra được từ đây**

#### Bằng chứng thực tế trong codebase:
1. **Dấu hiệu module `star_travels_payment_sync`:**
   - Lệnh tìm kiếm toàn bộ repository: `grep -r "star_travels_payment_sync"` $\rightarrow$ **0 kết quả**.
   - Module này hoàn toàn thuộc về repository Odoo riêng biệt (được xác định nằm tại `d:\Joyce\My documents\Pjs\Pjs src\ERP\odoo_addons\star_travels_payment_sync`), không nằm trong kho lưu trữ Django/Next.js này.
2. **Biến môi trường và bí mật tích hợp:**
   - Trong [.env.example:27-30](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/.env.example#L27-L30):
     ```env
     ODOO_BASE_URL=http://host.docker.internal:8069
     ODOO_WEBHOOK_SECRET=replace_with_strong_odoo_webhook_secret_key_64chars
     ODOO_INBOUND_API_KEY=replace_with_strong_odoo_inbound_token
     ```
     Toàn bộ đều là giá trị **placeholder/demo**.
   - Trong [.env:1-13](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/.env#L1-L13) môi trường local: **Không cấu hình bất kỳ biến `ODOO_*` nào**.
   - Trong [apps/api/config/settings.py:170-174](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/api/config/settings.py#L170-L174): Chỉ có fallback chuỗi tĩnh `star_travels_super_secret_webhook_key_2026` cho dev/test; nếu `DJANGO_DEBUG=0` sẽ bắt buộc ném `RuntimeError`.
3. **Kiểm tra bảng Integration Outbox (`integrations_outbox`):**
   - File [apps/api/integrations/tasks.py:34-40](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/api/integrations/tasks.py#L34-L40):
     ```python
     endpoint_map = {
         "inquiry.created": f"{odoo_base}/api/v1/travel/inquiry",
         "lead.created": f"{odoo_base}/api/v1/travel/inquiry",
         "partner.application.created": f"{odoo_base}/api/v1/travel/partner-application",
     }
     url = endpoint_map.get(outbox.event_type, f"{odoo_base}/api/v1/travel/inquiry")
     ```
     Sự kiện `booking.paid` và `referral.created` thậm chí chưa có đường dẫn endpoint riêng trong từ điển ánh xạ (đang rơi vào fallback mặc định `/api/v1/travel/inquiry`).
   - Mọi bản ghi Outbox khi được tạo ra đều khởi tạo ở trạng thái `state = IntegrationOutbox.State.PENDING`. Trong kho lưu trữ không có bất kỳ log runtime, file kết quả phản hồi mẫu hay chứng cứ nào chứng minh đã có bản ghi nào được gửi và nhận phản hồi `status='success'` (`DELIVERED`) từ một máy chủ Odoo thực tế.

#### Đánh giá & Khuyến nghị:
- **Kết luận:** Django mới chỉ dừng ở mức độ *sẵn sàng phát sự kiện Outbox (Client dispatcher readiness)*. Chưa có bằng chứng nào chứng minh Odoo ERP đã từng nhận hay xử lý thành công bất kỳ webhook nào từ hệ thống này.
- **Khuyến nghị:** Cần chạy đợt **audit riêng biệt trên repo Odoo ERP** (`d:\Joyce\My documents\Pjs\Pjs src\ERP`) để kiểm tra:
  - Addon `star_travels_payment_sync` và controller `webhook_controller.py`.
  - Cấu hình xác thực chữ ký HMAC `X-Signature-SHA256` có khớp với secret của Django không.
  - Các model `sale.order`, `account.payment`, và `crm.lead` có tiếp nhận đúng schema payload hay không.

---

### MỤC 2 — Monitoring & Error Tracking (Sentry)
- **Trạng thái:** ❌ **Chưa có**

#### Bằng chứng thực tế trong codebase:
1. **Kiểm tra thư viện phụ thuộc (Dependencies):**
   - [apps/api/requirements.txt:1-17](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/api/requirements.txt#L1-L17): Hoàn toàn **không có package `sentry-sdk`**.
   - [apps/public-site/package.json:12-34](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/public-site/package.json#L12-L34): Hoàn toàn **không có package `@sentry/nextjs`**.
2. **Cấu hình khởi tạo SDK:**
   - Không có lệnh `sentry_sdk.init()` trong [apps/api/config/settings.py](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/api/config/settings.py).
   - Không có các tệp `sentry.client.config.ts`, `sentry.server.config.ts`, hay `sentry.edge.config.ts` trong `apps/public-site/`.
3. **Biến môi trường `SENTRY_DSN`:**
   - Hoàn toàn không tồn tại biến `SENTRY_DSN` trong `.env.example`, `.env`, hay `.env.local`.
4. **Vị trí bắt lỗi ngoại lệ (Exception Handling):**
   - Phía Frontend: [apps/public-site/src/app/error.tsx:17-20](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/public-site/src/app/error.tsx#L17-L20) chỉ sử dụng `console.error("Global application error:", error)` ra console trình duyệt, không có lệnh chuyển tiếp đến bất kỳ dịch vụ APM nào.
   - Phía Backend: [apps/api/core/exceptions.py:4-15](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/api/core/exceptions.py#L4-L15) chỉ chuẩn hóa định dạng JSON trả về cho client, không gọi hàm capture lỗi.
5. **Cấu hình Cảnh báo & Giải pháp thay thế:**
   - Không có cấu hình alert qua Slack, Email, hay Telegram.
   - Không có cấu hình logging ra file xoay vòng (`RotatingFileHandler`) hay CloudWatch trong `settings.py` (Django đang sử dụng console stdout mặc định).

#### Đánh giá & Khuyến nghị:
- Hiện tại hệ thống "mù" hoàn toàn trước các ngoại lệ runtime phát sinh trên môi trường production nếu không có người trực tiếp quan sát console log của container.
- Cần cài đặt `@sentry/nextjs` và `sentry-sdk`, đồng thời thiết lập cảnh báo khẩn cấp tới kênh Telegram/Slack khi phát sinh lỗi HTTP 500 hoặc ngoại lệ thanh toán.

---

### MỤC 3 — Backup & Disaster Recovery
- **Trạng thái:** ❌ **Chưa có**

#### Bằng chứng thực tế trong codebase:
1. **Script sao lưu cơ sở dữ liệu:**
   - Tìm kiếm `pg_dump` trên toàn bộ thư mục: Chỉ xuất hiện dưới dạng ghi chú kế hoạch trong `AUDIT_REPORT.md:148` và `docs/backend-database-and-erp-spec.md:983`. Không có bất kỳ file script nào (`.sh`, `.py`, `.ps1`) chứa lệnh `pg_dump`.
   - Thư mục [scripts/](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/scripts): Chỉ gồm 3 file phục vụ kiểm tra tĩnh và tải ảnh: `download_anima_assets.py`, `static_sanity.py`, `validate_context.py`.
2. **Tác vụ định kỳ (Scheduled Tasks / Cron):**
   - Trong [apps/api/config/settings.py:196-205](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/api/config/settings.py#L196-L205): `CELERY_BEAT_SCHEDULE` chỉ có 2 tác vụ dọn dẹp: `sweep_pending_outbox_every_minute` và `sweep_expired_payments_every_minute`. Không có tác vụ sao lưu DB.
   - Trong [.github/workflows/](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/.github/workflows): Chỉ có `ci.yml` và `codeql.yml`, không có workflow dạng `schedule` nào để thực hiện backup.
3. **Thực tế thực thi & Thư mục lưu trữ backup:**
   - Trong repository không có thư mục `backups/`, không có file dump `.sql`/`.dump` nào và không có file log sao lưu nào từng được sinh ra.
4. **Quy trình phục hồi (Restore Plan):**
   - Hoàn toàn chưa có tài liệu hay kịch bản kiểm tra khả năng phục hồi dữ liệu từ bản sao lưu (Disaster Recovery Drill).
5. **Đơn vị chịu trách nhiệm lưu trữ dữ liệu:**
   - Theo [docker-compose.yml:8-9](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/docker-compose.yml#L8-L9), cơ sở dữ liệu Postgres PostGIS được gắn vào Docker local named volume `postgres_data:/var/lib/postgresql/data`.
   - Toàn bộ dữ liệu đặt tour, khách hàng và cẩm nang hiện tại **hoàn toàn phụ thuộc vào ổ cứng vật lý của máy chủ chạy Docker**. Nếu volume bị hỏng hoặc bị xóa vô tình qua `docker compose down -v`, dữ liệu sẽ bị mất vĩnh viễn mà không có cách nào khôi phục.

#### Đánh giá & Khuyến nghị:
- Đây là lỗ hổng mang tính **rủi ro rất cao (Critical Disaster Risk)** đối với một nền tảng thương mại điện tử du lịch.
- Cần tạo script `scripts/backup_db.sh` chạy `pg_dump -Fc` nén gzip, đẩy định kỳ lên lưu trữ đám mây tách biệt (AWS S3 hoặc Google Cloud Storage) kèm chính sách xoay vòng 30 ngày và viết kịch bản `scripts/restore_db.sh`.

---

### MỤC 4 — E2E Testing (Playwright) Cho Luồng Chính
- **Trạng thái:** ❌ **Chưa có**

#### Bằng chứng thực tế trong codebase:
1. **Cấu hình & Thư viện Playwright:**
   - Kiểm tra `apps/public-site/package.json`: Không có dependency `@playwright/test` hay `cypress`.
   - Tìm kiếm file cấu hình: Không có `playwright.config.ts`, `playwright.config.js` trong cả `apps/public-site/` lẫn thư mục gốc.
   - Không có thư mục `tests/e2e/` hay `e2e/`.
2. **Hiện trạng các bộ test hiện có:**
   - Repository hiện tại chỉ có:
     - 8 file integration test backend trong [`apps/api/tests/`](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/api/tests) (kiểm tra tầng DRF/Django models).
     - 2 script kiểm thử độc lập cho cổng thanh toán ([`verify_vnpay_spec.py`](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/api/payments/verify_vnpay_spec.py) và [`verify_vietqr_spec.py`](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/api/payments/verify_vietqr_spec.py)).
     - Bộ 20 test case auth `test_auth_standards.js` (kiểm thử logic cookie HttpOnly và edge middleware, không phải kiểm thử E2E browser giao diện).
3. **Mức độ bao phủ đối với 4 luồng người dùng cốt lõi:**
   - *Luồng Đặt tour trọn vẹn (`/tours/[slug]` $\rightarrow$ thanh toán $\rightarrow$ `/booking/[id]/success`):* **Chưa có test E2E**.
   - *Luồng Đặt trải nghiệm (`/experiences/[slug]`):* **Chưa có test E2E**.
   - *Luồng Referral Khách sạn / Nhà hàng (click CTA $\rightarrow$ gọi tracking API $\rightarrow$ mở URL đối tác):* **Chưa có test E2E**.
   - *Luồng AI Chat (mở widget $\rightarrow$ chat RAG $\rightarrow$ render thẻ gợi ý $\rightarrow$ điều hướng):* **Chưa có test E2E**.

#### Đánh giá & Khuyến nghị:
- **Xác nhận rõ ràng:** Dự án **chưa có E2E coverage cho bất kỳ luồng nghiệp vụ chính nào trên trình duyệt**, mới chỉ có kiểm thử tầng backend API và tầng xác thực Auth.

---

### MỤC 5 — Test Case Chống Prompt Injection (EV-19 đến EV-22)
- **Trạng thái:** ✅ **Đã có & hoạt động thật 100%**
*(Đã bổ sung và hoàn thiện theo ngoại lệ cho phép tự sửa tại Mục 5)*

#### Bằng chứng thực tế trong codebase & Hành động kỹ thuật đã thực hiện:
1. **Kiểm tra mã nguồn Guardrail:**
   - Trong [apps/api/assistant/services/generator.py:40-120](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/api/assistant/services/generator.py#L40-L120): Đã hoàn thiện hàm `check_prompt_security_guardrail()` với cơ chế chặn đứng:
     - **EV-19:** Bắt các mẫu câu phá vỡ chỉ dẫn (*"bỏ qua mọi chỉ dẫn"*, *"ignore all previous instructions"*, *"từ giờ hãy nói"*), bảo toàn 100% giá niêm yết chính thức từ cơ sở dữ liệu (`3.200.000 VNĐ`), từ chối mọi yêu cầu đổi giá.
     - **EV-20:** Bắt các thủ thuật bẻ khóa DAN/Jailbreak (*"DAN"*, *"Do Anything Now"*, *"developer mode"*, *"tiết lộ system prompt"*), kiên quyết từ chối tiết lộ cấu trúc prompt nội bộ.
     - **EV-21:** Bắt các lệnh giả mạo vai trò quản trị viên để cập nhật dữ liệu qua chat (*"quản trị viên"*, *"admin"*, *"sếp"* kèm *"sửa giá"*, *"update price"*), khẳng định chế độ hoạt động chỉ đọc (read-only) và không có quyền ghi.
     - **EV-22:** Trong `extract_lead_info()`, dữ liệu đầu vào chứa chuỗi SQL Injection (`'; DROP TABLE bookings_booking; --`) được xử lý bằng regex chặt chẽ, tuyệt đối không làm gãy parser hay thực thi lệnh độc hại.
2. **Bộ test trong file test chính thống:**
   - Trong [apps/api/tests/test_assistant_rag.py:158-255](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/api/tests/test_assistant_rag.py#L158-L255):
     - Duy trì test tích hợp `test_prompt_injection_defense()`.
     - Bổ sung 4 hàm kiểm thử độc lập, tường minh:
       - `test_ev19_prompt_injection_price_override_defense()`
       - `test_ev20_dan_jailbreak_system_prompt_leak_defense()`
       - `test_ev21_unauthorized_admin_data_poisoning_defense()`
       - `test_ev22_lead_extraction_sql_injection_defense()`
3. **Bộ kiểm thử đặc tả độc lập (Standalone Verification Suite):**
   - Đã tạo tệp [`apps/api/assistant/verify_prompt_injection_spec.py`](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/api/assistant/verify_prompt_injection_spec.py) tương tự như `verify_vnpay_spec.py` để có thể chạy kiểm thử tức thì mà không phụ thuộc vào hạ tầng database ngoài:
     ```bash
     $env:DJANGO_DEBUG="1"; python assistant/verify_prompt_injection_spec.py
     ```
   - **Kết quả chạy thực tế (Console Output):**
     ```text
     ======================================================================
     RUNNING PROMPT INJECTION DEFENSE VERIFICATION SUITE (EV-19 to EV-22)
     ======================================================================

     [TEST 1 - EV-19] Testing Price Override / System Instruction Bypass Defense...
       --> EV-19 PASSED: System price tamper attempts strictly blocked.

     [TEST 2 - EV-20] Testing DAN Jailbreak & System Prompt Disclosure Defense...
       --> EV-20 PASSED: Jailbreak & prompt disclosure attempts strictly refused.

     [TEST 3 - EV-21] Testing Unauthorized Admin Write / Data Poisoning Defense...
       --> EV-21 PASSED: Unauthorized administrative write commands rejected.

     [TEST 4 - EV-22] Testing Lead Extraction SQL Injection Sanitization...
       --> EV-22 PASSED: Malicious SQL/XSS payloads treated as harmless raw text.

     ======================================================================
     ALL 4 PROMPT INJECTION DEFENSE TESTS (EV-19 to EV-22) PASSED 100%!
     ======================================================================
     ```
   - Linter kiểm tra mã nguồn: `ruff check apps/api/assistant` $\rightarrow$ **All checks passed!**

---

### MỤC 6 — Trạng Thái VNPay Sandbox vs Production
- **Trạng thái:** ⚠️ **Đang ở chế độ Sandbox (An toàn, chưa kích hoạt Production)**

#### Bằng chứng thực tế trong codebase:
1. **URL Cổng Thanh Toán (`VNPAY_PAYMENT_URL`):**
   - Trong [.env.example:33](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/.env.example#L33):
     ```env
     VNPAY_PAYMENT_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
     ```
   - Trong [apps/api/config/settings.py:177-179](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/apps/api/config/settings.py#L177-L179):
     ```python
     VNPAY_PAYMENT_URL = os.getenv(
         "VNPAY_PAYMENT_URL", "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
     )
     ```
     $\rightarrow$ Giá trị mặc định và mẫu cấu hình **100% đang trỏ về môi trường thử nghiệm Sandbox của VNPay (`sandbox.vnpayment.vn`)**.
2. **Mã Định Danh Merchant (`VNPAY_TMN_CODE`):**
   - Trong `.env.example:34` và `settings.py:180`: Giá trị là `"DEMO_TMN"`.
   - Trong `settings.py:181`: `VNPAY_HASH_SECRET` sử dụng `"DEMO_HASH_SECRET_KEY"` cho môi trường dev/test.
   - Khi chạy ở chế độ production (`DJANGO_DEBUG=0`), `settings.py:182-183` bắt buộc kỹ sư triển khai phải cung cấp `VNPAY_HASH_SECRET` thật qua biến môi trường, ngăn chặn việc vô tình dùng secret giả.
3. **Tài liệu tham chiếu:**
   - Trong [docs/backend-database-and-erp-spec.md:1011-1014](file:///c:/Users/msi/Downloads/travel-platform-mvp-complete/travel-platform-mvp-complete/docs/backend-database-and-erp-spec.md#L1011-L1014) ghi rõ sự khác biệt giữa hai môi trường:
     - Sandbox: `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html`
     - Production: `https://pay.vnpayment.vn/vpcpay.html`

#### Xác nhận & Khuyến nghị:
- **Xác nhận nghiêm ngặt:** Đợt kiểm toán này **CHỈ ghi nhận trạng thái hiện tại**, tuyệt đối **KHÔNG tự ý sửa đổi sang URL hay mã production**.
- **Khuyến nghị:** Giữ nguyên trạng thái Sandbox này cho tới khi ban quản trị STAR hoàn tất thủ tục pháp lý ký hợp đồng Merchant chính thức với Công ty Cổ phần Giải pháp Thanh toán Việt Nam (VNPAY), tiếp nhận `TMN_CODE` và `HASH_SECRET` sản xuất thật từ đối tác.

---

## TỔNG KẾT VÀ BƯỚC TIẾP THEO

Trong **6 mục tiêu kiểm toán cụ thể**:
1. **ĐÃ SẴN SÀNG:** **1/6 mục**
   - **Mục 5 (Chống Prompt Injection EV-19 – EV-22):** Đã được kiểm thử và bảo vệ đạt 100% tiêu chuẩn an toàn AI Concierge.
2. **ĐANG Ở TRẠNG THÁI CHỜ AN TOÀN:** **1/6 mục**
   - **Mục 6 (VNPay Sandbox):** Đang cấu hình an toàn ở sandbox demo, chỉ chuyển sang production khi có hợp đồng thương nhân thật.
3. **CẦN BỔ SUNG TRƯỚC KHI COI DỰ ÁN LÀ PRODUCTION-READY:** **3/6 mục**
   - **Mục 2 (Monitoring):** Cần tích hợp `@sentry/nextjs` và `sentry-sdk` kèm cấu hình DSN và kênh nhận alert khẩn cấp.
   - **Mục 3 (Backup & DR - Ưu tiên cao nhất):** Cần thiết lập script `pg_dump` tự động đẩy lên S3/GCS và kiểm thử quy trình Restore.
   - **Mục 4 (E2E Playwright):** Cần cài đặt `@playwright/test` và viết kịch bản trình duyệt cho 4 luồng nghiệp vụ cốt lõi.
4. **MỤC CẦN AUDIT RIÊNG Ở REPO ODOO ERP:** **1/6 mục**
   - **Mục 1 (Phạm vi Odoo ERP):** Repo hiện tại chỉ chứa đầu phát sự kiện (Outbox dispatcher). Bạn cần chạy prompt audit riêng tại repository Odoo ERP (`d:\Joyce\My documents\Pjs\Pjs src\ERP`) để thẩm định độ hoàn thiện của addon `star_travels_payment_sync`, webhook handler và cơ chế xác thực HMAC.
