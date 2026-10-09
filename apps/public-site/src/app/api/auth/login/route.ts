import { NextResponse } from "next/server";
import { AUTH_COOKIES, TOKEN_LIFETIMES, DEFAULT_COOKIE_OPTIONS } from "@/lib/auth-constants";

const BASE = process.env.BACKEND_URL ?? "http://localhost:8000/api/v1";

export async function POST(request: Request) {
  let credentials: { username?: string; password?: string } = {};
  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }

  try {
    const r = await fetch(`${BASE}/auth/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      cache: "no-store",
    });

    if (r.ok) {
      const body = await r.json();

      // Fetch user profile from /auth/me/ with the acquired access token
      let userData = {
        id: "1",
        username: credentials.username || "traveler_demo",
        email: "traveler@example.com",
        role: "traveler",
        is_staff: false,
      };

      try {
        const meRes = await fetch(`${BASE}/auth/me/`, {
          headers: { Authorization: `Bearer ${body.access}` },
          cache: "no-store",
        });
        if (meRes.ok) {
          const realMe = await meRes.json();
          userData = {
            id: String(realMe.id || userData.id),
            username: realMe.username || userData.username,
            email: realMe.email || userData.email,
            role: realMe.role || (realMe.is_staff ? "admin" : "traveler"),
            is_staff: Boolean(realMe.is_staff),
          };
        }
      } catch {
        // Fallback to standard credentials if /auth/me/ is unreachable
      }

      const response = NextResponse.json({ ok: true, user: userData });

      // 1. HttpOnly Access Token (Short-lived: 30 minutes)
      response.cookies.set(AUTH_COOKIES.ACCESS_TOKEN, body.access, {
        ...DEFAULT_COOKIE_OPTIONS,
        maxAge: TOKEN_LIFETIMES.ACCESS_TOKEN_MAX_AGE,
      });

      // 2. HttpOnly Refresh Token (Long-lived: 7 days)
      response.cookies.set(AUTH_COOKIES.REFRESH_TOKEN, body.refresh, {
        ...DEFAULT_COOKIE_OPTIONS,
        maxAge: TOKEN_LIFETIMES.REFRESH_TOKEN_MAX_AGE,
      });

      // 3. User Session Cookie (Used for fast client SSR & Edge Middleware RBAC checks)
      response.cookies.set(AUTH_COOKIES.USER_SESSION, JSON.stringify(userData), {
        httpOnly: false, // Accessible to client-side session hydration
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: TOKEN_LIFETIMES.USER_SESSION_MAX_AGE,
      });

      return response;
    }
  } catch {
    // If backend is offline in local development, allow ONLY explicit demo traveler credentials
    if (
      process.env.NODE_ENV !== "production" &&
      credentials.username === "traveler_demo" &&
      credentials.password === "TravelerDemo123!"
    ) {
      const demoRole = "traveler";

      const demoUser = {
        id: "1",
        username: "traveler_demo",
        email: "traveler_demo@startravels.com",
        role: "traveler",
        is_staff: false,
      };

      const response = NextResponse.json({ ok: true, user: demoUser });

      response.cookies.set(AUTH_COOKIES.ACCESS_TOKEN, `demo_access_${Date.now()}`, {
        ...DEFAULT_COOKIE_OPTIONS,
        maxAge: TOKEN_LIFETIMES.ACCESS_TOKEN_MAX_AGE,
      });

      response.cookies.set(AUTH_COOKIES.REFRESH_TOKEN, `demo_refresh_${Date.now()}`, {
        ...DEFAULT_COOKIE_OPTIONS,
        maxAge: TOKEN_LIFETIMES.REFRESH_TOKEN_MAX_AGE,
      });

      response.cookies.set(AUTH_COOKIES.USER_SESSION, JSON.stringify(demoUser), {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: TOKEN_LIFETIMES.USER_SESSION_MAX_AGE,
      });

      return response;
    }
  }

  return NextResponse.json({ message: "Invalid username or password." }, { status: 401 });
}
