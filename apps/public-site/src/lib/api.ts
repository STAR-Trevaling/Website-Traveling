import type {
  Accommodation,
  Article,
  Destination,
  Paginated,
  Place,
  PlaceCategory,
  ReferralTrackPayload,
  ReferralTrackResponse,
  Restaurant,
  Review,
  TourItem,
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

  // Tours
  tours: (query = "") => list<TourItem>(`/tours/${query}`),
  tour: (slug: string) => fetchJson<TourItem>(`/tours/${slug}/`),

  // Bookings
  createBooking: (payload: {
    tour_slug_input?: string;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
    departure_date?: string;
    pax_adults: number;
    pax_children?: number;
    special_requests?: string;
    metadata?: Record<string, any>;
  }) =>

    fetchJson<{
      id: string;
      booking_code: string;
      unit_price: string;
      total_amount: string;
      currency: string;
      status: string;
      tour_title?: string;
      tour_slug?: string;
    }>("/bookings/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),

  // Reviews
  reviews: (placeSlug: string) =>
    list<Review>(`/reviews/?place__slug=${encodeURIComponent(placeSlug)}`),

  // AI Trip Assistant & RAG
  assistantChat: (payload: { message: string; session_token?: string; locale?: string }) =>
    fetchJson<{
      session_token: string;
      message: string;
      recommended_tours: Array<{
        slug: string;
        title: string;
        price: number;
        duration: string;
        departure: string;
        image: string;
      }>;
      lead_captured: boolean;
    }>("/assistant/conversations/chat/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),

  // Payments, VNPay & VietQR Integration
  createPayment: (payload: {
    booking_code: string;
    gateway?: string;
    bank_code?: string;
    locale?: string;
    return_url?: string;
  }) =>
    fetchJson<{
      payment_id?: string;
      payment_url?: string;
      transaction_code: string;
      booking_code: string;
      amount: string;
      currency: string;
      gateway: string;
      status?: string;
      expires_at: string;
      qr_code_url?: string;
      emvco_payload?: string;
      bank_info?: {
        bank_name: string;
        bank_bin: string;
        account_number: string;
        account_name: string;
        amount: number;
        transfer_content: string;
      };
    }>("/payments/create/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
  getPaymentStatus: (id: string) =>
    fetchJson<{
      payment_id: string;
      transaction_code: string;
      booking_code: string;
      state: string;
      status: string;
      amount: string;
      currency: string;
      gateway: string;
      provider_ref?: string;
      created_at: string;
      completed_at?: string;
      expires_at?: string;
      is_paid: boolean;
    }>(`/payments/${encodeURIComponent(id)}/status/`),
  queryPayment: (txnRef: string) =>
    fetchJson<{
      payment_id?: string;
      transaction_code: string;
      booking_code: string;
      state?: string;
      status: string;
      amount: string;
      currency: string;
      gateway: string;
      provider_ref?: string;
      created_at: string;
      completed_at?: string;
      expires_at?: string;
      is_paid: boolean;
    }>(`/payments/query/?txn_ref=${encodeURIComponent(txnRef)}`),

  // Accommodations (Partner Referral Model)
  accommodations: (query = "") => list<Accommodation>(`/accommodations/${query}`),
  accommodation: (slug: string) => fetchJson<Accommodation>(`/accommodations/${slug}/`),

  // Restaurants (Partner Referral Model)
  restaurants: (query = "") => list<Restaurant>(`/restaurants/${query}`),
  restaurant: (slug: string) => fetchJson<Restaurant>(`/restaurants/${slug}/`),

  // Referral Click Tracking (1.5s timeout, non-blocking)
  trackReferral: async (
    payload: ReferralTrackPayload,
    timeoutMs = 1500
  ): Promise<ReferralTrackResponse> => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(`${BASE_URL}/referrals/track/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (!res.ok) {
        throw new Error(`Referral tracking failed with status ${res.status}`);
      }
      return (await res.json()) as ReferralTrackResponse;
    } catch (err) {
      clearTimeout(timer);
      throw err;
    }
  },
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
