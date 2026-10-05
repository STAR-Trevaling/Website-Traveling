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
  X,
} from "lucide-react";
import { useAuth } from "@/auth/auth-context";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string;
  module: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { canAccessModule } = useAuth();

  const sections: NavSection[] = [
    {
      title: "TỔNG QUAN",
      items: [
        { name: "Bàn Điều Hành", path: "/", icon: LayoutDashboard, module: "dashboard" },
      ],
    },
    {
      title: "QUẢN LÝ NỘI DUNG (CMS)",
      items: [
        { name: "Danh Thắng & Điểm Đến", path: "/destinations", icon: MapPin, module: "destinations" },
        { name: "Địa Điểm & Trải Nghiệm", path: "/places", icon: Compass, module: "places" },
        { name: "Bài Viết & Cẩm Nang", path: "/articles", icon: FileText, module: "articles" },
      ],
    },
    {
      title: "ĐỐI TÁC LỮ HÀNH",
      items: [
        { name: "Hồ Sơ Đăng Ký", path: "/partners/applications", icon: Building2, badge: 3, module: "partners" },
        { name: "Mạng Lưới Đối Tác", path: "/partners/directory", icon: Users, module: "partners" },
        { name: "Đề Xuất Thay Đổi (Diff)", path: "/partners/submissions", icon: GitPullRequest, badge: "Diff", module: "partners" },
      ],
    },
    {
      title: "CỘNG ĐỒNG & KIỂM DUYỆT",
      items: [
        { name: "Kiểm Duyệt Đánh Giá", path: "/reviews", icon: Star, badge: 1, module: "reviews" },
      ],
    },
    {
      title: "KHÁCH HÀNG & CRM-LITE",
      items: [
        { name: "Hồ Sơ Khách Hàng", path: "/customers", icon: UserCheck, module: "customers" },
        { name: "Quản Lý Leads & Nguồn", path: "/crm/leads", icon: MessageSquare, badge: 3, module: "crm" },
      ],
    },
    {
      title: "AI & TRI THỨC BẢN ĐỊA",
      items: [
        { name: "Cơ Sở Dữ Liệu RAG", path: "/knowledge", icon: Bot, module: "knowledge" },
      ],
    },
    {
      title: "VẬN HÀNH & BẢO MẬT",
      items: [
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
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-[#EEEEEE] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header / Brand */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-[#F5F5F5]">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-gradient-to-tr from-[#5932EA] to-[#0098a2] flex items-center justify-center text-white shadow-md font-black text-lg">
              ★
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight">
                Star Travels
              </h1>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5932EA] block">
                Admin Control Portal
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
            aria-label="Đóng menu"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {sections.map((section) => {
            const accessibleItems = section.items.filter((item) =>
              canAccessModule(item.module)
            );

            if (accessibleItems.length === 0) return null;

            return (
              <div key={section.title}>
                <span className="px-3 text-[10px] font-bold text-[#B5B7C0] tracking-wider block mb-2">
                  {section.title}
                </span>

                <div className="space-y-1">
                  {accessibleItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/"}
                        onClick={() => {
                          if (window.innerWidth < 1024) onClose();
                        }}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                            isActive
                              ? "bg-[#5932EA] text-white shadow-xs font-semibold"
                              : "text-slate-600 hover:bg-[#F3F0FF] hover:text-[#5932EA]"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <div className="flex items-center gap-3">
                              <Icon
                                className={`size-4.5 transition-colors ${
                                  isActive
                                    ? "text-white"
                                    : "text-slate-400 group-hover:text-[#5932EA]"
                                }`}
                              />
                              <span>{item.name}</span>
                            </div>

                            {item.badge != null && (
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  isActive
                                    ? "bg-white/20 text-white"
                                    : typeof item.badge === "number"
                                    ? "bg-rose-100 text-rose-700"
                                    : "bg-indigo-100 text-[#5932EA]"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer: User profile info */}
        <div className="p-4 border-t border-[#F5F5F5] bg-[#FAFBFF]">
          <div className="flex items-center gap-3 px-2">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Evano Avatar"
              className="size-10 rounded-full object-cover ring-2 ring-purple-100"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">
                Nguyễn Minh Quân
              </p>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                Staff Online
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
