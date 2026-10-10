# STAR Travels — Đặc Tả Toàn Diện Giao Diện Public (Public Site Master Specification)

> **Tài liệu hợp nhất toàn diện giao diện người dùng (Customer-Facing Public Site)**  
> **Dự án:** STAR Travels Vietnam — Nền tảng Du lịch & Trải nghiệm Bản địa  
> **Ứng dụng:** `apps/public-site` (Next.js 15.5 App Router, React 19, Tailwind CSS v3, TypeScript 5.9)  
> **Trạng thái:** Hoàn thiện 100% tính năng Public & Thanh toán (VNPay / VietQR), Trợ lý AI Concierge, Song ngữ Việt - Anh, Dữ liệu Seed 100% Việt Nam, Parity chuẩn Anima  
> **Phạm vi hợp nhất:** Tổng quan kiến trúc + Danh mục thành phần UI Inventory (23 Routes) + Chuẩn Giao diện Cờ Đỏ Sao Vàng + Quy chuẩn Parity Checklist & Responsive  

---

## 1. Giới Thiệu & Ngăn Xếp Kỹ Thuật (Tech Stack & Architecture)

Cổng thông tin người dùng công khai (`apps/public-site`) được thiết kế theo ngôn ngữ thẩm mỹ sang trọng, kết hợp giữa tinh thần di sản Việt Nam và trải nghiệm lữ hành chuẩn quốc tế. Toàn bộ giao diện bám sát phong cách **Anima Travel Company / STAR Travels**, nổi bật với tông màu cẩm thạch ngọc bích, điểm nhấn chủ đạo **Cờ Đỏ Sao Vàng Việt Nam (`#DA251D`, hover `#C92018`, dark red `#991B1B` / `#B91C1C`)**, typography nghệ thuật Yellowtail/Playfair và chất liệu kính mờ (glassmorphism).

| Hạng mục | Công nghệ / Tiêu chuẩn sử dụng | Mô tả & Vai trò |
|---|---|---|
| **Framework** | Next.js 15.5 (App Router) & React 19 | Server Components (RSC) kết hợp Client Components chọn lọc, Server Actions |
| **Styling** | Tailwind CSS v3 & Vanilla CSS tokens | Custom utilities, thiết kế `rounded-[2px]`, hiệu ứng kính mờ `backdrop-blur`, theme Đỏ Quốc Kỳ `#DA251D` |
| **Typography** | Inter, Playfair Display & Yellowtail Script | Font chữ cân bằng, tiêu đề uốn lượn sang trọng, `text-balance` chống rớt chữ |
| **Đa ngôn ngữ** | Hệ thống i18n Song ngữ độc quyền | Context API, Cookies (`star_travels_locale`), Banner chọn ngôn ngữ quốc tế |
| **Dữ liệu Seed** | Kho dữ liệu tập trung `@/data/seed` | 100% danh lam thắng cảnh Việt Nam, đầy đủ fallback khi chưa kết nối CMS/API |
| **BFF & Auth** | Next.js Route Handlers + HTTP-Only Cookies | Bảo vệ token JWT, proxy an toàn đến backend Django REST Framework |
| **Thanh toán** | Cổng VNPay Sandbox & VietQR NAPAS 247 | Thanh toán trực tuyến tức thì, quét mã QR ngân hàng, polling trạng thái thời gian thực |
| **Trợ lý AI** | Floating AI Concierge "Nền đỏ sao vàng" | Widget chat tư vấn RAG, đề xuất thẻ tour tương tác, thu thập lead CRM |
| **SEO & Chia sẻ** | Next.js Metadata, Dynamic Sitemap & Robots | OpenGraph, Twitter Cards, Semantic HTML5, Schema.org Organization |
| **Asset Delivery** | Tối ưu hóa CDN & Self-hosted scripts | Hỗ trợ tự lưu trữ Anima assets với `scripts/download_anima_assets.py` |

---

## 2. Hệ Thống Kiến Trúc Nền Tảng (Core Design System)

### 2.1. Chuẩn Nhận Diện Thương Hiệu STAR (Brand Identity & Logo)
Theo quy chuẩn thương hiệu tại `.agents/skills/brand-identity-and-logo`:
- **Tên thương hiệu chính thức:** **`STAR`** (mô tả hệ sinh thái: *STAR Travels*).
- **Cấu trúc logo bắt buộc:** Bao gồm 2 thành tố không thể tách rời:
  1. **Chữ thương hiệu:** Kiểu chữ script cổ điển, phóng khoáng và sang trọng.
  2. **Biểu tượng Ngôi sao (Star Emblem):** Ngôi sao vector 5 cánh đối xứng màu vàng kim (`#EAB308`), tỷ lệ chuẩn vàng $0.382$, tạo hiệu ứng chiều sâu phía sau chữ *Star*.
- **Màu sắc thương hiệu Quốc kỳ:** Nền cờ đỏ Crimson Red (`#DA251D`), Ngôi sao vàng kim (`#EAB308`), Điểm nhấn phụ Slate trầm (`#1E293B`, `#0F172A`).
- **Component dùng chung:** `<StarLogo />` (`src/components/shared/star-logo.tsx`) hỗ trợ linh hoạt 4 biến thể (`integrated`, `horizontal`, `stacked`, `icon-only`) và 4 cấp độ kích thước (`sm`, `md`, `lg`, `xl`).

### 2.2. Hệ Thống Song Ngữ Liền Mạch (Bilingual i18n System)
- **Cơ chế hoạt động:**
  - Không phân chia sub-path phức tạp (`/vi`, `/en`), toàn bộ hệ thống sử dụng chung một cấu trúc URL duy nhất để tối ưu SEO và trải nghiệm người dùng.
  - Trạng thái ngôn ngữ lưu trữ đồng thời qua Cookie (`star_travels_locale`) và `localStorage`.
  - Server Components đọc cookie để render mã nguồn HTML chính xác ngay lần tải đầu tiên (zero layout shift/flash of untranslated text).
  - Client Components tự động đồng bộ qua `LanguageProvider` và hook `useLanguage()`.
