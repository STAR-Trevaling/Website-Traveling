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
        <div className="mx-auto max-w-4xl">

          {/* Brand row — star LEFT, text right */}
          <div className="flex items-center gap-3 mb-8">
            {/* Small teal star — left-aligned */}
            <svg
              width="36"
              height="36"
              viewBox="0 0 100 100"
              fill="#0098a2"
              aria-hidden="true"
              className="shrink-0"
            >
              <polygon points="50,5 64,36 98,38 72,60 80,94 50,75 20,94 28,60 2,38 36,36" />
            </svg>

            {/* Brand name */}
            <span className="logo-title text-3xl md:text-4xl leading-none text-black select-none">
              Star Travels
            </span>
          </div>

          {/* Divider */}
          <hr className="border-black/10 mb-8" />

          {/* Nav links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-normal text-black/80 md:text-base mb-10"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-black hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-xs font-normal text-black/50 md:text-sm">
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
