import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { ShieldCheck, CalendarCheck } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { LoginForm } from "@/components/auth/login-form";
import { DICTIONARY } from "@/lib/i18n/dictionary";

export const metadata: Metadata = {
  title: "Đăng nhập | Star Travels Vietnam",
  description: "Đăng nhập tài khoản du khách hoặc đối tác trên Star Travels Vietnam.",
};

interface LoginPageProps {
  searchParams?: Promise<{ returnUrl?: string; reason?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";
  const dict = DICTIONARY[isEn ? "en" : "vi"];
  const a = dict.authPages;

  const resolvedSearch = searchParams ? await searchParams : {};
  const returnUrl = resolvedSearch.returnUrl;
  const reason = resolvedSearch.reason;

  return (
    <>
      <SiteHeader overlay={false} />

      <main className="template-page-bg min-h-[calc(100vh-64px)] px-4 sm:px-6 py-12 sm:py-16 flex items-center justify-center">
        <div className="w-full max-w-md rounded-[2px] bg-white p-6 sm:p-10 shadow-md border border-slate-100">
          {/* BANNER THÔNG BÁO CHO KHÁCH VÃNG LAI CẦN ĐĂNG NHẬP */}
          {reason && (
            <div className="mb-6 p-4 rounded-[2px] bg-amber-50/90 border border-amber-300 text-left flex items-start gap-3">
              {reason === "payment" ? (
                <ShieldCheck className="size-5 text-amber-700 shrink-0 mt-0.5" />
              ) : (
                <CalendarCheck className="size-5 text-amber-700 shrink-0 mt-0.5" />
              )}
              <div className="text-xs text-amber-950 leading-relaxed">
                <p className="font-bold">
                  {reason === "payment"
                    ? isEn
                      ? "Sign In Required for Payment"
                      : "Yêu Cầu Đăng Nhập Để Thanh Toán"
                    : isEn
                    ? "Sign In Required for Reservation"
                    : "Yêu Cầu Đăng Nhập Để Đặt Chỗ"}
                </p>
                <p className="mt-1 font-light text-amber-800">
                  {reason === "payment"
                    ? isEn
                      ? "Please sign in to your traveler account to securely view payment details and complete your booking."
                      : "Quý khách vui lòng đăng nhập tài khoản du khách để tiếp tục xem thông tin chuyển khoản và hoàn tất đơn hàng."
                    : isEn
                    ? "Please sign in to proceed with your booking. Your selected journey details will be preserved."
                    : "Quý khách vui lòng đăng nhập để tiến hành giữ chỗ. Lịch trình và thông tin chuyến đi sẽ được lưu trữ an toàn."}
                </p>
              </div>
            </div>
          )}

          <div className="mb-6 text-center">
            <h1 className="display-title text-2xl text-slate-900">{a.loginCardTitle}</h1>
            <p className="mt-1 text-xs text-slate-500">
              {a.loginCardSubtitle}
            </p>
          </div>

          <LoginForm returnUrl={returnUrl} />

          <p className="mt-6 text-center text-sm text-slate-600">
            {a.noAccountPrompt}{" "}
            <Link
              className="font-bold text-slate-900 underline hover:text-black"
              href={returnUrl ? `/register?returnUrl=${encodeURIComponent(returnUrl)}` : "/register"}
            >
              {a.registerLink}
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
