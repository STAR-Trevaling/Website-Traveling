import type { Metadata } from "next";
import { cookies } from "next/headers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { AccommodationsCatalog } from "@/components/accommodations/accommodations-catalog";
import { publicApi, safe } from "@/lib/api";
import { VIETNAM_ACCOMMODATIONS } from "@/data/seed/accommodations";
import { Building2, Sparkles, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Khách Sạn & Khu Nghỉ Dưỡng Di Sản Việt Nam | STAR Travels",
  description:
    "Tuyển tập khách sạn di sản, resort ven biển 5 sao và boutique ecolodge sang trọng bậc nhất Việt Nam. Giới thiệu và kết nối ưu đãi trực tiếp cùng Booking.com, Agoda.",
};

export default async function AccommodationsPage() {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  // Gracefully fetch from Django API, fallback to rich seed
  const remoteData = await safe(publicApi.accommodations(), []);
  const accommodations = remoteData.length > 0 ? remoteData : VIETNAM_ACCOMMODATIONS;

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col justify-between text-slate-900">
      <SiteHeader />

      <main className="flex-1 pb-16">
        {/* Luxury Light Hero Section */}
        <section className="relative bg-gradient-to-b from-[#fdfbf7] via-[#f7f3ea] to-[#f4eee2] text-slate-900 py-12 sm:py-16 md:py-20 px-4 overflow-hidden border-b border-[#e5dccb]">
          {/* Subtle warm champagne radial texture */}
          <div className="absolute inset-0 bg-[radial-gradient(#c5a880_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
          <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-br from-amber-200/35 via-rose-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-1/4 -bottom-10 w-80 h-80 bg-amber-100/40 rounded-full blur-2xl pointer-events-none" />

          <div className="mx-auto max-w-7xl relative z-10">
            <Breadcrumb
              items={[
                { label: isEn ? "Home" : "Trang chủ", href: "/" },
                { label: isEn ? "Accommodations" : "Khách sạn & Resort" },
              ]}
            />

            <div className="mt-6 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-[2px] bg-amber-500/15 border border-amber-600/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-900 mb-3.5 shadow-xs">
                <Sparkles className="size-3.5 text-amber-700" />
                <span>{isEn ? "Exclusive Stays" : "Bộ Sưu Tập Nghỉ Dưỡng Thượng Lưu"}</span>
              </div>

              <h1 className="script-title text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0f172a] mb-4 leading-tight">
                {isEn
                  ? "Luxury Hotels & Heritage Resorts"
                  : "Khách Sạn & Khu Nghỉ Dưỡng Di Sản"}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed max-w-2xl font-normal">
                {isEn
                  ? "Curated selection of prestigious 5-star heritage hotels and secluded villas across Vietnam. Curated by STAR Travels with direct partner reservations."
                  : "Tuyển tập những kiệt tác kiến trúc di sản, khu nghỉ dưỡng ven biển và ecolodge ẩn mình giữa thiên nhiên kỳ vĩ. STAR Travels tuyển chọn và đồng hành cùng đối tác đặt phòng uy tín toàn cầu."}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium">
                <div className="flex items-center gap-2 rounded-[2px] bg-white/85 border border-[#e5dccb] px-3.5 py-1.5 shadow-xs text-slate-800">
                  <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                  <span>Đối tác chính thức: Booking.com, Agoda, Traveloka</span>
                </div>
                <div className="flex items-center gap-2 rounded-[2px] bg-white/85 border border-[#e5dccb] px-3.5 py-1.5 shadow-xs text-slate-800">
                  <Building2 className="size-4 text-amber-600 shrink-0" />
                  <span>100% Khách sạn đạt chuẩn 4-5 sao hoặc Boutique độc bản</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10">
          <AccommodationsCatalog initialAccommodations={accommodations} />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
