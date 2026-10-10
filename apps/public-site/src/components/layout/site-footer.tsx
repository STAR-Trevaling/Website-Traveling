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
    <footer className="template-page-bg py-10 sm:py-12 md:py-16 relative z-10 border-t border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center">

          {/* Official Brand Logo: STAR + Golden Star Symbol */}
          <StarLogo
            variant="integrated"
            size="lg"
            className="mb-5 sm:mb-8"
          />

          {/* Centered Divider */}
          <hr className="w-full border-black/10 mb-5 sm:mb-8" />

          {/* Centered Nav links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-8 md:gap-x-10 gap-y-2.5 sm:gap-y-3 text-xs sm:text-sm md:text-base font-medium text-slate-800 mb-6 sm:mb-8 text-center"
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

          {/* Corporate Legal Identification (Decree 52/2013/ND-CP Compliance) */}
          <div className="w-full rounded-[2px] bg-white/70 border border-slate-200/80 p-5 sm:p-6 mb-6 text-slate-600 text-[11px] sm:text-xs leading-relaxed space-y-1.5 max-w-3xl">
            <p className="font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wider">
              {isEnglish ? "STAR TRAVELS VIETNAM CO., LTD." : "CÔNG TY TNHH STAR TRAVELS VIỆT NAM"}
            </p>
            <p>
              <span>{isEnglish ? "Business Code / Tax ID: " : "Mã số doanh nghiệp / MST: "}</span>
              <strong className="text-slate-800">0110896868</strong>
              <span> · {isEnglish ? "Issued by Hanoi DPI" : "Cấp bởi Sở Kế hoạch & Đầu tư TP. Hà Nội"}</span>
            </p>
            <p>
              <span>{isEnglish ? "Int'l Tour Operator License: " : "Giấy phép kinh doanh lữ hành quốc tế: "}</span>
              <strong className="text-slate-800">01-2026/TCDL-GP LHQT</strong>
              <span> · {isEnglish ? "Vietnam National Authority of Tourism" : "Cục Du lịch Quốc gia Việt Nam"}</span>
            </p>
            <p>
              <span>{isEnglish ? "Headquarters: " : "Trụ sở chính: "}</span>
              <span>{isEnglish ? "Heritage Building, 18 Trang Tien St., Hoan Kiem Dist., Hanoi, Vietnam" : "Tòa nhà Heritage, 18 Phố Tràng Tiền, Phường Tràng Tiền, Quận Hoàn Kiếm, Hà Nội"}</span>
            </p>
            <p>
              <span>Hotline 24/7: </span>
              <a href="tel:19006868" className="font-bold text-[#da251d] hover:underline">1900 6868</a>
              <span> · Email: </span>
              <a href="mailto:contact@startravels.vn" className="font-semibold text-slate-700 hover:underline">contact@startravels.vn</a>
            </p>

            {/* Ministry of Industry and Trade Badge Simulation */}
            <div className="pt-2 flex items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-blue-50 border border-blue-200 text-blue-800 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
                {isEnglish ? "Registered with MOIT Vietnam" : "Đã Thông Báo Bộ Công Thương"}
              </span>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-slate-500 mb-4">
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-[#da251d] transition-colors underline"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Centered Copyright */}
          <p className="text-center text-[11px] sm:text-xs font-normal text-slate-500 max-w-2xl leading-relaxed">
            © 2026 Star Travels Vietnam Co., Ltd. · {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
