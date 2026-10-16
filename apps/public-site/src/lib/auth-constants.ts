/**
 * Centralized Authentication & Authorization Constants
 * Enforces industry-standard cookie configurations, token lifetimes, and RBAC policies.
 */

// ─── Cookie Names ──────────────────────────────────────────────
export const AUTH_COOKIES = {
  ACCESS_TOKEN: "travel_access",
  REFRESH_TOKEN: "travel_refresh",
  USER_SESSION: "travel_user",
} as const;

// ─── Token Lifetimes (in seconds) ──────────────────────────────
export const TOKEN_LIFETIMES = {
  ACCESS_TOKEN_MAX_AGE: 30 * 60, // 30 minutes
  REFRESH_TOKEN_MAX_AGE: 7 * 24 * 60 * 60, // 7 days
  USER_SESSION_MAX_AGE: 7 * 24 * 60 * 60, // 7 days
} as const;

// ─── Standard Cookie Options ───────────────────────────────────
export const DEFAULT_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

// ─── User Roles (RBAC) ─────────────────────────────────────────
export const ROLES = {
  TRAVELER: "traveler",
  CUSTOMER: "customer",
  PARTNER: "partner",
  STAFF: "staff",
  ADMIN: "admin",
} as const;

export type AppRole = (typeof ROLES)[keyof typeof ROLES] | string;

// ─── Route Access Matrix ───────────────────────────────────────
export const ROUTE_PERMISSIONS = {
  // Routes strictly requiring authentication (any valid role)
  PROTECTED_PREFIXES: [
    "/account",
    "/booking",
  ],
  // Routes restricted to specific roles
  ROLE_RESTRICTED: [
    {
      prefix: "/partner/portal",
      allowedRoles: [ROLES.PARTNER, ROLES.ADMIN, ROLES.STAFF],
    },
    {
      prefix: "/partner/dashboard",
      allowedRoles: [ROLES.PARTNER, ROLES.ADMIN, ROLES.STAFF],
    },
    {
      prefix: "/admin",
      allowedRoles: [ROLES.ADMIN, ROLES.STAFF],
    },
  ],
  // Auth routes (redirect logged-in users away from these)
  AUTH_ROUTES: [
    "/login",
    "/register",
  ],
  // Public static assets & API exclusions for Next.js Middleware
  PUBLIC_FILE_EXCLUSIONS: [
    "/_next",
    "/assets",
    "/images",
    "/favicon.ico",
    "/robots.txt",
    "/sitemap.xml",
  ],
} as const;
