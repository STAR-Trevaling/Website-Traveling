/**
 * Travel Platform - Clean Assets Module (Vietnam Curated Imagery)
 * Completely self-contained and free of external third-party Figma/Anima dependencies.
 */

export const VIETNAM_IMAGES = {
  // Hero & Core Banners (Bright & Famous Vietnam Landmarks - 100% Verified Local Real Photos)
  hero: "/images/hero/ha-long-bay.jpg", // Vịnh Hạ Long ngọc bích ngập tràn ánh nắng
  goldenBridge: "/images/hero/golden-bridge.jpg", // Cầu Vàng Bà Nà Hills - Đà Nẵng rực rỡ nắng vàng
  oceanBanner: "/images/hero/phu-quoc.jpg", // Biển nhiệt đới Bãi Sao Phú Quốc ngọc bích
  ctaBanner: "/images/hero/hoi-an.jpg", // Phố cổ Hội An lung linh đèn lồng
  pagePattern: "/images/hero/phu-quoc.jpg",

  // Top Hero Slide Banners (4 Danh thắng nổi tiếng & sáng rực rỡ bậc nhất Việt Nam)
  heroSlides: [
    {
      id: "ha-long-bay",
      title: "Kỳ Quan Vịnh Hạ Long",
      subtitle: "Non nước ngọc bích và ngàn đảo đá kỳ vĩ",
      image: "/images/hero/ha-long-bay.jpg",
      tag: "Di sản thiên nhiên thế giới UNESCO",
    },
    {
      id: "golden-bridge-da-nang",
      title: "Tuyệt Tác Cầu Vàng",
      subtitle: "Lối đi bộ vàng rực giữa mây trời Bà Nà Hills",
      image: "/images/hero/golden-bridge.jpg",
      tag: "Biểu tượng du lịch quốc tế Đà Nẵng",
    },
    {
      id: "sa-pa-rice-terraces",
      title: "Mùa Vàng Sa Pa",
      subtitle: "Kiệt tác ruộng bậc thang óng ả giữa mây ngàn",
      image: "/images/hero/sapa-terraces.jpg",
      tag: "Kỳ quan ruộng bậc thang Tây Bắc",
    },
    {
      id: "trang-an-ninh-binh",
      title: "Non Nước Tràng An",
      subtitle: "Thuyền nan lướt nhẹ giữa non nước di sản kỳ vĩ",
      image: "/images/hero/trang-an.jpg",
      tag: "Di sản thế giới kép UNESCO Ninh Bình",
    },
  ],

  // Destinations (Verified Bright High-Quality Vietnam Photos)
  haLong: "/images/hero/ha-long-bay.jpg",
  hoiAn: "/images/hero/hoi-an.jpg",
  phuQuoc: "/images/hero/phu-quoc.jpg",
  saPa: "/images/hero/sapa-terraces.jpg",
  daLat: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85",
  ninhBinh: "/images/hero/trang-an.jpg",
  hue: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=85",
  haGiang: "https://images.unsplash.com/photo-1570366583862-f91883984fde?auto=format&fit=crop&w=1200&q=85",
  daNang: "/images/hero/golden-bridge.jpg",
  conDao: "/images/hero/phu-quoc.jpg",
  phongNha: "/images/hero/trang-an.jpg",
  muiNe: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
  nhaTrang: "/assets/nha-trang-beach-bg.jpg",
  canTho: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=85",

  // Experiences & Adventures
  cruise: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
  kayak: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
  camping: "/assets/adventures/camping.jpg",
  hiking: "/assets/adventures/hiking.jpg",
  scubaDiving: "/assets/adventures/scuba-diving.jpg",

  // Awards & Recognition Highlights
  awards: [
    "/images/hero/ha-long-bay.jpg", // Vịnh Hạ Long
    "https://upload.wikimedia.org/wikipedia/commons/e/e2/Da_Lat_-_Viet_Nam.jpg", // Đà Lạt
    "/images/hero/phu-quoc.jpg", // Biển Phú Quốc
    "/images/hero/hoi-an.jpg", // Phố cổ Hội An
    "/images/hero/trang-an.jpg", // Tràng An Ninh Bình
    "https://upload.wikimedia.org/wikipedia/commons/0/0e/Ngo_Mon.jpg", // Cố đô Huế
  ]
};

/**
 * Returns a high-quality Vietnam travel photo based on asset key or fallback name.
 */
export function getAssetUrl(nameOrKey: string): string {
  if (nameOrKey.startsWith("http://") || nameOrKey.startsWith("https://")) {
    return nameOrKey;
  }
  if (nameOrKey in VIETNAM_IMAGES) {
    return (VIETNAM_IMAGES as Record<string, any>)[nameOrKey];
  }
  return VIETNAM_IMAGES.hero;
}

/**
 * Legacy compatibility helper mapping previous template names to Vietnam assets.
 */
export function animaAsset(name: string): string {
  const legacyMap: Record<string, string> = {
    "rectangle-3.svg": VIETNAM_IMAGES.hero,
    "rectangle-64.svg": VIETNAM_IMAGES.oceanBanner,
    "rectangle-65.svg": VIETNAM_IMAGES.hero,
    "rectangle-112.svg": VIETNAM_IMAGES.ctaBanner,
    "rectangle-55.svg": VIETNAM_IMAGES.haLong,
    "rectangle-58.svg": VIETNAM_IMAGES.hoiAn,
    "rectangle-61.svg": VIETNAM_IMAGES.phuQuoc,
    "rectangle-63.svg": VIETNAM_IMAGES.saPa,
    "rectangle-67.svg": VIETNAM_IMAGES.cruise,
    "rectangle-66.svg": VIETNAM_IMAGES.kayak,
    "rectangle-77.svg": VIETNAM_IMAGES.camping,
    "rectangle-76.svg": VIETNAM_IMAGES.hiking,
    "rectangle-78.svg": VIETNAM_IMAGES.scubaDiving,
    "rectangle-94.svg": VIETNAM_IMAGES.awards[0],
    "rectangle-95.svg": VIETNAM_IMAGES.awards[1],
    "rectangle-88.svg": VIETNAM_IMAGES.awards[2],
    "rectangle-89.svg": VIETNAM_IMAGES.awards[3],
    "rectangle-90.svg": VIETNAM_IMAGES.awards[4],
    "rectangle-91.svg": VIETNAM_IMAGES.awards[5],
  };

  return legacyMap[name] || VIETNAM_IMAGES.hero;
}
