import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import {
  CloudSun,
  Thermometer,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Compass,
  MapPin,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import {
  REGIONS_WEATHER_OVERVIEW,
  DESTINATIONS_WEATHER_DATA,
} from "@/data/seed/guide";
import { VIETNAM_IMAGES } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Thời Tiết & Mùa Du Lịch Việt Nam: Nên Đi Tháng Nào Cho 12 Điểm Đến | STAR Travels",
  description:
    "Cẩm nang thời tiết du lịch Việt Nam 3 miền Bắc - Trung - Nam và chi tiết 12 điểm đến: Sa Pa, Vịnh Hạ Long, Hội An, Phú Quốc, Đà Nẵng, Ninh Bình, Hà Giang... Tháng lý tưởng, tháng nên tránh và lưu ý bão lũ.",
  keywords: [
    "thời tiết du lịch việt nam",
    "du lịch việt nam mùa nào đẹp nhất",
    "du lịch sa pa tháng mấy",
    "thời tiết phú quốc tháng nào đẹp",
    "mùa mưa hội an tháng mấy",
    "vietnam weather by month",
    "best time to visit vietnam",
  ],
  openGraph: {
    title: "Thời Tiết & Mùa Du Lịch Việt Nam: Nên Đi Tháng Nào Cho 12 Điểm Đến | STAR Travels",
    description:
      "Bảng tổng hợp thời điểm vàng du lịch Việt Nam 3 miền và chi tiết nhiệt độ, lưu ý bão lũ cho 12 danh thắng hàng đầu.",
    images: [{ url: VIETNAM_IMAGES.saPa, width: 1200, height: 630, alt: "Thời tiết du lịch Việt Nam" }],
  },
};

const MONTH_NAMES_VI = [
  "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
  "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
];

