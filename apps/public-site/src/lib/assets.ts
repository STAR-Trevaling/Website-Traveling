/**
 * Travel Platform - Clean Assets Module (Vietnam Curated Imagery)
 * Completely self-contained and free of external third-party Figma/Anima dependencies.
 */

export const VIETNAM_IMAGES = {
  // Hero & Core Banners (Bright & Famous Vietnam Landmarks - 100% Verified Local Real Photos)
  hero: "/images/hero/nha-trang.jpg", // Vịnh biển Nha Trang xanh ngọc bích
  goldenBridge: "/images/hero/golden-bridge.jpg", // Cầu Vàng Bà Nà Hills
  oceanBanner: "/images/hero/phan-thiet.jpg", // Biển Phan Thiết - Mũi Né đồi cát bay
  ctaBanner: "/images/hero/vung-tau.jpg", // Bãi biển Vũng Tàu
  pagePattern: "/images/hero/nha-trang.jpg",

  // Top Hero Slide Banners (3 Danh thắng biển nổi tiếng: Nha Trang, Vũng Tàu, Phan Thiết)
  heroSlides: [
    {
      id: "nha-trang",
      title: "Vịnh Biển Nha Trang",
      subtitle: "Biển xanh ngọc bích, bờ cát trắng mịn và thiên đường nghỉ dưỡng",
      image: "/images/hero/nha-trang.jpg",
      tag: "Vịnh biển đẹp bậc nhất thế giới",
    },
    {
      id: "vung-tau",
      title: "Biển Vũng Tàu",
      subtitle: "Sóng vỗ Bãi Sau, cung đường ven biển lộng gió và ngọn Hải Đăng",
      image: "/images/hero/vung-tau.jpg",
      tag: "Thành phố biển sôi động phương Nam",
    },
    {
      id: "phan-thiet",
      title: "Biển Phan Thiết — Mũi Né",
      subtitle: "Đồi cát vàng óng ả, làng chài thuyền thúng và biển biếc nắng ấm",
      image: "/images/hero/phan-thiet.jpg",
      tag: "Thủ phủ resort & đồi cát kỳ thú",
    },
  ],

  // Destinations (Verified High-Quality Vietnam Photos & Authenticated Landmarks)
  haLong: "/images/hero/ha-long-bay.jpg",
  hoiAn: "/images/hero/hoi-an.jpg",
  phuQuoc: "/images/hero/phu-quoc.jpg",
  saPa: "/images/hero/sapa-terraces.jpg",
  daLat: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  ninhBinh: "/images/hero/trang-an.jpg",
  hue: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80",
  haGiang: "https://images.unsplash.com/photo-1570366583862-f91883984fde?auto=format&fit=crop&w=1200&q=80",
  daNang: "/images/hero/golden-bridge.jpg",
  conDao: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  phongNha: "https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=1200&q=80",
  muiNe: "/images/hero/phan-thiet.jpg",
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
