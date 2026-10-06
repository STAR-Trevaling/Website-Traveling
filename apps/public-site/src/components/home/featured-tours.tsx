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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  // Mobile swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe && hasMultiplePages) handleNext();
    if (isRightSwipe && hasMultiplePages) handlePrev();
  };

  const currentTours = tours.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-16 py-10 sm:py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-6 sm:mb-10 md:mb-12">
          <h2 className="script-title text-3xl sm:text-5xl md:text-6xl text-[#1e293b]">
            {t.featured.heading}
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-[#64748b] font-light max-w-xl mx-auto">
            {t.featured.subheading}
          </p>
        </div>

        <div
          className="relative w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Desktop Floating Arrows */}
          {hasMultiplePages && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label={isEn ? "Previous tours" : "Tour trước"}
                className="hidden md:flex absolute -left-12 lg:-left-16 top-1/2 z-20 -translate-y-1/2 text-slate-800 hover:text-[#0098a2] transition drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:scale-110 active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="size-12 md:size-16 stroke-[1.2]" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label={isEn ? "Next tours" : "Tour tiếp theo"}
                className="hidden md:flex absolute -right-12 lg:-right-16 top-1/2 z-20 -translate-y-1/2 text-slate-800 hover:text-[#0098a2] transition drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:scale-110 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="size-12 md:size-16 stroke-[1.2]" />
              </button>
            </>
          )}

          {/* 4 Cards Grid with smooth page transition */}
          <div
            key={`tours-page-${currentPage}`}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-scale"
          >
            {currentTours.map((tour) => {
              const fullDest = isEn && tour.destination_en ? tour.destination_en : tour.destination;
              const shortDest = fullDest.split(",")[0].trim();
              const displayTitle = isEn && tour.title_en ? tour.title_en : tour.title;
              const displayDuration = isEn && tour.duration_en ? tour.duration_en : tour.duration;

              return (
                <Link
                  key={tour.id}
                  href={`/tours/${tour.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[2px] bg-white shadow-md travel-card-lift border border-slate-100"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={tour.image}
                      alt={displayTitle}
                      fill
                      unoptimized
                      className="object-cover travel-img-zoom"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-black/65 text-white text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-[2px] backdrop-blur-sm border border-white/20">
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
                            {isEn ? `${tour.price.toLocaleString("en-US")} VND` : `${tour.price.toLocaleString("vi-VN")}đ`}
                          </span>
                        </div>
                      </div>
                      <p className="mt-1 text-[11px] font-light text-[#64748b] leading-snug line-clamp-2 min-h-[30px]">
                        {displayTitle}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#94a3b8]">
                      <span className="font-light">{t.featured.pricePerPerson}</span>
                      <span className="text-black font-semibold group-hover:underline transition-colors">
                        {isEn ? "View tour" : "Xem tour"}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Mobile Navigation Controls if has multiple pages */}
          {hasMultiplePages && (
            <div className="flex md:hidden items-center justify-between mt-6 px-1">
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-700 bg-white/95 rounded-[2px] border border-slate-200 shadow-sm active:scale-95"
                aria-label={isEn ? "Previous tours" : "Tour trước"}
              >
                <ChevronLeft className="size-4" />
                <span>{isEn ? "Previous" : "Trước"}</span>
              </button>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentPage(idx)}
                    aria-label={`Page ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentPage ? "w-5 bg-[#0098a2]" : "w-1.5 bg-slate-300"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-700 bg-white/95 rounded-[2px] border border-slate-200 shadow-sm active:scale-95"
                aria-label={isEn ? "Next tours" : "Tour sau"}
              >
                <span>{isEn ? "Next" : "Sau"}</span>
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <Link
            href="/tours"
            className="inline-block border border-slate-700/70 bg-white px-7 sm:px-8 py-3 text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#1e293b] rounded-[2px] template-shadow-text shadow-sm transition-all duration-200 hover:border-black hover:text-black hover:bg-slate-50 hover:shadow-[0px_8px_25px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            {t.featured.viewAllBtn}
          </Link>
        </div>
      </div>
    </section>
  );
}
