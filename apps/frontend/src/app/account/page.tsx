import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { PageHero } from "@/components/layout/page-hero";
import { LogoutButton } from "@/components/auth/logout-button";
import { VIETNAM_IMAGES } from "@/lib/assets";

export default async function Account() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <PageHero
        title={`Xin chào, ${user.username}`}
        subtitle={`Vai trò tài khoản: ${user.role === "partner" ? "Đối tác dịch vụ" : user.role === "admin" ? "Quản trị viên" : "Du khách"}`}
        image={VIETNAM_IMAGES.ctaBanner}
      />
      <main className="template-page-bg px-6 py-16">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white/85 p-8 shadow-lg backdrop-blur-md">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800">Thông tin tài khoản</h2>
            <p className="mt-1 text-sm text-slate-600">
              Quản lý hành trình, danh sách yêu thích và hồ sơ hợp tác.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/partner"
              className="rounded-full bg-[#0098a2] px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-md transition hover:bg-[#007f88]"
            >
              ĐĂNG KÝ ĐỐI TÁC
            </Link>
            <LogoutButton />
          </div>
        </div>
      </main>
    </>
  );
}
