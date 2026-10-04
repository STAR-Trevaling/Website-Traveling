import { VIETNAM_IMAGES } from "./assets";

export interface TourItem {
  id: string;
  slug: string;
  title: string;
  destination: string;
  region: "north" | "central" | "south";
  duration: string;
  departure: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  highlights: string[];
  transport: string;
  hotel: string;
}

export const VIETNAM_TOURS: TourItem[] = [
  {
    id: "tour-da-lat-3n2d",
    slug: "tour-da-lat-3n2d",
    title: "Tour Đà Lạt — Săn Mây Đồi Chè & Thung Lũng Ngàn Hoa",
    destination: "Đà Lạt, Lâm Đồng",
    region: "central",
    duration: "3 Ngày 2 Đêm",
    departure: "TP. Hồ Chí Minh / Hà Nội",
    price: 2450000,
    originalPrice: 2950000,
    rating: 4.9,
    reviewCount: 128,
    image: VIETNAM_IMAGES.daLat,
    highlights: [
      "Đón bình minh săn mây Cầu Đất Panorama",
      "Check-in hồ Tuyền Lâm, Thiền Viện Trúc Lâm",
      "Thưởng thức tiệc BBQ giữa rừng thông mộng mơ",
    ],
    transport: "Xe limousine đời mới",
    hotel: "Khách sạn 4 sao trung tâm",
  },
  {
    id: "tour-ha-long-cruise-2n1d",
    slug: "tour-ha-long-cruise-2n1d",
    title: "Du Thuyền 5 Sao Vịnh Hạ Long — Lan Hạ Nghỉ Dưỡng",
    destination: "Vịnh Hạ Long, Quảng Ninh",
    region: "north",
    duration: "2 Ngày 1 Đêm",
    departure: "Hà Nội",
    price: 1850000,
    originalPrice: 2300000,
    rating: 5.0,
    reviewCount: 254,
    image: VIETNAM_IMAGES.haLong,
    highlights: [
      "Cabin view trọn vịnh biển ban công riêng",
      "Chèo thuyền kayak qua hang Sáng Tối",
      "Tiệc hoàng hôn Sunset Party & lớp học nấu ăn",
    ],
    transport: "Xe đưa đón cao tốc 2 chiều",
    hotel: "Du thuyền 5 sao chuẩn quốc tế",
  },
  {
    id: "tour-trang-an-hang-mua-1n",
    slug: "tour-trang-an-hang-mua-1n",
    title: "Tour Ninh Bình — Danh Thắng Tràng An & Đỉnh Hang Múa",
    destination: "Ninh Bình",
    region: "north",
    duration: "1 Ngày",
    departure: "Hà Nội",
    price: 950000,
    originalPrice: 1200000,
    rating: 4.8,
    reviewCount: 96,
    image: VIETNAM_IMAGES.ninhBinh,
    highlights: [
      "Thuyền nan lướt qua hang động ngập nước di sản kép",
      "Chinh phục 500 bậc đá ngắm trọn thung lũng Tam Cốc",
      "Thưởng thức đặc sản cơm cháy dê núi Ninh Bình",
    ],
    transport: "Xe du lịch đời mới",
    hotel: "Tour trong ngày",
  },
  {
    id: "tour-sapa-fansipan-2n1d",
    slug: "tour-sapa-fansipan-2n1d",
    title: "Tour Sa Pa — Chinh Phục Fansipan & Bản Cát Cát Thơ Mộng",
    destination: "Sa Pa, Lào Cai",
    region: "north",
    duration: "2 Ngày 1 Đêm",
    departure: "Hà Nội",
    price: 1650000,
    originalPrice: 1950000,
    rating: 4.9,
    reviewCount: 182,
    image: VIETNAM_IMAGES.saPa,
    highlights: [
      "Cáp treo hiện đại chạm đỉnh Fansipan 3.143m",
      "Dạo bước khám phá bản Cát Cát của người H'Mông",
      "Thưởng thức lẩu cá hồi, cá tầm nóng hổi xứ lạnh",
    ],
    transport: "Xe giường nằm cabin cao cấp",
    hotel: "Khách sạn view núi Fansipan",
  },
  {
    id: "tour-phu-quoc-4-dao-3n2d",
    slug: "tour-phu-quoc-4-dao-3n2d",
    title: "Tour Phú Quốc — Cano 4 Đảo, Cáp Treo Hòn Thơm & Bãi Khem",
    destination: "Phú Quốc, Kiên Giang",
    region: "south",
    duration: "3 Ngày 2 Đêm",
    departure: "TP. Hồ Chí Minh / Hà Nội",
    price: 3200000,
    originalPrice: 3800000,
    rating: 4.9,
    reviewCount: 310,
    image: VIETNAM_IMAGES.phuQuoc,
    highlights: [
      "Lặn ngắm san hô tự nhiên tại Hòn Gầm Ghì, Móng Tay",
      "Cáp treo 3 dây vượt biển dài nhất thế giới",
      "Ngắm hoàng hôn lãng mạn tại Sunset Town Phú Quốc",
    ],
    transport: "Cano cao tốc & xe máy lạnh",
    hotel: "Resort ven biển Bãi Khem",
  },
  {
    id: "tour-ha-giang-ma-pi-leng-3n2d",
    slug: "tour-ha-giang-ma-pi-leng-3n2d",
    title: "Tour Hà Giang — Chinh Phục Mã Pí Lèng & Du Thuyền Nho Quế",
    destination: "Hà Giang",
    region: "north",
    duration: "3 Ngày 2 Đêm",
    departure: "Hà Nội",
    price: 2850000,
    originalPrice: 3200000,
    rating: 5.0,
    reviewCount: 145,
    image: VIETNAM_IMAGES.haGiang,
    highlights: [
      "Vượt đèo Mã Pí Lèng - tứ đại đỉnh đèo Việt Nam",
      "Du thuyền trên hẻm vực Tu Sản sâu nhất Đông Nam Á",
      "Check-in Cột cờ Lũng Cú điểm cực Bắc Tổ quốc",
    ],
    transport: "Xe Limousine 16 chỗ",
    hotel: "Homestay / Khách sạn bản địa",
  },
  {
    id: "tour-hue-co-do-1n",
    slug: "tour-hue-co-do-1n",
    title: "Tour Cố Đô Huế — Kinh Thành Triều Nguyễn & Ca Huế Sông Hương",
    destination: "Thừa Thiên Huế",
    region: "central",
    duration: "1 Ngày",
    departure: "Huế / Đà Nẵng",
    price: 850000,
    originalPrice: 1050000,
    rating: 4.8,
    reviewCount: 88,
    image: VIETNAM_IMAGES.hue,
    highlights: [
      "Thăm Đại Nội, Ngọ Môn, Điện Thái Hòa tráng lệ",
      "Chiêm bái chùa Thiên Mụ linh thiêng soi bóng sông Hương",
      "Khám phá kiến trúc lăng Khải Định độc nhất vô nhị",
    ],
    transport: "Xe du lịch máy lạnh",
    hotel: "Tour trong ngày",
  },
  {
    id: "tour-hoi-an-rung-dua-2n1d",
    slug: "tour-hoi-an-rung-dua-2n1d",
    title: "Tour Hội An — Thuyền Thúng Rừng Dừa & Thả Hoa Đăng Sông Hoài",
    destination: "Hội An, Quảng Nam",
    region: "central",
    duration: "2 Ngày 1 Đêm",
    departure: "Đà Nẵng / Hội An",
    price: 1450000,
    originalPrice: 1750000,
    rating: 4.9,
    reviewCount: 167,
    image: VIETNAM_IMAGES.hoiAn,
    highlights: [
      "Trải nghiệm múa thúng xoay vòng tại Rừng Dừa Bảy Mẫu",
      "Đi thuyền hoa đăng ước nguyện trên dòng sông Hoài",
      "Thưởng thức ẩm thực cao lầu, mì Quảng trứ danh",
    ],
    transport: "Xe đưa đón tiện nghi",
    hotel: "Boutique Hotel phố cổ",
  },
];
