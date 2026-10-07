import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { SiteHeader } from "@/components/layout/site-header";
import { ToursCatalog } from "@/components/tours/tours-catalog";
import { Breadcrumb } from "@/components/shared/breadcrumb";

export const metadata: Metadata = {
  title: "Tour du lịch trọn gói Việt Nam | Star Travels Vietnam",
  description: "Tuyển tập các tour du lịch trọn gói chất lượng cao tại Đà Lạt, Hạ Long, Sa Pa, Tràng An, Phú Quốc.",
};

export default async function ToursPage() {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  return (
    <>
      <SiteHeader overlay={false} />

      <main className="template-page-bg min-h-screen px-4 sm:px-6 py-8 sm:py-12 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 sm:mb-8">
            <Breadcrumb
              items={[
                { label: isEn ? "Home" : "Trang Chủ", href: "/" },
                { label: isEn ? "Tours" : "Tour Tuyển Chọn" },
              ]}
            />
          </div>

          {/* Page Title Card */}
          <div className="rounded-[2px] bg-white/85 backdrop-blur-md p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_rgba(0,152,162,0.06)] border border-white/90 mb-8 sm:mb-12">
            <span className="inline-block px-3 py-1 rounded-[2px] bg-[#0098a2]/15 text-[#007a82] border border-[#0098a2]/25 text-[11px] font-bold uppercase tracking-[0.2em] mb-2">
              {isEn ? "Curated Packages" : "Hành Trình Trọn Gói"}
            </span>
            <h1 className="script-title mt-1 text-4xl sm:text-5xl md:text-6xl text-[#0f172a] leading-tight">
              {isEn ? "Curated Tours & Expeditions" : "Tour Du Lịch Tuyển Chọn"}
            </h1>
            <p className="mt-2 text-sm sm:text-base md:text-[17px] text-slate-800 font-medium max-w-2xl leading-relaxed">
              {isEn
                ? "Handcrafted itineraries across Vietnam's most iconic landscapes with all-inclusive premium services."
                : "Tuyển tập những tour du lịch chất lượng cao, trọn gói tiện ích với lịch trình tinh tế khắp danh lam thắng cảnh Việt Nam."}
            </p>
          </div>

          <ToursCatalog />
        </div>
      </main>
    </>
  );
}
