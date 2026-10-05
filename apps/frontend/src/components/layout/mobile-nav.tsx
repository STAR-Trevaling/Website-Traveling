"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, Instagram, Facebook, Twitter, UserRound, ArrowRight } from "lucide-react";
import type { CurrentUser } from "@/lib/types";

interface MobileNavProps {
  user: CurrentUser | null;
  overlay?: boolean;
}

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/experiences" },
  { label: "Tours", href: "/tours" },
  { label: "Destinations", href: "/destinations" },
  { label: "Stories", href: "/stories" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function MobileNav({ user, overlay = false }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
        aria-label={isOpen ? "Đóng menu" : "Mở menu"}
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
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-[82vw] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col justify-between p-6 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Header row in drawer */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <span className="logo-title text-3xl font-normal text-slate-900 flex items-center">
                <span className="relative inline-flex items-center justify-center">
                  <svg
                    viewBox="0 0 100 100"
                    fill="#eab308"
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-8 text-[#eab308] opacity-85 -z-10 pointer-events-none drop-shadow-[0_1px_6px_rgba(234,179,8,0.4)]"
                  >
                    <polygon points="50,5 64,36 98,38 72,60 80,94 50,75 20,94 28,60 2,38 36,36" />
                  </svg>
                  <span className="relative z-10">Star</span>
                </span>
                <span className="ml-1.5">Travels</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-[2px] transition ${
                    active
                      ? "bg-[#0098a2]/10 text-[#0098a2] font-semibold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="size-3.5 opacity-40" />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Area: User, Contact & Social */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <Link
            href={user ? "/account" : "/login"}
            className="flex items-center justify-center gap-2 w-full bg-[#0098a2] text-white py-2.5 text-xs font-bold uppercase tracking-wider rounded-[2px] shadow-sm transition-all duration-200 hover:bg-[#008f99] hover:shadow-[0px_8px_25px_rgba(0,152,162,0.35)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <UserRound className="size-4" />
            <span>{user ? user.username : "Đăng nhập"}</span>
          </Link>

          <div className="space-y-1 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Phone className="size-3.5 text-[#0098a2]" />
              <span>+1 334 445 623</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="size-3.5 text-[#0098a2]" />
              <span>contact@startravels.com</span>
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
