"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { StarLogo } from "@/components/shared/star-logo";

export function SiteFooter() {
  const { t, isEnglish } = useLanguage();

  const navLinks = [
    { label: t.footer.home, href: "/" },
    { label: t.footer.destinations, href: "/destinations" },
    { label: t.footer.experiences, href: "/experiences" },
    { label: t.footer.tours, href: "/tours" },
    { label: t.footer.stories, href: "/stories" },
    { label: isEnglish ? "Travel Info Hub" : "Thông Tin Cần Biết", href: "/guide" },
    { label: t.footer.aboutUs, href: "/about" },
    { label: t.footer.contact, href: "/contact" },
    { label: t.footer.partner, href: "/partner" },
  ];

  const legalLinks = [
    { label: isEnglish ? "Terms of Service" : "Điều Khoản Dịch Vụ", href: "/terms" },
    { label: isEnglish ? "Privacy Policy (Decree 13)" : "Chính Sách Bảo Mật (Nghị Định 13)", href: "/privacy" },
    { label: isEnglish ? "UML System Architecture" : "Sơ Đồ Kiến Trúc UML", href: "/diagrams" },
  ];

  return (
    <footer className="w-full bg-white/95 backdrop-blur-md py-10 sm:py-12 md:py-16 relative z-10 border-t border-slate-200/80 shadow-[0_-4px_24px_rgba(0,0,0,0.05)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center">

          {/* Official Brand Logo: STAR + Golden Star Symbol */}
          <StarLogo
            variant="integrated"
            size="lg"
            className="mb-5 sm:mb-8"
          />

          {/* Centered Divider */}
          <hr className="w-full border-slate-300/80 mb-5 sm:mb-8" />

          {/* Centered Nav links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-8 md:gap-x-10 gap-y-2.5 sm:gap-y-3 text-xs sm:text-sm md:text-base font-bold text-slate-900 mb-6 sm:mb-8 text-center"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[#da251d] hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Legal Links — High Contrast & Clear */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-[13px] font-semibold text-slate-700 mb-4">
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-[#da251d] transition-colors underline decoration-slate-400 hover:decoration-[#da251d]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Centered Copyright — Crisp & Legible */}
          <p className="text-center text-xs sm:text-[13px] font-medium text-slate-600 max-w-2xl leading-relaxed">
            © 2026 Star Travels Vietnam Co., Ltd. · {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
