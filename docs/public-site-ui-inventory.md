# Danh Mục Thành Phần Giao Diện Public Site (UI Inventory)

> **Tài liệu tổng hợp giao diện người dùng (Customer-Facing Public Site)**  
> **Dự án:** Star Travels Vietnam — Nền tảng Du lịch & Trải nghiệm Bản địa  
> **Ứng dụng:** `apps/public-site` (Next.js 15 App Router, Tailwind CSS, Song ngữ Việt - Anh)  
> **Cập nhật:** Tháng 10/2026  

---

## 1. Thành Phần Khung Toàn Trang (Global Layout)

### 1.1. Thanh Điều Hướng Trên Cùng (Site Header)
- **Vị trí:** Cố định ở đầu trang, chế độ trong suốt phủ lên Hero (`overlay = true`) tại Trang chủ, và nền trắng bóng mờ tại các trang con.
- **Dải mạng xã hội (Bên trái):**
  - Icon liên kết: Instagram, Twitter (X), Facebook.
  - Hiệu ứng hover đổi opacity và chuyển động nhẹ.
- **Thanh menu chính (Ở giữa):**
  - Menu điều hướng song ngữ:
    - VI: *Trang Chủ*, *Gói Trải Nghiệm*, *Tour Tuyển Chọn*, *Về Chúng Tôi*, *Liên Hệ*.
    - EN: *Home*, *Experiences*, *Curated Tours*, *About Us*, *Contact*.
  - Tự động giữ khoảng cách cân đối, chống tràn dòng (`whitespace-nowrap`).
- **Cụm tiện ích & Tài khoản (Bên phải):**
  - **Hotline:** Icon điện thoại kèm số `+84 903 846 568` (tự ẩn linh hoạt ở màn hình nhỏ).
  - **Email:** Icon thư kèm `contact@startravels.vn`.
  - **Icon Tài khoản:** Icon người dùng `UserRound` dạng nút bấm tròn tinh gọn (không kèm chữ bên cạnh), hỗ trợ tooltip và `aria-label` đến `/account` hoặc `/login`.
  - **Nút mở Mobile Navigation:** Icon Hamburger mở thanh trượt điều hướng đầy đủ trên điện thoại/tablet.

### 1.2. Chân Trang (Site Footer)
- **Logo thương hiệu trung tâm:**
  - Chữ *Star Travels* cỡ lớn với hiệu ứng font script cổ điển sang trọng.
  - **Biểu tượng Ngôi sao vàng:** Ngôi sao vector màu vàng (`#eab308`) nằm phía sau chữ *Star* với hiệu ứng xoay nhẹ và phóng to khi hover.
- **Đường kẻ phân cách trang:** Mảnh mai, đồng điệu với nền cẩm thạch ngọc bích.
- **Menu liên kết chân trang:** Danh sách 8 liên kết bao gồm Trang chủ, Điểm đến, Gói trải nghiệm, Tour trọn gói, Cẩm nang, Về chúng tôi, Liên hệ, Cổng đối tác.
- **Nút tùy chọn đổi ngôn ngữ:** Nút bấm tinh tế `🌐 Ngôn ngữ: Tiếng Việt · Thay đổi` cho phép mở lại Bảng thông báo chọn ngôn ngữ khi cần.
- **Bản quyền & Slogan:** Bản quyền Star Travels Vietnam song ngữ chuẩn mực.

### 1.3. Bảng Thông Báo Chọn Ngôn Ngữ & Lưu Cookie (Language Consent Banner)
- **Vị trí & Trực quan:** Khung thẻ nổi góc dưới bên phải (`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 sm:w-[420px] z-50`), chất liệu kính mờ bóng đêm (`bg-slate-900/95 backdrop-blur-xl border border-white/20 shadow-2xl`). Thay thế hoàn toàn cho nút switch trên thanh Header, mang lại trải nghiệm chuyên nghiệp chuẩn quốc tế.
- **Cơ chế hiển thị:** Tự động xuất hiện sau 700ms khi người dùng mới vào trang và chưa từng xác nhận ngôn ngữ mong muốn (kiểm tra qua cookie & localStorage). Hoặc khi người dùng nhấn "Thay đổi" tại Footer hay Mobile Drawer.
- **Nội dung song ngữ:** 
  - Tiêu đề kèm icon Quả địa cầu: *Chọn ngôn ngữ · Language Choice*.
  - Đoạn mô tả giải thích việc lưu ngôn ngữ qua cookie cho các lần duyệt sau.
