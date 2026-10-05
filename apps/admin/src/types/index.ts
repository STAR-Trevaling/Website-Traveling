/**
 * Core TypeScript definitions for Star Travels Admin Portal
 * Production-style internal operations application models
 */

// ─── User Roles & Permissions ──────────────────────────────
export type AdminRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "CONTENT_EDITOR"
  | "MODERATOR"
  | "OPERATIONS_MANAGER"
  | "PARTNER_REVIEWER";

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: AdminRole;
  avatarUrl?: string;
  isStaff: boolean;
  permissions: string[];
}

// ─── Destination Models ────────────────────────────────────
export type PublicationStatus = "DRAFT" | "IN_REVIEW" | "PUBLISHED" | "ARCHIVED";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  province: string;
  region: string;
  summary: string;
  description: string;
  history?: string;
  culturalInfo?: string;
  culturalSignificance?: string;
  center?: GeoPoint;
  latitude?: number;
  longitude?: number;
  startingPrice?: number;
  imageUrl?: string;
  heroImageUrl?: string;
  coverImage?: string;
  gallery: string[];
  status: PublicationStatus;
  isFeatured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  updatedAt: string;
}

// ─── Place Models ──────────────────────────────────────────
export type PlaceType = "ATTRACTION" | "RESTAURANT" | "CAFE" | "HOTEL" | "EXPERIENCE" | string;

export interface PlaceCategory {
  id: string;
  name: string;
  slug: string;
  placeCount: number;
}

export interface PlaceAttributes {
  family_friendly?: boolean;
  quiet?: boolean;
  romantic?: boolean;
  historical?: boolean;
  sea_view?: boolean;
  indoor?: boolean;
  outdoor?: boolean;
  parking?: boolean;
  wifi?: boolean;
  wheelchair_accessible?: boolean;
  crowded_level?: "low" | "medium" | "high";
  average_visit_duration?: string;
}

export interface Place {
  id: string;
  name: string;
  slug: string;
  type: PlaceType;
  category: string;
  destinationId?: string;
  destinationSlug?: string;
  destinationName: string;
  address: string;
  location?: GeoPoint;
  latitude?: number;
  longitude?: number;
  shortDescription?: string;
  description: string;
  openingHours?: string;
  priceRange?: any;
  contactPhone?: string;
  websiteUrl?: string;
  imageUrl?: string;
  coverImage?: string;
  gallery?: string[];
  tags?: string[];
  attributes: PlaceAttributes;
  status: PublicationStatus;
  partnerId?: string;
  partnerName?: string;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  updatedAt: string;
}

// ─── Partner Application Workflow ──────────────────────────
export type PartnerAppStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "CHANGES_REQUESTED"
  | "APPROVED"
  | "REJECTED";

export interface PartnerApplication {
  id: string;
  businessName: string;
  applicantName: string;
  email: string;
  phone: string;
  website?: string;
  businessType: string;
  licenseNumber?: string;
  taxId?: string;
  address?: string;
  submittedAt: string;
  status: PartnerAppStatus;
  reviewer?: string;
  reviewerName?: string;
  riskFlags: string[];
  documents: { name: string; url?: string; fileType?: string; verified: boolean }[];
  requestedListing?: string;
  submittedContent?: string;
  internalNotes?: string;
  timeline: { step: string; actor: string; timestamp: string; note?: string }[];
}

export interface PartnerOrganization {
  id: string;
  name: string;
  code: string;
  ownerName: string;
  email: string;
  phone: string;
  status: "ACTIVE" | "SUSPENDED" | "INACTIVE";
  placesCount: number;
  toursCount: number;
  joinedAt: string;
  commissionRate: string;
}

