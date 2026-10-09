import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { SiteHeader } from "@/components/layout/site-header";
import { RegisterForm } from "@/components/auth/register-form";
import { DICTIONARY } from "@/lib/i18n/dictionary";

export const metadata: Metadata = {
  title: "Đăng ký tài khoản | Star Travels Vietnam",
  description: "Tạo tài khoản du khách mới trên hệ thống Star Travels Vietnam.",
};

interface RegisterPageProps {
  searchParams?: Promise<{ returnUrl?: string }>;
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";
  const dict = DICTIONARY[isEn ? "en" : "vi"];
  const a = dict.authPages;

  const resolvedSearch = searchParams ? await searchParams : {};
  const returnUrl = resolvedSearch.returnUrl;

  return (
    <>
      <SiteHeader overlay={false} />

      <main className="template-page-bg min-h-[calc(100vh-64px)] px-4 sm:px-6 py-12 sm:py-16 flex items-center justify-center">
        <div className="w-full max-w-md rounded-[2px] bg-white p-6 sm:p-10 shadow-md border border-slate-100">
          <div className="mb-6 text-center">
            <h1 className="display-title text-2xl text-slate-900">{a.registerCardTitle}</h1>
            <p className="mt-1 text-xs text-slate-500">
              {a.registerCardSubtitle}
            </p>
          </div>

          <RegisterForm returnUrl={returnUrl} />

          <p className="mt-6 text-center text-sm text-slate-600">
            {a.hasAccountPrompt}{" "}
            <Link
              className="font-bold text-slate-900 underline hover:text-black"
              href={returnUrl ? `/login?returnUrl=${encodeURIComponent(returnUrl)}` : "/login"}
            >
              {a.loginLink}
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
