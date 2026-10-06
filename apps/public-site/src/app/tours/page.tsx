import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { ToursCatalog } from "@/components/tours/tours-catalog";

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
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-6 sm:mb-8 font-normal">
            <Link href="/" className="hover:text-[#0098a2] transition">
              {isEn ? "Home" : "Trang Chủ"}
            </Link>
            <ChevronRight className="size-3 text-slate-400" />
            <span className="text-slate-800 font-medium">
              {isEn ? "Tours" : "Tour Tuyển Chọn"}
            </span>
          </nav>

          <ToursCatalog />
        </div>
      </main>
    </>
  );
}
