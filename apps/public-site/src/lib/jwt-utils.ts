/**
 * Edge-compatible JWT Decoding & Expiry Utilities
 * Uses standard Web APIs (atob, JSON.parse) ensuring 100% compatibility across
 * Next.js Edge Middleware, Server Components, Route Handlers, and Client Browsers.
 */

export interface JwtPayload {
  token_type?: "access" | "refresh";
  exp?: number;
  iat?: number;
  jti?: string;
  user_id?: string | number;
  username?: string;
  role?: string;
  [key: string]: unknown;
}

/**
 * Decode JWT payload without cryptographic verification.
 * Note: Cryptographic signature verification is handled by the backend /auth/me/ endpoint.
 * This decoding is used for client/middleware expiry checks and token lifecycle management.
 */
export function decodeJwtPayload(token: string): JwtPayload | null {
  if (!token || typeof token !== "string") return null;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    // Convert base64url to base64
    let base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    // Pad base64 string if necessary
    const pad = base64.length % 4;
    if (pad) {
      base64 += "=".repeat(4 - pad);
    }

    // Decode base64 string
    const decodedStr = typeof atob === "function"
      ? atob(base64)
      : Buffer.from(base64, "base64").toString("utf8");

    // Handle UTF-8 decoding
    const jsonStr = decodeURIComponent(
      Array.prototype.map
        .call(decodedStr, (c: string) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonStr) as JwtPayload;
  } catch {
    try {
      // Fallback for simple ASCII payloads
      const parts = token.split(".");
      const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      const decoded = typeof atob === "function" ? atob(base64) : Buffer.from(base64, "base64").toString("utf8");
      return JSON.parse(decoded) as JwtPayload;
    } catch {
      return null;
    }
  }
}

/**
 * Check if a JWT is expired or within the leeway window (default 60 seconds).
 * Proactively refreshing before the exact expiry second prevents race conditions.
 */
export function isJwtExpired(token: string, skewSeconds = 60): boolean {
  if (!token) return true;
  const payload = decodeJwtPayload(token);
  if (!payload || !payload.exp) {
    // If token has no exp claim, assume expired or mock token
    return false;
  }
  const now = Math.floor(Date.now() / 1000);
  return payload.exp <= now + skewSeconds;
}

/**
 * Get remaining validity time in seconds. Returns 0 if expired or invalid.
 */
export function getJwtRemainingSeconds(token: string): number {
  if (!token) return 0;
  const payload = decodeJwtPayload(token);
  if (!payload || !payload.exp) return 0;
  const now = Math.floor(Date.now() / 1000);
  const diff = payload.exp - now;
  return diff > 0 ? diff : 0;
}