// ─── Partner Content Submission & Diff ─────────────────────
export interface PartnerContentSubmission {
  id: string;
  partnerId: string;
  partnerName: string;
  entityType?: "place" | "tour" | "opening_hours" | "media" | string;
  changeType?: string;
  entityName: string;
  submittedAt: string;
  status: "PENDING" | "PENDING_REVIEW" | "APPROVED" | "REJECTED" | "CHANGES_REQUESTED";
  currentData: Record<string, any>;
  proposedData: Record<string, any>;
  changeSummary?: string;
}

// ─── Content / Editorial Articles ──────────────────────────
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  summary?: string;
  category?: string;
  body: string;
  coverImage: string;
  destinationSlug?: string;
  destinationName?: string;
  author: string;
  status: PublicationStatus;
  publishAt?: string;
  tags?: string[];
  updatedAt: string;
}

// ─── Review Moderation ─────────────────────────────────────
export type ReviewModerationStatus = "PUBLISHED" | "REPORTED" | "HIDDEN" | "REMOVED";

export interface ModeratedReview {
  id: string;
  placeName: string;
  placeSlug?: string;
  authorName: string;
  authorEmail?: string;
  rating: number;
  body?: string;
  content?: string;
  createdAt: string;
  reportCount: number;
  reportReasons?: string[];
  reportReason?: string;
  status: ReviewModerationStatus;
  moderationHistory: { action: string; moderator: string; timestamp: string; reason?: string }[];
}

// ─── CRM-Lite / Inquiries & Leads ──────────────────────────
export type LeadStatus =
  | "NEW"
  | "ASSIGNED"
  | "CONTACTED"
  | "QUALIFIED"
  | "CONVERTED"
  | "LOST";

export type LeadSource =
  | "website"
  | "organic_search"
  | "facebook"
  | "zalo"
  | "ai_assistant"
  | "partner"
  | "campaign"
  | "direct"
  | string;

export interface CustomerLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: LeadSource;
  destinationInterest?: string;
  estimatedBudget?: string;
  status: LeadStatus;
  assignedStaff?: string;
  message?: string;
  inquiryDetails?: string;
  createdAt: string;
  updatedAt: string;
  internalNotes: { id: string; author: string; text: string; createdAt: string }[];
  timeline?: { title: string; timestamp: string; actor: string }[];
}

export interface CustomerUser {
  id: string;
  username?: string;
  fullName: string;
  email: string;
  phone?: string;
  createdAt: string;
  status: "ACTIVE" | "SUSPENDED";
  favoritesCount: number;
  reviewsCount: number;
  savedTripsCount?: number;
  inquiriesCount: number;
  recentActivity?: string;
  totalSpent?: string;
}

// ─── AI & Knowledge Base ───────────────────────────────────
export type IndexStatus = "NOT_INDEXED" | "PENDING" | "INDEXED" | "FAILED";

export interface KnowledgeSource {
  id: string;
  name: string;
  type: string;
  sourceUrl: string;
  trustLevel: "HIGH" | "MEDIUM" | "UNVERIFIED" | string;
  status: "ACTIVE" | "PAUSED" | string;
  lastCrawledAt?: string;
  documentCount?: number;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  sourceId?: string;
  sourceName?: string;
  source?: string;
  destination: string;
  contentType: string;
  language: string;
  verified?: boolean;
  isVerified?: boolean;
  lastUpdated: string;
  indexStatus: IndexStatus;
  chunkCount?: number;
  contentSnippet?: string;
}

// ─── Analytics ─────────────────────────────────────────────
export interface OperationalMetrics {
  totalSearches: number;
  destinationViews: number;
  placeViews: number;
  newLeadsToday: number;
  activePartners: number;
  publishedDestinations: number;
  pendingReviewsCount: number;
  pendingApplicationsCount: number;
}

// ─── Immutable Audit Log ───────────────────────────────────
export interface AuditLogEvent {
  id: string;
  actor: string;
  actorRole: string;
  action: string;
  entityType: string;
  entityId: string;
  entityName: string;
  timestamp: string;
  ipAddress: string;
  metadata: Record<string, any>;
}
