import React, { useState, useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { ChevronRight, Home } from "lucide-react";

const ROUTE_LABELS: Record<string, string> = {
  destinations: "Danh Thắng & Điểm Đến",
  places: "Địa Điểm & Trải Nghiệm",
  articles: "Bài Viết & Cẩm Nang",
  partners: "Đối Tác Lữ Hành",
  applications: "Hồ Sơ Đăng Ký",
  directory: "Mạng Lưới Đối Tác",
  submissions: "Đề Xuất Thay Đổi (Diff)",
  reviews: "Kiểm Duyệt Đánh Giá",
  customers: "Hồ Sơ Khách Hàng",
  crm: "Khách Hàng & CRM-Lite",
  leads: "Quản Lý Leads & Nguồn",
  knowledge: "AI & Cơ Sở Dữ Liệu RAG",
  analytics: "Chỉ Số Vận Hành",
  audit: "Nhật Ký Thẩm Định (Audit Log)",
};

export function AdminShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem("admin_sidebar_collapsed") === "true";
  });
  const location = useLocation();

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("admin_sidebar_collapsed", String(next));
      return next;
    });
  };

  // Keyboard shortcut Ctrl+B or Cmd+B to toggle sidebar on/off
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        handleToggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Generate breadcrumb items from URL path
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <div className="min-h-screen bg-[#FAFBFF] text-slate-800 flex font-['Inter',sans-serif]">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />

      {/* Main Administrative Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "lg:pl-0" : "lg:pl-72"
        }`}
      >
        {/* Topbar with Search, Role Switcher, & Profile */}
        <Topbar
          onOpenSidebar={() => setIsSidebarOpen(true)}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={handleToggleSidebar}
        />

        {/* Breadcrumb Bar */}
        <div className="px-6 sm:px-10 py-3.5 bg-white/60 border-b border-[#EEEEEE]/80 flex items-center justify-between text-xs text-slate-500">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap">
            <Link
              to="/"
              className="flex items-center gap-1 text-slate-600 hover:text-[#5932EA] transition font-medium"
            >
              <Home className="size-3.5" />
              <span>Bàn Điều Hành</span>
            </Link>

            {pathSegments.map((segment, idx) => {
              const routeTo = `/${pathSegments.slice(0, idx + 1).join("/")}`;
              const isLast = idx === pathSegments.length - 1;
              const label = ROUTE_LABELS[segment] || segment;

              return (
                <React.Fragment key={routeTo}>
                  <ChevronRight className="size-3 text-slate-400" />
                  {isLast ? (
                    <span className="font-semibold text-slate-800">{label}</span>
                  ) : (
                    <Link
                      to={routeTo}
                      className="hover:text-[#5932EA] transition text-slate-600"
                    >
                      {label}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
            <span className="size-2 rounded-full bg-[#16C098] animate-pulse"></span>
            <span>Hệ thống trực tuyến v2.4</span>
          </div>
        </div>

        {/* Content Area */}
        <main
          className={`flex-1 p-6 sm:p-10 w-full mx-auto transition-all duration-300 ${
            isSidebarCollapsed ? "max-w-[1600px]" : "max-w-7xl"
          }`}
        >
          <Outlet />
        </main>

        {/* Operational Footer */}
        <footer className="px-6 sm:px-10 py-4 bg-white border-t border-[#EEEEEE] text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Star Travels Vietnam — Internal Admin Operations Portal</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400">Production Mode</span>
            <span>•</span>
            <span className="text-[#5932EA] font-medium">Bảo Mật Cấp Độ 3 (RBAC)</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
