"use client";

import Link from "next/link";
import {
  KeyRound,
  Box,
  Users,
  Wallet,
  BadgePercent,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  Globe,
  LogOut,
} from "lucide-react";

export type NavItemKey =
  | "dashboard"
  | "product"
  | "customers"
  | "income"
  | "promote"
  | "help";

interface PortalSidebarProps {
  activeTab: NavItemKey;
  onTabChange: (tab: NavItemKey) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

const MENU_ITEMS = [
  { key: "dashboard" as NavItemKey, label: "Dashboard", icon: KeyRound, hasSubmenu: false },
  { key: "product" as NavItemKey, label: "Product", icon: Box, hasSubmenu: true },
  { key: "customers" as NavItemKey, label: "Customers", icon: Users, hasSubmenu: true },
  { key: "income" as NavItemKey, label: "Income", icon: Wallet, hasSubmenu: true },
  { key: "promote" as NavItemKey, label: "Promote", icon: BadgePercent, hasSubmenu: true },
  { key: "help" as NavItemKey, label: "Help", icon: HelpCircle, hasSubmenu: true },
];

export function PortalSidebar({
  activeTab,
  onTabChange,
  isOpenMobile = false,
  onCloseMobile,
}: PortalSidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[306px] max-w-[85vw] bg-white shadow-[0px_10px_60px_rgba(226,236,249,0.50)] flex flex-col justify-between p-7 transition-transform duration-300 ease-in-out font-poppins ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Header & Navigation */}
        <div className="flex flex-col">
          {/* Logo matching template: Gear Hexagon + Dashboard v.01 */}
          <div className="flex items-center justify-between mb-10 pt-2">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-black hover:opacity-85 transition"
              title="Star Travels Vietnam Portal"
            >
              {/* Hexagon gear icon matching template design */}
              <div className="relative size-8 flex items-center justify-center">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-7.5"
                  aria-hidden="true"
                >
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="#1E1E1E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                    stroke="#1E1E1E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[26px] font-semibold text-black tracking-[0.26px] leading-tight">
                  Dashboard
                </span>
                <span className="text-[10px] font-normal text-[#838383]">
                  v.01
                </span>
              </div>
            </Link>

            {/* Close button on mobile */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-slate-400 hover:text-black rounded-lg transition"
              aria-label="Đóng menu"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-3">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    onTabChange(item.key);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg transition-all duration-200 text-left ${
                    isActive
                      ? "bg-[#5932EA] text-white shadow-sm"
                      : "text-[#9197B3] hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon
                      className={`size-5 transition-colors ${
                        isActive ? "text-white" : "text-[#9197B3]"
                      }`}
                    />
                    <span
                      className={`text-[14px] ${
                        isActive ? "font-medium text-white" : "font-normal"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  {item.hasSubmenu && (
                    <ChevronRight
                      className={`size-4 transition-colors ${
                        isActive ? "text-white" : "text-[#9197B3]"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: User Profile & Quick Link */}
        <div className="flex flex-col gap-4 pt-4">

          {/* User profile row matching template */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-3">
              {/* User avatar circle */}
              <div className="w-[42px] h-[42px] rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-200">
                {/* Evano Avatar placeholder with realistic travel manager portrait */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Evano Avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col text-left">
                <span className="text-[14px] font-medium text-black tracking-[0.14px] leading-tight">
                  Evano
                </span>
                <span className="text-[12px] font-normal text-[#757575] tracking-[0.12px]">
                  Project Manager
                </span>
              </div>
            </div>

            <ChevronDown className="size-4 text-[#757575]" />
          </div>

          {/* Quick return to public website */}
          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 hover:text-[#5932EA] py-1 transition"
          >
            <Globe className="size-3.5" />
            <span>Về website Star Travels</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
