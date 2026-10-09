import type { Metadata } from "next";
import { cookies } from "next/headers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { RestaurantsCatalog } from "@/components/restaurants/restaurants-catalog";
import { publicApi, safe } from "@/lib/api";
import { VIETNAM_RESTAURANTS } from "@/data/seed/restaurants";
import { Utensils, Sparkles, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Tuyển Tập Nhà Hàng & Ẩm Thực Tinh Tuyển Việt Nam | STAR Travels",
  description:
    "Khám phá các nhà hàng đạt Michelin 1 sao, ẩm thực cung đình Huế và phong vị Việt đương đại. Đặt bàn nhanh và kết nối trực tiếp đối tác ẩm thực hàng đầu.",
};

export default async function RestaurantsPage() {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  // Gracefully fetch from Django API, fallback to rich seed
  const remoteData = await safe(publicApi.restaurants(), []);
  const restaurants = remoteData.length > 0 ? remoteData : VIETNAM_RESTAURANTS;

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
                { label: isEn ? "Dining" : "Ẩm thực & Nhà hàng" },
              ]}
            />

            <div className="mt-6 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-[2px] bg-amber-500/20 border border-amber-400/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-300 mb-3">
                <Sparkles className="size-3.5 text-amber-400" />
                <span>{isEn ? "Michelin & Heritage Gastronomy" : "Tinh Hoa Ẩm Thực & Michelin"}</span>
              </div>

              <h1 className="script-title text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
                {isEn
                  ? "Curated Gastronomy & Fine Dining"
                  : "Tuyển Tập Nhà Hàng & Ẩm Thực Tinh Tuyển"}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {isEn
                  ? "From celebrated 1-Michelin-star gems to timeless imperial royal feasts. Curated and directly connected by STAR Travels."
                  : "Hành trình vị giác đưa quý khách đến với những nhà hàng đạt sao Michelin danh giá, mâm cơm gia đình xưa mộc mạc và yến tiệc cung đình Huế trứ danh. STAR Travels trân trọng kết nối quý thực khách."}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <Award className="size-4 text-amber-400" />
                  <span>Quy tụ các nhà hàng Michelin Guide & Fine Dining</span>
                </div>
                <div className="flex items-center gap-2">
                  <Utensils className="size-4 text-emerald-400" />
                  <span>Đặt bàn trực tiếp 1 chạm — Hỗ trợ tư vấn VIP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
          <RestaurantsCatalog initialRestaurants={restaurants} />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