- **Bảng Thông Báo Chọn Ngôn Ngữ (Language Consent Banner):**
  - Thẻ nổi kính mờ bóng đêm (`fixed bottom-6 right-6 z-50`) xuất hiện sau 700ms đối với người dùng truy cập lần đầu.
  - Hai lựa chọn trực quan: **🇻🇳 Tiếng Việt** hoặc **🇬🇧 English**.
  - Lưu lựa chọn với hạn 1 năm và tự động cập nhật thẻ `<html lang="...">`.
- **Từ điển tập trung:** Bộ từ điển `DICTIONARY` (`src/lib/i18n/dictionary.ts`) bao phủ 100% từ khóa và nhãn giao diện của toàn bộ trang web. Tuyệt đối không để lẫn lộn từ ngữ Việt - Anh.

### 2.3. Kho Dữ Liệu Seed Tập Trung 100% Danh Thắng Việt Nam (`@/data/seed`)
Toàn bộ dữ liệu mẫu được gom về một thư mục duy nhất `apps/public-site/src/data/seed/`:
- **`destinations.ts` (12 Kỳ quan & Điểm đến biểu tượng):**
  - *Miền Bắc:* Vịnh Hạ Long, Sa Pa, Tràng An - Ninh Bình, Hà Giang.
  - *Miền Trung:* Phố Cổ Hội An, Cố Đô Huế, Đà Nẵng, Vườn Quốc Gia Phong Nha - Kẻ Bàng.
  - *Miền Nam & Duyên Hải:* Đảo Ngọc Phú Quốc, Đà Lạt, Côn Đảo, Đồi Cát Mũi Né.
  - Toàn bộ dữ liệu đều có thông số tọa độ, thời điểm lý tưởng, mô tả song ngữ và ảnh sắc nét 100% Unsplash CDN.
- **`tours.ts` (8 Tour du lịch trọn gói cao cấp):**
  - Hành trình Hạ Long - Cát Bà (2N1Đ, 3N2Đ), Đà Lạt Mộng Mơ (3N2Đ), Sa Pa Chinh Phục Fansipan (3N2Đ), Tràng An - Bái Đính (1 Ngày), Phú Quốc Nghỉ Dưỡng Biển (4N3Đ), Con Đường Di Sản Miền Trung (4N3Đ), Đệ Nhất Kỳ Quan Phong Nha (3N2Đ), Khám Phá Cát Trắng Mũi Né (2N1Đ).
  - Đi kèm bảng lịch trình chi tiết từng ngày (itinerary timeline), danh mục dịch vụ bao gồm & không bao gồm, giá vé trọn gói.
- **`experiences.ts` (9 Gói trải nghiệm & phiêu lưu bản địa):**
  - Du thuyền kênh rạch Bến Tre, thuyền buồm Lan Hạ, leo núi Fansipan, cắm trại săn mây Tà Xùa, lặn ngắm san hô An Thới, kayak động Phong Nha, tour ẩm thực xe jeep Hội An, chèo SUP bình minh Nha Trang, lái môtô cát Bàu Trắng.
- **`stories.ts` (5 Bài viết cẩm nang & góc nhìn văn hóa):**
  - Cẩm nang khám phá vịnh Lan Hạ, nghệ thuật ẩm thực đường phố Hà Nội, kinh nghiệm săn mây đỉnh Tà Xùa, di sản lụa làng nghề Hội An, hành trình lặn biển san hô Nam Đảo Phú Quốc.
- **`history.ts` (11 Hồ sơ lịch sử & di sản văn hóa Việt Nam):**
  - Dữ liệu nghiên cứu sâu về 11 địa danh danh thắng (Hạ Long, Hội An, Tràng An, Huế, Đồng Văn, Sa Pa, Đà Lạt, Phú Quốc, Đà Nẵng, Nha Trang, Mũi Né) kèm thông số mùa lễ hội, ẩm thực đặc trưng và liên kết tour thực tế.
- **`index.ts` & `README.md`:** Cung cấp đối tượng xuất master `SEED_DATA`, các hàm tiện ích tra cứu nhanh (`getTourBySlug`, `getDestinationBySlug`, `getStoryBySlug`, `getExperienceBySlug`, `getHistoryBySlug`) và tài liệu hướng dẫn quản trị dữ liệu.

---

## 3. Danh Mục Thành Phần Giao Diện & Bố Cục Toàn Trang (UI Inventory)

### 3.1. Khung Toàn Trang (Global Layout)
1. **Thanh Điều Hướng Trên Cùng (Site Header):**
   - Vị trí: Cố định ở đầu trang, chế độ trong suốt phủ lên Hero (`overlay = true`) tại Trang chủ, và nền trắng bóng mờ tại các trang con.
   - Dải mạng xã hội (Bên trái): Icon Instagram, Twitter (X), Facebook với hiệu ứng hover đổi sắc thái.
   - Thanh menu chính (Ở giữa): Menu song ngữ (Trang Chủ, Gói Trải Nghiệm, Tour Tuyển Chọn, Về Chúng Tôi, Liên Hệ). Tự động giữ khoảng cách cân đối, chống tràn dòng (`whitespace-nowrap`).
   - Cụm tiện ích & Tài khoản (Bên phải):
     - Hotline tư vấn: `+84 903 846 568` kèm icon điện thoại (tự ẩn linh hoạt trên màn hình nhỏ).
     - Email: `contact@startravels.vn`.
     - Icon tài khoản: `UserRound` dạng nút bấm tròn tinh gọn, hỗ trợ tooltip trỏ đến `/account` hoặc `/login`.
     - Icon Mobile Navigation: Hamburger menu mở drawer điều hướng trượt mượt mà.
2. **Chân Trang (Site Footer):**
   - Logo thương hiệu trung tâm: Chữ *Star Travels* cổ điển sang trọng kết hợp biểu tượng Ngôi sao vàng (`#eab308`) phía sau.
   - Đường kẻ phân cách mỏng nhẹ trên nền cẩm thạch ngọc bích.
   - Menu 8 liên kết chân trang: Trang chủ, Điểm đến, Gói trải nghiệm, Tour trọn gói, Cẩm nang, Về chúng tôi, Liên hệ, Cổng đối tác.
   - Nút đổi ngôn ngữ: `🌐 Ngôn ngữ: Tiếng Việt · Thay đổi` mở lại Language Consent Banner.
   - Bản quyền Star Travels Vietnam song ngữ chuẩn mực.
