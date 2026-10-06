import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { PlaceCard } from "@/components/shared/place-card";
import { publicApi, safe } from "@/lib/api";
import { VIETNAM_IMAGES } from "@/lib/assets";
import { ALL_VIETNAM_DESTINATIONS } from "@/lib/destinations-data";
import { VIETNAM_EXPERIENCES } from "@/lib/experiences-data";
import { VIETNAM_TOURS } from "@/lib/tours-data";
import type { Destination } from "@/lib/types";
import { DICTIONARY } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/types";

interface DestinationDetailProps {
  params: Promise<{ slug: string }>;
}

export default async function DestinationDetail({ params }: DestinationDetailProps) {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";
  const locale: Locale = isEn ? "en" : "vi";
  const dict = DICTIONARY[locale];
  const dd = dict.destinationDetailPage;

  const { slug } = await params;

  // Find fallback from curated Vietnam destinations if backend is not seeded
  const fallback = ALL_VIETNAM_DESTINATIONS.find((d) => d.slug === slug);

  let destination: Destination | undefined;
  try {
    destination = await publicApi.destination(slug);
  } catch {
    destination = fallback;
  }

  if (!destination) {
    notFound();
  }

  const backendPlaces = await safe(publicApi.places(`?destination__slug=${slug}`), []);

  // Filter experiences matching destination
  const matchedExperiences =
    backendPlaces.length > 0
      ? backendPlaces
      : VIETNAM_EXPERIENCES.filter(
          (e) =>
            e.destination?.slug === slug ||
            e.slug.includes(slug) ||
            slug.includes(e.destination?.slug || "")
        );

  // Filter tours matching destination
  const matchedTours = VIETNAM_TOURS.filter(
    (t) =>
      t.slug.includes(slug) ||
      (t.aliases && t.aliases.some((a) => a.includes(slug))) ||
      t.destination.toLowerCase().includes(slug.toLowerCase().replace("-", " "))
  );

  const displayName = isEn && destination.name_en ? destination.name_en : destination.name;
  const displayCountry =
    isEn && destination.country_en
      ? destination.country_en
      : destination.country || (isEn ? "Vietnam" : "Việt Nam");
  const displaySummary =
    isEn && destination.summary_en ? destination.summary_en : destination.summary;
  const displayDesc =
    isEn && destination.description_en ? destination.description_en : destination.description;

  return (
    <>
      <section className="relative min-h-[620px] text-white">
        <Image
          src={destination.hero_image_url || destination.image_url || VIETNAM_IMAGES.hero}
          alt={displayName}
          fill
          priority
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/45" />
        <SiteHeader overlay />

        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-end px-6 pb-16 md:px-12">
          <div className="max-w-4xl">
            <p className="text-xs sm:text-sm uppercase tracking-[.25em] text-white/90 font-bold">
              {displayCountry}
            </p>
            <h1 className="display-title mt-2 text-5xl sm:text-7xl md:text-8xl font-black text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
              {displayName}
            </h1>
            <p className="mt-4 max-w-3xl text-base sm:text-lg md:text-xl font-normal leading-relaxed text-white/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
              {displaySummary}
            </p>
          </div>
        </div>
      </section>

      <main className="template-page-bg min-h-screen text-[#282828] px-6 py-20 md:px-12 lg:px-16 overflow-x-hidden">
        <div className="mx-auto max-w-7xl space-y-20">
          {/* DESTINATION OVERVIEW CARD */}
          <div className="bg-white/90 p-8 md:p-12 rounded-[2px] shadow-sm border border-slate-100 max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-900">
              {dd.overviewBadge}
            </span>
            <h2 className="script-title mt-2 text-4xl md:text-5xl text-[#1e293b]">
              {dd.overviewHeading}
            </h2>
            <p className="mt-4 text-base md:text-lg font-light leading-relaxed text-[#4b5563]">
              {displayDesc}
            </p>
          </div>

          {/* FEATURED TOURS FOR THIS DESTINATION */}
          {matchedTours.length > 0 && (
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-900">
                {dd.featuredToursBadge}
              </span>
              <h2 className="script-title mt-1 text-4xl md:text-5xl text-[#1e293b]">
                {dd.featuredToursHeading} {displayName}
              </h2>
              <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {matchedTours.map((tour) => {
                  const tTitle = isEn && tour.title_en ? tour.title_en : tour.title;
                  const tDuration = isEn && tour.duration_en ? tour.duration_en : tour.duration;
                  const tOverview = isEn && tour.overview_en ? tour.overview_en : tour.overview;

                  return (
                    <Link
                      key={tour.id}
                      href={`/tours/${tour.slug}`}
                      className="group bg-white rounded-[2px] overflow-hidden shadow-sm border border-slate-100 transition hover:shadow-md hover:-translate-y-1 flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                          <Image
                            src={tour.image}
                            alt={tTitle}
                            fill
                            unoptimized
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-3 left-3 bg-[#1e293b]/85 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white rounded-[2px]">
                            {tDuration}
                          </div>
                        </div>

                        <div className="p-5">
                          <h3 className="script-title text-2xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-tight">
                            {tTitle}
                          </h3>
                          <p className="mt-2 text-xs md:text-sm font-light text-slate-600 line-clamp-2 leading-relaxed">
                            {tOverview}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] text-slate-400 font-light block">
                            {dict.common.fromPrice}
                          </span>
                          <strong className="text-sm font-black text-slate-900">
                            {isEn
                              ? `${tour.price.toLocaleString("en-US")} VND`
                              : `${tour.price.toLocaleString("vi-VN")}đ`}
                          </strong>
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 group-hover:text-amber-700 flex items-center gap-1">
                          {dict.common.details} <ArrowRight className="size-3" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* EXPERIENCES AT THIS DESTINATION */}
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-900">
              {dd.experiencesBadge}
            </span>
            <h2 className="script-title mt-1 text-4xl md:text-5xl text-[#1e293b]">
              {dd.experiencesHeading} {displayName}
            </h2>

            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {matchedExperiences.length > 0 ? (
                matchedExperiences.map((p) => <PlaceCard key={p.id} place={p} />)
              ) : (
                <div className="col-span-full rounded-[2px] bg-white/70 p-12 text-center shadow-sm border border-slate-100">
                  <p className="text-base text-slate-600 font-light">{dd.noExperiences}</p>
                </div>
              )}
            </div>
          </div>

          {/* CALL TO ACTION */}
          <section className="w-full bg-white/85 backdrop-blur-md py-16 text-center rounded-[2px] border border-white/60 shadow-sm">
            <div className="mx-auto max-w-3xl px-6">
              <h2 className="script-title text-4xl sm:text-5xl text-[#1e293b]">
                {dict.destinationsPage.ctaHeading}
              </h2>
              <p className="mt-3 text-sm md:text-base text-[#4b5563] font-light max-w-xl mx-auto leading-relaxed">
                {dict.destinationsPage.ctaDesc}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/experiences"
                  className="border border-slate-700/70 bg-white text-[#1e293b] px-8 py-3 text-xs md:text-sm font-bold tracking-[0.2em] uppercase rounded-[2px] template-shadow-text shadow-sm transition-all duration-200 hover:border-black hover:text-black hover:bg-slate-50 hover:shadow-[0px_8px_25px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  {dict.destinationsPage.ctaExpBtn}
                </Link>
                <Link
                  href="/tours"
                  className="bg-white text-[#1e293b] border border-slate-300 px-8 py-3 text-xs md:text-sm font-semibold tracking-widest uppercase rounded-[2px] shadow-sm transition-all duration-200 hover:bg-white hover:border-slate-400 hover:shadow-[0px_6px_20px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  {dict.destinationsPage.ctaToursBtn}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
