"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Star, CheckCircle2, Bus, Hotel, ArrowRight } from "lucide-react";
import { VIETNAM_TOURS } from "@/data/seed";
import { useLanguage } from "@/lib/i18n/context";

export function ToursCatalog() {
  const { t, isEnglish } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const filteredTours = useMemo(() => {
    let result = [...VIETNAM_TOURS];

    if (selectedRegion !== "all") {
      result = result.filter((t) => t.region === selectedRegion);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.title_en && t.title_en.toLowerCase().includes(q)) ||
          t.destination.toLowerCase().includes(q) ||
          (t.destination_en && t.destination_en.toLowerCase().includes(q)) ||
          t.highlights.some((h) => h.toLowerCase().includes(q))
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedRegion, searchQuery, sortBy]);

  const regionTabs = [
    { key: "all", label: t.toursPage.regions.all },
    { key: "north", label: t.toursPage.regions.north },
    { key: "central", label: t.toursPage.regions.central },
    { key: "south", label: t.toursPage.regions.south },
  ];

  return (
    <div className="w-full">
      {/* Search & Filter Bar */}
      <div className="mb-8 sm:mb-12 rounded-[2px] bg-white/90 p-4 sm:p-6 md:p-8 shadow-sm border border-slate-100">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-[1fr_auto_auto]">
          {/* Search Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 sm:mb-2">
              {t.toursPage.searchLabel}
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.toursPage.searchPlaceholder}
              className="w-full rounded-[2px] border border-slate-200 bg-slate-50 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm focus:border-[#0098a2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0098a2]"
            />
          </div>

          {/* Region Tabs */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 sm:mb-2">
              {t.toursPage.regionLabel}
            </label>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 sm:gap-2">
              {regionTabs.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setSelectedRegion(r.key)}
                  className={`rounded-[2px] px-3 sm:px-4 py-2.5 sm:py-3 text-xs md:text-sm font-semibold transition-all duration-200 uppercase tracking-wider text-center cursor-pointer ${
                    selectedRegion === r.key
                      ? "bg-[#0098a2] text-white shadow-[0px_4px_14px_rgba(0,152,162,0.35)]"
                      : "bg-slate-100 text-slate-600 hover:bg-white hover:shadow-[0px_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 sm:mb-2">
              {t.toursPage.sortLabel}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full md:w-auto h-[42px] sm:h-[46px] rounded-[2px] border border-slate-200 bg-white px-3 sm:px-4 text-xs md:text-sm font-medium text-slate-700 focus:border-[#0098a2] focus:outline-none"
            >
              <option value="featured">{t.toursPage.sortOptions.featured}</option>
              <option value="price-asc">{t.toursPage.sortOptions.priceAsc}</option>
              <option value="price-desc">{t.toursPage.sortOptions.priceDesc}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 sm:mb-6 flex items-center justify-between">
        <p className="text-xs md:text-sm font-medium text-slate-600">
          {t.toursPage.resultsFoundText.replace("{count}", String(filteredTours.length))}
        </p>
      </div>

      {/* Tour Cards Grid */}
      <div
        key={`${selectedRegion}-${sortBy}`}
        className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 animate-fade-in-scale"
      >
        {filteredTours.map((tour) => {
          const displayTitle = isEnglish && tour.title_en ? tour.title_en : tour.title;
          const displayDuration = isEnglish && tour.duration_en ? tour.duration_en : tour.duration;
          const displayDestination =
            isEnglish && tour.destination_en ? tour.destination_en : tour.destination;

          return (
            <article
              key={tour.id}
              className="group travel-card-lift flex flex-col justify-between overflow-hidden rounded-[2px] bg-white border border-slate-100"
            >
              <div>
                {/* Photo & Badge */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={tour.image}
                    alt={displayTitle}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                  {/* Duration Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-[2px] bg-[#1e293b]/85 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md uppercase tracking-wider shadow-sm">
                    <Clock className="size-3 text-white" />
                    <span>{displayDuration}</span>
                  </div>

                  {/* Location Badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs font-medium text-white/95 drop-shadow-sm">
                    <MapPin className="size-3.5 text-white" />
                    <span>{displayDestination}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="size-3.5 fill-amber-400" />
                      <span>{tour.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-slate-400 font-light">
                      ({tour.reviewCount} {t.common.reviews})
                    </span>
                  </div>

                  <h3 className="script-title mt-2 text-2xl font-bold leading-tight text-slate-900 group-hover:text-[#0098a2] transition-colors line-clamp-2">
                    {displayTitle}
                  </h3>

                  {/* Inclusions */}
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-500 font-light">
                    <span className="flex items-center gap-1 rounded-[2px] bg-slate-100 px-2 py-0.5">
                      <Bus className="size-3 text-slate-700" />
                      {tour.transport}
                    </span>
                    <span className="flex items-center gap-1 rounded-[2px] bg-slate-100 px-2 py-0.5">
                      <Hotel className="size-3 text-slate-700" />
                      {tour.hotel}
                    </span>
                  </div>

                  {/* Highlights List */}
                  <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600 font-light">
                    {tour.highlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="size-3.5 shrink-0 text-slate-800 mt-0.5" />
                        <span className="line-clamp-1">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & Action Footer */}
              <div className="border-t border-slate-100 bg-slate-50/60 p-5 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-light">
                    {t.toursPage.priceFrom}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-slate-900">
                      {isEnglish
                        ? `${tour.price.toLocaleString("en-US")} VND`
                        : `${tour.price.toLocaleString("vi-VN")}đ`}
                    </span>
                    {tour.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        {isEnglish
                          ? `${tour.originalPrice.toLocaleString("en-US")} VND`
                          : `${tour.originalPrice.toLocaleString("vi-VN")}đ`}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/tours/${tour.slug}`}
                    className="rounded-[2px] bg-[#0098a2] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:bg-[#008f99] hover:shadow-[0px_6px_20px_rgba(0,152,162,0.35)] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1"
                  >
                    <span>{t.toursPage.viewDetails}</span>
                    <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filteredTours.length === 0 && (
        <div className="py-20 text-center rounded-[2px] bg-white p-8 border border-slate-100">
          <p className="text-base text-slate-500 font-light">{t.toursPage.noResults}</p>
        </div>
      )}
    </div>
  );
}
