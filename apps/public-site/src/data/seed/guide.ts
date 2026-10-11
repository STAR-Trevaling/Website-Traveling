/**
 * STAR TRAVELS VIETNAM — TRAVEL INFO HUB (CẨM NANG THÔNG TIN DU LỊCH)
 * Structured seed data tailored for travel discovery, real-world practical advice,
 * and future RAG (Retrieval-Augmented Generation) knowledge indexing.
 */

export interface GuideCategoryHubItem {
  slug: string;
  href: string;
  title: string;
  titleEn: string;
  shortDesc: string;
  shortDescEn: string;
  iconName: string;
  badge: string;
  badgeEn: string;
  accentColor: string;
  itemCountLabel: string;
  itemCountLabelEn: string;
  featuredTopics: string[];
  featuredTopicsEn: string[];
}

export interface RegionWeatherOverview {
  region: "north" | "central" | "south";
  name: string;
  nameEn: string;
  climateType: string;
  climateTypeEn: string;
  summary: string;
  summaryEn: string;
  idealPeriod: string;
  idealPeriodEn: string;
  rainySeason: string;
  rainySeasonEn: string;
  highlights: string[];
  highlightsEn: string[];
}

export interface DestinationWeatherInfo {
  destinationSlug: string;
  destinationName: string;
  destinationNameEn: string;
  region: "north" | "central" | "south";
  idealMonths: number[];
  avoidMonths: number[];
  temperatureBySeason: {
    season: string;
    seasonEn: string;
    avgTempC: string;
    description: string;
    descriptionEn: string;
  }[];
  specialNotes: string[];
  specialNotesEn: string[];
}

export interface VisaExemptionGroup {
  durationDays: number;
  badge: string;
  badgeEn: string;
  description: string;
  descriptionEn: string;
  countries: {
    code: string;
    name: string;
    nameEn: string;
    flag: string;
  }[];
  notes?: string;
  notesEn?: string;
}

export interface EVisaPolicy {
  validityDays: number;
  entryTypes: {
    type: string;
    typeEn: string;
    feeUsd: number;
    description: string;
    descriptionEn: string;
  }[];
  processingTime: string;
  processingTimeEn: string;
  eligibleNationalities: string;
  eligibleNationalitiesEn: string;
  officialPortals: {
    name: string;
    url: string;
    note: string;
    noteEn: string;
  }[];
  steps: {
    step: number;
    title: string;
    titleEn: string;
    detail: string;
    detailEn: string;
  }[];
  requirements: {
    title: string;
    titleEn: string;
    detail: string;
    detailEn: string;
  }[];
}

export interface SpecialVisaExemption {
  zone: string;
  zoneEn: string;
  durationDays: number;
  conditions: string[];
  conditionsEn: string[];
}

export interface VisaGuideData {
  lastVerifiedDate: string;
  disclaimer: string;
  disclaimerEn: string;
  exemptions: VisaExemptionGroup[];
  evisa: EVisaPolicy;
  specialExemptions: SpecialVisaExemption[];
  faq: {
    question: string;
    questionEn: string;
    answer: string;
    answerEn: string;
  }[];
  officialSources: {
    title: string;
    url: string;
    agency: string;
  }[];
}

export interface TransportMode {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  speed: string;
  speedEn: string;
  costRange: string;
  costRangeEn: string;
  bestFor: string;
  bestForEn: string;
  pros: string[];
  prosEn: string[];
  cons: string[];
  consEn: string[];
  bookingTips: string[];
  bookingTipsEn: string[];
}

export interface DestinationTransportInfo {
  destinationSlug: string;
  destinationName: string;
  destinationNameEn: string;
  nearestHub: {
    type: "airport" | "train_station" | "bus_terminal";
    name: string;
    nameEn: string;
    distanceKm: number;
  };
  fromHubToCenter: {
    method: string;
    methodEn: string;
    duration: string;
    durationEn: string;
    estimatedCost: string;
    estimatedCostEn: string;
    instructions: string;
    instructionsEn: string;
  }[];
  intercityConnections: {
    toDestination: string;
    toDestinationEn: string;
    recommendedVehicle: string;
    recommendedVehicleEn: string;
    travelTime: string;
    travelTimeEn: string;
    costEstimate: string;
    costEstimateEn: string;
    notes: string;
    notesEn: string;
  }[];
}

export interface EmergencyContact {
  number: string;
  service: string;
  serviceEn: string;
  description: string;
  descriptionEn: string;
  badge: string;
}

export interface ActivitySafety {
  id: string;
  activityName: string;
  activityNameEn: string;
  icon: string;
  applicableDestinations: string[];
  rules: {
    rule: string;
    ruleEn: string;
    explanation: string;
    explanationEn: string;
  }[];
  essentialGear: string[];
  essentialGearEn: string[];
  emergencyAdvice: string;
  emergencyAdviceEn: string;
}

export interface InsuranceAdvisory {
  title: string;
  titleEn: string;
  recommendation: string;
  recommendationEn: string;
  keyCoverages: {
    item: string;
    itemEn: string;
    whyNeeded: string;
    whyNeededEn: string;
  }[];
  tips: string[];
  tipsEn: string[];
  disclaimer: string;
  disclaimerEn: string;
}

export interface EtiquetteCategory {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  rules: {
    do: string;
    doEn: string;
    dont: string;
    dontEn: string;
    context: string;
    contextEn: string;
  }[];
  practicalAdvice: string[];
  practicalAdviceEn: string[];
}

export interface CulturalTaboo {
  taboo: string;
  tabooEn: string;
  reason: string;
  reasonEn: string;
  howToRemedy: string;
  howToRemedyEn: string;
}

export interface CurrencyDenomination {
  value: number;
  formatted: string;
  color: string;
  material: "Polymer" | "Cotton/Paper";
  frontImageFeature: string;
  frontImageFeatureEn: string;
  backImageFeature: string;
  backImageFeatureEn: string;
  commonUsage: string;
  commonUsageEn: string;
  warning?: string;
  warningEn?: string;
}

export interface ExchangeLocation {
  type: string;
  typeEn: string;
  locations: string;
  locationsEn: string;
  exchangeRateRating: "best" | "moderate" | "fair";
  pros: string[];
  prosEn: string[];
  cons: string[];
  consEn: string[];
  tips: string[];
  tipsEn: string[];
}

export interface DailyBudgetTier {
  tier: "budget" | "standard" | "luxury";
  title: string;
  titleEn: string;
  rangeVnd: string;
  rangeUsd: string;
  breakdown: {
    food: string;
    foodEn: string;
    transport: string;
    transportEn: string;
    stay: string;
    stayEn: string;
    activities: string;
    activitiesEn: string;
  };
  recommendedFor: string;
  recommendedForEn: string;
}

export interface PaymentMethodGuide {
  method: string;
  methodEn: string;
  acceptanceLevel: "widely_accepted" | "moderate" | "cash_only";
  whereToUse: string[];
  whereToUseEn: string[];
  tips: string[];
  tipsEn: string[];
}

