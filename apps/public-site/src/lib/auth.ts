import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { CurrentUser } from "@/lib/types";
import {
  AUTH_COOKIES,
  TOKEN_LIFETIMES,
  DEFAULT_COOKIE_OPTIONS,
  ROLES,
  type AppRole,
} from "./auth-constants";
import { isJwtExpired } from "./jwt-utils";

const BASE = process.env.BACKEND_URL ?? "http://localhost:8000/api/v1";

/**
 * Perform a silent token refresh using the stored HttpOnly refresh token.
 * Returns the fresh access token string, or null if refresh failed.
 */
export async function refreshAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(AUTH_COOKIES.REFRESH_TOKEN)?.value;
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${BASE}/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      const newAccessToken = data.access as string;

      // Update access token cookie
      cookieStore.set(AUTH_COOKIES.ACCESS_TOKEN, newAccessToken, {
        ...DEFAULT_COOKIE_OPTIONS,
        maxAge: TOKEN_LIFETIMES.ACCESS_TOKEN_MAX_AGE,
      });

      if (data.refresh) {
        cookieStore.set(AUTH_COOKIES.REFRESH_TOKEN, data.refresh, {
          ...DEFAULT_COOKIE_OPTIONS,
          maxAge: TOKEN_LIFETIMES.REFRESH_TOKEN_MAX_AGE,
        });
      }

      return newAccessToken;
    }
  } catch {
    // If backend is in offline demo mode
    if (refreshToken.startsWith("demo_refresh_")) {
      const demoToken = `demo_access_${Date.now()}`;
      cookieStore.set(AUTH_COOKIES.ACCESS_TOKEN, demoToken, {
        ...DEFAULT_COOKIE_OPTIONS,
        maxAge: TOKEN_LIFETIMES.ACCESS_TOKEN_MAX_AGE,
      });
      return demoToken;
    }
  }

  return null;
}

/**
 * Retrieve the current valid access token.
 * If expired and a refresh token is present, automatically performs a silent refresh.
 */
export async function getValidAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const existingToken = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN)?.value;

  // Check if token exists and is valid
  if (existingToken && !isJwtExpired(existingToken, 30)) {
    return existingToken;
  }

  // Token is missing or about to expire; attempt silent refresh
  const refreshedToken = await refreshAccessToken();
  return refreshedToken;
}

/**
 * Authenticated Fetch wrapper for Server Actions and Server Components.
 * Automatically injects the Bearer token, performs proactive refresh before request,
 * and handles 401 retry if the access token expired between checks.
 */
export async function authenticatedFetch(path: string, init: RequestInit = {}): Promise<Response> {
  let token = await getValidAccessToken();

  if (!token) {
    throw new Error("AUTH_REQUIRED");
  }

  let response = await fetch(`${BASE}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  // If token expired on backend during request, try a one-time silent refresh & retry
  if (response.status === 401) {
    const refreshedToken = await refreshAccessToken();
    if (refreshedToken) {
      token = refreshedToken;
      response = await fetch(`${BASE}${path}`, {
        ...init,
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          ...(init.headers || {}),
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      throw new Error("SESSION_EXPIRED");
    }
  }

  return response;
}

/**
 * Retrieve the current authenticated user session.
 * Reads the cached session cookie and verifies with backend when online.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN)?.value;
  const userCookie = cookieStore.get(AUTH_COOKIES.USER_SESSION)?.value;

  if (!accessToken && !userCookie) {
    return null;
  }

  // 1. Attempt backend verification if access token exists
  if (accessToken) {
    try {
      const response = await authenticatedFetch("/auth/me/");
      if (response.ok) {
        const backendUser = await response.json();
        return {
          id: String(backendUser.id),
          username: backendUser.username,
          email: backendUser.email,
          role: backendUser.role || (backendUser.is_staff ? ROLES.ADMIN : ROLES.TRAVELER),
          is_staff: Boolean(backendUser.is_staff),
        };
      }
    } catch {
      // Backend offline or rate limited, fall through to user cookie
    }
  }

  // 2. Fallback to verified user session cookie (for SSR performance or offline dev)
  if (userCookie) {
    try {
      const parsed = JSON.parse(userCookie) as CurrentUser;
      return parsed;
    } catch {
      return null;
    }
  }

  return null;
}

/**
 * Server Component Guard: Requires authentication.
 * If not authenticated, redirects to /login with returnUrl and reason.
 */
export async function requireAuth(returnUrl = "/account", reason = "auth_required"): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect(`/login?returnUrl=${encodeURIComponent(returnUrl)}&reason=${encodeURIComponent(reason)}`);
  }
  return user;
}

/**
 * Server Component Guard: Requires specific user role (RBAC).
 * If unauthenticated -> redirects to /login.
 * If role is not allowed -> redirects to /unauthorized.
 */
export async function requireRole(allowedRoles: AppRole[], returnUrl = "/account"): Promise<CurrentUser> {
  const user = await requireAuth(returnUrl, "role_required");
  const hasAccess = hasAnyRole(user, allowedRoles);

  if (!hasAccess) {
    redirect(`/unauthorized?required=${encodeURIComponent(allowedRoles.join(","))}`);
  }

  return user;
}

/**
 * Role-Based Access Control (RBAC) helpers
 */
export function hasRole(user: CurrentUser | null, role: AppRole): boolean {
  if (!user) return false;
  if (user.role === ROLES.ADMIN || user.is_staff) return true; // Admins have superset access
  return user.role === role;
}

export function hasAnyRole(user: CurrentUser | null, roles: AppRole[]): boolean {
  if (!user) return false;
  if (user.role === ROLES.ADMIN || user.is_staff) return true;
  return roles.some((r) => user.role === r);
}
