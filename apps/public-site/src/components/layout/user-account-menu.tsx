"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  UserRound,
  CalendarCheck,
  LogOut,
  LogIn,
  UserPlus,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import type { CurrentUser } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/providers/auth-provider";

interface UserAccountMenuProps {
  user: CurrentUser | null;
  overlay?: boolean;
}

export function UserAccountMenu({ user, overlay = false }: UserAccountMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { isEnglish } = useLanguage();
  const { logout, isLoading } = useAuth();

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 180);
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const roleLabel =
    user?.role === "partner"
      ? isEnglish
        ? "Partner Host"
        : "Đối tác bản địa"
      : user?.role === "admin"
      ? isEnglish
        ? "Administrator"
        : "Quản trị viên"
      : isEnglish
      ? "Traveler"
      : "Thành viên";

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Icon-Only Trigger Button (No Text Label) */}
      <button
        type="button"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={user ? user.username : isEnglish ? "User Account" : "Tài khoản người dùng"}
        title={user ? user.username : isEnglish ? "Account Profile" : "Thông tin cá nhân"}
        className={`flex size-8 sm:size-9 items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
          overlay
            ? "text-white/90 hover:text-white hover:bg-white/15 active:scale-95"
            : "text-slate-700 hover:text-slate-950 hover:bg-slate-100 active:scale-95"
        } ${isOpen ? (overlay ? "bg-white/20 text-white" : "bg-slate-100 text-slate-950") : ""}`}
      >
        <UserRound className="size-4 sm:size-[18px]" strokeWidth={2} />
      </button>

      {/* Dropdown Menu / Popup Profile (Thông tin cá nhân) */}
      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-[2px] bg-white text-slate-800 shadow-[0_15px_35px_rgba(0,0,0,0.18)] border border-slate-100 z-50 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150"
        >
          {user ? (
            /* ── Authenticated User State ── */
            <div>
              {/* Header: User Profile Info (Thông tin cá nhân) */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-full bg-white/15 text-white font-bold text-base border border-white/20 shrink-0">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold truncate text-white">
                      {user.username}
                    </p>
                    <p className="text-[11px] text-white/70 truncate">
                      {user.email || `${user.username}@star.vn`}
                    </p>
                    <span className="inline-block mt-1 font-mono text-[9px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-[2px]">
                      {roleLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="p-2 space-y-1 text-xs">
                <Link
                  href="/account"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-[2px] hover:bg-slate-50 transition text-slate-700 hover:text-slate-900"
                >
                  <div className="flex items-center gap-2.5 font-medium">
                    <UserRound className="size-4 text-slate-500" />
                    <span>{isEnglish ? "Personal Profile" : "Thông tin cá nhân"}</span>
                  </div>
                  <ChevronRight className="size-3.5 text-slate-400" />
                </Link>

                <Link
                  href="/account/bookings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-[2px] hover:bg-slate-50 transition text-slate-700 hover:text-slate-900"
                >
                  <div className="flex items-center gap-2.5 font-medium">
                    <CalendarCheck className="size-4 text-slate-500" />
                    <span>{isEnglish ? "My Bookings" : "Lịch sử đặt tour & vé"}</span>
                  </div>
                  <ChevronRight className="size-3.5 text-slate-400" />
                </Link>
              </div>

              {/* Footer: Logout Button */}
              <div className="p-2 pt-1 border-t border-slate-100">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={async () => {
                    setIsOpen(false);
                    await logout();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold uppercase tracking-wider text-red-600 hover:bg-red-50 rounded-[2px] transition cursor-pointer disabled:opacity-50"
                >
                  <LogOut className="size-3.5" />
                  <span>{isEnglish ? "Sign Out" : "Đăng Xuất"}</span>
                </button>
              </div>
            </div>
          ) : (
            /* ── Guest State (Khách vãng lai) ── */
            <div className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 shrink-0">
                  <UserRound className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {isEnglish ? "Welcome to Star Travels" : "Chào mừng đến với Star Travels"}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    {isEnglish
                      ? "Sign in to reserve tours, manage booking history, and unlock member perks."
                      : "Đăng nhập để đặt tour, quản lý lịch sử đặt chỗ và tận hưởng ưu đãi thành viên."}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-[#da251d] hover:bg-[#c92018] text-white text-xs font-bold uppercase tracking-wider rounded-[2px] shadow-sm transition"
                >
                  <LogIn className="size-3.5" />
                  <span>{isEnglish ? "Sign In" : "Đăng Nhập"}</span>
                </Link>

                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-[2px] transition"
                >
                  <UserPlus className="size-3.5" />
                  <span>{isEnglish ? "Register" : "Đăng Ký"}</span>
                </Link>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 pt-1 border-t border-slate-100 justify-center">
                <ShieldCheck className="size-3 text-emerald-600" />
                <span>
                  {isEnglish
                    ? "Safe & Encrypted Authentication"
                    : "Xác thực bảo mật tiêu chuẩn quốc tế"}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
