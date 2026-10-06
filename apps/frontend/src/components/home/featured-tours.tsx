"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VIETNAM_TOURS, type TourItem } from "@/lib/tours-data";
import { useLanguage } from "@/lib/i18n/context";

interface FeaturedToursProps {
  initialTours?: TourItem[];
}

export function FeaturedTours({ initialTours }: FeaturedToursProps) {
  const { t, locale } = useLanguage();
  const isEn = locale === "en";

  const tours = initialTours || VIETNAM_TOURS;
  const itemsPerPage = 4;
  const totalPages = Math.ceil(tours.length / itemsPerPage);
  const hasMultiplePages = tours.length > itemsPerPage;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const currentTours = tours.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="w-full px-6 py-16 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="script-title text-5xl md:text-6xl text-[#1e293b]">
            {t.featured.heading}
          </h2>
          <p className="mt-2 text-sm md:text-base text-[#64748b] font-light max-w-xl mx-auto">
            {t.featured.subheading}
          </p>
        </div>

        <div className="relative w-full">
          {/* Floating navigation chevrons matching DestinationsCarousel if > 4 cards */}
          {hasMultiplePages && (
            <>
              {/* Floating Left Arrow */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label={isEn ? "Previous tours" : "Tour trước"}
                className="absolute -left-6 md:-left-12 top-1/2 z-20 -translate-y-1/2 text-white/90 hover:text-white transition drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] hover:scale-110 cursor-pointer"
              >
                <ChevronLeft className="size-12 md:size-16 stroke-[1.2]" />
              </button>

              {/* Floating Right Arrow */}
              <button
                type="button"
                onClick={handleNext}
                aria-label={isEn ? "Next tours" : "Tour tiếp theo"}
                className="absolute -right-6 md:-right-12 top-1/2 z-20 -translate-y-1/2 text-white/90 hover:text-white transition drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] hover:scale-110 cursor-pointer"
              >
                <ChevronRight className="size-12 md:size-16 stroke-[1.2]" />
              </button>
            </>
          )}

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-300">
            {currentTours.map((tour) => {
              const fullDest = isEn && tour.destination_en ? tour.destination_en : tour.destination;
              const shortDest = fullDest.split(",")[0].trim();
              const displayTitle = isEn && tour.title_en ? tour.title_en : tour.title;
              const displayDuration = isEn && tour.duration_en ? tour.duration_en : tour.duration;

              return (
                <Link
                  key={tour.id}
                  href={`/tours/${tour.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[2px] bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={tour.image}
                      alt={displayTitle}
                      fill
                      unoptimized
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-black/50 text-white text-[11px] font-medium px-2 py-0.5 rounded-[2px] backdrop-blur-sm">
                      {displayDuration}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-1 bg-white">
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="script-title text-xl sm:text-2xl font-bold text-[#1e293b] leading-tight truncate group-hover:text-amber-700 transition-colors">
                          {shortDest}
                        </h3>
                        <div className="text-right shrink-0">
                          <span className="script-title text-xl font-bold text-[#1e293b] leading-tight block">
                            {tour.price.toLocaleString("vi-VN")}đ
                          </span>
                        </div>
                      </div>
                      <p className="mt-1.5 text-[11px] font-light text-[#64748b] leading-snug line-clamp-2 min-h-[30px]">
                        {displayTitle}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#94a3b8]">
                      <span className="font-light">{t.featured.pricePerPerson}</span>
                      <span className="text-[#0098a2] font-semibold group-hover:underline">
                        {isEn ? "View tour →" : "Xem tour →"}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/tours"
            className="inline-block border border-slate-700/70 bg-white px-8 py-3 text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#1e293b] rounded-[2px] template-shadow-text shadow-sm transition-all duration-200 hover:border-black hover:text-black hover:bg-slate-50 hover:shadow-[0px_8px_25px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            {t.featured.viewAllBtn}
          </Link>
        </div>
      </div>
    </section>
  );
}
