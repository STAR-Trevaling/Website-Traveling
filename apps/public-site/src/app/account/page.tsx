import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { User, Shield, Compass, Heart, ArrowRight } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { SiteHeader } from "@/components/layout/site-header";
import { LogoutButton } from "@/components/auth/logout-button";
import { DICTIONARY } from "@/lib/i18n/dictionary";

export default async function Account() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";
  const dict = DICTIONARY[isEn ? "en" : "vi"];
  const a = dict.authPages;

  const roleLabel =
    user.role === "partner"
      ? a.roles.partner
      : user.role === "admin"
      ? a.roles.admin
      : a.roles.traveler;

  return (
    <>
      <SiteHeader overlay={false} />
      <main className="template-page-bg min-h-screen text-[#282828] px-4 sm:px-6 py-8 sm:py-12 md:px-12 lg:px-16 overflow-x-hidden">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* USER PROFILE CARD */}
          <div className="bg-white/90 p-8 md:p-10 rounded-[2px] shadow-sm border border-slate-100 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-full bg-slate-100 text-slate-800">
                  <User className="size-7" />
                </div>
                <div>
                  <h2 className="display-title text-2xl font-bold text-[#1e293b]">
                    {user.username}
                  </h2>
                  <p className="text-xs uppercase tracking-wider text-slate-700 font-bold mt-0.5">
                    {roleLabel}
                  </p>
                </div>
              </div>

              <LogoutButton />
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-6">
              <Link
                href="/tours"
                className="group p-5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-[2px] transition flex flex-col justify-between"
              >
                <div>
                  <Compass className="size-6 text-slate-700 mb-3" />
                  <h3 className="display-title text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    {a.exploreToursCard}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 font-light">
                    {a.exploreToursDesc}
                  </p>
                </div>
                <span className="mt-4 text-xs font-semibold text-slate-900 flex items-center gap-1">
                  {isEn ? "View tours" : "Xem ngay"} <ArrowRight className="size-3" />
                </span>
              </Link>

              <Link
                href="/experiences"
                className="group p-5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-[2px] transition flex flex-col justify-between"
              >
                <div>
                  <Heart className="size-6 text-slate-700 mb-3" />
                  <h3 className="display-title text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    {a.savedExperiencesCard}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 font-light">
                    {a.savedExperiencesDesc}
                  </p>
                </div>
                <span className="mt-4 text-xs font-semibold text-slate-900 flex items-center gap-1">
                  {isEn ? "Explore" : "Khám phá"} <ArrowRight className="size-3" />
                </span>
              </Link>

              <Link
                href="/partner"
                className="group p-5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-[2px] transition flex flex-col justify-between"
              >
                <div>
                  <Shield className="size-6 text-slate-700 mb-3" />
                  <h3 className="display-title text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    {isEn ? "Partner Portal" : "Cổng Đối Tác"}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 font-light">
                    {isEn
                      ? "Register and manage local travel service offerings."
                      : "Đăng ký hồ sơ cung cấp dịch vụ và tour du lịch bản địa."}
                  </p>
                </div>
                <span className="mt-4 text-xs font-semibold text-slate-900 flex items-center gap-1">
                  {isEn ? "Register" : "Đăng ký"} <ArrowRight className="size-3" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
