import { VIETNAM_TOURS, TourItem } from "@/data/seed/tours";
import { VIETNAM_STORIES, StoryItem } from "@/data/seed/stories";
import { ALL_VIETNAM_DESTINATIONS } from "@/data/seed/destinations";
import { VIETNAM_ACCOMMODATIONS } from "@/data/seed/accommodations";
import { VIETNAM_RESTAURANTS } from "@/data/seed/restaurants";
import { GUIDE_CATEGORIES } from "@/data/seed/guide";
import type { Destination, Accommodation, Restaurant } from "@/lib/types";

export interface TourCardData {
  slug: string;
  title: string;
  price: number;
  duration: string;
  departure: string;
  image: string;
}

export interface StoryCardData {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  excerpt?: string;
}

export interface DestinationCardData {
  slug: string;
  name: string;
  summary: string;
  image: string;
  startingPrice?: string | null;
}

export interface GuideCardData {
  slug: string;
  href: string;
  title: string;
  category: string;
  shortDesc: string;
  badge: string;
  iconName?: string;
}

export interface HistoryMessage {
  role: "user" | "assistant" | string;
  content?: string;
  text?: string;
  assistantContent?: string;
  userText?: string;
}

export interface AssistantResponse {
  message: string;
  recommended_tours: TourCardData[];
  recommended_stories: StoryCardData[];
  recommended_destinations: DestinationCardData[];
  recommended_accommodations?: Accommodation[];
  recommended_restaurants?: Restaurant[];
  recommended_guides?: GuideCardData[];
  contactRequired?: boolean;
  lead_captured?: boolean;
}

function mapTourToCard(tour: TourItem, isEn = false): TourCardData {
  return {
    slug: tour.slug,
    title: isEn && tour.title_en ? tour.title_en : tour.title,
    price: tour.price,
    duration: isEn && tour.duration_en ? tour.duration_en : tour.duration,
    departure: isEn && tour.departure_en ? tour.departure_en : tour.departure,
    image: tour.image,
  };
}

function mapStoryToCard(story: StoryItem): StoryCardData {
  return {
    slug: story.slug,
    title: story.title,
    category: story.category,
    readTime: story.readTime,
    image: story.cover_image,
    excerpt: story.excerpt,
  };
}

function mapDestinationToCard(dest: Destination, isEn = false): DestinationCardData {
  return {
    slug: dest.slug,
    name: isEn && dest.name_en ? dest.name_en : dest.name,
    summary: isEn && dest.summary_en ? dest.summary_en : dest.summary,
    image: dest.image_url,
    startingPrice: dest.starting_price || undefined,
  };
}

function mapGuideToCard(catSlug: string, isEn = false): GuideCardData | undefined {
  const cat = GUIDE_CATEGORIES.find((c) => c.slug === catSlug);
  if (!cat) return undefined;
  return {
    slug: cat.slug,
    href: cat.href,
    title: isEn ? cat.titleEn : cat.title,
    category: cat.slug,
    shortDesc: isEn ? cat.shortDescEn : cat.shortDesc,
    badge: isEn ? cat.badgeEn : cat.badge,
    iconName: cat.iconName,
  };
}

export function normalizeText(str: string): string {
  return (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .trim();
}

// ─── 1. Fuzzy Matching & Abbreviation Resolution ──────────────────────
export const LOCATION_ABBREVIATIONS: Record<string, string> = {
  hn: "ha noi",
  hnoi: "ha noi",
  hanoi: "ha noi",
  thudo: "ha noi",
  "thu do": "ha noi",
  thanglong: "ha noi",
  "thang long": "ha noi",
  "ho guom": "ha noi",
  hoguom: "ha noi",
  "pho co": "ha noi",
  "ho tay": "ha noi",
  hotay: "ha noi",

  dn: "da nang",
  danang: "da nang",
  "ba na": "da nang",
  bana: "da nang",
  "cau vang": "da nang",
  "son tra": "da nang",
  sontra: "da nang",

  sg: "ho chi minh",
  saigon: "ho chi minh",
  "sai gon": "ho chi minh",
  hcm: "ho chi minh",
  tphcm: "ho chi minh",
  "tp hcm": "ho chi minh",

  hl: "ha long",
  halong: "ha long",
  "vinh ha long": "ha long",
  "lan ha": "ha long",
  lanha: "ha long",

  sp: "sa pa",
  sapa: "sa pa",
  safpa: "sa pa",
  fansipan: "sa pa",
  fansipang: "sa pa",

  ha: "hoi an",
  hoian: "hoi an",
  "chua cau": "hoi an",

  pq: "phu quoc",
  phuquoc: "phu quoc",
  "dao ngoc": "phu quoc",
  "bai khem": "phu quoc",

  dl: "da lat",
  dalat: "da lat",
  "ngan hoa": "da lat",
  "tuyen lam": "da lat",

  nb: "ninh binh",
  ninhbinh: "ninh binh",
  "trang an": "ninh binh",
  "tam coc": "ninh binh",

  hg: "ha giang",
  hagiang: "ha giang",
  "ma pi leng": "ha giang",
  mapileng: "ha giang",
  "nho que": "ha giang",

  nt: "nha trang",
  nhatrang: "nha trang",
  "ninh van": "nha trang",
  ninhvan: "nha trang",

  pn: "phong nha",
  phongnha: "phong nha",
  qb: "phong nha",
  "quang binh": "phong nha",
  quangbinh: "phong nha",
  "son doong": "phong nha",

  cd: "con dao",
  condao: "con dao",
  "hang duong": "con dao",

  ct: "can tho",
  cantho: "can tho",
  "cai rang": "can tho",
  cairang: "can tho",

  mn: "mui ne",
  muine: "mui ne",
  "phan thiet": "mui ne",
  phanthiet: "mui ne",

  hue: "hue",
  "co do": "hue",
  "song huong": "hue",
  songhuong: "hue",

  cb: "cao bang",
  caobang: "cao bang",
  "ban gioc": "cao bang",
  bangioc: "cao bang",
};

export function levenshteinDistance(s1: string, s2: string): number {
  if (s1 === s2) return 0;
  if (s1.length === 0) return s2.length;
  if (s2.length === 0) return s1.length;
  const v0 = new Int32Array(s2.length + 1);
  const v1 = new Int32Array(s2.length + 1);
  for (let i = 0; i <= s2.length; i++) v0[i] = i;
  for (let i = 0; i < s1.length; i++) {
    v1[0] = i + 1;
    for (let j = 0; j < s2.length; j++) {
      const cost = s1[i] === s2[j] ? 0 : 1;
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }
    for (let j = 0; j <= s2.length; j++) v0[j] = v1[j];
  }
  return v1[s2.length];
}

export function expandQueryWithFuzzyAndAbbreviations(rawQuery: string): string {
  const norm = normalizeText(rawQuery);
  if (!norm) return "";

  // 1. Direct match on abbreviation/alias dictionary
  if (LOCATION_ABBREVIATIONS[norm]) {
    return LOCATION_ABBREVIATIONS[norm];
  }

  // 2. Token-level abbreviation and typo resolution
  const words = norm.split(/\s+/).filter(Boolean);
  const expandedWords = words.map((w) => {
    if (LOCATION_ABBREVIATIONS[w]) {
      return LOCATION_ABBREVIATIONS[w];
    }
    // Check fuzzy match for typos (e.g. "safpa" -> "sa pa", "hnoi" -> "ha noi")
    if (w.length >= 4) {
      for (const [abbrKey, target] of Object.entries(LOCATION_ABBREVIATIONS)) {
        if (abbrKey.length >= 4 && levenshteinDistance(w, abbrKey) <= 1) {
          return target;
        }
      }
    }
    return w;
  });

  return expandedWords.join(" ");
}

// ─── 2. Context & Conversation Memory ─────────────────────────────────
export function detectPreviousIntent(history?: HistoryMessage[]): "accommodation" | "restaurant" | "tour" | null {
  if (!history || history.length === 0) return null;
  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i];
    if (msg.role === "assistant") {
      const raw = msg.assistantContent || msg.content || msg.text || "";
      const text = normalizeText(raw);
      if (
        text.includes("khach san & resort tai khu vuc nao") ||
        text.includes("khach san & resort") ||
        text.includes("hotels & resorts") ||
        text.includes("di san dang cap tai") ||
        text.includes("nhan ten khu vuc") ||
        raw.includes("[ACCOMMODATION_CARD:")
      ) {
        return "accommodation";
      }
      if (
        text.includes("am thuc tai khu vuc nao") ||
        text.includes("diem hen am thuc") ||
        text.includes("michelin") ||
        raw.includes("[RESTAURANT_CARD:")
      ) {
        return "restaurant";
      }
      if (
        text.includes("danh muc tour") ||
        text.includes("tour du lich") ||
        text.includes("hanh trinh phu hop")
      ) {
        return "tour";
      }
      break;
    }
  }
  return null;
}

