# Tổng Quan Toàn Diện Website Public (Public Site Overview)

> **Tài liệu đặc tả kiến trúc, các trang, tính năng và giao diện người dùng**  
> **Dự án:** STAR Travels Vietnam — Nền tảng Du lịch & Trải nghiệm Bản địa  
> **Ứng dụng:** `apps/public-site` (Next.js 15 App Router, React 19, Tailwind CSS, TypeScript)  
> **Tình trạng:** Hoàn thiện 100% tính năng Public, Song ngữ Việt - Anh, Dữ liệu Seed 100% Việt Nam  
> **Cập nhật:** Tháng 10/2026

---

## 1. Giới Thiệu & Ngăn Xếp Kỹ Thuật (Tech Stack)

Cổng thông tin người dùng công khai (`apps/public-site`) được thiết kế theo ngôn ngữ thẩm mỹ sang trọng, kết hợp giữa tinh thần di sản Việt Nam và trải nghiệm lữ hành chuẩn quốc tế. Toàn bộ giao diện bám sát phong cách **Anima Travel Company / Star Travels**, nổi bật với gam màu cẩm thạch ngọc bích, điểm nhấn xanh lục bảo (#0098a2), typography nghệ thuật Yellowtail và chất liệu kính mờ (glassmorphism).

| Hạng mục | Công nghệ / Tiêu chuẩn sử dụng | Mô tả & Vai trò |
|---|---|---|
| **Framework** | Next.js 15 (App Router) & React 19 | Server Components (RSC) kết hợp Client Components chọn lọc, Server Actions |
| **Styling** | Tailwind CSS v3 & Vanilla CSS tokens | Custom utilities, thiết kế `rounded-[2px]`, hiệu ứng kính mờ `backdrop-blur` |
| **Typography** | Inter, Playfair Display & Yellowtail Script | Font chữ cân bằng, tiêu đề uốn lượn sang trọng, `text-balance` chống rớt chữ |
| **Đa ngôn ngữ** | Hệ thống i18n Song ngữ độc quyền | Context API, Cookies (`star_travels_locale`), Banner chọn ngôn ngữ quốc tế |
| **Dữ liệu Seed** | Kho dữ liệu tập trung `@/data/seed` | 100% danh lam thắng cảnh Việt Nam, đầy đủ fallback khi chưa kết nối CMS/API |
| **BFF & Auth** | Next.js Route Handlers + HTTP-Only Cookies | Bảo vệ token JWT, proxy an toàn đến backend Django REST Framework |
| **SEO & Chia sẻ** | Next.js Metadata, Dynamic Sitemap & Robots | OpenGraph, Twitter Cards, Semantic HTML5, Schema.org Organization |

---

## 2. Hệ Thống Kiến Trúc Nền Tảng (Core Architecture)

### 2.1. Chuẩn Nhận Diện Thương Hiệu STAR (Brand Identity & Logo)
Theo quy chuẩn thương hiệu tại `.agents/skills/brand-identity-and-logo`:
- **Tên thương hiệu chính thức:** **`STAR`** (mô tả hệ sinh thái: *STAR Travels*).
- **Cấu trúc logo bắt buộc:** Bao gồm 2 thành tố không thể tách rời:
  1. **Chữ thương hiệu:** Kiểu chữ script cổ điển, phóng khoáng và sang trọng.
  2. **Biểu tượng Ngôi sao (Star Emblem):** Ngôi sao vector 5 cánh đối xứng màu vàng kim (`#EAB308`), tỷ lệ chuẩn vàng $0.382$, tạo hiệu ứng chiều sâu phía sau chữ *Star*.
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
  - Toàn bộ dữ liệu đều có thông số tọa độ, thời điểm lý tưởng, mô tả song ngữ và ảnh sắc nét.
- **`tours.ts` (8 Tour du lịch trọn gói cao cấp):**
  - Hành trình Hạ Long - Cát Bà (2N1Đ, 3N2Đ), Đà Lạt Mộng Mơ (3N2Đ), Sa Pa Chinh Phục Fansipan (3N2Đ), Tràng An - Bái Đính (1 Ngày), Phú Quốc Nghỉ Dưỡng Biển (4N3Đ), Con Đường Di Sản Miền Trung (4N3Đ), Đệ Nhất Kỳ Quan Phong Nha (3N2Đ), Khám Phá Cát Trắng Mũi Né (2N1Đ).
  - Đi kèm bảng lịch trình chi tiết từng ngày (itinerary timeline), danh mục dịch vụ bao gồm & không bao gồm, giá vé trọn gói.
- **`experiences.ts` (9 Gói trải nghiệm & phiêu lưu bản địa):**
  - Du thuyền kênh rạch Bến Tre, thuyền buồm Lan Hạ, leo núi Fansipan, cắm trại săn mây Tà Xùa, lặn ngắm san hô An Thới, kayak động Phong Nha, tour ẩm thực xe jeep Hội An, chèo SUP bình minh Nha Trang, lái môtô cát Bàu Trắng.
- **`stories.ts` (5 Bài viết cẩm nang & góc nhìn văn hóa):**
  - Cẩm nang khám phá vịnh Lan Hạ, nghệ thuật ẩm thực đường phố Hà Nội, kinh nghiệm săn mây đỉnh Tà Xùa, di sản lụa làng nghề Hội An, hành trình lặn biển san hô Nam Đảo Phú Quốc.
- **`index.ts` & `README.md`:** Cung cấp đối tượng xuất master `SEED_DATA`, các hàm tiện ích tra cứu nhanh (`getTourBySlug`, `getDestinationBySlug`, `getStoryBySlug`, `getExperienceBySlug`) và tài liệu hướng dẫn quản trị dữ liệu.

---

## 3. Khung Giao Diện Dùng Chung (Global Layout & Navigation)

### 3.1. Thanh Điều Hướng (Site Header)
- **Vị trí & Cơ chế:**
  - Cố định ở đầu trang, chế độ trong suốt phủ lên banner (`overlay = true`) tại Trang chủ và các trang chi tiết có Hero Image.
  - Tự động chuyển sang nền trắng đục kèm bóng mờ tinh tế tại các trang danh mục và nội dung.
- **Dải mạng xã hội (Bên trái):**
  - Liên kết biểu tượng: Instagram, Twitter (X), Facebook với hiệu ứng đổi sắc thái khi rê chuột.
- **Thanh menu chính (Ở giữa):**
  - Menu song ngữ: *Trang Chủ*, *Gói Trải Nghiệm*, *Tour Tuyển Chọn*, *Về Chúng Tôi*, *Liên Hệ* (EN: *Home*, *Experiences*, *Curated Tours*, *About Us*, *Contact*).
  - Khoảng cách cân đối, chống tràn dòng (`whitespace-nowrap`).
- **Cụm thông tin & Tài khoản (Bên phải):**
  - **Hotline tư vấn:** `+84 903 846 568` kèm icon điện thoại (tự ẩn thông minh trên màn hình nhỏ).
  - **Email:** `contact@startravels.vn`.
  - **Nút tài khoản:** Icon người dùng `UserRound` dạng nút bấm tròn thanh lịch, trỏ tới `/account` (nếu đã đăng nhập) hoặc `/login`.
  - **Nút Mobile Drawer:** Icon Hamburger mở thanh trượt điều hướng toàn màn hình trên điện thoại và máy tính bảng.

### 3.2. Chân Trang (Site Footer)
- **Logo thương hiệu trung tâm:** Hiển thị biểu tượng Ngôi sao vàng cùng chữ STAR tinh xảo.
- **Đường kẻ phân cách trang nhã:** Cân đối trên nền cẩm thạch ngọc bích.
- **Hệ thống liên kết chân trang (8 đường dẫn):**
  - Trang chủ, Điểm đến, Gói trải nghiệm, Tour trọn gói, Cẩm nang, Về chúng tôi, Liên hệ, Cổng đối tác.
- **Nút tùy chọn đổi ngôn ngữ:** Nút bấm `🌐 Ngôn ngữ: Tiếng Việt · Thay đổi` cho phép mở lại Bảng thông báo chọn ngôn ngữ bất cứ lúc nào.
- **Bản quyền sở hữu trí tuệ:** Bản quyền Star Travels Vietnam song ngữ chuẩn mực.

### 3.3. Thanh Điều Hướng Phân Cấp (Luxury Frosted Breadcrumb Pill)
- **Component dùng chung:** `<Breadcrumb />` (`src/components/shared/breadcrumb.tsx`).
- **Thiết kế & Tương phản:** Định dạng viên capsule kính mờ nổi (`bg-white/85 backdrop-blur-md border border-white/90 shadow-sm`) với văn bản tương phản cao (`text-slate-700 font-semibold`, trang hiện tại `text-slate-900 font-bold`).
- **Khắc phục triệt để:** Loại bỏ hoàn toàn tình trạng chữ mờ/chìm màu trên nền ảnh biển xanh Nha Trang, đảm bảo chuẩn WCAG 2.1 AA trên mọi độ phân giải.

---

## 4. Danh Mục Chi Tiết Toàn Bộ Tuyến Đường & Trang Web (Page Inventory)

### 4.1. Trang Chủ (`/` — Home Page)
Trang chủ là trung tâm thị giác của toàn bộ nền tảng, gồm 6 phân đoạn liên tiếp được thiết kế tỉ mỉ:

1. **Hero Slider Banner (Trình Chiếu Kỳ Quan):**
   - Trình chiếu 3 danh lam thắng cảnh biểu tượng độ phân giải cao (Hạ Long, Đà Lạt, Tràng An).
   - Tự động chuyển slide mỗi 7 giây (tự tạm dừng khi chuột rê vào hoặc đang thao tác tìm kiếm), hỗ trợ vuốt chạm cảm ứng (swipe gesture) trên thiết bị di động.
   - Tiêu đề nghệ thuật 4 chữ đối xứng (*"Non Sông Gấm Vóc"*, *"Xứ Sở Ngàn Hoa"*, *"Non Nước Hữu Tình"*), áp dụng `text-balance` chống rớt chữ.
   - **Thanh đếm số lượng slide siêu mờ sang trọng:** Thiết kế kính mờ đen sâu lắng (`bg-black/35 backdrop-blur-md border border-white/15 shadow-lg`), số trang màu trắng bạc dịu mắt (`text-white/80`), không còn khung trắng đục thô cứng gây phân tâm khỏi ảnh phong cảnh.
2. **Thanh Tìm Kiếm & Khám Phá Đa Năng (Discovery Search Bar) — Chế Độ On/Off Thông Minh:**
   - **Chế độ BẬT (Mode ON — Đầy đủ):**
     - 3 Tab chủ đề màu xanh Teal: `CHUYẾN BAY` (Flights) | `KHÁCH SẠN` (Hotels) | `GÓI TOUR` (Tours).
     - Nút chuyển đổi nhanh góc phải: `[ ✕ Tắt tìm kiếm ]` (`Hide Search`) thu gọn thanh tìm kiếm tức thì để ngắm cảnh.
     - Khung tìm kiếm 5 cột kính mờ liền mạch:
       - *Cột 1:* Dropdown chọn điểm xuất phát (Hà Nội, TP.HCM, Đà Nẵng, v.v.).
       - *Cột 2:* Dropdown danh thắng / chủ đề trải nghiệm tùy biến theo Tab.
       - *Cột 3 & 4:* Popover lịch chọn ngày khởi hành và ngày về song ngữ thông minh.
       - *Cột 5:* Lựa chọn số lượng du khách (1 khách, 2 khách, Cặp đôi, Gia đình, Nhóm).
       - *Nút Search:* Nút bấm tinh gọn với icon kính lúp, tự động chuyển hướng tìm kiếm kèm tham số URL.
   - **Chế độ TẮT (Mode OFF — Thu gọn ngắm cảnh):**
     - Tự động thu gọn thanh tìm kiếm thành một viên capsule kính mờ sang trọng (`bg-black/45 backdrop-blur-xl border border-white/25`), giải phóng hơn 200px chiều cao khung hình để du khách chiêm ngưỡng trọn vẹn cảnh sắc thiên nhiên.
     - Hiển thị tóm tắt hành trình và nút bấm `[ Bật thanh tìm kiếm hành trình · Nhấn để mở ▾ ]`.
     - Kèm thông điệp nhỏ tinh tế: `✦ Đang bật chế độ thu gọn để ngắm trọn vẹn cảnh sắc kỳ quan`.
     - Tự động ghi nhớ trạng thái ưa thích của người dùng qua `localStorage` (`star_travels_search_open`).
3. **Danh Thắng Tuyển Chọn (Popular Destinations Carousel):**
   - Tiêu đề uốn lượn *"Điểm Đến Nổi Tiếng"* và đoạn dẫn giải di sản.
   - Thanh trượt hiển thị 4 thẻ danh thắng hàng đầu (Hạ Long, Hội An, Sa Pa, Phú Quốc) với hiệu ứng phóng to ảnh khi hover và dải tóm tắt chân thẻ.
4. **Vì Sao Chọn Star Travels? (Why Choose Us):**
   - 3 khối giá trị cốt lõi làm từ kính mờ: *Cam kết chất lượng* (Khiên bảo vệ), *Dịch vụ tận tâm* (Bắt tay trái tim), *Trải nghiệm độc bản* (La bàn phong cách).
5. **Trải Nghiệm Bản Địa Hôm Nay (Adventures Collage):**
   - Bố cục tranh ghép 3 cột (Collage) gồm 5 hoạt động đặc sắc: Du thuyền kênh rạch, Thuyền buồm vịnh biển, Trekking Fansipan, Cắm trại săn mây, Lặn ngắm san hô.
   - Hộp thông tin kính mờ tự trượt mượt mà khi rê chuột để người xem ngắm trọn vẹn cảnh sắc.
6. **Tour Du Lịch Tuyển Chọn (Featured Tours Carousel):**
   - Lưới hiển thị các gói tour trọn gói 4 cột. Hỗ trợ nút điều hướng trang trước/sau khi số lượng tour vượt quá 4 và hỗ trợ vuốt chạm trên mobile.
   - Mỗi thẻ hiển thị huy hiệu thời lượng (vd: *3 Ngày 2 Đêm*), ảnh bìa tỉ lệ 4:3, giá tour rõ ràng và liên kết xem chi tiết.
7. **Bản Tin Du Lịch & Vinh Danh Di Sản (Newsletter & Award Winning):**
   - *Bên trái:* Thẻ đăng ký nhận bản tin với form nhập tên, email và phản hồi trạng thái gửi thành công tức thì.
   - *Bên phải:* Lưới 6 danh thắng được UNESCO công nhận hoặc đạt giải thưởng du lịch thế giới, ảnh tỉ lệ 4:3 và tiêu đề cân đối.
8. **Mục Kêu Gọi Khám Phá (Looking for an Experience CTA):**
   - Dải băng kêu gọi hành động với nút bấm viền đen cổ điển dẫn tới danh mục trải nghiệm.

---

### 4.2. Trang Danh Mục Điểm Đến (`/destinations`)
- **Tuyến đường:** `apps/public-site/src/app/destinations/page.tsx`
- **Mục tiêu:** Cung cấp cái nhìn toàn cảnh về 12 danh thắng và kỳ quan hàng đầu Việt Nam.
- **Các thành phần giao diện chính:**
  - *Thanh điều hướng phân cấp (Breadcrumb Pill):* Thẻ nổi kính mờ sang trọng `Trang Chủ > Điểm Đến`.
  - *Thẻ tiêu đề & Tìm kiếm kính mờ:* Hộp thẻ kính mờ trắng ngọc bích (`bg-white/85 backdrop-blur-md border border-white/90 shadow-sm`) chứa huy hiệu danh thắng, tiêu đề viết tay lớn và lời tựa di sản với độ tương phản cao sắc nét (`text-slate-800 font-medium`).
  - *Thanh tìm kiếm tức thời:* Tìm kiếm địa danh theo tên tiếng Việt, tên tiếng Anh hoặc vùng miền.
  - *Lưới thẻ danh thắng (`DestinationCard`):* Lưới 3 cột hiển thị hình ảnh chất lượng cao, tên địa phương, giá tour khởi điểm và đường dẫn xem chi tiết.

---

### 4.3. Trang Chi Tiết Điểm Đến (`/destinations/[slug]`)
- **Tuyến đường:** `apps/public-site/src/app/destinations/[slug]/page.tsx`
- **Mục tiêu:** Hồ sơ di sản chuyên sâu cho từng địa danh cụ thể (ví dụ: `/destinations/ha-long`, `/destinations/da-lat`).
- **Các thành phần giao diện chính:**
  - *Hero Banner toàn cảnh:* Ảnh bìa kích thước lớn toàn màn hình kèm tên địa danh kiểu chữ hiển thị hoành tráng.
  - *Thông tin tổng quan:* Thời điểm lý tưởng trong năm để ghé thăm, tọa độ địa lý, mô tả lịch sử và thiên nhiên.
  - *Gói trải nghiệm tại điểm đến:* Lưới thẻ `PlaceCard` hiển thị các hoạt động phiêu lưu có sẵn tại địa danh này.
  - *Tour trọn gói liên kết:* Danh sách các tour du lịch có hành trình đi qua địa danh này kèm nút xem lịch trình.

---

### 4.4. Trang Danh Mục Gói Trải Nghiệm (`/experiences`)
- **Tuyến đường:** `apps/public-site/src/app/experiences/page.tsx`
- **Mục tiêu:** Tập hợp các hoạt động khám phá bản địa dành cho du khách thích tự do và phiêu lưu.
- **Các thành phần giao diện chính:**
  - *Thanh phân loại danh mục (Category Tabs):* Tất cả, Du thuyền, Thể thao nước, Trekking leo núi, Cắm trại, Lặn ngắm san hô.
  - *Bộ lọc tìm kiếm địa lý:* Hỗ trợ lọc theo tọa độ lân cận (`lat`, `lng`, `radius`).
  - *Lưới thẻ trải nghiệm (`PlaceCard`):* Hiển thị điểm đánh giá sao, địa chỉ cụ thể, giá dịch vụ mỗi khách và thẻ chuyên mục.

---

### 4.5. Trang Chi Tiết Gói Trải Nghiệm (`/experiences/[slug]`)
- **Tuyến đường:** `apps/public-site/src/app/experiences/[slug]/page.tsx`
- **Mục tiêu:** Trang đặt chỗ và đánh giá cho từng gói trải nghiệm độc bản (ví dụ: `/experiences/canal-cruise-ben-tre`).
- **Các thành phần giao diện chính:**
  - *PageHero Banner:* Ảnh nền sắc nét và tiêu đề trải nghiệm.
  - *Nút Thêm vào Yêu thích (`FavoriteButton`):* Lưu trải nghiệm vào danh sách quan tâm của tài khoản.
  - *Thông số hành trình:* Thời lượng, kích thước đoàn khách tối đa, địa điểm xuất phát, cam kết an toàn bảo hiểm.
  - *Thẻ Đặt Chỗ Tương Tác (`ExperienceBookingCard`):*
    - Chọn ngày trải nghiệm qua lịch tương tác.
    - Chọn số lượng khách kèm tính toán tổng chi phí tự động.
    - Nút bấm xác nhận đặt giữ chỗ tức thì.
  - *Biểu mẫu đánh giá (`ReviewForm`):* Cho phép du khách chấm sao (1 - 5 sao) và để lại cảm nhận sau chuyến đi.
  - *Danh sách trải nghiệm liên quan:* Đề xuất 3 hoạt động tương tự cùng vùng miền.

---

### 4.6. Trang Danh Mục Tour Trọn Gói (`/tours`)
- **Tuyến đường:** `apps/public-site/src/app/tours/page.tsx`
- **Mục tiêu:** Tổng hợp 8 gói tour du lịch all-inclusive cao cấp khắp 3 miền Việt Nam.
- **Các thành phần giao diện chính:**
  - *Component danh mục `ToursCatalog`:*
    - Bộ lọc vùng miền: *Tất cả*, *Miền Bắc*, *Miền Trung*, *Miền Nam*.
    - Bộ lọc khoảng giá: Dưới 3 triệu, 3 - 6 triệu, Trên 6 triệu.
    - Sắp xếp linh hoạt: Theo giá tăng/giảm dần, theo thời lượng tour.
    - Lưới thẻ tour trực quan với giá niêm yết, thời lượng và ảnh bìa.

---

### 4.7. Trang Chi Tiết Tour Tuyển Chọn (`/tours/[slug]`)
- **Tuyến đường:** `apps/public-site/src/app/tours/[slug]/page.tsx`
- **Mục tiêu:** Cung cấp thông tin đầy đủ nhất về lịch trình, chi phí và đặt vé cho từng tour cụ thể.
- **Các tính năng nổi bật:**
  - *Hỗ trợ SSG & Dynamic Metadata:* Tự động sinh `generateStaticParams` và thẻ OpenGraph chuẩn SEO theo từng tour.
  - *Thông số nhanh:* Thời lượng (vd: 3 Ngày 2 Đêm), Điểm xuất phát (vd: Hà Nội / TP.HCM), Phương tiện di chuyển, Tiêu chuẩn khách sạn (4-5 sao).
  - *Lịch trình chi tiết từng ngày (Day-by-day Itinerary Timeline):* Trình bày dạng tiến trình rõ ràng với các điểm dừng chân, hoạt động tham quan và bữa ăn trong ngày.
  - *Dịch vụ Bao Gồm & Không Bao Gồm:* Bảng liệt kê hai cột với icon tích xanh (`CheckCircle2`) và icon chéo đỏ (`XCircle`), đảm bảo tính minh bạch 100%.
  - *Thẻ Đặt Tour Trực Tuyến (`TourBookingCard`):*
    - Form chọn ngày khởi hành từ lịch mở bán.
    - Chọn số lượng khách người lớn và trẻ em, tự động nhân hệ số giá.
    - Form nhập thông tin liên hệ và nút gửi yêu cầu đặt tour.
  - *Hỗ trợ tư vấn khẩn cấp:* Hotline và link chat trực tiếp với chuyên gia tour.

---

### 4.8. Trang Cẩm Nang & Góc Nhìn Khám Phá (`/stories`)
- **Tuyến đường:** `apps/public-site/src/app/stories/page.tsx`
- **Mục tiêu:** Tạp chí du lịch điện tử cung cấp bài viết cẩm nang văn hóa, kinh nghiệm du lịch và ẩm thực bản địa.
- **Các thành phần giao diện chính:**
  - *Bài viết tâm điểm (Featured Hero Story):* Khung bài viết nổi bật cỡ lớn 2 cột với ảnh bìa mở rộng và trích đoạn sâu sắc.
  - *Lưới bài viết cẩm nang:* Danh sách các bài chia sẻ kinh nghiệm, thời gian đọc ước tính (vd: *5 phút đọc* / *5 min read*), chuyên mục và ngày đăng.
  - *Khung đăng ký nhận bài viết mới:* Form đăng ký nhanh tại chân trang bài viết.

---

### 4.9. Trang Chi Tiết Bài Viết Cẩm Nang (`/stories/[slug]`)
- **Tuyến đường:** `apps/public-site/src/app/stories/[slug]/page.tsx`
- **Mục tiêu:** Trang đọc nội dung bài viết chuyên sâu (ví dụ: `/stories/lan-ha-bay-insider-guide`).
- **Các thành phần giao diện chính:**
  - *Thông tin bài viết:* Tiêu đề trang trọng, tên tác giả (Ban biên tập Star Travels / Local Experts), chuyên mục và thời lượng đọc.
  - *Nội dung bài viết:* Bố cục dàn trang chuẩn tạp chí lữ hành, hình ảnh minh họa chất lượng cao kèm chú thích.
  - *Hệ thống thẻ phân loại (Tags):* Danh sách từ khóa liên quan đến điểm đến và văn hóa.
  - *Nút quay lại cẩm nang:* Điều hướng nhanh trở về kho bài viết.

---

### 4.10. Trang Giới Thiệu Về Chúng Tôi (`/about`)
- **Tuyến đường:** `apps/public-site/src/app/about/page.tsx`
- **Mục tiêu:** Truyền tải sứ mệnh, tầm nhìn và giá trị cốt lõi của thương hiệu STAR Travels.
- **Các khối nội dung:**
  - *Câu chuyện khởi nguồn:* Hành trình kết nối du khách với những giá trị du lịch nguyên bản, độc bản và bền vững tại Việt Nam.
  - *3 Trụ cột triết lý dịch vụ:* Cam kết chất lượng dịch vụ, Tôn vinh văn hóa địa phương, Trải nghiệm độc bản riêng tư.
  - *Vinh danh & Chứng nhận:* Lưới 6 giải thưởng và chứng nhận di sản danh giá.
  - *Lời mời kết nối:* Lời kêu gọi du khách đồng hành cùng Star Travels.

---

### 4.11. Trang Liên Hệ & Hỗ Trợ 24/7 (`/contact`)
- **Tuyến đường:** `apps/public-site/src/app/contact/page.tsx`
- **Mục tiêu:** Kênh liên lạc trực tiếp giữa du khách và đội ngũ tư vấn hành trình.
- **Các thành phần giao diện chính:**
  - *3 Kênh hỗ trợ tức thì:* Hotline điện thoại, Hộp thư điện tử, Giờ phục vụ tư vấn 24/7.
  - *Biểu mẫu gửi yêu cầu tư vấn (`ContactForm`):* Nhập họ tên, email, số điện thoại, chủ đề quan tâm và nội dung tin nhắn kèm xác thực form.
  - *Địa chỉ văn phòng & Bản đồ:* Trụ sở tại Hà Nội và văn phòng đại diện tại TP. Hồ Chí Minh.
  - *Bộ câu hỏi thường gặp (`ContactFAQ`):* Hệ thống Accordion giải đáp chính sách đặt chỗ, thanh toán, đổi lịch và bảo hiểm.

---

### 4.12. Trang Cổng Đối Tác Lữ Hành (`/partner`)
- **Tuyến đường:** `apps/public-site/src/app/partner/page.tsx`
- **Mục tiêu:** Tiếp nhận hồ sơ hợp tác từ các đại lý du lịch, resort nghỉ dưỡng, đơn vị lữ hành và nghệ nhân địa phương.
- **Các thành phần giao diện chính:**
  - *4 Giá trị đồng hành:* Gia tăng doanh thu bền vững, Nâng tầm định vị thương hiệu, Hỗ trợ công nghệ quản lý, Chứng nhận dịch vụ chuẩn mực.
  - *Quy trình hợp tác 4 bước:* Đăng ký hồ sơ → Thẩm định chất lượng → Ký kết hợp đồng → Ra mắt dịch vụ trên nền tảng.
  - *Biểu mẫu đăng ký đối tác trực tuyến (`PartnerForm`):* Điền thông tin doanh nghiệp, người đại diện, giấy phép kinh doanh, loại hình dịch vụ và địa bàn hoạt động.

---

### 4.13. Cụm Trang Tài Khoản & Định Danh (`/login`, `/register`, `/account`)
- **Đăng Nhập (`/login`):**
  - Biểu mẫu `LoginForm` xử lý đăng nhập an toàn, chuyển hướng linh hoạt theo vai trò (Traveler hoặc Partner).
- **Đăng Ký (`/register`):**
  - Biểu mẫu `RegisterForm` tạo tài khoản thành viên mới trong hệ sinh thái Star Travels.
- **Trang Quản Lý Cá Nhân (`/account`):**
  - Kiểm tra trạng thái xác thực phía máy chủ (`getCurrentUser()`). Tự động điều hướng về `/login` nếu chưa đăng nhập.
  - Hiển thị thông tin người dùng, huy hiệu phân quyền (*Du khách*, *Đối tác*, *Quản trị viên*).
  - Phím tắt truy cập nhanh danh sách tour, lịch sử đặt chỗ và nút Đăng xuất an toàn (`LogoutButton`).

---

### 4.14. Trang Báo Lỗi 404 Không Tìm Thấy (`/not-found`)
- **Tuyến đường:** `apps/public-site/src/app/not-found.tsx`
- **Đặc điểm:**
  - Đồng bộ thiết kế Anima với icon La bàn mờ sang trọng, thông điệp song ngữ lịch sự khi đường dẫn bị sai hoặc tour/bài viết không tồn tại.
  - Nút bấm quay về Trang chủ và nút Khám phá danh mục Tour.

---

## 5. Danh Mục Tuyến Đường Kỹ Thuật (Route & SEO Infrastructure)

| Đường dẫn (URL) | Phương thức | Định dạng trả về | Vai trò & Mục đích |
|---|---|---|---|
| `/sitemap.xml` (`sitemap.ts`) | `GET` | XML Sitemap | Tự động sinh danh mục 34+ liên kết bao gồm tất cả static pages, 12 điểm đến, 8 tour, 9 trải nghiệm, 5 bài viết |
| `/robots.txt` (`robots.ts`) | `GET` | Text | Chỉ dẫn bot tìm kiếm (Googlebot, Bingbot), trỏ trực tiếp đến `sitemap.xml` |
| `/api/auth/login` | `POST` | JSON + Cookie | Route Handler proxy đăng nhập, thiết lập HTTP-Only cookie `star_token` |
| `/api/auth/register` | `POST` | JSON + Cookie | Route Handler proxy đăng ký tài khoản du khách |
| `/api/auth/logout` | `POST` | JSON | Xóa sạch session cookie và làm mới trạng thái phiên |

---

## 6. Tiêu Chuẩn Trải Nghiệm Người Dùng & Tối Ưu Hóa (UX & Performance)

1. **Hiệu Ứng Xuất Hiện Điện Ảnh Giữa Các Phân Đoạn (Cinematic Scroll Reveal & Stagger Transitions):**
   - Thiết lập thời gian chuyển động kéo dài chậm rãi và quý phái: **1.15 giây (1150ms)** với đường cong gia tốc mượt mà chuẩn lữ hành cao cấp (`cubic-bezier(0.16, 1, 0.3, 1)`), giúp du khách cảm nhận rõ nét từng phân đoạn và thẻ dịch vụ lướt nhẹ nhàng vào tầm mắt thay vì chớp nhoáng quá nhanh.
   - Cơ chế **Direct DOM Class Toggling** (`classList.add("reveal-active")`) qua native `IntersectionObserver`: Kích hoạt trực tiếp lớp CSS phần cứng GPU mà không tạo bất kỳ đợt re-render React nào trong lúc cuộn trang. Triệt tiêu hoàn toàn VDOM reconciliation overhead, đạt 60fps/120fps siêu mượt.
   - **Xóa bỏ xung đột chuyển động lồng ghép (Zero Nested Transform Conflict):** Loại bỏ hoàn toàn các lớp wrapper `ScrollReveal` cha - con bị trùng lặp thời gian và khoảng cách di chuyển. Các mục danh thắng và hoạt động thám hiểm lướt vào theo chuỗi so le (Stagger Delay: 160ms) tự nhiên, độc lập và thanh thoát.
   - Tự động ngắt quan sát (`unobserve`) ngay sau khi phần tử hiển thị, giảm tải 100% tài nguyên CPU khi tiếp tục cuộn trang.
   - Dải phân cách chuyển tiếp mềm mại (`.section-divider`) giữa các section với ánh sáng ngọc bích tỏa dần 2 bên.
2. **Khử Giật Khung Hình & Tăng Tốc Phần Cứng (Eliminating Lag & 60fps GPU Acceleration):**
   - Tối ưu `animate-ken-burns` với `transform: translate3d(0, 0, 0)` và `backface-visibility: hidden` chống tính toán lại layout liên tục.
   - Tự động tạm dừng timer trình chiếu (`isPaused`) khi chuột rê vào Hero Banner hoặc khi du khách đang tương tác, chọn lịch tìm kiếm.
   - Thay thế các khối `backdrop-blur` kích thước lớn trên toàn trang bằng các lớp màu phẳng có độ mờ tối ưu, loại bỏ triệt để hiện tượng giật lag khung hình khi cuộn nhanh.
   - Hiệu ứng xuất hiện so le (Staggered Delay: 160ms) trên các thẻ Điểm đến, Tour tuyển chọn, Vì sao chọn Star Travels và Danh sách trải nghiệm.
3. **Thiết Kế Cân Bằng Thị Giác (Text Balance & Typographic Harmony):**
   - Áp dụng triệt để `text-balance` trên toàn bộ tiêu đề lớn để loại bỏ hoàn toàn hiện tượng rớt chữ mồ côi (orphan words) ở cả tiếng Việt lẫn tiếng Anh.
   - Thẻ điểm đến, thẻ tour và thẻ bài viết được cố định chiều cao hợp lý, giữ cho các lưới hiển thị luôn thẳng hàng và đồng đều.
4. **Tương Tác Cảm Ứng Đa Nền Tảng (Mobile Touch & Swipe Support):**
   - Các thanh trượt quan trọng (Hero Slider, Featured Tours Carousel, Destinations Carousel) đều tích hợp cơ chế lắng nghe sự kiện chạm (`onTouchStart`, `onTouchMove`, `onTouchEnd`), cho phép du khách lướt mượt mà trên iPhone/Android.
5. **Hiệu Ứng Vi Mô (Micro-Interactions):**
   - Tinh tế trong từng chuyển động: nút bấm nâng nhẹ (`hover:-translate-y-0.5`), đổ bóng mềm ngọc bích (`hover:shadow-[0px_8px_25px_rgba(0,152,162,0.35)]`), ảnh zoom mượt mà (`duration-500 hover:scale-105`).
6. **Hiệu Năng & Khả Năng Truy Cập (Web Quality & Accessibility):**
   - 100% hình ảnh khai báo kích thước, dùng Next.js Image Component ngăn ngừa hiện tượng giật cục giao diện (Zero CLS).
   - Hỗ trợ đầy đủ chế độ giảm chuyển động (`prefers-reduced-motion`) cho người dùng nhạy cảm với hiệu ứng.
   - Đầy đủ nhãn trợ năng `aria-label` cho các nút icon không kèm chữ (Icon tài khoản, nút điều hướng slide, nút tìm kiếm).
   - Tương phản màu sắc tuân thủ nghiêm ngặt tiêu chuẩn WCAG 2.1 AA.

---

## 7. Tổng Kết Tình Trạng Sẵn Sàng (Readiness Summary)

- [x] **Toàn bộ 11+ nhóm trang công khai** đã hoàn thiện giao diện, logic và liên kết điều hướng.
- [x] **Hiệu ứng chuyển đoạn mượt mà (Scroll Reveal & Section Dividers)** mượt mà, khử sạch 100% hiện tượng lagging.
- [x] **Hệ thống song ngữ Việt - Anh** đồng bộ 100%, không còn bất kỳ dòng văn bản lai tạp.
- [x] **Dữ liệu Seed** 100% là danh lam thắng cảnh Việt Nam, cấu trúc tập trung tại `@/data/seed`.
- [x] **Thương hiệu & Logo STAR** hiển thị chuẩn mực kèm biểu tượng ngôi sao vàng kim.
- [x] **Kiểm thử tĩnh & Build:** Đạt chuẩn 100% xanh trên GitHub Actions CI và môi trường cục bộ.