- **2 Nút chọn trực quan:** 
  - Nút **🇻🇳 Tiếng Việt** và nút **🇬🇧 English** với hiệu ứng viền xanh ngọc bích và icon tích chọn (`Check`).
  - Khi nhấp chọn: Tức thì đổi giao diện, lưu cookie thời hạn 1 năm (`star_travels_locale` và `star_travels_locale_confirmed`), đồng thời đóng banner trượt êm ái.
- **Tùy chọn đóng:** Nút đóng "✕" cho phép tiếp tục duyệt trang với ngôn ngữ hiện tại.

---

## 2. Các Khối Giao Diện Trên Trang Chủ (Home Page Sections)

### 2.1. Hero Slider Banner (Trình Chiếu Kỳ Quan)
- **Hình nền chuyển động:** 3 hình ảnh di sản Việt Nam độ phân giải cao (Vịnh Hạ Long, Đà Lạt, Tràng An) tự động chuyển đổi mượt mà sau mỗi 7 giây.
- **Nút điều hướng Slide:** Cặp nút tròn mờ kính (glassmorphism) trái/phải với icon mũi tên phóng to nhẹ khi hover.
- **Nội dung chữ nổi bật:**
  - **Tiêu đề lớn (Display Title):** Font serif sang trọng có bóng chữ template, câu từ 4 chữ cân đối (*"Non Sông Gấm Vóc"*, *"Xứ Sở Ngàn Hoa"*, *"Non Nước Hữu Tình"* / *"Magnificent Vietnam"*, v.v.), có `text-balance` chống rớt chữ đơn lẻ.
  - **Phụ đề viết tay (Script Title):** Font chữ nghệ thuật mềm mại, tương phản rõ trên nền cảnh quan.

### 2.2. Thanh Tìm Kiếm & Khám Phá (Discovery Search Bar)
- **Dải Tab màu xanh Teal:** 3 tab lựa chọn với đường gạch chân hiệu ứng:
  - VI: `ĐIỂM ĐẾN` | `TRẢI NGHIỆM` | `CÂU CHUYỆN`
  - EN: `DESTINATIONS` | `EXPERIENCES` | `STORIES`
- **Khung tìm kiếm 5 cột liền mạch (Glassmorphism):**
  - **Cột 1 (Điểm xuất phát):** Dropdown chọn tỉnh thành xuất phát (Hà Nội, TP.HCM, Đà Nẵng,...).
  - **Cột 2 (Điểm đến / Loại trải nghiệm / Chủ đề):** Dropdown thông minh đổi danh mục theo tab đang chọn, tự mở rộng tỷ lệ cột `flex-[1.2]` để chứa trọn vẹn tên dài.
  - **Cột 3 (Ngày bắt đầu):** Input lịch chọn ngày đi kèm nhãn không vỡ dòng (`whitespace-nowrap`).
  - **Cột 4 (Ngày kết thúc):** Input lịch chọn ngày về.
  - **Cột 5 (Số lượng khách):** Dropdown chọn số lượng du khách (1 khách, 2 khách, Cặp đôi, Gia đình, Nhóm).
  - **Nút Tìm kiếm (Search Button):** Nút xanh ngọc lục bảo Teal với icon kính lúp, hiệu ứng đổ bóng nổi khi hover.

### 2.3. Danh Thắng Tuyển Chọn (Popular Destinations Carousel)
- **Tiêu đề phân đoạn:** Chữ nghệ thuật uốn lượn *"Điểm Đến Nổi Tiếng"* và đoạn giới thiệu danh lam thắng cảnh.
- **Thanh trượt 4 thẻ điểm đến (Carousel):**
  - Cặp nút mũi tên trắng nổi bên ngoài khung hình, có đổ bóng mờ dễ bấm.
  - Mỗi thẻ gồm:
    - Ảnh danh thắng (Vịnh Hạ Long, Hội An, Phú Quốc, Sa Pa,...) zoom nhẹ khi hover.
    - Dải màu trắng phía dưới chiều cao chuẩn `92px`: Tên điểm đến viết tay và tóm tắt giới hạn 2 dòng.

