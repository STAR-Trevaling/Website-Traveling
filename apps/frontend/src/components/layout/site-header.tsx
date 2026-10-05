import Link from "next/link";
import { Mail, Phone, Instagram, Facebook, Twitter, UserRound } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { MobileNav } from "./mobile-nav";

interface SiteHeaderProps {
  overlay?: boolean;
}

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/experiences" },
  { label: "Tours", href: "/tours" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export async function SiteHeader({ overlay = false }: SiteHeaderProps) {
  const user = await getCurrentUser();

  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-30 text-white"
          : "bg-white text-slate-900 shadow-sm"
      }
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex h-16 items-center justify-between text-xs md:text-sm font-normal">
          {/* Left: Social Icons (Instagram, Twitter, Facebook) */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:opacity-80 transition"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:opacity-80 transition"
            >
              <Twitter className="size-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:opacity-80 transition"
            >
              <Facebook className="size-4" />
            </a>
          </div>

          {/* Center: Navigation Links matching template */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12 text-sm lg:text-base font-normal">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  overlay
                    ? "transition hover:text-white/80 hover:underline"
                    : "text-slate-700 transition hover:text-[#0098a2] hover:underline"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: Phone, Email & Login */}
          <div className="flex items-center gap-5 text-xs lg:text-sm">
            <span
              className={
                overlay
                  ? "hidden sm:flex items-center gap-1.5 text-white/90"
                  : "hidden sm:flex items-center gap-1.5 text-slate-600"
              }
            >
              <Phone className="size-3.5 opacity-80" />
              +1 334 445 623
            </span>
            <a
              href="mailto:contact@startravels.com"
              className={
                overlay
                  ? "hidden lg:flex items-center gap-1.5 text-white/90 hover:opacity-80 transition"
                  : "hidden lg:flex items-center gap-1.5 text-slate-600 hover:text-[#0098a2] transition"
              }
            >
              <Mail className="size-3.5 opacity-80" />
              contact@startravels.com
            </a>
            <Link
              href={user ? "/account" : "/login"}
              aria-label="Tài khoản"
              className={
                overlay
                  ? "hidden sm:flex items-center gap-1.5 font-medium hover:opacity-80 transition text-white"
                  : "hidden sm:flex items-center gap-1.5 font-medium hover:text-[#0098a2] transition text-slate-800"
              }
            >
              <UserRound className="size-4 opacity-80" />
              <span>{user ? user.username : "Đăng nhập"}</span>
            </Link>

            {/* Mobile Navigation Drawer Toggle */}
            <MobileNav user={user} overlay={overlay} />
          </div>
        </div>
      </div>
    </header>
  );
}
