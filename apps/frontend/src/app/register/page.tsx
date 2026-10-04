import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { RegisterForm } from "@/components/auth/register-form";
import { VIETNAM_IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Đăng ký tài khoản | Star Travels Vietnam",
  description: "Tạo tài khoản du khách mới trên hệ thống Star Travels Vietnam.",
};

export default function RegisterPage() {
  return (
    <>
      <PageHero
        title="Bắt Đầu Hành Trình"
        subtitle="Tạo tài khoản du khách để lưu lại những địa danh mơ ước và chia sẻ cảm nhận chân thực."
        image={VIETNAM_IMAGES.hero}
      />

      <main className="template-page-bg min-h-screen px-6 py-20 md:px-12">
        <div className="mx-auto max-w-md rounded-xl bg-white p-8 md:p-10 shadow-md border border-slate-100">
          <div className="mb-6 text-center">
            <h2 className="display-title text-2xl text-slate-900">Tạo Tài Khoản</h2>
            <p className="mt-1 text-xs text-slate-500">
              Đăng ký nhanh chóng và hoàn toàn miễn phí
            </p>
          </div>

          <RegisterForm />

          <p className="mt-6 text-center text-sm text-slate-600">
            Bạn đã có tài khoản?{" "}
            <Link
              className="font-medium text-[#0098a2] hover:underline"
              href="/login"
            >
              Đăng nhập tại đây
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
