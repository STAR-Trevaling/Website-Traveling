# Hướng Dẫn Quản Lý Dữ Liệu Mẫu (Centralized Seed Data)

Tài liệu này hướng dẫn cách quản trị và chỉnh sửa toàn bộ dữ liệu mẫu (mock / seed data) của website **STAR Travels Vietnam**.

---

## 1. Cấu Trúc Thư Mục Tập Trung

Toàn bộ seed data của website đã được quy hoạch gom về duy nhất một nơi tại:
```
apps/public-site/src/data/
├── index.ts                  # Re-export gốc (@/data)
└── seed/
    ├── destinations.ts       # 12 Điểm đến Việt Nam (Hạ Long, Sa Pa, Hội An, Phú Quốc...)
    ├── tours.ts              # 8 Tour du lịch trọn gói & lịch trình chi tiết từng ngày
    ├── experiences.ts        # 9 Trải nghiệm bản địa & danh thắng đặc sắc
    ├── stories.ts            # 5 Bài viết cẩm nang hành trình & câu chuyện du lịch
    ├── index.ts              # Entrypoint chính gom toàn bộ (@/data/seed)
    └── README.md             # Tài liệu hướng dẫn này
```

---

## 2. Cách Sử Dụng Trong Code

### Cách 1: Import từng danh mục dữ liệu cụ thể
```typescript
import {
  ALL_VIETNAM_DESTINATIONS,
  VIETNAM_TOURS,
  VIETNAM_EXPERIENCES,
  VIETNAM_STORIES,
} from "@/data/seed";
```

### Cách 2: Sử dụng đối tượng gom `SEED_DATA`
```typescript
import { SEED_DATA } from "@/data/seed";

// Truy cập trực tiếp:
const allDestinations = SEED_DATA.destinations;
const allTours = SEED_DATA.tours;
const allExperiences = SEED_DATA.experiences;
const allStories = SEED_DATA.stories;
```

### Cách 3: Sử dụng các hàm tìm kiếm nhanh (`seedFinder`)
```typescript
import { seedFinder } from "@/data/seed";

const tour = seedFinder.tour("tour-ha-long-cruise-2n1d");
const destination = seedFinder.destination("phu-quoc");
const experience = seedFinder.experience("sailing");
const story = seedFinder.story("cam-nang-am-thuc-hoi-an");
```

---

## 3. Hướng Dẫn Thêm / Sửa Dữ Liệu

1. **Sửa thông tin hoặc giá của Tour du lịch:**
   - Mở file: `src/data/seed/tours.ts`
   - Tìm theo `id` hoặc `slug` của tour cần sửa.
   - Thay đổi các trường: `title`, `price`, `itinerary`, `highlights`, `inclusions`...

2. **Thêm hoặc sửa Điểm đến mới:**
   - Mở file: `src/data/seed/destinations.ts`
   - Thêm bản ghi mới vào mảng `VIETNAM_DESTINATIONS_PAGES`. Mỗi trang gồm 4 điểm đến để phục vụ carousel trang chủ.
   - Khai báo đầy đủ tên tiếng Việt (`name`), tiếng Anh (`name_en`), giá sàn (`starting_price`), tọa độ (`center: { lat, lng }`).

3. **Thêm Trải nghiệm hoặc Hoạt động phiêu lưu:**
   - Mở file: `src/data/seed/experiences.ts`
   - Thêm bản ghi vào `VIETNAM_EXPERIENCES`.

4. **Thêm Bài viết Blog / Cẩm nang:**
   - Mở file: `src/data/seed/stories.ts`
   - Thêm bài viết mới vào mảng `VIETNAM_STORIES`.

---

## 4. Danh Mục Danh Lam Thắng Cảnh 100% Thuần Việt Nam

Toàn bộ dữ liệu seed tuân thủ nghiêm ngặt tiêu chí: **100% danh lam thắng cảnh, di sản và trải nghiệm tại Việt Nam**, hoàn toàn không chứa dữ liệu mock nước ngoài:
- **Miền Bắc**: Vịnh Hạ Long & Vịnh Lan Hạ (Quảng Ninh / Hải Phòng), Sa Pa & Fansipan 3.143m (Lào Cai), Tràng An & Hang Múa (Ninh Bình), Đèo Mã Pí Lèng & Sông Nho Quế (Hà Giang), Biển mây Tà Xùa (Sơn La).
- **Miền Trung**: Phố cổ Hội An (Quảng Nam), Cố đô Huế (Thừa Thiên Huế), Cầu Vàng & Bán đảo Sơn Trà (Đà Nẵng), Động Thiên Đường Phong Nha — Kẻ Bàng (Quảng Bình).
- **Miền Nam & Duyên Hải / Tây Nguyên**: Đồi thông & Hồ Tuyền Lâm Đà Lạt (Lâm Đồng), Đồi cát bay Mũi Né (Bình Thuận), Đảo Ngọc Phú Quốc & Vịnh An Thới (Kiên Giang), Côn Đảo huyền thoại (Bà Rịa - Vũng Tàu), Chợ nổi Cái Răng & Xứ dừa Bến Tre (Đồng bằng Sông Cửu Long).

---

## 5. Tương Thích Ngược (Backward Compatibility)

Các đường dẫn import cũ (`@/lib/destinations-data`, `@/lib/tours-data`, `@/lib/experiences-data`, `@/lib/stories-data`) đã được cấu hình re-export tự động từ `@/data/seed`, đảm bảo không làm gián đoạn bất kỳ component hay code kiểm thử hiện có nào.
