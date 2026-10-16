/**
 * Marketing Attribution & UTM Tracking Utility
 * Captures utm_source, utm_medium, utm_campaign, utm_content, utm_term, gclid, fbclid
 * and stores them in sessionStorage, localStorage, and cookie with a 30-day attribution window.
 */

export interface UtmAttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  landing_page?: string;
  referrer?: string;
  captured_at?: string;
}

const STORAGE_KEY = "star_travels_utm";
const COOKIE_NAME = "star_travels_utm";
const ATTRIBUTION_DAYS = 30;

function parseQueryString(queryString: string): Record<string, string> {
  const params: Record<string, string> = {};
  const search = queryString.startsWith("?") ? queryString.slice(1) : queryString;
  if (!search) return params;

  for (const pair of search.split("&")) {
    const [key, val] = pair.split("=");
    if (key && val) {
      try {
        params[decodeURIComponent(key).toLowerCase()] = decodeURIComponent(val);
      } catch {
        params[key.toLowerCase()] = val;
      }
    }
  }
  return params;
}

/**
 * Capture UTM and ad click IDs from the current URL if present.
 * Does not overwrite existing UTM attribution unless a new campaign is detected.
 */
export function captureUtmFromUrl(currentUrl?: string): UtmAttributionData | null {
  if (typeof window === "undefined") return null;

  try {
    const urlStr = currentUrl || window.location.href;
    const url = new URL(urlStr);
    const params = parseQueryString(url.search);

    const hasUtm =
      Boolean(params.utm_source) ||
      Boolean(params.utm_medium) ||
      Boolean(params.utm_campaign) ||
      Boolean(params.gclid) ||
      Boolean(params.fbclid);

    if (!hasUtm) {
      return getStoredUtm();
    }

    const newAttribution: UtmAttributionData = {
      utm_source: params.utm_source || (params.gclid ? "google_ads" : params.fbclid ? "facebook_ads" : undefined),
      utm_medium: params.utm_medium || (params.gclid || params.fbclid ? "cpc" : undefined),
      utm_campaign: params.utm_campaign,
      utm_content: params.utm_content,
      utm_term: params.utm_term,
      gclid: params.gclid,
      fbclid: params.fbclid,
      landing_page: url.pathname + url.search,
      referrer: document.referrer || undefined,
      captured_at: new Date().toISOString(),
    };

    saveUtmAttribution(newAttribution);
    return newAttribution;
  } catch (err) {
    console.warn("Failed to capture UTM attribution:", err);
    return null;
  }
}

/**
 * Save UTM attribution data to localStorage, sessionStorage, and cookie.
 */
export function saveUtmAttribution(data: UtmAttributionData): void {
  if (typeof window === "undefined") return;

  try {
    const jsonStr = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, jsonStr);
    sessionStorage.setItem(STORAGE_KEY, jsonStr);

    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + ATTRIBUTION_DAYS);
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(jsonStr)}; expires=${expiresDate.toUTCString()}; path=/; SameSite=Lax`;
  } catch {
    // Silently continue if storage is restricted
  }
}

/**
 * Retrieve the current active UTM attribution data.
 */
export function getStoredUtm(): UtmAttributionData | null {
  if (typeof window === "undefined") return null;

  try {
    // 1. Check sessionStorage
    const sessionData = sessionStorage.getItem(STORAGE_KEY);
    if (sessionData) return JSON.parse(sessionData);

    // 2. Check localStorage
    const localData = localStorage.getItem(STORAGE_KEY);
    if (localData) return JSON.parse(localData);

    // 3. Check Cookie
    const cookies = document.cookie.split(";");
    for (const c of cookies) {
      const [name, val] = c.trim().split("=");
      if (name === COOKIE_NAME && val) {
        return JSON.parse(decodeURIComponent(val));
      }
    }
  } catch {
    return null;
  }

  return null;
}