export interface FestivalItem {
  id: string;
  name: string;
  nameEn: string;
  lunarDate?: string;
  solarMonth: number;
  solarTimingDescription: string;
  solarTimingDescriptionEn: string;
  destinationSlug?: string;
  destinationName: string;
  destinationNameEn: string;
  locationDetail: string;
  locationDetailEn: string;
  culturalSignificance: string;
  culturalSignificanceEn: string;
  crowdLevel: "high" | "medium" | "low";
  practicalTips: string[];
  practicalTipsEn: string[];
  shouldExperience: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. HUB CATEGORIES OVERVIEW
// ─────────────────────────────────────────────────────────────────────────────

export const GUIDE_CATEGORIES: GuideCategoryHubItem[] = [
  {
    slug: "weather",
    href: "/guide/weather",
    title: "Thời Tiết & Mùa Du Lịch",
    titleEn: "Weather & Travel Seasons",
    shortDesc: "Đặc trưng khí hậu 3 miền Bắc - Trung - Nam và thời điểm vàng khám phá 12 danh thắng hàng đầu.",
    shortDescEn: "Detailed seasonal climate patterns across 3 regions and ideal visiting months for 12 destinations.",
    iconName: "CloudSun",
    badge: "12 Điểm Đến",
    badgeEn: "12 Destinations",
    accentColor: "from-sky-500 to-blue-600",
    itemCountLabel: "3 Miền · 12 Điểm Đến",
    itemCountLabelEn: "3 Regions · 12 Destinations",
    featuredTopics: ["Khí hậu 3 miền", "Nhiệt độ theo mùa", "Tháng nên tránh", "Cảnh báo bão & lụt"],
    featuredTopicsEn: ["3 regional climates", "Seasonal temperatures", "Months to avoid", "Typhoon alerts"],
  },
  {
    slug: "visa",
    href: "/guide/visa",
    title: "Thị Thực & Nhập Cảnh",
    titleEn: "Visa & Entry Regulations",
    shortDesc: "Chính sách miễn thị thực 45 ngày cập nhật 2026, quy trình cấp e-visa 90 ngày và cổng khai báo chính thức.",
    shortDescEn: "Current 45-day visa exemption rules, 90-day e-visa application steps, and official immigration portals.",
    iconName: "FileCheck",
    badge: "Cập nhật 2026",
    badgeEn: "Updated 2026",
    accentColor: "from-emerald-500 to-teal-600",
    itemCountLabel: "25+ Nước Miễn Phí · E-Visa 90 Ngày",
    itemCountLabelEn: "25+ Exempt Nations · 90-Day E-Visa",
    featuredTopics: ["Miễn visa 45 ngày", "E-visa 90 ngày $25-$50", "Đặc khu Phú Quốc 30 ngày", "Cổng dịch vụ công"],
    featuredTopicsEn: ["45-day exemption", "90-day e-visa ($25-$50)", "Phu Quoc 30-day zone", "Official portals"],
  },
  {
    slug: "transport",
    href: "/guide/transport",
    title: "Di Chuyển Nội Địa",
    titleEn: "Domestic Transportation",
    shortDesc: "So sánh máy bay, tàu hoả, xe limousine và hướng dẫn chi tiết từ sân bay vào trung tâm từng điểm đến.",
    shortDescEn: "Comparison of flights, trains, sleeper buses, limousine vans, and airport-to-center transfers.",
    iconName: "Plane",
    badge: "Chi Phí & Thời Gian",
    badgeEn: "Costs & Travel Times",
    accentColor: "from-amber-500 to-orange-600",
    itemCountLabel: "4 Phương Tiện · 12 Tuyến Trung Tâm",
    itemCountLabelEn: "4 Transit Modes · 12 Hub Routes",
    featuredTopics: ["Máy bay & Tàu SE", "Xe Limousine VIP", "Từ sân bay vào phố", "Ứng dụng gọi xe công nghệ"],
    featuredTopicsEn: ["Flights & SE Trains", "VIP Limousines", "Airport transfers", "Ride-hailing apps"],
  },
  {
    slug: "safety",
    href: "/guide/safety",
    title: "An Toàn & Sức Khoẻ",
    titleEn: "Safety & Health Guidelines",
    shortDesc: "Đường dây nóng khẩn cấp 113, 114, 115, nguyên tắc an toàn biển/leo núi/lái xe máy và tư vấn bảo hiểm du lịch.",
    shortDescEn: "National emergency hotlines 113/114/115, activity safety guidelines (sea, trekking, motorbiking), and insurance advice.",
    iconName: "ShieldAlert",
    badge: "Hotline SOS",
    badgeEn: "SOS Hotlines",
    accentColor: "from-rose-500 to-red-600",
    itemCountLabel: "5 Số Khẩn Cấp · 3 Hoạt Động Mạo Hiểm",
    itemCountLabelEn: "5 SOS Contacts · 3 Adventure Sports",
    featuredTopics: ["SOS 113-114-115", "Tắm biển & dòng rip", "Trekking Fansipan", "Lái xe máy đèo dốc"],
    featuredTopicsEn: ["SOS 113-114-115", "Sea safety & rip currents", "Trekking preparation", "Motorbike safety"],
  },
  {
    slug: "culture",
    href: "/guide/culture",
    title: "Văn Hoá & Phép Tắc",
    titleEn: "Culture & Etiquette",
    shortDesc: "Quy chuẩn trang phục đền chùa, văn hoá giao tiếp, nghệ thuật mặc cả thân thiện, tiền tip và điều kiêng kỵ.",
    shortDescEn: "Temple dress codes, polite social communication, bargaining etiquette, tipping norms, and cultural taboos.",
    iconName: "HeartHandshake",
    badge: "Ứng Xử Bản Địa",
    badgeEn: "Local Etiquette",
    accentColor: "from-purple-500 to-indigo-600",
    itemCountLabel: "5 Chủ Đề · Những Điều Kiêng Kỵ",
    itemCountLabelEn: "5 Core Themes · Taboos to Avoid",
    featuredTopics: ["Trang phục chùa chiền", "Mặc cả văn minh", "Tiền tip tại VN", "Điều cấm kỵ nên tránh"],
    featuredTopicsEn: ["Temple attire", "Friendly bargaining", "Tipping expectations", "Local customs & taboos"],
  },
  {
    slug: "currency",
    href: "/guide/currency",
    title: "Tiền Tệ & Chi Phí",
    titleEn: "Currency & Travel Costs",
    shortDesc: "Mệnh giá tiền polymer VNĐ, địa chỉ đổi tiền uy tín, bảng ước tính chi phí sinh hoạt/ngày và lưu ý thanh toán thẻ/QR.",
    shortDescEn: "VND polymer notes, trusted money exchangers, estimated daily spending tiers, and card/VietQR payment advice.",
    iconName: "Coins",
    badge: "Ước Tính Ngân Sách",
    badgeEn: "Budget Estimator",
    accentColor: "from-emerald-600 to-green-700",
    itemCountLabel: "6 Mệnh Giá · 3 Mức Chi Tiêu",
    itemCountLabelEn: "6 Banknotes · 3 Spending Tiers",
    featuredTopics: ["Nhận biết tiền polymer", "Đổi tiền ngân hàng & tiệm vàng", "Chi phí 3 mức/ngày", "Thanh toán VietQR"],
    featuredTopicsEn: ["Polymer note guide", "Banks vs gold shops", "3 daily budget tiers", "VietQR cashless tips"],
  },
  {
    slug: "festivals",
    href: "/guide/festivals",
    title: "Lễ Hội & Sự Kiện Theo Mùa",
    titleEn: "Festivals & Seasonal Events",
    shortDesc: "Lịch 12 tháng lễ hội truyền thống, sự kiện văn hóa quốc tế, đánh giá mật độ đông đúc và kinh nghiệm tham gia.",
    shortDescEn: "12-month calendar of cultural traditions, international spectacles, crowd ratings, and practical travel tips.",
    iconName: "Calendar",
    badge: "12 Tháng Lễ Hội",
    badgeEn: "12-Month Calendar",
    accentColor: "from-pink-500 to-rose-600",
    itemCountLabel: "12 Tháng · Sự Kiện Tiêu Biểu",
    itemCountLabelEn: "12 Months · Iconic Events",
    featuredTopics: ["Tết Nguyên Đán", "Pháo hoa DIFF Đà Nẵng", "Festival Huế", "Mùa vàng & Tam giác mạch"],
    featuredTopicsEn: ["Tet Lunar New Year", "Da Nang DIFF Fireworks", "Hue Imperial Festival", "Golden harvest seasons"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. WEATHER GUIDE SEED DATA
// ─────────────────────────────────────────────────────────────────────────────

export const REGIONS_WEATHER_OVERVIEW: RegionWeatherOverview[] = [
  {
    region: "north",
    name: "Miền Bắc (Bắc Bộ)",
    nameEn: "Northern Vietnam",
    climateType: "Cận nhiệt đới ẩm, 4 mùa rõ rệt (Xuân - Hạ - Thu - Đông)",
    climateTypeEn: "Humid subtropical with 4 distinct seasons (Spring, Summer, Autumn, Winter)",
    summary: "Miền Bắc trải qua mùa đông se lạnh có sương muối vùng núi (tháng 12 - 2), mùa xuân mưa phùn nồm ẩm (tháng 2 - 4), mùa hè nóng ẩm mưa rào (tháng 5 - 8), và mùa thu hanh vàng dịu mát tuyệt đẹp (tháng 9 - 11).",
    summaryEn: "Northern Vietnam experiences cool winters with highland frost (Dec-Feb), misty spring drizzle (Feb-Apr), hot humid summers with rains (May-Aug), and pleasant golden autumn days (Sep-Nov).",
    idealPeriod: "Tháng 9 đến tháng 11 (Mùa thu) & Tháng 3 đến tháng 4 (Mùa xuân)",
    idealPeriodEn: "September to November (Autumn) & March to April (Spring)",
    rainySeason: "Tháng 6 đến tháng 8 (Mưa rào lớn, dông nhiệt, nguy cơ bão biển)",
    rainySeasonEn: "June to August (Heavy downpours, thunderstorms, occasional typhoons)",
    highlights: [
      "Mùa thu Hà Nội và vịnh Hạ Long có bầu trời trong xanh nhất năm.",
      "Vùng núi Sa Pa, Hà Giang có mùa lúa chín tháng 9 và hoa tam giác mạch tháng 10-11.",
      "Đỉnh Fansipan có thể có băng tuyết khi nhiệt độ xuống dưới 0°C vào tháng 12-1.",
    ],
    highlightsEn: [
      "Autumn brings crisp blue skies to Hanoi and Ha Long Bay.",
      "Highlands feature golden rice terraces in September and buckwheat blooms in Oct-Nov.",
      "Fansipan summit can witness frost or snow when temperatures drop below freezing in Dec-Jan.",
    ],
  },
  {
    region: "central",
    name: "Miền Trung (Trung Bộ)",
    nameEn: "Central Vietnam",
    climateType: "Nhiệt đới gió mùa chuyển tiếp, mùa khô nắng gắt và mùa mưa lũ dồn dập",
    climateTypeEn: "Tropical monsoon transition: hot dry summer and intense late-year rainy season",
    summary: "Dải đất miền Trung chịu ảnh hưởng của dãy Trường Sơn. Mùa khô kéo dài từ tháng 1 đến tháng 8 với nắng nhiều và biển êm; Mùa mưa tập trung từ tháng 9 đến tháng 11 với nguy cơ bão nhiệt đới và ngập lụt ven sông.",
    summaryEn: "Shielded by the Truong Son range, Central Vietnam has a prolonged dry beach season from Jan to Aug, followed by a heavy monsoon with typhoon and flood risks from Sep to Nov.",
    idealPeriod: "Tháng 2 đến tháng 7 (Nắng đẹp, biển xanh, không mưa bão)",
    idealPeriodEn: "February to July (Sunny, turquoise calm waters, minimal rainfall)",
    rainySeason: "Tháng 9 đến tháng 11 (Mùa mưa dầm, bão biển Đông, lũ lụt Hội An & Huế)",
    rainySeasonEn: "September to November (Persistent rain, typhoons, flooding in Hoi An & Hue)",
    highlights: [
      "Bãi biển Đà Nẵng, Nha Trang, Quy Nhơn đạt độ trong xanh tuyệt đỉnh từ tháng 3 đến tháng 7.",
      "Phố cổ Hội An hay bị ngập nước sông Hoài vào tháng 10-11 do triều cường kết hợp xả lũ.",
      "Cố đô Huế có nét trầm mặc đặc trưng trong những ngày mưa dầm mùa đông.",
    ],
    highlightsEn: [
      "Beaches in Da Nang, Nha Trang, and Quy Nhon are pristine from March to July.",
      "Hoi An Ancient Town frequently experiences river overflow in October and November.",
      "Hue Imperial City exudes a poetic melancholic charm during seasonal winter rains.",
    ],
  },
  {
    region: "south",
    name: "Miền Nam (Nam Bộ & Nam Trung Bộ)",
    nameEn: "Southern Vietnam",
    climateType: "Nhiệt đới xavan, ấm áp quanh năm, 2 mùa Mưa và Khô",
    climateTypeEn: "Tropical savanna, perpetually warm year-round, distinct Dry and Wet seasons",
    summary: "Miền Nam có nền nhiệt độ cao ổn định (27-33°C quanh năm). Mùa khô kéo dài từ tháng 11 đến tháng 4 năm sau với bầu trời trong vắt; Mùa mưa từ tháng 5 đến tháng 10 với những cơn mưa rào buổi chiều tạnh nhanh.",
    summaryEn: "Southern Vietnam maintains warm temperatures year-round (27-33°C). The dry season runs from November to April with clear skies; the wet season spans May to October with brief afternoon showers.",
    idealPeriod: "Tháng 11 đến tháng 4 năm sau (Mùa khô rực rỡ, biển lặng)",
    idealPeriodEn: "November to April (Lush dry season, sunshine, calm seas)",
    rainySeason: "Tháng 5 đến tháng 10 (Mưa rào nhiệt đới ngắn, trời nhanh tạnh)",
    rainySeasonEn: "May to October (Short tropical downpours, quickly returning to sunshine)",
    highlights: [
      "Đảo ngọc Phú Quốc biển êm ả như mặt gương từ tháng 11 đến tháng 4.",
      "Đà Lạt (Tây Nguyên) duy trì khí hậu ôn đới se lạnh 15-24°C quanh năm giữa rừng thông.",
      "Mũi Né là vùng bán khô hạn ít mưa nhất cả nước, thích hợp du lịch hầu như quanh năm.",
    ],
    highlightsEn: [
      "Phu Quoc island enjoys mirror-calm turquoise waters from November through April.",
      "Da Lat highlands enjoy perpetual spring-like chill (15-24°C) amidst fragrant pine hills.",
      "Mui Ne has a semi-arid microclimate with minimal rainfall, ideal almost all year.",
    ],
  },
];

export const DESTINATIONS_WEATHER_DATA: DestinationWeatherInfo[] = [
  {
    destinationSlug: "ha-long",
    destinationName: "Vịnh Hạ Long",
    destinationNameEn: "Ha Long Bay",
    region: "north",
    idealMonths: [3, 4, 9, 10, 11],
    avoidMonths: [7, 8],
    temperatureBySeason: [
      { season: "Mùa Xuân (T3 - T4)", seasonEn: "Spring (Mar-Apr)", avgTempC: "19°C - 24°C", description: "Thời tiết ấm dần, sương mù huyền ảo buổi sáng, lý tưởng ngắm vịnh.", descriptionEn: "Mild warmth with poetic morning mist drifting among karst islets." },
      { season: "Mùa Hè (T5 - T8)", seasonEn: "Summer (May-Aug)", avgTempC: "29°C - 35°C", description: "Nắng rực rỡ, nước biển xanh, thích hợp bơi lội nhưng có nguy cơ bão T7-T8.", descriptionEn: "Radiant sunshine, emerald swimming waters; storm alerts possible in Jul-Aug." },
      { season: "Mùa Thu (T9 - T11)", seasonEn: "Autumn (Sep-Nov)", avgTempC: "21°C - 27°C", description: "Mùa vàng đẹp nhất năm: trời trong, nắng dịu, gió êm, ngủ đêm du thuyền hoàn hảo.", descriptionEn: "The undisputed golden season: clear blue skies, crisp breeze, perfect overnight cruises." },
      { season: "Mùa Đông (T12 - T2)", seasonEn: "Winter (Dec-Feb)", avgTempC: "13°C - 18°C", description: "Trời se lạnh, nhiều sương mờ tĩnh mịch, cần mang áo khoác ấm.", descriptionEn: "Cool and atmospheric with dramatic brooding limestone silhouettes." },
    ],
    specialNotes: [
      "Tháng 7 và tháng 8 thường có các đợt áp thấp nhiệt đới hoặc bão biển khiến Cảng vụ cấm tàu xuất bến trong 24-48 giờ.",
      "Tháng 10 và tháng 11 là thời điểm biển êm nhất, tỷ lệ hủy chuyến bằng 0, độ ẩm dễ chịu.",
      "Vào mùa đông (tháng 12 - 2), nhiệt độ ban đêm trên vịnh có thể giảm xuống dưới 12°C, cần áo ấm chống gió.",
    ],
    specialNotesEn: [
      "July and August occasionally bring tropical depressions or typhoons, triggering temporary port closures.",
      "October and November offer the calmest seas and virtually zero cruise cancellations.",
      "Winter nights on bay waters can dip below 12°C; bring windproof thermal clothing.",
    ],
  },
  {
    destinationSlug: "hoi-an",
    destinationName: "Phố cổ Hội An",
    destinationNameEn: "Hoi An Ancient Town",
    region: "central",
    idealMonths: [2, 3, 4, 5, 6, 7],
    avoidMonths: [10, 11],
    temperatureBySeason: [
      { season: "Mùa Khô Mát (T2 - T4)", seasonEn: "Cool Dry Season (Feb-Apr)", avgTempC: "22°C - 28°C", description: "Thời tiết hoàn hảo, nắng vàng dịu, hoa giấy nở rực rỡ khắp mái ngói cổ.", descriptionEn: "Perfect walking climate with gentle sunlight and vibrant bougainvillea blooms." },
      { season: "Mùa Hè Biển (T5 - T8)", seasonEn: "Summer Beach Season (May-Aug)", avgTempC: "28°C - 35°C", description: "Nắng nhiều, thích hợp kết hợp tắm biển An Bàng và tham quan Cù Lao Chàm.", descriptionEn: "Hot sunny days, ideal for An Bang Beach and Cham Islands snorkeling excursions." },
      { season: "Mùa Mưa Lũ (T9 - T11)", seasonEn: "Rainy & Flood Season (Sep-Nov)", avgTempC: "23°C - 27°C", description: "Mưa lớn kéo dài, sông Hoài thường dâng cao gây ngập các tuyến phố sát sông.", descriptionEn: "Intense rainfall; the Hoai River regularly overflows onto waterfront streets." },
      { season: "Mùa Đông Se Lạnh (T12 - T1)", seasonEn: "Cool Winter (Dec-Jan)", avgTempC: "19°C - 23°C", description: "Trời mát lạnh nhẹ, thi thoảng có mưa phùn, không khí lễ hội Tết rộn ràng.", descriptionEn: "Crisp and atmospheric with occasional drizzle and lively lantern festival preparations." },
    ],
    specialNotes: [
      "Tháng 10 và tháng 11 thường xuyên có triều cường và xả lũ thủy điện; phố Bạch Đằng và Nguyễn Thái Học có thể phải đi lại bằng thuyền nan.",
      "Đêm rằm âm lịch hàng tháng (Lễ hội đèn lồng) phố cổ tắt đèn điện, lung linh ánh sáng truyền thống.",
      "Tháng 3 đến tháng 5 là thời điểm lý tưởng nhất để đạp xe dạo quanh làng rau Trà Quế và đồng lúa Cẩm Châu.",
    ],
    specialNotesEn: [
      "October and November frequently bring river flooding; wooden rowboats replace walking along Bach Dang Street.",
      "Full moon nights feature the iconic Lantern Festival with streetlights extinguished.",
      "March to May is the premier window for leisurely cycling through Tra Que vegetable gardens and paddy fields.",
    ],
  },
  {
    destinationSlug: "phu-quoc",
    destinationName: "Đảo Ngọc Phú Quốc",
    destinationNameEn: "Phu Quoc Pearl Island",
    region: "south",
    idealMonths: [11, 12, 1, 2, 3, 4],
    avoidMonths: [7, 8, 9],
    temperatureBySeason: [
      { season: "Mùa Khô Vàng (T11 - T4)", seasonEn: "Dry Season (Nov-Apr)", avgTempC: "26°C - 31°C", description: "Thiên đường biển đảo: biển lặng như tờ, nước trong vắt, hoàng hôn tuyệt mỹ.", descriptionEn: "Pure island bliss: mirror-like turquoise sea, powdery sand, and legendary sunsets." },
      { season: "Chuyển Mùa (T5 & T10)", seasonEn: "Transition Months (May & Oct)", avgTempC: "27°C - 32°C", description: "Nắng xen lẫn mưa rào ngắn, biển bờ Đông êm, lượng khách vừa phải.", descriptionEn: "Pleasant blend of sunny hours and short showers; East coast beaches remain calm." },
      { season: "Mùa Mưa Gió Tây Nam (T6 - T9)", seasonEn: "Southwest Monsoon (Jun-Sep)", avgTempC: "25°C - 29°C", description: "Mưa nhiều và sóng to ở bờ Tây (Bãi Trường, Bãi Dài), tàu cano lặn biển hạn chế.", descriptionEn: "Frequent showers and choppy seas along the western coastline; boat tours restricted." },
    ],
    specialNotes: [
      "Vào mùa gió Tây Nam (tháng 7-9), biển bờ Tây có sóng lớn; du khách nên di chuyển sang các bãi biển bờ Đông như Bãi Sao, Bãi Khem nơi sóng vẫn êm đềm.",
      "Mùa ngắm sao biển tại Rạch Vẹm đẹp nhất từ tháng 12 đến tháng 4.",
      "Du khách quốc tế được miễn thị thực 30 ngày khi bay thẳng hoặc quá cảnh nội địa đến Phú Quốc.",
    ],
    specialNotesEn: [
      "During summer monsoon (Jul-Sep), switch from west coast to east coast sanctuaries (Bai Sao, Bai Khem) for calm waters.",
      "Starfish spotting at Rach Vem floating village is best from December through April.",
      "International visitors enjoy a 30-day visa exemption when visiting Phu Quoc exclusively.",
    ],
  },
  {
    destinationSlug: "sa-pa",
    destinationName: "Sa Pa & Fansipan",
    destinationNameEn: "Sa Pa & Fansipan",
    region: "north",
    idealMonths: [3, 4, 5, 9, 10],
    avoidMonths: [7, 8],
    temperatureBySeason: [
      { season: "Mùa Hoa Mùa Xuân (T3 - T5)", seasonEn: "Spring Blossoms (Mar-May)", avgTempC: "14°C - 22°C", description: "Hoa mận, hoa lê nở trắng sườn núi, thời tiết ấm áp, mây bồng bềnh.", descriptionEn: "Plum and peach blossoms carpet alpine slopes; clear hiking weather with sweeping valleys." },
      { season: "Mùa Hè & Nước Đổ (T6 - T8)", seasonEn: "Summer & Flooding Terraces (Jun-Aug)", avgTempC: "18°C - 26°C", description: "Nhiệt độ mát mẻ trốn nóng đồng bằng, ruộng lúa loang loáng nước, mưa dông T7-T8.", descriptionEn: "Refreshing escape from lowland heat; mirrored rice terraces, but heavy rains in Jul-Aug." },
      { season: "Mùa Vàng Lúa Chín (T9 - T10)", seasonEn: "Golden Harvest (Sep-Oct)", avgTempC: "13°C - 20°C", description: "Ruộng bậc thang Mường Hoa nhuộm vàng óng ả, thời tiết thu trong lành nhất năm.", descriptionEn: "Muong Hoa valley turns vibrant golden amber; peak photography season." },
      { season: "Mùa Băng Tuyết & Săn Mây (T11 - T2)", seasonEn: "Winter Frost & Cloud Hunting (Nov-Feb)", avgTempC: "2°C - 11°C", description: "Rét đậm, biển mây dày đặc trên đèo Ô Quy Hồ, có cơ hội ngắm băng tuyết Fansipan.", descriptionEn: "Crisp highland frost, spectacular cloud seas over O Quy Ho pass, snow possible at Fansipan." },
    ],
    specialNotes: [
      "Tháng 12 đến tháng 1 đỉnh Fansipan (3.143m) thường có nhiệt độ dưới 0°C, xuất hiện băng giá và tuyết rơi.",
      "Tháng 7-8 có nguy cơ sạt lở đất trên tuyến quốc lộ 4D từ Lào Cai lên Sa Pa, cần theo dõi dự báo giao thông.",
      "Biên độ nhiệt ngày đêm tại Sa Pa chênh lệch từ 8-12°C; luôn mang theo áo ấm dù đi vào mùa hè.",
    ],
    specialNotesEn: [
      "December and January on Mount Fansipan (3,143m) can plummet below 0°C with frost and occasional snow.",
      "Heavy July-August rains increase landslide risks on mountain passes; monitor road advisories.",
      "Diurnal temperature swings exceed 10°C; pack thermal layers regardless of travel month.",
    ],
  },
  {
    destinationSlug: "da-lat",
    destinationName: "Đà Lạt — Ngàn Hoa",
    destinationNameEn: "Da Lat — Eternal Spring",
    region: "south",
    idealMonths: [11, 12, 1, 2, 3, 4],
    avoidMonths: [7, 8, 9],
    temperatureBySeason: [
      { season: "Mùa Khô Lạnh Lãng Mạn (T11 - T2)", seasonEn: "Cool Romance (Nov-Feb)", avgTempC: "11°C - 22°C", description: "Mùa hoa dã quỳ, đồi cỏ hồng, mai anh đào rực rỡ, đêm lạnh 11-13°C.", descriptionEn: "Wild sunflowers, pink grass hills, cherry blossoms, and crisp 12°C pine evenings." },
      { season: "Mùa Nắng Mát (T3 - T5)", seasonEn: "Sunny Spring (Mar-May)", avgTempC: "15°C - 25°C", description: "Trời trong, hoa phượng tím nở rộ, thời tiết ấm áp dễ chịu nhất trong năm.", descriptionEn: "Purple jacarandas in bloom, clear skies, and ideal weather for trekking and cafe-hopping." },
      { season: "Mùa Mưa Dầm Rả Rích (T6 - T10)", seasonEn: "Monsoon Mist (Jun-Oct)", avgTempC: "14°C - 21°C", description: "Mưa chiều kéo dài, sương mù dày, hồ Tuyền Lâm bảng lảng khói sương thơ mộng.", descriptionEn: "Frequent afternoon showers and moody pine mist; quintessential cozy fireside vibe." },
    ],
    specialNotes: [
      "Nhiệt độ ban đêm Đà Lạt quanh năm xuống 12-16°C; áo len hoặc áo khoác nhẹ là vật dụng bắt buộc.",
      "Tháng 11 là mùa hoa Dã Quỳ nở vàng rực các cung đường đèo Ngoạn Mục và Tà Nung.",
      "Tháng 12 mùa hoa Mai Anh Đào nở hồng quanh bờ hồ Xuân Hương và đường Trần Hưng Đạo.",
    ],
    specialNotesEn: [
      "Night temperatures consistently drop to 12-16°C year-round; light jackets or sweaters are essential.",
      "November carpets mountain passes with fiery yellow wild sunflowers.",
      "Late December brings pink cherry blossoms ringing Xuan Huong Lake.",
    ],
  },
  {
    destinationSlug: "ninh-binh",
    destinationName: "Quần thể Tràng An",
    destinationNameEn: "Trang An Landscape Complex",
    region: "north",
    idealMonths: [1, 2, 3, 5, 6],
    avoidMonths: [8, 9],
    temperatureBySeason: [
      { season: "Mùa Lễ Hội Đầu Năm (T1 - T3)", seasonEn: "Spring Festival (Jan-Mar)", avgTempC: "18°C - 23°C", description: "Khí hậu mát mẻ, du xuân trẩy hội Bái Đính và Tràng An linh thiêng.", descriptionEn: "Mild festive season; pilgrimage tours to Bai Dinh Pagoda and Trang An waterways." },
      { season: "Mùa Lúa Vàng Tam Cốc (T5 - T6)", seasonEn: "Golden River Harvest (May-Jun)", avgTempC: "27°C - 34°C", description: "Hai bên bờ sông Ngô Đồng ngập tràn sắc vàng của đồng lúa chín rực rỡ.", descriptionEn: "The Ngo Dong River flows through breathtaking golden carpets of ripe paddies." },
      { season: "Mùa Mưa & Ngập Nước (T7 - T9)", seasonEn: "Summer Rain & Flooding (Jul-Sep)", avgTempC: "28°C - 35°C", description: "Nắng gắt xen lẫn dông nhiệt; mực nước hang động dâng cao khi mưa lớn.", descriptionEn: "Hot days with occasional thunderstorms; cave clearance can be limited during flood crests." },
      { season: "Mùa Thu Dịu Êm (T10 - T11)", seasonEn: "Gentle Autumn (Oct-Nov)", avgTempC: "21°C - 26°C", description: "Trời thu trong vắt, hoa lau nở trắng các thung lũng đá vôi huyền ảo.", descriptionEn: "Serene crisp days with white reed blossoms swaying against ancient limestone karsts." },
    ],
    specialNotes: [
      "Tháng 5 đến đầu tháng 6 là thời điểm vàng ngắm mùa lúa Tam Cốc trên thuyền nan.",
      "Tháng Giêng và tháng Hai âm lịch lượng khách hành hương rất đông đúc; nên đi sáng sớm trước 7h30.",
      "Vào mùa hè cần mang ô che nắng và nón lá vì hành trình ngồi thuyền kéo dài 2.5 - 3 tiếng trên sông.",
    ],
    specialNotesEn: [
      "Late May to early June is the premier golden rice window along Tam Coc riverbanks.",
      "Lunar New Year months (Feb-Mar) see heavy pilgrimage crowds; board sampans before 7:30 AM.",
      "Bring sunhats and umbrellas for the 2.5 to 3-hour open-air boat rides in summer.",
    ],
  },
  {
    destinationSlug: "hue",
    destinationName: "Cố đô Huế",
    destinationNameEn: "Hue Imperial City",
    region: "central",
    idealMonths: [1, 2, 3, 4],
    avoidMonths: [10, 11, 12],
    temperatureBySeason: [
      { season: "Mùa Xuân Kinh Kỳ (T1 - T4)", seasonEn: "Imperial Spring (Jan-Apr)", avgTempC: "20°C - 27°C", description: "Tiết trời dịu mát, nắng êm, hoa sen bắt đầu nở, lý tưởng khám phá lăng tẩm.", descriptionEn: "Mild and gentle weather; lotus ponds begin to bloom, ideal for visiting royal tombs." },
      { season: "Mùa Nắng Nóng Cung Đình (T5 - T8)", seasonEn: "Hot Summer (May-Aug)", avgTempC: "29°C - 37°C", description: "Nắng gắt gió Lào, thích hợp kết hợp tắm biển Lăng Cô hoặc Thuận An.", descriptionEn: "Intense dry heat; best paired with beach days at Lang Co Bay or Thuan An." },
      { season: "Mùa Mưa Dầm Xứ Huế (T9 - T12)", seasonEn: "Persistent Winter Rains (Sep-Dec)", avgTempC: "18°C - 24°C", description: "Mưa dầm rả rích kéo dài nhiều ngày, nước sông Hương dâng cao, trời se lạnh.", descriptionEn: "Famous prolonged rains with overcast skies; river waters rise and days turn chilly." },
    ],
    specialNotes: [
      "Tháng 10 đến tháng 12 là mùa mưa lớn nhất trong năm tại Huế, cần chuẩn bị áo mưa chuyên dụng và giày chống nước.",
      "Tháng 4 định kỳ là mùa Festival Huế với các đại lễ cung đình, nhã nhạc và biểu diễn nghệ thuật quốc tế.",
      "Nên tham quan Đại Nội vào buổi sáng sớm (7h30 - 10h00) hoặc xế chiều để tránh nắng gắt mùa hè.",
    ],
    specialNotesEn: [
      "October to December brings Hue's relentless monsoon; high-grade rain gear is mandatory.",
      "April frequently hosts the biennial Hue Festival featuring grand imperial reenactments.",
      "Explore the Imperial Citadel early in the morning or late afternoon to avoid midday summer heat.",
    ],
  },
  {
    destinationSlug: "ha-giang",
    destinationName: "Hà Giang & Mã Pí Lèng",
    destinationNameEn: "Ha Giang & Ma Pi Leng",
    region: "north",
    idealMonths: [9, 10, 11, 12],
    avoidMonths: [6, 7, 8],
    temperatureBySeason: [
      { season: "Mùa Hoa Mận & Lễ Hội (T1 - T3)", seasonEn: "Highland Spring Festivals (Jan-Mar)", avgTempC: "12°C - 19°C", description: "Hoa cải vàng, hoa đào, hoa mận nở rộ trên cao nguyên đá Đồng Văn.", descriptionEn: "Golden mustard, peach, and plum blossoms drape across the Dong Van Karst Plateau." },
      { season: "Mùa Nước Đổ (T4 - T5)", seasonEn: "Mirror Terraces (Apr-May)", avgTempC: "18°C - 26°C", description: "Đồng bào dẫn nước về ruộng bậc thang Hoàng Su Phì óng ánh như gương soi.", descriptionEn: "Water pours into stepped terraces creating breathtaking cascades of mirror reflections." },
      { season: "Mùa Mưa Lũ Đèo Dốc (T6 - T8)", seasonEn: "Monsoon & Landslide Risk (Jun-Aug)", avgTempC: "22°C - 29°C", description: "Mưa rào lớn, nguy cơ sạt lở đá trên các cung đường đèo hiểm trở.", descriptionEn: "Heavy rainfall increases landslide dangers along hairpin mountain passes." },
      { season: "Mùa Hoa Tam Giác Mạch (T9 - T12)", seasonEn: "Buckwheat Bloom Season (Sep-Dec)", avgTempC: "10°C - 20°C", description: "Mùa lúa chín tháng 9 nối tiếp hoa tam giác mạch hồng tím phủ khắp sườn đá.", descriptionEn: "Golden harvest gives way to sea of pink buckwheat blossoms against dark karst ridges." },
    ],
    specialNotes: [
      "Cần tránh đi xe máy cung Hà Giang Loop vào tháng 7-8 do mưa lớn có thể làm sạt trượt đất đá đèo Mã Pí Lèng.",
      "Tháng 10 và tháng 11 là mùa hoa Tam Giác Mạch đẹp nhất, các homestay tại Đồng Văn và Mèo Vạc thường kín phòng từ sớm.",
      "Hẻm vực Tu Sản trên sông Nho Quế có làn nước xanh ngọc bích đẹp nhất vào mùa khô từ tháng 10 đến tháng 4.",
    ],
    specialNotesEn: [
      "Avoid motorbiking the Ha Giang Loop during peak summer rains (Jul-Aug) due to rockslide hazards.",
      "October and November represent the peak buckwheat season; book homestays well in advance.",
      "Tu San Canyon on the Nho Que River exhibits its most radiant turquoise clarity from October to April.",
    ],
  },
  {
    destinationSlug: "da-nang",
    destinationName: "Đà Nẵng — Đáng Sống",
    destinationNameEn: "Da Nang Coastal City",
    region: "central",
    idealMonths: [2, 3, 4, 5, 6, 7, 8],
    avoidMonths: [10, 11],
    temperatureBySeason: [
      { season: "Mùa Khô Nắng Đẹp (T2 - T5)", seasonEn: "Prime Dry Season (Feb-May)", avgTempC: "23°C - 30°C", description: "Biển Mỹ Khê êm ả, nắng chan hòa, thời tiết mát mẻ lý tưởng tắm biển và dạo Bà Nà.", descriptionEn: "Calm turquoise surf at My Khe beach, pleasant breezes, and prime Ba Na Hills vistas." },
      { season: "Mùa Du Lịch Hè (T6 - T8)", seasonEn: "Summer Peak & Festivals (Jun-Aug)", avgTempC: "28°C - 35°C", description: "Sôi động với Lễ hội Pháo hoa DIFF, bãi biển đông đúc, các hoạt động đêm náo nhiệt.", descriptionEn: "Vibrant season highlighted by the International Fireworks Festival and bustling night markets." },
      { season: "Mùa Mưa Bão (T9 - T11)", seasonEn: "Typhoon & High Surf Season (Sep-Nov)", avgTempC: "22°C - 27°C", description: "Mưa lớn, biển động sóng to, cắm cờ cấm tắm biển tại các bãi tắm công cộng.", descriptionEn: "Tropical depressions and heavy surf; swimming bans regularly enforced along beaches." },
      { season: "Mùa Đông Mát Mẻ (T12 - T1)", seasonEn: "Cool Winter Transition (Dec-Jan)", avgTempC: "19°C - 24°C", description: "Không khí se lạnh, thi thoảng có mưa rào nhẹ, thích hợp nghỉ dưỡng và ẩm thực.", descriptionEn: "Cool and breezy, ideal for coastal culinary tours and relaxed resort retreats." },
    ],
    specialNotes: [
      "Tháng 6 và tháng 7 diễn ra Lễ hội Pháo hoa Quốc tế Đà Nẵng (DIFF); khách sạn dọc bờ sông Hàn cần đặt trước 1 tháng.",
      "Cầu Rồng phun lửa và phun nước vào 21:00 các tối Thứ Bảy và Chủ Nhật hàng tuần.",
      "Bán đảo Sơn Trà có thể bị cấm đường xe máy tay ga tại một số cung dốc nguy hiểm vì lý do an toàn.",
    ],
    specialNotesEn: [
      "June and July host the DIFF Fireworks Festival; reserve riverside hotels at least a month ahead.",
      "The iconic Dragon Bridge breathes fire and water at 9:00 PM every Saturday and Sunday.",
      "Son Tra Peninsula bans automatic scooters on steep roads for traveler safety.",
    ],
  },
  {
    destinationSlug: "con-dao",
    destinationName: "Côn Đảo Huyền Thoại",
    destinationNameEn: "Con Dao Archipelago",
    region: "south",
    idealMonths: [3, 4, 5, 6, 7, 8, 9],
    avoidMonths: [10, 11, 12, 1, 2],
    temperatureBySeason: [
      { season: "Mùa Biển Êm & Rùa Đẻ Trứng (T3 - T9)", seasonEn: "Calm Seas & Turtle Nesting (Mar-Sep)", avgTempC: "27°C - 32°C", description: "Biển êm như gương, nước trong vắt, mùa rùa biển đẻ trứng và san hô tuyệt đẹp.", descriptionEn: "Mirror-smooth waters, superb diving visibility, and green sea turtle nesting peak." },
      { season: "Mùa Gió Chướng Đông Bắc (T10 - T2)", seasonEn: "Northeast Strong Wind Season (Oct-Feb)", avgTempC: "25°C - 30°C", description: "Gió to sóng lớn ở bờ Đông, tàu cao tốc hay hủy chuyến, chỉ nên bay máy bay.", descriptionEn: "Rough seas and strong winds on eastern shores; high-speed ferries frequently suspended." },
    ],
    specialNotes: [
      "Từ tháng 5 đến tháng 9 là mùa rùa biển xanh (Chelonia mydas) lên bờ đẻ trứng tại Hòn Bảy Cạnh; du khách có thể đăng ký tour kiểm lâm.",
      "Mùa đông (tháng 10 - 2) gió chướng thổi rất mạnh, tàu cao tốc từ Vũng Tàu hay Trần Đề thường xuyên dừng chạy; nên ưu tiên vé máy bay khứ hồi.",
      "Côn Đảo là vùng đất tâm linh thiêng liêng; viếng Nghĩa trang Hàng Dương và mộ chị Võ Thị Sáu thường diễn ra trang trọng vào ban đêm.",
    ],
    specialNotesEn: [
      "May through September offers the rare chance to witness green sea turtles nesting on Hon Bay Canh.",
      "Winter rough winds frequently halt sea ferries; booking round-trip flights is strongly advised.",
      "Con Dao holds deep spiritual reverence; respectful evening visits to Hang Duong Cemetery require modest attire.",
    ],
  },
  {
    destinationSlug: "phong-nha",
    destinationName: "Phong Nha — Kẻ Bàng",
    destinationNameEn: "Phong Nha — Ke Bang National Park",
    region: "central",
    idealMonths: [2, 3, 4, 5, 6, 7, 8],
    avoidMonths: [9, 10, 11],
    temperatureBySeason: [
      { season: "Mùa Khô & Thám Hiểm Hang (T2 - T8)", seasonEn: "Dry Exploration Season (Feb-Aug)", avgTempC: "24°C - 34°C", description: "Thời điểm vàng trekking rừng nguyên sinh và khám phá Sơn Đoòng, Én, Tú Làn.", descriptionEn: "Prime expedition window for Son Doong, Hang En, and Tu Lan cave system treks." },
      { season: "Mùa Mưa Lũ Ngập Hang (T9 - T11)", seasonEn: "Monsoon & Subterranean Floods (Sep-Nov)", avgTempC: "20°C - 26°C", description: "Nước sông Son dâng cao, cửa động Phong Nha ngập nước, các tour thám hiểm đóng cửa.", descriptionEn: "Son River swells to submerge cave entrances; major expedition tours close for safety." },
      { season: "Mùa Đông Mát Lạnh (T12 - T1)", seasonEn: "Cool Winter (Dec-Jan)", avgTempC: "16°C - 22°C", description: "Rừng già xanh mướt trong sương, thích hợp tham quan động Thiên Đường khô ráo.", descriptionEn: "Misty lush jungle landscapes; dry caves like Paradise Cave remain accessible and tranquil." },
    ],
    specialNotes: [
      "Tháng 9 đến tháng 11 các tour thám hiểm hang ướt ngầm (Sơn Đoòng, Tú Làn, Hang Va) hoàn toàn tạm dừng để đảm bảo an toàn tuyệt đối.",
      "Nhiệt độ bên trong các hang động lớn duy trì ở mức 20-24°C quanh năm, rất mát mẻ vào mùa hè nhưng có thể lạnh khi lội nước.",
      "Động Thiên Đường là hang khô mở cửa quanh năm, đường đi lát sàn gỗ rất an toàn cho gia đình có người cao tuổi và trẻ nhỏ.",
    ],
    specialNotesEn: [
      "Wet subterranean expeditions (Son Doong, Tu Lan) halt entirely between Sep and Nov due to flood risks.",
      "Interior cave temperatures hover around 20-24°C year-round; cold water wading requires neoprene socks.",
      "Paradise Cave features safe wooden walkways open all year, perfect for multi-generational families.",
    ],
  },
  {
    destinationSlug: "mui-ne",
    destinationName: "Mũi Né — Đồi Cát Bay",
    destinationNameEn: "Mui Ne — Sand Dunes",
    region: "south",
    idealMonths: [11, 12, 1, 2, 3, 4],
    avoidMonths: [7, 8],
    temperatureBySeason: [
      { season: "Mùa Gió & Lướt Ván Diều (T11 - T3)", seasonEn: "Wind & Kitesurfing Season (Nov-Mar)", avgTempC: "25°C - 31°C", description: "Nắng rực rỡ, gió mạnh ổn định, thiên đường lướt ván diều quốc tế hàng đầu châu Á.", descriptionEn: "Sunny and famously breezy; Asia's premier kitesurfing and windsurfing playground." },
      { season: "Mùa Hè Biển Ấm (T4 - T6)", seasonEn: "Warm Summer (Apr-Jun)", avgTempC: "27°C - 33°C", description: "Biển trong xanh, sóng êm ả, bình minh đồi cát Bàu Trắng tuyệt mỹ.", descriptionEn: "Calm warm seas, ideal beach lounging, and breathtaking sunrise desert buggy rides at Bau Trang." },
      { season: "Mùa Mưa Duyên Hải (T7 - T10)", seasonEn: "Coastal Showers (Jul-Oct)", avgTempC: "26°C - 31°C", description: "Lượng mưa thấp hơn các vùng khác, thi thoảng có hiện tượng tảo đỏ dạt bờ.", descriptionEn: "Relatively low rainfall compared to the rest of Vietnam; occasional red tide occurrences." },
    ],
    specialNotes: [
      "Mũi Né là một trong những vùng khô hạn nhất Việt Nam với lượng mưa trung bình thấp, du khách có thể đi du lịch gần như quanh năm.",
      "Nên đi đồi cát Bàu Trắng và Đồi Cát Đỏ vào sáng sớm (5h30 - 7h30) để ngắm bình minh và tránh cát bị nung nóng bỏng chân.",
      "Tuyến cao tốc Dầu Giây - Phan Thiết giúp thời gian di chuyển từ TP.HCM đến Mũi Né chỉ còn khoảng 2.5 tiếng.",
    ],
    specialNotesEn: [
      "Mui Ne has a dry microclimate with minimal rain, making it viable nearly 12 months a year.",
      "Visit Bau Trang white sand dunes between 5:30 and 7:30 AM to witness sunrise and avoid scorching sand.",
      "The Dau Giay - Phan Thiet expressway cuts travel time from Ho Chi Minh City to just 2.5 hours.",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. VISA & ENTRY GUIDE SEED DATA
// ─────────────────────────────────────────────────────────────────────────────

export const VISA_GUIDE_DATA: VisaGuideData = {
  lastVerifiedDate: "2026-03-01",
  disclaimer:
    "Thông tin thị thực được STAR Travels tổng hợp dựa trên các văn bản quy phạm pháp luật hiện hành của Chính phủ Việt Nam (Nghị quyết 128/NQ-CP và Luật sửa đổi số 23/2023/QH15). Chính sách xuất nhập cảnh có thể thay đổi bất kỳ lúc nào theo quyết định của cơ quan thẩm quyền mà không báo trước. STAR Travels khuyến nghị du khách luôn kiểm tra lại với Cổng Thông tin Xuất nhập cảnh chính thức trước khi đặt vé. STAR Travels không chịu trách nhiệm pháp lý đối với bất kỳ thay đổi quy định nào.",
  disclaimerEn:
    "Visa regulations are compiled by STAR Travels from official Vietnamese legislation (Resolution 128/NQ-CP and Amended Law No. 23/2023/QH15). Entry policies are subject to change by government authorities without notice. STAR Travels strongly recommends verifying with the official Vietnam Immigration portals before booking flights. STAR Travels assumes no legal liability for sudden regulatory amendments.",
  exemptions: [
    {
      durationDays: 45,
      badge: "45 Ngày Miễn Phí",
      badgeEn: "45-Day Exemption",
      description: "Áp dụng cho công dân 25 quốc gia Tây Âu và Đông Á theo chính sách đơn phương miễn thị thực không phân biệt mục đích nhập cảnh.",
      descriptionEn: "Unilateral visa exemption for citizens of 25 Western European and East Asian nations, regardless of passport type or travel purpose.",
      countries: [
        { code: "DE", name: "Đức", nameEn: "Germany", flag: "🇩🇪" },
        { code: "FR", name: "Pháp", nameEn: "France", flag: "🇫🇷" },
        { code: "IT", name: "Ý", nameEn: "Italy", flag: "🇮🇹" },
        { code: "ES", name: "Tây Ban Nha", nameEn: "Spain", flag: "🇪🇸" },
        { code: "GB", name: "Vương Quốc Anh", nameEn: "United Kingdom", flag: "🇬🇧" },
        { code: "JP", name: "Nhật Bản", nameEn: "Japan", flag: "🇯🇵" },
        { code: "KR", name: "Hàn Quốc", nameEn: "South Korea", flag: "🇰🇷" },
        { code: "RU", name: "Nga", nameEn: "Russia", flag: "🇷🇺" },
        { code: "SE", name: "Thụy Điển", nameEn: "Sweden", flag: "🇸🇪" },
        { code: "NO", name: "Na Uy", nameEn: "Norway", flag: "🇳🇴" },
        { code: "DK", name: "Đan Mạch", nameEn: "Denmark", flag: "🇩🇰" },
        { code: "FI", name: "Phần Lan", nameEn: "Finland", flag: "🇫🇮" },
        { code: "BY", name: "Belarus", nameEn: "Belarus", flag: "🇧🇾" },
        { code: "BE", name: "Bỉ", nameEn: "Belgium", flag: "🇧🇪" },
        { code: "BG", name: "Bulgaria", nameEn: "Bulgaria", flag: "🇧🇬" },
        { code: "HR", name: "Croatia", nameEn: "Croatia", flag: "🇭🇷" },
        { code: "CZ", name: "Cộng Hòa Séc", nameEn: "Czech Republic", flag: "🇨🇿" },
        { code: "HU", name: "Hungary", nameEn: "Hungary", flag: "🇭🇺" },
        { code: "LU", name: "Luxembourg", nameEn: "Luxembourg", flag: "🇱🇺" },
        { code: "NL", name: "Hà Lan", nameEn: "Netherlands", flag: "🇳🇱" },
        { code: "PL", name: "Ba Lan", nameEn: "Poland", flag: "🇵🇱" },
        { code: "RO", name: "Romania", nameEn: "Romania", flag: "🇷🇴" },
        { code: "SK", name: "Slovakia", nameEn: "Slovakia", flag: "🇸🇰" },
        { code: "SI", name: "Slovenia", nameEn: "Slovenia", flag: "🇸🇮" },
        { code: "CH", name: "Thụy Sĩ", nameEn: "Switzerland", flag: "🇨🇭" },
      ],
      notes: "Thời hạn tạm trú tính tròn 45 ngày kể từ ngày nhập cảnh. Hộ chiếu phải còn hạn tối thiểu 6 tháng.",
      notesEn: "Valid for 45 calendar days upon entry. Passport must have at least 6 months remaining validity.",
    },
    {
      durationDays: 30,
      badge: "30 Ngày Miễn Phí",
      badgeEn: "30-Day Exemption",
      description: "Áp dụng theo hiệp định song phương cho hầu hết các quốc gia thành viên khối ASEAN, Mông Cổ và Kyrgyzstan.",
      descriptionEn: "Bilateral visa waiver agreements covering ASEAN member states, Mongolia, and Kyrgyzstan.",
      countries: [
        { code: "SG", name: "Singapore", nameEn: "Singapore", flag: "🇸🇬" },
        { code: "MY", name: "Malaysia", nameEn: "Malaysia", flag: "🇲🇾" },
        { code: "TH", name: "Thái Lan", nameEn: "Thailand", flag: "🇹🇭" },
        { code: "ID", name: "Indonesia", nameEn: "Indonesia", flag: "🇮🇩" },
        { code: "KH", name: "Campuchia", nameEn: "Cambodia", flag: "🇰🇭" },
        { code: "LA", name: "Lào", nameEn: "Laos", flag: "🇱🇦" },
        { code: "MN", name: "Mông Cổ", nameEn: "Mongolia", flag: "🇲🇳" },
        { code: "KG", name: "Kyrgyzstan", nameEn: "Kyrgyzstan", flag: "🇰🇬" },
      ],
    },
    {
      durationDays: 90,
      badge: "90 Ngày Miễn Phí",
      badgeEn: "90-Day Exemption",
      description: "Áp dụng theo hiệp định song phương đặc biệt với các quốc gia Nam Mỹ.",
      descriptionEn: "Special bilateral agreements with selected Latin American partner countries.",
      countries: [
        { code: "CL", name: "Chile", nameEn: "Chile", flag: "🇨🇱" },
        { code: "PA", name: "Panama", nameEn: "Panama", flag: "🇵🇦" },
      ],
    },
    {
      durationDays: 21,
      badge: "21 & 14 Ngày",
      badgeEn: "21 & 14 Days",
      description: "Áp dụng cho các quốc gia Đông Nam Á có thời hạn thỏa thuận ngắn hơn.",
      descriptionEn: "Applicable to ASEAN neighbors with shorter bilateral duration agreements.",
      countries: [
        { code: "PH", name: "Philippines (21 ngày)", nameEn: "Philippines (21 days)", flag: "🇵🇭" },
        { code: "BN", name: "Brunei (14 ngày)", nameEn: "Brunei (14 days)", flag: "🇧🇳" },
        { code: "MM", name: "Myanmar (14 ngày)", nameEn: "Myanmar (14 days)", flag: "🇲🇲" },
      ],
    },
  ],
  evisa: {
    validityDays: 90,
    entryTypes: [
      {
        type: "Nhập cảnh 1 lần (Single Entry)",
        typeEn: "Single Entry",
        feeUsd: 25,
        description: "Có giá trị xuất nhập cảnh 1 lần trong vòng tối đa 90 ngày.",
        descriptionEn: "Valid for a single entry and exit within a maximum 90-day window.",
      },
      {
        type: "Nhập cảnh nhiều lần (Multiple Entry)",
        typeEn: "Multiple Entry",
        feeUsd: 50,
        description: "Cho phép xuất nhập cảnh nhiều lần trong vòng 90 ngày, phù hợp kết hợp du lịch Lào/Campuchia.",
        descriptionEn: "Allows multiple entries within 90 days, ideal for regional side-trips to Laos or Cambodia.",
      },
    ],
    processingTime: "3 đến 5 ngày làm việc (không tính Thứ Bảy, Chủ Nhật và ngày lễ Việt Nam)",
    processingTimeEn: "3 to 5 business days (excluding weekends and official Vietnamese holidays)",
    eligibleNationalities: "Công dân của TẤT CẢ các quốc gia và vùng lãnh thổ trên thế giới",
    eligibleNationalitiesEn: "Citizens of ALL countries and territories worldwide",
    officialPortals: [
      {
        name: "Cổng Thông Tin E-Visa Chính Thức Quốc Gia (Bộ Công An)",
        url: "https://evisa.gov.vn",
        note: "Địa chỉ cổng quốc gia duy nhất của Cục Quản lý Xuất nhập cảnh Việt Nam.",
        noteEn: "The sole official national portal hosted by the Vietnam Immigration Department.",
      },
      {
        name: "Cổng Thị Thực Điện Tử Dịch Vụ Công Bộ Công An",
        url: "https://thithucdientu.gov.vn",
        note: "Hệ thống tiếp nhận hồ sơ thị thực điện tử bảo mật thuộc Cục QLXNC.",
        noteEn: "Official public security digital immigration service entry point.",
      },
    ],
    steps: [
      {
        step: 1,
        title: "Truy cập cổng chính thức & Chuẩn bị hồ sơ",
        titleEn: "Visit Official Portal & Prepare Documents",
        detail: "Truy cập evisa.gov.vn. Chuẩn bị ảnh chân dung 4x6cm phông trắng (không đeo kính) và ảnh chụp trang thông tin hộ chiếu sắc nét.",
        detailEn: "Open evisa.gov.vn. Prepare a 4x6 cm white-background portrait photo (no glasses) and a clear scan of your passport bio-page.",
      },
      {
        step: 2,
        title: "Khai báo thông tin trực tuyến",
        titleEn: "Complete Online Application",
        detail: "Điền đầy đủ thông tin cá nhân, ngày dự kiến nhập cảnh, cửa khẩu nhập cảnh (sân bay/cửa khẩu đường bộ/cảng biển) và địa chỉ lưu trú.",
        detailEn: "Fill in personal particulars, intended entry/exit dates, entry port (airports, land borders, seaports), and temporary hotel address.",
      },
      {
        step: 3,
        title: "Thanh toán lệ phí trực tuyến",
        titleEn: "Pay Government Processing Fee",
        detail: "Thanh toán lệ phí quy định ($25 cho 1 lần hoặc $50 cho nhiều lần) qua cổng thanh toán quốc tế trực tiếp bằng thẻ Visa/Mastercard.",
        detailEn: "Pay the non-refundable fee ($25 single, $50 multiple) using international Visa/Mastercard credit/debit cards.",
      },
      {
        step: 4,
        title: "Tra cứu kết quả & In thị thực",
        titleEn: "Track Status & Print E-Visa",
        detail: "Lưu mã hồ sơ (Registration Code). Sau 3-5 ngày làm việc, tra cứu kết quả, tải file PDF thị thực điện tử và in ra bản giấy để xuất trình tại cửa khẩu.",
        detailEn: "Save your Registration Code. After 3-5 business days, download your PDF e-visa approval letter and print a physical paper copy for border control.",
      },
    ],
    requirements: [
      {
        title: "Hạn hộ chiếu",
        titleEn: "Passport Validity",
        detail: "Hộ chiếu phải còn giá trị ít nhất 6 tháng kể từ ngày dự kiến nhập cảnh và còn tối thiểu 2 trang trống.",
        detailEn: "Passport must possess at least 6 months validity from planned arrival date and contain at least 2 blank pages.",
      },
      {
        title: "Cửa khẩu nhập cảnh cố định",
        titleEn: "Designated Entry Ports",
        detail: "E-visa có giá trị tại 13 sân bay quốc tế (Nội Bài, Tân Sơn Nhất, Đà Nẵng, Cam Ranh, Phú Quốc...), 16 cửa khẩu đường bộ và 13 cảng biển được phê duyệt.",
        detailEn: "Valid at 13 international airports (Noi Bai, Tan Son Nhat, Da Nang, Cam Ranh, Phu Quoc, etc.), 16 land borders, and 13 international seaports.",
      },
      {
        title: "Cảnh báo trang web giả mạo",
        titleEn: "Counterfeit Website Warning",
        detail: "Nhiều website tư nhân lập tên miền gần giống cơ quan nhà nước và thu phí dịch vụ từ $50-$150. Chỉ nộp đơn tại tên miền kết thúc bằng đuôi .gov.vn.",
        detailEn: "Beware of commercial agency sites masquerading as official departments charging $50-$150. Only submit on domains ending in .gov.vn.",
      },
    ],
  },
  specialExemptions: [
    {
      zone: "Đặc khu Đảo Phú Quốc (Kiên Giang)",
      zoneEn: "Phu Quoc Special Island Zone",
      durationDays: 30,
      conditions: [
        "Người nước ngoài bay trực tiếp từ quốc tế đến Cảng hàng không quốc tế Phú Quốc.",
        "Trường hợp quá cảnh tại sân bay Nội Bài hoặc Tân Sơn Nhất và nối chuyến thẳng ra Phú Quốc trong khu vực cách ly sân bay vẫn được áp dụng.",
        "Chỉ áp dụng lưu trú trong phạm vi đảo Phú Quốc; nếu muốn đi vào đất liền Việt Nam phải có visa hoặc thuộc diện miễn visa khác.",
      ],
      conditionsEn: [
        "Foreign travelers arriving on direct international flights to Phu Quoc International Airport.",
        "Transit through Noi Bai or Tan Son Nhat to Phu Quoc directly without leaving the transit isolation area also qualifies.",
        "Restricted strictly to Phu Quoc Island; visiting the Vietnamese mainland requires a regular visa or eligible exemption.",
      ],
    },
  ],
  faq: [
    {
      question: "Nếu tôi được miễn visa 45 ngày, tôi có thể gia hạn khi đang ở Việt Nam không?",
      questionEn: "Can I extend my 45-day visa exemption while in Vietnam?",
      answer: "Theo quy định hiện hành, việc gia hạn miễn thị thực trực tiếp trong nước rất hạn chế. Du khách muốn ở lại lâu hơn thường chọn xuất cảnh sang nước láng giềng (Lào, Thái Lan, Campuchia) và nhập cảnh lại với diện miễn visa mới hoặc nộp e-visa 90 ngày trước khi nhập cảnh.",
      answerEn: "Under current policy, in-country visa exemption extensions are strictly limited. Most travelers either exit to a neighboring country (Laos, Thailand, Cambodia) and re-enter, or apply in advance for a 90-day e-visa.",
    },
    {
      question: "Thời gian xử lý e-visa có thể bị chậm trễ không?",
      questionEn: "Can e-visa processing take longer than 3-5 business days?",
      answer: "Có thể, đặc biệt vào mùa cao điểm du lịch (tháng 11 đến tháng 2) hoặc nếu thông tin khai báo có sai sót về họ tên, số hộ chiếu hoặc ảnh không đạt chuẩn. Khuyến nghị nộp đơn trước ngày bay ít nhất 2 tuần.",
      answerEn: "Yes, especially during peak travel months (November to February) or if there are typos in names, passport numbers, or sub-standard photos. Applying at least 2 weeks prior to departure is strongly recommended.",
    },
    {
      question: "Trẻ em đi cùng bố mẹ có cần nộp e-visa riêng không?",
      questionEn: "Do children require a separate e-visa?",
      answer: "Trẻ em có hộ chiếu riêng bắt buộc phải nộp đơn e-visa riêng và đóng phí $25. Nếu trẻ em được dán chung vào hộ chiếu của bố mẹ thì khai báo chung trong đơn của bố mẹ.",
      answerEn: "Children holding their own passports must submit an individual application and pay the standard $25 fee. Children included on a parent's passport can be included in the parent's application.",
    },
  ],
  officialSources: [
    {
      title: "Cổng Thông tin E-Visa Quốc Gia",
      url: "https://evisa.gov.vn",
      agency: "Cục Quản lý Xuất nhập cảnh — Bộ Công an",
    },
    {
      title: "Cổng Thông tin Điện tử Bộ Ngoại giao Việt Nam",
      url: "https://mofa.gov.vn",
      agency: "Bộ Ngoại giao Việt Nam",
    },
    {
      title: "Nghị quyết số 128/NQ-CP và Luật số 23/2023/QH15",
      url: "https://xuatnhapcanh.gov.vn",
      agency: "Chính phủ & Quốc hội nước CHXHCN Việt Nam",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. DOMESTIC TRANSPORT GUIDE SEED DATA
// ─────────────────────────────────────────────────────────────────────────────

export const TRANSPORT_MODES: TransportMode[] = [
  {
    id: "flight",
    name: "Máy Bay Nội Địa (Domestic Flights)",
    nameEn: "Domestic Flights",
    icon: "Plane",
    speed: "Nhanh nhất (1 - 2.5 giờ)",
    speedEn: "Fastest (1 - 2.5 hours)",
    costRange: "800.000 — 2.500.000 VNĐ / vé",
    costRangeEn: "$32 — $100 USD / ticket",
    bestFor: "Di chuyển liên vùng cự ly xa (Hà Nội <-> Đà Nẵng, Hà Nội <-> TP.HCM, TP.HCM <-> Phú Quốc)",
    bestForEn: "Long-distance regional transit (Hanoi <-> Da Nang, Hanoi <-> HCMC, HCMC <-> Phu Quoc)",
    pros: [
      "Tiết kiệm tối đa thời gian di chuyển giữa các miền.",
      "Hãng hàng không quốc gia Vietnam Airlines chất lượng 4 sao, Vietjet Air và Bamboo Airways mạng bay dày đặc.",
      "Cảng hàng không hiện đại tại hầu hết các trung tâm du lịch lớn.",
    ],
    prosEn: [
      "Maximizes travel efficiency across North, Central, and South regions.",
      "Vietnam Airlines offers 4-star legacy service; Vietjet and Bamboo provide dense flight networks.",
      "Modern airport terminals at all major tourist centers.",
    ],
    cons: [
      "Thời gian chờ làm thủ tục sân bay và di chuyển ra ngoại thành khoảng 2 - 3 tiếng.",
      "Giá vé biến động mạnh vào các dịp lễ tết và mùa hè.",
    ],
    consEn: [
      "Airport check-in, security, and suburban transit add 2-3 hours to total trip.",
      "Airfares surge noticeably during Lunar New Year and summer holidays.",
    ],
    bookingTips: [
      "Đặt vé trước 3-4 tuần để có giá tốt trên website chính thức của Vietnam Airlines hoặc Vietjet Air.",
      "Luôn kiểm tra kỹ hành lý ký gửi (hạng vé siêu tiết kiệm thường chỉ bao gồm 7kg xách tay).",
    ],
    bookingTipsEn: [
      "Book 3-4 weeks in advance on official airline portals for optimal pricing.",
      "Carefully verify baggage allowance; super-economy fares usually only include 7kg carry-on.",
    ],
  },
  {
    id: "train",
    name: "Đường Sắt Thống Nhất (SE Trains)",
    nameEn: "North-South Railway (SE Trains)",
    icon: "Train",
    speed: "Trung bình (14 - 30 giờ xuyên Việt)",
    speedEn: "Moderate (14 - 30 hours full length)",
    costRange: "400.000 — 1.600.000 VNĐ / vé",
    costRangeEn: "$16 — $64 USD / ticket",
    bestFor: "Cung đường ven biển miền Trung tuyệt đẹp (Đà Nẵng <-> Huế qua Đèo Hải Vân, Hà Nội <-> Ninh Bình)",
    bestForEn: "Scenic coastal segments (Da Nang <-> Hue via Hai Van Pass, Hanoi <-> Ninh Binh)",
    pros: [
      "Ngắm cảnh thiên nhiên kỳ vĩ, đặc biệt là đoạn uốn lượn bên vịnh Lăng Cô và đèo Hải Vân.",
      "Ga tàu nằm ngay trung tâm thành phố, không tốn thời gian di chuyển xa.",
      "Khoang giường nằm 4 chỗ điều hòa (khoang 1) sạch sẽ, an toàn, mang lại trải nghiệm hoài niệm.",
    ],
    prosEn: [
      "Spectacular coastal scenery, particularly through Lang Co Bay and Hai Van Pass.",
      "Railway stations are situated in city centers with zero suburban airport transfer hassle.",
      "4-berth air-conditioned soft sleeper cabins (First Class) are comfortable and nostalgic.",
    ],
    cons: [
      "Thời gian di chuyển dài nếu đi cả tuyến Hà Nội - TP.HCM (khoảng 32 tiếng).",
      "Hạ tầng toa xe cũ hơn so với tàu cao tốc quốc tế.",
    ],
    consEn: [
      "Full trans-national route (Hanoi to HCMC) is slow (~32 hours).",
      "Train carriages are traditional rather than high-speed bullet trains.",
    ],
    bookingTips: [
      "Đặt vé trực tiếp tại trang web chính thức của Tổng công ty Đường sắt Việt Nam: dsvn.vn.",
      "Nên chọn tàu số hiệu SE1, SE3, SE19, SE20 là các đoàn tàu thế hệ mới chất lượng cao nhất.",
    ],
    bookingTipsEn: [
      "Book directly on the official Vietnam Railways website: dsvn.vn.",
      "Opt for SE1, SE3, SE19, or SE20 which feature the newest refurbished carriages.",
    ],
  },
  {
    id: "limousine",
    name: "Xe Limousine VIP 9-11 Chỗ",
    nameEn: "VIP Limousine Vans (9-11 seats)",
    icon: "Car",
    speed: "Nhanh trên cao tốc (2 - 5 giờ)",
    speedEn: "Fast via Expressways (2 - 5 hours)",
    costRange: "200.000 — 450.000 VNĐ / vé",
    costRangeEn: "$8 — $18 USD / ticket",
    bestFor: "Cự ly ngắn đến trung bình (Hà Nội <-> Ninh Bình, Hà Nội <-> Hạ Long, TP.HCM <-> Mũi Né)",
    bestForEn: "Short to medium overland trips (Hanoi <-> Ninh Binh, Hanoi <-> Ha Long, HCMC <-> Mui Ne)",
    pros: [
      "Ghế da cao cấp ngả lưng hoặc massage, có cổng sạc USB và Wi-Fi miễn phí.",
      "Đón và trả tận nơi tại khách sạn trong khu vực trung tâm.",
      "Chạy trên hệ thống đường cao tốc mới, rút ngắn thời gian chỉ còn 1/2 so với xe khách cũ.",
    ],
    prosEn: [
      "Plush leather massage reclining seats with USB charging ports and Wi-Fi.",
      "Door-to-door pick-up and drop-off at downtown hotels.",
      "Travels on newly opened expressways, halving traditional travel durations.",
    ],
    cons: [
      "Không gian hành lý hạn chế hơn so với xe buýt lớn; vali cỡ đại cần báo trước.",
      "Tài xế có thể nói tiếng Anh cơ bản hoặc không thông thạo ngoại ngữ.",
    ],
    consEn: [
      "Luggage space is compact; oversized suitcases must be declared in advance.",
      "Drivers usually speak basic or limited English.",
    ],
    bookingTips: [
      "Đặt qua các nhà xe uy tín như Phúc Xuyên, Hạ Long Limousine, G8 Open Tour, Thịnh Phát.",
      "Yêu cầu nhà xe xác nhận điểm đón chính xác qua tin nhắn Zalo hoặc WhatsApp trước giờ khởi hành 1 tiếng.",
    ],
    bookingTipsEn: [
      "Reserve through reputable operators (Phuc Xuyen, Ha Long Limousine, G8 Open Tour).",
      "Confirm exact pick-up address via Zalo or WhatsApp 1 hour before departure.",
    ],
  },
  {
    id: "sleeper_bus",
    name: "Xe Khách Giường Nằm / Cabin Cung Điện",
    nameEn: "Sleeper Bus / VIP Cabin Bus",
    icon: "Bus",
    speed: "Chạy đêm tiết kiệm thời gian (5 - 8 giờ)",
    speedEn: "Overnight transit (5 - 8 hours)",
    costRange: "250.000 — 500.000 VNĐ / vé",
    costRangeEn: "$10 — $20 USD / ticket",
    bestFor: "Tuyến đèo núi phía Bắc (Hà Nội <-> Sa Pa, Hà Nội <-> Hà Giang) và Đà Lạt <-> TP.HCM",
    bestForEn: "Northern mountain loops (Hanoi <-> Sa Pa, Hanoi <-> Ha Giang) and Da Lat <-> HCMC",
    pros: [
      "Khoang cabin riêng biệt (Cabin VIP/Cung điện di động) có rèm che kín đáo, tivi, tai nghe.",
      "Khởi hành ban đêm, ngủ một giấc sáng sớm hôm sau tới nơi, tiết kiệm 1 đêm tiền phòng khách sạn.",
      "Mạng lưới tuyến đường rộng khắp đến tận các bản làng vùng sâu vùng xa.",
    ],
    prosEn: [
      "Private VIP double or single capsules with blackout privacy curtains, screens, and USB power.",
      "Overnight departure saves a night of accommodation and maximizes daytime exploration.",
      "Extensive route network reaching remote highland hamlets.",
    ],
    cons: [
      "Đường đèo núi quanh co có thể gây say xe đối với người nhạy cảm.",
      "Quy định tháo giày cho vào túi nylon khi bước lên xe.",
    ],
    consEn: [
      "Winding mountain switchbacks may cause motion sickness for sensitive passengers.",
      "Strict etiquette requires removing shoes into plastic bags upon boarding.",
    ],
    bookingTips: [
      "Nên chọn Cabin đơn ở tầng 1 (tầng dưới) để hạn chế rung lắc khi xe ôm cua đường đèo.",
      "Nên mua thuốc chống say xe uống trước giờ khởi hành 30 phút.",
    ],
    bookingTipsEn: [
      "Choose a lower-deck single cabin to minimize sway on mountain bends.",
      "Take motion sickness medication 30 minutes before departure if prone to nausea.",
    ],
  },
];

export const DESTINATIONS_TRANSPORT_DATA: DestinationTransportInfo[] = [
  {
    destinationSlug: "ha-long",
    destinationName: "Vịnh Hạ Long",
    destinationNameEn: "Ha Long Bay",
    nearestHub: { type: "airport", name: "Sân bay Quốc tế Vân Đồn (VDO) / Sân bay Cát Bi Hải Phòng (HPH)", nameEn: "Van Don International Airport / Cat Bi Airport", distanceKm: 50 },
    fromHubToCenter: [
      { method: "Xe Limousine từ Hà Nội", methodEn: "VIP Limousine from Hanoi", duration: "2 - 2.5 giờ", durationEn: "2 - 2.5 hours", estimatedCost: "250.000 - 300.000 VNĐ", estimatedCostEn: "$10 - $12 USD", instructions: "Đón tại Phố Cổ Hà Nội, đi đường cao tốc Hà Nội - Hải Phòng - Hạ Long, trả tại Cảng tàu Quốc tế Tuần Châu hoặc Hạ Long.", instructionsEn: "Pick-up in Hanoi Old Quarter, via Hanoi-Ha Long expressway directly to Tuan Chau or Ha Long International Cruise Port." },
      { method: "Taxi từ Sân bay Cát Bi", methodEn: "Taxi from Cat Bi Airport (HPH)", duration: "45 phút", durationEn: "45 mins", estimatedCost: "450.000 - 550.000 VNĐ", estimatedCostEn: "$18 - $22 USD", instructions: "Bắt taxi công nghệ Grab hoặc taxi Mai Linh tại sảnh đến sân bay qua cao tốc Bạch Đằng sang Hạ Long.", instructionsEn: "Board Grab or Mai Linh Taxi from arrivals terminal across Bach Dang bridge into Ha Long." },
    ],
    intercityConnections: [
      { toDestination: "Ninh Bình", toDestinationEn: "Ninh Binh", recommendedVehicle: "Xe Limousine đón trả tận nơi", recommendedVehicleEn: "Shared Limousine Van", travelTime: "3.5 giờ", travelTimeEn: "3.5 hours", costEstimate: "280.000 VNĐ", costEstimateEn: "$11 USD", notes: "Chạy thẳng cao tốc ven biển không cần trung chuyển qua Hà Nội.", notesEn: "Direct coastal connection without needing to transit through Hanoi." },
      { toDestination: "Hà Nội", toDestinationEn: "Hanoi", recommendedVehicle: "Xe Limousine 9 chỗ", recommendedVehicleEn: "9-seat Limousine", travelTime: "2 giờ", travelTimeEn: "2 hours", costEstimate: "260.000 VNĐ", costEstimateEn: "$10 USD", notes: "Tần suất 30 phút/chuyến từ 6h00 đến 20h00 hàng ngày.", notesEn: "Departs every 30 mins between 6:00 AM and 8:00 PM." },
    ],
  },
  {
    destinationSlug: "hoi-an",
    destinationName: "Phố cổ Hội An",
    destinationNameEn: "Hoi An Ancient Town",
    nearestHub: { type: "airport", name: "Sân bay Quốc tế Đà Nẵng (DAD) / Ga Đà Nẵng", nameEn: "Da Nang International Airport / Da Nang Railway Station", distanceKm: 30 },
    fromHubToCenter: [
      { method: "Xe riêng / Grab Car từ Sân bay Đà Nẵng", methodEn: "Private Car / Grab from Da Nang Airport", duration: "40 - 50 phút", durationEn: "40 - 50 mins", estimatedCost: "250.000 - 350.000 VNĐ", estimatedCostEn: "$10 - $14 USD", instructions: "Lối ra ga đến có sẵn xe riêng và Grab. Chạy theo đường biển Võ Nguyên Giáp thẳng vào Hội An.", instructionsEn: "Available immediately outside arrivals. Route follows scenic coastal Vo Nguyen Giap avenue into Hoi An." },
      { method: "Xe buýt liên tỉnh Đà Nẵng - Hội An", methodEn: "Public Bus Da Nang - Hoi An", duration: "75 phút", durationEn: "75 mins", estimatedCost: "30.000 VNĐ", estimatedCostEn: "$1.2 USD", instructions: "Tuyến buýt số 1 khởi hành từ Bến xe trung tâm Đà Nẵng đến Bến xe Hội An.", instructionsEn: "Bus line No. 1 operates from Da Nang Central Bus Station to Hoi An Bus Terminal." },
    ],
    intercityConnections: [
      { toDestination: "Cố đô Huế", toDestinationEn: "Hue Imperial City", recommendedVehicle: "Xe du lịch qua Đèo Hải Vân hoặc Tàu SE", recommendedVehicleEn: "Scenic Car via Hai Van Pass or SE Train", travelTime: "2.5 - 3 giờ", travelTimeEn: "2.5 - 3 hours", costEstimate: "350.000 - 800.000 VNĐ", costEstimateEn: "$14 - $32 USD", notes: "Nên thuê xe riêng dừng chân chụp ảnh tại đỉnh Đèo Hải Vân và vịnh Lăng Cô.", notesEn: "Hire a private driver to stop for photos at Hai Van Pass summit and Lang Co Bay." },
      { toDestination: "Đà Nẵng", toDestinationEn: "Da Nang", recommendedVehicle: "Xe máy hoặc Taxi Grab", recommendedVehicleEn: "Motorbike or Grab Taxi", travelTime: "40 phút", travelTimeEn: "40 mins", costEstimate: "150.000 - 300.000 VNĐ", costEstimateEn: "$6 - $12 USD", notes: "Khoảng cách 30km dọc bờ biển bằng phẳng rất dễ lái xe máy.", notesEn: "Flat, scenic 30km coastal road; easy and scenic motorbike ride." },
    ],
  },
  {
    destinationSlug: "phu-quoc",
    destinationName: "Đảo Ngọc Phú Quốc",
    destinationNameEn: "Phu Quoc Pearl Island",
    nearestHub: { type: "airport", name: "Cảng hàng không Quốc tế Phú Quốc (PQC)", nameEn: "Phu Quoc International Airport", distanceKm: 10 },
    fromHubToCenter: [
      { method: "Taxi / Grab Car về Dương Đông", methodEn: "Taxi / Grab to Duong Dong Center", duration: "15 - 20 phút", durationEn: "15 - 20 mins", estimatedCost: "150.000 - 200.000 VNĐ", estimatedCostEn: "$6 - $8 USD", instructions: "Bắt taxi Vinasun, Mai Linh hoặc Grab ngay cửa ga đến. Giá cước tính theo đồng hồ km.", instructionsEn: "Board metered Vinasun, Mai Linh or Grab cars outside the terminal exit." },
      { method: "Xe buýt điện VinBus miễn phí", methodEn: "Free VinBus Electric Shuttle", duration: "30 - 45 phút", durationEn: "30 - 45 mins", estimatedCost: "Miễn phí (Free)", estimatedCostEn: "Free", instructions: "Tuyến xe buýt điện xanh chạy 24/7 kết nối sân bay đến Grand World Phú Quốc (Bắc Đảo).", instructionsEn: "Eco-friendly electric shuttle bus running 24/7 connecting airport to Grand World Phu Quoc." },
    ],
    intercityConnections: [
      { toDestination: "Hà Tiên / Rạch Giá", toDestinationEn: "Ha Tien / Rach Gia", recommendedVehicle: "Tàu cao tốc Superdong / Phú Quốc Express", recommendedVehicleEn: "High-speed Ferry", travelTime: "1.5 - 2.5 giờ", travelTimeEn: "1.5 - 2.5 hours", costEstimate: "250.000 - 340.000 VNĐ", costEstimateEn: "$10 - $14 USD", notes: "Xuất phát từ Cảng Bãi Vòng; cần đặt vé trước vào mùa cao điểm.", notesEn: "Departs from Bai Vong Port; book ahead during holiday periods." },
    ],
  },
  {
    destinationSlug: "sa-pa",
    destinationName: "Sa Pa & Fansipan",
    destinationNameEn: "Sa Pa & Fansipan",
    nearestHub: { type: "train_station", name: "Ga Lào Cai (cách 35km) / Bến xe Sa Pa", nameEn: "Lao Cai Railway Station (35km) / Sa Pa Bus Station", distanceKm: 35 },
    fromHubToCenter: [
      { method: "Xe khách Cabin VIP từ Hà Nội", methodEn: "VIP Cabin Bus from Hanoi", duration: "5.5 - 6 giờ", durationEn: "5.5 - 6 hours", estimatedCost: "350.000 - 450.000 VNĐ", estimatedCostEn: "$14 - $18 USD", instructions: "Xe chạy thẳng đường cao tốc Nội Bài - Lào Cai lên trung tâm thị xã Sa Pa, không cần chuyển xe.", instructionsEn: "Direct highway service from Hanoi to Sa Pa town center without transit." },
      { method: "Tàu hỏa đêm Hà Nội - Ga Lào Cai + Xe buýt lên Sa Pa", methodEn: "Overnight Train Hanoi-Lao Cai + Shuttle Bus to Sa Pa", duration: "8 giờ tàu + 50 phút xe buýt", durationEn: "8h train + 50m bus", estimatedCost: "550.000 - 800.000 VNĐ", estimatedCostEn: "$22 - $32 USD", instructions: "Tàu đêm đến ga Lào Cai lúc 5h30 sáng; bước ra cửa ga bắt xe buýt số 01 hoặc xe 16 chỗ lên Sa Pa.", instructionsEn: "Arrive Lao Cai Station at 5:30 AM; take public bus #1 or shared 16-seat minivan up mountain road." },
    ],
    intercityConnections: [
      { toDestination: "Hà Giang", toDestinationEn: "Ha Giang", recommendedVehicle: "Xe khách liên tỉnh ngày/đêm", recommendedVehicleEn: "Interprovincial Minivan/Bus", travelTime: "6 giờ", travelTimeEn: "6 hours", costEstimate: "250.000 VNĐ", costEstimateEn: "$10 USD", notes: "Tuyến đường đèo dốc uốn lượn; nên chọn xe ban ngày để ngắm cảnh.", notesEn: "Winding mountain highway; daytime departure recommended for sightseeing." },
    ],
  },
  {
    destinationSlug: "da-lat",
    destinationName: "Đà Lạt — Ngàn Hoa",
    destinationNameEn: "Da Lat — Eternal Spring",
    nearestHub: { type: "airport", name: "Cảng hàng không Liên Khương (DLI)", nameEn: "Lien Khuong Airport", distanceKm: 30 },
    fromHubToCenter: [
      { method: "Xe buýt sân bay Liên Khương về trung tâm", methodEn: "Airport Shuttle Bus to Downtown", duration: "45 phút", durationEn: "45 mins", estimatedCost: "40.000 - 50.000 VNĐ", estimatedCostEn: "$1.6 - $2 USD", instructions: "Bắt xe tại sảnh sân bay; trả khách tại khu vực Chợ Đà Lạt hoặc Hồ Xuân Hương.", instructionsEn: "Board directly outside arrivals; drops off near Da Lat Market or Xuan Huong Lake." },
      { method: "Taxi / Grab Car từ Sân bay Liên Khương", methodEn: "Taxi / Grab Car from Airport", duration: "35 - 40 phút", durationEn: "35 - 40 mins", estimatedCost: "200.000 - 250.000 VNĐ", estimatedCostEn: "$8 - $10 USD", instructions: "Nhiều hãng taxi Lado hoặc Grab trọn gói sân bay về trung tâm Đà Lạt.", instructionsEn: "Lado Taxi or Grab offer flat-rate fixed fares into central Da Lat." },
    ],
    intercityConnections: [
      { toDestination: "Nha Trang", toDestinationEn: "Nha Trang", recommendedVehicle: "Xe Limousine qua Đèo Khánh Lê", recommendedVehicleEn: "Limousine Van via Khanh Le Pass", travelTime: "3 - 3.5 giờ", travelTimeEn: "3 - 3.5 hours", costEstimate: "180.000 - 220.000 VNĐ", costEstimateEn: "$7 - $9 USD", notes: "Cung đèo hùng vĩ từ cao nguyên xuống biển ngắm biển mây tuyệt đẹp.", notesEn: "Spectacular mountain pass descending from pine highlands to tropical coast." },
      { toDestination: "TP. Hồ Chí Minh", toDestinationEn: "Ho Chi Minh City", recommendedVehicle: "Xe giường nằm VIP Thành Bưởi / Phương Trang", recommendedVehicleEn: "VIP Sleeper Bus (Thanh Buoi / Futa)", travelTime: "6 - 7 giờ", travelTimeEn: "6 - 7 hours", costEstimate: "280.000 - 380.000 VNĐ", costEstimateEn: "$11 - $15 USD", notes: "Chạy liên tục 24/7; chuyến đêm xuất phát 23h00 đến nơi lúc 5h30 sáng.", notesEn: "Operates 24/7; overnight departures (11 PM) arrive at 5:30 AM." },
    ],
  },
  {
    destinationSlug: "ninh-binh",
    destinationName: "Quần thể Tràng An",
    destinationNameEn: "Trang An Landscape Complex",
    nearestHub: { type: "train_station", name: "Ga Ninh Bình / Bến xe Ninh Bình", nameEn: "Ninh Binh Railway Station / Bus Terminal", distanceKm: 7 },
    fromHubToCenter: [
      { method: "Xe Limousine đón trả tận nơi từ Hà Nội", methodEn: "Door-to-door Limousine from Hanoi", duration: "1.5 giờ", durationEn: "1.5 hours", estimatedCost: "160.000 - 200.000 VNĐ", estimatedCostEn: "$6.5 - $8 USD", instructions: "Đón tại Nhà hát Lớn Hà Nội hoặc phố cổ, trả thẳng tới khu nghỉ dưỡng Tràng An / Tam Cốc.", instructionsEn: "Pick-up in Hanoi Old Quarter, direct highway drop-off at Trang An or Tam Coc resorts." },
      { method: "Tàu hỏa SE từ Ga Hà Nội", methodEn: "SE Train from Hanoi Station", duration: "2 giờ 15 phút", durationEn: "2h 15m", estimatedCost: "110.000 - 180.000 VNĐ", estimatedCostEn: "$4.5 - $7 USD", instructions: "Xuống ga Ninh Bình, bắt taxi 7km vào khu du lịch sinh thái Tràng An.", instructionsEn: "Alight at Ninh Binh Station, then take a short 7km taxi ride to Trang An ecotourism zone." },
    ],
    intercityConnections: [
      { toDestination: "Vịnh Hạ Long", toDestinationEn: "Ha Long Bay", recommendedVehicle: "Xe Limousine kết nối thẳng", recommendedVehicleEn: "Direct Coastal Limousine", travelTime: "3.5 giờ", travelTimeEn: "3.5 hours", costEstimate: "260.000 VNĐ", costEstimateEn: "$10 USD", notes: "Chạy đường cao tốc Hải Phòng - Hạ Long rất thuận tiện.", notesEn: "Fast expressway connection without backtracking to Hanoi." },
    ],
  },
  {
    destinationSlug: "hue",
    destinationName: "Cố đô Huế",
    destinationNameEn: "Hue Imperial City",
    nearestHub: { type: "airport", name: "Cảng hàng không Quốc tế Phú Bài (HUI)", nameEn: "Phu Bai International Airport", distanceKm: 15 },
    fromHubToCenter: [
      { method: "Taxi / Grab từ Sân bay Phú Bài", methodEn: "Taxi / Grab from Phu Bai Airport", duration: "25 - 30 phút", durationEn: "25 - 30 mins", estimatedCost: "180.000 - 220.000 VNĐ", estimatedCostEn: "$7 - $9 USD", instructions: "Chạy thẳng theo quốc lộ 1A vào trung tâm bờ nam sông Hương (đường Lê Lợi, Hùng Vương).", instructionsEn: "Direct 15km ride along Highway 1A into central Hue south bank." },
      { method: "Xe buýt sân bay Phú Bài (Tuyến số 02 & 11)", methodEn: "Public Airport Bus (#2 & #11)", duration: "40 phút", durationEn: "40 mins", estimatedCost: "15.000 VNĐ", estimatedCostEn: "$0.6 USD", instructions: "Đón tại cổng sân bay, trả tại Bến xe Đông Ba hoặc Bến xe phía Nam.", instructionsEn: "Board outside airport gates; drops off near Dong Ba Market." },
    ],
    intercityConnections: [
      { toDestination: "Đà Nẵng", toDestinationEn: "Da Nang", recommendedVehicle: "Tàu hỏa kết nối di sản hoặc Xe riêng qua Đèo Hải Vân", recommendedVehicleEn: "Heritage Train or Private Car via Hai Van Pass", travelTime: "2.5 - 3 giờ", travelTimeEn: "2.5 - 3 hours", costEstimate: "120.000 - 600.000 VNĐ", costEstimateEn: "$5 - $24 USD", notes: "Đoàn tàu du lịch 'Kết nối di sản miền Trung' có dịch vụ ẩm thực và ca Huế trên tàu.", notesEn: "Special 'Central Heritage Connection' train features live folk performances and local cuisine." },
    ],
  },
  {
    destinationSlug: "ha-giang",
    destinationName: "Hà Giang & Mã Pí Lèng",
    destinationNameEn: "Ha Giang & Ma Pi Leng",
    nearestHub: { type: "bus_terminal", name: "Bến xe Thành phố Hà Giang", nameEn: "Ha Giang City Bus Terminal", distanceKm: 0 },
    fromHubToCenter: [
      { method: "Xe khách Cabin VIP đêm từ Hà Nội", methodEn: "VIP Overnight Cabin Bus from Hanoi", duration: "6 giờ", durationEn: "6 hours", estimatedCost: "350.000 - 450.000 VNĐ", estimatedCostEn: "$14 - $18 USD", instructions: "Khởi hành từ Bến xe Mỹ Đình lúc 21h00, tới TP Hà Giang lúc 3h30 - 4h00 sáng; các nhà xe cho ngủ lại trên xe tới 6h00.", instructionsEn: "Departs My Dinh Station at 9:00 PM, arrives 4:00 AM; passengers can sleep aboard until 6:00 AM." },
    ],
    intercityConnections: [
      { toDestination: "Đồng Văn / Mèo Vạc", toDestinationEn: "Dong Van / Meo Vac", recommendedVehicle: "Thuê xe máy hoặc Xe du lịch bán tải", recommendedVehicleEn: "Motorbike Rental or 4WD Tour", travelTime: "4 - 5 giờ", travelTimeEn: "4 - 5 hours", costEstimate: "180.000 VNĐ/ngày", costEstimateEn: "$7 USD/day", notes: "Cung đường Hà Giang Loop huyền thoại; cần bằng lái xe và kinh nghiệm lái đèo dốc.", notesEn: "Legendary Ha Giang Loop; valid driving license and mountain experience mandatory." },
    ],
  },
  {
    destinationSlug: "da-nang",
    destinationName: "Đà Nẵng — Đáng Sống",
    destinationNameEn: "Da Nang Coastal City",
    nearestHub: { type: "airport", name: "Cảng hàng không Quốc tế Đà Nẵng (DAD)", nameEn: "Da Nang International Airport", distanceKm: 3 },
    fromHubToCenter: [
      { method: "Taxi / Grab Car về trung tâm / Biển Mỹ Khê", methodEn: "Taxi / Grab to City / My Khe Beach", duration: "10 - 15 phút", durationEn: "10 - 15 mins", estimatedCost: "70.000 - 120.000 VNĐ", estimatedCostEn: "$3 - $5 USD", instructions: "Sân bay Đà Nẵng nằm ngay trong nội thành; chỉ mất 10 phút sang cầu Rồng hoặc bãi biển.", instructionsEn: "Airport is located right downtown; just 10 minutes to Dragon Bridge or My Khe beach." },
    ],
    intercityConnections: [
      { toDestination: "Phố cổ Hội An", toDestinationEn: "Hoi An Ancient Town", recommendedVehicle: "Grab Car / Xe buýt", recommendedVehicleEn: "Grab Car / Bus", travelTime: "40 phút", travelTimeEn: "40 mins", costEstimate: "250.000 VNĐ", costEstimateEn: "$10 USD", notes: "Chạy dọc đại lộ biển Võ Nguyên Giáp rất nhanh và thoáng mát.", notesEn: "Smooth coastal avenue ride along the beach." },
    ],
  },
  {
    destinationSlug: "con-dao",
    destinationName: "Côn Đảo Huyền Thoại",
    destinationNameEn: "Con Dao Archipelago",
    nearestHub: { type: "airport", name: "Cảng hàng không Côn Đảo (VCS)", nameEn: "Con Dao Airport (Co Ong)", distanceKm: 14 },
    fromHubToCenter: [
      { method: "Xe buýt / Xe đưa đón resort", methodEn: "Resort Shuttle / Shared Minivan", duration: "25 phút", durationEn: "25 mins", estimatedCost: "50.000 - 100.000 VNĐ", estimatedCostEn: "$2 - $4 USD", instructions: "Hầu hết các khách sạn và resort Côn Đảo đều có xe đưa đón sân bay miễn phí hoặc giá nhẹ.", instructionsEn: "Most local hotels and resorts provide free or inexpensive airport transfer shuttles." },
      { method: "Taxi Côn Đảo", methodEn: "Con Dao Taxi", duration: "20 phút", durationEn: "20 mins", estimatedCost: "250.000 - 300.000 VNĐ", estimatedCostEn: "$10 - $12 USD", instructions: "Có sẵn taxi ngay trước cửa sân bay Cỏ Ống.", instructionsEn: "Metered taxis are queued directly outside the Co Ong terminal exit." },
    ],
    intercityConnections: [
      { toDestination: "Vũng Tàu / Cần Thơ", toDestinationEn: "Vung Tau / Can Tho", recommendedVehicle: "Tàu cao tốc Côn Đảo Express", recommendedVehicleEn: "Con Dao Express High-Speed Ferry", travelTime: "3.5 - 4.5 giờ", travelTimeEn: "3.5 - 4.5 hours", costEstimate: "790.000 - 950.000 VNĐ", costEstimateEn: "$31 - $38 USD", notes: "Chỉ nên đi vào mùa biển êm (tháng 3 đến tháng 9); mùa đông sóng lớn tàu hay tạm ngưng.", notesEn: "Recommended primarily from March to September; winter waves often cause suspensions." },
    ],
  },
  {
    destinationSlug: "phong-nha",
    destinationName: "Phong Nha — Kẻ Bàng",
    destinationNameEn: "Phong Nha — Ke Bang National Park",
    nearestHub: { type: "airport", name: "Sân bay Đồng Hới (VDH) / Ga Đồng Hới", nameEn: "Dong Hoi Airport / Dong Hoi Railway Station", distanceKm: 45 },
    fromHubToCenter: [
      { method: "Xe buýt công cộng số B4 (Đồng Hới - Phong Nha)", methodEn: "Public Bus #B4 (Dong Hoi - Phong Nha)", duration: "60 phút", durationEn: "60 mins", estimatedCost: "35.000 VNĐ", estimatedCostEn: "$1.4 USD", instructions: "Khởi hành mỗi 45 phút từ trung tâm TP Đồng Hới thẳng tới trung tâm du lịch Phong Nha.", instructionsEn: "Departs every 45 mins from central Dong Hoi to Phong Nha tourist village." },
      { method: "Taxi / Xe riêng từ Sân bay Đồng Hới", methodEn: "Taxi / Private Transfer from Airport", duration: "45 phút", durationEn: "45 mins", estimatedCost: "400.000 - 500.000 VNĐ", estimatedCostEn: "$16 - $20 USD", instructions: "Lựa chọn nhanh và tiện lợi nhất khi mang theo hành lý trekking cồng kềnh.", instructionsEn: "Fastest and most comfortable option, especially with bulky expedition luggage." },
    ],
    intercityConnections: [
      { toDestination: "Huế", toDestinationEn: "Hue", recommendedVehicle: "Tàu hỏa SE Đồng Hới - Huế", recommendedVehicleEn: "SE Train Dong Hoi - Hue", travelTime: "3 giờ", travelTimeEn: "3 hours", costEstimate: "140.000 - 220.000 VNĐ", costEstimateEn: "$5.5 - $9 USD", notes: "Tuyến tàu chạy êm ái, ngắm cảnh đồng quê Quảng Trị.", notesEn: "Smooth rail journey traversing historic Quang Tri countryside." },
    ],
  },
  {
    destinationSlug: "mui-ne",
    destinationName: "Mũi Né — Đồi Cát Bay",
    destinationNameEn: "Mui Ne — Sand Dunes",
    nearestHub: { type: "train_station", name: "Ga Phan Thiết (cách 20km) / Sân bay Tân Sơn Nhất (SGN)", nameEn: "Phan Thiet Railway Station / Tan Son Nhat Airport (HCMC)", distanceKm: 20 },
    fromHubToCenter: [
      { method: "Xe Limousine từ TP. Hồ Chí Minh", methodEn: "VIP Limousine from Ho Chi Minh City", duration: "2.5 giờ", durationEn: "2.5 hours", estimatedCost: "250.000 - 350.000 VNĐ", estimatedCostEn: "$10 - $14 USD", instructions: "Nhờ cao tốc Dầu Giây - Phan Thiết, xe đưa đón tận cửa các resort dọc đường Nguyễn Đình Chiểu.", instructionsEn: "Via the new expressway, delivers directly to resorts along Nguyen Dinh Chieu coastal strip." },
      { method: "Tàu hỏa du lịch SPT1/SPT2 từ Ga Sài Gòn", methodEn: "Tourist Train SPT1/SPT2 from Saigon Station", duration: "4 giờ", durationEn: "4 hours", estimatedCost: "180.000 - 260.000 VNĐ", estimatedCostEn: "$7 - $10 USD", instructions: "Khởi hành sáng sớm từ ga Sài Gòn đến ga Phan Thiết; bắt taxi 20 phút vào Mũi Né.", instructionsEn: "Morning train from Saigon Station to Phan Thiet Station; 20-min taxi into Mui Ne." },
    ],
    intercityConnections: [
      { toDestination: "Đà Lạt", toDestinationEn: "Da Lat", recommendedVehicle: "Xe khách qua Đèo Đại Ninh", recommendedVehicleEn: "Minivan via Dai Ninh Pass", travelTime: "4 giờ", travelTimeEn: "4 hours", costEstimate: "160.000 VNĐ", costEstimateEn: "$6.5 USD", notes: "Cung đường nối biển và hoa rất thơ mộng.", notesEn: "Scenic mountain pass linking the sand dunes to flower highlands." },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. SAFETY & HEALTH GUIDE SEED DATA
// ─────────────────────────────────────────────────────────────────────────────

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    number: "113",
    service: "Cảnh Sát / Công An",
    serviceEn: "Police",
    description: "Tiếp nhận tin báo khẩn cấp về an ninh trật tự, mất cắp, tai nạn giao thông và các sự vụ an ninh công cộng.",
    descriptionEn: "National police hotline for security emergencies, theft reports, traffic accidents, and crime.",
    badge: "An Ninh & Trật Tự",
  },
  {
    number: "114",
    service: "Cứu Hỏa & Cứu Nạn Cứu Hộ",
    serviceEn: "Fire & Rescue",
    description: "Ứng phó sự cố hỏa hoạn, cứu nạn cứu hộ thiên tai, sập đổ công trình, đuối nước và tai nạn mắc kẹt.",
    descriptionEn: "Emergency fire extinguishing, natural disaster rescue, building collapse, and water rescue.",
    badge: "Phòng Cháy & Cứu Hộ",
  },
  {
    number: "115",
    service: "Cấp Cứu Y Tế Khẩn Cấp",
    serviceEn: "Ambulance & Medical",
    description: "Điều động xe cứu thương và nhân viên y tế khẩn cấp tại các bệnh viện công lập trên toàn quốc.",
    descriptionEn: "Dispatches emergency ambulances and paramedic personnel from public hospitals nationwide.",
    badge: "Y Tế & Cứu Thương",
  },
  {
    number: "112",
    service: "Tìm Kiếm Cứu Nạn Quốc Gia",
    serviceEn: "National Search & Rescue",
    description: "Tổng đài điều phối cứu hộ quốc gia trong các tình huống bão lũ, tàu thuyền trôi dạt biển hoặc lạc trong rừng sâu.",
    descriptionEn: "National coordinating center for offshore maritime distress, severe floods, or wilderness rescue.",
    badge: "Tìm Kiếm & Cứu Nạn",
  },
  {
    number: "1800 1567",
    service: "Hỗ Trợ Khách Du Lịch Quốc Gia",
    serviceEn: "National Tourist Support Hotline",
    description: "Đường dây nóng của Cục Du lịch Quốc gia Việt Nam hỗ trợ giải quyết phản ánh về ép giá, lừa đảo hoặc khiếu nại dịch vụ.",
    descriptionEn: "Official Vietnam National Authority of Tourism hotline handling tourist grievances and service scams.",
    badge: "Hỗ Trợ Du Khách",
  },
];

export const ACTIVITY_SAFETY_GUIDES: ActivitySafety[] = [
  {
    id: "beach_sea",
    activityName: "Bơi Lội & Hoạt Động Biển Đảo",
    activityNameEn: "Beach Swimming & Island Watersports",
    icon: "Waves",
    applicableDestinations: ["phu-quoc", "con-dao", "da-nang", "ha-long", "mui-ne"],
    rules: [
      {
        rule: "Quan sát cờ cảnh báo bãi biển",
        ruleEn: "Observe Beach Safety Warning Flags",
        explanation: "Cờ đỏ hoặc cờ đen có nghĩa là cấm tắm biển tuyệt đối do sóng lớn hoặc dòng chảy nguy hiểm. Chỉ tắm ở khu vực có phao quây và nhân viên cứu hộ trực.",
        explanationEn: "Red or black flags signify strict swimming bans due to strong surf or hazardous rip currents. Only swim in buoy-zoned areas under lifeguard watch.",
      },
      {
        rule: "Cách thoát hiểm khỏi dòng chảy xa bờ (Rip Current)",
        ruleEn: "Escaping Dangerous Rip Currents",
        explanation: "Nếu bị cuốn ra xa, KHÔNG bơi ngược dòng vào bờ vì sẽ nhanh chóng kiệt sức. Hãy bơi song song với bờ biển cho đến khi thoát khỏi luồng nước xiết rồi mới bơi chéo vào bờ.",
        explanationEn: "Never swim directly against the current toward shore. Swim parallel to the beach until free of the narrow seaward flow, then angle back to land.",
      },
      {
        rule: "Mặc áo phao khi đi thuyền nan & lặn ngắm san hô",
        ruleEn: "Always Wear Life Vests on Boats & Snorkeling",
        explanation: "Bắt buộc cài khóa áo phao đúng quy cách trên mọi hành trình cano, thuyền kayak và khi bơi ngắm san hô.",
        explanationEn: "Fasten life jackets properly on all speedboats, wooden sampans, kayaks, and open-sea snorkeling tours.",
      },
    ],
    essentialGear: ["Áo phao đạt chuẩn", "Kem chống nắng an toàn cho rạn san hô (Reef-safe)", "Túi chống nước cho điện thoại", "Giày đi biển chống đá nhọn"],
    essentialGearEn: ["Approved life jacket", "Reef-safe sunscreen", "Waterproof dry bag for phone", "Water shoes against coral cuts"],
    emergencyAdvice: "Khi gặp sự cố đuối nước, giơ một tay lên cao vẫy liên tục và hô to 'CỨU TÔI VỚI' (hoặc 'HELP') để cứu hộ bãi biển kịp thời ứng cứu.",
    emergencyAdviceEn: "If in distress, raise one arm to signal continuously and shout 'HELP' (or 'CỨU TÔI VỚI') to attract immediate lifeguard attention.",
  },
  {
    id: "mountain_trekking",
    activityName: "Leo Núi & Trekking Rừng Nguyên Sinh",
    activityNameEn: "Mountain Trekking & Forest Hiking",
    icon: "Mountain",
    applicableDestinations: ["sa-pa", "ha-giang", "phong-nha"],
    rules: [
      {
        rule: "Luôn có hướng dẫn viên / Porter bản địa đi cùng",
        ruleEn: "Always Hire Local Guides or Porters",
        explanation: "Địa hình núi đá vôi và rừng nhiệt đới Việt Nam có nhiều lối mòn hiểm trở và dễ mất sóng điện thoại. Không bao giờ tự ý trekking một mình.",
        explanationEn: "Tropical rainforest trails and karst formations have complex paths with zero mobile signal. Never trek solo.",
      },
      {
        rule: "Tránh trekking trong mùa mưa lũ và bão",
        ruleEn: "Avoid Trekking During Heavy Rains",
        explanation: "Mưa lớn gây lũ quét đột ngột ở suối và sạt trượt đất đá nguy hiểm trên các triền dốc cao.",
        explanationEn: "Heavy rainfall triggers flash floods in ravines and severe mudslides on steep clay slopes.",
      },
      {
        rule: "Phòng tránh côn trùng và rắn độc",
        ruleEn: "Protect Against Insects & Snakes",
        explanation: "Mặc quần áo dài tay, xịt thuốc chống vắt và muỗi, đi ủng hoặc tất cao cổ khi lội qua vùng ẩm ướt.",
        explanationEn: "Wear long sleeves, apply leech/mosquito repellent, and tuck pants into high socks when traversing humid jungle floors.",
      },
    ],
    essentialGear: ["Giày leo núi có gai bám đá dốc", "Gậy leo núi chuyên dụng", "Đèn pin đội đầu & pin dự phòng", "Bộ sơ cứu y tế cá nhân", "Áo mưa bộ tiện lợi"],
    essentialGearEn: ["Lugged traction hiking boots", "Trekking poles", "Headlamp & power bank", "Personal first-aid kit", "Breathable rain poncho"],
    emergencyAdvice: "Nếu bị lạc, giữ nguyên vị trí, giữ ấm cơ thể, đốt lửa nhỏ tạo khói định vị ban ngày hoặc bật đèn pin nhấp nháy phát tín hiệu SOS ban đêm.",
    emergencyAdviceEn: "If lost, stay in place, maintain warmth, light a smoke fire by day, or flash SOS signals with your headlamp by night.",
  },
  {
    id: "motorbiking",
    activityName: "Lái Xe Máy Tự Lái (Hà Giang Loop / Đèo Dốc)",
    activityNameEn: "Motorbike Riding (Ha Giang Loop & Mountain Passes)",
    icon: "Bike",
    applicableDestinations: ["ha-giang", "da-nang", "da-lat"],
    rules: [
      {
        rule: "Bắt buộc có Giấy phép lái xe quốc tế (IDP 1968)",
        ruleEn: "Mandatory 1968 Convention IDP & National License",
        explanation: "Luật pháp Việt Nam chỉ công nhận Giấy phép lái xe quốc tế IDP theo Công ước Vienna 1968 đi kèm bằng lái gốc. Bằng lái xe nước ngoài không có IDP là vi phạm pháp luật và không được bảo hiểm chi trả.",
        explanationEn: "Vietnam strictly recognizes the 1968 Vienna Convention IDP alongside your home driving license. Driving without it is illegal and invalidates medical insurance.",
      },
      {
        rule: "Đội mũ bảo hiểm chuẩn 3/4 hoặc Full-face",
        ruleEn: "Wear 3/4 or Full-Face Certified Helmets",
        explanation: "Tuyệt đối không dùng mũ bảo hiểm thời trang mỏng manh. Đội mũ bảo hiểm đạt chuẩn bảo vệ cằm và kính chắn gió chống bụi đá.",
        explanationEn: "Never use cheap novelty half-helmets. Use certified 3/4 or full-face helmets with visors to guard against road debris.",
      },
      {
        rule: "Tuân thủ nghiêm ngặt nồng độ cồn bằng 0 tuyệt đối",
        ruleEn: "Strict Zero Blood Alcohol Concentration (Zero BAC)",
        explanation: "Việt Nam áp dụng mức phạt rất nặng và tịch thu phương tiện đối với bất kỳ nồng độ cồn nào trong máu khi điều khiển xe cơ giới.",
        explanationEn: "Vietnam enforces zero-tolerance alcohol laws (BAC = 0.00%). Violators face heavy fines, vehicle impoundment, and legal liability.",
      },
    ],
    essentialGear: ["Mũ bảo hiểm đạt chuẩn ECE/DOT", "Giáp bảo hộ tay chân", "Găng tay có gù bảo vệ", "Áo mưa bộ phản quang", "SIM 4G có bản đồ offline"],
    essentialGearEn: ["Certified helmet (ECE/DOT)", "Knee and elbow protective pads", "Grip gloves", "Hi-vis rain suit", "Offline GPS maps downloaded"],
    emergencyAdvice: "Nếu chưa tự tin với kỹ năng lái xe đường đèo dốc hiểm trở, hãy thuê dịch vụ 'Easy Rider' (tài xế bản địa chở phía sau) để tận hưởng cảnh đẹp an toàn 100%.",
    emergencyAdviceEn: "If inexperienced with steep switchbacks, hire an 'Easy Rider' (licensed local driver) to sit pillion and enjoy the vistas with total peace of mind.",
  },
];

export const INSURANCE_ADVISORY: InsuranceAdvisory = {
  title: "Tư Vấn Bảo Hiểm Du Lịch Quốc Tế",
  titleEn: "Travel Insurance Advisory",
  recommendation:
    "STAR Travels khuyến nghị mạnh mẽ mọi du khách quốc tế và nội địa nên trang bị gói bảo hiểm du lịch toàn diện trước khi khởi hành. Chi phí y tế khẩn cấp hoặc sơ tán y tế hàng không có thể lên tới hàng chục nghìn USD nếu không có bảo hiểm bảo lãnh.",
  recommendationEn:
    "STAR Travels strongly advises all travelers to purchase comprehensive travel insurance prior to departure. Emergency medical treatment and air evacuation costs can reach tens of thousands of dollars without insurer backing.",
  keyCoverages: [
    {
      item: "Chi phí y tế & viện phí khẩn cấp (Emergency Medical)",
      itemEn: "Emergency Medical Expenses",
      whyNeeded: "Chi trả viện phí tại các bệnh viện quốc tế uy tín (như Vinmec, FV Hospital, Raffles Medical) ở Việt Nam.",
      whyNeededEn: "Covers inpatient and outpatient bills at premium international hospitals (Vinmec, FV Hospital, Family Medical).",
    },
    {
      item: "Vận chuyển cấp cứu & hồi hương y tế (Emergency Evacuation)",
      itemEn: "Emergency Medical Evacuation",
      whyNeeded: "Cực kỳ quan trọng khi đi trekking hoặc khám phá các hòn đảo xa (Côn Đảo, vùng cao Hà Giang) cần trực thăng hoặc chuyên cơ cấp cứu về thành phố lớn.",
      whyNeededEn: "Crucial when trekking or exploring remote islands where emergency airlift to Hanoi or HCMC may be required.",
    },
    {
      item: "Hủy hoặc hoãn chuyến bay (Trip Cancellation & Delay)",
      itemEn: "Trip Cancellation & Flight Delays",
      whyNeeded: "Bồi thường tổn thất tài chính khi chuyến đi bị gián đoạn do bão nhiệt đới mùa hè hoặc lý do sức khỏe đột xuất.",
      whyNeededEn: "Reimburses prepaid non-refundable expenses when flights or cruises are suspended by seasonal typhoons.",
    },
    {
      item: "Bảo hiểm thể thao mạo hiểm (Adventure Sports Rider)",
      itemEn: "Adventure Sports Rider",
      whyNeeded: "Đảm bảo hợp đồng bảo hiểm có bao gồm hoạt động lặn biển (scuba diving), leo núi trên 2.000m hoặc lái xe máy trên 50cc.",
      whyNeededEn: "Ensure your policy rider specifically covers scuba diving, hiking above 2,000m, or riding motorbikes over 50cc.",
    },
  ],
  tips: [
    "Lưu số điện thoại đường dây nóng hỗ trợ khẩn cấp quốc tế (24/7 Assistance Hotline) của công ty bảo hiểm vào danh bạ điện thoại.",
    "Luôn giữ lại toàn bộ hóa đơn y tế, biên bản cảnh sát (nếu có va chạm), và giấy chứng nhận của hãng hàng không để nộp hồ sơ yêu cầu bồi thường.",
    "STAR Travels không trực tiếp bán bảo hiểm và không đóng vai trò đại lý bảo hiểm; chúng tôi cung cấp thông tin này vì sự an toàn tối thượng của du khách.",
  ],
  tipsEn: [
    "Save your insurer's 24/7 global emergency hotline number directly into your smartphone contacts.",
    "Retain all original hospital receipts, medical discharge reports, and airline delay certificates for claim reimbursement.",
    "STAR Travels does not sell insurance directly nor act as an underwriter; this advisory is purely for traveler safety.",
  ],
  disclaimer:
    "STAR Travels là nền tảng tra cứu thông tin và cung cấp dịch vụ du lịch, không cung cấp bảo hiểm trực tiếp. Vui lòng tham khảo các nhà cung cấp bảo hiểm quốc tế uy tín như Allianz, World Nomads, AIG, Bảo Việt hoặc đơn vị bảo hiểm tại nước sở tại của bạn.",
  disclaimerEn:
    "STAR Travels is a travel discovery platform and does not sell insurance policies directly. Please consult reputable global underwriters such as World Nomads, Allianz, SafetyWing, or your home country insurance broker.",
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. CULTURE & ETIQUETTE GUIDE SEED DATA
// ─────────────────────────────────────────────────────────────────────────────

export const ETIQUETTE_CATEGORIES: EtiquetteCategory[] = [
  {
    id: "temple_dress",
    title: "Trang Phục Khi Vào Đền, Chùa & Di Tích Tôn Giáo",
    titleEn: "Temple, Pagoda & Sacred Heritage Dress Code",
    icon: "Landmark",
    rules: [
      {
        do: "Mặc quần áo che kín vai và dài quá đầu gối (quần dài, váy dài qua gối, áo có tay).",
        doEn: "Wear clothing covering shoulders and extending below knees (long trousers, maxi skirts, sleeved shirts).",
        dont: "Mặc áo ba lỗ, áo sát nách, quần đùi ngắn, váy ngắn hoặc đồ bó sát xuyên thấu.",
        dontEn: "Do not wear tank tops, sleeveless tops, short shorts, mini skirts, or sheer revealing fabrics.",
        context: "Áp dụng tại mọi chùa Phật giáo, đền thờ, nhà thờ Công giáo, lăng tẩm hoàng gia Huế và Lăng Chủ tịch Hồ Chí Minh.",
        contextEn: "Enforced at all Buddhist pagodas, temples, churches, Hue royal tombs, and the Ho Chi Minh Mausoleum.",
      },
      {
        do: "Bỏ mũ nón, kính râm và tháo giày dép tại cửa chính điện nơi có biển hướng dẫn.",
        doEn: "Remove hats, sunglasses, and take off shoes at main prayer hall thresholds where indicated.",
        dont: "Đi giày dép bước thẳng lên chiếu thờ hoặc đứng quay lưng chỉ trỏ vào tượng Phật.",
        dontEn: "Do not step with footwear onto prayer mats or turn your back disrespectfully while gesturing at Buddha statues.",
        context: "Không gian chính điện là nơi thanh tịnh phục vụ cầu nguyện và lễ bái của Phật tử.",
        contextEn: "Inner sanctuaries are sacred contemplative prayer areas for local worshippers.",
      },
    ],
    practicalAdvice: [
      "Luôn mang theo một chiếc khăn choàng nhẹ (scarf/sarong) trong balo để quấn che vai hoặc chân khi cần vào chùa đột xuất.",
      "Đi lại nhẹ nhàng, nói chuyện nhỏ nhẹ và tắt chuông điện thoại di động khi bước vào chánh điện.",
    ],
    practicalAdviceEn: [
      "Keep a lightweight scarf or sarong in your daypack to quickly cover shoulders or knees before entering sacred sites.",
      "Walk gently, speak in lowered tones, and silence your mobile phone inside prayer sanctuaries.",
    ],
  },
  {
    id: "communication",
    title: "Văn Hoá Giao Tiếp & Cách Xưng Hô",
    titleEn: "Communication & Social Greetings",
    icon: "MessageCircle",
    rules: [
      {
        do: "Chào hỏi kèm theo nụ cười thân thiện; người nhỏ tuổi hơi cúi đầu nhẹ để thể hiện sự tôn trọng.",
        doEn: "Greet with a warm smile; slightly bow your head toward elders to convey respect.",
        dont: "Gọi lớn tiếng hoặc vẫy tay bằng cách lật ngửa bàn tay và ngoắc một ngón tay (hành vi này bị coi là thiếu tôn trọng).",
        dontEn: "Do not yell or beckon with an upturned single finger (considered rude, akin to calling an animal).",
        context: "Khi muốn gọi ai đó lại gần, hãy úp lòng bàn tay xuống và nhẹ nhàng vẫy các ngón tay.",
        contextEn: "To beckon someone, face your palm downward and gently wave your fingers inward.",
      },
      {
        do: "Nói lời cảm ơn ('Cảm ơn') và từ chối lịch sự ('Dạ thôi, con/tôi cảm ơn') kèm theo nụ cười khi không có nhu cầu mua hàng.",
        doEn: "Say thank you ('Cảm ơn') and decline politely ('No, thank you') with a smile if not interested in buying.",
        dont: "Tỏ thái độ cáu gắt hoặc xua đuổi gay gắt người bán hàng rong.",
        dontEn: "Do not show anger or harshly shoo away persistent street vendors.",
        context: "Người bán rong thường mưu sinh vất vả; một cái lắc đầu nhẹ nhàng kèm nụ cười sẽ giải quyết lịch sự hầu hết tình huống.",
        contextEn: "Street vendors work hard for their livelihood; a polite, firm smile and shake of the head is universally understood.",
      },
    ],
    practicalAdvice: [
      "Học một số từ tiếng Việt thông dụng: 'Xin chào' (Hello), 'Cảm ơn' (Thank you), 'Bao nhiêu tiền?' (How much?). Người Việt rất quý du khách nỗ lực nói tiếng bản địa.",
      "Người Việt Nam coi trọng sự hòa nhã và giữ thể diện ('saving face'); tránh tranh cãi gay gắt nơi đông người.",
    ],
    practicalAdviceEn: [
      "Learn essential Vietnamese phrases: 'Xin chao' (Hello), 'Cam on' (Thank you), 'Bao nhieu?' (How much?). Locals love when travelers try.",
      "Vietnamese culture emphasizes social harmony and 'saving face'; avoid aggressive public confrontation.",
    ],
  },
  {
    id: "bargaining",
    title: "Nghệ Thuật Mặc Cả Văn Minh Khi Mua Sắm",
    titleEn: "Bargaining Etiquette at Traditional Markets",
    icon: "ShoppingBag",
    rules: [
      {
        do: "Mặc cả vui vẻ tại các khu chợ truyền thống, chợ đêm, quầy lưu niệm vỉa hè (thường giảm khoảng 15% - 30% giá khởi điểm).",
        doEn: "Bargain with good humor at street markets, night markets, and outdoor souvenir stalls (typically 15% - 30% off initial quotes).",
        dont: "Mặc cả tại các cửa hàng tiện lợi, siêu thị, nhà thuốc, nhà hàng có thực đơn niêm yết giá rõ ràng.",
        dontEn: "Never attempt to bargain at convenience stores, supermarkets, pharmacies, or restaurants with printed menus.",
        context: "Mặc cả ở chợ là một nét giao lưu văn hóa, hãy xem đây là cuộc trò chuyện thân thiện hơn là cuộc chiến về giá.",
        contextEn: "Market bargaining is a social dance; treat it as friendly interaction rather than a tense monetary dispute.",
      },
      {
        do: "Hỏi giá và thỏa thuận rõ ràng TRƯỚC KHI sử dụng dịch vụ (xe ôm truyền thống, thuyền nan, chụp ảnh với gánh hàng rong).",
        doEn: "Agree on the exact price BEFORE boarding traditional cyclo/xe om, boat rides, or posing with photo props.",
        dont: "Mặc cả với 'người mở hàng' (vị khách đầu tiên trong ngày vào sáng sớm) nếu bạn không thực sự có ý định mua.",
        dontEn: "Do not haggle relentlessly with the first customer of the day ('mo hang') if you do not genuinely intend to buy.",
        context: "Tiểu thương Việt Nam rất coi trọng vía người mở hàng đầu ngày để việc buôn bán được suôn sẻ cả ngày.",
        contextEn: "Vendors place spiritual importance on their morning first sale ('mo hang') setting the tone for the day's fortune.",
      },
    ],
    practicalAdvice: [
      "Nguyên tắc vàng: Nếu đã đồng ý với mức giá người bán đưa ra sau khi mặc cả, bạn nên hoàn tất việc mua hàng.",
      "Chiêu thức 'bước đi' (Walking away): Nếu chưa hài lòng với mức giá, hãy mỉm cười nói cảm ơn và bước đi từ từ; nhiều khi người bán sẽ gọi bạn lại với giá hợp lý.",
    ],
    practicalAdviceEn: [
      "Golden rule: Once the seller accepts your counter-offer, honor the purchase with a smile.",
      "The 'walk-away' technique: If the price feels high, smile, thank them, and walk away slowly; vendors often call you back with a fairer compromise.",
    ],
  },
  {
    id: "tipping",
    title: "Văn Hoá Tiền Tip (Tiền Típ) Tại Việt Nam",
    titleEn: "Tipping Culture & Norms in Vietnam",
    icon: "Coins",
    rules: [
      {
        do: "Để lại tiền tip (khoảng 5% - 10% hóa đơn) tại các nhà hàng cao cấp, dịch vụ spa trị liệu (50.000 - 100.000 VNĐ) hoặc cho hướng dẫn viên du lịch và tài xế xe riêng.",
        doEn: "Leave tips (5% - 10% of bill) at upscale dining, spa massage therapists (50k - 100k VND), and for private tour guides/drivers.",
        dont: "Cảm thấy áp lực phải tip tại các quán ăn vỉa hè bình dân, quán phở gia đình hay khi đi taxi công nghệ Grab.",
        dontEn: "Feel obligated to tip at casual street food stalls, family noodle eateries, or regular ride-hailing Grab rides.",
        context: "Tiền tip không bắt buộc trong văn hóa Việt Nam nhưng là sự ghi nhận rất được trân trọng đối với dịch vụ tận tâm.",
        contextEn: "Tipping is not customary or mandatory in traditional Vietnam, but is deeply appreciated for attentive personal service.",
      },
    ],
    practicalAdvice: [
      "Kiểm tra hóa đơn: Một số nhà hàng cao cấp đã tính sẵn 5% phí phục vụ (Service Charge) và 8-10% thuế VAT; trong trường hợp này tip thêm là tùy tâm.",
      "Làm tròn số tiền khi đi taxi hoặc xe ôm công nghệ (ví dụ cuốc xe 43.000 VNĐ đưa 50.000 VNĐ và tặng tiền lẻ còn lại).",
    ],
    practicalAdviceEn: [
      "Check your bill: Upscale venues may already include a 5% Service Charge and 8-10% VAT; additional tipping is strictly optional.",
      "Round up small change for taxi and Grab drivers (e.g., pay 50k VND on a 43k VND fare and let them keep the difference).",
    ],
  },
];

export const CULTURAL_TABOOS: CulturalTaboo[] = [
  {
    taboo: "Chạm hoặc xoa đầu người khác (kể cả trẻ em)",
    tabooEn: "Touching Anyone's Head (Including Children)",
    reason: "Theo quan niệm phương Đông, đầu là bộ phận thiêng liêng nhất của cơ thể, nơi ngự trị của linh hồn.",
    reasonEn: "In Vietnamese spiritual belief, the head is the highest and most sacred part of the human spirit.",
    howToRemedy: "Nếu lỡ tay chạm vào, hãy mỉm cười chân thành và nói lời xin lỗi ngay lập tức.",
    howToRemedyEn: "If done inadvertently, offer an immediate, polite apology with a gentle smile.",
  },
  {
    taboo: "Cắm đũa thẳng đứng vào bát cơm",
    tabooEn: "Sticking Chopsticks Vertically into a Rice Bowl",
    reason: "Hành động này trông giống như hai que hương cắm vào bát nhang trong đám tang, bị coi là mang lại điềm gở xui xẻo.",
    reasonEn: "This mimics incense sticks burning in an ancestral funeral urn, traditionally associated with death and bad omens.",
    howToRemedy: "Luôn đặt đũa ngang miệng bát hoặc gác lên giá gác đũa khi tạm dừng ăn.",
    howToRemedyEn: "Always rest chopsticks horizontally across the bowl rim or on the designated ceramic chopstick rest.",
  },
  {
    taboo: "Chỉ trỏ người khác bằng một ngón tay",
    tabooEn: "Pointing at People with a Single Finger",
    reason: "Bị xem là hành vi khiêu khích, buộc tội hoặc thiếu tôn trọng người đối diện.",
    reasonEn: "Perceived as accusatory, confrontational, and lacking elementary courtesy.",
    howToRemedy: "Dùng cả bàn tay ngửa hướng về phía người hoặc vật cần giới thiệu.",
    howToRemedyEn: "Use your entire open hand with palm facing slightly upward to gesture toward individuals.",
  },
  {
    taboo: "Thể hiện tình cảm quá thân mật nơi công cộng",
    tabooEn: "Excessive Public Displays of Affection (PDA)",
    reason: "Nắm tay là bình thường, nhưng ôm hôn nồng nhiệt nơi công cộng (đặc biệt gần đền chùa, trường học) bị coi là thiếu khiêm nhường.",
    reasonEn: "Holding hands is fine, but passionate kissing in public—especially near temples or residential neighborhoods—is considered distasteful.",
    howToRemedy: "Giữ chừng mực lịch thiệp ở chốn công cộng và nơi linh thiêng.",
    howToRemedyEn: "Exercise modest restraint in communal spaces and religious grounds.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 7. CURRENCY & COST GUIDE SEED DATA
// ─────────────────────────────────────────────────────────────────────────────

export const CURRENCY_DENOMINATIONS: CurrencyDenomination[] = [
  {
    value: 500000,
    formatted: "500.000 VNĐ",
    color: "Xanh lơ sẫm (Dark Cyan/Blue)",
    material: "Polymer",
    frontImageFeature: "Chân dung Chủ tịch Hồ Chí Minh & Quốc huy",
    frontImageFeatureEn: "Portrait of President Ho Chi Minh & National Emblem",
    backImageFeature: "Nhà tranh quê hương Bác Hồ tại Kim Liên, Nam Đàn, Nghệ An",
    backImageFeatureEn: "Ho Chi Minh's ancestral thatch cottage in Nam Dan, Nghe An",
    commonUsage: "Thanh toán khách sạn, tour du lịch, mua sắm lớn hoặc hóa đơn nhà hàng.",
    commonUsageEn: "Hotel bookings, tour payments, major shopping, and upscale restaurant dining.",
    warning: "CẢNH BÁO DỄ NHẦM: Tờ 500.000đ và tờ 20.000đ đều có màu xanh lam! Luôn đếm kỹ số lượng số 0 (500k có 5 số 0, 20k có 4 số 0) trước khi đưa tiền.",
    warningEn: "HIGH CONFUSION WARNING: The 500,000 VND and 20,000 VND banknotes share a similar blue hue! Always double-check the zeros (500k has five zeros, 20k has four).",
  },
  {
    value: 200000,
    formatted: "200.000 VNĐ",
    color: "Đỏ gạch / Nâu đỏ (Reddish Brown)",
    material: "Polymer",
    frontImageFeature: "Chân dung Chủ tịch Hồ Chí Minh",
    frontImageFeatureEn: "Portrait of President Ho Chi Minh",
    backImageFeature: "Hòn Đỉnh Hương (Vịnh Hạ Long, Quảng Ninh)",
    backImageFeatureEn: "Dinh Huong Incense Burner Islet in Ha Long Bay",
    commonUsage: "Mệnh giá phổ biến nhất khi rút tiền tại cây ATM; dùng cho chi tiêu hàng ngày.",
    commonUsageEn: "Most common banknote dispensed by ATMs; staple for daily spending.",
  },
  {
    value: 100000,
    formatted: "100.000 VNĐ",
    color: "Xanh lá cây (Dark Green)",
    material: "Polymer",
    frontImageFeature: "Chân dung Chủ tịch Hồ Chí Minh",
    frontImageFeatureEn: "Portrait of President Ho Chi Minh",
    backImageFeature: "Khuê Văn Các — Văn Miếu Quốc Tử Giám (Hà Nội)",
    backImageFeatureEn: "Khue Van Cac Pavilion at the Temple of Literature (Hanoi)",
    commonUsage: "Rất tiện dụng khi đi taxi, ăn uống gia đình, mua quà lưu niệm.",
    commonUsageEn: "Handy for taxi fares, casual dining bills, and local market shopping.",
  },
  {
    value: 50000,
    formatted: "50.000 VNĐ",
    color: "Hồng tím (Pinkish Purple)",
    material: "Polymer",
    frontImageFeature: "Chân dung Chủ tịch Hồ Chí Minh",
    frontImageFeatureEn: "Portrait of President Ho Chi Minh",
    backImageFeature: "Nghênh Lương Đình và Phu Văn Lâu bên sông Hương (Huế)",
    backImageFeatureEn: "Nghenh Luong Dinh & Phu Van Lau pavilions along the Perfume River (Hue)",
    commonUsage: "Mệnh giá lý tưởng nhất để ăn một bát phở truyền thống hoặc uống cà phê đặc sản.",
    commonUsageEn: "Ideal denomination to buy a bowl of authentic Pho or specialty drip coffee.",
  },
  {
    value: 20000,
    formatted: "20.000 VNĐ",
    color: "Xanh lơ nhạt (Light Blue)",
    material: "Polymer",
    frontImageFeature: "Chân dung Chủ tịch Hồ Chí Minh",
    frontImageFeatureEn: "Portrait of President Ho Chi Minh",
    backImageFeature: "Chùa Cầu — Biểu tượng Phố cổ Hội An (Quảng Nam)",
    backImageFeatureEn: "Japanese Covered Bridge — Heritage icon of Hoi An",
    commonUsage: "Mua bánh mì, dừa tươi, nước suối, gửi xe máy.",
    commonUsageEn: "Buying Banh Mi, fresh coconuts, bottled water, or parking fees.",
    warning: "Dễ nhầm với tờ 500.000đ khi thanh toán trong điều kiện ánh sáng yếu buổi tối.",
    warningEn: "Easily mistaken for the 500,000 VND note in low-light evening environments.",
  },
  {
    value: 10000,
    formatted: "10.000 VNĐ",
    color: "Vàng nâu (Yellowish Brown)",
    material: "Polymer",
    frontImageFeature: "Chân dung Chủ tịch Hồ Chí Minh",
    frontImageFeatureEn: "Portrait of President Ho Chi Minh",
    backImageFeature: "Mỏ dầu Bạch Hổ ngoài khơi thềm lục địa Việt Nam",
    backImageFeatureEn: "Bach Ho offshore oil rig on Vietnam's continental shelf",
    commonUsage: "Tiền lẻ trả lại, mua trà đá vỉa hè, tiền tip nhỏ.",
    commonUsageEn: "Small change, iced street tea (tra da), small tips.",
  },
];

export const EXCHANGE_LOCATIONS: ExchangeLocation[] = [
  {
    type: "Tiệm Vàng Được Cấp Phép (Licensed Gold Shops)",
    typeEn: "Licensed Gold Jewelry Shops",
    locations: "Phố Hà Trung (Hà Nội) & Khu vực quanh Chợ Bến Thành / Chợ Lớn (TP.HCM)",
    locationsEn: "Ha Trung Street (Hanoi) & streets around Ben Thanh Market (HCMC)",
    exchangeRateRating: "best",
    pros: [
      "Tỷ giá ngoại tệ tiền mặt (USD, EUR, GBP, AUD, JPY) thường tốt nhất thị trường.",
      "Thủ tục nhanh gọn trong 2-3 phút, không cần xếp hàng hay điền biểu mẫu phức tạp.",
    ],
    prosEn: [
      "Often offers the most competitive cash exchange rates for USD, EUR, GBP, AUD, and JPY.",
      "Instant 2-minute transaction with no queues or lengthy banking paperwork.",
    ],
    cons: [
      "Cần chọn tiệm vàng lớn, có uy tín và giấy phép trao đổi ngoại tệ hợp pháp.",
      "Tờ tiền USD đem đổi phải mới, phẳng phiu, không bị rách, ố vàng hay có vết mực.",
    ],
    consEn: [
      "Must select reputable, licensed gold dealers.",
      "Foreign cash bills must be crisp, clean, with zero tears, stamps, or ink marks (especially USD).",
    ],
    tips: [
      "Các tờ 100 USD và 50 USD mới (sê-ri sau năm 2013) có tỷ giá quy đổi cao hơn các tờ mệnh giá nhỏ $10, $20.",
      "Đếm kỹ tiền mặt tại quầy trước khi rời đi.",
    ],
    tipsEn: [
      "Crisp $100 and $50 notes (series 2013+) yield superior exchange rates compared to small bills ($10, $20).",
      "Always count your Vietnamese dong cash thoroughly at the counter before stepping away.",
    ],
  },
  {
    type: "Ngân Hàng Thương Mại (Commercial Banks)",
    typeEn: "Commercial Bank Branches",
    locations: "Vietcombank, BIDV, Techcombank, VietinBank tại các trung tâm thành phố",
    locationsEn: "Vietcombank, BIDV, Techcombank, VietinBank branches across all city centers",
    exchangeRateRating: "moderate",
    pros: [
      "Độ an toàn và pháp lý tuyệt đối 100%, có biên lai giao dịch niêm yết rõ ràng.",
      "Có thể đổi được đa dạng các đồng tiền ít phổ biến hơn.",
    ],
    prosEn: [
      "100% legal security with official printed bank transaction receipts.",
      "Accepts a broader array of less common currencies.",
    ],
    cons: [
      "Bắt buộc xuất trình hộ chiếu gốc còn hạn và thị thực nhập cảnh hợp lệ.",
      "Phải lấy số xếp hàng chờ đợi; ngân hàng không làm việc vào chiều Thứ Bảy và Chủ Nhật.",
    ],
    consEn: [
      "Must present original passport with a valid entry visa stamp.",
      "Requires taking a queue ticket; closed on Saturday afternoons and Sundays.",
    ],
    tips: [
      "Nên đến vào sáng các ngày trong tuần (8h30 - 10h30) để được phục vụ nhanh nhất.",
    ],
    tipsEn: [
      "Visit on weekday mornings (8:30 - 10:30 AM) to avoid long lunchtime waiting lines.",
    ],
  },
  {
    type: "Quầy Đổi Ngoại Tệ Sân Bay (Airport Exchange Counters)",
    typeEn: "International Airport Counters",
    locations: "Sảnh đến ga quốc tế Sân bay Nội Bài (Hà Nội) & Tân Sơn Nhất (TP.HCM)",
    locationsEn: "Arrivals halls at Noi Bai (Hanoi) & Tan Son Nhat (HCMC) International Terminals",
    exchangeRateRating: "fair",
    pros: [
      "Mở cửa 24/7 theo lịch bay quốc tế; đổi tiền ngay khi vừa hạ cánh để mua SIM và trả taxi.",
      "Nằm ngay trong khu vực kiểm soát an ninh sân bay.",
    ],
    prosEn: [
      "Operates 24/7 matching international arrivals; convenient for immediate SIM & taxi cash.",
      "Located securely within the arrival customs concourse.",
    ],
    cons: [
      "Tỷ giá thường thấp hơn từ 2% - 4% so với ngân hàng hoặc tiệm vàng trong thành phố.",
    ],
    consEn: [
      "Exchange rates are typically 2% to 4% lower than downtown banks or city gold shops.",
    ],
    tips: [
      "Chỉ nên đổi một lượng nhỏ khoảng 50 - 100 USD tại sân bay để chi tiêu ban đầu, phần còn lại đổi trong thành phố.",
    ],
    tipsEn: [
      "Only exchange a modest sum ($50 - $100 USD) at the airport for transit needs; exchange the rest downtown.",
    ],
  },
];

export const DAILY_BUDGET_TIERS: DailyBudgetTier[] = [
  {
    tier: "budget",
    title: "Tiết Kiệm (Backpacker / Phượt Thủ)",
    titleEn: "Budget / Backpacker",
    rangeVnd: "400.000 — 750.000 VNĐ / ngày",
    rangeUsd: "$16 — $30 USD / day",
    breakdown: {
      food: "120.000 - 180.000 VNĐ (Phở, bánh mì, cơm tấm, bún chả vỉa hè, trà đá)",
      foodEn: "$5 - $7 USD (Street food Pho, Banh Mi, Bun Cha, Com Tam, iced tea)",
      transport: "80.000 - 150.000 VNĐ (Xe buýt công cộng hoặc thuê xe máy chung xăng)",
      transportEn: "$3 - $6 USD (Public buses or shared motorbike rental + fuel)",
      stay: "150.000 - 300.000 VNĐ (Giường tầng hostel dorm hoặc homestay bình dân)",
      stayEn: "$6 - $12 USD (Clean hostel dorm bed or budget village homestay)",
      activities: "50.000 - 120.000 VNĐ (Vé tham quan di tích lịch sử, bảo tàng)",
      activitiesEn: "$2 - $5 USD (Museum admissions and heritage park entry tickets)",
    },
    recommendedFor: "Khách du lịch tự túc trẻ tuổi, du khách đi một mình hoặc trải nghiệm dài ngày.",
    recommendedForEn: "Solo backpackers, young independent travelers, and extended gap-year journeys.",
  },
  {
    tier: "standard",
    title: "Tiêu Chuẩn (Thoải Mái / Gia Đình)",
    titleEn: "Standard / Mid-Range Comfort",
    rangeVnd: "1.200.000 — 2.500.000 VNĐ / ngày",
    rangeUsd: "$48 — $100 USD / day",
    breakdown: {
      food: "350.000 - 650.000 VNĐ (Nhà hàng máy lạnh, hải sản tươi, cà phê rooftop)",
      foodEn: "$14 - $26 USD (Air-conditioned restaurants, fresh seafood, rooftop cafes)",
      transport: "200.000 - 400.000 VNĐ (Taxi công nghệ Grab, xe limousine liên tỉnh)",
      transportEn: "$8 - $16 USD (Grab rides, intercity shared limousine vans)",
      stay: "600.000 - 1.300.000 VNĐ (Khách sạn boutique 3-4 sao hoặc căn hộ dịch vụ)",
      stayEn: "$24 - $52 USD (3 to 4-star boutique hotel room or serviced apartment)",
      activities: "150.000 - 350.000 VNĐ (Thuyền nan Tràng An, tour làng nghề, bảo tàng)",
      activitiesEn: "$6 - $14 USD (Trang An boat tickets, craft village excursions)",
    },
    recommendedFor: "Cặp đôi, gia đình nhỏ, người thích du lịch thoải mái và dịch vụ chu đáo.",
    recommendedForEn: "Couples, small families, and vacationers seeking comfort with great local flair.",
  },
  {
    tier: "luxury",
    title: "Cao Cấp (Nghỉ Dưỡng Thượng Lưu)",
    titleEn: "Luxury & Fine Living",
    rangeVnd: "4.500.000 — 12.000.000+ VNĐ / ngày",
    rangeUsd: "$180 — $480+ USD / day",
    breakdown: {
      food: "1.500.000 - 3.500.000 VNĐ (Nhà hàng Michelin Guide, ẩm thực fine dining, cocktail bar cao cấp)",
      foodEn: "$60 - $140 USD (Michelin Guide dining, tasting menus, craft cocktail lounges)",
      transport: "800.000 - 2.000.000 VNĐ (Thuê xe riêng có tài xế phục vụ 24/7, du thuyền)",
      transportEn: "$32 - $80 USD (Private chauffeured car for full day, private yacht charter)",
      stay: "2.500.000 - 7.000.000+ VNĐ (Resort 5 sao hướng biển, biệt thự villa có hồ bơi riêng)",
      stayEn: "$100 - $280+ USD (5-star beachfront resort, private pool heritage villa)",
      activities: "800.000 - 2.500.000 VNĐ (Vé cáp treo Fansipan/Bà Nà, spa cao cấp, tour trực thăng)",
      activitiesEn: "$32 - $100 USD (VIP cable cars, holistic spa therapy, private cave tours)",
    },
    recommendedFor: "Tuần trăng mật, khách nghỉ dưỡng cao cấp, doanh nhân và trải nghiệm độc bản.",
    recommendedForEn: "Honeymooners, luxury resort lovers, corporate retreats, and bespoke experiential travelers.",
  },
];

export const PAYMENT_METHODS: PaymentMethodGuide[] = [
  {
    method: "Tiền Mặt (Cash - VNĐ)",
    methodEn: "Cash (VND)",
    acceptanceLevel: "widely_accepted",
    whereToUse: ["Quán ăn đường phố, gánh hàng rong", "Chợ truyền thống, mua quà lưu niệm vỉa hè", "Tiền tip, phí gửi xe máy", "Các bản làng vùng cao Tây Bắc, Tây Nguyên"],
    whereToUseEn: ["Street food vendors and food carts", "Traditional markets & souvenir stalls", "Tips and motorbike parking fees", "Remote ethnic villages and mountain hamlets"],
    tips: [
      "Luôn giữ trong ví một ít tiền lẻ mệnh giá 20.000đ, 50.000đ và 100.000đ.",
      "Người bán hàng rong buổi sáng có thể không có đủ tiền lẻ để trả lại tờ 500.000đ.",
    ],
    tipsEn: [
      "Always carry smaller banknotes (20k, 50k, 100k VND) in your wallet.",
      "Street vendors may not have sufficient change for a 500,000 VND note early in the morning.",
    ],
  },
  {
    method: "Thẻ Quốc Tế (Visa / Mastercard / Amex)",
    methodEn: "International Cards (Visa / Mastercard / Amex)",
    acceptanceLevel: "moderate",
    whereToUse: ["Khách sạn, khu nghỉ dưỡng, căn hộ dịch vụ", "Nhà hàng trung cấp & cao cấp", "Trung tâm thương mại, siêu thị lớn", "Các điểm bán vé tham quan du lịch chính thức"],
    whereToUseEn: ["Hotels, luxury resorts, serviced apartments", "Mid-range and upscale restaurants", "Shopping malls, modern supermarkets", "Official national park and attraction ticket booths"],
    tips: [
      "Một số nhà hàng nhỏ có thể tính phụ phí quẹt thẻ 2% - 3% (surcharge); hãy hỏi trước khi quẹt.",
      "Nên thông báo trước với ngân hàng phát hành thẻ ở quê nhà về việc đi du lịch Việt Nam để tránh bị khóa thẻ do nghi ngờ gian lận.",
    ],
    tipsEn: [
      "Some smaller shops may add a 2% to 3% credit card processing surcharge; ask beforehand.",
      "Notify your home bank before traveling to prevent your card being flagged for foreign transactions.",
    ],
  },
  {
    method: "Quét Mã QR Ngân Hàng (VietQR / Chuyển Khoản)",
    methodEn: "VietQR & Bank Transfer QR Codes",
    acceptanceLevel: "widely_accepted",
    whereToUse: ["95% các cửa hàng, quán cà phê, nhà hàng tại Việt Nam", "Kể cả quán trà đá vỉa hè và tiểu thương ở chợ"],
    whereToUseEn: ["95% of stores, cafes, and dining venues across Vietnam", "Even humble roadside tea stalls and open-air market vendors"],
    tips: [
      "Du khách quốc tế chưa có tài khoản ngân hàng nội địa có thể liên kết thẻ Visa/Mastercard với ví điện tử (như Apple Pay, Google Wallet) tại các máy POS chấp nhận thanh toán một chạm không tiếp xúc (Contactless).",
    ],
    tipsEn: [
      "International travelers without local bank accounts can use Apple Pay or Google Wallet at contactless POS terminals in modern venues.",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 8. FESTIVALS & SEASONAL EVENTS SEED DATA
// ─────────────────────────────────────────────────────────────────────────────

export const FESTIVAL_CALENDAR: FestivalItem[] = [
  {
    id: "tet-nguyen-dan",
    name: "Tết Nguyên Đán (Tết Cổ Truyền Việt Nam)",
    nameEn: "Tet — Vietnamese Lunar New Year",
    lunarDate: "Mùng 1 đến Mùng 7 tháng Giêng (Âm lịch)",
    solarMonth: 1,
    solarTimingDescription: "Khoảng cuối tháng 1 đến giữa tháng 2 Dương lịch",
    solarTimingDescriptionEn: "Late January to mid-February depending on lunar cycle",
    destinationName: "Toàn quốc (Đặc sắc tại Hà Nội, Hội An, TP.HCM)",
    destinationNameEn: "Nationwide (Spectacular in Hanoi, Hoi An, HCMC)",
    locationDetail: "Khắp mọi miền đất nước, các phố hoa xuân, đền chùa và không gian gia đình",
    locationDetailEn: "Across Vietnam; flower markets, pagodas, illuminated streets, and family homes",
    culturalSignificance: "Lễ hội thiêng liêng và quan trọng nhất trong năm của dân tộc Việt Nam; dịp đoàn viên gia đình, tiễn năm cũ, đón chào khởi đầu mới với may mắn và thịnh vượng.",
    culturalSignificanceEn: "The most sacred and significant festival of the year; celebrating family reunion, ancestral remembrance, and welcoming springtime renewal.",
    crowdLevel: "high",
    practicalTips: [
      "Các cửa hàng, bảo tàng và hàng quán ăn có thể đóng cửa từ ngày 30 Tết đến Mùng 3 Tết; nên chuẩn bị đồ ăn sẵn và xác nhận trước với khách sạn.",
      "Vé máy bay và tàu xe những ngày trước và sau Tết cực kỳ khan hiếm; bắt buộc đặt trước 2-3 tháng.",
      "Không khí những ngày giáp Tết tại chợ hoa Hàng Lược (Hà Nội) hoặc Chợ hoa xuân bến Bình Đông (TP.HCM) vô cùng rực rỡ và đáng trải nghiệm.",
    ],
    practicalTipsEn: [
      "Many small shops and restaurants close during the first 3 days of Tet; verify dining with hotels.",
      "Domestic air and train tickets sell out months in advance; book at least 2 to 3 months ahead.",
      "Flower markets in Hanoi Old Quarter and Saigon canals exude magnificent festive colors.",
    ],
    shouldExperience: true,
  },
  {
    id: "chua-huong",
    name: "Lễ Hội Chùa Hương",
    nameEn: "Perfume Pagoda Pilgrimage Festival",
    lunarDate: "Mùng 6 tháng Giêng đến hết tháng 3 Âm lịch",
    solarMonth: 2,
    solarTimingDescription: "Tháng 2 đến tháng 4 Dương lịch",
    solarTimingDescriptionEn: "February through April",
    destinationSlug: "ninh-binh",
    destinationName: "Hà Nội — Chùa Hương (Gần Ninh Bình)",
    destinationNameEn: "Hanoi — Perfume Pagoda (near Ninh Binh)",
    locationDetail: "Khu thắng cảnh Hương Sơn, huyện Mỹ Đức, Hà Nội",
    locationDetailEn: "Huong Son Scenic Area, My Duc, Hanoi",
    culturalSignificance: "Lễ hội Phật giáo dài nhất Việt Nam, hành trình ngồi đò xuôi dòng suối Yến thơ mộng và leo núi chiêm bái động Hương Tích ('Nam thiên đệ nhất động').",
    culturalSignificanceEn: "Vietnam's longest Buddhist pilgrimage; picturesque boat journey along Yen Stream leading to sacred mountain shrine caverns.",
    crowdLevel: "high",
    practicalTips: [
      "Hàng triệu Phật tử hành hương đổ về trong tháng Giêng âm lịch; nếu không thích chen chúc nên đi vào các ngày giữa tuần của tháng 3 hoặc tháng 4.",
      "Hành trình ngồi đò suối Yến kéo dài khoảng 1 giờ mỗi chiều; mang nón lá, kem chống nắng và giữ tiền tip nhỏ cho người chèo đò.",
    ],
    practicalTipsEn: [
      "Extremely crowded on weekends in February; visit on weekdays in late March or April for serenity.",
      "Rowboat ride takes ~1 hour each way; bring sun protection and small tips for your boat rower.",
    ],
    shouldExperience: false,
  },
  {
    id: "den-hung",
    name: "Giỗ Tổ Hùng Vương",
    nameEn: "Hung Kings Temple Commemoration",
    lunarDate: "Mùng 10 tháng 3 Âm lịch",
    solarMonth: 4,
    solarTimingDescription: "Khoảng tháng 4 Dương lịch",
    solarTimingDescriptionEn: "Mid-April",
    destinationName: "Phú Thọ & Nghỉ Lễ Toàn Quốc",
    destinationNameEn: "Phu Tho & Nationwide Public Holiday",
    locationDetail: "Khu di tích lịch sử Đền Hùng, Việt Trì, Phú Thọ",
    locationDetailEn: "Hung Kings Historic Temple Complex, Viet Tri, Phu Tho",
    culturalSignificance: "Tưởng nhớ công lao dựng nước của các Vua Hùng; ngày Quốc lễ thiêng liêng thể hiện truyền thống 'Uống nước nhớ nguồn' của người Việt.",
    culturalSignificanceEn: "Commemorates the legendary founding fathers of Vietnam; a national public holiday honoring ancient ancestral heritage.",
    crowdLevel: "high",
    practicalTips: [
      "Người dân cả nước được nghỉ lễ 1 ngày; các điểm du lịch lớn như Đà Nẵng, Hạ Long, Sa Pa sẽ đông đúc hơn ngày thường.",
    ],
    practicalTipsEn: [
      "A national public holiday; popular destinations like Da Nang and Ha Long see surges in domestic weekend crowds.",
    ],
    shouldExperience: false,
  },
  {
    id: "festival-hue",
    name: "Festival Huế",
    nameEn: "Hue Imperial Festival",
    solarMonth: 4,
    solarTimingDescription: "Định kỳ tháng 4 hoặc tháng 6 (2 năm một lần)",
    solarTimingDescriptionEn: "Biennial, typically held in April or June",
    destinationSlug: "hue",
    destinationName: "Cố đô Huế",
    destinationNameEn: "Hue Imperial City",
    locationDetail: "Đại Nội Huế, dòng sông Hương và khắp các cung điện lăng tẩm",
    locationDetailEn: "Hue Imperial Citadel, Perfume River, and royal heritage palaces",
    culturalSignificance: "Lễ hội văn hóa nghệ thuật quy mô quốc tế tôn vinh di sản cung đình triều Nguyễn, nhã nhạc cung đình UNESCO và giao lưu nghệ thuật với hàng chục quốc gia.",
    culturalSignificanceEn: "Grand international cultural showcase celebrating Nguyen Dynasty heritage, UNESCO court music, and global theatrical performances.",
    crowdLevel: "medium",
    practicalTips: [
      "Các đêm diễn ánh sáng tại Đại Nội và lễ tế Nam Giao tái hiện vô cùng trang nghiêm và mãn nhãn.",
      "Nên đặt phòng khách sạn tại Huế trước ít nhất 1 tháng vì phòng bờ nam sông Hương sẽ kín chỗ nhanh chóng.",
    ],
    practicalTipsEn: [
      "Spectacular sound and light shows at the Citadel and royal ritual reenactments are must-sees.",
      "Reserve accommodations in Hue at least 1 month ahead as riverside hotels book out rapidly.",
    ],
    shouldExperience: true,
  },
  {
    id: "diff-da-nang",
    name: "Lễ Hội Pháo Hoa Quốc Tế Đà Nẵng (DIFF)",
    nameEn: "Da Nang International Fireworks Festival (DIFF)",
    solarMonth: 6,
    solarTimingDescription: "Kéo dài các đêm Thứ Bảy từ tháng 6 đến tháng 7",
    solarTimingDescriptionEn: "Saturday evenings throughout June and July",
    destinationSlug: "da-nang",
    destinationName: "Đà Nẵng — Đáng Sống",
    destinationNameEn: "Da Nang Coastal City",
    locationDetail: "Sân khấu bờ sông Hàn, đường Trần Hưng Đạo, Đà Nẵng",
    locationDetailEn: "Han River Waterfront Arena, Tran Hung Dao St, Da Nang",
    culturalSignificance: "Sự kiện pháo hoa nghệ thuật tầm cỡ thế giới quy tụ các đội thi hàng đầu hành tinh (Pháp, Ý, Mỹ, Úc...) tranh tài rực sáng bầu trời sông Hàn.",
    culturalSignificanceEn: "World-class pyrotechnic championship bringing elite international teams to illuminate the iconic Han River bridges.",
    crowdLevel: "high",
    practicalTips: [
      "Mua vé khán đài chính thức từ ban tổ chức sớm để có góc nhìn trọn vẹn, hoặc đặt bàn tại các quán bar/nhà hàng rooftop nhìn ra sông Hàn.",
      "Các cây cầu bắc qua sông Hàn (cầu Rồng, cầu Sông Hàn) cấm xe cộ từ 18h00 trong các đêm bắn pháo hoa; nên di chuyển sớm bằng đường bộ.",
    ],
    practicalTipsEn: [
      "Book grandstand tickets early, or reserve tables at high-floor rooftop bars overlooking the Han River.",
      "Bridges close to vehicular traffic from 6:00 PM on competition nights; travel to viewing spots early.",
    ],
    shouldExperience: true,
  },
  {
    id: "mua-vang-tay-bac",
    name: "Mùa Vàng Ruộng Bậc Thang Tây Bắc",
    nameEn: "Northwest Golden Harvest Season",
    solarMonth: 9,
    solarTimingDescription: "Tháng 9 đến đầu tháng 10",
    solarTimingDescriptionEn: "September to early October",
    destinationSlug: "sa-pa",
    destinationName: "Sa Pa & Mù Cang Chải",
    destinationNameEn: "Sa Pa & Mu Cang Chai",
    locationDetail: "Thung lũng Mường Hoa (Sa Pa), đồi Mâm Xôi (Mù Cang Chải), Hoàng Su Phì (Hà Giang)",
    locationDetailEn: "Muong Hoa Valley (Sa Pa), Raspberry Hill (Mu Cang Chai), Hoang Su Phi (Ha Giang)",
    culturalSignificance: "Kiệt tác nông nghiệp ruộng bậc thang của đồng bào H'Mông, Dao nhuộm vàng óng ả; thời điểm thiên nhiên kỳ vĩ nhất trong năm của vùng cao Tây Bắc.",
    culturalSignificanceEn: "Centuries-old indigenous agricultural marvel as cascading terraces turn radiant golden amber; the premier landscape spectacle of the year.",
    crowdLevel: "medium",
    practicalTips: [
      "Khoảng thời gian đẹp nhất là tuần thứ 2 và thứ 3 của tháng 9 trước khi bà con bắt đầu gặt lúa.",
      "Nên thuê xe máy hoặc xe ôm bản địa để len lỏi vào các bản làng sâu (Lao Chải, Tả Van, Bản Phùng) nơi cảnh sắc còn nguyên sơ.",
    ],
    practicalTipsEn: [
      "Peak visual splendor is the 2nd and 3rd weeks of September before harvesting begins.",
      "Hire a local motorbike guide to access secluded villages (Lao Chai, Ta Van, Ban Phung) away from main crowds.",
    ],
    shouldExperience: true,
  },
  {
    id: "tet-trung-thu",
    name: "Tết Trung Thu (Lễ Hội Trăng Rằm)",
    nameEn: "Mid-Autumn Festival (Full Moon Festival)",
    lunarDate: "Rằm tháng Tám (15/8 Âm lịch)",
    solarMonth: 9,
    solarTimingDescription: "Khoảng giữa tháng 9 đến đầu tháng 10 Dương lịch",
    solarTimingDescriptionEn: "Mid-September to early October",
    destinationSlug: "hoi-an",
    destinationName: "Phố cổ Hội An & Phố Cổ Hà Nội",
    destinationNameEn: "Hoi An Ancient Town & Hanoi Old Quarter",
    locationDetail: "Phố đèn lồng Hàng Mã (Hà Nội) và các con phố ngập tràn hoa đăng tại Hội An",
    locationDetailEn: "Hang Ma lantern street in Hanoi and candlelit riverbanks in Hoi An",
    culturalSignificance: "Tết đoàn viên, tết của thiếu nhi với đèn ông sao, múa lân sư rồng rộn rã, bánh nướng bánh dẻo truyền thống và thả hoa đăng ước nguyện trên sông.",
    culturalSignificanceEn: "Celebration of harvest and family togetherness featuring vibrant lion dances, star lanterns, mooncakes, and floating paper river candles.",
    crowdLevel: "high",
    practicalTips: [
      "Tại Hội An, toàn bộ đèn điện tắt ngấm, chỉ còn ánh trăng rằm và hàng ngàn ngọn đèn hoa đăng trôi trên dòng sông Hoài thơ mộng.",
      "Phố Hàng Mã tại Hà Nội những ngày trước Trung Thu cực kỳ đông vui nhộn nhịp, thích hợp chụp ảnh check-in.",
    ],
    practicalTipsEn: [
      "In Hoi An, electric streetlights are extinguished, leaving the town aglow with lanterns and floating candles.",
      "Hanoi's Hang Ma Street bursts with kaleidoscopic lantern stalls, ideal for evening photography.",
    ],
    shouldExperience: true,
  },
  {
    id: "tam-giac-mach",
    name: "Lễ Hội Hoa Tam Giác Mạch Hà Giang",
    nameEn: "Ha Giang Buckwheat Flower Festival",
    solarMonth: 10,
    solarTimingDescription: "Tháng 10 đến tháng 11 Dương lịch",
    solarTimingDescriptionEn: "October through November",
    destinationSlug: "ha-giang",
    destinationName: "Hà Giang & Đồng Văn",
    destinationNameEn: "Ha Giang & Dong Van",
    locationDetail: "Cao nguyên đá Đồng Văn, Mã Pí Lèng, thung lũng Sủng Là, Lũng Cú",
    locationDetailEn: "Dong Van Karst Plateau, Ma Pi Leng, Sung La Valley, Lung Cu",
    culturalSignificance: "Tôn vinh loài hoa kiên cường nở trên sườn núi đá tai mèo cằn cỗi, đổi màu từ trắng sang hồng tím dịu dàng; gắn liền với bản sắc văn hóa các dân tộc vùng biên cương.",
    culturalSignificanceEn: "Celebrates the resilient wildflower blooming across rugged karst cliffs, shifting from white to soft violet-pink amidst ethnic mountain traditions.",
    crowdLevel: "medium",
    practicalTips: [
      "Thời tiết se lạnh 12-18°C rất dễ chịu; chuẩn bị áo ấm gió cho các chặng đi xe máy đường đèo.",
      "Thung lũng Sủng Là (nơi quay phim 'Chuyện của Pao') và chân cột cờ Lũng Cú là hai địa điểm hoa nở rộ và đẹp nhất.",
    ],
    practicalTipsEn: [
      "Cool 12-18°C weather; bring windproof mountain jackets for motorcycle touring.",
      "Sung La Valley (filming site of 'Pao's Story') and Lung Cu flagpole feature the most expansive flower fields.",
    ],
    shouldExperience: true,
  },
  {
    id: "festival-hoa-da-lat",
    name: "Festival Hoa Đà Lạt",
    nameEn: "Da Lat Flower Festival",
    solarMonth: 12,
    solarTimingDescription: "Tháng 12 (Định kỳ 2 năm một lần)",
    solarTimingDescriptionEn: "December (Biennial celebration)",
    destinationSlug: "da-lat",
    destinationName: "Đà Lạt — Ngàn Hoa",
    destinationNameEn: "Da Lat — Eternal Spring",
    locationDetail: "Quảng trường Lâm Viên, quanh Hồ Xuân Hương và các làng hoa truyền thống",
    locationDetailEn: "Lam Vien Square, Xuan Huong Lake perimeter, and historic floral villages",
    culturalSignificance: "Lễ hội tôn vinh ngành trồng hoa của thành phố ngàn hoa với các đại cảnh hoa nghệ thuật khổng lồ, diễu hành xe hoa, hội chợ rượu vang và trà hoa cao nguyên.",
    culturalSignificanceEn: "Grand celebration of Da Lat's horticulture industry featuring monumental floral sculptures, float parades, wine fairs, and highland tea tastings.",
    crowdLevel: "high",
    practicalTips: [
      "Thành phố đón hàng trăm nghìn lượt khách trong tuần lễ hội; các tuyến đường trung tâm quanh hồ Xuân Hương thường đông đúc.",
      "Nhiệt độ ban đêm tháng 12 có thể xuống 11-13°C; áo len, khăn quàng cổ và áo khoác ấm là trang phục vừa đẹp vừa giữ ấm hoàn hảo.",
    ],
    practicalTipsEn: [
      "Attracts hundreds of thousands of domestic visitors; central traffic around Xuan Huong Lake moves slowly.",
      "December nights frequently dip to 11-13°C; stylish knitwear and warm coats are essential.",
    ],
    shouldExperience: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 9. HELPER FUNCTIONS FOR RETRIEVAL & RAG SEED LOOKUP
// ─────────────────────────────────────────────────────────────────────────────

export function getGuideCategoryBySlug(slug: string): GuideCategoryHubItem | undefined {
  return GUIDE_CATEGORIES.find((c) => c.slug === slug);
}

export function getDestinationWeather(slug: string): DestinationWeatherInfo | undefined {
  return DESTINATIONS_WEATHER_DATA.find((d) => d.destinationSlug === slug);
}

export function getDestinationTransport(slug: string): DestinationTransportInfo | undefined {
  return DESTINATIONS_TRANSPORT_DATA.find((d) => d.destinationSlug === slug);
}

export function getFestivalsByMonth(month: number): FestivalItem[] {
  return FESTIVAL_CALENDAR.filter((f) => f.solarMonth === month);
}

export function getFestivalsByDestination(destinationSlug: string): FestivalItem[] {
  return FESTIVAL_CALENDAR.filter((f) => f.destinationSlug === destinationSlug);
}
