/**
 * @travel/contracts & types
 * Shared API contracts, data models, and request/response specifications.
 * Enforces clean separation between Django REST backend and Next.js frontend.
 */

// ─── Core & Pagination ──────────────────────────────────────
export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface APIErrorDetail {
  field?: string;
  message: string;
  code?: string;
}

export interface APIErrorResponse {
  detail?: string;
  errors?: Record<string, string[]>;
  status_code?: number;
}

// ─── Destination Context ────────────────────────────────────
export interface Destination {
  id: string;
  slug: string;
  name: string;
  name_en?: string;
  country: string;
  country_en?: string;
  summary: string;
  summary_en?: string;
  description: string;
  description_en?: string;
  image_url: string;
  hero_image_url: string;
  starting_price: string | null;
  center: GeoPoint | null;
}

export interface DestinationListParams {
  search?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
}

// ─── Places & Experiences Context ───────────────────────────
export interface PlaceCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Place {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  description: string;
  image_url: string;
  overlay_image_url?: string;
  address: string;
  website_url?: string;
  location: GeoPoint;
  destination: Destination;
  category: PlaceCategory;
  average_rating: string;
  review_count: number;
}

export interface PlaceListParams {
  destination?: string;
  category?: string;
  search?: string;
  min_rating?: number;
  ordering?: string;
  page?: number;
  page_size?: number;
}

// ─── Content & Stories Context ──────────────────────────────
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image: string;
  destination_slug: string | null;
  place_slug: string | null;
  published_at: string | null;
}

export interface ArticleListParams {
  destination?: string;
  search?: string;
  page?: number;
}

// ─── Reviews & Engagement Context ───────────────────────────
export interface Review {
  id: string;
  place: string;
  place_slug: string;
  rating: number;
  body: string;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface CreateReviewPayload {
  place: string;
  rating: number;
  body: string;
}

export interface Favorite {
  id: string;
  place: string;
  place_slug: string;
  created_at: string;
}

export interface ToggleFavoritePayload {
  place: string;
}

// ─── Partners Context ───────────────────────────────────────
export type PartnerStatus = "pending" | "approved" | "rejected" | "active";

export interface PartnerApplicationPayload {
  organization_name: string;
  contact_email: string;
  phone_number: string;
  business_type: string;
  notes?: string;
}

export interface PartnerApplicationResponse {
  id: string;
  organization_name: string;
  status: PartnerStatus;
  created_at: string;
}

// ─── Accounts & Identity Context ────────────────────────────
export type UserRole = "customer" | "partner" | "staff" | "admin";

export interface CurrentUser {
  id: string;
  username: string;
  email: string;
  role: UserRole | string;
  is_staff: boolean;
}

export interface LoginPayload {
  username?: string;
  email?: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  password_confirm?: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
  user?: CurrentUser;
}

export interface RefreshRefreshTokenPayload {
  refresh: string;
}

// ─── Tours Specification ────────────────────────────────────
export interface TourItem {
  id: string;
  title: string;
  slug: string;
  location: string;
  duration: string;
  groupSize: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  tags: string[];
  featured?: boolean;
}
