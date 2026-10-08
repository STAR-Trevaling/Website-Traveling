import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { SiteHeader } from "@/components/layout/site-header";
import { PlaceCard } from "@/components/shared/place-card";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { publicApi, safe } from "@/lib/api";
import { VIETNAM_IMAGES } from "@/lib/assets";
import { VIETNAM_EXPERIENCES } from "@/data/seed";
import { DICTIONARY } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/types";

export const metadata: Metadata = {
  title: "Gói Trải Nghiệm & Phiêu Lưu Độc Bản | Star Travels Vietnam",
  description: "Khám phá các tour trải nghiệm địa phương: du thuyền Hạ Long, trekking Fansipan, sailing Cát Bà và lặn san hô Phú Quốc.",
};

interface ExperiencesPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function ExperiencesPage({ searchParams }: ExperiencesPageProps) {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";
  const locale: Locale = isEn ? "en" : "vi";
  const dict = DICTIONARY[locale];
  const ep = dict.experiencesPage;

  const categories = [
    { label: ep.categories.all, slug: "" },
    { label: ep.categories.cruise, slug: "du-thuyen" },
    { label: ep.categories.watersports, slug: "the-thao-nuoc" },
    { label: ep.categories.trekking, slug: "trekking-leo-nui" },
    { label: ep.categories.camping, slug: "cam-trai" },
    { label: ep.categories.scuba, slug: "lan-bien" },
  ];

  const params = await searchParams;
  let items = [];

  if (params.lat && params.lng) {
    items = await safe(
      publicApi.nearby(
        Number(params.lat),
        Number(params.lng),
        Number(params.radius || 10)
      ),
      []
    );
  } else {
    const qs = new URLSearchParams();
    if (params.search) qs.set("search", params.search);
    if (params.destination) qs.set("destination__slug", params.destination);
    if (params.category) qs.set("category__slug", params.category);

    const query = qs.size ? `?${qs.toString()}` : "";
    items = await safe(publicApi.places(query), []);
  }

  // Fallback to rich curated Vietnam experiences if backend empty
  if (items.length === 0) {
    items = VIETNAM_EXPERIENCES;
    if (params.category) {
      items = items.filter((p) => p.category?.slug === params.category);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.name_en && p.name_en.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q)
      );
    }
  }

  const currentCategory = params.category || "";

  return (
    <>
      <SiteHeader overlay={false} />

      <main className="template-page-bg min-h-screen text-[#282828] px-4 sm:px-6 py-8 sm:py-12 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 sm:mb-8">
            <Breadcrumb
              items={[
                { label: locale === "en" ? "Home" : "Trang Chủ", href: "/" },
                { label: locale === "en" ? "Experiences" : "Trải Nghiệm" },
              ]}
            />
          </div>

          {/* HEADER & FILTER BAR */}
          <div className="rounded-[2px] bg-white/85 backdrop-blur-md p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_rgba(0,152,162,0.06)] border border-white/90 mb-8 sm:mb-12">
            <div>
              <span className="inline-block px-3 py-1 rounded-[2px] bg-[#0098a2]/15 text-[#007a82] border border-[#0098a2]/25 text-[11px] font-bold uppercase tracking-[0.2em] mb-2">
                {ep.badge}
              </span>
              <h1 className="script-title mt-1 text-4xl sm:text-5xl md:text-6xl text-[#0f172a] leading-tight">
                {ep.heading}
              </h1>
              <p className="mt-2 text-sm sm:text-base md:text-[17px] text-slate-800 font-medium max-w-2xl leading-relaxed">
                {locale === "en"
                  ? "Curated collection of authentic local adventures, expeditions and cultural experiences across Vietnam."
                  : "Tuyển tập những hoạt động thám hiểm bản địa, du thuyền và trải nghiệm văn hóa đặc sắc khắp Việt Nam."}
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="mt-6 pt-5 border-t border-slate-200/60 flex flex-wrap gap-1.5 sm:gap-2">
              {categories.map((cat) => {
                const isActive = currentCategory === cat.slug;
                const href = cat.slug ? `/experiences?category=${cat.slug}` : "/experiences";

                return (
                  <Link
                    key={cat.slug || "all"}
                    href={href}
                    className={`px-3.5 sm:px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-[2px] transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#0098a2] text-white shadow-[0px_4px_14px_rgba(0,152,162,0.35)]"
                        : "bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400 hover:shadow-sm border border-slate-200"
                    }`}
                  >
                    {cat.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* MAIN EXPERIENCES GRID */}
          <div className="mt-8 sm:mt-12">
            {items.length > 0 ? (
              <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            ) : (
              <div className="py-16 sm:py-24 text-center rounded-[2px] bg-white/70 p-6 sm:p-12 border border-slate-100">
                <p className="text-sm sm:text-lg text-slate-500 font-light">
                  {params.search
                    ? ep.noResultsSearch.replace("{search}", params.search)
                    : ep.noResults}
                </p>
                <div className="mt-6">
                  <Link
                    href="/experiences"
                    className="inline-block bg-[#0098a2] text-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-[2px] shadow-sm transition-all duration-200 hover:bg-[#008f99] hover:shadow-[0px_8px_25px_rgba(0,152,162,0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    {ep.viewAllBtn}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* CALL TO ACTION SECTION */}
          <section className="mt-14 sm:mt-24 w-full bg-white/85 backdrop-blur-md py-10 sm:py-16 text-center rounded-[2px] border border-white/60 shadow-sm">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <h2 className="script-title text-3xl sm:text-4xl md:text-5xl text-[#1e293b]">
                {ep.ctaHeading}
              </h2>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-[#4b5563] font-light max-w-xl mx-auto leading-relaxed">
                {ep.ctaDesc}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <Link
                  href="/tours"
                  className="border border-slate-700/70 bg-white text-[#1e293b] px-6 sm:px-8 py-2.5 sm:py-3 text-xs md:text-sm font-bold tracking-[0.18em] sm:tracking-[0.2em] uppercase rounded-[2px] template-shadow-text shadow-sm transition-all duration-200 hover:border-black hover:text-black hover:bg-slate-50 hover:shadow-[0px_8px_25px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  {ep.ctaToursBtn}
                </Link>
                <Link
                  href="/contact"
                  className="bg-white text-[#1e293b] border border-slate-300 px-6 sm:px-8 py-2.5 sm:py-3 text-xs md:text-sm font-semibold tracking-widest uppercase rounded-[2px] shadow-sm transition-all duration-200 hover:bg-white hover:border-slate-400 hover:shadow-[0px_6px_20px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  {ep.ctaConsultBtn}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
