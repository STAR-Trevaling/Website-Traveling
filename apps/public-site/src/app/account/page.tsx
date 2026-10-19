import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  User,
  Shield,
  Compass,
  Heart,
  ArrowRight,
  CalendarCheck,
  Building2,
  Sparkles,
} from "lucide-react";
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
      <main className="min-h-screen bg-[#faf8f5] text-[#282828] px-4 sm:px-6 py-8 sm:py-12 md:px-12 lg:px-16">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* USER PROFILE CARD */}
          <div className="bg-white/95 p-8 md:p-10 rounded-[2px] shadow-xs border border-[#e5dccb] backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#e5dccb]">
              <div className="flex items-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-[#da251d] to-[#991b1b] text-white font-extrabold text-xl shadow-xs border border-white/40 shrink-0">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="script-title text-2xl sm:text-3xl font-extrabold text-[#0f172a]">
                    {user.username}
                  </h1>
                  <p className="text-xs text-slate-500 font-normal">
                    {user.email || `${user.username}@star.vn`}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100/80 border border-amber-300 px-2 py-0.5 rounded-full">
                    <Sparkles className="size-2.5 text-amber-700" />
                    <span>{roleLabel}</span>
                  </span>
                </div>
              </div>

              <LogoutButton />
            </div>

            {/* QUICK ACTIONS DASHBOARD */}
            <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              <Link
                href="/account/bookings"
                className="group p-5 bg-amber-50/70 hover:bg-amber-100/70 border border-amber-300/80 rounded-[2px] transition flex flex-col justify-between shadow-xs"
              >
                <div>
                  <CalendarCheck className="size-6 text-amber-700 mb-3" />
                  <h2 className="script-title text-lg font-bold text-[#0f172a] group-hover:text-amber-800 transition-colors">
                    {isEn ? "My Bookings" : "Đơn Đặt Chỗ Của Tôi"}
                  </h2>
                  <p className="mt-1 text-xs text-slate-600 font-normal leading-relaxed">
                    {isEn
                      ? "Track your real-time reservations, payment codes & travel tickets."
                      : "Theo dõi tình trạng đặt tour, mã thanh toán VietQR và vé hành trình."}
                  </p>
                </div>
                <span className="mt-4 text-xs font-bold text-amber-900 flex items-center gap-1">
                  {isEn ? "View Bookings" : "Xem lịch sử"} <ArrowRight className="size-3" />
                </span>
              </Link>

              <Link
                href="/tours"
                className="group p-5 bg-[#faf8f5] hover:bg-white border border-[#e5dccb] hover:border-amber-400/70 rounded-[2px] transition flex flex-col justify-between shadow-xs"
              >
                <div>
                  <Compass className="size-6 text-[#da251d] mb-3" />
                  <h2 className="script-title text-lg font-bold text-[#0f172a] group-hover:text-[#da251d] transition-colors">
                    {a.exploreToursCard}
                  </h2>
                  <p className="mt-1 text-xs text-slate-600 font-normal leading-relaxed">
                    {a.exploreToursDesc}
                  </p>
                </div>
                <span className="mt-4 text-xs font-bold text-[#da251d] flex items-center gap-1">
                  {isEn ? "View Tours" : "Xem ngay"} <ArrowRight className="size-3" />
                </span>
              </Link>

              <Link
                href="/accommodations"
                className="group p-5 bg-[#faf8f5] hover:bg-white border border-[#e5dccb] hover:border-amber-400/70 rounded-[2px] transition flex flex-col justify-between shadow-xs"
              >
                <div>
                  <Building2 className="size-6 text-amber-700 mb-3" />
                  <h2 className="script-title text-lg font-bold text-[#0f172a] group-hover:text-amber-800 transition-colors">
                    {isEn ? "Luxury Stays" : "Khách Sạn & Resort Di Sản"}
                  </h2>
                  <p className="mt-1 text-xs text-slate-600 font-normal leading-relaxed">
                    {isEn
                      ? "Browse curated 5-star heritage hotels and secluded villas."
                      : "Khám phá danh bạ khách sạn di sản và resort 5 sao uy tín."}
                  </p>
                </div>
                <span className="mt-4 text-xs font-bold text-amber-900 flex items-center gap-1">
                  {isEn ? "Explore" : "Khám phá"} <ArrowRight className="size-3" />
                </span>
              </Link>

              <Link
                href="/experiences"
                className="group p-5 bg-[#faf8f5] hover:bg-white border border-[#e5dccb] hover:border-amber-400/70 rounded-[2px] transition flex flex-col justify-between shadow-xs"
              >
                <div>
                  <Heart className="size-6 text-rose-600 mb-3" />
                  <h2 className="script-title text-lg font-bold text-[#0f172a] group-hover:text-rose-700 transition-colors">
                    {a.savedExperiencesCard}
                  </h2>
                  <p className="mt-1 text-xs text-slate-600 font-normal leading-relaxed">
                    {a.savedExperiencesDesc}
                  </p>
                </div>
                <span className="mt-4 text-xs font-bold text-rose-700 flex items-center gap-1">
                  {isEn ? "Explore" : "Khám phá"} <ArrowRight className="size-3" />
                </span>
              </Link>

              <Link
                href="/partner"
                className="group p-5 bg-[#faf8f5] hover:bg-white border border-[#e5dccb] hover:border-amber-400/70 rounded-[2px] transition flex flex-col justify-between shadow-xs sm:col-span-2 md:col-span-2"
              >
                <div>
                  <Shield className="size-6 text-slate-700 mb-3" />
                  <h2 className="script-title text-lg font-bold text-[#0f172a] group-hover:text-amber-800 transition-colors">
                    {isEn ? "Partner & Host Portal" : "Cổng Đối Tác & Hợp Tác Du Lịch"}
                  </h2>
                  <p className="mt-1 text-xs text-slate-600 font-normal leading-relaxed">
                    {isEn
                      ? "Register your agency, accommodation, or boutique experience with STAR Travels."
                      : "Đăng ký hồ sơ cung cấp dịch vụ, khách sạn di sản hoặc tour trải nghiệm độc bản."}
                  </p>
                </div>
                <span className="mt-4 text-xs font-bold text-slate-800 flex items-center gap-1">
                  {isEn ? "Access Portal" : "Truy cập cổng đối tác"} <ArrowRight className="size-3" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
