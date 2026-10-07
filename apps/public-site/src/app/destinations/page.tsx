import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { Search } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { DestinationCard } from "@/components/shared/destination-card";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { publicApi, safe } from "@/lib/api";
import { VIETNAM_IMAGES } from "@/lib/assets";
import { ALL_VIETNAM_DESTINATIONS } from "@/data/seed";
import { DICTIONARY } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/types";

export const metadata: Metadata = {
  title: "Điểm Đến Nổi Tiếng Tại Việt Nam | Star Travels Vietnam",
  description: "Khám phá danh thắng, vịnh biển và di sản văn hóa khắp dải đất hình chữ S: Hạ Long, Sa Pa, Đà Nẵng, Phú Quốc, Hội An, Miền Tây.",
};

interface DestinationsPageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function DestinationsPage({ searchParams }: DestinationsPageProps) {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";
  const locale: Locale = isEn ? "en" : "vi";
  const dict = DICTIONARY[locale];
  const dp = dict.destinationsPage;

  const { search } = await searchParams;
  const queryString = search ? `?search=${encodeURIComponent(search)}` : "";
  const backendItems = await safe(publicApi.destinations(queryString), []);

  let items = backendItems.length > 0 ? backendItems : ALL_VIETNAM_DESTINATIONS;
  if (search) {
    const s = search.toLowerCase();
    items = items.filter(
      (d) =>
        d.name.toLowerCase().includes(s) ||
        (d.name_en && d.name_en.toLowerCase().includes(s)) ||
        d.country.toLowerCase().includes(s) ||
        d.summary.toLowerCase().includes(s)
    );
  }

  return (
    <>
      <SiteHeader overlay={false} />

      <main className="template-page-bg min-h-screen text-[#282828] px-4 sm:px-6 py-8 sm:py-12 md:px-12 lg:px-16 overflow-x-hidden">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 sm:mb-8">
            <Breadcrumb
              items={[
                { label: locale === "en" ? "Home" : "Trang Chủ", href: "/" },
                { label: locale === "en" ? "Destinations" : "Điểm Đến" },
              ]}
            />
          </div>

          {/* Section Header & Search */}
          <div className="rounded-[2px] bg-white/85 backdrop-blur-md p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_rgba(0,152,162,0.06)] border border-white/90 mb-8 sm:mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-[2px] bg-[#0098a2]/15 text-[#007a82] border border-[#0098a2]/25 text-[11px] font-bold uppercase tracking-[0.2em] mb-2">
                  {dp.badge}
                </span>
                <h1 className="script-title mt-1 text-4xl sm:text-5xl md:text-6xl text-[#0f172a] leading-tight">
                  {dp.heading}
                </h1>
                <p className="mt-2 text-sm sm:text-base md:text-[17px] text-slate-800 font-medium max-w-2xl leading-relaxed">
                  {dp.subheading}
                </p>
              </div>

              <form method="GET" className="relative w-full md:max-w-md shrink-0">
                <input
                  type="text"
                  name="search"
                  defaultValue={search || ""}
                  placeholder={dp.searchPlaceholder}
                  className="w-full bg-white border border-slate-300 px-4 py-3 pr-10 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#0098a2] focus:ring-1 focus:ring-[#0098a2] rounded-[2px] shadow-sm transition"
                />
                <button
                  type="submit"
                  aria-label={dp.searchAria}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-[#0098a2] transition cursor-pointer"
                >
                  <Search className="size-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="mt-8 sm:mt-12">
            {items.length > 0 ? (
              <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((destination) => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
              </div>
            ) : (
              <div className="py-16 sm:py-24 text-center rounded-[2px] bg-white/70 p-6 sm:p-12 border border-slate-100">
                <p className="text-sm sm:text-lg text-slate-500 font-light">
                  {search
                    ? dp.noResultsSearch.replace("{search}", search)
                    : dp.noResults}
                </p>
                <div className="mt-6">
                  <Link
                    href="/destinations"
                    className="inline-block bg-[#0098a2] text-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-[2px] shadow-sm transition-all duration-200 hover:bg-[#008f99] hover:shadow-[0px_8px_25px_rgba(0,152,162,0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    {dp.viewAllBtn}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* CALL TO ACTION */}
          <section className="mt-14 sm:mt-24 w-full bg-white/85 backdrop-blur-md py-10 sm:py-16 text-center rounded-[2px] border border-white/60 shadow-sm">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <h2 className="script-title text-3xl sm:text-4xl md:text-5xl text-[#1e293b]">
                {dp.ctaHeading}
              </h2>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-[#4b5563] font-light max-w-xl mx-auto leading-relaxed">
                {dp.ctaDesc}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <Link
                  href="/experiences"
                  className="border border-slate-700/70 bg-white text-[#1e293b] px-6 sm:px-8 py-2.5 sm:py-3 text-xs md:text-sm font-bold tracking-[0.18em] sm:tracking-[0.2em] uppercase rounded-[2px] template-shadow-text shadow-sm transition-all duration-200 hover:border-black hover:text-black hover:bg-slate-50 hover:shadow-[0px_8px_25px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  {dp.ctaExpBtn}
                </Link>
                <Link
                  href="/tours"
                  className="bg-white text-[#1e293b] border border-slate-300 px-6 sm:px-8 py-2.5 sm:py-3 text-xs md:text-sm font-semibold tracking-widest uppercase rounded-[2px] shadow-sm transition-all duration-200 hover:bg-white hover:border-slate-400 hover:shadow-[0px_6px_20px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  {dp.ctaToursBtn}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
