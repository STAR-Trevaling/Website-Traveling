import React, { ReactNode } from "react";
import { useAuth } from "./auth-context";
import { ShieldAlert } from "lucide-react";

interface PermissionGuardProps {
  permission?: string;
  module?: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export function PermissionGuard({
  permission,
  module,
  children,
  fallback,
}: PermissionGuardProps) {
  const { hasPermission, canAccessModule, role } = useAuth();

  let isAllowed = true;

  if (permission && !hasPermission(permission)) {
    isAllowed = false;
  }

  if (module && !canAccessModule(module)) {
    isAllowed = false;
  }

  if (!isAllowed) {
    if (fallback) return <>{fallback}</>;

    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-rose-100 shadow-sm text-center">
        <div className="size-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mb-4">
          <ShieldAlert className="size-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Truy Cập Bị Hạn Chế
        </h3>
        <p className="text-sm text-slate-500 max-w-md mb-4">
          Vai trò hiện tại của bạn (<strong>{role}</strong>) không có quyền thực hiện thao tác hoặc xem nội dung này (yêu cầu quyền: <code>{permission || module}</code>).
        </p>
        <span className="text-xs text-slate-400">
          Vui lòng chuyển vai trò sang <strong>SUPER_ADMIN</strong> trên thanh Topbar để tiếp tục kiểm thử.
        </span>
      </div>
    );
  }

  return <>{children}</>;
}