### 2.4. Vì Sao Chọn Star Travels? (Why Choose Us)
- **3 Thẻ giá trị cốt lõi:** Thiết kế kính mờ trong suốt bo góc nhẹ viền sáng:
  - **Cam kết chất lượng:** Icon khiên bảo vệ, cam kết hoàn tiền và minh bạch chi phí.
  - **Dịch vụ tận tâm:** Icon bắt tay trái tim, đội ngũ chuyên gia hỗ trợ 24/7.
  - **Trải nghiệm độc bản:** Icon la bàn, thiết kế chuyên sâu văn hóa bản địa.

### 2.5. Trải Nghiệm Bản Địa Hôm Nay (Adventures Collage)
- **Bố cục dạng tranh ghép (Collage 3 cột):**
  - **Cột 1:** Thẻ đứng cỡ lớn — *Du Thuyền Kênh Rạch* (Bến Tre & Hạ Long).
  - **Cột 2:** 2 Thẻ xếp tầng — *Thuyền Buồm Vịnh Biển* (Lan Hạ) & *Trekking Fansipan*.
  - **Cột 3:** 2 Thẻ xếp tầng — *Cắm Trại Săn Mây* (Tà Xùa, Đà Lạt) & *Lặn San Hô Phú Quốc*.
- **Hiệu ứng hộp thông tin:**
  - Hộp kính mờ góc dưới bên trái chứa tên trải nghiệm và mô tả súc tích.
  - Nút mũi tên tròn màu trắng bên phải góc ảnh.
  - Hiệu ứng lướt mượt: Khi hover vào ảnh, hộp chữ trượt ẩn nhẹ xuống để người xem ngắm trọn cảnh quan.

### 2.6. Tour Du Lịch Tuyển Chọn (Featured Tours)
- **Lưới thẻ Tour trọn gói (4 cột):**
  - Nút điều hướng Carousel xuất hiện linh hoạt khi có nhiều hơn 4 tour.
  - Mỗi thẻ tour gồm:
    - Ảnh bìa tỷ lệ 4:3 kèm huy hiệu thời lượng tour góc trên (*"2 Ngày 1 Đêm"*, *"3 Ngày 2 Đêm"*).
    - Hàng tiêu đề trên: Tên địa phương (ví dụ: *Vịnh Hạ Long*, *Đà Lạt*) bên cạnh giá tiền nổi bật (ví dụ: *1.850.000đ*).
    - Đoạn giới thiệu hành trình 2 dòng cân đối chiều cao giữa các thẻ.
    - Đường viền ngăn cách dưới cùng hiển thị đơn vị tính */ khách* và link *Xem tour →*.
- **Nút CTA lớn:** Nút viền đen nền trắng nổi bóng viền `XEM TẤT CẢ TOUR`.

### 2.7. Bản Tin & Vinh Danh Di Sản (Newsletter & Award Winning)
- **Bên trái — Khung Đăng Ký Bản Tin (Newsletter Card):**
  - Hộp màu xanh phấn nhạt đổ bóng sâu.
  - Form nhập Họ tên và Email với nút bấm đen sang trọng `ĐĂNG KÝ NGAY`.
  - Thông báo phản hồi thành công sau khi gửi form.
- **Bên phải — Lưới 6 Danh Thắng Vinh Danh (Awards Grid):**
  - Bố cục 2 cột x 3 dòng.
  - Mỗi mục gồm ảnh thu nhỏ tỉ lệ 4:3 (110–128px) và thông tin xếp hạng UNESCO/Danh lam thắng cảnh.
  - Không gian chữ rộng rãi, hiển thị tiêu đề và phụ đề trọn vẹn không bị rớt từ.

### 2.8. Mục Kêu Gọi Khám Phá (Looking for an Experience CTA)
- Khung nền sáng bóng mờ giữa 2 dải viền trang nhã.
- Tiêu đề nghệ thuật: *"Tìm Kiếm Trải Nghiệm Độc Bản?"* (`Looking for an Experience?`).
- Nút bấm viền đen cổ điển: `XEM GÓI TRẢI NGHIỆM` (`VIEW ALL EXPERIENCES`).

