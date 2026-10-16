import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIES, TOKEN_LIFETIMES, DEFAULT_COOKIE_OPTIONS } from "@/lib/auth-constants";

const BASE = process.env.BACKEND_URL ?? "http://localhost:8000/api/v1";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(AUTH_COOKIES.REFRESH_TOKEN)?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { ok: false, message: "No refresh token available." },
      { status: 401 }
    );
  }

  try {
    const res = await fetch(`${BASE}/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      const response = NextResponse.json({ ok: true });

      // Update access token cookie
      response.cookies.set(AUTH_COOKIES.ACCESS_TOKEN, data.access, {
        ...DEFAULT_COOKIE_OPTIONS,
        maxAge: TOKEN_LIFETIMES.ACCESS_TOKEN_MAX_AGE,
      });

      // If backend uses refresh token rotation and returned a new refresh token
      if (data.refresh) {
        response.cookies.set(AUTH_COOKIES.REFRESH_TOKEN, data.refresh, {
          ...DEFAULT_COOKIE_OPTIONS,
          maxAge: TOKEN_LIFETIMES.REFRESH_TOKEN_MAX_AGE,
        });
      }

      return response;
    }
  } catch {
    // If backend is in offline demo mode, refresh demo token
    if (refreshToken.startsWith("demo_refresh_")) {
      const response = NextResponse.json({ ok: true });
      response.cookies.set(AUTH_COOKIES.ACCESS_TOKEN, `demo_access_${Date.now()}`, {
        ...DEFAULT_COOKIE_OPTIONS,
        maxAge: TOKEN_LIFETIMES.ACCESS_TOKEN_MAX_AGE,
      });
      return response;
    }
  }

  // If refresh failed (expired or revoked), clear cookies to require re-login
  const response = NextResponse.json(
    { ok: false, message: "Session expired. Please sign in again." },
    { status: 401 }
  );

  response.cookies.set(AUTH_COOKIES.ACCESS_TOKEN, "", { path: "/", maxAge: 0 });
  response.cookies.set(AUTH_COOKIES.REFRESH_TOKEN, "", { path: "/", maxAge: 0 });
  response.cookies.set(AUTH_COOKIES.USER_SESSION, "", { path: "/", maxAge: 0 });

  return response;
}