3. **Thanh Điều Hướng Phân Cấp (Luxury Frosted Breadcrumb Pill):**
   - Component `<Breadcrumb />` (`src/components/shared/breadcrumb.tsx`).
   - Định dạng viên capsule kính mờ nổi (`bg-white/85 backdrop-blur-md border border-white/90 shadow-sm`), độ tương phản sắc nét đạt chuẩn WCAG 2.1 AA trên mọi hình nền.

### 3.2. Chi Tiết Các Khối Trên Trang Chủ (Home Page Sections)
1. **Hero Slider Banner (Trình Chiếu Kỳ Quan Rực Nắng):**
   - Trình chiếu 4 danh thắng biểu tượng ngập tràn ánh nắng tự nhiên: Vịnh Hạ Long (di sản thiên nhiên thế giới), Cầu Vàng Bà Nà Hills - Đà Nẵng, Ruộng bậc thang Mùa Vàng Sa Pa, và Quần thể non nước Tràng An Ninh Bình.
   - Lớp phủ gradient điện ảnh mềm mại giảm từ 65%-95% xuống mức 10%-35% cinematic tint, giúp cảnh quan thiên nhiên bừng sáng rực rỡ mà vẫn đảm bảo độ tương phản chữ hoàn hảo nhờ `drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]` và huy hiệu danh thắng (`✦ UNESCO / Biểu tượng du lịch`).
   - Cặp nút điều hướng mũi tên tròn kính mờ và hệ thống chấm chỉ báo màu vàng kim với hiệu ứng chuyển động Ken Burns êm ái.
2. **Thanh Tìm Kiếm & Khám Phá — Viên Capsule Kính Mờ Tối (Dark Glassmorphic Capsule Search Bar):**
   - *Khung chứa Container:* Viên con nhộng bo tròn toàn diện (`rounded-full` trên desktop, `rounded-3xl` trên mobile), nền kính mờ bóng đêm (`bg-black/50 backdrop-blur-2xl`), viền sáng tinh tế (`border border-white/25 hover:border-white/35`), đổ bóng sâu (`shadow-[0_12px_45px_rgba(0,0,0,0.5)]`).
   - *Dải Tab Phân Loại:* Viên capsule kính tối với tab đang chọn nổi bật sắc đỏ cờ Việt Nam (`bg-[#da251d] text-white font-bold rounded-full shadow-md`).
   - *5 Cột Thông Tin Tinh Gọn:* Điểm khởi hành, Điểm đến, Ngày đi, Ngày về, Số lượng khách. Ngăn cách bởi đường phân cách mờ (`border-white/15`), icon trắng mờ (`text-white/70`), nhãn tiêu đề mờ và giá trị trắng sắc nét.
   - *Nút Tìm Kiếm:* Nút bấm tròn màu đỏ cờ Việt Nam chuyên biệt (`bg-[#da251d] hover:bg-[#c92018] rounded-full size-11 sm:size-12`) với icon kính lúp trắng nổi bật.
   - *Bảng Chọn Lịch & Điểm Đến (Popovers):* Nền kính mờ tối sang trọng (`bg-slate-950/95 backdrop-blur-2xl border border-white/20 text-white`) với điểm nhấn màu đỏ cho ngày/địa điểm được chọn.
   - *Chế Độ Thu Gọn (Collapsed Mode):* Capsule tối giản thanh lịch `[ 🔍 Tìm kiếm hành trình | Hà Nội → Nha Trang ∨ ]` với hiệu ứng đóng mở tức thì.
3. **Danh Thắng Tuyển Chọn (Popular Destinations Carousel):**
   - Tiêu đề uốn lượn *"Điểm Đến Nổi Tiếng"*.
   - Thanh trượt 4 thẻ điểm đến (230x290 reference proportions) với hiệu ứng zoom ảnh nhẹ khi hover và dải tóm tắt chân thẻ cao chuẩn `92px`. 100% sử dụng hình ảnh chất lượng cao từ CDN Unsplash, loại bỏ hoàn toàn ảnh lỗi hay dữ liệu rác.
4. **Vì Sao Chọn Star Travels? (Why Choose Us):**
   - 3 khối giá trị cốt lõi kính mờ viền sáng: *Cam kết chất lượng* (Khiên bảo vệ), *Dịch vụ tận tâm* (Bắt tay trái tim), *Trải nghiệm độc bản* (La bàn phong cách).
5. **Trải Nghiệm Bản Địa Hôm Nay (Adventures Collage):**
   - Bố cục tranh ghép 3 cột (Collage 5 hoạt động): Du thuyền kênh rạch, Thuyền buồm Lan Hạ, Trekking Fansipan, Cắm trại săn mây, Lặn ngắm san hô.
   - Hộp chữ kính mờ tự trượt mượt mà khi hover để du khách ngắm trọn vẹn cảnh sắc thiên nhiên.
6. **Tour Du Lịch Tuyển Chọn (Featured Tours Carousel):**
   - Lưới hiển thị các gói tour trọn gói 4 cột. Huy hiệu thời lượng (vd: *3 Ngày 2 Đêm*), ảnh bìa 4:3, giá tour rõ ràng và liên kết xem chi tiết.
7. **Bản Tin Du Lịch & Vinh Danh Di Sản (Newsletter & Award Winning):**
   - Cột trái: Form đăng ký nhận bản tin với phản hồi thành công tức thì.
   - Cột phải: Lưới 2x3 vinh danh 6 danh lam thắng cảnh UNESCO / giải thưởng quốc tế.
8. **Mục Kêu Gọi Khám Phá (Looking for an Experience CTA):**
   - Khung nền sáng bóng mờ giữa 2 dải viền trang nhã với nút bấm viền đen cổ điển dẫn tới danh mục trải nghiệm.
