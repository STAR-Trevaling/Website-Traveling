import type { Metadata } from "next";
import { cookies } from "next/headers";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { GuideHubExplorer } from "@/components/guide/guide-hub-explorer";
import { GUIDE_CATEGORIES } from "@/data/seed/guide";
import { VIETNAM_IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Cẩm Nang Thông Tin Du Lịch Việt Nam Toàn Diện | STAR Travels",
  description:
    "Hệ sinh thái tra cứu thông tin du lịch Việt Nam thực dụng: thời tiết 3 miền, chính sách visa & e-visa 2026, phương tiện di chuyển, số điện thoại khẩn cấp, văn hóa ứng xử và tiền tệ.",
  keywords: [
    "cẩm nang du lịch việt nam",
    "kinh nghiệm du lịch việt nam",
    "thông tin du lịch việt nam",
    "thời tiết du lịch việt nam",
    "thủ tục visa việt nam 2026",
    "vietnam travel guide",
    "travel info hub vietnam",
  ],
  openGraph: {
    title: "Cẩm Nang Thông Tin Du Lịch Việt Nam Toàn Diện | STAR Travels",
    description:
      "Tra cứu thông tin du lịch thực dụng: thời tiết 12 điểm đến, miễn visa 45 ngày, hướng dẫn e-visa, di chuyển nội địa, số khẩn cấp 113.",
    images: [{ url: VIETNAM_IMAGES.hero, width: 1200, height: 630, alt: "Cẩm Nang Du Lịch STAR Travels" }],
  },
};

export default async function GuideHubPage() {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  const breadcrumbs = [
    { label: isEn ? "Home" : "Trang Chủ", href: "/" },
    { label: isEn ? "Travel Info Hub" : "Thông Tin Cần Biết" },
  ];

  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isEn ? "Vietnam Travel Information Hub" : "Cẩm Nang Thông Tin Du Lịch Việt Nam",
    description: isEn
      ? "Comprehensive practical guide for traveling in Vietnam covering weather, visa, transport, emergency contacts, culture, and currency."
      : "Cẩm nang tra cứu thông tin thực dụng dành cho du khách khám phá Việt Nam: thời tiết, visa, di chuyển, an toàn, văn hóa và tiền tệ.",
    url: "https://startravels.vn/guide",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: isEn ? "Home" : "Trang Chủ",
          item: "https://startravels.vn",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: isEn ? "Travel Info Hub" : "Thông Tin Cần Biết",
          item: "https://startravels.vn/guide",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader overlay={false} />

      <main className="template-page-bg min-h-screen px-4 sm:px-6 py-8 sm:py-12 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Pill */}
          <div className="mb-8">
            <Breadcrumb items={breadcrumbs} />
          </div>

          {/* Intro Section */}
          <section className="mb-10 sm:mb-12 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-red-50 text-[#da251d] border border-red-200/80 text-xs font-bold uppercase tracking-wider mb-3">
              <span>✦</span>
              <span>{isEn ? "PRACTICAL DIRECTORY" : "CẨM NANG THỰC DỤNG"}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              {isEn
                ? "Everything You Need to Know Before & During Your Trip"
                : "Tất Cả Thông Tin Bạn Cần Biết Trước & Trong Chuyến Đi"}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              {isEn
                ? "STAR Travels is designed not just for booking bespoke tours, but as Vietnam's most reliable travel discovery ecosystem. Explore our 7 core categories below for verified, structured practical guides."
                : "STAR Travels được xây dựng với định vị là hệ sinh thái tra cứu thông tin du lịch Việt Nam đáng tin cậy cho du khách. Dưới đây là 7 nhóm cẩm nang được biên soạn có cấu trúc, tra cứu kỹ lưỡng từ các nguồn chính thống và thực tế địa phương."}
            </p>
          </section>

          {/* Explorer Component (Search, Filter, Cards, Tips) */}
          <GuideHubExplorer categories={GUIDE_CATEGORIES} isEn={isEn} />
        </div>
      </main>
    </>
  );
}
