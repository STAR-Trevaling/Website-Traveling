"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  UserRound,
  ChevronDown,
  MapPin,
  Compass,
  Sparkles,
  Building2,
  Handshake,
} from "lucide-react";
import type { CurrentUser } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/context";
import { MobileNav } from "./mobile-nav";
import { StarLogo } from "@/components/shared/star-logo";

interface SiteHeaderClientProps {
  user: CurrentUser | null;
  overlay?: boolean;
}

export function SiteHeaderClient({ user, overlay = false }: SiteHeaderClientProps) {
  const { t } = useLanguage();

  const navItems = [
    { type: "link" as const, label: t.nav.home, href: "/" },
    {
      type: "dropdown" as const,
      label: t.nav.explore,
      subItems: [
        { label: t.nav.destinations, href: "/destinations", icon: MapPin },
        { label: t.nav.packages, href: "/experiences", icon: Sparkles },
        { label: t.nav.tours, href: "/tours", icon: Compass },
      ],
    },
    { type: "link" as const, label: t.nav.stories, href: "/stories" },
    {
      type: "dropdown" as const,
      label: t.nav.aboutMenu,
      subItems: [
        { label: t.nav.aboutUs, href: "/about", icon: Building2 },
        { label: t.nav.partner, href: "/partner", icon: Handshake },
      ],
    },
    { type: "link" as const, label: t.nav.contact, href: "/contact" },
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
          {/* Brand Logo & Name (Visible on all screen sizes) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <StarLogo variant="horizontal" size="sm" inverted={overlay} />
            {/* Desktop Social Icons (Subtle and non-intrusive) */}
            <div
              className={`hidden xl:flex items-center gap-2 pl-3 border-l ${
                overlay ? "border-white/20 text-white/80" : "border-slate-200 text-slate-400"
              }`}
            >
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-[#0098a2] transition p-0.5"
              >
                <Instagram className="size-3.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-[#0098a2] transition p-0.5"
              >
                <Twitter className="size-3.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-[#0098a2] transition p-0.5"
              >
                <Facebook className="size-3.5" />
              </a>
            </div>
          </div>

          {/* Center: Bilingual Goal-Based Navigation Links with Dropdowns (Desktop Only) */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-8 text-xs md:text-sm lg:text-[14px] font-normal whitespace-nowrap">
            {navItems.map((item) => {
              if (item.type === "link") {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={
                      overlay
                        ? "py-2 transition hover:text-white/80 hover:underline"
                        : "py-2 text-slate-700 transition hover:text-[#0098a2] hover:underline"
                    }
                  >
                    {item.label}
                  </Link>
                );
              }

              // Dropdown item (Khám Phá / Giới Thiệu)
              return (
                <div key={item.label} className="relative group py-2">
                  <button
                    type="button"
                    className={
                      overlay
                        ? "inline-flex items-center gap-1 transition hover:text-white/80 focus:outline-none cursor-pointer"
                        : "inline-flex items-center gap-1 text-slate-700 transition hover:text-[#0098a2] focus:outline-none cursor-pointer"
                    }
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-70 group-hover:opacity-100" />
                  </button>

                  {/* Dropdown Menu Container with subtle hover bridge */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto z-50">
                    <div className="min-w-[210px] rounded-[2px] bg-white border border-slate-100 p-6 shadow-xl text-left">
                      <div className="text-[13px] font-bold uppercase tracking-wider text-black mb-4 select-none">
                        {item.label}
                      </div>
                      <div className="flex flex-col space-y-3.5">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="text-sm font-normal text-slate-800 hover:text-black transition-colors leading-snug cursor-pointer"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Right: Phone, Email, Login & Mobile Navigation Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 lg:gap-4 text-xs lg:text-sm">
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

            {/* Account Icon */}
            <Link
              href={user ? "/account" : "/login"}
              aria-label={user ? user.username : t.nav.login}
              title={user ? user.username : t.nav.login}
              className={
                overlay
                  ? "flex items-center justify-center p-2 rounded-full hover:bg-white/15 transition text-white"
                  : "flex items-center justify-center p-2 rounded-full hover:bg-slate-100 text-slate-800 transition hover:text-[#0098a2]"
              }
            >
              <UserRound className="size-4.5 opacity-90" />
            </Link>

            {/* Mobile Navigation Drawer Toggle */}
            <MobileNav user={user} overlay={overlay} />
          </div>
        </div>
      </div>
    </header>
  );
}