9. **Trợ Lý AI Du Lịch STAR (Floating AI Concierge "Nền đỏ sao vàng"):**
   - Nút kích hoạt cố định góc dưới bên phải: Gradient đỏ quốc kỳ (`from-[#991b1b] via-[#da251d] to-[#dc2626]`), vầng hào quang phát sáng nhẹ (`bg-[#da251d]/35`), ngôi sao vàng kim 5 cánh (`<StarLogo variant="icon-only" size="md" />` màu `#EAB308`).
   - Chu kỳ hiển thị Tooltip thông minh: Xuất hiện 5 giây mỗi 20 giây một lần với lời chào *"✦ Trợ lý AI Du Lịch STAR — Tư vấn lịch trình di sản 24/7"*, tự động ẩn khi mở chat.
   - Hộp thoại trò chuyện Streaming: Trả lời theo văn phong sang trọng, kết nối tri thức lịch sử di sản, trích xuất thẻ Tour tương tác và hỗ trợ thu thập lead tự động đẩy về CRM.

---

## 4. Danh Mục 23 Tuyến Đường & Khối Giao Diện (Route Inventory)

| Tuyến Đường (Route) | Tên Trang | Các Khối UI Chính Thể Hiện |
|---|---|---|
| `/` | Trang Chủ | Hero Slider (4 danh thắng rực nắng), Dark Capsule Search Bar (tích hợp tab Nơi Ở & Ẩm Thực), Destinations Carousel, Why Us, Adventures Collage, Featured Tours, Newsletter & Awards, Looking for CTA, AI Concierge Bubble. |
| `/destinations` | Danh Sách Điểm Đến | Bộ lọc vùng miền (Bắc, Trung, Nam), lưới danh thắng 12 kỳ quan 100% Việt Nam, giá khởi điểm tham khảo. |
| `/destinations/[slug]` | Chi Tiết Điểm Đến | Banner toàn cảnh, tổng quan di sản, thời điểm lý tưởng, bản đồ toạ độ, danh sách tour & trải nghiệm liên kết. |
| `/tours` | Danh Mục Tour Trọn Gói | Bộ lọc vùng miền, lọc mức giá (<3tr, 3-6tr, >6tr), sắp xếp thời lượng/giá, lưới thẻ tour trọn gói. |
| `/tours/[slug]` | Chi Tiết Tour | Gallery ảnh thực tế, lịch trình Day-by-day Itinerary, bảng Dịch vụ Bao Gồm & Không Bao Gồm, Thẻ đặt tour trực tuyến `TourBookingCard` với tính năng phòng vệ giá server-side. |
| `/accommodations` | Khách Sạn & Nghỉ Dưỡng | Smart Concierge Wizard hỏi khu vực nghỉ dưỡng, Bộ lọc Vibe (resort biển, di sản, núi rừng, boutique), Nút định vị GPS "Tìm gần vị trí của tôi", Sắp xếp khoảng cách gần nhất, Lưới thẻ `AccommodationCard` hiển thị cự ly Haversine (`~850 m`, `~1.2 km`), Referral Booking tới đối tác (Booking.com, Agoda...). |
| `/restaurants` | Nhà Hàng & Ẩm Thực | Smart Gourmet Wizard hỏi khu vực ẩm thực, Bộ lọc phong vị (Michelin 1 Sao, hải sản cao cấp, 3 miền, ven sông lãng mạn), Nút định vị GPS "Tìm gần vị trí của tôi", Sắp xếp cự ly gần nhất, Lưới thẻ `RestaurantCard` hiển thị cự ly Haversine, Referral Booking đặt bàn đối tác uy tín. |
| `/experiences` | Gói Trải Nghiệm | Phân loại hoạt động (Du thuyền, Trekking, Lặn biển, Văn hóa), bộ lọc địa lý GPS, lưới thẻ `PlaceCard`. |
| `/experiences/[slug]` | Chi Tiết Trải Nghiệm | Banner trải nghiệm, nút Yêu thích (`FavoriteButton`), thông số đoàn khách, thẻ đặt chỗ tương tác `ExperienceBookingCard`, biểu mẫu đánh giá `ReviewForm`. |
| `/stories` | Cẩm Nang & Hành Trình | Bài viết tâm điểm (Featured Hero Story), danh sách cẩm nang du lịch, thời gian đọc ước tính, đăng ký nhận bài. |
| `/stories/[slug]` | Chi Tiết Bài Viết | Dàn trang chuẩn tạp chí lữ hành, tác giả, ảnh minh họa chất lượng cao kèm chú thích, thẻ từ khóa phân loại. |
| `/about` | Về Chúng Tôi | Câu chuyện thương hiệu STAR, 3 trụ cột triết lý dịch vụ, lưới 6 giải thưởng vinh danh di sản. |
| `/contact` | Liên Hệ & Hỗ Trợ 24/7 | Hotline, email, giờ tư vấn, biểu mẫu `ContactForm` tích hợp checkbox đồng ý xử lý dữ liệu NĐ 13/2023, bản đồ trụ sở Hà Nội & TP.HCM, Accordion FAQ. |
| `/partner` | Cổng Hợp Tác Đối Tác | 4 giá trị đồng hành, quy trình hợp tác 4 bước, biểu mẫu đăng ký đại lý/khách sạn trực tuyến `PartnerForm`. |
| `/login` | Đăng Nhập | Biểu mẫu `LoginForm` xử lý xác thực an toàn, điều hướng theo vai trò (Customer hoặc Partner). |
| `/register` | Đăng Ký | Biểu mẫu `RegisterForm` đăng ký thành viên mới kèm checkbox đồng ý Điều khoản & Chính sách quyền riêng tư. |
| `/account` | Trang Quản Lý Cá Nhân | Kiểm tra phiên server-side, thông tin cá nhân, phân quyền tài khoản, liên kết xem đơn hàng, nút `LogoutButton`. |
| `/account/bookings` | Quản Lý Đơn Đặt Chỗ | Dashboard danh sách đơn đặt tour & referral bookings, bộ lọc trạng thái, huy hiệu cảnh báo chờ thanh toán VietQR (`pending_payment`), nút chuyển tiếp thanh toán nhanh. |
| `/booking/[id]/payment` | Cổng Thanh Toán Đa Kênh | Bộ chọn cổng thanh toán (VietQR Chuyển khoản ngân hàng / VNPay Thẻ & QR), mã QR EMVCo cỡ lớn, nút 1-click sao chép STK/Số tiền/Nội dung, đồng hồ đếm ngược 15 phút, tự động polling trạng thái mỗi 5 giây. |
| `/booking/[id]/success` | Xác Nhận Đặt Chỗ | Màn hình chúc mừng thanh toán thành công, mã đặt chỗ, thông tin tour, hướng dẫn liên hệ và chuẩn bị hành lý. |
| `/payment/return` | Callback Cổng VNPay | Trang tiếp nhận kết quả trả về từ VNPay Sandbox, tự động polling backend mỗi 3 giây (tối đa 21s) xác nhận trạng thái IPN, hiển thị biên lai giao dịch. |
| `/privacy` | Chính Sách Bảo Mật | Quy chế bảo vệ dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP (quyền chủ thể dữ liệu, mục đích thu thập, bảo mật tọa độ GPS, thời hạn lưu trữ, liên hệ DPO). |
| `/terms` | Điều Khoản Dịch Vụ | Quy chế sàn thương mại điện tử theo Nghị định 52/2013/NĐ-CP (quy định giao dịch tour, giới hạn trách nhiệm giới thiệu đối tác referral, giải quyết tranh chấp). |
| `/unauthorized` | Báo Lỗi Quyền Hạn (403) | Trang thông báo không đủ quyền hạn truy cập tài nguyên bảo mật với điều hướng an toàn về Trang chủ. |
| `/not-found` | Trang Báo Lỗi 404 | Thiết kế Anima với biểu tượng La bàn mờ, thông điệp song ngữ lịch sự, điều hướng nhanh về Trang chủ & Tour. |
| `error.tsx` | Client Error Boundary | Giao diện phục hồi lỗi runtime phong cách sang trọng Anima với nút "Thử tải lại trang" an toàn. |
| `/sitemap.xml` | XML Sitemap | Tự động sinh danh mục 40+ liên kết bao gồm mọi static pages, điểm đến, tour, trải nghiệm, cẩm nang, khách sạn, nhà hàng. |
| `/robots.txt` | Robots.txt | Cấu hình chỉ dẫn crawler Googlebot, Bingbot trỏ chính xác về sitemap. |
| `/api/assistant/chat` | AI Proxy Route Handler | Route Handler Next.js chuyển tiếp yêu cầu chat an toàn tới Django backend trong container Docker. |