export function queryAssistantKnowledge(
  message: string,
  locale: "vi" | "en" = "vi",
  history?: HistoryMessage[]
): AssistantResponse {
  const isEn = locale === "en";
  const qRaw = normalizeText(message);
  const q = expandQueryWithFuzzyAndAbbreviations(message);
  const previousIntent = detectPreviousIntent(history);

  // Helper finders
  const findTour = (slug: string) => VIETNAM_TOURS.find((t) => t.slug === slug || t.aliases?.includes(slug));
  const findStory = (slug: string) => VIETNAM_STORIES.find((s) => s.slug === slug);
  const findDest = (slug: string) => ALL_VIETNAM_DESTINATIONS.find((d) => d.slug === slug);

  // 0. Greeting / Welcome
  if (
    !q ||
    q === "xin chao" ||
    q === "chao em" ||
    q === "chao ban" ||
    q === "hello" ||
    q === "hi" ||
    q === "chao star" ||
    q === "alo"
  ) {
    const greetingVi =
      "Dạ chào Quý khách! Em là **Bé Star** — Trợ lý tư vấn du lịch thông minh của STAR Travels Vietnam.\n\n" +
      "Em có thể tư vấn các điểm đến nổi tiếng tại Việt Nam, lịch trình tour trọn gói, cẩm nang du lịch và gửi đường link cụ thể để Quý khách xem trực tiếp.\n\n" +
      "Quý khách đang quan tâm đến vùng miền hay điểm đến nào (Sa Pa, Hạ Long, Đà Nẵng, Hội An, Phú Quốc, Ninh Bình...) ạ?";

    const greetingEn =
      "Welcome to STAR Travels! I am **Baby STAR**, your private AI travel advisor.\n\n" +
      "I can recommend handcrafted Vietnam itineraries, luxury cruise packages, and direct links to our curated tours and articles.\n\n" +
      "Which destination are you planning to explore (Sa Pa, Ha Long Bay, Da Nang, Hoi An, Phu Quoc, Ninh Binh...)?";

    return {
      message: isEn ? greetingEn : greetingVi,
      recommended_tours: [findTour("tour-ha-long-cruise-2n1d"), findTour("tour-sapa-fansipan-2n1d")]
        .filter(Boolean)
        .map((t) => mapTourToCard(t!, isEn)),
      recommended_stories: [],
      recommended_destinations: [],
      contactRequired: false,
    };
  }

  // 0.05 CẨM NANG THÔNG TIN DU LỊCH (TRAVEL INFO HUB) — IN-SCOPE PRACTICAL GUIDES

  // 1. VISA & ENTRY GUIDELINES
  if (
    q.includes("visa") ||
    q.includes("thi thuc") ||
    q.includes("nhap canh") ||
    q.includes("e-visa") ||
    q.includes("evisa") ||
    q.includes("ho chieu") ||
    q.includes("passport") ||
    q.includes("mien thi thuc") ||
    q.includes("45 ngay") ||
    q.includes("90 ngay")
  ) {
    const visaVi =
      "Dạ về **Chính sách Thị thực & E-visa Việt Nam (Cập nhật 2026)**, STAR Travels xin chia sẻ các quy định chính thức như sau ạ:\n\n" +
      "- **Miễn thị thực đơn phương 45 ngày:** Công dân 25 quốc gia (Đức, Pháp, Ý, Tây Ban Nha, Anh, Nhật Bản, Hàn Quốc, Nga, Thụy Điển, Na Uy, Đan Mạch, Phần Lan, Bỉ, Ba Lan, Séc, Thụy Sĩ...) được miễn visa 45 ngày khi nhập cảnh (hộ chiếu còn hạn ít nhất 6 tháng).\n" +
      "- **Miễn thị thực ASEAN:** 30 ngày cho Singapore, Malaysia, Thái Lan, Indonesia, Campuchia, Lào; 21 ngày cho Philippines; 14 ngày cho Brunei & Myanmar.\n" +
      "- **Miễn thị thực 30 ngày Đặc khu Phú Quốc:** Áp dụng cho người nước ngoài bay trực tiếp đến đảo Phú Quốc hoặc quá cảnh mà không rời khu cách ly sân bay.\n" +
      "- **E-visa điện tử 90 ngày:** Áp dụng cho công dân **mọi quốc gia trên thế giới**. Có giá trị 1 lần (25 USD) hoặc nhiều lần (50 USD). Thời gian xử lý từ 3-5 ngày làm việc.\n" +
      "- **Cổng e-visa chính thức duy nhất:** [https://evisa.gov.vn](https://evisa.gov.vn).\n\n" +
      "Quý khách có thể xem bảng tra cứu chi tiết và quy trình 4 bước tại trang cẩm nang: [Cẩm Nang Thị Thực & E-visa](/guide/visa).";

    const visaEn =
      "Regarding **Vietnam Visa & E-Visa Regulations (Updated 2026)**, STAR Travels provides verified official guidelines:\n\n" +
      "- **45-Day Unilateral Visa Exemption:** Granted to passport holders of 25 nations including Germany, France, Italy, Spain, UK, Japan, South Korea, Russia, Sweden, Norway, Denmark, Poland, Switzerland, etc.\n" +
      "- **ASEAN Bilateral Exemption:** 30 days for Singapore, Malaysia, Thailand, Indonesia, Cambodia, Laos; 21 days for Philippines; 14 days for Brunei & Myanmar.\n" +
      "- **30-Day Phu Quoc Exemption:** Foreign travelers flying directly or transiting to Phu Quoc Island receive 30-day exemption.\n" +
      "- **90-Day Universal E-Visa:** Open to citizens of **all countries & territories**. Single entry ($25 USD) or multiple entry ($50 USD), processed in 3-5 working days.\n" +
      "- **Official National E-visa Portal:** [https://evisa.gov.vn](https://evisa.gov.vn).\n\n" +
      "Explore the interactive lookup table and full step-by-step checklist at our [Vietnam Visa & Entry Guide](/guide/visa).";

    const guideCard = mapGuideToCard("visa", isEn);
    return {
      message: isEn ? visaEn : visaVi,
      recommended_tours: [findTour("tour-ha-long-cruise-2n1d")].filter(Boolean).map((t) => mapTourToCard(t!, isEn)),
      recommended_stories: [],
      recommended_destinations: [],
      recommended_guides: guideCard ? [guideCard] : [],
      contactRequired: false,
    };
  }

  // 2. WEATHER & TRAVEL SEASONS
  if (
    q.includes("thoi tiet") ||
    q.includes("khi hau") ||
    q.includes("mua nao") ||
    q.includes("thang may") ||
    q.includes("mua dep nhat") ||
    q.includes("mua mua") ||
    q.includes("mua bao") ||
    q.includes("mua kho") ||
    q.includes("san may") ||
    q.includes("bang tuyet") ||
    q.includes("weather") ||
    q.includes("climate") ||
    q.includes("best time to visit")
  ) {
    const weatherVi =
      "Dạ về **Thời Tiết & Mùa Du Lịch Việt Nam**, khí hậu chia rõ theo 3 miền với các thời điểm vàng lý tưởng:\n\n" +
      "- **Miền Bắc (Hà Nội, Sa Pa, Hạ Long, Hà Giang):** Mùa Thu (tháng 9-11) là thời điểm đẹp nhất năm với nắng vàng và gió heo may mát mẻ. Sa Pa săn mây và lúa chín đẹp nhất tháng 9-10; mùa đông tháng 12-1 có thể có băng tuyết.\n" +
      "- **Miền Trung (Đà Nẵng, Hội An, Huế, Nha Trang):** Mùa khô nắng đẹp từ tháng 1 đến tháng 8, rất lý tưởng tắm biển. Cần lưu ý mùa mưa bão ngập lụt thường rơi vào tháng 9-11 (đặc biệt Hội An hay ngập tháng 10-11).\n" +
      "- **Miền Nam & Đảo Ngọc (TP.HCM, Cần Thơ, Phú Quốc):** Mùa khô từ tháng 11 đến tháng 4 năm sau với biển êm như gương và trời trong xanh; mùa mưa từ tháng 5 đến tháng 10 nhưng mưa rào nhanh rồi tạnh.\n\n" +
      "Quý khách có thể xem biểu đồ nhiệt độ và lưu ý bão lũ của cả 12 danh thắng tại: [Thời Tiết & Mùa Du Lịch 12 Điểm Đến](/guide/weather).";

    const weatherEn =
      "Regarding **Vietnam Weather & Optimal Travel Seasons**, climate patterns vary distinctly across 3 regions:\n\n" +
      "- **Northern Vietnam (Hanoi, Sa Pa, Ha Long, Ha Giang):** Autumn (Sep to Nov) is the absolute golden window with crisp dry weather. Sa Pa features golden rice terraces in Sep-Oct and cloud-hunting from Dec-Feb.\n" +
      "- **Central Vietnam (Da Nang, Hoi An, Hue, Nha Trang):** Dry, sunny beach weather from Jan to Aug. Be mindful of storm and tidal flood season from Sep to Nov (especially Hoi An in Oct-Nov).\n" +
      "- **Southern Vietnam & Islands (Phu Quoc, Saigon, Mekong Delta):** Dry season (Nov to Apr) is paradise with calm turquoise seas; wet season (May to Oct) features brief tropical showers.\n\n" +
      "Review the full seasonal temperature charts for all 12 destinations at: [Vietnam Weather & Seasons Guide](/guide/weather).";

    const guideCard = mapGuideToCard("weather", isEn);
    return {
      message: isEn ? weatherEn : weatherVi,
      recommended_tours: [findTour("tour-sapa-fansipan-2n1d"), findTour("tour-ha-long-cruise-2n1d")].filter(Boolean).map((t) => mapTourToCard(t!, isEn)),
      recommended_stories: [],
      recommended_destinations: [findDest("sa-pa"), findDest("ha-long")].filter(Boolean).map((d) => mapDestinationToCard(d!, isEn)),
      recommended_guides: guideCard ? [guideCard] : [],
      contactRequired: false,
    };
  }

  // 3. TRANSPORTATION & AIRPORT TRANSFERS
  if (
    q.includes("di chuyen") ||
    q.includes("may bay") ||
    q.includes("san bay") ||
    q.includes("don san bay") ||
    q.includes("noi bai") ||
    q.includes("tan son nhat") ||
    q.includes("cam ranh") ||
    q.includes("lien khuong") ||
    q.includes("tau hoa") ||
    q.includes("xe lua") ||
    q.includes("duong sat") ||
    q.includes("limousine") ||
    q.includes("xe khach") ||
    q.includes("grab") ||
    q.includes("xanh sm") ||
    q.includes("taxi") ||
    q.includes("transport") ||
    q.includes("transfer")
  ) {
    const transVi =
      "Dạ về **Di Chuyển Nội Địa & Chuyển Tiếp Sân Bay**, STAR Travels xin hướng dẫn chi tiết như sau ạ:\n\n" +
      "- **Chuyển tiếp sân bay vào trung tâm:**\n" +
      "  + **Nội Bài -> Phố Cổ Hà Nội (28 km):** Grab/Taxi khoảng 250k - 350k VNĐ (40 phút), Xe bus 86 chỉ 45k VNĐ.\n" +
      "  + **Đà Nẵng -> Phố Cổ Hội An (30 km):** Xe riêng/Grab khoảng 280k - 380k VNĐ (45 phút).\n" +
      "  + **Cam Ranh -> Nha Trang (35 km):** Xe buýt Đất Mới (60k VNĐ), Taxi 300k - 400k VNĐ.\n" +
      "  + **Liên Khương -> Đà Lạt (30 km):** Taxi khoảng 250k - 300k VNĐ.\n" +
      "- **Phương tiện liên tỉnh:** Các cung đường cao tốc có Limousine Dcar 9 chỗ đón tận nơi (Hà Nội - Hạ Long 2h, Hà Nội - Sa Pa 5h, Sài Gòn - Mũi Né 2.5h). Trải nghiệm tàu hỏa SE ngắm đèo Hải Vân rất đáng thử.\n" +
      "- **Mẹo gọi xe:** Khuyên dùng ứng dụng Grab hoặc Xanh SM để biết trước giá cước minh bạch, không lo chặt chém.\n\n" +
      "Quý khách có thể xem hướng dẫn chi tiết cho cả 12 điểm đến tại: [Cẩm Nang Di Chuyển Nội Địa](/guide/transport).";

    const transEn =
      "Regarding **Vietnam Domestic Transportation & Airport Transfers**, here are verified transit recommendations:\n\n" +
      "- **Airport Transfers into City Centers:**\n" +
      "  + **Noi Bai (HAN) to Hanoi Old Quarter (28 km):** 250k-350k VND by Grab/Taxi (40 mins), or Bus 86 (45k VND).\n" +
      "  + **Da Nang (DAD) to Hoi An Ancient Town (30 km):** 280k-380k VND by private transfer or Grab (45 mins).\n" +
      "  + **Cam Ranh (CXR) to Nha Trang (35 km):** Shuttle bus (60k VND) or Taxi (300k-400k VND).\n" +
      "  + **Lien Khuong (DLI) to Da Lat (30 km):** Taxi 250k-300k VND (35 mins).\n" +
      "- **Intercity Transit:** VIP 9-seater Dcar Limousines run expressways (Hanoi - Ha Long 2h, Hanoi - Sa Pa 5h). The SE train crossing Hai Van Pass is magnificent.\n" +
      "- **App Recommendation:** Download Grab or Xanh SM for upfront fixed fares without haggling.\n\n" +
      "Read the full transfer guides for 12 destinations at: [Domestic Transport & Transfers Guide](/guide/transport).";

    const guideCard = mapGuideToCard("transport", isEn);
    return {
      message: isEn ? transEn : transVi,
      recommended_tours: [findTour("tour-ha-long-cruise-2n1d")].filter(Boolean).map((t) => mapTourToCard(t!, isEn)),
      recommended_stories: [],
      recommended_destinations: [],
      recommended_guides: guideCard ? [guideCard] : [],
      contactRequired: false,
    };
  }

  // 4. SAFETY, SOS & HEALTH
  if (
    q.includes("an toan") ||
    q.includes("khan cap") ||
    q.includes("cong an") ||
    q.includes("cuu hoa") ||
    q.includes("cap cuu") ||
    q.includes("113") ||
    q.includes("114") ||
    q.includes("115") ||
    q.includes("112") ||
    q.includes("bao hiem") ||
    q.includes("dong chay xa bo") ||
    q.includes("rip current") ||
    q.includes("duoi nuoc") ||
    q.includes("safety") ||
    q.includes("emergency")
  ) {
    const safetyVi =
      "Dạ về **An Toàn Du Lịch & Số Khẩn Cấp Quốc Gia**, Quý khách vui lòng lưu lại các thông tin quan trọng sau:\n\n" +
      "- **Các số điện thoại khẩn cấp quốc gia (Miễn phí 24/7):**\n" +
      "  + **113:** Cảnh sát / Công an phản ứng nhanh (an ninh, trộm cắp, mất đồ, gây rối).\n" +
      "  + **114:** Cảnh sát PCCC & Cứu nạn cứu hộ.\n" +
      "  + **115:** Cấp cứu y tế & vận chuyển bệnh nhân.\n" +
      "  + **112:** Tìm kiếm cứu nạn thiên tai quốc gia trên phạm vi toàn quốc.\n" +
      "- **An toàn tắm biển:** Quan sát cờ báo bãi tắm, không bơi khi có cờ đỏ. Nếu gặp dòng chảy xa bờ (Rip Current), hãy bơi song song với bờ biển, tuyệt đối không cố bơi ngược dòng.\n" +
      "- **Leo núi & Trekking (Fansipan, Tà Xùa):** Bắt buộc thuê hướng dẫn viên/porter bản địa, chuẩn bị giày bám đá, áo mưa bộ và đăng ký với Vườn Quốc Gia.\n" +
      "- **Bảo hiểm:** Khuyến nghị du khách luôn mua bảo hiểm du lịch quốc tế chi trả viện phí khẩn cấp.\n\n" +
      "Xem chi tiết hướng dẫn tại trang: [Cẩm Nang An Toàn & Sức Khỏe Du Lịch](/guide/safety).";

    const safetyEn =
      "Regarding **Vietnam Travel Safety & Emergency Hotlines**, please keep these vital contacts handy:\n\n" +
      "- **National Emergency Hotlines (Toll-Free, 24/7):**\n" +
      "  + **113:** Police / Security Emergency.\n" +
      "  + **114:** Fire Brigade & Technical Rescue.\n" +
      "  + **115:** Medical Ambulance & Health Emergency.\n" +
      "  + **112:** National Disaster Search & Rescue Operations.\n" +
      "- **Ocean Beach Safety:** Obey lifeguard flags. If caught in a rip current, stay calm and swim parallel to the shore until free of the current.\n" +
      "- **Mountain Trekking:** Always hire licensed local porters/guides on Fansipan or Ta Xua trails and wear proper trail footwear.\n" +
      "- **Insurance:** Always secure comprehensive travel insurance covering emergency hospital admissions.\n\n" +
      "Review the complete safety advisory at: [Travel Safety & Health Hub](/guide/safety).";

    const guideCard = mapGuideToCard("safety", isEn);
    return {
      message: isEn ? safetyEn : safetyVi,
      recommended_tours: [],
      recommended_stories: [],
      recommended_destinations: [],
      recommended_guides: guideCard ? [guideCard] : [],
      contactRequired: false,
    };
  }

  // 5. CULTURE, ETIQUETTE & TEMPLE DRESS CODE
  if (
    q.includes("van hoa") ||
    q.includes("trang phuc") ||
    q.includes("den chua") ||
    q.includes("chua chien") ||
    q.includes("mac gi") ||
    q.includes("mac ca") ||
    q.includes("tra gia") ||
    q.includes("tien tip") ||
    q.includes("tien boa") ||
    q.includes("cam ky") ||
    q.includes("cam dua") ||
    q.includes("culture") ||
    q.includes("etiquette") ||
    q.includes("dress code") ||
    q.includes("temple") ||
    q.includes("tipping")
  ) {
    const cultureVi =
      "Dạ về **Văn Hóa Ứng Xử, Trang Phục & Phép Tắc Giao Tiếp tại Việt Nam**:\n\n" +
      "- **Trang phục khi vào Chùa/Đền/Di tích:** Bắt buộc che kín vai và đầu gối (quần dài hoặc váy qua gối, áo có tay). Cởi bỏ mũ nón, kính râm và tháo giày dép khi bước vào chánh điện. Không chạm vào tượng Phật.\n" +
      "- **Giao tiếp:** Nụ cười thân thiện mở đầu cho mọi câu chuyện. Dùng cả hai tay khi đưa hoặc nhận đồ vật từ người lớn tuổi để thể hiện sự lễ phép.\n" +
      "- **Mặc cả khi mua sắm:** Nên mặc cả vui vẻ tại các chợ truyền thống (Chợ Bến Thành, Đồng Xuân) khoảng 70-80% giá ban đầu. Tránh mặc cả ở siêu thị, nhà hàng có niêm yết menu và tránh ép giá gay gắt vào buổi sáng sớm.\n" +
      "- **Tiền Tip (tiền boa):** Không bắt buộc. Nhưng một khoản tiền tip nhỏ 50.000 - 100.000 VNĐ cho hướng dẫn viên, lái xe hoặc người chèo thuyền luôn được đón nhận rất trân trọng.\n" +
      "- **Điều cấm kỵ:** Tuyệt đối không cắm đũa thẳng đứng vào bát cơm (gợi liên tưởng đến bát hương thờ cúng), không chạm vào đầu người khác.\n\n" +
      "Xem thêm các quy tắc văn hóa bản địa tại: [Cẩm Nang Văn Hóa & Phép Tắc](/guide/culture).";

    const cultureEn =
      "Regarding **Vietnamese Cultural Etiquette, Temple Modesty & Social Customs**:\n\n" +
      "- **Temple & Pagoda Dress Codes:** Shoulders and knees must be covered (long trousers, maxi skirts, sleeved tops). Remove hats, sunglasses, and footwear before stepping onto sanctuary mats. Never touch Buddha statues.\n" +
      "- **Respectful Greetings:** Greet with a friendly smile. Use both hands when giving or receiving business cards, money, or gifts.\n" +
      "- **Market Bargaining:** Polite bargaining is natural in traditional street markets (Ben Thanh, Dong Xuan) at 70-80% of opening quotes. Do not bargain in fixed-price restaurants, boutiques, or early in the morning.\n" +
      "- **Tipping Etiquette:** Not compulsory in Vietnam. However, leaving 50,000 - 100,000 VND for private tour guides, chauffeurs, or spa therapists is warmly appreciated.\n" +
      "- **Cultural Taboos:** Never stick chopsticks upright into a bowl of rice (resembles funerary incense sticks). Avoid touching someone's head.\n\n" +
      "Read full cultural dos and don'ts at: [Cultural Etiquette & Temple Dress Code Guide](/guide/culture).";

    const guideCard = mapGuideToCard("culture", isEn);
    return {
      message: isEn ? cultureEn : cultureVi,
      recommended_tours: [findTour("tour-da-nang-hoi-an-trail")].filter(Boolean).map((t) => mapTourToCard(t!, isEn)),
      recommended_stories: [findStory("cam-nang-am-thuc-hoi-an")].filter(Boolean).map((s) => mapStoryToCard(s!)),
      recommended_destinations: [findDest("hoi-an")].filter(Boolean).map((d) => mapDestinationToCard(d!, isEn)),
      recommended_guides: guideCard ? [guideCard] : [],
      contactRequired: false,
    };
  }

  // 6. CURRENCY, MONEY EXCHANGE & DAILY BUDGET
  if (
    q.includes("tien te") ||
    q.includes("doi tien") ||
    q.includes("tien mat") ||
    q.includes("ngan hang") ||
    q.includes("tiem vang") ||
    q.includes("ty gia") ||
    q.includes("chi phi") ||
    q.includes("bao nhieu tien") ||
    q.includes("500k") ||
    q.includes("20k") ||
    q.includes("polymer") ||
    q.includes("vietqr") ||
    q.includes("quet the") ||
    q.includes("currency") ||
    q.includes("money exchange") ||
    q.includes("budget") ||
    q.includes("cost per day") ||
    q.includes("vnd")
  ) {
    const currVi =
      "Dạ về **Tiền Tệ VNĐ, Đổi Tiền & Dự Toán Chi Phí Du Lịch Việt Nam**:\n\n" +
      "- **CẢNH BÁO QUAN TRỌNG:** Tờ tiền polymer **20.000₫** (xanh dương đậm) và tờ **500.000₫** (xanh lơ nhạt) có màu sắc tương đối giống nhau khi nhìn trong bóng tối hoặc trên xe taxi. Quý khách nhớ đếm kỹ các chữ số 0 để tránh trả nhầm gấp 25 lần nhé ạ!\n" +
      "- **Nơi đổi tiền an toàn:**\n" +
      "  + **Ngân hàng thương mại (Vietcombank, BIDV, Techcombank):** An toàn 100%, tỷ giá niêm yết chuẩn, cần xuất trình hộ chiếu.\n" +
      "  + **Tiệm vàng được cấp phép (Phố Hà Trung - Hà Nội, Chợ Bến Thành - TP.HCM):** Đổi nhanh, tỷ giá tốt cho tiền USD/EUR mới.\n" +
      "  + **Quầy sân bay:** Thích hợp đổi một khoản nhỏ 1-2 triệu để đi taxi ban đầu.\n" +
      "- **Thanh toán:** Thẻ Visa/Mastercard dùng tốt ở khách sạn, siêu thị; mã VietQR quét được ở hầu hết quán ăn; tiền mặt cần thiết khi đi chợ và ăn vỉa hè.\n" +
      "- **Dự toán chi phí trung bình/ngày:**\n" +
      "  + **Tiết kiệm:** 500k - 800k VNĐ/ngày (~20-32 USD).\n" +
      "  + **Tiêu chuẩn:** 1.5tr - 2.5tr VNĐ/ngày (~60-100 USD).\n" +
      "  + **Cao cấp:** Từ 4tr+ VNĐ/ngày (~160+ USD) với resort 5 sao và fine dining.\n\n" +
      "Xem chi tiết bảng giá và hướng dẫn tại: [Cẩm Nang Tiền Tệ & Chi Phí](/guide/currency).";

    const currEn =
      "Regarding **Vietnam Dong (VND), Currency Exchange & Travel Budgeting**:\n\n" +
      "- **CRITICAL WARNING:** The 20,000 VND note (dark blue) and 500,000 VND note (light cyan) share similar blue tones in dim lighting or inside taxis. Always check the number of zeroes carefully to avoid overpaying by 25 times!\n" +
      "- **Where to Exchange Foreign Currency:**\n" +
      "  + **Commercial Banks (Vietcombank, BIDV):** 100% legitimate, official rates, passport required.\n" +
      "  + **Licensed Gold Shops (Ha Trung Street in Hanoi, Ben Thanh Market in Saigon):** Quick service with favorable exchange rates for crisp USD/EUR notes.\n" +
      "  + **Airport Counters:** Convenient for exchanging $50-100 for your initial airport transfer.\n" +
      "- **Payment Methods:** Visa/Mastercard are accepted at hotels and malls; mobile VietQR is ubiquitous; cash is essential for street vendors.\n" +
      "- **Daily Spending Tiers:**\n" +
      "  + **Backpacker / Budget:** 500k - 800k VND/day (~$20-32 USD).\n" +
      "  + **Mid-range:** 1.5M - 2.5M VND/day (~$60-100 USD).\n" +
      "  + **Luxury:** 4M+ VND/day (~$160+ USD) for 5-star beachfront resorts and fine dining.\n\n" +
      "Read our full financial advisory at: [Vietnam Currency & Budget Guide](/guide/currency).";

    const guideCard = mapGuideToCard("currency", isEn);
    return {
      message: isEn ? currEn : currVi,
      recommended_tours: [],
      recommended_stories: [],
      recommended_destinations: [],
      recommended_guides: guideCard ? [guideCard] : [],
      contactRequired: false,
    };
  }

  // 7. FESTIVALS & SEASONAL EVENTS
  if (
    q.includes("le hoi") ||
    q.includes("su kien") ||
    q.includes("tet nguyen dan") ||
    (q.includes("tet") && !q.includes("test")) ||
    q.includes("phao hoa") ||
    q.includes("diff") ||
    q.includes("chua huong") ||
    q.includes("trung thu") ||
    q.includes("den hung") ||
    q.includes("festival hoa") ||
    q.includes("dua bo") ||
    q.includes("festival") ||
    q.includes("calendar")
  ) {
    const festVi =
      "Dạ về **Lịch Lễ Hội Truyền Thống & Sự Kiện Theo Mùa tại Việt Nam**:\n\n" +
      "- **Tháng 1 - 2:** **Tết Nguyên Đán** (Đại lễ cổ truyền thiêng liêng nhất cả nước, hoa đào hoa mai rực rỡ; lưu ý các hàng quán đóng cửa vài ngày). Lễ hội Chùa Hương kéo dài 3 tháng mùa xuân.\n" +
      "- **Tháng 3 - 4:** Giỗ Tổ Hùng Vương (Phú Thọ - Mùng 10/3 Âm lịch), Festival Huế với nhã nhạc cung đình.\n" +
      "- **Tháng 5 - 7:** **Lễ hội Pháo hoa Quốc tế Đà Nẵng (DIFF)** - đại tiệc ánh sáng ngoạn mục ven sông Hàn thu hút đông đảo du khách.\n" +
      "- **Tháng 8 - 9:** Tết Trung Thu phố cổ Hội An hoa đăng lung linh; Mùa lúa chín Mù Cang Chải & Hoàng Su Phì.\n" +
      "- **Tháng 10 - 11:** Lễ hội Đua Bò Bảy Núi (An Giang); Lễ hội Hoa Tam Giác Mạch trên cao nguyên đá Hà Giang.\n" +
      "- **Tháng 12:** Festival Hoa Đà Lạt với muôn sắc hoa ôn đới và không khí se lạnh đón Giáng sinh/Năm mới.\n" +
      "- **Lưu ý thực tế:** Các dịp lễ lớn (Tết, DIFF Đà Nẵng, Festival Hoa) rất đông đúc, Quý khách nên đặt phòng khách sạn và vé máy bay trước 1-2 tháng nhé ạ!\n\n" +
      "Xem chi tiết lịch 12 tháng tại: [Lịch Lễ Hội & Sự Kiện Du Lịch](/guide/festivals).";

    const festEn =
      "Regarding **Vietnam 12-Month Festival Calendar & Cultural Celebrations**:\n\n" +
      "- **Jan - Feb:** **Tet Lunar New Year** (Vietnam's most cherished traditional celebration; festive peach blossoms everywhere). Huong Pagoda pilgrimage festival in Hanoi.\n" +
      "- **Mar - Apr:** Hung Kings Temple Festival (Phu Tho), Hue Imperial Cultural Festival.\n" +
      "- **May - Jul:** **Da Nang International Fireworks Festival (DIFF)** - world-class pyrotechnic displays along the Han River.\n" +
      "- **Aug - Sep:** Mid-Autumn Festival in Hoi An ancient town; Golden harvest terraces in Mu Cang Chai.\n" +
      "- **Oct - Nov:** Bay Nui Bull Racing (An Giang); Buckwheat Flower Festival in Ha Giang.\n" +
      "- **Dec:** Da Lat Flower Festival showcasing millions of blooms amidst the cool highlands.\n" +
      "- **Tip:** During major festivals (Tet, DIFF Da Nang), accommodations fill up quickly; reserve at least 1-2 months ahead.\n\n" +
      "Explore the complete 12-month calendar at: [Vietnam Festivals & Events Calendar](/guide/festivals).";

    const guideCard = mapGuideToCard("festivals", isEn);
    return {
      message: isEn ? festEn : festVi,
      recommended_tours: [findTour("tour-da-nang-hoi-an-trail")].filter(Boolean).map((t) => mapTourToCard(t!, isEn)),
      recommended_stories: [],
      recommended_destinations: [findDest("da-nang"), findDest("hoi-an")].filter(Boolean).map((d) => mapDestinationToCard(d!, isEn)),
      recommended_guides: guideCard ? [guideCard] : [],
      contactRequired: false,
    };
  }

  // 8. GENERAL TRAVEL INFO HUB
  if (
    q.includes("cam nang") ||
    q.includes("huong dan du lich") ||
    q.includes("thong tin can biet") ||
    q.includes("travel hub") ||
    q.includes("guide hub") ||
    q.includes("travel info")
  ) {
    const hubVi =
      "Dạ chào Quý khách! STAR Travels đã xây dựng chuyên trang **Thông Tin Cần Biết (Travel Info Hub)** " +
      "với 7 nhóm thông tin thực dụng được tra cứu và kiểm chứng kỹ lưỡng dành cho du khách:\n\n" +
      "1. [Thời Tiết & Mùa Du Lịch](/guide/weather) — Khí hậu 3 miền và chi tiết 12 điểm đến.\n" +
      "2. [Thị Thực & Nhập Cảnh](/guide/visa) — Miễn visa 45 ngày & Hướng dẫn e-visa 90 ngày chính thức.\n" +
      "3. [Di Chuyển Nội Địa](/guide/transport) — Hướng dẫn đón sân bay & so sánh phương tiện.\n" +
      "4. [An Toàn & Sức Khỏe](/guide/safety) — Hotline khẩn cấp 113/114/115 & an toàn tắm biển/trekking.\n" +
      "5. [Văn Hóa & Phép Tắc](/guide/culture) — Trang phục đền chùa, mặc cả văn minh & tiền tip.\n" +
      "6. [Tiền Tệ & Chi Phí](/guide/currency) — Phân biệt 20k vs 500k, điểm đổi tiền uy tín & chi phí/ngày.\n" +
      "7. [Lễ Hội & Sự Kiện](/guide/festivals) — Lịch 12 tháng sự kiện lớn khắp Việt Nam.\n\n" +
      "Quý khách có thể truy cập trang chủ cẩm nang tại: [Thông Tin Cần Biết — STAR Travels](/guide).";

    const hubEn =
      "Welcome! STAR Travels features the **Vietnam Travel Info Hub**, " +
      "offering 7 verified practical guides for international and domestic travelers:\n\n" +
      "1. [Weather & Best Travel Seasons](/guide/weather) — Climate patterns across 3 regions & 12 destinations.\n" +
      "2. [Visa & Entry Policies](/guide/visa) — 45-day visa exemption & official 90-day e-visa steps.\n" +
      "3. [Domestic Transportation](/guide/transport) — Airport transfer costs & intercity VIP transit.\n" +
      "4. [Safety & Emergency Contacts](/guide/safety) — Toll-free 113/114/115 hotlines & health advice.\n" +
      "5. [Cultural Etiquette & Dress Codes](/guide/culture) — Temple modesty rules, tipping & taboos.\n" +
      "6. [Currency & Daily Budgets](/guide/currency) — Avoiding 20k vs 500k confusion & daily spending tiers.\n" +
      "7. [Festivals & Seasonal Events](/guide/festivals) — 12-month cultural celebrations calendar.\n\n" +
      "Explore the full directory at our [Travel Info Hub](/guide).";

    return {
      message: isEn ? hubEn : hubVi,
      recommended_tours: [],
      recommended_stories: [],
      recommended_destinations: [],
      recommended_guides: GUIDE_CATEGORIES.map((c) => mapGuideToCard(c.slug, isEn)!).filter(Boolean),
      contactRequired: false,
    };
  }

  // 0.1 Out-of-scope check: International outbound destinations or non-tour services
  const OUT_OF_SCOPE_KEYWORDS = [
    // Outbound international countries & cities
    "nhat ban", "japan", "tokyo", "osaka", "kyoto",
    "han quoc", "korea", "seoul", "busan",
    "thai lan", "thailand", "bangkok", "phuket", "pattaya", "chiang mai",
    "singapore", "malaysia", "kuala lumpur", "indonesia", "bali",
    "trung quoc", "china", "bac kinh", "beijing", "thuong hai", "shanghai", "quang chau", "guangzhou",
    "dai loan", "taiwan", "taipei", "hong kong", "hongkong", "macau",
    "chau au", "europe", "nuoc phap", "du lich phap", "france", "paris", "anh quoc", "london", "nuoc anh", "england",
    "nuoc my", "hoa ky", "du lich my", "usa", "america", "new york", "california",
    "nuoc uc", "australia", "sydney", "melbourne",
    "dubai", "uae", "maldives", "campuchia", "cambodia", "siem reap", "nuoc lao", "du lich lao", "vientiane",
    "nuoc nga", "russia", "moscow", "nuoc duc", "germany", "berlin", "nuoc y", "du lich y", "italy", "italia", "roma", "rome",
    // Out-of-scope external non-tour requests
    "truc thang", "helicopter", "ve may bay quoc te",
    "schengen", "visa my", "visa chau au",
    "thue xe tu lai"
  ];

  if (OUT_OF_SCOPE_KEYWORDS.some((kw) => q.includes(kw))) {
    const notFoundVi =
      "Dạ hiện tại trong kho kiến thức và danh mục tour của STAR Travels chưa có dữ liệu có sẵn phù hợp với dịch vụ hoặc điểm đến ngoài phạm vi này.\n\n" +
      "Để được đội ngũ chuyên viên hỗ trợ tư vấn thiết kế lịch trình riêng theo yêu cầu cá nhân hóa hoặc giải đáp chi tiết, Quý khách vui lòng liên hệ trực tiếp với chúng em qua trang [Liên Hệ & Tư Vấn Riêng](/contact) hoặc gọi hotline **+84 (0) 24 3999 8888** (hỗ trợ 24/7) nhé ạ!";

    const notFoundEn =
      "Currently, our knowledge base and curated tour catalog do not have pre-packaged itineraries matching this specific request.\n\n" +
      "To request a customized private itinerary or speak directly with our concierge specialists, please reach out via our [Contact & Support Page](/contact) or call our 24/7 hotline at **+84 (0) 24 3999 8888**.";

    return {
      message: isEn ? notFoundEn : notFoundVi,
      recommended_tours: [],
      recommended_stories: [],
      recommended_destinations: [],
      contactRequired: true,
    };
  }

  // 0.15 Smart Geolocation / "Near Me" / Định vị vị trí hiện tại
  const isGeoQuery =
    q.includes("dinh vi") ||
    q.includes("truy vet") ||
    q.includes("vi tri cua toi") ||
    q.includes("vi tri hien tai") ||
    q.includes("gan toi") ||
    q.includes("quanh day") ||
    q.includes("gan day") ||
    q.includes("near me") ||
    q.includes("nearby") ||
    q.includes("my location");

  if (isGeoQuery) {
    const isFoodIntent =
      q.includes("quan") ||
      q.includes("an") ||
      q.includes("nha hang") ||
      q.includes("am thuc") ||
      q.includes("food") ||
      q.includes("dining") ||
      q.includes("restaurant");

    const isHotelIntent =
      q.includes("khach san") ||
      q.includes("resort") ||
      q.includes("noi o") ||
      q.includes("cho o") ||
      q.includes("hotel") ||
      q.includes("stay") ||
      q.includes("nghi duong");

    if (isFoodIntent && !isHotelIntent) {
      const msgVi =
        "Dạ STAR Travels hỗ trợ tính năng **Định vị GPS thông minh** để đề xuất quán ăn uống gần bạn nhất!\n\n" +
        "Quý khách vui lòng mở trang [Nhà Hàng & Ẩm Thực](/restaurants) và bấm nút **'Tìm gần vị trí của tôi'** trên thanh công cụ:\n" +
        "• Hệ thống sẽ tự động đo đạc khoảng cách thực tế (ví dụ: ~850 m, ~1.2 km) bằng thuật toán định vị vệ tinh.\n" +
        "• Tự động sắp xếp các quán ăn, nhà hàng Michelin và ẩm thực đặc sản gần bạn nhất lên đầu danh sách.\n\n" +
        "Ngoài ra, Quý khách cũng có thể nhắn cho em biết bạn đang ở khu vực hoặc thành phố nào (Hà Nội, TP.HCM, Đà Nẵng, Hội An, Hạ Long...) để em gợi ý danh sách món ngon cụ thể ngay tại đây ạ!";

      const msgEn =
        "STAR Travels features **Smart GPS Geolocation** to suggest the closest restaurants and gourmet dining spots!\n\n" +
        "Simply navigate to our [Restaurants & Dining](/restaurants) page and click **'Find Near Me'** on the toolbar:\n" +
        "• Our system calculates real-time distances (e.g. ~850 m, ~1.2 km) using satellite geolocation.\n" +
        "• Nearest Michelin-selected venues, seafood, and authentic eateries are automatically sorted on top.\n\n" +
        "Alternatively, tell me which city or area you are currently staying in, and I will recommend our top dining choices immediately!";

      return {
        message: isEn ? msgEn : msgVi,
        recommended_tours: [],
        recommended_stories: [],
        recommended_destinations: [],
        contactRequired: false,
      };
    }

    if (isHotelIntent && !isFoodIntent) {
      const msgVi =
        "Dạ STAR Travels hỗ trợ tính năng **Định vị GPS thông minh** để đề xuất khách sạn và khu nghỉ dưỡng gần bạn nhất!\n\n" +
        "Quý khách vui lòng mở trang [Khách Sạn & Nghỉ Dưỡng](/accommodations) và bấm nút **'Tìm gần vị trí của tôi'** trên thanh công cụ:\n" +
        "• Hệ thống sẽ tự động tính toán khoảng cách và ưu tiên các resort 5 sao, khách sạn boutique hoặc ecolodge gần bạn nhất.\n" +
        "• Hiển thị cự ly cụ thể (ví dụ: ~1.5 km, ~4.2 km) và huy hiệu gợi ý thông minh.\n\n" +
        "Quý khách cũng có thể nhắn tên điểm đến bạn dự định lưu trú để em gửi thẻ gợi ý phòng nghỉ ưu đãi tức thì nhé!";

      const msgEn =
        "STAR Travels features **Smart GPS Geolocation** to help you discover the closest luxury hotels and resorts!\n\n" +
        "Head to our [Hotels & Accommodations](/accommodations) page and click **'Find Near Me'**:\n" +
        "• The system calculates your distance and ranks the nearest 5-star resorts and boutique retreats.\n" +
        "• Displays precise distances (e.g. ~1.5 km, ~4.2 km) alongside curated recommendation badges.\n\n" +
        "You can also share your current destination city, and I will pull up the finest retreats for you right away!";

      return {
        message: isEn ? msgEn : msgVi,
        recommended_tours: [],
        recommended_stories: [],
        recommended_destinations: [],
        contactRequired: false,
      };
    }

    // Both or general geo query
    const msgVi =
      "Dạ STAR Travels đã phát triển tính năng **Định vị vệ tinh GPS (Geolocation)** để phát hiện cự ly và gợi ý quán ăn, nơi ở gần Quý khách nhất:\n\n" +
      "1. **Tìm quán ăn gần bạn:** Mở trang [Nhà Hàng & Ẩm Thực](/restaurants) ➔ Bấm **'Tìm gần vị trí của tôi'** để xem các nhà hàng Michelin và quán ngon địa phương gần nhất kèm cự ly chi tiết (~850 m, ~1.2 km).\n" +
      "2. **Tìm khách sạn gần bạn:** Mở trang [Khách Sạn & Nghỉ Dưỡng](/accommodations) ➔ Bấm **'Tìm gần vị trí của tôi'** để khám phá các khu nghỉ dưỡng 5 sao và khách sạn di sản gần nhất.\n\n" +
      "🔒 *Cam kết bảo mật:* Hệ thống tuân thủ Nghị định 13/2023/NĐ-CP (chỉ truy cập vị trí khi bạn bấm cho phép trên trình duyệt, không lưu vết ngầm).\n\n" +
      "Quý khách cũng có thể nhắn cho em biết bạn đang ở thành phố nào (Hà Nội, TP.HCM, Đà Nẵng, Hội An, Phú Quốc...) để em tư vấn trực tiếp ngay tại đây nhé!";

    const msgEn =
      "STAR Travels provides **Smart GPS Geolocation** to detect distances and recommend the closest dining and accommodation venues:\n\n" +
      "1. **Dining near you:** Visit [Restaurants & Dining](/restaurants) ➔ Click **'Find Near Me'** to view the nearest Michelin-selected restaurants and local delicacies with exact distance indicators (~850 m, ~1.2 km).\n" +
      "2. **Hotels near you:** Visit [Hotels & Accommodations](/accommodations) ➔ Click **'Find Near Me'** to discover luxury 5-star resorts and heritage retreats nearby.\n\n" +
      "🔒 *Privacy Protection:* Fully compliant with Vietnamese privacy laws (accessed only with explicit user browser permission, never tracked silently).\n\n" +
      "You can also tell me your current city or region, and I will gladly provide direct recommendations right here!";

    return {
      message: isEn ? msgEn : msgVi,
      recommended_tours: [],
      recommended_stories: [],
      recommended_destinations: [],
      contactRequired: false,
    };
  }

  // 0.2 Smart Accommodations / Hotels / Resorts Recommendation
  const isAccQuery =
    q.includes("khach san") ||
    q.includes("resort") ||
    q.includes("hotel") ||
    q.includes("luu tru") ||
    q.includes("nghi duong") ||
    q.includes("ecolodge") ||
    q.includes("homestay") ||
    q.includes("dat phong") ||
    q.includes("cho o") ||
    (previousIntent === "accommodation" && Boolean(q));

  if (isAccQuery) {
    // Check specific region
    if (q.includes("phu quoc")) {
      const msg = isEn
        ? "For **Phu Quoc Island**, STAR Travels proudly recommends **JW Marriott Phu Quoc Emerald Bay Resort & Spa** at Bai Khem beach. World-renowned architecture by Bill Bensley with whimsical college campus design, 5-star private beach, shell-shaped infinity pool and Michelin-caliber dining.\n\n[ACCOMMODATION_CARD: jw-marriott-phu-quoc-emerald-bay]"
        : "Dạ tại đảo ngọc **Phú Quốc**, STAR Travels trân trọng gợi ý tuyệt tác nghỉ dưỡng 5 sao **JW Marriott Phu Quoc Emerald Bay Resort & Spa** tại Bãi Khem. Khu nghỉ dưỡng mang phong cách đại học giả tưởng độc bản của KTS Bill Bensley với bãi biển riêng cát trắng mịn, hồ bơi vỏ sò lừng danh và ẩm thực thượng hạng.\n\n[ACCOMMODATION_CARD: jw-marriott-phu-quoc-emerald-bay]";
      return { message: msg, recommended_tours: [], recommended_stories: [], recommended_destinations: [], contactRequired: false };
    }
    if (q.includes("da nang") || q.includes("son tra")) {
      const msg = isEn
        ? "In **Da Nang**, our top luxury recommendation is the world-renowned **InterContinental Danang Sun Peninsula Resort** nestled on Son Tra Peninsula with private secluded bay and Michelin 3-star culinary artistry.\n\n[ACCOMMODATION_CARD: intercontinental-danang-sun-peninsula-resort]"
        : "Dạ tại **Đà Nẵng**, điểm dừng chân thượng lưu hàng đầu không thể bỏ qua là **InterContinental Danang Sun Peninsula Resort** nép mình bên bán đảo Sơn Trà hoang sơ, với vịnh biển riêng tư biệt lập và nhà hàng Pháp La Maison 1888 đỉnh cao.\n\n[ACCOMMODATION_CARD: intercontinental-danang-sun-peninsula-resort]";
      return { message: msg, recommended_tours: [], recommended_stories: [], recommended_destinations: [], contactRequired: false };
    }
    if (q.includes("hoi an")) {
      const msg = isEn
        ? "In **Hoi An**, STAR Travels recommends **Four Seasons Resort The Nam Hai** along pristine Ha My Beach, blending Feng Shui philosophy with tranquil heritage villa architecture.\n\n[ACCOMMODATION_CARD: four-seasons-resort-the-nam-hai-hoi-an]"
        : "Dạ tại **Hội An**, lựa chọn nghỉ dưỡng thanh tịnh và đẳng cấp nhất là **Four Seasons Resort The Nam Hai** bên bờ biển Hà My, kết hợp hài hòa triết lý phong thủy và kiến trúc nhà vườn di sản xứ Quảng.\n\n[ACCOMMODATION_CARD: four-seasons-resort-the-nam-hai-hoi-an]";
      return { message: msg, recommended_tours: [], recommended_stories: [], recommended_destinations: [], contactRequired: false };
    }
    if (q.includes("nha trang") || q.includes("ninh van")) {
      const msg = isEn
        ? "In **Nha Trang**, experience ultimate eco-luxury seclusion at **Six Senses Ninh Van Bay**, accessible only by boat amidst dramatic rock formations and emerald waters.\n\n[ACCOMMODATION_CARD: six-senses-ninh-van-bay]"
        : "Dạ tại **Nha Trang**, khu nghỉ dưỡng ẩn mình độc bản số 1 là **Six Senses Ninh Van Bay**, chỉ tiếp cận bằng tàu thủy giữa vịnh biển nguyên sơ, biệt thự ghềnh đá và dịch vụ chăm sóc sức khỏe hữu cơ đỉnh cao.\n\n[ACCOMMODATION_CARD: six-senses-ninh-van-bay]";
      return { message: msg, recommended_tours: [], recommended_stories: [], recommended_destinations: [], contactRequired: false };
    }
    if (q.includes("sa pa") || q.includes("sapa") || q.includes("fansipan")) {
      const msg = isEn
        ? "In **Sa Pa**, retreat to **Topas Ecolodge Sapa** perched atop a conical hill in Muong Hoa Valley with iconic heated infinity pools looking over cascading rice terraces.\n\n[ACCOMMODATION_CARD: topas-ecolodge-sapa]"
        : "Dạ tại **Sa Pa**, điểm nghỉ dưỡng sinh thái đẹp nhất Tây Bắc là **Topas Ecolodge Sapa** trên đỉnh đồi hình nón thung lũng Mường Hoa với 2 hồ bơi vô cực nước ấm ngắm trọn ruộng bậc thang kỳ vĩ.\n\n[ACCOMMODATION_CARD: topas-ecolodge-sapa]";
      return { message: msg, recommended_tours: [], recommended_stories: [], recommended_destinations: [], contactRequired: false };
    }
    if (q.includes("ha noi") || q.includes("hanoi")) {
      const msg = isEn
        ? "In **Hanoi**, discover French colonial elegance at **Sofitel Legend Metropole Hanoi** (established in 1901) or operatic boutique artistry at **Capella Hanoi**.\n\n[ACCOMMODATION_CARD: sofitel-legend-metropole-hanoi] [ACCOMMODATION_CARD: capella-hanoi]"
        : "Dạ tại **Hà Nội**, hai kiệt tác lưu trú sang trọng bậc nhất là khách sạn di sản **Sofitel Legend Metropole Hanoi** (thành lập từ năm 1901) và khách sạn boutique nghệ thuật Opera **Capella Hanoi**.\n\n[ACCOMMODATION_CARD: sofitel-legend-metropole-hanoi] [ACCOMMODATION_CARD: capella-hanoi]";
      return { message: msg, recommended_tours: [], recommended_stories: [], recommended_destinations: [], contactRequired: false };
    }
    if (q.includes("ha long") || q.includes("halong")) {
      const msg = isEn
        ? "In **Ha Long Bay**, immerse yourself in luxury aboard the 5-star **Paradise Vietnam Grand Cruise & Hotel** navigating the mystical limestone karsts.\n\n[ACCOMMODATION_CARD: paradise-vietnam-cruises-halong]"
        : "Dạ tại **Hạ Long**, trải nghiệm nghỉ dưỡng vịnh biển 5 sao sang trọng nhất là hải trình du thuyền khách sạn **Paradise Vietnam Grand Cruise & Hotel** với ban công riêng view vịnh kỳ quan.\n\n[ACCOMMODATION_CARD: paradise-vietnam-cruises-halong]";
      return { message: msg, recommended_tours: [], recommended_stories: [], recommended_destinations: [], contactRequired: false };
    }
    if (q.includes("hue") || q.includes("song huong")) {
      const msg = isEn
        ? "In **Hue**, relax by the Perfume River at **Azerai La Residence Hue**, a historic 1930s Art Deco mansion facing the ancient Imperial Citadel.\n\n[ACCOMMODATION_CARD: azerai-la-residence-hue]"
        : "Dạ tại **Huế**, điểm dừng chân di sản thơ mộng nhất là **Azerai La Residence Hue**, dinh thự Art Deco thập niên 1930 soi bóng bên bờ sông Hương đối diện Cố đô.\n\n[ACCOMMODATION_CARD: azerai-la-residence-hue]";
      return { message: msg, recommended_tours: [], recommended_stories: [], recommended_destinations: [], contactRequired: false };
    }
    if (q.includes("ninh binh") || q.includes("tam coc") || q.includes("trang an")) {
      const msg = isEn
        ? "In **Ninh Binh**, enjoy the peaceful countryside sanctuary at **Tam Coc Garden Resort** nestled among emerald rice fields and limestone karsts.\n\n[ACCOMMODATION_CARD: tam-coc-garden-resort-ninh-binh]"
        : "Dạ tại **Ninh Bình**, viên ngọc ẩn mình giữa đồng lúa và núi đá vôi non nước Tràng An là **Tam Coc Garden Resort** đậm chất làng quê Bắc Bộ thanh bình.\n\n[ACCOMMODATION_CARD: tam-coc-garden-resort-ninh-binh]";
      return { message: msg, recommended_tours: [], recommended_stories: [], recommended_destinations: [], contactRequired: false };
    }

    // General query without region -> Ask customer for region
    const askRegionVi =
      "Dạ Quý khách đang tìm kiếm **Khách Sạn & Resort** tại khu vực nào ạ? STAR Travels tuyển chọn sẵn các điểm dừng chân 5 sao & di sản đẳng cấp tại:\n\n" +
      "• **Phú Quốc:** JW Marriott Emerald Bay (Bãi Khem)\n" +
      "• **Đà Nẵng & Sơn Trà:** InterContinental Danang Sun Peninsula\n" +
      "• **Hội An:** Four Seasons The Nam Hai (Hà My)\n" +
      "• **Nha Trang:** Six Senses Ninh Van Bay (Vịnh Ninh Vân)\n" +
      "• **Sa Pa:** Topas Ecolodge (Thung lũng Mường Hoa)\n" +
      "• **Hà Nội:** Sofitel Legend Metropole & Capella Hà Nội\n" +
      "• **Hạ Long:** Du thuyền khách sạn 5 sao Paradise Grand\n" +
      "• **Ninh Bình:** Tam Cốc Garden sinh thái bình yên\n" +
      "• **Huế:** Azerai La Residence Hue bên sông Hương\n\n" +
      "Quý khách chỉ cần nhắn tên khu vực hoặc phong cách mong muốn (resort biển, di sản, núi rừng, gia đình...), em sẽ gợi ý chính xác và gửi thẻ đặt chỗ ưu đãi ngay ạ!";

    const askRegionEn =
      "Which destination are you looking for luxury **Hotels & Resorts** in? STAR Travels features curated 5-star heritage retreats across Vietnam:\n\n" +
      "• **Phu Quoc:** JW Marriott Emerald Bay\n" +
      "• **Da Nang:** InterContinental Danang Sun Peninsula\n" +
      "• **Hoi An:** Four Seasons The Nam Hai\n" +
      "• **Nha Trang:** Six Senses Ninh Van Bay\n" +
      "• **Sa Pa:** Topas Ecolodge Sapa\n" +
      "• **Hanoi:** Sofitel Legend Metropole & Capella Hanoi\n" +
      "• **Ha Long:** Paradise Grand 5-Star Cruise\n" +
      "• **Ninh Binh:** Tam Coc Garden Resort\n" +
      "• **Hue:** Azerai La Residence Hue\n\n" +
      "Please let me know your preferred region or vacation style (beachfront, mountain, heritage, family...), and I will provide tailored recommendations!";

    return {
      message: isEn ? askRegionEn : askRegionVi,
      recommended_tours: [],
      recommended_stories: [],
      recommended_destinations: [],
      contactRequired: false,
    };
  }

  // 0.3 Smart Restaurants / Dining / Gourmet Recommendation
  const isResQuery =
    q.includes("nha hang") ||
    q.includes("an uong") ||
    q.includes("am thuc") ||
    q.includes("quan an") ||
    q.includes("an gi") ||
    q.includes("dining") ||
    q.includes("restaurant") ||
    q.includes("michelin") ||
    q.includes("dat ban") ||
    q.includes("mon ngon") ||
    (previousIntent === "restaurant" && Boolean(q));

  if (isResQuery) {
    if (q.includes("ha noi") || q.includes("hanoi")) {
      const msg = isEn
        ? "In **Hanoi**, indulge in 1-Michelin-starred seasonal tasting menus at **Gia Restaurant**, authentic Northern home-style feasts at **Tam Vi (Michelin 1*)**, or French-Asian gastronomy at **La Badiane**.\n\n[RESTAURANT_CARD: gia-restaurant-hanoi] [RESTAURANT_CARD: tam-vi-restaurant-hanoi]"
        : "Dạ tại **Hà Nội**, STAR Travels trân trọng gợi ý thực đơn Tasting Menu đương đại tại **Gia Restaurant (Michelin 1 Sao)** đối diện Văn Miếu, mâm cơm gia đình Bắc Bộ chuẩn vị tại **Tầm Vị (Michelin 1 Sao)**, và phong vị Pháp - Á tại **La Badiane**.\n\n[RESTAURANT_CARD: gia-restaurant-hanoi] [RESTAURANT_CARD: tam-vi-restaurant-hanoi]";
      return { message: msg, recommended_tours: [], recommended_stories: [], recommended_destinations: [], contactRequired: false };
    }
    if (q.includes("sai gon") || q.includes("ho chi minh") || q.includes("tp hcm") || q.includes("tphcm")) {
      const msg = isEn
        ? "In **Ho Chi Minh City**, experience Michelin-starred modern Vietnamese gastronomy at **Anan Saigon** or sunset riverfront pan-Asian dining at **The Deck Saigon**.\n\n[RESTAURANT_CARD: anan-saigon] [RESTAURANT_CARD: the-deck-saigon]"
        : "Dạ tại **TP. Hồ Chí Minh**, hai điểm hẹn ẩm thực đỉnh cao là **Ănăn Saigon (Michelin 1 Sao)** của Bếp trưởng Peter Cường Franklin và nhà hàng ngắm hoàng hôn ven sông lãng mạn **The Deck Saigon** tại Thảo Điền.\n\n[RESTAURANT_CARD: anan-saigon] [RESTAURANT_CARD: the-deck-saigon]";
      return { message: msg, recommended_tours: [], recommended_stories: [], recommended_destinations: [], contactRequired: false };
    }
    if (q.includes("hoi an")) {
      const msg = isEn
        ? "In **Hoi An**, do not miss **Morning Glory Original** in the ancient town, renowned for authentic Cao Lau noodles, white rose dumplings, and crispy wontons.\n\n[RESTAURANT_CARD: morning-glory-original-hoi-an]"
        : "Dạ tại **Hội An**, điểm hẹn ẩm thực trứ danh phố cổ là **Morning Glory Original** của đầu bếp Vy với đặc sản Cao lầu thịt xíu, bánh hoa hồng trắng và hoành thánh chiên giòn chính gốc.\n\n[RESTAURANT_CARD: morning-glory-original-hoi-an]";
      return { message: msg, recommended_tours: [], recommended_stories: [], recommended_destinations: [], contactRequired: false };
    }
    if (q.includes("da nang")) {
      const msg = isEn
        ? "In **Da Nang**, savor authentic central Vietnamese heritage dishes along the Han River at **Madame Lan Restaurant**.\n\n[RESTAURANT_CARD: madame-lan-danang]"
        : "Dạ tại **Đà Nẵng**, điểm hẹn ẩm thực 3 miền và đặc sản xứ Quảng bên bờ sông Hàn thơ mộng là **Nhà Hàng Madame Lân Đà Nẵng** với bánh xèo tôm nhảy, mì Quảng và gỏi cá Nam Ô tươi ngon.\n\n[RESTAURANT_CARD: madame-lan-danang]";
      return { message: msg, recommended_tours: [], recommended_stories: [], recommended_destinations: [], contactRequired: false };
    }
    if (q.includes("ha long") || q.includes("halong")) {
      const msg = isEn
        ? "In **Ha Long**, feast on premium ocean catch and claypot golden crab hotpot at **Golden Crab Seafood Restaurant Bai Chay**.\n\n[RESTAURANT_CARD: nha-hang-hai-san-cua-vang-halong]"
        : "Dạ tại **Hạ Long**, nhà hàng hải sản tươi sống cao cấp hàng đầu là **Hải Sản Cua Vàng Bãi Cháy**, nổi tiếng với món lẩu cua biển niêu đất bí truyền và tôm hùm bông nướng phô mai.\n\n[RESTAURANT_CARD: nha-hang-hai-san-cua-vang-halong]";
      return { message: msg, recommended_tours: [], recommended_stories: [], recommended_destinations: [], contactRequired: false };
    }
    if (q.includes("hue")) {
      const msg = isEn
        ? "In **Hue**, step back in time with an authentic imperial banquet experience at **Ngu Uyen Royal Hue Court Cuisine** featuring royal costumes and UNESCO court music.\n\n[RESTAURANT_CARD: ngu-uyen-co-do-hue]"
        : "Dạ tại **Huế**, yến tiệc hoàng gia triều Nguyễn chuẩn mực nhất là **Nhà Hàng Ngự Uyển Cung Đình Huế** với nem công chả phượng, cơm lá sen và nhã nhạc cung đình.\n\n[RESTAURANT_CARD: ngu-uyen-co-do-hue]";
      return { message: msg, recommended_tours: [], recommended_stories: [], recommended_destinations: [], contactRequired: false };
    }

    // General dining query without region -> Ask customer for region
    const askDiningVi =
      "Dạ Quý khách đang tìm kiếm trải nghiệm ẩm thực tại **khu vực** nào ạ? STAR Travels tuyển chọn các điểm hẹn ẩm thực tinh tuyển từ sao Michelin đến món ngon di sản tại:\n\n" +
      "• **Hà Nội:** Gia Restaurant (Michelin 1*), Tầm Vị (Michelin 1*), Bếp Quán\n" +
      "• **TP. Hồ Chí Minh:** Ănăn Saigon (Michelin 1*), The Deck ven sông Sài Gòn\n" +
      "• **Hội An:** Morning Glory Original chuẩn vị phố cổ\n" +
      "• **Đà Nẵng:** Madame Lân bên bờ sông Hàn\n" +
      "• **Hạ Long:** Hải sản tươi sống Cua Vàng Bãi Cháy\n" +
      "• **Huế:** Yến tiệc Hoàng gia Cung đình Ngự Uyển\n\n" +
      "Quý khách chỉ cần nhắn tên khu vực hoặc gu thưởng thức (Michelin, hải sản tươi sống, cơm truyền thống, ven sông...), em sẽ gợi ý chính xác ngay ạ!";

    const askDiningEn =
      "Which city or region are you seeking **Dining & Restaurant** recommendations in? STAR Travels features Michelin-starred fine dining and authentic heritage eateries:\n\n" +
      "• **Hanoi:** Gia Restaurant (Michelin 1*), Tam Vi (Michelin 1*)\n" +
      "• **Ho Chi Minh City:** Anan Saigon (Michelin 1*), The Deck Saigon\n" +
      "• **Hoi An:** Morning Glory Original\n" +
      "• **Da Nang:** Madame Lan Riverside\n" +
      "• **Ha Long:** Golden Crab Seafood\n" +
      "• **Hue:** Ngu Uyen Royal Banquet\n\n" +
      "Please let me know your preferred destination or dining vibe (fine dining, seafood, authentic local dishes...), and I'll send direct recommendations!";

    return {
      message: isEn ? askDiningEn : askDiningVi,
      recommended_tours: [],
      recommended_stories: [],
      recommended_destinations: [],
      contactRequired: false,
    };
  }

  // 1. Sa Pa / Fansipan / Săn mây
  if (
    q.includes("sa pa") ||
    q.includes("sapa") ||
    q.includes("fansipan") ||
    q.includes("san may") ||
    q.includes("cat cat") ||
    q.includes("muong hoa") ||
    q.includes("tay bac")
  ) {
    const sapaTour = findTour("tour-sapa-fansipan-2n1d");
    const cloudStory = findStory("bi-quyet-san-may-ta-xua");
    const sapaDest = findDest("sa-pa");

    const textVi =
      "Dạ chào Quý khách! Để trải nghiệm **săn mây Sa Pa & chinh phục đỉnh Fansipan 3.143m**, thời điểm lý tưởng nhất là từ **tháng 10 đến tháng 4 năm sau**. Vào sáng sớm, biển mây bồng bềnh cuộn trào quanh thung lũng Mường Hoa và đèo Ô Quy Hồ vô cùng ngoạn mục!\n\n" +
      "STAR Travels kính gửi Quý khách tour trọn gói và cẩm nang chi tiết trên website để Quý khách xem ngay:";

    const textEn =
      "Welcome! For **Sa Pa cloud hunting and conquering the 3,143m Fansipan peak**, the golden season is from **October to April**, featuring majestic sea-of-clouds rolling over Muong Hoa Valley.\n\n" +
      "Here are our handcrafted packages and travel guides available on the platform:";

    const tours = sapaTour ? [mapTourToCard(sapaTour, isEn)] : [];
    const stories = cloudStory ? [mapStoryToCard(cloudStory)] : [];
    const dests = sapaDest ? [mapDestinationToCard(sapaDest, isEn)] : [];

    return {
      message: isEn ? textEn : textVi,
      recommended_tours: tours,
      recommended_stories: stories,
      recommended_destinations: dests,
      contactRequired: false,
    };
  }

  // 2. Hạ Long / Du thuyền / Cruise / Lan Hạ
  if (
    q.includes("ha long") ||
    q.includes("du thuyen") ||
    q.includes("cruise") ||
    q.includes("lan ha") ||
    q.includes("tuan chau")
  ) {
    const haLongTour = findTour("tour-ha-long-cruise-2n1d");
    const haLongStory = findStory("kinh-nghiem-du-thuyen-ha-long");
    const haLongDest = findDest("ha-long");

    const textVi =
      "Dạ chào Quý khách! Vịnh Hạ Long & Vịnh Lan Hạ là kỳ quan thiên nhiên thế giới UNESCO với hàng ngàn đảo đá vôi kỳ vĩ và làn nước xanh ngọc bích. Trải nghiệm thượng lưu nhất là **nghỉ đêm trên Du thuyền 5 sao**, chèo thuyền kayak qua Hang Sáng Tối và đón hoàng hôn trên boong tàu.\n\n" +
      "Quý khách có thể xem chi tiết hải trình và bài viết cẩm nang bên dưới:";

    const textEn =
      "Ha Long Bay & Lan Ha Bay offer an unforgettable UNESCO natural wonder. The premier experience is an **overnight 5-star luxury cruise**, kayaking through Bright & Dark Cave, and sunset parties on the sundeck.\n\n" +
      "Explore our featured cruise package and travel insights below:";

    const tours = haLongTour ? [mapTourToCard(haLongTour, isEn)] : [];
    const stories = haLongStory ? [mapStoryToCard(haLongStory)] : [];
    const dests = haLongDest ? [mapDestinationToCard(haLongDest, isEn)] : [];

    return {
      message: isEn ? textEn : textVi,
      recommended_tours: tours,
      recommended_stories: stories,
      recommended_destinations: dests,
      contactRequired: false,
    };
  }

  // 3. Đà Nẵng / Hội An / Cầu Vàng / Bà Nà
  if (
    q.includes("hoi an") ||
    q.includes("da nang") ||
    q.includes("cau vang") ||
    q.includes("ba na") ||
    q.includes("am thuc") ||
    q.includes("cao lau")
  ) {
    const centralTour = findTour("tour-da-nang-hoi-an-trail");
    const hoiAnStory = findStory("cam-nang-am-thuc-hoi-an");
    const hoiAnDest = findDest("hoi-an");
    const daNangDest = findDest("da-nang");

    const textVi =
      "Dạ chào Quý khách! Hành trình di sản **Đà Nẵng — Phố cổ Hội An — Cầu Vàng Bà Nà Hills** kết hợp trọn vẹn cảnh sắc ngoạn mục và chiều sâu văn hóa truyền thống. Quý khách sẽ được check-in đôi bàn tay khổng lồ Cầu Vàng, thả hoa đăng sông Hoài và thưởng thức mì Quảng, cao lầu nức tiếng.\n\n" +
      "Quý khách tham khảo ngay gói tour và bài viết cẩm nang ẩm thực dưới đây:";

    const textEn =
      "The **Da Nang — Hoi An — Golden Bridge** route blends modern architectural marvels with historic charm. Enjoy walking across the iconic Golden Bridge, lantern boat rides in Hoi An, and world-renowned local cuisine.\n\n" +
      "Check out our signature tour and food guide below:";

    const tours = centralTour ? [mapTourToCard(centralTour, isEn)] : [];
    const stories = hoiAnStory ? [mapStoryToCard(hoiAnStory)] : [];
    const dests = [hoiAnDest, daNangDest].filter(Boolean).map((d) => mapDestinationToCard(d!, isEn));

    return {
      message: isEn ? textEn : textVi,
      recommended_tours: tours,
      recommended_stories: stories,
      recommended_destinations: dests,
      contactRequired: false,
    };
  }

  // 4. Đà Lạt / Hoa / Cầu Đất
  if (
    q.includes("da lat") ||
    q.includes("cau dat") ||
    q.includes("tuyen lam") ||
    q.includes("datanla") ||
    q.includes("ngan hoa")
  ) {
    const daLatTour = findTour("tour-da-lat-3n2d");
    const cloudStory = findStory("kinh-nghiem-du-lich-da-lat-tu-tuc");
    const daLatDest = findDest("da-lat");

    const textVi =
      "Dạ chào Quý khách! **Đà Lạt — Thành phố ngàn hoa** luôn là điểm đến lý tưởng để thư giãn giữa không khí mát lạnh trong lành, đón bình minh săn mây tại đồi chè Cầu Đất Panorama và thưởng thức tiệc BBQ giữa rừng thông mộng mơ.\n\n" +
      "STAR Travels gửi Quý khách gói tour Đà Lạt 3N2Đ và điểm đến nổi bật:";

    const textEn =
      "**Da Lat — City of Eternal Spring** is famed for its cool highland breeze, cloud-hunting panoramas at Cau Dat tea hills, and romantic pine forest BBQ gatherings.\n\n" +
      "Discover our top package and destination details below:";

    const tours = daLatTour ? [mapTourToCard(daLatTour, isEn)] : [];
    const stories = cloudStory ? [mapStoryToCard(cloudStory)] : [];
    const dests = daLatDest ? [mapDestinationToCard(daLatDest, isEn)] : [];

    return {
      message: isEn ? textEn : textVi,
      recommended_tours: tours,
      recommended_stories: stories,
      recommended_destinations: dests,
      contactRequired: false,
    };
  }

  // 5. Phú Quốc / Lặn biển / San hô
  if (
    q.includes("phu quoc") ||
    q.includes("lan bien") ||
    q.includes("san ho") ||
    q.includes("bai sao") ||
    q.includes("an thoi")
  ) {
    const phuQuocTour = findTour("tour-phu-quoc-nam-dao-4n3d");
    const divingStory = findStory("lan-ngam-san-ho-phu-quoc");
    const phuQuocDest = findDest("phu-quoc");

    const textVi =
      "Dạ chào Quý khách! **Đảo Ngọc Phú Quốc** là thiên đường biển đảo nhiệt đới với làn nước trong vắt, bãi cát trắng mịn Bãi Khem và rạn san hô tự nhiên tại quần đảo An Thới. Quý khách sẽ được trải nghiệm cano siêu tốc 4 đảo, lặn ngắm san hô và ngắm hoàng hôn Sunset Sanato tuyệt đẹp.\n\n" +
      "Mời Quý khách xem ngay tour trọn gói và cẩm nang lặn biển chi tiết:";

    const textEn =
      "**Phu Quoc Pearl Island** boasts powdery white sands, pristine coral reefs in the An Thoi archipelago, and spectacular sunsets.\n\n" +
      "Explore our 4-Island tour and diving guide below:";

    const tours = phuQuocTour ? [mapTourToCard(phuQuocTour, isEn)] : [];
    const stories = divingStory ? [mapStoryToCard(divingStory)] : [];
    const dests = phuQuocDest ? [mapDestinationToCard(phuQuocDest, isEn)] : [];

    return {
      message: isEn ? textEn : textVi,
      recommended_tours: tours,
      recommended_stories: stories,
      recommended_destinations: dests,
      contactRequired: false,
    };
  }

  // 6. Ninh Bình / Tràng An / Hang Múa
  if (
    q.includes("ninh binh") ||
    q.includes("trang an") ||
    q.includes("hang mua") ||
    q.includes("hoa lu")
  ) {
    const ninhBinhTour = findTour("tour-trang-an-hang-mua-1n");
    const heritageStory = findStory("hanh-trinh-xuyen-viet");
    const ninhBinhDest = findDest("ninh-binh");

    const textVi =
      "Dạ chào Quý khách! Quần thể di sản thế giới kép UNESCO **Tràng An — Ninh Bình** nổi tiếng với non nước hữu tình, thuyền nan luồn qua các hang động ngập nước kỳ ảo và đỉnh Hang Múa ngắm trọn toàn cảnh Tam Cốc.\n\n" +
      "STAR Travels gợi ý Quý khách gói tour 1 ngày khởi hành hàng ngày từ Hà Nội:";

    const textEn =
      "UNESCO dual heritage **Trang An — Ninh Binh** features boat rides through limestone water caves and panoramic views from Mua Cave peak.\n\n" +
      "Check out our signature Ninh Binh day tour below:";

    const tours = ninhBinhTour ? [mapTourToCard(ninhBinhTour, isEn)] : [];
    const stories = heritageStory ? [mapStoryToCard(heritageStory)] : [];
    const dests = ninhBinhDest ? [mapDestinationToCard(ninhBinhDest, isEn)] : [];

    return {
      message: isEn ? textEn : textVi,
      recommended_tours: tours,
      recommended_stories: stories,
      recommended_destinations: dests,
      contactRequired: false,
    };
  }

  // 7. Hà Giang / Mã Pí Lèng / Nho Quế
  if (
    q.includes("ha giang") ||
    q.includes("ma pi leng") ||
    q.includes("nho que") ||
    q.includes("dong van") ||
    q.includes("tu san")
  ) {
    const haGiangTour = findTour("tour-ha-giang-dong-van-3n2d");
    const cloudStory = findStory("bi-quyet-san-may-ta-xua");
    const haGiangDest = findDest("ha-giang");

    const textVi =
      "Dạ chào Quý khách! **Hà Giang** là hành trình kỳ vĩ khám phá Cao nguyên đá Đồng Văn, vượt đèo Mã Pí Lèng hùng vĩ và đi thuyền trên dòng sông Nho Quế xanh biếc qua hẻm Tu Sản sâu nhất Đông Nam Á.\n\n" +
      "Xem ngay lịch trình chi tiết tour Hà Giang 3N2Đ:";

    const textEn =
      "**Ha Giang** is a legendary road trip conquering Ma Pi Leng Pass, Tu San Canyon boat cruises, and Dong Van Karst Plateau.\n\n" +
      "View our full 3D2N itinerary and details below:";

    const tours = haGiangTour ? [mapTourToCard(haGiangTour, isEn)] : [];
    const stories = cloudStory ? [mapStoryToCard(cloudStory)] : [];
    const dests = haGiangDest ? [mapDestinationToCard(haGiangDest, isEn)] : [];

    return {
      message: isEn ? textEn : textVi,
      recommended_tours: tours,
      recommended_stories: stories,
      recommended_destinations: dests,
      contactRequired: false,
    };
  }

  // 8. Miền Tây / Cần Thơ / Chợ nổi
  if (
    q.includes("mien tay") ||
    q.includes("can tho") ||
    q.includes("cho noi") ||
    q.includes("ben tre") ||
    q.includes("song nuoc")
  ) {
    const mekongTour = findTour("tour-mekong-delta-floating-market");
    const canThoDest = findDest("can-tho");

    const textVi =
      "Dạ chào Quý khách! Về **Mê Kông sông nước**, Quý khách sẽ được xuôi thuyền nan ba lá len lỏi giữa rặng dừa Bến Tre mát rượi, khám phá chợ nổi Cái Răng Cần Thơ nhộn nhịp lúc bình minh và thưởng thức trái cây miệt vườn tươi ngon.\n\n" +
      "Mời Quý khách tham khảo gói tour miền Tây sông nước 2N1Đ:";

    const textEn =
      "Experience authentic **Mekong River life** with sampan boat rides through Ben Tre coconut canals and lively Cai Rang floating markets at dawn.\n\n" +
      "Check out our signature Mekong tour package:";

    const tours = mekongTour ? [mapTourToCard(mekongTour, isEn)] : [];
    const dests = canThoDest ? [mapDestinationToCard(canThoDest, isEn)] : [];

    return {
      message: isEn ? textEn : textVi,
      recommended_tours: tours,
      recommended_stories: [],
      recommended_destinations: dests,
      contactRequired: false,
    };
  }

  // 8.5 Mũi Né / Phan Thiết / Đồi Cát Bay / Bàu Trắng
  if (
    q.includes("mui ne") ||
    q.includes("phan thiet") ||
    q.includes("doi cat") ||
    q.includes("bau trang") ||
    q.includes("suoi tien")
  ) {
    const muiNeTour = findTour("tour-mui-ne-phan-thiet-2n1d");
    const muiNeStory = findStory("cam-nang-du-lich-mui-ne-phan-thiet");
    const muiNeDest = findDest("mui-ne");

    const textVi =
      "Dạ chào Quý khách! **Mũi Né — Phan Thiết** là thiên đường biển xanh cát trắng nắng vàng của miền duyên hải Nam Trung Bộ. Quý khách sẽ được trải nghiệm xe Jeep địa hình băng qua Đồi Cát Trắng Bàu Trắng, lội Suối Tiên kỳ ảo và ngắm hoàng hôn trên đồi cát đỏ rực.\n\n" +
      "STAR Travels trân trọng gửi Quý khách gói tour Mũi Né trọn gói và cẩm nang kinh nghiệm chi tiết bên dưới:";

    const textEn =
      "**Mui Ne — Phan Thiet** is Vietnam's coastal playground famed for rolling red and white sand dunes, jeep safaris at Bau Trang, and fresh seafood by the sea.\n\n" +
      "Explore our curated 2D1N Mui Ne tour and travel handbook below:";

    const tours = muiNeTour ? [mapTourToCard(muiNeTour, isEn)] : [];
    const stories = muiNeStory ? [mapStoryToCard(muiNeStory)] : [];
    const dests = muiNeDest ? [mapDestinationToCard(muiNeDest, isEn)] : [];

    return {
      message: isEn ? textEn : textVi,
      recommended_tours: tours,
      recommended_stories: stories,
      recommended_destinations: dests,
      contactRequired: false,
    };
  }

  // 8.6 Cố Đô Huế / Sông Hương / Đại Nội
  if (
    q.includes("hue") ||
    q.includes("co do") ||
    q.includes("song huong") ||
    q.includes("dai noi") ||
    q.includes("thien mu")
  ) {
    const hueTour = findTour("tour-hue-di-san-2n1d");
    const hueDest = findDest("hue");
    const heritageStory = findStory("hanh-trinh-xuyen-viet");

    const textVi =
      "Dạ chào Quý khách! **Cố Đô Huế** mang vẻ đẹp trầm mặc, cổ kính với Quần thể Di tích Cố đô Huế, Đại Nội nguy nga, các lăng tẩm vua chúa triều Nguyễn và trải nghiệm du thuyền rồng nghe ca Huế trên sông Hương thơ mộng.\n\n" +
      "Mời Quý khách tham khảo gói tour di sản Cố Đô Huế 2N1Đ trọn gói:";

    const textEn =
      "**Imperial City of Hue** is Vietnam's cultural heartland featuring ancient citadels, royal tombs along the Perfume River, and UNESCO traditional court music.\n\n" +
      "Explore our handcrafted Hue heritage tour package:";

    const tours = hueTour ? [mapTourToCard(hueTour, isEn)] : [];
    const stories = heritageStory ? [mapStoryToCard(heritageStory)] : [];
    const dests = hueDest ? [mapDestinationToCard(hueDest, isEn)] : [];

    return {
      message: isEn ? textEn : textVi,
      recommended_tours: tours,
      recommended_stories: stories,
      recommended_destinations: dests,
      contactRequired: false,
    };
  }

  // 9. Gia đình / Nhóm
  if (
    q.includes("gia dinh") ||
    q.includes("family") ||
    q.includes("tre em") ||
    q.includes("nhom") ||
    q.includes("4 nguoi") ||
    q.includes("nguoi lon tuoi")
  ) {
    const familyTours = [
      findTour("tour-da-nang-hoi-an-trail"),
      findTour("tour-ha-long-cruise-2n1d"),
      findTour("tour-phu-quoc-nam-dao-4n3d"),
    ]
      .filter(Boolean)
      .map((t) => mapTourToCard(t!, isEn));

    const heritageStory = findStory("hanh-trinh-xuyen-viet");
    const stories = heritageStory ? [mapStoryToCard(heritageStory)] : [];

    const textVi =
      "Dạ chào Quý khách! Với chuyến đi **gia đình hoặc nhóm**, STAR Travels thiết kế các gói tour dịch vụ cao cấp, di chuyển êm ái bằng xe limousine/du thuyền 5 sao, lịch trình thư thả phù hợp cho cả người lớn tuổi và trẻ nhỏ.\n\n" +
      "Dưới đây là 3 hành trình được các gia đình lựa chọn nhiều nhất:";

    const textEn =
      "For **family and group vacations**, STAR Travels curates seamless, relaxing journeys featuring 4-5 star luxury amenities suitable for all generations.\n\n" +
      "Here are our most beloved family-friendly packages:";

    return {
      message: isEn ? textEn : textVi,
      recommended_tours: familyTours,
      recommended_stories: stories,
      recommended_destinations: [],
      contactRequired: false,
    };
  }

  // 10. Chính sách / Hoàn hủy / Trẻ em / Liên hệ
  if (
    q.includes("chinh sach") ||
    q.includes("hoan huy") ||
    q.includes("quy dinh") ||
    q.includes("huy tour") ||
    q.includes("thanh toan") ||
    q.includes("dat coc")
  ) {
    const textVi =
      "Dạ chào Quý khách! STAR Travels cam kết chính sách dịch vụ minh bạch hàng đầu:\n\n" +
      "• **Miễn phí hủy tour** trước 07 ngày khởi hành (hoàn tiền 100% trong 24h).\n" +
      "• **Chính sách trẻ em**: Dưới 5 tuổi miễn phí 100%; từ 5 - 10 tuổi tính 75% giá vé; từ 10 tuổi tính như người lớn.\n" +
      "• **Đổi ngày khởi hành**: Hỗ trợ dời ngày miễn phí 01 lần trước 05 ngày.\n\n" +
      "Quý khách có thể xem thêm chi tiết tại trang [Liên Hệ Hỗ Trợ 24/7](/contact) hoặc xem danh mục [Tất Cả Tour Du Lịch](/tours). Dưới đây là các tour tiêu biểu Quý khách có thể tham khảo:";

    const textEn =
      "STAR Travels guarantees transparent, traveler-first policies:\n\n" +
      "• **Free cancellation** up to 7 days before departure with 100% refund.\n" +
      "• **Children policy**: Under 5 years free; 5-10 years 75% adult rate; 10+ adult rate.\n" +
      "• **Flexible reschedule**: Free 1-time date change up to 5 days prior.\n\n" +
      "Feel free to visit our [Contact & Support](/contact) or browse [All Tours](/tours). Featured packages below:";

    const tours = [findTour("tour-ha-long-cruise-2n1d"), findTour("tour-sapa-fansipan-2n1d")]
      .filter(Boolean)
      .map((t) => mapTourToCard(t!, isEn));

    return {
      message: isEn ? textEn : textVi,
      recommended_tours: tours,
      recommended_stories: [],
      recommended_destinations: [],
      contactRequired: false,
    };
  }

  // 11. Multi-Entity RAG Knowledge Search with canonical Vietnam travel entities
  interface DestinationEntity {
    slug: string;
    keywords: string[];
    tourSlug?: string;
    storySlug?: string;
  }

  const DESTINATION_ENTITIES: DestinationEntity[] = [
    {
      slug: "sa-pa",
      keywords: ["sa pa", "sapa", "fansipan", "cat cat", "muong hoa", "o quy ho", "bac ha", "san may", "tay bac"],
      tourSlug: "tour-sapa-fansipan-2n1d",
      storySlug: "bi-quyet-san-may-ta-xua",
    },
    {
      slug: "ha-long",
      keywords: ["ha long", "halong", "du thuyen", "cruise", "lan ha", "tuan chau", "bai chay", "cat ba"],
      tourSlug: "tour-ha-long-cruise-2n1d",
      storySlug: "kinh-nghiem-du-thuyen-ha-long",
    },
    {
      slug: "da-nang",
      keywords: ["da nang", "danang", "ba na", "bana", "cau vang", "my khe", "son tra", "ngu hanh son", "cau rong"],
      tourSlug: "tour-da-nang-hoi-an-trail",
      storySlug: "cam-nang-am-thuc-hoi-an",
    },
    {
      slug: "hoi-an",
      keywords: ["hoi an", "hoian", "chua cau", "song hoai", "den long", "pho co hoi an"],
      tourSlug: "tour-da-nang-hoi-an-trail",
      storySlug: "cam-nang-am-thuc-hoi-an",
    },
    {
      slug: "phu-quoc",
      keywords: ["phu quoc", "phuquoc", "dao ngoc", "bai khem", "bai sao", "hon thom", "sunset town", "lan san ho", "lan bien", "diving"],
      tourSlug: "tour-phu-quoc-nam-dao-4n3d",
      storySlug: "lan-ngam-san-ho-phu-quoc",
    },
    {
      slug: "da-lat",
      keywords: ["da lat", "dalat", "thanh pho ngan hoa", "tuyen lam", "langbiang", "xuan huong", "suong mu"],
      tourSlug: "tour-da-lat-3n2d",
      storySlug: "kinh-nghiem-du-lich-da-lat-tu-tuc",
    },
    {
      slug: "ninh-binh",
      keywords: ["ninh binh", "ninhbinh", "trang an", "tam coc", "bich dong", "hang mua", "hoa lu", "bai dinh"],
      tourSlug: "tour-trang-an-hang-mua-1n",
      storySlug: "hanh-trinh-xuyen-viet",
    },
    {
      slug: "ha-giang",
      keywords: ["ha giang", "hagiang", "ma pi leng", "dong van", "nho que", "meo vac", "lung cu", "tam giac mach"],
      tourSlug: "tour-ha-giang-dong-van-3n2d",
      storySlug: "bi-quyet-san-may-ta-xua",
    },
    {
      slug: "hue",
      keywords: ["hue", "co do hue", "song huong", "thien mu", "dai noi", "lang tu duc", "lang khai dinh"],
      tourSlug: "tour-hue-di-san-2n1d",
      storySlug: "hanh-trinh-xuyen-viet",
    },
    {
      slug: "phong-nha",
      keywords: ["phong nha", "phongnha", "ke bang", "son doong", "hang en", "dong thien duong", "quang binh"],
    },
    {
      slug: "con-dao",
      keywords: ["con dao", "condao", "hang duong", "dam trau", "rua bien"],
    },
    {
      slug: "can-tho",
      keywords: ["can tho", "cantho", "cai rang", "cho noi", "ben tre", "bentre", "mien tay", "song nuoc", "me kong", "mekong", "miet vuon"],
      tourSlug: "tour-mekong-delta-floating-market",
      storySlug: "hanh-trinh-xuyen-viet",
    },
    {
      slug: "mui-ne",
      keywords: ["mui ne", "muine", "phan thiet", "phanthiet", "doi cat bay", "bau trang", "suoi tien", "poshanu"],
      tourSlug: "tour-mui-ne-phan-thiet-2n1d",
      storySlug: "cam-nang-du-lich-mui-ne-phan-thiet",
    },
    {
      slug: "ha-noi",
      keywords: [
        "ha noi",
        "hanoi",
        "hn",
        "thu do",
        "thang long",
        "ho guom",
        "pho co",
        "ho tay",
        "trang tien",
        "dong da",
        "ba dinh",
        "metropole",
        "capella",
      ],
      tourSlug: "tour-ha-long-cruise-2n1d",
      storySlug: "kham-pha-36-pho-phuong-ha-noi",
    },
    {
      slug: "nha-trang",
      keywords: ["nha trang", "nhatrang", "nt", "ninh van", "hon mun", "ponagar", "vinpearl", "bai dai"],
    },
    {
      slug: "ho-chi-minh",
      keywords: ["ho chi minh", "tp hcm", "tphcm", "sai gon", "saigon", "sg", "dinh doc lap", "ben thanh"],
      tourSlug: "tour-mekong-delta-floating-market",
    },
    {
      slug: "cao-bang",
      keywords: ["cao bang", "caobang", "cb", "ban gioc", "bangioc", "nguom ngao", "pac bo", "suoi le nin"],
    },
  ];

  // Match against canonical entities with direct, token and fuzzy criteria
  const matchedEntities = DESTINATION_ENTITIES.filter((entity) =>
    entity.keywords.some((kw) => {
      if (q.includes(kw) || kw.includes(q)) return true;
      const kwTokens = kw.split(/\s+/);
      const qTokens = q.split(/\s+/);
      if (qTokens.some((tok) => tok === kw || LOCATION_ABBREVIATIONS[tok] === kw)) return true;
      return qTokens.some((tok) => {
        if (tok.length < 4) return false;
        return levenshteinDistance(tok, kw) <= (kw.length >= 6 ? 2 : 1);
      });
    })
  );

  const matchedDests = matchedEntities
    .map((e) => findDest(e.slug))
    .filter(Boolean) as Destination[];

  const matchedTours = matchedEntities
    .map((e) => (e.tourSlug ? findTour(e.tourSlug) : undefined))
    .filter(Boolean) as TourItem[];

  const matchedStories = matchedEntities
    .map((e) => (e.storySlug ? findStory(e.storySlug) : undefined))
    .filter(Boolean) as StoryItem[];

  // Also check if user typed a specific tour title or story title keyword (>= 4 chars)
  if (matchedTours.length === 0 && q.length >= 4) {
    for (const t of VIETNAM_TOURS) {
      const titleNorm = normalizeText(t.title);
      const destNorm = normalizeText(t.destination);
      if (titleNorm.includes(q) || destNorm.includes(q)) {
        matchedTours.push(t);
      }
    }
  }

  if (matchedStories.length === 0 && q.length >= 4) {
    for (const s of VIETNAM_STORIES) {
      const titleNorm = normalizeText(s.title);
      if (titleNorm.includes(q)) {
        matchedStories.push(s);
      }
    }
  }

  // Cross-entity matching: find accommodations & restaurants matching destination slug or keywords
  const matchedSlugs = new Set(matchedEntities.map((e) => e.slug));
  const matchedAccs = VIETNAM_ACCOMMODATIONS.filter((acc) =>
    matchedSlugs.has(acc.destination_slug || "") ||
    matchedEntities.some((e) => e.keywords.some((kw) => normalizeText(acc.name).includes(kw) || normalizeText(acc.address).includes(kw)))
  );
  const matchedRess = VIETNAM_RESTAURANTS.filter((res) =>
    matchedSlugs.has(res.destination_slug || "") ||
    matchedEntities.some((e) => e.keywords.some((kw) => normalizeText(res.name).includes(kw) || normalizeText(res.address).includes(kw)))
  );

  const hasRelevantMatch =
    matchedTours.length > 0 ||
    matchedStories.length > 0 ||
    matchedDests.length > 0 ||
    matchedAccs.length > 0 ||
    matchedRess.length > 0;

  // Case A: Tìm thấy dữ liệu liên quan trong kho kiến thức -> Trả về link, tour, story, khách sạn, nhà hàng cụ thể
  if (hasRelevantMatch) {
    const finalTours = matchedTours.slice(0, 3).map((t) => mapTourToCard(t, isEn));
    const finalStories = matchedStories.slice(0, 2).map(mapStoryToCard);
    const finalDests = matchedDests.slice(0, 2).map((d) => mapDestinationToCard(d, isEn));

    const accCardsText = matchedAccs.slice(0, 2).map((a) => `[ACCOMMODATION_CARD: ${a.slug}]`).join(" ");
    const resCardsText = matchedRess.slice(0, 2).map((r) => `[RESTAURANT_CARD: ${r.slug}]`).join(" ");

    let textVi = "";
    let textEn = "";

    if (finalTours.length > 0) {
      textVi =
        "Dạ STAR Travels đã tra cứu trong kho kiến thức và tìm thấy các thông tin, hành trình phù hợp nhất với yêu cầu của Quý khách. Mời Quý khách xem trực tiếp qua các liên kết bên dưới:";
      textEn =
        "STAR Travels searched our knowledge base and found relevant itineraries and travel guides matching your inquiry. Feel free to explore the direct links below:";
      if (accCardsText) {
        textVi += `\n\n• **Gợi ý lưu trú 5 sao:**\n${accCardsText}`;
        textEn += `\n\n• **Featured 5-star Stays:**\n${accCardsText}`;
      }
      if (resCardsText) {
        textVi += `\n\n• **Gợi ý ẩm thực tinh tuyển:**\n${resCardsText}`;
        textEn += `\n\n• **Curated Gastronomy:**\n${resCardsText}`;
      }
    } else {
      // Cross-entity case: No packaged tours, but destination + hotels + restaurants exist (e.g. Hanoi)
      const destName = finalDests[0]?.name || "khu vực này";
      const destNameEn = finalDests[0]?.name || "this destination";
      textVi =
        `Dạ tại **${destName}**, STAR Travels tuyển chọn sẵn các tuyệt tác khách sạn di sản 5 sao, nhà hàng ẩm thực Michelin đỉnh cao và cẩm nang khám phá dành riêng cho Quý khách:\n\n` +
        (accCardsText ? `• **Khách Sạn & Resort Di Sản 5 Sao:**\n${accCardsText}\n\n` : "") +
        (resCardsText ? `• **Nhà Hàng & Ẩm Thực Tinh Hoa Michelin:**\n${resCardsText}\n\n` : "") +
        `Mời Quý khách xem trực tiếp thông tin thẻ đối tác bên dưới và khám phá các liên kết hữu ích nhé ạ!`;
      textEn =
        `In **${destNameEn}**, STAR Travels features curated 5-star heritage retreats, Michelin gastronomy, and bespoke concierge guides:\n\n` +
        (accCardsText ? `• **5-Star Heritage Stays:**\n${accCardsText}\n\n` : "") +
        (resCardsText ? `• **Michelin Gastronomy:**\n${resCardsText}\n\n` : "") +
        `Feel free to explore our curated partner cards and links below!`;
    }

    return {
      message: isEn ? textEn : textVi,
      recommended_tours: finalTours,
      recommended_stories: finalStories,
      recommended_destinations: finalDests,
      recommended_accommodations: matchedAccs.slice(0, 2),
      recommended_restaurants: matchedRess.slice(0, 2),
      contactRequired: false,
    };
  }

  // Case B: KHÔNG TÌM THẤY trong dataset -> Yêu cầu khách liên hệ qua Contact & Hotline
  const notFoundVi =
    "Dạ hiện tại trong kho kiến thức và danh mục tour của STAR Travels chưa có dữ liệu có sẵn phù hợp với điểm đến hoặc yêu cầu này.\n\n" +
    "Để được đội ngũ chuyên viên hỗ trợ tư vấn thiết kế lịch trình riêng theo yêu cầu cá nhân hóa hoặc giải đáp chi tiết, Quý khách vui lòng liên hệ trực tiếp với chúng em qua trang [Liên Hệ & Tư Vấn Riêng](/contact) hoặc gọi hotline **+84 (0) 24 3999 8888** (hỗ trợ 24/7) nhé ạ!";

  const notFoundEn =
    "Currently, our knowledge base and curated tour catalog do not have pre-packaged itineraries matching this specific request.\n\n" +
    "To request a customized private itinerary or speak directly with our concierge specialists, please reach out via our [Contact & Support Page](/contact) or call our 24/7 hotline at **+84 (0) 24 3999 8888**.";

  return {
    message: isEn ? notFoundEn : notFoundVi,
    recommended_tours: [],
    recommended_stories: [],
    recommended_destinations: [],
    contactRequired: true,
  };
}
