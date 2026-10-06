"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";

export function SiteFooter() {
  const { t, isVietnamese, reopenLanguagePrompt } = useLanguage();

  const navLinks = [
    { label: t.footer.home, href: "/" },
    { label: t.footer.destinations, href: "/destinations" },
    { label: t.footer.experiences, href: "/experiences" },
    { label: t.footer.tours, href: "/tours" },
    { label: t.footer.stories, href: "/stories" },
    { label: t.footer.aboutUs, href: "/about" },
    { label: t.footer.contact, href: "/contact" },
    { label: t.footer.partner, href: "/partner" },
  ];

  return (
    <footer className="template-page-bg py-12 md:py-16 relative z-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center">

          {/* Brand row — centered and enlarged with golden star behind 'Star' */}
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center mb-6 sm:mb-8 transition-transform hover:scale-[1.03]"
            aria-label="Star Travels"
          >
            {/* Brand name with golden star backdrop */}
            <span className="logo-title text-6xl sm:text-7xl md:text-8xl lg:text-[96px] leading-none text-slate-900 select-none tracking-normal font-normal flex items-center">
              {/* 'Star' with golden star situated directly behind it */}
              <span className="relative inline-flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  fill="#eab308"
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-16 sm:size-20 md:size-24 lg:size-28 shrink-0 text-[#eab308] opacity-85 -z-10 pointer-events-none drop-shadow-[0_2px_12px_rgba(234,179,8,0.45)] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                >
                  <polygon points="50,5 64,36 98,38 72,60 80,94 50,75 20,94 28,60 2,38 36,36" />
                </svg>
                <span className="relative z-10">Star</span>
              </span>
              <span className="ml-3 sm:ml-4">Travels</span>
            </span>
          </Link>

          {/* Centered Divider */}
          <hr className="w-full border-black/15 mb-6 sm:mb-8" />

          {/* Centered Nav links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-10 gap-y-3 text-sm sm:text-base font-medium text-slate-800 mb-8 sm:mb-10 text-center"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-black hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language Selector trigger */}
          <div className="mb-4">
            <button
              type="button"
              onClick={reopenLanguagePrompt}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition hover:underline cursor-pointer"
            >
              <span>🌐 {isVietnamese ? "Ngôn ngữ: Tiếng Việt" : "Language: English"}</span>
              <span className="text-slate-400">·</span>
              <span className="text-[#0098a2] font-medium">{isVietnamese ? "Thay đổi" : "Change"}</span>
            </button>
          </div>

          {/* Centered Copyright */}
          <p className="text-center text-xs sm:text-sm font-normal text-slate-600 max-w-2xl leading-relaxed">
            © 2026 Star Travels Vietnam · {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