---

## 5. Quy Chuẩn Parity Anima & Thích Ứng Đáp Ứng (Anima Parity & Responsive Adaptation)

### 5.1. Desktop Reference Baseline (Bám sát thiết kế Anima gốc)
Visual baseline: 5 ảnh chụp màn hình thiết kế gốc đối chiếu được lưu trữ trong `docs/design-reference/`:
- **Canvas target:** Khung hiển thị chuẩn desktop 1197px (hoặc container `max-w-[1240px]` mở rộng).
- **Hero Banner:** Bố cục tỉ lệ tương đương `rectangle-3.svg`, hiển thị thông điệp sang trọng Abril Fatface + Grape Nuts / Yellowtail script.
- **Dải liên hệ & mạng xã hội:** Nằm trên thanh điều hướng chính, căn chỉnh cân xứng.
- **Thanh tìm kiếm:** Nền trắng mờ / kính mờ, dải tab màu xanh teal đặc trưng.
- **Thẻ điểm đến nổi tiếng:** Giữ nguyên tỷ lệ chuẩn gốc 230x290px.
- **Section đại dương / video:** Tương đương bố cục `rectangle-64.svg`.
- **Nền trang cẩm thạch:** Khai thác họa tiết `rectangle-65.svg` khi có sẵn.
- **Thẻ Why Us:** Kính mờ trong suốt bo góc nhẹ viền sáng đổ bóng tinh tế.
- **Adventure Layout:** Bố cục tranh ghép 5 hình ảnh/overlay tương ứng của bản thiết kế Anima.
- **Newsletter & Award Winning:** Giữ nguyên cấu trúc 2 cột cân xứng.
- **Final CTA:** Bố cục tương thích `rectangle-112.svg`.
- **Footer:** Giữ nguyên dấu ấn logo thương hiệu kết hợp nét ký script tinh tế.

### 5.2. Chuyển Đổi Từ Tọa Độ Cố Định Sang Responsive Grid/Flex
Bản xuất Anima ban đầu sử dụng tọa độ cố định (`position: absolute`). Mã nguồn sản xuất `apps/public-site` đã chuyển đổi triệt để sang:
- Hệ thống **CSS Grid & Flexbox** tự co giãn theo kích thước màn hình.
- Giữ nguyên độ trung thực về thị giác trên màn hình Desktop (>= 1200px).
- Co giãn mượt mà trên Tablet (768px - 1024px) và Mobile (< 768px), chống tràn ngang (zero horizontal scroll).

### 5.3. Tự Lưu Trữ Tài Nguyên Anima (Asset Self-Hosting)
Để loại bỏ sự phụ thuộc vào Anima CDN khi triển khai production:
```bash
# Tải toàn bộ vector/hình ảnh Anima về public/assets/
python scripts/download_anima_assets.py
```
Sau đó kích hoạt biến môi trường:
```env
NEXT_PUBLIC_USE_LOCAL_ANIMA_ASSETS=1
```

---

## 6. Trải Nghiệm Người Dùng, Tối Ưu Tốc Độ & Khả Năng Truy Cập (UX & Performance)

1. **Hiệu Ứng Lướt Điện Ảnh (Cinematic Scroll Reveal):**
   - Thời gian chuyển động: **1.15s (1150ms)** với gia tốc `cubic-bezier(0.16, 1, 0.3, 1)`.
   - Cơ chế Direct DOM Class Toggling (`classList.add("reveal-active")`) qua native `IntersectionObserver`, không kích hoạt React re-render, đạt 60fps/120fps GPU acceleration.
   - Loại bỏ hoàn toàn xung đột transform lồng nhau (Zero Nested Transform Conflict).
