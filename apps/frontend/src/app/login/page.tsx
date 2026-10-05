import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { LoginForm } from "@/components/auth/login-form";
import { VIETNAM_IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Đăng nhập | Star Travels Vietnam",
  description: "Đăng nhập tài khoản du khách hoặc đối tác trên Star Travels Vietnam.",
};

export default function LoginPage() {
  return (
    <>
      <PageHero
        title="Chào Mừng Bạn Trở Lại"
        subtitle="Đăng nhập để đánh giá địa điểm, lưu danh sách yêu thích và quản lý hồ sơ đối tác."
        image={VIETNAM_IMAGES.hero}
      />

      <main className="template-page-bg min-h-screen px-6 py-20 md:px-12">
        <div className="mx-auto max-w-md rounded-[2px] bg-white p-8 md:p-10 shadow-md border border-slate-100">
          <div className="mb-6 text-center">
            <h2 className="display-title text-2xl text-slate-900">Đăng Nhập</h2>
            <p className="mt-1 text-xs text-slate-500">
              Nhập tài khoản để tiếp tục trải nghiệm
            </p>
          </div>

          <LoginForm />

          <p className="mt-6 text-center text-sm text-slate-600">
            Bạn chưa có tài khoản?{" "}
            <Link
              className="font-medium text-[#0098a2] hover:underline"
              href="/register"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
