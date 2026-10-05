/**
 * Travel Platform - Clean Assets Module (Vietnam Curated Imagery)
 * Completely self-contained and free of external third-party Figma/Anima dependencies.
 */

export const VIETNAM_IMAGES = {
  // Hero & Core Banners
  hero: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1920&q=85", // Hạ Long Bay
  oceanBanner: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85", // Emerald Sea
  ctaBanner: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1920&q=85", // Sunset over sea
  pagePattern: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85",

  // Top Hero Slide Banners
  heroSlides: [
    {
      id: "vietnam-heritage",
      title: "Việt Nam — Non Sông Gấm Vóc",
      subtitle: "Khám phá kỳ quan thiên nhiên và danh thắng di sản cùng Star Travels.",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1920&q=85",
      tag: "Di sản thiên nhiên thế giới UNESCO",
    },
    {
      id: "da-lat",
      title: "Đà Lạt — Xứ Sở Sương Mù & Ngàn Hoa",
      subtitle: "Thả hồn giữa đồi thông xanh ngát và hồ Tuyền Lâm phẳng lặng.",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Da_Lat_-_Viet_Nam.jpg",
      tag: "Thành phố tình yêu & ngàn hoa",
    },
    {
      id: "trang-an",
      title: "Tràng An — Non Nước Hữu Tình",
      subtitle: "Chiêm ngưỡng thung lũng đá vôi ngập nước và di sản thế giới kép.",
      image: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Vietnam%2C_Ninh_Binh%2C_Limestone_peaks.jpg",
      tag: "Di sản thế giới kép UNESCO",
    },
  ],

  // Destinations (Verified Real Vietnam Photos)
  haLong: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
  hoiAn: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80",
  phuQuoc: "https://upload.wikimedia.org/wikipedia/commons/3/33/Kem_Beach_aerial_view_Phu_Quoc_Island_Vietnam.jpg",
  saPa: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Terraced_fields_Sa_Pa_Vietnam.JPG",
  daLat: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Da_Lat_-_Viet_Nam.jpg",
  ninhBinh: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Vietnam%2C_Ninh_Binh%2C_Limestone_peaks.jpg",
  hue: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Ngo_Mon.jpg",
  haGiang: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Mountain_road_at_M%C3%A3_P%C3%AD_L%C3%A8ng_Pass%2C_H%C3%A0_Giang_Province%2C_Vietnam.jpg",
  daNang: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80",
  conDao: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Phu_quoc_plage_sao.jpg",

  // Experiences & Adventures
  cruise: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
  kayak: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
  camping: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80",
  hiking: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
  scubaDiving: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=800&q=80",

  // Awards & Recognition Highlights
  awards: [
    "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=300&q=80", // Vịnh Hạ Long
    "https://upload.wikimedia.org/wikipedia/commons/e/e2/Da_Lat_-_Viet_Nam.jpg", // Đà Lạt
    "https://upload.wikimedia.org/wikipedia/commons/3/33/Kem_Beach_aerial_view_Phu_Quoc_Island_Vietnam.jpg", // Biển Phú Quốc
    "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=300&q=80", // Phố cổ Hội An
    "https://upload.wikimedia.org/wikipedia/commons/5/5b/Vietnam%2C_Ninh_Binh%2C_Limestone_peaks.jpg", // Tràng An Ninh Bình
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
