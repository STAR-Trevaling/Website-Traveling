import React, { useState } from "react";
import { Menu, Search, Bell, Shield, ChevronDown, Check } from "lucide-react";
import { useAuth } from "@/auth/auth-context";
import { AdminRole } from "@/types";

interface TopbarProps {
  onOpenSidebar: () => void;
}

const ALL_ROLES: { role: AdminRole; label: string; desc: string }[] = [
  { role: "SUPER_ADMIN", label: "Super Admin", desc: "Toàn quyền hệ thống & kiểm định" },
  { role: "ADMIN", label: "Operations Admin", desc: "Quản lý CMS, đối tác & CRM" },
  { role: "CONTENT_EDITOR", label: "Content Editor", desc: "Biên tập danh thắng, địa điểm, bài viết" },
  { role: "PARTNER_REVIEWER", label: "Partner Reviewer", desc: "Thẩm định hồ sơ đối tác & duyệt diff" },
  { role: "MODERATOR", label: "Community Moderator", desc: "Kiểm duyệt đánh giá & xử lý vi phạm" },
  { role: "OPERATIONS_MANAGER", label: "Operations Lead", desc: "Quản lý leads CRM, phễu & thống kê" },
];

export function Topbar({ onOpenSidebar }: TopbarProps) {
  const { user, role, switchRole } = useAuth();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-20 bg-white/90 backdrop-blur-md border-b border-[#EEEEEE] px-4 sm:px-8 flex items-center justify-between">
      {/* Left: Mobile Toggle & Global Search */}
      <div className="flex items-center gap-4 flex-1 max-w-lg">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 cursor-pointer"
          aria-label="Mở Menu Điều Hướng"
        >
          <Menu className="size-6" />
        </button>

        <div className="relative w-full hidden sm:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#7E7E7E]" />
          <input
            type="text"
            placeholder="Tìm kiếm danh thắng, hồ sơ đối tác, review hoặc leads..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F9FBFF] border border-slate-200 text-xs text-slate-800 placeholder:text-[#B5B7C0] focus:border-[#5932EA] focus:outline-hidden transition"
          />
        </div>
      </div>

      {/* Right: Role Switcher & User Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Role Switcher Indicator (Interactive Testing Tool) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F3F0FF] border border-indigo-100 text-xs font-semibold text-[#5932EA] hover:bg-[#eae4ff] transition cursor-pointer"
            title="Đổi vai trò để kiểm thử phân quyền"
          >
            <Shield className="size-3.5" />
            <span className="hidden md:inline">Vai trò:</span>
            <span>{role}</span>
            <ChevronDown className="size-3.5 opacity-60" />
          </button>

          {/* Role Dropdown */}
          {isRoleDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-72 bg-white rounded-2xl p-2 shadow-xl border border-slate-100 z-50 animate-in fade-in zoom-in-95 duration-150"
              onClick={() => setIsRoleDropdownOpen(false)}
            >
              <div className="px-3 py-2 border-b border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Chuyển đổi phân quyền thử nghiệm
                </span>
              </div>

              <div className="py-1 space-y-1">
                {ALL_ROLES.map((r) => {
                  const isCurrent = r.role === role;
                  return (
                    <button
                      key={r.role}
                      type="button"
                      onClick={() => switchRole(r.role)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition cursor-pointer ${
                        isCurrent
                          ? "bg-indigo-50 text-[#5932EA] font-semibold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div>
                        <p className="font-semibold">{r.label}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{r.desc}</p>
                      </div>
                      {isCurrent && <Check className="size-4 text-[#5932EA] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Icon */}
        <button
          type="button"
          className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer"
          aria-label="Thông báo"
        >
          <Bell className="size-5" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-rose-500 animate-ping" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-rose-500" />
        </button>

        {/* User Info */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
            alt="Admin"
            className="size-9 rounded-full object-cover ring-2 ring-purple-100"
          />
          <div className="hidden xl:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-tight">
              {user?.name || "Nguyễn Minh Quân"}
            </p>
            <p className="text-[10px] text-slate-400 leading-none mt-0.5">
              {user?.email || "admin@startravels.vn"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
