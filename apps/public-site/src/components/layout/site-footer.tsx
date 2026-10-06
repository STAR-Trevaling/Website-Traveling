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
    <footer className="template-page-bg py-12 md:py-16 relative z-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center">

          {/* Official Brand Logo: STAR + Golden Star Symbol */}
          <StarLogo
            variant="integrated"
            size="xl"
            className="mb-6 sm:mb-8"
          />

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