---

## 3. Các Trang Con Trên Public Site (Public Subpages)

| Tuyến Đường (Route) | Tên Trang | Các Khối UI Chính Thể Hiện |
|---|---|---|
| `/destinations` | Danh Sách Điểm Đến | Bộ lọc theo vùng miền (Bắc, Trung, Nam), lưới danh thắng toàn quốc, giá khởi điểm. |
| `/destinations/[slug]` | Chi Tiết Điểm Đến | Banner toàn cảnh, tổng quan di sản, thời điểm lý tưởng, bản đồ toạ độ, danh sách tour liên kết. |
| `/tours` | Danh Mục Tour Trọn Gói | Bộ lọc vùng miền, lọc mức giá, lọc thời gian, danh sách thẻ tour đầy đủ. |
| `/tours/[slug]` | Chi Tiết Tour | Bộ sưu tập ảnh (Gallery), lịch trình từng ngày (Itinerary), dịch vụ bao gồm & không bao gồm, bảng giá & đặt chỗ. |
| `/experiences` | Gói Trải Nghiệm | Danh mục trải nghiệm văn hóa, ẩm thực, leo núi, lặn biển, du thuyền. |
| `/experiences/[slug]` | Chi Tiết Trải Nghiệm | Giới thiệu hoạt động, hướng dẫn viên bản địa, thông tin trang bị, đặt lịch trải nghiệm. |
| `/stories` | Cẩm Nang & Hành Trình | Bài viết cẩm nang du lịch, mẹo phượt, văn hóa ẩm thực đường phố, di sản miền núi. |
| `/stories/[slug]` | Chi Tiết Bài Viết | Nội dung bài viết chi tiết, tác giả, thời gian đọc, các câu chuyện liên quan. |
| `/about` | Về Chúng Tôi | Câu chuyện thương hiệu Star Travels, sứ mệnh bảo tồn di sản, cam kết chất lượng 100%. |
| `/contact` | Liên Hệ & Hỗ Trợ | Biểu mẫu liên hệ trực tuyến, hotline tư vấn, địa chỉ văn phòng, thông tin hỗ trợ 24/7. |
| `/partner` | Cổng Hợp Tác Đối Tác | Đăng ký liên kết đại lý, nhà cung cấp dịch vụ du lịch địa phương, khách sạn đối tác. |
| `/login` | Đăng Nhập | Form đăng nhập tài khoản khách hàng, liên kết khôi phục mật khẩu và tạo tài khoản. |
| `/register` | Đăng Ký | Form đăng ký tài khoản thành viên Star Travels. |
| `/account` | Trang Cá Nhân | Thông tin tài khoản, lịch sử đặt tour, quản lý thông tin thanh toán. |

---

## 4. Đặc Điểm Kỹ Thuật UI & Tương Tác (UX / Interactions)

1. **Hệ thống Song ngữ Liền mạch (Bilingual i18n):**
   - Lưu trữ trạng thái ngôn ngữ qua Context API (`LanguageProvider`), tự động đồng bộ qua Cookie và LocalStorage.
   - Toàn bộ từ vựng được chọn lọc kỹ theo tiêu chuẩn SEO du lịch cao cấp.
2. **Thiết kế Cân bằng Chữ (Text Balance & Responsive Typography):**
   - Áp dụng `text-balance` trên tiêu đề lớn để không bị rớt chữ lẻ (orphan words) dù hiển thị tiếng Việt hay tiếng Anh.
   - Thẻ hiển thị có chiều cao tối thiểu (`min-h`) đồng đều, đảm bảo hàng ngang luôn thẳng tắp.
3. **Hiệu ứng Vi mô (Micro-interactions):**
   - Hover zoom ảnh mượt mà (`duration-500 scale-105`).
   - Nút CTA chuyển động nhấc nhẹ (`-translate-y-0.5`) kèm bóng sáng mềm mại (`hover:shadow-[0px_8px_25px_rgba(...)]`).
   - Hộp chữ Adventure trượt mờ khi rê chuột vào để khoe trọn vẹn cảnh sắc thiên nhiên.
