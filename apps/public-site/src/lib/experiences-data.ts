import type { Place } from "./types";
import { VIETNAM_IMAGES } from "./assets";

export const VIETNAM_EXPERIENCES: Place[] = [
  // 1. HOME CARD: Canal Cruise
  {
    id: "exp-canal-cruise",
    slug: "canal-cruise",
    name: "Canal Cruise — Du Ngoạn Kênh Rạch Miền Tây & Hạ Long",
    short_description: "Lướt nhẹ trên con thuyền gỗ khám phá những dòng kênh xanh ngát rợp bóng dừa nước và kỳ quan non nước.",
    description:
      "Trải nghiệm du ngoạn kênh rạch truyền thống đưa du khách tách biệt khỏi phố thị ồn ào. Trên chiếc thuyền gỗ mộc mạc, bạn sẽ xuôi theo dòng nước trong lành, lắng nghe tiếng chim hót giữa thiên nhiên hoang sơ, ghé thăm các làng nghề thủ công ven sông và thưởng thức tách trà mật ong nóng hổi cùng đặc sản cây trái miệt vườn.",
    image_url: "/assets/adventures/canal-cruise.jpg",
    address: "Bến thuyền du lịch sông Tiền, Bến Tre & Cảng tàu khách quốc tế Hạ Long",
    location: { lat: 10.24, lng: 106.375 },
    destination: {
      id: "ha-long",
      slug: "ha-long",
      name: "Vịnh Hạ Long & Sông Nước",
      country: "Việt Nam",
      summary: "Kỳ quan thiên nhiên thế giới UNESCO và sông nước miệt vườn.",
      description: "Hành trình thư thái ngắm nhìn nhịp sống bản địa dọc đôi bờ kênh rạch.",
      image_url: "/assets/adventures/canal-cruise.jpg",
      hero_image_url: "/assets/adventures/canal-cruise.jpg",
      starting_price: "450000",
      center: { lat: 20.9101, lng: 107.0844 },
    },
    category: {
      id: "du-thuyen",
      slug: "du-thuyen",
      name: "Du Thuyền & Thuyền Nan",
    },
    average_rating: "4.9",
    review_count: 168,
  },

  // 2. HOME CARD: Sailing
  {
    id: "exp-sailing",
    slug: "sailing",
    name: "Sailing — Du Thuyền Buồm Lướt Sóng Vịnh Biển",
    short_description: "Cảm nhận sức gió biển Đông và tự tay căng buồm lướt trên làn nước ngọc bích phẳng lặng.",
    description:
      "Một trải nghiệm thể thao đẳng cấp dành cho những ai khao khát tự do giữa biển khơi. Dưới sự hướng dẫn tận tình của thuyền trưởng chuyên nghiệp, du khách sẽ được tìm hiểu kỹ thuật bắt gió, điều khiển cánh buồm lướt êm ái qua những vách núi đá vôi kỳ vĩ và thưởng ngoạn hoàng hôn biển rực rỡ nhất vịnh Lan Hạ.",
    image_url: "/assets/adventures/sailing.jpg",
    address: "Câu lạc bộ Thuyền buồm Vịnh Lan Hạ, Đảo Cát Bà, Hải Phòng",
    location: { lat: 20.85, lng: 107.05 },
    destination: {
      id: "ha-long",
      slug: "ha-long",
      name: "Vịnh Lan Hạ — Cát Bà",
      country: "Hải Phòng, Việt Nam",
      summary: "Vịnh biển nguyên sơ với hàng trăm bãi tắm tự nhiên.",
      description: "Thánh địa của các môn thể thao nước ngoài trời.",
      image_url: "/assets/adventures/sailing.jpg",
      hero_image_url: "/assets/adventures/sailing.jpg",
      starting_price: "950000",
      center: { lat: 20.85, lng: 107.05 },
    },
    category: {
      id: "the-thao-nuoc",
      slug: "the-thao-nuoc",
      name: "Thể Thao Nước & Sailing",
    },
    average_rating: "5.0",
    review_count: 142,
  },

  // 3. HOME CARD: Hiking
  {
    id: "exp-hiking",
    slug: "hiking",
    name: "Hiking — Băng Rừng Trúc Chinh Phục Đỉnh Cao Sa Pa",
    short_description: "Cung đường trekking vượt rừng trúc nguyên sinh và chạm mốc chóp đỉnh Fansipan 3.143m linh thiêng.",
    description:
      "Trekking Sa Pa là thử thách đáng nhớ đưa bạn xuyên qua những tán rừng đỗ quyên ngàn năm tuổi của dãy Hoàng Liên Sơn hùng vĩ. Mỗi bước chân là một cảm xúc thăng hoa khi phóng tầm mắt ôm trọn biển mây trắng bồng bềnh uốn lượn quanh những thung lũng ruộng bậc thang trù phú.",
    image_url: "/assets/adventures/hiking.jpg",
    address: "Vườn quốc gia Hoàng Liên, Sa Pa, Lào Cai",
    location: { lat: 22.3033, lng: 103.775 },
    destination: {
      id: "sa-pa",
      slug: "sa-pa",
      name: "Sa Pa & Fansipan",
      country: "Lào Cai, Việt Nam",
      summary: "Thành phố trong sương và đỉnh Fansipan nóc nhà Đông Dương.",
      description: "Điểm đến trekking và nghỉ dưỡng hàng đầu miền Bắc.",
      image_url: "/assets/adventures/hiking.jpg",
      hero_image_url: "/assets/adventures/hiking.jpg",
      starting_price: "1350000",
      center: { lat: 22.3364, lng: 103.8438 },
    },
    category: {
      id: "trekking-leo-nui",
      slug: "trekking-leo-nui",
      name: "Trekking & Leo Núi",
    },
    average_rating: "4.9",
    review_count: 226,
  },

  // 4. HOME CARD: Camping
  {
    id: "exp-camping",
    slug: "camping",
    name: "Camping — Cắm Trại Đêm Ngắm Sao & Biển Mây Đại Ngàn",
    short_description: "Thức giấc giữa ngàn vì sao, quây quần bên đống lửa ấm và đón bình minh dát vàng thung lũng mây.",
    description:
      "Trải nghiệm cắm trại glamping cao cấp trên đỉnh đồi lộng gió Tà Xùa hoặc giữa rừng thông hồ Tuyền Lâm Đà Lạt. Bạn sẽ được thưởng thức tiệc BBQ nướng than hồng ấm cúng, nhâm nhi ly trà nóng, ngắm dải ngân hà lấp lánh và đón những tia nắng đầu tiên xuyên qua lớp sương sớm mờ ảo.",
    image_url: "/assets/adventures/camping.jpg",
    address: "Đỉnh Gió, Tà Xùa, Sơn La & Hồ Tuyền Lâm, Đà Lạt",
    location: { lat: 21.28, lng: 104.35 },
    destination: {
      id: "ta-xua",
      slug: "ta-xua",
      name: "Tà Xùa & Đà Lạt",
      country: "Việt Nam",
      summary: "Thiên đường cắm trại dã ngoại và săn mây số 1 Việt Nam.",
      description: "Nơi thư giãn tuyệt đối và hòa mình trọn vẹn vào thiên nhiên.",
      image_url: "/assets/adventures/camping.jpg",
      hero_image_url: "/assets/adventures/camping.jpg",
      starting_price: "790000",
      center: { lat: 21.28, lng: 104.35 },
    },
    category: {
      id: "cam-trai-da-ngoai",
      slug: "cam-trai-da-ngoai",
      name: "Cắm Trại & Dã Ngoại",
    },
    average_rating: "4.8",
    review_count: 198,
  },

  // 5. HOME CARD: Scuba Diving
  {
    id: "exp-scuba-diving",
    slug: "scuba-diving",
    name: "Scuba Diving — Lặn Biển Ngắm San Hô Nguyên Sinh Phú Quốc",
    short_description: "Đắm chìm vào thế giới thủy cung huyền ảo và chiêm ngưỡng những rạn san hô bắp cải quý hiếm.",
    description:
      "Được trang bị bình dưỡng khí hiện đại và kèm cặp 1-1 bởi huấn luyện viên quốc tế PADI. Quý khách sẽ tự do bơi lội giữa những cụm san hô rực rỡ sắc màu của quần đảo An Thới Phú Quốc, chạm tay vào làn nước biển trong vắt nhìn sâu tới 15m và chiêm ngưỡng đàn cá nhiệt đới bơi lội quanh mình.",
    image_url: "/assets/adventures/scuba-diving.jpg",
    address: "Hòn Thơm & Quần đảo An Thới, Nam Phú Quốc, Kiên Giang",
    location: { lat: 10.015, lng: 104.015 },
    destination: {
      id: "phu-quoc",
      slug: "phu-quoc",
      name: "Đảo Ngọc Phú Quốc",
      country: "Kiên Giang, Việt Nam",
      summary: "Thiên đường biển đảo nhiệt đới với bờ cát trắng mịn.",
      description: "Thủ phủ lặn biển và nghỉ dưỡng biển cao cấp.",
      image_url: "/assets/adventures/scuba-diving.jpg",
      hero_image_url: "/assets/adventures/scuba-diving.jpg",
      starting_price: "1450000",
      center: { lat: 10.2899, lng: 103.984 },
    },
    category: {
      id: "lan-bien-san-ho",
      slug: "lan-bien-san-ho",
      name: "Lặn Biển San Hô",
    },
    average_rating: "5.0",
    review_count: 312,
  },

  // 6. DB PLACE: Du thuyền Hạ Long 5 sao
  {
    id: "ha-long-cruise",
    slug: "ha-long-cruise",
    name: "Du Thuyền 5 Sao Vịnh Hạ Long",
    short_description: "Nghỉ dưỡng thượng lưu và ngắm trọn vẹn cảnh sắc hoàng hôn kỳ vĩ trên vịnh di sản UNESCO.",
    description:
      "Hành trình 2 ngày 1 đêm trên du thuyền sang trọng chuẩn quốc tế, đưa quý khách len lỏi qua hàng ngàn đảo đá vôi kỳ vĩ của vịnh Hạ Long và vịnh Lan Hạ. Thưởng thức đại tiệc hải sản tươi ngon, chèo kayak khám phá hang Sửng Sốt, câu mực đêm cùng ngư dân và đón bình minh với bài tập Thái Cực Quyền trên boong tàu.",
    image_url: VIETNAM_IMAGES.cruise,
    address: "Cảng tàu khách quốc tế Hạ Long, Bãi Cháy, Quảng Ninh",
    location: { lat: 20.9101, lng: 107.0844 },
    destination: {
      id: "ha-long",
      slug: "ha-long",
      name: "Vịnh Hạ Long",
      country: "Quảng Ninh, Việt Nam",
      summary: "Kỳ quan thiên nhiên thế giới UNESCO.",
      description: "Vịnh Hạ Long là niềm tự hào của du lịch Việt Nam.",
      image_url: VIETNAM_IMAGES.haLong,
      hero_image_url: VIETNAM_IMAGES.haLong,
      starting_price: "1800000",
      center: { lat: 20.9101, lng: 107.0844 },
    },
    category: {
      id: "du-thuyen",
      slug: "du-thuyen",
      name: "Du Thuyền & Nghỉ Dưỡng",
    },
    average_rating: "5.0",
    review_count: 248,
  },

  // 7. DB PLACE: Kayak Lan Hạ
  {
    id: "kayak-lan-ha",
    slug: "kayak-lan-ha",
    name: "Chèo Kayak Hang Sáng Tối — Vịnh Lan Hạ",
    short_description: "Lướt nhẹ mái chèo xuyên qua vòm hang nước ngầm kỳ ảo và làn nước ngọc bích nguyên sơ.",
    description:
      "Trải nghiệm tự tay điều khiển thuyền kayak xuyên qua hang Sáng - hang Tối huyền ảo, dẫn lối vào những thung lũng nước phẳng lặng như gương được bao bọc bởi những vách đá vôi sừng sững phủ kín cây xanh nguyên sinh.",
    image_url: VIETNAM_IMAGES.kayak,
    address: "Khu bảo tồn Vịnh Lan Hạ, Quần đảo Cát Bà, Hải Phòng",
    location: { lat: 20.85, lng: 107.05 },
    destination: {
      id: "ha-long",
      slug: "ha-long",
      name: "Vịnh Lan Hạ — Cát Bà",
      country: "Hải Phòng, Việt Nam",
      summary: "Vịnh biển nguyên sơ với hàng trăm bãi cát tự nhiên.",
      description: "Nơi lý tưởng cho các hoạt động thể thao nước ngoài trời.",
      image_url: VIETNAM_IMAGES.kayak,
      hero_image_url: VIETNAM_IMAGES.kayak,
      starting_price: "850000",
      center: { lat: 20.85, lng: 107.05 },
    },
    category: {
      id: "kayak-the-thao-nuoc",
      slug: "kayak-the-thao-nuoc",
      name: "Chèo Kayak & Thể Thao Nước",
    },
    average_rating: "4.9",
    review_count: 182,
  },

  // 8. DB PLACE: Thuyền hoa đăng Hội An
  {
    id: "hoi-an-lantern-boat",
    slug: "hoi-an-lantern-boat",
    name: "Dạo Thuyền Hoa Đăng Sông Hoài Phố Cổ Hội An",
    short_description: "Thả hoa đăng ước nguyện và ngắm nhìn phố cổ Hội An lung linh dưới ánh đèn lồng rực rỡ.",
    description:
      "Khi màn đêm buông xuống, ngồi trên con thuyền gỗ mộc mạc ngắm nhìn dãy nhà cổ soi bóng xuống mặt nước lấp lánh hoa đăng là trải nghiệm đậm chất thơ của di sản văn hóa thế giới Hội An.",
    image_url: VIETNAM_IMAGES.hoiAn,
    address: "Bến thuyền sông Hoài, Phố cổ Hội An, Quảng Nam",
    location: { lat: 15.8801, lng: 108.3272 },
    destination: {
      id: "hoi-an",
      slug: "hoi-an",
      name: "Phố Cổ Hội An",
      country: "Quảng Nam, Việt Nam",
      summary: "Di sản văn hóa thế giới UNESCO bên dòng sông Hoài.",
      description: "Điểm đến văn hóa và ẩm thực quyến rũ bậc nhất miền Trung.",
      image_url: VIETNAM_IMAGES.hoiAn,
      hero_image_url: VIETNAM_IMAGES.hoiAn,
      starting_price: "1200000",
      center: { lat: 15.8801, lng: 108.3272 },
    },
    category: {
      id: "van-hoa-di-san",
      slug: "van-hoa-di-san",
      name: "Văn Hóa & Di Sản",
    },
    average_rating: "4.9",
    review_count: 275,
  },

  // 9. DB PLACE: Thuyền nan Tràng An
  {
    id: "trang-an-boat-tour",
    slug: "trang-an-boat-tour",
    name: "Thuyền Nan Khám Phá Quần Thể Hang Động Tràng An",
    short_description: "Xuôi dòng nước trong vắt lướt qua những thung lũng đá vôi ngập nước kỳ ảo.",
    description:
      "Các cô lái đò bản địa sẽ đưa du khách đi xuyên qua chuỗi hang động tự nhiên huyền bí, ghé thăm Hành cung Vũ Lâm và phim trường Kong Skull Island nổi tiếng tại di sản thế giới hỗn hợp Tràng An.",
    image_url: VIETNAM_IMAGES.ninhBinh,
    address: "Khu du lịch sinh thái Tràng An, Hoa Lư, Ninh Bình",
    location: { lat: 20.255, lng: 105.905 },
    destination: {
      id: "ninh-binh",
      slug: "ninh-binh",
      name: "Quần Thể Danh Thắng Tràng An",
      country: "Ninh Bình, Việt Nam",
      summary: "Di sản thế giới hỗn hợp đầu tiên của Đông Nam Á.",
      description: "Non nước hữu tình với thung lũng đá vôi ngập nước kỳ vĩ.",
      image_url: VIETNAM_IMAGES.ninhBinh,
      hero_image_url: VIETNAM_IMAGES.ninhBinh,
      starting_price: "1100000",
      center: { lat: 20.2506, lng: 105.9745 },
    },
    category: {
      id: "van-hoa-di-san",
      slug: "van-hoa-di-san",
      name: "Văn Hóa & Di Sản",
    },
    average_rating: "4.9",
    review_count: 210,
  },
];

export function getExperienceBySlug(slug: string): Place | undefined {
  return VIETNAM_EXPERIENCES.find((e) => e.slug === slug);
}
