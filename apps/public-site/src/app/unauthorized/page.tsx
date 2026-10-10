import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { ShieldAlert, ArrowLeft, UserRound, Home } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Không Có Quyền Truy Cập (403) | Star Travels Vietnam",
  description: "Trang thông báo giới hạn quyền truy cập tài nguyên (Role-Based Access Control).",
};

interface UnauthorizedPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function UnauthorizedPage({ searchParams }: UnauthorizedPageProps) {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";
  const user = await getCurrentUser();
  const params = searchParams ? await searchParams : {};
  const requiredRole = typeof params.required === "string" ? params.required : "";

  return (
    <>
      <SiteHeader overlay={false} />

      <main className="template-page-bg min-h-[80vh] flex items-center justify-center px-4 sm:px-6 py-12 md:px-12">
        <div className="mx-auto max-w-lg w-full bg-white/95 p-8 sm:p-10 rounded-[2px] shadow-lg border border-slate-100 text-center backdrop-blur-md space-y-6">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-100 text-red-600">
            <ShieldAlert className="size-8 stroke-[2.2]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-red-600 bg-red-50 px-3 py-1 rounded">
              HTTP 403 · Access Denied
            </span>
            <h1 className="display-title text-2xl sm:text-3xl font-black text-slate-900 mt-3">
              {isEn ? "Permission Denied" : "Không Đủ Quyền Truy Cập"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              {isEn
                ? "Your current account role does not possess sufficient privileges to view this portal or execute this operation."
                : "Tài khoản của bạn hiện tại không có quyền hạn cần thiết để truy cập khu vực này hoặc thực hiện tác vụ này."}
            </p>
          </div>

          {user && (
            <div className="bg-slate-50 p-4 rounded-[2px] border border-slate-200/80 text-left text-xs space-y-1.5">
              <div className="flex justify-between items-center text-slate-500">
                <span>{isEn ? "Signed in as:" : "Đang đăng nhập là:"}</span>
                <span className="font-bold text-slate-900">{user.username}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>{isEn ? "Current Role:" : "Vai trò hiện tại:"}</span>
                <span className="font-mono font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                  {user.role}
                </span>
              </div>
              {requiredRole && (
                <div className="flex justify-between items-center text-slate-500 pt-1 border-t border-slate-200">
                  <span>{isEn ? "Required Roles:" : "Vai trò yêu cầu:"}</span>
                  <span className="font-mono text-slate-700 text-[11px]">{requiredRole}</span>
                </div>
              )}
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 px-4 py-3 bg-[#da251d] hover:bg-[#c92018] text-white text-xs font-bold uppercase tracking-wider rounded-[2px] transition flex items-center justify-center gap-2 shadow-sm"
            >
              <Home className="size-4" />
              <span>{isEn ? "Return Home" : "Về Trang Chủ"}</span>
            </Link>

            <Link
              href="/account"
              className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-[2px] transition flex items-center justify-center gap-2"
            >
              <UserRound className="size-4" />
              <span>{isEn ? "My Account" : "Tài Khoản"}</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
