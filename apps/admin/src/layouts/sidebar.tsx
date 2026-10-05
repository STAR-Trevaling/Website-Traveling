import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  Compass,
  FileText,
  Users,
  Building2,
  GitPullRequest,
  Star,
  UserCheck,
  MessageSquare,
  Bot,
  BarChart3,
  ShieldCheck,
  PanelLeftClose,
  ChevronRight,
  X,
  Settings,
} from "lucide-react";
import { useAuth } from "@/auth/auth-context";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string;
  module: string;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

export function Sidebar({ isOpen, onClose, isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const { user, canAccessModule } = useAuth();

  const sections: NavSection[] = [
    {
      items: [
        { name: "Dashboard", path: "/", icon: LayoutDashboard, module: "dashboard" },
        { name: "Danh Thắng & Điểm Đến", path: "/destinations", icon: MapPin, module: "destinations" },
        { name: "Địa Điểm & Trải Nghiệm", path: "/places", icon: Compass, module: "places" },
        { name: "Khách Hàng (Customers)", path: "/customers", icon: UserCheck, module: "customers" },
        { name: "Hồ Sơ Đăng Ký Đối Tác", path: "/partners/applications", icon: Building2, badge: 3, module: "partners" },
        { name: "Mạng Lưới Đối Tác", path: "/partners/directory", icon: Users, module: "partners" },
        { name: "Đề Xuất Thay Đổi (Diff)", path: "/partners/submissions", icon: GitPullRequest, badge: "Diff", module: "partners" },
        { name: "Quản Lý Leads & Nhu Cầu", path: "/crm/leads", icon: MessageSquare, badge: 3, module: "crm" },
        { name: "Bài Viết & Cẩm Nang", path: "/articles", icon: FileText, module: "articles" },
        { name: "Kiểm Duyệt Đánh Giá", path: "/reviews", icon: Star, badge: 1, module: "reviews" },
        { name: "AI & Tri Thức RAG", path: "/knowledge", icon: Bot, module: "knowledge" },
        { name: "Chỉ Số Vận Hành", path: "/analytics", icon: BarChart3, module: "analytics" },
        { name: "Nhật Ký Thẩm Định (Audit)", path: "/audit", icon: ShieldCheck, module: "audit" },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-[#EEEEEE] flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isCollapsed ? "-translate-x-full lg:-translate-x-full" : "lg:translate-x-0"
        } ${isOpen ? "!translate-x-0 shadow-2xl" : ""}`}
      >
        {/* Top Header / Brand Logo */}
        <div>
          <div className="h-24 px-7 flex items-center justify-between border-b border-[#F7F7F7]">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-[#5932EA] flex items-center justify-center text-white shadow-md font-black text-xl">
                ★
              </div>
              <div className="flex items-baseline gap-1">
                <h1 className="text-[22px] font-semibold text-black tracking-tight font-['Poppins',sans-serif]">
                  Dashboard
                </h1>
                <span className="text-[10px] font-medium text-[#838383]">v.01</span>
              </div>
            </div>

            {/* Desktop Mode Toggle Button */}
            {onToggleCollapse && (
              <button
                type="button"
                onClick={onToggleCollapse}
                className="hidden lg:flex p-2 rounded-xl text-[#9197B3] hover:text-[#5932EA] hover:bg-[#F9FBFF] transition cursor-pointer"
                title="Tắt menu để mở rộng không gian làm việc (Ctrl+B)"
              >
                <PanelLeftClose className="size-5" />
              </button>
            )}

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-5 space-y-1.5 overflow-y-auto max-h-[calc(100vh-190px)] custom-scrollbar font-['Poppins',sans-serif]">
            {sections.map((sec, secIdx) => (
              <div key={secIdx} className="space-y-1">
                {sec.items.map((item) => {
                  if (!canAccessModule(item.module)) return null;
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => onClose()}
                      className={({ isActive }) =>
                        `group flex items-center justify-between px-3.5 py-3 rounded-[8px] text-[14px] font-medium transition-all ${
                          isActive
                            ? "bg-[#5932EA] text-white shadow-sm"
                            : "text-[#9197B3] hover:text-[#5932EA] hover:bg-[#F9FBFF]"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-3.5">
                            <Icon
                              className={`size-5 transition-colors ${
                                isActive ? "text-white" : "text-[#9197B3] group-hover:text-[#5932EA]"
                              }`}
                            />
                            <span className="truncate">{item.name}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {item.badge && (
                              <span
                                className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                  isActive
                                    ? "bg-white/20 text-white"
                                    : "bg-indigo-50 text-[#5932EA]"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                            <ChevronRight
                              className={`size-4 transition-transform ${
                                isActive ? "text-white" : "text-[#9197B3] opacity-60 group-hover:opacity-100"
                              }`}
                            />
                          </div>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom User Profile Section (Matching Template) */}
        <div className="p-5 border-t border-[#EEEEEE]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-gradient-to-tr from-[#5932EA] to-[#0098a2] flex items-center justify-center text-white font-bold text-sm shadow-xs">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : "AD"}
              </div>
              <div className="font-['Poppins',sans-serif]">
                <div className="text-[14px] font-medium text-black leading-tight">
                  {user?.name || "Vũ Đình Toàn"}
                </div>
                <div className="text-[12px] text-[#757575] font-normal">
                  {user?.role || "Project Manager"}
                </div>
              </div>
            </div>
            <span className="size-2 rounded-full bg-[#16C098]" title="Online" />
          </div>
        </div>
      </aside>
    </>
  );
}