2. **Khử Giật Khung Hình & Tối Ưu GPU:**
   - Dùng `transform: translate3d(0, 0, 0)` và `backface-visibility: hidden` cho các hoạt ảnh Ken Burns.
   - Thay thế `backdrop-blur` diện tích lớn bằng lớp nền phẳng tối ưu độ trong suốt để cuộn mượt mà trên mọi card đồ họa.
3. **Cân Bằng Kiểu Chữ (Text Balance):**
   - 100% tiêu đề lớn sử dụng `text-balance` loại bỏ hoàn toàn chữ rớt dòng đơn lẻ.
4. **Hỗ Trợ Vuốt Chạm Di Động (Mobile Touch & Swipe):**
   - Cung cấp thao tác vuốt cảm ứng trên Hero Slider, Featured Tours và Destinations Carousel.
5. **Tiêu Chuẩn Tiếp Cận & SEO (WCAG 2.1 AA):**
   - Đầy đủ nhãn `aria-label` cho tất cả icon button.
   - Toàn bộ hình ảnh sử dụng Next.js `<Image />` có kích thước cụ thể, triệt tiêu CLS (Cumulative Layout Shift = 0).

---

## 7. Vận Hành Quản Trị Hệ Thống (Admin & Backoffice Operations)

Nhằm đảm bảo quá trình vận hành thường nhật của doanh nghiệp diễn ra trơn tru, đội ngũ chuyên viên STAR Travels được trang bị hai công cụ quản trị tương hỗ:

### 7.1. Cổng Quản Trị Django Backoffice Admin (`/admin`)
Được thiết kế giao diện sang trọng, thuần Việt và trực quan:
1. **Kiểm duyệt Đánh giá Trải nghiệm (`/admin/reviews/review/`):**
   - Mặc định các đánh giá mới gửi từ người dùng ở trạng thái `is_approved = FALSE` để phòng chống nội dung độc hại hoặc spam quảng cáo.
   - Chuyên viên kiểm duyệt nội dung, kiểm tra điểm sao (1 - 5 sao), xem xét bình luận và bấm action *"Phê duyệt hiển thị"* để xuất bản lên website công khai.
2. **Tiếp nhận & Phân loại Yêu cầu tư vấn (`/admin/inquiries/inquiry/`):**
   - Quản trị viên theo dõi danh sách yêu cầu theo thời gian thực: Đặt tour (`tour_booking`), Tư vấn chung (`general_inquiry`), hay Đăng ký tour đoàn công ty.
   - Xem đầy đủ thông tin: Khách hàng, SĐT, Ngày khởi hành dự kiến, Số lượng khách và Cập nhật trạng thái xử lý (`Mới`, `Đang liên hệ`, `Đã chốt tour`, `Đóng`).
3. **Quản lý Đơn đặt tour & Tình trạng thanh toán (`/admin/bookings/booking/`):**
   - Danh sách chi tiết các mã đặt chỗ `ST-XXXXXX`, đối chiếu số tiền thanh toán thực tế, xuất danh sách hành khách đoàn đi tour cho hướng dẫn viên.

### 7.2. Cổng Quản Trị ERP Doanh Nghiệp Odoo 18 (`https://erp.startravels.vn`)
Dành cho phòng ban Kinh doanh (Sales), Điều hành Tour và Kế toán:
- **Phân hệ CRM (`crm.lead`):** Bảng Kanban trực quan gồm 4 giai đoạn (*"Mới tiếp nhận"* -> *"Đang tư vấn"* -> *"Gửi báo giá"* -> *"Đã ký hợp đồng / Won"*). Toàn bộ Lead thu thập từ AI Chatbot, Form Inquiry và Giữ chỗ nhanh đều tự động đổ về đây và gán cho chuyên viên sale phụ trách vùng miền tương ứng.
- **Phân hệ Bán hàng & Kế toán (`sale.order` & `account.move`):** Quản lý hợp đồng lữ hành, theo dõi dòng tiền, và đối soát xuất hóa đơn điện tử tự động.

---

## 8. Đo Lường Hiệu Quả & Theo Dõi Chuyển Đổi (Analytics & Conversion Tracking)

Hệ thống tích hợp sẵn các công cụ theo dõi chuyển đổi tiêu chuẩn quốc tế:
- **Google Analytics 4 (GA4):** Tích hợp qua Next.js Third Parties (`@next/third-parties/google`) với Measurement ID `G-XXXXXXXXXX`.
- **Meta Pixel (Facebook Pixel):** Tích hợp qua Script component tối ưu tốc độ (Pixel ID `XXXXXXXXXXXXXXX`).

### Ma Trận Sự Kiện Theo Dõi Chuyển Đổi Chuẩn E-Commerce:

| Sự kiện (Event Name) | Điều kiện kích hoạt (Trigger) | Tham số gửi kèm (Parameters / Payload) | Mục đích phân tích |
| :--- | :--- | :--- | :--- |
| `page_view` | Mỗi khi người dùng chuyển trang | `page_location`, `page_title`, `language` | Đo lưu lượng truy cập toàn trang |
| `view_item_list` | Khi vào `/destinations` hoặc `/tours` | `item_list_id`, `item_list_name` ("Tours Tuyển Chọn") | Đo mức độ quan tâm danh mục sản phẩm |
| `view_item` | Khi vào trang chi tiết `/tours/[slug]` | `currency: "VND"`, `value: price`, `items: [{ item_id, item_name, price, region }]` | Đo tỷ lệ xem từng gói tour cụ thể |
| `generate_lead` | Khi gửi form Liên hệ, Inquiry, hoặc AI chat lấy được số điện thoại | `lead_type: "inquiry" | "ai_concierge"`, `destination`, `estimated_pax` | Đo lường tỷ lệ tạo khách hàng tiềm năng |
| `begin_checkout` | Khi bấm nút *"Yêu Cầu Giữ Chỗ / Đặt Tour"* trên `TourBookingCard` | `currency: "VND"`, `value: total_amount`, `items: [...]` | Đo lường ý định mua hàng thực tế |
| `purchase` | Khi hoàn tất đặt tour / thanh toán thành công tại `/booking/success/[code]` | `transaction_id: "ST-XXXXXX"`, `value: total_amount`, `currency: "VND"`, `tax: vat_amount` | Đo lường doanh thu thương mại điện tử |
| `partner_application`| Khi nộp hồ sơ đối tác thành công tại `/partner` | `business_name`, `partner_type` | Đo hiệu quả tuyển dụng đại lý lữ hành B2B |

