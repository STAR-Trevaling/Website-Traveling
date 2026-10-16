import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIES, ROUTE_PERMISSIONS, ROLES } from "@/lib/auth-constants";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Retrieve auth cookies
  const accessToken = request.cookies.get(AUTH_COOKIES.ACCESS_TOKEN)?.value;
  const userSessionCookie = request.cookies.get(AUTH_COOKIES.USER_SESSION)?.value;
  const refreshToken = request.cookies.get(AUTH_COOKIES.REFRESH_TOKEN)?.value;

  const isAuthenticated = Boolean(accessToken || userSessionCookie || refreshToken);

  let userRole: string = ROLES.TRAVELER;
  let isStaff = false;
  if (userSessionCookie) {
    try {
      const parsedUser = JSON.parse(userSessionCookie);
      userRole = parsedUser.role || ROLES.TRAVELER;
      isStaff = Boolean(parsedUser.is_staff);
    } catch {
      // Ignore parsing errors
    }
  }

  // 1. Guard Auth Routes (/login, /register)
  // If the user is already authenticated, redirect them to /account or returnUrl
  const isAuthRoute = ROUTE_PERMISSIONS.AUTH_ROUTES.some((route) =>
    pathname === route || pathname.startsWith(route + "/")
  );

  if (isAuthRoute && isAuthenticated) {
    const returnUrl = request.nextUrl.searchParams.get("returnUrl");
    const targetUrl = returnUrl && returnUrl.startsWith("/") ? returnUrl : "/account";
    return NextResponse.redirect(new URL(targetUrl, request.url));
  }

  // 2. Guard Protected Routes (/account/*, /booking/*)
  const isProtectedRoute = ROUTE_PERMISSIONS.PROTECTED_PREFIXES.some((prefix) =>
    pathname === prefix || pathname.startsWith(prefix + "/")
  );

  if (isProtectedRoute && !isAuthenticated) {
    let reason = "auth_required";
    if (pathname.includes("/payment")) {
      reason = "payment";
    } else if (pathname.includes("/success")) {
      reason = "view_booking";
    } else if (pathname.startsWith("/booking")) {
      reason = "booking";
    } else if (pathname.startsWith("/account/bookings")) {
      reason = "view_booking";
    }

    const returnUrl = `${pathname}${search}`;
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("returnUrl", returnUrl);
    loginUrl.searchParams.set("reason", reason);

    return NextResponse.redirect(loginUrl);
  }

  // 3. Guard Role-Restricted Routes (RBAC)
  for (const restriction of ROUTE_PERMISSIONS.ROLE_RESTRICTED) {
    if (pathname === restriction.prefix || pathname.startsWith(restriction.prefix + "/")) {
      if (!isAuthenticated) {
        const returnUrl = `${pathname}${search}`;
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("returnUrl", returnUrl);
        loginUrl.searchParams.set("reason", "role_required");
        return NextResponse.redirect(loginUrl);
      }

      // Check if user has required role (admins and staff have universal access)
      const allowedRoles = restriction.allowedRoles as readonly string[];
      const hasPermission =
        isStaff ||
        userRole === ROLES.ADMIN ||
        allowedRoles.includes(userRole);

      if (!hasPermission) {
        const unauthorizedUrl = new URL("/unauthorized", request.url);
        unauthorizedUrl.searchParams.set("required", restriction.allowedRoles.join(","));
        return NextResponse.redirect(unauthorizedUrl);
      }
    }
  }

  return NextResponse.next();
}

/**
 * Configure paths inspected by Next.js Edge Middleware.
 * Excludes static files, Next.js internal chunks, image optimizations, and public assets.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets/* (public assets)
     * - api/auth/* (internal auth route handlers)
     */
    "/((?!_next/static|_next/image|favicon.ico|assets|api/auth).*)",
  ],
};
