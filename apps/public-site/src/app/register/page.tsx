import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { PageHero } from "@/components/layout/page-hero";
import { RegisterForm } from "@/components/auth/register-form";
import { VIETNAM_IMAGES } from "@/lib/assets";
import { DICTIONARY } from "@/lib/i18n/dictionary";

export const metadata: Metadata = {
  title: "Đăng ký tài khoản | Star Travels Vietnam",
  description: "Tạo tài khoản du khách mới trên hệ thống Star Travels Vietnam.",
};

export default async function RegisterPage() {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";
  const dict = DICTIONARY[isEn ? "en" : "vi"];
  const a = dict.authPages;

  return (
    <>
      <PageHero
        title={a.registerHeroTitle}
        subtitle={a.registerHeroSubtitle}
        image={VIETNAM_IMAGES.hero}
      />

      <main className="template-page-bg min-h-screen px-6 py-20 md:px-12">
        <div className="mx-auto max-w-md rounded-[2px] bg-white p-8 md:p-10 shadow-md border border-slate-100">
          <div className="mb-6 text-center">
            <h2 className="display-title text-2xl text-slate-900">{a.registerCardTitle}</h2>
            <p className="mt-1 text-xs text-slate-500">
              {a.registerCardSubtitle}
            </p>
          </div>

          <RegisterForm />

          <p className="mt-6 text-center text-sm text-slate-600">
            {a.hasAccountPrompt}{" "}
            <Link
              className="font-bold text-slate-900 underline hover:text-black"
              href="/login"
            >
              {a.loginLink}
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
