import type {
  Article,
  Destination,
  Paginated,
  Place,
  PlaceCategory,
  Review,
} from "@/lib/types";

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:8000/api/v1";

/**
 * Standard HTTP JSON request helper with optional ISR caching.
 */
async function fetchJson<T>(
  path: string,
  init?: RequestInit,
  revalidate = 60
): Promise<T> {
  const nextConfig =
    init?.method && init.method !== "GET" ? undefined : { revalidate };

  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    next: nextConfig,
  });

  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.status} on ${path}`);
  }

  return response.json() as Promise<T>;
}

/**
 * Normalizes paginated or raw list responses into an array.
 */
async function list<T>(path: string): Promise<T[]> {
  const data = await fetchJson<Paginated<T> | T[]>(path);
  return Array.isArray(data) ? data : data.results;
}

/**
 * Public REST API Client for Star Travels Vietnam
 */
export const publicApi = {
  // Destinations
  destinations: (query = "") => list<Destination>(`/destinations/${query}`),
  destination: (slug: string) => fetchJson<Destination>(`/destinations/${slug}/`),

  // Categories & Places
  categories: () => list<PlaceCategory>("/place-categories/"),
  places: (query = "") => list<Place>(`/places/${query}`),
  place: (slug: string) => fetchJson<Place>(`/places/${slug}/`),
  nearby: (lat: number, lng: number, radius = 10) =>
    list<Place>(`/places/nearby/?lat=${lat}&lng=${lng}&radius_km=${radius}`),

  // Stories & Articles
  articles: (query = "") => list<Article>(`/articles/${query}`),
  article: (slug: string) => fetchJson<Article>(`/articles/${slug}/`),

  // Reviews
  reviews: (placeSlug: string) =>
    list<Review>(`/reviews/?place__slug=${encodeURIComponent(placeSlug)}`),
};

/**
 * Graceful error handling fallback wrapper for async server calls.
 */
export async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch {
    return fallback;
  }
}
