import { VIETNAM_IMAGES } from "./assets";

export interface TourItineraryDay {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
}

export interface TourItem {
  id: string;
  slug: string;
  aliases?: string[];
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
  gallery?: string[];
  overview: string;
  highlights: string[];
  itinerary: TourItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  transport: string;
  hotel: string;
}

export const VIETNAM_TOURS: TourItem[] = [
  {
    id: "tour-ha-long-cruise-2n1d",
    slug: "tour-ha-long-cruise-2n1d",
    aliases: ["ha-long-cruise"],
    title: "Du Thuyền 5 Sao Vịnh Hạ Long & Lan Hạ — Kỳ Quan Biển Ngọc",
    destination: "Vịnh Hạ Long, Quảng Ninh",
    region: "north",
    duration: "2 Ngày 1 Đêm",
    departure: "Hà Nội / Quảng Ninh",
    price: 1850000,
    originalPrice: 2300000,
    rating: 5.0,
    reviewCount: 254,
    image: VIETNAM_IMAGES.cruise,
    gallery: [VIETNAM_IMAGES.cruise, VIETNAM_IMAGES.haLong, VIETNAM_IMAGES.kayak, VIETNAM_IMAGES.oceanBanner],
    overview:
      "Tận hưởng kỳ nghỉ dưỡng thượng lưu trên du thuyền 5 sao đẳng cấp thế giới, đưa quý khách len lỏi qua hàng ngàn hòn đảo đá vôi kỳ vĩ của Vịnh Hạ Long và Vịnh Lan Hạ nguyên sơ. Trải nghiệm ẩm thực hải sản thượng hạng, chèo thuyền kayak và đón hoàng hôn lộng lẫy trên boong tàu.",
    highlights: [
      "Phòng Suite sang trọng với ban công riêng hướng biển toàn cảnh",
      "Chèo thuyền kayak hoặc ngồi thuyền nan khám phá Hang Sáng Tối kỳ bí",
      "Tiệc trà chiều Sunset Party ngắm hoàng hôn vịnh biển và lớp học nấu ăn truyền thống",
      "Câu mực đêm cùng ngư dân bản địa và tập Thái Cực Quyền đón bình minh",
    ],
    itinerary: [
      {
        day: 1,
        title: "Hà Nội — Cảng Quốc Tế Hạ Long — Khám Phá Vịnh Lan Hạ",
        morning: "08:30 Xe đón quý khách tại khu phố cổ Hà Nội, khởi hành đi Hạ Long qua cao tốc hiện đại. 11:30 Đến cảng Tuần Châu, làm thủ tục lên du thuyền, thưởng thức đồ uống chào mừng và nghe hướng dẫn an toàn.",
        afternoon: "Thưởng thức bữa trưa buffet hải sản tươi ngon trong khi du thuyền lướt qua hòn Đỉnh Hương, hòn Gà Chọi. Chiều đến khu vực Hang Sáng Tối, tự do chèo thuyền kayak lướt qua làn nước xanh ngọc bích.",
        evening: "Tham gia tiệc Sunset Party trên sundeck với rượu vang và trái cây. 19:30 Dùng bữa tối set menu cao cấp. Buổi tối tự do trải nghiệm câu mực đêm, hát karaoke hoặc thư giãn tại spa.",
      },
      {
        day: 2,
        title: "Vịnh Lan Hạ — Động Trung Trang — Trở Về Hà Nội",
        morning: "06:15 Thức giấc ngắm bình minh trên vịnh, tham gia lớp hướng dẫn Thái Cực Quyền (Tai Chi). Dùng điểm tâm nhẹ với trà, cà phê và bánh ngọt.",
        afternoon: "Thăm quan hang Trung Trang trên đảo Cát Bà với cấu trúc thạch nhũ hàng triệu năm tuổi. 09:30 Trở về du thuyền làm thủ tục trả phòng, dùng bữa trưa sớm (brunch) trong khi du thuyền hành trình về bến.",
        evening: "11:45 Du thuyền cập cảng Tuần Châu. Xe đón quý khách về lại Hà Nội. 15:00 Về đến điểm đón ban đầu, kết thúc chuyến hải trình đáng nhớ.",
      },
    ],
    inclusions: [
      "1 đêm nghỉ phòng Suite sang trọng ban công riêng trên du thuyền 5 sao",
      "Tất cả 4 bữa ăn tiêu chuẩn cao cấp (1 trưa, 1 tối, 1 sáng nhẹ, 1 brunch trưa)",
      "Vé thắng cảnh tham quan các điểm trong hải trình Vịnh Hạ Long - Lan Hạ",
      "Thuyền kayak hoặc thuyền nan có người chèo tại hang Sáng Tối",
      "Hướng dẫn viên chuyên nghiệp, tận tâm phục vụ suốt hành trình",
      "Bảo hiểm du lịch trọn gói theo quy định",
    ],
    exclusions: [
      "Chi phí xe đưa đón khứ hồi Hà Nội - Hạ Long (tuỳ chọn thêm)",
      "Dịch vụ spa, đồ uống tại quầy bar và chi tiêu cá nhân",
      "Thuế VAT 8% (nếu yêu cầu xuất hoá đơn)",
    ],
    transport: "Xe limousine cao tốc khứ hồi",
    hotel: "Du thuyền 5 sao chuẩn quốc tế",
  },
  {
    id: "tour-sapa-fansipan-2n1d",
    slug: "tour-sapa-fansipan-2n1d",
    aliases: ["sapa-fansipan-trek"],
    title: "Tour Sa Pa — Chinh Phục Nóc Nhà Fansipan & Bản Cát Cát Thơ Mộng",
    destination: "Sa Pa, Lào Cai",
    region: "north",
    duration: "2 Ngày 1 Đêm",
    departure: "Hà Nội",
    price: 1650000,
    originalPrice: 1950000,
    rating: 4.9,
    reviewCount: 182,
    image: VIETNAM_IMAGES.saPa,
    gallery: [VIETNAM_IMAGES.saPa, VIETNAM_IMAGES.hiking, VIETNAM_IMAGES.camping],
    overview:
      "Hành trình đưa du khách chạm vào mây trời Sa Pa, chinh phục đỉnh Fansipan 3.143m nóc nhà Đông Dương bằng cáp treo 3 dây hiện đại nhất thế giới, dạo bước qua những thửa ruộng bậc thang kỳ vĩ tại thung lũng Mường Hoa và trải nghiệm văn hóa độc đáo của đồng bào H'Mông, Dao Đỏ.",
    highlights: [
      "Trải nghiệm cáp treo Sun World Fansipan Legend bay xuyên qua thung lũng mây",
      "Khám phá bản Cát Cát thơ mộng bên dòng suối Hoa và cối xay nước khổng lồ",
      "Thưởng thức lẩu cá tầm, cá hồi tươi sống và đặc sản nướng than hồng Sa Pa",
      "Check-in nhà thờ đá cổ Sa Pa và quảng trường trung tâm lung linh về đêm",
    ],
    itinerary: [
      {
        day: 1,
        title: "Hà Nội — Thị Xã Sa Pa — Bản Cát Cát Thơ Mộng",
        morning: "06:30 Xe giường nằm cao cấp hoặc limousine đón quý khách tại điểm hẹn, khởi hành đi Sa Pa theo cao tốc Nội Bài - Lào Cai. Trên đường ngắm nhìn cảnh sắc hùng vĩ của dãy Hoàng Liên Sơn.",
        afternoon: "12:30 Đến Sa Pa, dùng bữa trưa đặc sản vùng cao, nhận phòng khách sạn nghỉ ngơi. 14:30 Hướng dẫn viên đưa đoàn bách bộ khám phá bản Cát Cát, tìm hiểu nghề dệt thổ cẩm truyền thống của người H'Mông.",
        evening: "18:30 Thưởng thức bữa tối ấm cúng với lẩu cá hồi Sa Pa. Tự do dạo phố đêm, thưởng thức hạt dẻ nướng, ghé chợ tình Sa Pa (vào tối thứ 7) và cảm nhận không khí se lạnh dễ chịu.",
      },
      {
        day: 2,
        title: "Chinh Phục Đỉnh Fansipan 3.143m — Trở Về Hà Nội",
        morning: "07:00 Ăn sáng tại khách sạn. Xe đưa đoàn đến ga cáp treo Fansipan Legend, đi cáp treo xuyên mây lên đỉnh Fansipan 3.143m, chiêm bái đại tượng Phật A Di Đà bằng đồng lớn nhất Việt Nam.",
        afternoon: "11:30 Trở về thị xã, trả phòng khách sạn và dùng bữa trưa. Tự do mua sắm đặc sản mận, lê, nấm hương rừng và thổ cẩm tại chợ Sa Pa.",
        evening: "14:00 Lên xe khởi hành về lại Hà Nội. 20:30 Về đến trung tâm Hà Nội, kết thúc chuyến đi trọn vẹn và ý nghĩa.",
      },
    ],
    inclusions: [
      "Xe vận chuyển du lịch đời mới đưa đón khứ hồi Hà Nội - Sa Pa",
      "1 đêm nghỉ khách sạn 4 sao trung tâm thị xã Sa Pa (2 người/phòng)",
      "Các bữa ăn theo chương trình: 2 bữa trưa, 1 bữa tối, 1 bữa sáng buffet",
      "Vé tham quan bản Cát Cát",
      "Hướng dẫn viên bản địa am hiểu sâu sắc văn hóa Tây Bắc",
      "Bảo hiểm du lịch trọn gói",
    ],
    exclusions: [
      "Vé cáp treo Fansipan khứ hồi và tàu hỏa leo núi Mường Hoa",
      "Đồ uống gọi thêm trong các bữa ăn và chi tiêu cá nhân",
      "Tiền tip cho lái xe và hướng dẫn viên",
    ],
    transport: "Xe limousine / giường nằm VIP",
    hotel: "Khách sạn 4 sao trung tâm Sa Pa",
  },
  {
    id: "tour-da-nang-hoi-an-trail",
    slug: "tour-da-nang-hoi-an-trail",
    aliases: ["da-nang-hoi-an-trail", "tour-hoi-an-di-san-3n2d"],
    title: "Đà Nẵng — Phố Cổ Hội An — Cầu Vàng Bà Nà Hills Di Sản",
    destination: "Đà Nẵng & Hội An",
    region: "central",
    duration: "3 Ngày 2 Đêm",
    departure: "Đà Nẵng / Hà Nội / TP.HCM",
    price: 2850000,
    originalPrice: 3400000,
    rating: 4.9,
    reviewCount: 215,
    image: VIETNAM_IMAGES.hoiAn,
    gallery: [VIETNAM_IMAGES.hoiAn, VIETNAM_IMAGES.daNang, VIETNAM_IMAGES.hero],
    overview:
      "Hành trình kết nối thành phố biển Đà Nẵng đáng sống và di sản văn hóa thế giới Phố cổ Hội An. Check-in Cầu Vàng Bà Nà Hills nổi tiếng toàn cầu, dạo bước bên những con ngõ cổ rực rỡ đèn lồng và thả hoa đăng ước nguyện trên dòng sông Hoài thơ mộng.",
    highlights: [
      "Chạm tay vào biểu tượng Cầu Vàng lơ lửng giữa mây trời Bà Nà Hills",
      "Thưởng ngoạn phố cổ Hội An về đêm lung linh ánh đèn lồng rực rỡ sắc màu",
      "Đi thuyền gỗ thả hoa đăng ước nguyện trên sông Hoài êm đềm",
      "Khám phá danh thắng Ngũ Hành Sơn huyền bí và bán đảo Sơn Trà",
    ],
    itinerary: [
      {
        day: 1,
        title: "Đà Nẵng Đón Khách — Bán Đảo Sơn Trà — Phố Cổ Hội An",
        morning: "Xe và hướng dẫn viên đón quý khách tại sân bay quốc tế Đà Nẵng. Đoàn di chuyển tham quan Bán đảo Sơn Trà, viếng chùa Linh Ứng ngắm tượng Phật Bà Quan Âm cao 67m hướng ra biển Đông.",
        afternoon: "Dùng bữa trưa đặc sản bánh tráng cuốn thịt heo hai đầu da nức tiếng. Nhận phòng khách sạn nghỉ ngơi. 15:30 Khởi hành đi phố cổ Hội An.",
        evening: "Bách bộ qua Chùa Cầu Nhật Bản, nhà cổ Phùng Hưng, hội quán Phúc Kiến. 18:30 Thưởng thức bữa tối đặc sản cao lầu, mì Quảng. Đi thuyền gỗ thả hoa đăng trên sông Hoài trước khi về lại Đà Nẵng.",
      },
      {
        day: 2,
        title: "Đại Ngàn Bà Nà Hills — Cầu Vàng — Biển Mỹ Khê",
        morning: "07:30 Ăn sáng tại khách sạn. Khởi hành đi khu du lịch Sun World Ba Na Hills. Đi tuyến cáp treo đạt nhiều kỷ lục thế giới lên đỉnh núi Chúa.",
        afternoon: "Check-in kiệt tác Cầu Vàng được nâng đỡ bởi đôi bàn tay khổng lồ, dạo bước qua Làng Pháp cổ kính và vườn hoa Le Jardin D'Amour. Dùng tiệc buffet quốc tế với hơn 100 món ăn tại nhà hàng.",
        evening: "15:30 Xuống cáp treo trở về Đà Nẵng, tự do tắm biển Mỹ Khê — một trong những bãi biển quyến rũ nhất hành tinh. Tối tự do xem Cầu Rồng phun lửa, phun nước.",
      },
      {
        day: 3,
        title: "Danh Thắng Ngũ Hành Sơn — Làng Đá Mỹ Nghệ — Tiễn Đoàn",
        morning: "08:00 Dùng điểm tâm sáng. Tham quan danh thắng Ngũ Hành Sơn với hệ thống hang động Huyền Không, động Âm Phủ kỳ bí. Thăm làng đá mỹ nghệ Non Nước.",
        afternoon: "Dùng bữa trưa tại nhà hàng. Mua sắm đặc sản miền Trung tại chợ Cồn hoặc chợ Hàn (chả bò, mè xửng, mực một nắng).",
        evening: "Xe đưa quý khách ra sân bay Đà Nẵng, làm thủ tục đáp chuyến bay về lại Hà Nội / TP.HCM. Kết thúc hành trình di sản miền Trung.",
      },
    ],
    inclusions: [
      "Khách sạn 4 sao cao cấp gần biển Đà Nẵng (2 khách/phòng)",
      "Xe du lịch đời mới đón tiễn và tham quan suốt tuyến",
      "Các bữa ăn chính chất lượng theo thực đơn miền Trung phong phú",
      "Vé tham quan danh thắng Ngũ Hành Sơn, phố cổ Hội An, thuyền hoa đăng",
      "Hướng dẫn viên miền Trung tận tâm, vui vẻ và am hiểu lịch sử",
      "Bảo hiểm du lịch mức bồi thường tối đa 50.000.000 VNĐ/vụ",
    ],
    exclusions: [
      "Vé máy bay khứ hồi đến Đà Nẵng",
      "Vé cáp treo Bà Nà Hills và buffet trưa trên đỉnh núi",
      "Chi phí cá nhân ngoài chương trình",
    ],
    transport: "Xe du lịch điều hòa cao cấp",
    hotel: "Khách sạn 4 sao biển Đà Nẵng",
  },
  {
    id: "tour-mekong-delta-floating-market",
    slug: "tour-mekong-delta-floating-market",
    aliases: ["mekong-delta-floating-market", "tour-mien-tay-song-nuoc-2n1d"],
    title: "Mê Kông Sông Nước — Chợ Nổi Cái Răng & Miệt Vườn Cần Thơ",
    destination: "Cần Thơ & Bến Tre",
    region: "south",
    duration: "2 Ngày 1 Đêm",
    departure: "TP. Hồ Chí Minh",
    price: 1950000,
    originalPrice: 2400000,
    rating: 4.8,
    reviewCount: 142,
    image: VIETNAM_IMAGES.kayak,
    gallery: [VIETNAM_IMAGES.kayak, VIETNAM_IMAGES.oceanBanner, VIETNAM_IMAGES.hero],
    overview:
      "Về miền Tây sông nước trù phú, xuôi mái chèo len lỏi qua những rặng dừa nước Bến Tre rợp bóng, trải nghiệm nét văn hóa giao thương độc đáo trên chợ nổi Cái Răng lúc bình minh và thưởng thức trái cây ngọt lành ngay tại vườn sinh thái.",
    highlights: [
      "Xuôi thuyền nan ba lá len lỏi giữa rặng dừa nước mát rượi tại Bến Tre",
      "Trải nghiệm chợ nổi Cái Răng Cần Thơ rộn rã lúc rạng sáng với cây bẹo chào hàng",
      "Thưởng thức đờn ca tài tử Nam Bộ và tự tay làm kẹo dừa truyền thống",
      "Đại tiệc ẩm thực miền Tây: cá lóc nướng trui, lẩu mắm đồng quê, bánh xèo giòn rụm",
    ],
    itinerary: [
      {
        day: 1,
        title: "TP.HCM — Bến Tre Xứ Dừa — Tây Đô Cần Thơ",
        morning: "07:30 Xe đón quý khách tại trung tâm TP.HCM khởi hành đi Bến Tre. Đến bến thuyền sông Tiền, lên tàu du ngoạn ngắm bốn cù lao Long, Lân, Quy, Phụng.",
        afternoon: "Đi xe ngựa trên đường làng rợp bóng mát, ghé thăm lò kẹo dừa thủ công, trại nuôi ong lấy mật. Thưởng thức trái cây theo mùa và nghe đờn ca tài tử. Trưa dùng bữa với cá tai tượng chiên xù.",
        evening: "15:00 Khởi hành về Cần Thơ, nhận phòng khách sạn. Tối lên du thuyền Cần Thơ dùng bữa tối, ngắm cầu Cần Thơ lung linh ánh đèn trên sông Hậu.",
      },
      {
        day: 2,
        title: "Chợ Nổi Cái Răng — Lò Hủ Tiếu Truyền Thống — Về TP.HCM",
        morning: "05:30 Sáng sớm lên tàu đi chợ nổi Cái Răng — chợ nổi đầu mối lớn nhất ĐBSCL. Thưởng thức tô bún riêu cua, cà phê kho ngay trên ghe bập bềnh sóng nước.",
        afternoon: "Thăm lò làm hủ tiếu truyền thống, thưởng thức pizza hủ tiếu độc đáo. Ghé miệt vườn sinh thái hái trái cây (chôm chôm, nhãn, sầu riêng tuỳ mùa). Dùng bữa trưa dân dã.",
        evening: "13:30 Đoàn lên xe khởi hành về lại TP.HCM. 18:00 Về đến điểm đón ban đầu, chia tay và hẹn gặp lại quý khách.",
      },
    ],
    inclusions: [
      "Xe du lịch máy lạnh chất lượng cao đưa đón khứ hồi TP.HCM - Miền Tây",
      "Khách sạn 4 sao trung tâm thành phố Cần Thơ (2 người/phòng)",
      "Thuyền máy tham quan cù lao, xuồng chèo ba lá Bến Tre, thuyền chợ nổi Cái Răng",
      "Ăn uống theo chương trình: 2 bữa trưa, 1 bữa tối du thuyền, 1 bữa sáng buffet",
      "Vé vào cửa các điểm tham quan, đờn ca tài tử, thưởng thức trái cây mật ong",
      "Hướng dẫn viên chuyên nghiệp, hài hước và giàu kinh nghiệm",
    ],
    exclusions: [
      "Chi phí cá nhân, đồ uống ngoài thực đơn",
      "Tiền tip cho tài xế và hướng dẫn viên",
    ],
    transport: "Xe du lịch đời mới",
    hotel: "Khách sạn 4 sao Cần Thơ",
  },
  {
    id: "tour-da-lat-3n2d",
    slug: "tour-da-lat-3n2d",
    title: "Tour Đà Lạt — Săn Mây Đồi Chè & Thung Lũng Ngàn Hoa Mộng Mơ",
    destination: "Đà Lạt, Lâm Đồng",
    region: "central",
    duration: "3 Ngày 2 Đêm",
    departure: "TP. Hồ Chí Minh / Hà Nội",
    price: 2450000,
    originalPrice: 2950000,
    rating: 4.9,
    reviewCount: 128,
    image: VIETNAM_IMAGES.daLat,
    gallery: [VIETNAM_IMAGES.daLat, VIETNAM_IMAGES.camping, VIETNAM_IMAGES.hero],
    overview:
      "Trốn khỏi nhịp sống ồn ào để đắm mình vào thành phố ngàn hoa Đà Lạt mờ sương. Thức giấc ngắm biển mây tại đồi chè Cầu Đất, dạo bước bên bờ hồ Tuyền Lâm phẳng lặng, check-in thung lũng hoa cẩm tú cầu rực rỡ và tận hưởng tiệc nướng BBQ ấm cúng giữa rừng thông.",
    highlights: [
      "Đón bình minh săn mây đại ngàn tại Cầu Đất Panorama",
      "Check-in hồ Tuyền Lâm, Thiền Viện Trúc Lâm thanh tịnh",
      "Thưởng thức tiệc BBQ giữa rừng thông mộng mơ và cà phê acoustic",
      "Thăm trang trại Puppy Farm và thung lũng đèn đêm rực sáng",
    ],
    itinerary: [
      {
        day: 1,
        title: "Đón Khách Đà Lạt — Dinh Bảo Đại — Hồ Tuyền Lâm",
        morning: "Đón quý khách tại sân bay Liên Khương hoặc bến xe Đà Lạt, di chuyển về trung tâm nhận phòng khách sạn và thưởng thức cà phê ngắm hồ Xuân Hương.",
        afternoon: "Tham quan Dinh III Bảo Đại cổ kính kiến trúc Pháp, viếng Thiền Viện Trúc Lâm nằm giữa đồi thông xanh ngát, ngắm toàn cảnh hồ Tuyền Lâm thơ mộng.",
        evening: "Thưởng thức lẩu gà lá é Tao Ngộ trứ danh. Dạo chợ đêm Đà Lạt thưởng thức bánh tráng nướng, sữa đậu nành nóng hổi.",
      },
      {
        day: 2,
        title: "Săn Mây Cầu Đất — Thung Lũng Hoa — Tiệc BBQ Rừng Thông",
        morning: "05:00 Khởi hành sớm đi đồi chè Cầu Đất đón bình minh và săn biển mây bồng bềnh trên thảm gỗ cầu mây. Dùng điểm tâm sáng giữa sương sớm vùng cao.",
        afternoon: "Thăm vườn hoa cẩm tú cầu khổng lồ, đồi thông hai mộ và nông trại cún Puppy Farm vui nhộn.",
        evening: "18:00 Tiệc nướng BBQ giữa không gian rừng thông lung linh ánh đèn và thưởng thức đêm nhạc Acoustic lãng mạn.",
      },
      {
        day: 3,
        title: "Chợ Đà Lạt — Thác Datanla Thử Thách Máng Trượt — Tiễn Khách",
        morning: "Ăn sáng tại khách sạn, tự do mua sắm dâu tây tươi, mứt dâu, atiso tại chợ Đà Lạt. Trả phòng khách sạn.",
        afternoon: "Tham quan thác Datanla hùng vĩ, trải nghiệm hệ thống máng trượt xuyên rừng thông dài nhất Đông Nam Á.",
        evening: "Xe tiễn quý khách ra sân bay Liên Khương hoặc bến xe, kết thúc hành trình khám phá phố núi.",
      },
    ],
    inclusions: [
      "Khách sạn 4 sao trung tâm thành phố Đà Lạt (2 khách/phòng)",
      "Xe du lịch đời mới phục vụ suốt tuyến tham quan",
      "Các bữa ăn chính phong phú bao gồm 1 bữa tiệc BBQ rừng thông",
      "Vé tham quan các thắng cảnh trong chương trình",
      "Bảo hiểm du lịch trọn gói",
    ],
    exclusions: ["Vé máy bay / vé xe đến Đà Lạt", "Vé máng trượt thác Datanla", "Chi tiêu cá nhân"],
    transport: "Xe limousine đời mới",
    hotel: "Khách sạn 4 sao trung tâm",
  },
  {
    id: "tour-trang-an-hang-mua-1n",
    slug: "tour-trang-an-hang-mua-1n",
    title: "Tour Ninh Bình — Danh Thắng Tràng An & Đỉnh Hang Múa Kỳ Vĩ",
    destination: "Ninh Bình",
    region: "north",
    duration: "1 Ngày",
    departure: "Hà Nội",
    price: 950000,
    originalPrice: 1200000,
    rating: 4.8,
    reviewCount: 96,
    image: VIETNAM_IMAGES.ninhBinh,
    gallery: [VIETNAM_IMAGES.ninhBinh, VIETNAM_IMAGES.haLong],
    overview:
      "Chuyến hành trình trong ngày hoàn hảo từ thủ đô Hà Nội về với Cố đô Hoa Lư ngàn năm lịch sử và di sản hỗn hợp thế giới Tràng An. Trải nghiệm ngồi thuyền nan lướt qua chuỗi hang động tự nhiên và leo gần 500 bậc đá chinh phục đỉnh Hang Múa ngắm trọn vẹn non nước Tam Cốc.",
    highlights: [
      "Thuyền nan đưa du khách xuyên qua hệ thống hang động ngập nước kỳ ảo",
      "Chinh phục gần 500 bậc đá đỉnh Ngọa Long ngắm toàn cảnh sông Ngô Đồng",
      "Viếng thăm Cố đô Hoa Lư — kinh đô đầu tiên của nhà nước Đại Cồ Việt",
      "Thưởng thức buffet đặc sản dê núi Ninh Bình và cơm cháy giòn rụm",
    ],
    itinerary: [
      {
        day: 1,
        title: "Hà Nội — Cố Đô Hoa Lư — Tràng An — Hang Múa",
        morning: "07:30 Xe và HDV đón tại khu vực phố cổ Hà Nội khởi hành đi Ninh Bình. 10:00 Đến Cố đô Hoa Lư, thăm đền thờ Vua Đinh Tiên Hoàng và Vua Lê Đại Hành.",
        afternoon: "12:00 Dùng bữa trưa buffet đặc sản dê núi tại nhà hàng địa phương. 13:30 Xuống thuyền nan tại bến Tràng An khám phá hang Đột, hang Mây, hang Đại và Hành cung Vũ Lâm. 16:00 Di chuyển đến Hang Múa, leo bậc đá ngắm hoàng hôn Tam Cốc.",
        evening: "17:30 Lên xe khởi hành về lại Hà Nội. 19:30 Về đến trung tâm thành phố Hà Nội, chia tay quý khách.",
      },
    ],
    inclusions: [
      "Xe du lịch đưa đón khứ hồi Hà Nội - Ninh Bình",
      "Bữa trưa buffet đặc sản địa phương",
      "Vé thuyền tham quan danh thắng Tràng An",
      "Vé tham quan Cố đô Hoa Lư và Hang Múa",
      "Hướng dẫn viên chuyên nghiệp suốt tuyến",
    ],
    exclusions: ["Đồ uống trong bữa ăn", "Chi phí cá nhân", "Thuế VAT"],
    transport: "Xe du lịch đời mới",
    hotel: "Tour trong ngày",
  },
  {
    id: "tour-phu-quoc-nam-dao-4n3d",
    slug: "tour-phu-quoc-nam-dao-4n3d",
    title: "Đảo Ngọc Phú Quốc — Lặn Ngắm San Hô & Hoàng Hôn Sunset Sanato",
    destination: "Phú Quốc, Kiên Giang",
    region: "south",
    duration: "4 Ngày 3 Đêm",
    departure: "Phú Quốc / Hà Nội / TP.HCM",
    price: 3650000,
    originalPrice: 4200000,
    rating: 5.0,
    reviewCount: 310,
    image: VIETNAM_IMAGES.phuQuoc,
    gallery: [VIETNAM_IMAGES.phuQuoc, VIETNAM_IMAGES.scubaDiving, VIETNAM_IMAGES.oceanBanner],
    overview:
      "Tận hưởng thiên đường biển đảo nhiệt đới Phú Quốc với làn nước trong vắt nhìn thấy đáy, bãi cát trắng mịn Bãi Khem, cano siêu tốc lướt sóng qua 4 hòn đảo đẹp nhất vịnh An Thới, lặn ngắm rạn san hô tự nhiên rực rỡ và đắm mình trong ánh hoàng hôn tuyệt mỹ.",
    highlights: [
      "Vi vu cano siêu tốc khám phá 4 đảo: Hòn Mây Rút, Hòn Gầm Ghì, Hòn Móng Tay",
      "Lặn ngắm rạn san hô tự nhiên tuyệt đẹp được bảo tồn nguyên vẹn",
      "Chụp ảnh flycam chuyên nghiệp và quay video kỷ niệm dưới nước miễn phí",
      "Thưởng thức hải sản nướng tươi sống trên đảo hoang sơ",
    ],
    itinerary: [
      {
        day: 1,
        title: "Đón Khách Phú Quốc — Dinh Cậu — Hoàng Hôn Sunset Sanato",
        morning: "Xe đón khách tại sân bay Phú Quốc đưa về resort nhận phòng nghỉ ngơi. Tự do tắm biển hoặc thư giãn bên hồ bơi.",
        afternoon: "Viếng thăm Dinh Cậu, Dinh Bà biểu tượng tâm linh của ngư dân đảo Ngọc. Đến Sunset Sanato Beach Club check-in biểu tượng đàn voi trên biển ngắm hoàng hôn lộng lẫy.",
        evening: "Dùng bữa tối hải sản tại nhà hàng ven biển. Tự do dạo chợ đêm Phú Quốc thưởng thức kem cuộn Thái Lan, hải sản tươi nướng.",
      },
      {
        day: 2,
        title: "Khám Phá 4 Đảo Nam Phú Quốc — Lặn Ngắm San Hô Bằng Cano",
        morning: "08:30 Xe đưa đoàn đến cảng An Thới, lên cano siêu tốc lướt sóng tới Hòn Móng Tay tắm biển cát trắng. Tiếp tục đến Hòn Gầm Ghì lặn ngắm san hô tự nhiên.",
        afternoon: "Đến Hòn Mây Rút Trong ăn trưa tiệc hải sản 8 món thịnh soạn. Quý khách được đội ngũ media chụp ảnh SUP ván chèo và quay flycam kỷ niệm.",
        evening: "16:30 Cano đưa đoàn về lại đất liền. Trở về khách sạn nghỉ ngơi. Tối tự do khám phá thị trấn Hoàng Hôn Sunset Town rực rỡ phong cách Địa Trung Hải.",
      },
      {
        day: 3,
        title: "Cáp Treo Hòn Thơm — Công Viên Nước Aquatopia — Bãi Sao",
        morning: "Trải nghiệm cáp treo 3 dây vượt biển dài nhất thế giới sang đảo Hòn Thơm, ngắm nhìn toàn cảnh làng chài An Thới từ trên cao. Vui chơi thỏa thích tại công viên nước Aquatopia.",
        afternoon: "Trở về bờ, ghé Bãi Sao — bãi biển có dải cát trắng mịn như kem và hàng dừa nghiêng bóng mát. Tắm biển và thưởng thức dừa xiêm ngọt lịm.",
        evening: "Dùng bữa tối tại nhà hàng với món gỏi cá trích đặc sản nức tiếng. Tự do câu mực đêm ngoài khơi.",
      },
      {
        day: 4,
        title: "Nhà Thùng Nước Mắm — Vườn Tiêu Phú Quốc — Tiễn Sân Bay",
        morning: "Dùng điểm tâm sáng tại resort. Thăm nhà thùng nước mắm truyền thống Phụng Hưng, vườn tiêu Suối Đá và cơ sở sản xuất ngọc trai cao cấp.",
        afternoon: "Trả phòng khách sạn. Xe đưa quý khách ra sân bay Phú Quốc, hỗ trợ làm thủ tục chuyến bay về lại Hà Nội / TP.HCM.",
        evening: "Về đến điểm đến ban đầu, kết thúc kỳ nghỉ biển đảo trọn vẹn và nạp đầy năng lượng mới.",
      },
    ],
    inclusions: [
      "3 đêm nghỉ tại Resort 4 sao ven biển Phú Quốc (2 người/phòng)",
      "Tour cano siêu tốc 4 đảo kèm thiết bị lặn biển ngắm san hô (áo phao, kính lặn)",
      "Tặng gói chụp hình máy ảnh cơ & quay clip Flycam chuyên nghiệp",
      "Ăn uống theo chương trình: 3 bữa sáng buffet, 4 bữa chính hải sản",
      "Xe ô tô du lịch đời mới đưa đón suốt hành trình",
      "Bảo hiểm du lịch trọn gói",
    ],
    exclusions: [
      "Vé máy bay khứ hồi tới Phú Quốc",
      "Vé cáp treo Hòn Thơm (tuỳ chọn bổ sung)",
      "Chi tiêu cá nhân ngoài chương trình",
    ],
    transport: "Cano siêu tốc & xe du lịch",
    hotel: "Resort 4 sao sát biển",
  },
];

export function getTourBySlug(slug: string): TourItem | undefined {
  return VIETNAM_TOURS.find((t) => t.slug === slug || t.aliases?.includes(slug));
}