---

## 9. Tiêu Chuẩn Hiệu Năng & Core Web Vitals (Core Web Vitals SLA Targets)

Nhằm tối ưu hóa trải nghiệm sang trọng và giữ vững vị thế hàng đầu về kỹ thuật SEO trên Google Search Console, hệ thống cam kết tuân thủ các chỉ số hiệu năng định lượng nghiêm ngặt:

```
┌──────────────────────────────────────┬───────────────────────────────┬───────────────────┐
│ Chỉ số đo lường (Metric)             │ Ngưỡng Mục Tiêu (Target SLA)   │ Ngưỡng Đạt Chuẩn  │
├──────────────────────────────────────┼───────────────────────────────┼───────────────────┤
│ LCP (Largest Contentful Paint)       │ < 1.8 giây                    │ < 2.5 giây        │
│ INP (Interaction to Next Paint)      │ < 100 mili-giây               │ < 200 mili-giây   │
│ CLS (Cumulative Layout Shift)        │ < 0.02                        │ < 0.10            │
│ TTFB (Time to First Byte)            │ < 350 mili-giây               │ < 800 mili-giây   │
│ First Contentful Paint (FCP)         │ < 1.0 giây                    │ < 1.8 giây        │
└──────────────────────────────────────┴───────────────────────────────┴───────────────────┘
```

- **Chiến lược kỹ thuật bảo đảm chỉ số:**
  1. **LCP < 2.5s:** Ưu tiên tải Hero Banner bằng thuộc tính `priority` của Next.js `<Image />`, nén ảnh WebP/AVIF qua Cloudflare CDN, preload Google Fonts (Inter, Playfair Display) tại thẻ `<head>`.
  2. **INP < 200ms:** Loại bỏ hoàn toàn render-blocking JavaScript, chia nhỏ các macro-tasks của main thread, ứng dụng CSS GPU-accelerated transforms (`translate3d`).
  3. **CLS < 0.1:** Quy định tỷ lệ khung hình cố định (aspect-ratio) cho toàn bộ thẻ tour, banner điểm đến; khai báo kích thước chính xác cho logo SVG và khung breadcrumb.
  4. **TTFB < 800ms:** Sử dụng Incremental Static Regeneration (ISR) với `revalidate = 3600` cho các trang danh mục static, kết hợp Edge Caching trên mạng phân phối toàn cầu.

---

## 10. Cơ Chế Giữ Chỗ Tạm Thời Của TourBookingCard Trong Giai Đoạn 1 (Phase 1 Fast Reservation Behavior)

Trong Giai đoạn 1 (Phase 1), khi cổng thanh toán trực tuyến tự động (VNPay/MoMo) đang ở giai đoạn tích hợp thử nghiệm kiểm định chất lượng, component `TourBookingCard` (`src/components/tours/tour-booking-card.tsx`) hoạt động theo cơ chế **"Fast Reservation / Yêu Cầu Giữ Chỗ Nhanh"**:

### 10.1. Luồng Trải Nghiệm Khách Hàng (User Flow)
1. **Lựa chọn thông số:** Du khách chọn Ngày khởi hành mong muốn, số lượng Khách người lớn và Trẻ em. Giá tạm tính tự động cập nhật theo công thức niêm yết.
2. **Nút bấm kích hoạt:** Nút bấm mang nhãn rõ ràng: **"✦ Yêu Cầu Giữ Chỗ Nhanh"** (*"Request Reservation"*).
3. **Modal Thu thập thông tin:** Khi du khách bấm nút, Modal kính mờ mở ra yêu cầu:
   - Họ và tên người liên hệ.
   - Số điện thoại di động / Zalo (bắt buộc để điều phối viên gọi xác nhận).
   - Email nhận thông tin xác nhận.
   - Yêu cầu đặc biệt (ăn chay, xe đưa đón riêng, phòng gia đình...).
4. **Cam kết tâm lý & An tâm (Trust Copywriting):**
   - Huy hiệu nổi bật: `✦ Giữ Chỗ Miễn Phí 100% · Linh Hoạt Thanh Toán Sau`.
   - Dòng thông điệp cam kết hiển thị ngay trên thẻ:
     > *"Chuyên viên STAR sẽ liên hệ xác nhận tình trạng chỗ và hướng dẫn hoàn tất thanh toán trong vòng 15 phút. Quý khách chưa cần thanh toán bất kỳ khoản tiền nào ngay lúc này."*

### 10.2. Luồng Xử Lý Kỹ Thuật (Technical Processing)
- Form thực hiện gửi yêu cầu `POST /api/v1/inquiries/` với payload cấu trúc:
  ```json
  {
    "type": "tour_booking",
    "destination_slug": "ha-long",
    "tour_slug": "ha-long-2n1d",
    "travel_date": "2026-10-25",
    "traveler_count": 2,
    "customer": {
      "name": "Nguyễn Văn Du Khách",
      "email": "traveler@example.com",
      "phone": "0912345678"
    },
    "metadata": {
      "adult_count": 2,
      "child_count": 0,
      "estimated_total": 6400000,
      "note": "Khách cần phòng tầng cao view vịnh."
    }
  }
  ```
- **Xử lý Backend:**
  - Bản ghi được lưu vào bảng `inquiries_inquiry` (trạng thái `new`).
  - Outbox sinh sự kiện `inquiry.created` -> Celery đẩy thẳng sang Odoo ERP `crm.lead` với Tag `[FAST_BOOKING]` và mức ưu tiên cao nhất (3 sao).
  - Trả về mã yêu cầu giữ chỗ tạm thời (ví dụ: `REQ-202610-8912`).
  - Giao diện hiển thị màn hình chúc mừng trang trọng kèm các nút tiện ích: **"Chat Zalo với tư vấn viên"** hoặc **"Gọi Hotline 0903 846 568"**.

---

## 11. Hệ Thống Gợi Ý Thông Minh & Định Vị Khoảng Cách GPS (Smart Concierge Wizard & Haversine Geolocation)

