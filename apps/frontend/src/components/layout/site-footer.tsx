import Link from "next/link";

const navLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Điểm đến", href: "/destinations" },
  { label: "Trải nghiệm", href: "/experiences" },
  { label: "Tours", href: "/tours" },
  { label: "Câu chuyện", href: "/stories" },
  { label: "Liên hệ", href: "/contact" },
  { label: "Quản trị Portal", href: "/portal" },
];

export function SiteFooter() {
  return (
    <footer className="template-page-bg py-12 md:py-16 relative z-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center">

          {/* Brand row — centered and enlarged */}
          <Link
            href="/"
            className="group flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 transition-transform hover:scale-[1.02]"
            aria-label="Star Travels Trang chủ"
          >
            {/* Enlarged teal star */}
            <svg
              width="52"
              height="52"
              viewBox="0 0 100 100"
              fill="#0098a2"
              aria-hidden="true"
              className="size-11 sm:size-13 md:size-14 shrink-0 transition-transform group-hover:rotate-12 duration-300"
            >
              <polygon points="50,5 64,36 98,38 72,60 80,94 50,75 20,94 28,60 2,38 36,36" />
            </svg>

            {/* Brand name — prominently enlarged */}
            <span className="logo-title text-5xl sm:text-6xl md:text-7xl leading-none text-slate-900 select-none tracking-normal font-normal">
              Star Travels
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
