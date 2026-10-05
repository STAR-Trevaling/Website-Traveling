import Link from "next/link";
import { redirect } from "next/navigation";
import { User, Shield, Compass, Heart, ArrowRight } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { PageHero } from "@/components/layout/page-hero";
import { LogoutButton } from "@/components/auth/logout-button";
import { VIETNAM_IMAGES } from "@/lib/assets";

export default async function Account() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const roleLabel =
    user.role === "partner"
      ? "Đối Tác Lữ Hành Chính Thức"
      : user.role === "admin"
      ? "Quản Trị Viên Hệ Thống"
      : "Du Khách Tinh Hoa";

  return (
    <>
      <PageHero
        title={`Chào Mừng, ${user.username}`}
        subtitle={`Tài khoản Star Travels · ${roleLabel}`}
        image={VIETNAM_IMAGES.ctaBanner}
      />
      <main className="template-page-bg min-h-screen text-[#282828] px-6 py-16 md:px-12 lg:px-16 overflow-x-hidden">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* USER PROFILE CARD */}
          <div className="bg-white/90 p-8 md:p-10 rounded-[2px] shadow-sm border border-slate-100 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-full bg-[#0098a2]/10 text-[#0098a2]">
                  <User className="size-7" />
                </div>
                <div>
                  <h2 className="display-title text-2xl font-bold text-[#1e293b]">
                    {user.username}
                  </h2>
                  <p className="text-xs uppercase tracking-wider text-[#0098a2] font-semibold mt-0.5">
                    {roleLabel}
                  </p>
                </div>
              </div>

              <LogoutButton />
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-6">
              <Link
                href="/tours"
                className="group p-5 bg-slate-50 hover:bg-[#0098a2]/5 border border-slate-200/80 rounded-[2px] transition flex flex-col justify-between"
              >
                <div>
                  <Compass className="size-6 text-[#0098a2] mb-3" />
                  <h3 className="display-title text-base font-bold text-slate-900 group-hover:text-[#0098a2] transition-colors">
                    Khám Phá Tour
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 font-light">
                    Tuyển tập hành trình trọn gói tại Hạ Long, Sa Pa, Đà Nẵng.
                  </p>
                </div>
                <span className="mt-4 text-xs font-semibold text-[#0098a2] flex items-center gap-1">
                  Xem ngay <ArrowRight className="size-3" />
                </span>
              </Link>

              <Link
                href="/experiences"
                className="group p-5 bg-slate-50 hover:bg-[#0098a2]/5 border border-slate-200/80 rounded-[2px] transition flex flex-col justify-between"
              >
                <div>
                  <Heart className="size-6 text-[#0098a2] mb-3" />
                  <h3 className="display-title text-base font-bold text-slate-900 group-hover:text-[#0098a2] transition-colors">
                    Gói Trải Nghiệm
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 font-light">
                    Chèo thuyền, lặn san hô, cắm trại và khám phá bản địa.
                  </p>
                </div>
                <span className="mt-4 text-xs font-semibold text-[#0098a2] flex items-center gap-1">
                  Khám phá <ArrowRight className="size-3" />
                </span>
              </Link>

              <Link
                href="/partner"
                className="group p-5 bg-slate-50 hover:bg-[#0098a2]/5 border border-slate-200/80 rounded-[2px] transition flex flex-col justify-between"
              >
                <div>
                  <Shield className="size-6 text-[#0098a2] mb-3" />
                  <h3 className="display-title text-base font-bold text-slate-900 group-hover:text-[#0098a2] transition-colors">
                    Cổng Đối Tác
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 font-light">
                    Đăng ký hồ sơ cung cấp dịch vụ và tour du lịch bản địa.
                  </p>
                </div>
                <span className="mt-4 text-xs font-semibold text-[#0098a2] flex items-center gap-1">
                  Đăng ký <ArrowRight className="size-3" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
