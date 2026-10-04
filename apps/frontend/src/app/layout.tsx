import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://startravels.vn";
const SITE_NAME = "Star Travels Vietnam";

export const metadata: Metadata = {
  /* ── Titles ── */
  title: {
    default: "Star Travels Vietnam — Khám phá du lịch & trải nghiệm bản địa Việt Nam",
    template: "%s | Star Travels Vietnam",
  },
  /* ── Description (primary language: Vietnamese, secondary: English) ── */
  description:
    "Nền tảng khám phá du lịch Việt Nam: Điểm đến, trải nghiệm bản địa & câu chuyện hành trình. Vịnh Hạ Long, Hội An, Phú Quốc, Sa Pa, Nha Trang và hơn thế nữa. | Vietnam travel discovery platform: destinations, local experiences & journey stories.",
  metadataBase: new URL(SITE_URL),

  /* ── Canonical & alternates ── */
  alternates: {
    canonical: "/",
    languages: {
      "vi-VN": "/",
      "en-US": "/en",
    },
  },

  /* ── Keywords (bilingual, long-tail SEO) ── */
  keywords: [
    "du lịch Việt Nam",
    "trải nghiệm bản địa",
    "tour Việt Nam",
    "khám phá Hạ Long",
    "Phú Quốc resort",
    "Hội An travel",
    "Vietnam travel",
    "Vietnam experiences",
    "Vietnam tours",
    "travel platform Vietnam",
    "local experiences Vietnam",
    "Star Travels Vietnam",
  ],

  /* ── OpenGraph ── */
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Star Travels Vietnam — Khám phá du lịch & trải nghiệm bản địa",
    description:
      "Khám phá Việt Nam theo cách của bạn: Điểm đến, trải nghiệm và câu chuyện hành trình đáng nhớ.",
    images: [
      {
        url: `${SITE_URL}/assets/og-cover.jpg`,
        width: 1200,
        height: 630,
        alt: "Star Travels Vietnam — Nền tảng du lịch khám phá Việt Nam",
      },
    ],
  },

  /* ── Twitter Card ── */
  twitter: {
    card: "summary_large_image",
    title: "Star Travels Vietnam",
    description: "Khám phá Việt Nam: Điểm đến, trải nghiệm bản địa & câu chuyện hành trình.",
    images: [`${SITE_URL}/assets/og-cover.jpg`],
  },

  /* ── Robots ── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* ── Verification placeholders ── */
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },
};

/** JSON-LD structured data: Organization + WebSite with SearchAction */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/logo.png`,
      },
      sameAs: [
        "https://www.facebook.com/startravelsvietnam",
        "https://www.instagram.com/startravelsvn",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description:
        "Nền tảng khám phá du lịch Việt Nam: Điểm đến, trải nghiệm bản địa & câu chuyện hành trình.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: ["vi-VN", "en-US"],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/destinations?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        {/* JSON-LD Structured Data */}
        <Script
          id="json-ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col justify-between relative">
        {/* Global background: Nha Trang beach */}
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden select-none">
          <Image
            src="/assets/nha-trang-beach-bg.jpg"
            alt="Bãi biển Nha Trang — Star Travels Vietnam"
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#eaf4f2]/30" />
        </div>

        <div className="flex-1 relative z-0">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
