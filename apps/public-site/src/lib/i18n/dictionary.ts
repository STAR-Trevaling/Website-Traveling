import { Locale, TranslationDictionary } from "./types";

export const DICTIONARY: Record<Locale, TranslationDictionary> = {
  vi: {
    nav: {
      home: "Trang Chủ",
      explore: "Khám Phá",
      destinations: "Điểm Đến",
      packages: "Gói Trải Nghiệm",
      tours: "Tour Tuyển Chọn",
      stories: "Cẩm Nang",
      aboutMenu: "Giới Thiệu",
      aboutUs: "Về Chúng Tôi",
      partner: "Cổng Đối Tác",
      contact: "Liên Hệ",
      login: "Đăng nhập",
      account: "Tài khoản",
      phoneLabel: "+84 903 846 568",
      emailLabel: "contact@startravels.vn",
    },
    hero: {
      discoverTitle: "Non Sông Gấm Vóc — Hành Trình Bất Tận",
      discoverSubtitle: "Khám phá kỳ quan thiên nhiên và trải nghiệm văn hóa bản địa độc bản cùng Star Travels.",
      exploreDestinationsBtn: "Khám Phá Điểm Đến",
      viewToursBtn: "Xem Tour Tuyển Chọn",
      slides: [
        {
          title: "Non Sông Gấm Vóc",
          subtitle: "Khám phá kỳ quan thiên nhiên và di sản văn hóa cùng Star Travels.",
          tag: "Di sản thiên nhiên thế giới UNESCO",
        },
        {
          title: "Xứ Sở Ngàn Hoa",
          subtitle: "Thả hồn giữa đồi thông xanh ngát và hồ Tuyền Lâm phẳng lặng.",
          tag: "Thành phố tình yêu & ngàn hoa",
        },
        {
          title: "Non Nước Hữu Tình",
          subtitle: "Chiêm ngưỡng thung lũng đá vôi và di sản thế giới kép UNESCO.",
          tag: "Di sản thế giới kép UNESCO",
        },
      ],
    },
    destinations: {
      tag: "Danh Thắng Tuyển Chọn",
      heading: "Điểm Đến Nổi Tiếng",
      subheading: "Khám phá các di sản văn hóa, thắng cảnh kỳ vĩ và thiên đường biển đảo hàng đầu Việt Nam",
      viewAllBtn: "Xem Tất Cả Điểm Đến",
    },
    featured: {
      heading: "Tour Du Lịch Trọn Gói",
      subheading: "Hành trình trọn gói tuyển chọn đặc sắc với dịch vụ cao cấp và giá ưu đãi nhất",
      viewAllBtn: "XEM TẤT CẢ TOUR",
      pricePerPerson: "/ khách",
    },
    whyUs: {
      heading: "Vì Sao Chọn Star Travels?",
      items: [
        {
          title: "CAM KẾT CHẤT LƯỢNG",
          desc: "Bảo đảm dịch vụ trọn gói tiêu chuẩn cao nhất, minh bạch chi phí và hoàn tiền 100% nếu không đúng cam kết.",
        },
        {
          title: "DỊCH VỤ TẬN TÂM",
          desc: "Đội ngũ chuyên viên tư vấn am hiểu sâu sắc du lịch bản địa, hỗ trợ khách hàng chu đáo 24/7.",
        },
        {
          title: "TRẢI NGHIỆM ĐỘC BẢN",
          desc: "Lịch trình thiết kế chuyên sâu, đưa du khách chạm vào chiều sâu văn hóa và ẩm thực Việt Nam.",
        },
      ],
    },
    adventures: {
      heading: "Trải Nghiệm Bản Địa Hôm Nay",
      items: {
        canalCruise: {
          title: "Du Thuyền Kênh Rạch",
          desc: "Xuôi mái chèo qua rặng dừa nước Bến Tre & vịnh biển kỳ vĩ",
        },
        sailing: {
          title: "Thuyền Buồm Vịnh Biển",
          desc: "Căng buồm đón gió khơi qua quần đảo đá vôi kỳ vĩ Lan Hạ",
        },
        hiking: {
          title: "Trekking Fansipan",
          desc: "Băng qua thung lũng ruộng bậc thang & chạm nóc nhà Đông Dương",
        },
        camping: {
          title: "Cắm Trại Săn Mây",
          desc: "Đón bình minh rực rỡ trên đỉnh Tà Xùa & rừng thông Đà Lạt",
        },
        scubaDiving: {
          title: "Lặn San Hô Phú Quốc",
          desc: "Khám phá thủy cung rực rỡ sắc màu & rạn san hô nguyên sinh",
        },
      },
    },
    newsletter: {
      heading: "BẢN TIN DU LỊCH",
      subheading: "Đăng ký nhận cẩm nang du lịch độc quyền và ưu đãi sớm nhất từ Star Travels",
      namePlaceholder: "Họ và tên của bạn...",
      emailPlaceholder: "Địa chỉ email...",
      submitBtn: "ĐĂNG KÝ NGAY",
      successMessage: "Cảm ơn bạn đã đăng ký nhận bản tin từ Star Travels!",
    },
    awards: {
      heading: "Vinh Danh Kỳ Quan & Di Sản",
      subheading: "Tự hào tôn vinh những danh lam thắng cảnh rực rỡ và di sản văn hóa trường tồn của Việt Nam",
      items: [
        {
          title: "Vịnh Hạ Long & Tràng An",
          subtitle: "Top 10 Thắng Cảnh Di Sản UNESCO",
        },
        {
          title: "Phố Cổ Hội An & Cố Đô Huế",
          subtitle: "Top 10 Di Tích Lịch Sử & Văn Hóa",
        },
        {
          title: "Đảo Ngọc Phú Quốc & Côn Đảo",
          subtitle: "Top 10 Bãi Biển Nhiệt Đới Đẹp Nhất",
        },
        {
          title: "Sa Pa & Mã Pí Lèng Hà Giang",
          subtitle: "Top 5 Tuyệt Tác Kỳ Vĩ Vùng Cao",
        },
        {
          title: "Đà Lạt — Xứ Sở Ngàn Hoa",
          subtitle: "Top 5 Điểm Đến Nghỉ Dưỡng Lãng Mạn",
        },
        {
          title: "Miền Tây & Chợ Nổi Cần Thơ",
          subtitle: "Top 5 Văn Hóa Miệt Vườn Sông Nước",
        },
      ],
    },
    lookingFor: {
      heading: "Tìm Kiếm Trải Nghiệm Độc Bản?",
      subheading: "Khám phá danh lam thắng cảnh tuyệt mỹ và văn hóa bản địa độc bản của non sông Việt Nam cùng Star Travels.",
      button: "XEM GÓI TRẢI NGHIỆM",
    },
    footer: {
      tagline: "Nền tảng du lịch khám phá & trải nghiệm bản địa Việt Nam",
      home: "Trang Chủ",
      aboutUs: "Về Chúng Tôi",
      destinations: "Điểm Đến",
      experiences: "Gói Trải Nghiệm",
      tours: "Tour Tuyển Chọn",
      stories: "Cẩm Nang",
      contact: "Liên Hệ",
      partner: "Cổng Đối Tác",
      copyright: "Bảo lưu mọi quyền. Nền tảng du lịch khám phá di sản & trải nghiệm bản địa Việt Nam.",
    },
  },

  en: {
    nav: {
      home: "Home",
      explore: "Explore",
      destinations: "Destinations",
      packages: "Experiences",
      tours: "Curated Tours",
      stories: "Stories & Guides",
      aboutMenu: "About",
      aboutUs: "About Us",
      partner: "Partner Portal",
      contact: "Contact",
      login: "Sign In",
      account: "Account",
      phoneLabel: "+84 903 846 568",
      emailLabel: "contact@startravels.vn",
    },
    hero: {
      discoverTitle: "Magnificent Vietnam — Timeless Discovery",
      discoverSubtitle: "Explore breathtaking natural wonders and authentic cultural experiences with Star Travels.",
      exploreDestinationsBtn: "Explore Destinations",
      viewToursBtn: "View Curated Tours",
      slides: [
        {
          title: "Magnificent Vietnam",
          subtitle: "Discover breathtaking world heritage sites and authentic cultural journeys with Star Travels.",
          tag: "UNESCO World Natural Heritage",
        },
        {
          title: "City of Eternal Spring",
          subtitle: "Immerse yourself among pine hills, tranquil mountain lakes, and perpetual springtime blossoms.",
          tag: "Romantic Highland Sanctuary",
        },
        {
          title: "Harmonious Waters & Karsts",
          subtitle: "Behold mystical flooded limestone valleys and Vietnam's UNESCO dual world heritage marvel.",
          tag: "UNESCO Dual World Heritage",
        },
      ],
    },
    destinations: {
      tag: "Handpicked Heritage",
      heading: "Popular Destinations",
      subheading: "Discover UNESCO World Heritage wonders, pristine tropical islands, and cultural sanctuaries across Vietnam",
      viewAllBtn: "View All Destinations",
    },
    featured: {
      heading: "Featured All-Inclusive Tours",
      subheading: "Handcrafted boutique itineraries featuring five-star service and exclusive seasonal pricing",
      viewAllBtn: "VIEW ALL TOURS",
      pricePerPerson: "/ person",
    },
    whyUs: {
      heading: "Why Choose Star Travels?",
      items: [
        {
          title: "QUALITY ASSURED",
          desc: "Guaranteed premium service standards, transparent pricing, and 100% money-back satisfaction guarantee.",
        },
        {
          title: "DEDICATED SERVICE",
          desc: "Passionate local travel concierges with deep heritage insight, providing 24/7 personalized care.",
        },
        {
          title: "BESPOKE EXPERIENCES",
          desc: "Curated itineraries designed to connect travelers deeply with the authentic culture and cuisine of Vietnam.",
        },
      ],
    },
    adventures: {
      heading: "Have an Adventure Today",
      items: {
        canalCruise: {
          title: "Canal Cruise",
          desc: "Glide along lush coconut waterways in Ben Tre and the emerald karst waters of Ha Long Bay",
        },
        sailing: {
          title: "Sailing",
          desc: "Catch ocean breezes and sail smoothly past dramatic limestone karsts across Lan Ha Bay",
        },
        hiking: {
          title: "Hiking",
          desc: "Trek through cascading golden terraced rice fields to conquer the 3,143m Fansipan summit",
        },
        camping: {
          title: "Camping",
          desc: "Awaken to majestic sunrises over sea clouds in Ta Xua and fragrant pine forests in Da Lat",
        },
        scubaDiving: {
          title: "Scuba Diving",
          desc: "Explore vibrant underwater worlds and pristine coral reefs around the An Thoi archipelago",
        },
      },
    },
    newsletter: {
      heading: "NEWSLETTER",
      subheading: "Subscribe for exclusive Vietnam travel guides, insider stories, and VIP private tour offers",
      namePlaceholder: "Your full name...",
      emailPlaceholder: "Your email address...",
      submitBtn: "SUBSCRIBE NOW",
      successMessage: "Thank you for subscribing to Star Travels Newsletter!",
    },
    awards: {
      heading: "Award Winning",
      subheading: "Proudly honoring Vietnam's most radiant natural landscapes and enduring cultural heritage",
      items: [
        {
          title: "Ha Long Bay & Trang An",
          subtitle: "Top 10 UNESCO World Heritage Wonders",
        },
        {
          title: "Hoi An Ancient Town & Hue",
          subtitle: "Top 10 Historic & Cultural Sanctuaries",
        },
        {
          title: "Phu Quoc Island & Con Dao",
          subtitle: "Top 10 Pristine Tropical Beach Escapes",
        },
        {
          title: "Sa Pa & Ma Pi Leng Pass",
          subtitle: "Top 5 Majestic Highland Landscapes",
        },
        {
          title: "Da Lat — City of Thousand Flowers",
          subtitle: "Top 5 Romantic Highland Retreats",
        },
        {
          title: "Mekong Delta & Floating Market",
          subtitle: "Top 5 Authentic Riverway Cultures",
        },
      ],
    },
    lookingFor: {
      heading: "Looking for an Experience?",
      subheading: "Discover breathtaking landscapes and bespoke cultural journeys across Vietnam with Star Travels.",
      button: "VIEW ALL EXPERIENCES",
    },
    footer: {
      tagline: "Vietnam's premier discovery platform for authentic local experiences",
      home: "Home",
      aboutUs: "About Us",
      destinations: "Destinations",
      experiences: "Experiences",
      tours: "Curated Tours",
      stories: "Stories & Guides",
      contact: "Contact & Support",
      partner: "Partner Portal",
      copyright: "Copyright © Star Travels Vietnam. Vietnam's premier discovery platform for bespoke cultural tours.",
    },
  },
};
