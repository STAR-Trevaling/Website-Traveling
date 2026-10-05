"use client";

import Link from "next/link";
import { Mail, Phone, Instagram, Facebook, Twitter, UserRound } from "lucide-react";
import type { CurrentUser } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/context";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";

interface SiteHeaderClientProps {
  user: CurrentUser | null;
  overlay?: boolean;
}

export function SiteHeaderClient({ user, overlay = false }: SiteHeaderClientProps) {
  const { t } = useLanguage();

  const navItems = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.packages, href: "/experiences" },
    { label: t.nav.tours, href: "/tours" },
    { label: t.nav.aboutUs, href: "/about" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-30 text-white"
          : "bg-white text-slate-900 shadow-sm"
      }
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        <div className="flex h-16 items-center justify-between text-xs md:text-sm font-normal">
          {/* Left: Social Icons (Instagram, Twitter, Facebook) */}
          <div className="flex items-center gap-3 sm:gap-4">
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

          {/* Center: Bilingual Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10 text-sm lg:text-base font-normal">
            {navItems.map((item) => (
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

          {/* Right: Phone, Email, Login & Language Switcher */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 text-xs lg:text-sm">
            <span
              className={
                overlay
                  ? "hidden xl:flex items-center gap-1.5 text-white/90"
                  : "hidden xl:flex items-center gap-1.5 text-slate-600"
              }
            >
              <Phone className="size-3.5 opacity-80" />
              {t.nav.phoneLabel}
            </span>
            <a
              href={`mailto:${t.nav.emailLabel}`}
              className={
                overlay
                  ? "hidden lg:flex items-center gap-1.5 text-white/90 hover:opacity-80 transition"
                  : "hidden lg:flex items-center gap-1.5 text-slate-600 hover:text-[#0098a2] transition"
              }
            >
              <Mail className="size-3.5 opacity-80" />
              {t.nav.emailLabel}
            </a>

            <Link
              href={user ? "/account" : "/login"}
              aria-label={t.nav.account}
              className={
                overlay
                  ? "hidden sm:flex items-center gap-1.5 font-medium hover:opacity-80 transition text-white"
                  : "hidden sm:flex items-center gap-1.5 font-medium hover:text-[#0098a2] transition text-slate-800"
              }
            >
              <UserRound className="size-4 opacity-80" />
              <span>{user ? user.username : t.nav.login}</span>
            </Link>

            {/* Language Switcher Button (VI | EN) */}
            <LanguageSwitcher overlay={overlay} />

            {/* Mobile Navigation Drawer Toggle */}
            <MobileNav user={user} overlay={overlay} />
          </div>
        </div>
      </div>
    </header>
  );
}
