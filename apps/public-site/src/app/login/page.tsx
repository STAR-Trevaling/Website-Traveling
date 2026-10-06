import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { SiteHeader } from "@/components/layout/site-header";
import { LoginForm } from "@/components/auth/login-form";
import { DICTIONARY } from "@/lib/i18n/dictionary";

export const metadata: Metadata = {
  title: "Đăng nhập | Star Travels Vietnam",
  description: "Đăng nhập tài khoản du khách hoặc đối tác trên Star Travels Vietnam.",
};

export default async function LoginPage() {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";
  const dict = DICTIONARY[isEn ? "en" : "vi"];
  const a = dict.authPages;

  return (
    <>
      <SiteHeader overlay={false} />

      <main className="template-page-bg min-h-[calc(100vh-64px)] px-4 sm:px-6 py-12 sm:py-16 flex items-center justify-center">
        <div className="w-full max-w-md rounded-[2px] bg-white p-6 sm:p-10 shadow-md border border-slate-100">
          <div className="mb-6 text-center">
            <h2 className="display-title text-2xl text-slate-900">{a.loginCardTitle}</h2>
            <p className="mt-1 text-xs text-slate-500">
              {a.loginCardSubtitle}
            </p>
          </div>

          <LoginForm />

          <p className="mt-6 text-center text-sm text-slate-600">
            {a.noAccountPrompt}{" "}
            <Link
              className="font-bold text-slate-900 underline hover:text-black"
              href="/register"
            >
              {a.registerLink}
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
