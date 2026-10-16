import { NextResponse } from "next/server";
import { AUTH_COOKIES } from "@/lib/auth-constants";

export async function POST() {
  const response = NextResponse.json({ ok: true, message: "Logged out successfully." });

  // Invalidate all authentication and session cookies immediately
  response.cookies.set(AUTH_COOKIES.ACCESS_TOKEN, "", { path: "/", maxAge: 0 });
  response.cookies.set(AUTH_COOKIES.REFRESH_TOKEN, "", { path: "/", maxAge: 0 });
  response.cookies.set(AUTH_COOKIES.USER_SESSION, "", { path: "/", maxAge: 0 });

  return response;
}