const MONTH_NAMES_EN = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default async function WeatherGuidePage() {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  const breadcrumbs = [
    { label: isEn ? "Home" : "Trang Chủ", href: "/" },
    { label: isEn ? "Travel Info Hub" : "Thông Tin Cần Biết", href: "/guide" },
    { label: isEn ? "Weather & Seasons" : "Thời Tiết & Mùa Du Lịch" },
  ];

  // Structured Data Schema.org
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isEn
      ? "Vietnam Weather & Travel Seasons Guide by Month and Destination"
      : "Cẩm Nang Thời Tiết & Mùa Du Lịch Việt Nam Theo Tháng và 12 Điểm Đến",
    description: isEn
      ? "Detailed climate patterns for Northern, Central, and Southern Vietnam with best visiting months for 12 destinations."
      : "Chi tiết khí hậu 3 miền Bắc - Trung - Nam và thời điểm lý tưởng cho 12 danh thắng du lịch nổi tiếng.",
    image: VIETNAM_IMAGES.saPa,
    author: {
      "@type": "Organization",
      name: "STAR Travels Vietnam",
    },
    publisher: {
      "@type": "Organization",
      name: "STAR Travels Vietnam",
      logo: {
        "@type": "ImageObject",
        url: "https://startravels.vn/logo.png",
      },
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

          {/* Page Intro */}
          <section className="mb-12 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-sky-50 text-sky-800 border border-sky-200 text-xs font-bold uppercase tracking-wider mb-3">
              <CloudSun className="size-3.5 text-sky-600" />
              <span>{isEn ? "CLIMATE AT A GLANCE" : "TỔNG QUAN KHÍ HẬU"}</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              {isEn
                ? "When is the Best Time to Visit Vietnam?"
                : "Nên Đi Du Lịch Việt Nam Vào Tháng Mấy?"}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              {isEn
                ? "Because Vietnam spans over 1,650 km from North to South with dramatic topographical variations, there is truly no single 'bad' month to visit. When one region experiences monsoon rains, another basks in clear sunshine."
                : "Trải dài hơn 1.650 km từ Bắc vào Nam với địa hình đa dạng, Việt Nam không có thời điểm nào là 'xấu hoàn toàn'. Khi miền Bắc se lạnh đón đông thì miền Nam lại ngập tràn nắng ấm, và khi miền Trung vào mùa bão thì vùng núi Tây Bắc lại bước vào mùa lúa chín vàng rực rỡ."}
            </p>
          </section>

          {/* Section 1: Overview of 3 Climate Regions */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Compass className="size-5 text-[#da251d]" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                {isEn ? "Climate Patterns Across 3 Regions" : "Khí Hậu Đặc Trưng 3 Miền (Bắc — Trung — Nam)"}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {REGIONS_WEATHER_OVERVIEW.map((region) => (
                <div
                  key={region.region}
                  className="rounded-[2px] bg-white border border-slate-200 shadow-sm p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-[2px] bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
                        {isEn ? region.nameEn : region.name}
                      </span>
                      <Thermometer className="size-4 text-slate-400" />
                    </div>

                    <h4 className="font-serif text-lg font-bold text-slate-900 mb-2">
                      {isEn ? region.climateTypeEn : region.climateType}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {isEn ? region.summaryEn : region.summary}
                    </p>

                    <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                      <div>
                        <span className="font-bold text-emerald-700 flex items-center gap-1.5 mb-1">
                          <CheckCircle2 className="size-3.5" />
                          {isEn ? "Best Period:" : "Thời điểm lý tưởng:"}
                        </span>
                        <p className="text-slate-700 pl-5">
                          {isEn ? region.idealPeriodEn : region.idealPeriod}
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-rose-700 flex items-center gap-1.5 mb-1">
                          <AlertTriangle className="size-3.5" />
                          {isEn ? "Rainy / Storm Alert:" : "Mùa mưa & Cảnh báo:"}
                        </span>
                        <p className="text-slate-700 pl-5">
                          {isEn ? region.rainySeasonEn : region.rainySeason}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      {isEn ? "Key Highlights:" : "Đặc trưng nổi bật:"}
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {(isEn ? region.highlightsEn : region.highlights).map((hl, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#da251d] font-bold leading-none mt-0.5">•</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Detailed 12 Destinations Breakdown */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
                  {isEn
                    ? "Detailed Weather Guide for 12 Premier Destinations"
                    : "Cẩm Nang Thời Tiết Chi Tiết Cho 12 Điểm Đến"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {isEn
                    ? "Click on any destination card to view comprehensive travel packages and experiences."
                    : "Mỗi điểm đến đều có thông số nhiệt độ trung bình, tháng lý tưởng, tháng nên tránh và lưu ý bão lũ."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {DESTINATIONS_WEATHER_DATA.map((dest) => {
                const regionBadge =
                  dest.region === "north"
                    ? isEn ? "North" : "Miền Bắc"
                    : dest.region === "central"
                    ? isEn ? "Central" : "Miền Trung"
                    : isEn ? "South" : "Miền Nam";

                return (
                  <div
                    key={dest.destinationSlug}
                    id={`weather-${dest.destinationSlug}`}
                    className="rounded-[2px] bg-white border border-slate-200/90 shadow-sm p-6 sm:p-7 flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div>
                      {/* Destination Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="size-4 text-[#da251d]" />
                          <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                            {isEn ? dest.destinationNameEn : dest.destinationName}
                          </h4>
                        </div>
                        <span className="px-2 py-0.5 rounded-[2px] bg-slate-100 text-slate-700 text-[11px] font-bold">
                          {regionBadge}
                        </span>
                      </div>

                      {/* Best Months vs Avoid Months Matrix */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-[2px] bg-slate-50 border border-slate-100 mb-5 text-xs">
                        {/* Ideal Months */}
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1.5">
                            <CheckCircle2 className="size-3.5 text-emerald-600" />
                            <span>{isEn ? "Ideal Months:" : "Tháng lý tưởng:"}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {dest.idealMonths.map((m) => (
                              <span
                                key={m}
                                className="px-2 py-0.5 rounded-[2px] bg-emerald-100 text-emerald-900 text-[11px] font-bold"
                              >
                                {isEn ? MONTH_NAMES_EN[m - 1] : `T${m}`}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Avoid Months */}
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-rose-800 mb-1.5">
                            <XCircle className="size-3.5 text-rose-600" />
                            <span>{isEn ? "Months to Avoid:" : "Nên tránh / Cân nhắc:"}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {dest.avoidMonths.map((m) => (
                              <span
                                key={m}
                                className="px-2 py-0.5 rounded-[2px] bg-rose-100 text-rose-900 text-[11px] font-bold"
                              >
                                {isEn ? MONTH_NAMES_EN[m - 1] : `T${m}`}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Temperature by Season Table */}
                      <div className="mb-5">
                        <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Thermometer className="size-3.5 text-amber-500" />
                          <span>{isEn ? "Seasonal Temperature Breakdown" : "Nhiệt Độ & Thời Tiết Theo Mùa"}</span>
                        </p>
                        <div className="divide-y divide-slate-100 border border-slate-100 rounded-[2px] overflow-hidden">
                          {dest.temperatureBySeason.map((item, idx) => (
                            <div key={idx} className="p-2.5 sm:px-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1 bg-white hover:bg-slate-50">
                              <span className="font-semibold text-slate-800 sm:w-1/3">
                                {isEn ? item.seasonEn : item.season}
                              </span>
                              <span className="inline-block px-1.5 py-0.5 rounded-[2px] bg-amber-50 text-amber-800 font-bold text-[11px] self-start sm:self-auto">
                                {item.avgTempC}
                              </span>
                              <span className="text-slate-600 text-[11px] sm:w-1/2 sm:text-right">
                                {isEn ? item.descriptionEn : item.description}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Special Notes & Warnings */}
                      <div className="rounded-[2px] bg-amber-50/70 border border-amber-200/80 p-3.5 text-xs text-amber-950 mb-4">
                        <div className="flex items-center gap-1.5 font-bold mb-1.5 text-amber-900">
                          <AlertTriangle className="size-3.5 text-amber-600" />
                          <span>{isEn ? "Local Travel Notes & Weather Advisories:" : "Lưu Ý Thực Tế & Cảnh Báo:"}</span>
                        </div>
                        <ul className="space-y-1 list-disc list-inside text-[11px] sm:text-xs leading-relaxed text-amber-900">
                          {(isEn ? dest.specialNotesEn : dest.specialNotes).map((note, idx) => (
                            <li key={idx}>{note}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Cross Link to Destination Detail */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/destinations/${dest.destinationSlug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#da251d] hover:text-[#c92018] group"
                      >
                        <span>
                          {isEn
                            ? `Discover ${dest.destinationNameEn} Tours & Stays`
                            : `Khám phá điểm đến ${dest.destinationName}`}
                        </span>
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
