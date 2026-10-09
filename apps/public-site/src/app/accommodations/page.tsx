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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <SiteHeader />

      <main className="flex-1 pb-16">
        {/* Hero Section */}
        <div className="relative bg-[#1e293b] text-white py-14 sm:py-20 px-4 overflow-hidden border-b border-amber-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(#da251d_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
          <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="mx-auto max-w-7xl relative z-10">
            <Breadcrumb
              items={[
                { label: isEn ? "Home" : "Trang chủ", href: "/" },
                { label: isEn ? "Accommodations" : "Khách sạn & Resort" },
              ]}
            />

            <div className="mt-6 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-[2px] bg-amber-500/20 border border-amber-400/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-300 mb-3">
                <Sparkles className="size-3.5 text-amber-400" />
                <span>{isEn ? "Exclusive Stays" : "Bộ Sưu Tập Nghỉ Dưỡng Thượng Lưu"}</span>
              </div>

              <h1 className="script-title text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
                {isEn
                  ? "Luxury Hotels & Heritage Resorts"
                  : "Khách Sạn & Khu Nghỉ Dưỡng Di Sản"}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {isEn
                  ? "Curated selection of prestigious 5-star heritage hotels and secluded villas across Vietnam. Curated by STAR Travels with direct partner reservations."
                  : "Tuyển tập những kiệt tác kiến trúc di sản, khu nghỉ dưỡng ven biển và ecolodge ẩn mình giữa thiên nhiên kỳ vĩ. STAR Travels tuyển chọn và đồng hành cùng đối tác đặt phòng uy tín toàn cầu."}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-emerald-400" />
                  <span>Đối tác chính thức: Booking.com, Agoda, Traveloka</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="size-4 text-amber-400" />
                  <span>100% Khách sạn đạt chuẩn 4-5 sao hoặc Boutique độc bản</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
          <AccommodationsCatalog initialAccommodations={accommodations} />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
