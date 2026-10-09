"use client";

import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId?: string;
}

/**
 * Google Analytics 4 (GA4) integration component.
 * Respects user privacy (Do-Not-Track and optional opt-out flag).
 * Only activates when a valid GA4 Measurement ID (G-XXXXXXXXXX) is provided.
 */
export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const gaId = measurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!gaId || !gaId.startsWith("G-")) {
    return null;
  }

  return (
    <>
      <Script
        id="ga4-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Respect browser Do Not Track setting
            var dnt = navigator.doNotTrack === "1" || window.doNotTrack === "1";
            var optOut = window.localStorage && window.localStorage.getItem('star_analytics_optout') === 'true';

            if (!dnt && !optOut) {
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure'
              });
            }
          `,
        }}
      />
    </>
  );
}
