"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { StarLogo } from "@/components/shared/star-logo";

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
    <footer className="template-page-bg py-10 sm:py-12 md:py-16 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center">

          {/* Official Brand Logo: STAR + Golden Star Symbol */}
          <StarLogo
            variant="integrated"
            size="lg"
            className="mb-5 sm:mb-8"
          />

          {/* Centered Divider */}
          <hr className="w-full border-black/15 mb-5 sm:mb-8" />

          {/* Centered Nav links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-8 md:gap-x-10 gap-y-2.5 sm:gap-y-3 text-xs sm:text-sm md:text-base font-medium text-slate-800 mb-6 sm:mb-8 text-center"
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
              <span className="text-[#0098a2] font-semibold">{isVietnamese ? "Thay đổi" : "Change"}</span>
            </button>
          </div>

          {/* Centered Copyright */}
          <p className="text-center text-[11px] sm:text-xs md:text-sm font-normal text-slate-600 max-w-2xl leading-relaxed">
            © 2026 Star Travels Vietnam · {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
