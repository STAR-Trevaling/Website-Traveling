"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  UserRound,
  ChevronDown,
  Compass,
  Sparkles,
  MapPin,
  BookOpen,
  Building2,
  Handshake,
} from "lucide-react";
import type { CurrentUser } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/context";
import { MobileNav } from "./mobile-nav";

interface SiteHeaderClientProps {
  user: CurrentUser | null;
  overlay?: boolean;
}

export function SiteHeaderClient({ user, overlay = false }: SiteHeaderClientProps) {
  const { t, locale } = useLanguage();
  const isEn = locale === "en";
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const navItems = [
    { type: "link" as const, label: t.nav.home, href: "/" },
    {
      type: "dropdown" as const,
      label: t.nav.explore,
      basePath: ["/destinations", "/tours", "/experiences", "/stories"],
      items: [
        {
          label: t.nav.tours,
          href: "/tours",
          description: isEn
            ? "Curated guided tours & itineraries"
            : "Lịch trình trọn gói & hướng dẫn viên tận tâm",
          icon: Compass,
        },
        {
          label: t.nav.packages,
          href: "/experiences",
          description: isEn
            ? "Exclusive vacation packages & stays"
            : "Nghỉ dưỡng đẳng cấp & trải nghiệm độc bản",
          icon: Sparkles,
        },
        {
          label: t.nav.destinations,
          href: "/destinations",
          description: isEn
            ? "Top heritage sights & coastal gems"
            : "Danh lam thắng cảnh & kỳ quan di sản",
          icon: MapPin,
        },
        {
          label: t.nav.stories,
          href: "/stories",
          description: isEn
            ? "Travel insights & insider guides"
            : "Cẩm nang du lịch & góc chia sẻ hữu ích",
          icon: BookOpen,
        },
      ],
    },
    {
      type: "dropdown" as const,
      label: t.nav.aboutMenu,
      basePath: ["/about", "/partner"],
      items: [
        {
          label: t.nav.aboutUs,
          href: "/about",
          description: isEn
            ? "Our story, values & hospitality team"
            : "Câu chuyện thương hiệu & sứ mệnh Star Travels",
          icon: Building2,
        },
        {
          label: t.nav.partner,
          href: "/partner",
          description: isEn
            ? "B2B travel collaboration & portal"
            : "Hợp tác đối tác lữ hành & dịch vụ du lịch",
          icon: Handshake,
        },
      ],
    },
    { type: "link" as const, label: t.nav.contact, href: "/contact" },
  ];

  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-30 text-white"
          : "bg-white text-slate-900 shadow-sm border-b border-slate-100"
      }
    >
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-18 xl:px-24">
        {/* Row 1: Top Bar with Left Social Icons and Right Contact Info */}
        <div className="flex h-11 sm:h-12 md:h-13 items-center justify-between pt-1 sm:pt-2">
          {/* Top Left: 3 Social Media Icons (Instagram, Twitter, Facebook) */}
          <div className="flex items-center gap-3.5 sm:gap-4.5 shrink-0 z-10">
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
              <Instagram className="size-4 sm:size-[17px]" strokeWidth={1.8} />
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
              <Twitter className="size-4 sm:size-[17px]" strokeWidth={1.8} />
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
              <Facebook className="size-4 sm:size-[17px]" strokeWidth={1.8} />
            </a>
          </div>

          {/* Top Right: Phone, Email, User & Mobile Navigation Drawer Toggle */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-7 shrink-0 z-10">
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

        {/* Row 2: Centered Navigation Links with Dropdown for Scoped Groups */}
        <div className="hidden md:flex justify-center items-center py-2 sm:py-2.5">
          <nav
            aria-label="Main Navigation"
            className="flex items-center gap-8 md:gap-9 lg:gap-11 xl:gap-13 text-[13px] sm:text-[14px] font-normal whitespace-nowrap"
          >
            {navItems.map((item) => {
              if (item.type === "dropdown") {
                const isGroupActive = item.basePath.some(
                  (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
                );
                const isOpen = openDropdown === item.label;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.label)}
                      aria-expanded={isOpen}
                      className={`inline-flex items-center gap-1.5 py-0.5 tracking-wide transition-colors duration-150 cursor-pointer ${
                        isGroupActive
                          ? "font-medium underline underline-offset-4 " +
                            (overlay ? "text-white" : "text-slate-950 font-semibold")
                          : overlay
                          ? "text-white/95 hover:text-white hover:underline underline-offset-4"
                          : "text-slate-700 hover:text-slate-950 hover:underline underline-offset-4"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`size-3.5 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        } opacity-75`}
                      />
                    </button>

                    {/* Dropdown Menu Popover */}
                    {isOpen && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="w-72 rounded-xl bg-white/98 backdrop-blur-md p-2 shadow-2xl ring-1 ring-black/5 border border-slate-100 text-slate-900">
                          <div className="space-y-1">
                            {item.items.map((sub) => {
                              const isSubActive =
                                pathname === sub.href || pathname.startsWith(sub.href + "/");
                              const Icon = sub.icon;

                              return (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className={`flex items-start gap-3 rounded-lg p-2.5 transition-colors group ${
                                    isSubActive
                                      ? "bg-[#0098a2]/10 text-[#0098a2]"
                                      : "hover:bg-slate-50 text-slate-700 hover:text-slate-950"
                                  }`}
                                >
                                  <div
                                    className={`p-2 rounded-lg shrink-0 transition-colors ${
                                      isSubActive
                                        ? "bg-[#0098a2] text-white"
                                        : "bg-[#0098a2]/10 text-[#0098a2] group-hover:bg-[#0098a2] group-hover:text-white"
                                    }`}
                                  >
                                    <Icon className="size-4" />
                                  </div>
                                  <div className="flex flex-col text-left">
                                    <span className="text-sm font-semibold leading-tight">
                                      {sub.label}
                                    </span>
                                    <span className="text-[11px] text-slate-500 group-hover:text-slate-600 mt-0.5 leading-snug whitespace-normal">
                                      {sub.description}
                                    </span>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-0.5 tracking-wide transition-colors duration-150 hover:underline underline-offset-4 ${
                    isActive
                      ? "font-medium underline underline-offset-4 " +
                        (overlay ? "text-white" : "text-slate-950 font-semibold")
                      : overlay
                      ? "text-white/95 hover:text-white"
                      : "text-slate-700 hover:text-slate-950"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
