"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, ArrowLeft } from "lucide-react";
import { PortalSidebar, NavItemKey } from "@/components/portal/portal-sidebar";
import { StatCards } from "@/components/portal/stat-cards";
import { CustomerTable } from "@/components/portal/customer-table";
import { PortalDashboard } from "@/components/portal/portal-dashboard";
import { PortalProducts } from "@/components/portal/portal-products";
import { PortalIncome } from "@/components/portal/portal-income";
import { PortalPromotions } from "@/components/portal/portal-promotions";
import { PortalHelp } from "@/components/portal/portal-help";

export default function PortalPage() {
  const [activeTab, setActiveTab] = useState<NavItemKey>("customers");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");

  return (
    <div className="w-full min-h-screen bg-[#FAFBFF] font-poppins flex text-[#292D32]">
      {/* Left Sidebar matching template design (Upgrade to PRO box removed) */}
      <PortalSidebar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area: Left margin lg:ml-[306px] to accommodate fixed sidebar */}
      <main className="flex-1 min-h-screen lg:ml-[306px] flex flex-col p-6 sm:p-8 lg:p-10 transition-all overflow-x-hidden">
        {/* Top Header Row matching template:
            Left: "Hello Evano 👋,"
            Right: Search Input Box with drop shadow
        */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white shadow-sm border border-slate-200 text-slate-700 hover:text-black transition cursor-pointer"
              aria-label="Mở menu quản trị"
            >
              <Menu className="size-5" />
            </button>

            <div>
              <h1 className="text-[24px] font-normal text-black tracking-[0.24px] flex items-center gap-2">
                <span>Hello Evano</span>
                <span className="text-xl animate-wave">👋</span>
                <span className="text-black">,</span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Star Travels Vietnam — Quản trị Portal & CRM Lữ hành
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick link back to consumer website */}
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition"
            >
              <ArrowLeft className="size-3.5" />
              <span>Về Website</span>
            </Link>

            {/* Top Search pill matching template */}
            <div className="relative w-full sm:w-[216px] h-[38px] bg-white shadow-[0px_10px_60px_rgba(226,236,249,0.50)] rounded-[12px] flex items-center px-3.5 gap-2 border border-slate-100 focus-within:border-indigo-300 transition">
              <Search className="size-4 text-[#B5B7C0] shrink-0" />
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Search"
                className="w-full bg-transparent text-[14px] text-[#292D32] placeholder-[#B5B7C0] outline-hidden font-normal"
              />
            </div>
          </div>
        </header>

        {/* Tab 1: Executive Dashboard */}
        {activeTab === "dashboard" && (
          <PortalDashboard onNavigateTab={(tab) => setActiveTab(tab)} />
        )}

        {/* Tab 2: Products & Tours CMS */}
        {activeTab === "product" && <PortalProducts />}

        {/* Tab 3: Customers & Leads CRM (Matches user template 100%) */}
        {activeTab === "customers" && (
          <>
            <StatCards />
            <CustomerTable />
          </>
        )}

        {/* Tab 4: Income & Bookings Revenue */}
        {activeTab === "income" && <PortalIncome />}

        {/* Tab 5: Promotions & Marketing Vouchers */}
        {activeTab === "promote" && <PortalPromotions />}

        {/* Tab 6: Help & Inbound Support Queue */}
        {activeTab === "help" && <PortalHelp />}
      </main>
    </div>
  );
}