Nhằm nâng cao trải nghiệm khách hàng tìm kiếm địa điểm lưu trú (`/accommodations`) và ẩm thực (`/restaurants`), hệ thống tích hợp công nghệ tương tác thông minh kết hợp định vị vệ tinh GPS:

### 11.1. Bộ Hỏi Nhu Cầu Tương Tác (Smart Concierge Wizard)
- **Gợi ý theo Vùng miền:** Hỏi trực diện khách muốn trải nghiệm tại khu vực nào (Phú Quốc, Đà Nẵng, Hội An, Hạ Long, Sa Pa, Hà Nội, Huế, Nha Trang, Ninh Bình, TP.HCM) kèm bộ đếm số lượng cơ sở thực tế.
- **Lọc theo Phong vị & Phong cách (Vibe Chips):**
  - Khách sạn: Resort ven biển & Bãi riêng, Khách sạn di sản & Cổ điển, Ecolodge & Núi rừng, Boutique sang trọng, Đánh giá xuất sắc (4.9+).
  - Nhà hàng: Michelin Guide & Fine Dining, Hải sản tươi sống cao cấp, Cơm truyền thống & Món quê 3 miền, Ven sông & Hẹn hò lãng mạn, Đặc sản phố cổ & Cung đình.
- **Huy hiệu Gợi ý Hàng đầu (`✦ GỢI Ý STAR HÀNG ĐẦU`):** Tự động phát sáng và ghim lên đầu cơ sở phù hợp nhất kèm lý do tư vấn tường minh (ví dụ: *"Được đánh giá cao nhất tại Đà Nẵng"* hoặc *"Gần vị trí của bạn nhất (~850 m)"*).
- **Hỏi Trợ lý AI 1-Click:** Nút bấm phát sự kiện `star:open-ai-concierge` nạp sẵn ngữ cảnh khu vực đang chọn để mở hộp thoại trò chuyện tư vấn tức thì.

### 11.2. Động Cơ Định Vị GPS & Khoảng Cách Haversine (`@/lib/geo-utils.ts`)
- **Tuân thủ quyền riêng tư:** Nút bấm **"Tìm gần vị trí của tôi"** chỉ kích hoạt khi người dùng bấm trực tiếp; không thu thập dữ liệu ngầm.
- **Công thức tính khoảng cách Haversine:**
  $$\Delta\sigma = 2 \arcsin \sqrt{\sin^2\left(\frac{\Delta\phi}{2}\right) + \cos(\phi_1)\cos(\phi_2)\sin^2\left(\frac{\Delta\lambda}{2}\right)}$$
  $$d = R \cdot \Delta\sigma \quad (R = 6371\text{ km})$$
- **Quy đổi cự ly thân thiện:** Cự ly < 1 km hiển thị dạng mét (`850 m`), cự ly >= 1 km hiển thị kilômét (`1.2 km`, `3.5 km`).
- **Tùy chọn sắp xếp:** Bổ sung tùy chọn **"Khoảng cách gần nhất"** trong menu sắp xếp khi tọa độ GPS người dùng khả dụng.

---

## 12. Mô Hình Đặt Chỗ Giới Thiệu Đối Tác (Affiliate Referral Booking Architecture)

Áp dụng cho 2 phân hệ Khách Sạn (`/accommodations`) và Nhà Hàng (`/restaurants`):

### 12.1. Bản Chất Nghiệp Vụ
- **Không thanh toán qua STAR:** STAR Travels đóng vai trò cổng tuyển chọn và giới thiệu độc quyền tới các đối tác uy tín (Booking.com, Agoda, Traveloka, TableCheck, Hotline đặt bàn riêng).
- **Ghi nhận chuyển đổi (Referral Tracking):** Mỗi lượt khách bấm nút **"Đặt phòng qua Booking.com"** hoặc **"Đặt bàn đối tác"** BẮT BUỘC được lưu lại thành 1 bản ghi `bookings_booking` với `item_type = 'accommodation_referral'` hoặc `'restaurant_referral'`.

### 12.2. Kỹ Thuật Tracking Ngầm Không Nghẽn (Non-blocking 1.5s Beacon)
- Khi khách bấm đặt chỗ, hiển thị modal thông báo chuyển tiếp đối tác chính thức (`ReferralAdvisoryModal`).
- Thực hiện gửi beacon ngầm bằng `navigator.sendBeacon` hoặc `fetch(keepalive)` tới API `POST /api/v1/referrals/track/`.
- Không tạo giao dịch tiền mặt `payments_transaction`.
- Đồng bộ thông tin chuyển đổi sang Odoo CRM dưới dạng Lead tiềm năng phục vụ đàm phán hoa hồng và báo cáo đối tác.

---

## 13. Tuân Thủ Pháp Lý & An Toàn Dữ Liệu (Legal & Privacy Compliance)

1. **Nghị định 13/2023/NĐ-CP về Bảo vệ Dữ liệu Cá nhân:**
   - Trang `/privacy` công bố chi tiết quyền của chủ thể dữ liệu, mục đích xử lý thông tin, và đầu mối DPO.
   - Các biểu mẫu Đăng ký (`/register`), Liên hệ (`/contact`), Giữ chỗ (`TourBookingCard`) đều tích hợp checkbox đồng ý bắt buộc.
   - Tọa độ GPS chỉ xử lý cục bộ trên trình duyệt để tính cự ly, không lưu trữ hồ sơ theo dõi vị trí cá nhân.
2. **Nghị định 52/2013/NĐ-CP & Nghị định 85/2021/NĐ-CP về Thương mại Điện tử:**
   - Chân trang `SiteFooter` hiển thị đầy đủ thông tin pháp nhân: MST `0110896868`, Giấy phép Lữ hành Quốc tế số `01-2026/TCDL-GP LHQT`, trụ sở, hotline hỗ trợ 24/7.
   - Trang `/terms` quy định rõ quyền và nghĩa vụ khách hàng, quy chế thanh toán tour, và miễn trừ trách nhiệm pháp lý đối với các dịch vụ referral chuyển tiếp tới bên thứ ba.
   - Huy hiệu Đã Thông Báo Bộ Công Thương hiển thị trang trọng tại footer.

