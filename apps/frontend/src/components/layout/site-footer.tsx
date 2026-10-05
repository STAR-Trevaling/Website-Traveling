import Link from "next/link";

const navLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Điểm đến", href: "/destinations" },
  { label: "Trải nghiệm", href: "/experiences" },
  { label: "Tours", href: "/tours" },
  { label: "Câu chuyện", href: "/stories" },
  { label: "Liên hệ", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="template-page-bg py-12 md:py-16 relative z-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center">

          {/* Brand row — centered and enlarged with golden star behind 'Star' */}
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center mb-6 sm:mb-8 transition-transform hover:scale-[1.03]"
            aria-label="Star Travels Trang chủ"
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

          {/* Centered Copyright */}
          <p className="text-center text-xs sm:text-sm font-normal text-slate-600">
            © 2026 StarTravels Vietnam · Khám phá Việt Nam theo cách của bạn ·{" "}
            <Link href="/privacy" className="hover:text-black hover:underline transition">
              Chính sách bảo mật
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
