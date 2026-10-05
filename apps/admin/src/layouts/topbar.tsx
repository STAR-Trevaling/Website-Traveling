import React, { useState } from "react";
import { Menu, Search, Shield, ChevronDown, Check, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useAuth } from "@/auth/auth-context";
import { AdminRole } from "@/types";

interface TopbarProps {
  onOpenSidebar: () => void;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

const ALL_ROLES: { role: AdminRole; label: string; desc: string }[] = [
  { role: "SUPER_ADMIN", label: "Super Admin", desc: "Toàn quyền hệ thống & kiểm định" },
  { role: "ADMIN", label: "Operations Admin", desc: "Quản lý CMS, đối tác & CRM" },
  { role: "CONTENT_EDITOR", label: "Content Editor", desc: "Biên tập danh thắng, địa điểm, bài viết" },
  { role: "PARTNER_REVIEWER", label: "Partner Reviewer", desc: "Thẩm định hồ sơ đối tác & duyệt diff" },
  { role: "MODERATOR", label: "Community Moderator", desc: "Kiểm duyệt đánh giá & xử lý vi phạm" },
  { role: "OPERATIONS_MANAGER", label: "Operations Lead", desc: "Quản lý leads CRM, phễu & thống kê" },
];

export function Topbar({ onOpenSidebar, isSidebarCollapsed, onToggleSidebar }: TopbarProps) {
  const { user, role, switchRole } = useAuth();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const firstName = user?.name ? user.name.split(" ").slice(-1)[0] : "Admin";

  return (
    <header className="sticky top-0 z-30 h-24 bg-[#FAFBFF] px-6 sm:px-10 flex items-center justify-between font-['Poppins',sans-serif]">
      {/* Left: Mobile Toggle & Desktop Mode ON/OFF & Warm Greeting */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-500 bg-white hover:text-slate-800 hover:shadow-[0px_6px_20px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          aria-label="Mở Menu Điều Hướng"
        >
          <Menu className="size-6 text-[#292D32]" />
        </button>

        {/* Desktop Sidebar Mode ON/OFF Toggle Switch */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-white border border-slate-200/80 text-[12px] font-medium text-[#292D32] shadow-[0px_4px_20px_rgba(218,222,232,0.30)] hover:shadow-[0px_8px_25px_rgba(89,50,234,0.18)] hover:-translate-y-0.5 hover:border-slate-300 transition-all duration-200 cursor-pointer group"
          title={isSidebarCollapsed ? "Bật thanh menu (Mở rộng menu — Ctrl+B)" : "Tắt thanh menu (Mở rộng không gian làm việc — Ctrl+B)"}
        >
          {isSidebarCollapsed ? (
            <>
              <PanelLeftOpen className="size-4 text-[#5932EA] transition-transform group-hover:scale-110" />
              <span className="text-[#7E7E7E]">Thanh Menu:</span>
              <span className="font-semibold text-[#DF0404] bg-[#FFC5C5]/50 px-2 py-0.5 rounded-[4px] text-[11px] border border-[#DF0404]/30">
                OFF
              </span>
            </>
          ) : (
            <>
              <PanelLeftClose className="size-4 text-[#5932EA] transition-transform group-hover:scale-110" />
              <span className="text-[#7E7E7E]">Thanh Menu:</span>
              <span className="font-semibold text-[#008767] bg-[rgba(22,192,152,0.18)] px-2 py-0.5 rounded-[4px] text-[11px] border border-[#00B087]/40">
                ON
              </span>
            </>
          )}
        </button>

        <div>
          <h2 className="text-[22px] sm:text-[24px] font-medium text-black leading-tight flex items-center gap-2">
            <span>Hello {firstName}</span>
            <span>👋,</span>
          </h2>
          <span className="text-[12px] text-[#B5B7C0] hidden sm:block">
            Chào mừng bạn đến với Trung Tâm Điều Hành Nền Tảng Du Lịch
          </span>
        </div>
      </div>

      {/* Right: Search & Interactive Role Switcher */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Global Search Input */}
        <div className="relative hidden md:block w-56 lg:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#7E7E7E]" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-[10px] bg-white border border-slate-100 text-[12px] text-[#292D32] placeholder:text-[#B5B7C0] shadow-[0px_4px_20px_rgba(218,222,232,0.30)] focus:border-[#5932EA] focus:outline-hidden transition"
          />
        </div>

        {/* Role Switcher Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-[10px] bg-white border border-slate-200/80 text-[12px] font-medium text-[#292D32] shadow-[0px_4px_20px_rgba(218,222,232,0.30)] hover:shadow-[0px_8px_25px_rgba(89,50,234,0.18)] hover:-translate-y-0.5 hover:border-slate-300 transition-all duration-200 cursor-pointer"
            title="Đổi vai trò để kiểm thử phân quyền RBAC"
          >
            <Shield className="size-4 text-[#5932EA]" />
            <span className="hidden sm:inline text-[#B5B7C0]">Vai trò:</span>
            <span className="font-semibold text-[#5932EA]">{role}</span>
            <ChevronDown className="size-3.5 text-[#B5B7C0]" />
          </button>

          {isRoleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-[20px] shadow-[0px_10px_60px_rgba(226,236,249,0.90)] border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B5B7C0]">
                  Chuyển Vai Trò Thẩm Định
                </span>
              </div>

              <div className="space-y-1">
                {ALL_ROLES.map((r) => (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => {
                      switchRole(r.role);
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-[10px] text-left transition-all duration-200 cursor-pointer ${
                      role === r.role
                        ? "bg-[#ECE7FF] text-[#5932EA] shadow-[0px_4px_14px_rgba(89,50,234,0.15)]"
                        : "hover:bg-white hover:shadow-[0px_4px_16px_rgba(89,50,234,0.12)] hover:-translate-y-0.5 text-[#292D32]"
                    }`}
                  >
                    <div>
                      <div className="text-[13px] font-medium leading-tight">{r.label}</div>
                      <div className="text-[11px] text-[#B5B7C0] mt-0.5">{r.desc}</div>
                    </div>
                    {role === r.role && <Check className="size-4 text-[#5932EA] shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
