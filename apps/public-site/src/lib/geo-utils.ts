/**
 * Geolocation & Haversine Distance Utilities
 * Supports nearby dining and accommodation recommendations with privacy protection.
 */

export interface UserCoordinates {
  lat: number;
  lng: number;
  city?: string;
}

export interface DestinationGeoInfo {
  slug: string;
  name: string;
  lat: number;
  lng: number;
}

export const DESTINATION_COORDINATES: DestinationGeoInfo[] = [
  { slug: "ha-noi", name: "Hà Nội", lat: 21.0285, lng: 105.8542 },
  { slug: "tp-ho-chi-minh", name: "TP. Hồ Chí Minh", lat: 10.8231, lng: 106.6297 },
  { slug: "da-nang", name: "Đà Nẵng", lat: 16.0544, lng: 108.2022 },
  { slug: "hoi-an", name: "Hội An", lat: 15.8801, lng: 108.338 },
  { slug: "phu-quoc", name: "Phú Quốc", lat: 10.2899, lng: 103.984 },
  { slug: "nha-trang", name: "Nha Trang", lat: 12.2388, lng: 109.1967 },
  { slug: "ha-long", name: "Hạ Long", lat: 20.9599, lng: 107.0425 },
  { slug: "sa-pa", name: "Sa Pa", lat: 22.3364, lng: 103.8438 },
  { slug: "hue", name: "Huế", lat: 16.4637, lng: 107.5909 },
  { slug: "ninh-binh", name: "Ninh Bình", lat: 20.2506, lng: 105.9745 },
  { slug: "da-lat", name: "Đà Lạt", lat: 11.9404, lng: 108.4583 },
  { slug: "phan-thiet", name: "Phan Thiết / Mũi Né", lat: 10.9333, lng: 108.1 },
  { slug: "quy-nhon", name: "Quy Nhơn", lat: 13.782, lng: 109.219 },
  { slug: "can-tho", name: "Cần Thơ", lat: 10.0452, lng: 105.7469 },
  { slug: "vung-tau", name: "Vũng Tàu", lat: 10.346, lng: 107.0843 },
];

/**
 * Calculates great-circle distance between two coordinates in kilometers using Haversine formula.
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's mean radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Formats distance for display: e.g. "850 m" or "2.4 km"
 */
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  }
  return `${km.toFixed(1)} km`;
}

/**
 * Identifies the nearest Vietnam tourism destination to the user's position.
 */
export function findNearestDestination(userLat: number, userLng: number): {
  destination: DestinationGeoInfo;
  distanceKm: number;
} {
  let nearest = DESTINATION_COORDINATES[0];
  let minDistance = calculateDistanceKm(
    userLat,
    userLng,
    nearest.lat,
    nearest.lng
  );

  for (let i = 1; i < DESTINATION_COORDINATES.length; i++) {
    const dest = DESTINATION_COORDINATES[i];
    const dist = calculateDistanceKm(userLat, userLng, dest.lat, dest.lng);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = dest;
    }
  }

  return { destination: nearest, distanceKm: minDistance };
}

/**
 * Requests user's geolocation with high-resiliency multi-tier strategy:
 * 1. Fast browser geolocation (low accuracy to avoid 10s timeout on desktop PCs without GPS chips)
 * 2. Automatic fallback to /api/geo (Vercel Edge IP headers or IP lookup)
 * 3. Graceful fallback so "Tìm vị trí gần tôi" always works reliably.
 */
export async function requestUserCoordinates(
  timeoutMs = 5000
): Promise<UserCoordinates> {
  // Strategy 1: Browser navigator.geolocation
  if (typeof window !== "undefined" && navigator?.geolocation) {
    try {
      const browserCoords = await new Promise<UserCoordinates>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          },
          (err) => reject(err),
          {
            enableHighAccuracy: false, // Prevents desktop GPS timeout
            timeout: timeoutMs,
            maximumAge: 300000, // 5 min cache
          }
        );
      });
      return browserCoords;
    } catch {
      // Fallback to Server IP Geo
    }
  }

  // Strategy 2: Edge IP Geolocation via /api/geo
  try {
    const res = await fetch("/api/geo", { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      if (data?.lat && data?.lng) {
        return {
          lat: Number(data.lat),
          lng: Number(data.lng),
          city: data.city,
        };
      }
    }
  } catch {
    // Strategy 3: Default to central Vietnam coordinates (Da Nang) if completely offline
  }

  return {
    lat: 16.0544,
    lng: 108.2022,
    city: "Đà Nẵng",
  };
}
