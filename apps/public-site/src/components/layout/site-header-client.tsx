"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  UserRound,
} from "lucide-react";
import type { CurrentUser } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/context";
import { MobileNav } from "./mobile-nav";

interface SiteHeaderClientProps {
  user: CurrentUser | null;
  overlay?: boolean;
}

export function SiteHeaderClient({ user, overlay = false }: SiteHeaderClientProps) {
  const { t } = useLanguage();

  const navLinks = [
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
          : "bg-white text-slate-900 shadow-sm border-b border-slate-100"
      }
    >
      <div className="w-full px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20">
        <div className="relative flex h-16 sm:h-18 md:h-20 items-center justify-between">
          {/* Left: 3 Social Media Icons (Instagram, Twitter, Facebook) */}
          <div className="flex items-center gap-3.5 sm:gap-4 shrink-0 z-10">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={
                overlay
                  ? "text-white/90 hover:text-white transition-opacity duration-150 p-1"
                  : "text-slate-600 hover:text-slate-900 transition-colors duration-150 p-1"
              }
            >
              <Instagram className="size-4 sm:size-[18px]" strokeWidth={1.8} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className={
                overlay
                  ? "text-white/90 hover:text-white transition-opacity duration-150 p-1"
                  : "text-slate-600 hover:text-slate-900 transition-colors duration-150 p-1"
              }
            >
              <Twitter className="size-4 sm:size-[18px]" strokeWidth={1.8} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={
                overlay
                  ? "text-white/90 hover:text-white transition-opacity duration-150 p-1"
                  : "text-slate-600 hover:text-slate-900 transition-colors duration-150 p-1"
              }
            >
              <Facebook className="size-4 sm:size-[18px]" strokeWidth={1.8} />
            </a>
          </div>

          {/* Center: 5 Clean Navigation Links (Home, Packages, Tours, About Us, Contact) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-7 md:gap-8 lg:gap-11 xl:gap-13 text-[13px] sm:text-[14px] font-normal whitespace-nowrap z-10"
          >
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  overlay
                    ? "text-white/90 hover:text-white transition-colors duration-150 hover:underline underline-offset-4 py-1"
                    : "text-slate-700 hover:text-slate-950 transition-colors duration-150 hover:underline underline-offset-4 py-1"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: Phone, Email, User & Mobile Navigation Drawer Toggle */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 shrink-0 z-10">
            {/* Phone contact */}
            <a
              href={`tel:${t.nav.phoneLabel.replace(/\s+/g, "")}`}
              className={
                overlay
                  ? "hidden sm:flex items-center gap-2 text-xs sm:text-[13px] font-normal text-white/90 hover:text-white transition-opacity"
                  : "hidden sm:flex items-center gap-2 text-xs sm:text-[13px] font-normal text-slate-700 hover:text-slate-950 transition-colors"
              }
            >
              <Phone className="size-3.5 opacity-90" />
              <span>{t.nav.phoneLabel}</span>
            </a>

            {/* Email contact */}
            <a
              href={`mailto:${t.nav.emailLabel}`}
              className={
                overlay
                  ? "hidden lg:flex items-center gap-2 text-xs sm:text-[13px] font-normal text-white/90 hover:text-white transition-opacity"
                  : "hidden lg:flex items-center gap-2 text-xs sm:text-[13px] font-normal text-slate-700 hover:text-slate-950 transition-colors"
              }
            >
              <Mail className="size-3.5 opacity-90" />
              <span>{t.nav.emailLabel}</span>
            </a>

            {/* User Account Icon */}
            <Link
              href={user ? "/account" : "/login"}
              aria-label={user ? user.username : t.nav.login}
              title={user ? user.username : t.nav.login}
              className={
                overlay
                  ? "flex items-center justify-center p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition"
                  : "flex items-center justify-center p-1.5 rounded-full text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition"
              }
            >
              <UserRound className="size-4" />
            </Link>

            {/* Mobile Navigation Drawer Toggle */}
            <MobileNav user={user} overlay={overlay} />
          </div>
        </div>
      </div>
    </header>
  );
}
