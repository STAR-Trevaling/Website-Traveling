/**
 * Geolocation & Haversine Distance Utilities
 * Supports nearby dining and accommodation recommendations with privacy protection.
 */

export interface UserCoordinates {
  lat: number;
  lng: number;
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
 * Requests user's geolocation via standard browser navigator API.
 * Follows Decree 13/2023/NĐ-CP with explicit user initiation and graceful fallback.
 */
export function requestUserCoordinates(
  timeoutMs = 10000
): Promise<UserCoordinates> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      reject(new Error("Trình duyệt không hỗ trợ định vị địa lý."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        let msg = "Không thể xác định vị trí hiện tại.";
        if (error.code === error.PERMISSION_DENIED) {
          msg = "Quyền truy cập vị trí đã bị từ chối.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = "Thông tin vị trí hiện không khả dụng.";
        } else if (error.code === error.TIMEOUT) {
          msg = "Quá thời gian chờ lấy vị trí.";
        }
        reject(new Error(msg));
      },
      {
        enableHighAccuracy: true,
        timeout: timeoutMs,
        maximumAge: 60000,
      }
    );
  });
}
