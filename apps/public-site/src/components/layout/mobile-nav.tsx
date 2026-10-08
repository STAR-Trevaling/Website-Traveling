"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  UserRound,
  ArrowRight,
  MapPin,
  Compass,
  Sparkles,
  BookOpen,
  Building2,
  Handshake,
  ChevronDown,
} from "lucide-react";
import type { CurrentUser } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/context";
import { StarLogo } from "@/components/shared/star-logo";

interface MobileNavProps {
  user: CurrentUser | null;
  overlay?: boolean;
}

export function MobileNav({ user, overlay = false }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    [t.nav.explore]: true,
    [t.nav.aboutMenu]: true,
  });

  const toggleGroup = (heading: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [heading]: !prev[heading],
    }));
  };

  const navItems = [
    { type: "link" as const, label: t.nav.home, href: "/" },
    {
      type: "group" as const,
      heading: t.nav.explore,
      items: [
        { label: t.nav.tours, href: "/tours", icon: Compass },
        { label: t.nav.packages, href: "/experiences", icon: Sparkles },
        { label: t.nav.destinations, href: "/destinations", icon: MapPin },
        { label: t.nav.stories, href: "/stories", icon: BookOpen },
      ],
    },
    {
      type: "group" as const,
      heading: t.nav.aboutMenu,
      items: [
        { label: t.nav.aboutUs, href: "/about", icon: Building2 },
        { label: t.nav.partner, href: "/partner", icon: Handshake },
      ],
    },
    { type: "link" as const, label: t.nav.contact, href: "/contact" },
  ];

  // Close drawer when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden flex items-center">
      {/* Hamburger Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className={`flex size-9 items-center justify-center rounded-[2px] transition-all duration-200 cursor-pointer ${
          overlay
            ? "text-white hover:bg-white/20 active:scale-95"
            : "text-slate-800 hover:bg-slate-100 active:scale-95"
        }`}
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-[300px] max-w-[85vw] bg-white text-slate-800 p-6 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col justify-between overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Header row: Brand + Close button */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <StarLogo variant="horizontal" size="sm" asLink={false} />
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100 cursor-pointer"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4 space-y-2">
            {navItems.map((item) => {
              if (item.type === "link") {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-[2px] transition ${
                      active
                        ? "bg-[#da251d]/10 text-[#da251d] font-semibold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="size-3.5 opacity-40" />
                  </Link>
                );
              }

              const isGroupOpen = !!openGroups[item.heading];

              return (
                <div key={item.heading} className="pt-2">
                  <button
                    type="button"
                    onClick={() => toggleGroup(item.heading)}
                    className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-700 transition cursor-pointer"
                  >
                    <span>{item.heading}</span>
                    <ChevronDown
                      className={`size-3.5 transition-transform duration-200 ${
                        isGroupOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isGroupOpen && (
                    <div className="space-y-0.5 pl-1.5 border-l-2 border-slate-100 ml-2.5 animate-in fade-in duration-150">
                      {item.items.map((sub) => {
                        const active = pathname === sub.href;
                        const Icon = sub.icon;
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`flex items-center justify-between px-2.5 py-2 text-xs md:text-sm font-medium rounded-[2px] transition ${
                              active
                                ? "bg-[#da251d]/10 text-[#da251d] font-semibold"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <Icon className="size-3.5 text-[#da251d] opacity-75 shrink-0" />
                              <span>{sub.label}</span>
                            </span>
                            <ArrowRight className="size-3 opacity-30" />
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Footer Area: User, Contact & Social */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <Link
            href={user ? "/account" : "/login"}
            className="flex items-center justify-center gap-2 w-full bg-[#da251d] text-white py-2.5 text-xs font-bold uppercase tracking-wider rounded-[2px] shadow-sm transition-all duration-200 hover:bg-[#c92018] hover:shadow-[0px_8px_25px_rgba(218,37,29,0.35)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <UserRound className="size-4" />
            <span>{user ? user.username : t.nav.login}</span>
          </Link>

          <div className="space-y-1 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Phone className="size-3.5 text-[#da251d]" />
              <span>{t.nav.phoneLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="size-3.5 text-[#da251d]" />
              <span>{t.nav.emailLabel}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2 text-slate-500">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition"
            >
              <Twitter className="size-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition"
            >
              <Facebook className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
