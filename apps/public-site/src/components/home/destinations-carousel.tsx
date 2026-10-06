"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Destination } from "@/lib/types";
import { VIETNAM_DESTINATIONS_PAGES } from "@/lib/destinations-data";
import { useLanguage } from "@/lib/i18n/context";

interface DestinationsCarouselProps {
  initialDestinations?: Destination[];
}

export function DestinationsCarousel({ initialDestinations }: DestinationsCarouselProps) {
  const { locale } = useLanguage();
  const isEn = locale === "en";

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = VIETNAM_DESTINATIONS_PAGES.length;

  // Current page items
  const currentItems = VIETNAM_DESTINATIONS_PAGES[currentPage];

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  return (
    <div className="relative w-full">
      {/* Cards Grid with Navigation Buttons */}
      <div className="relative">
        {/* Desktop Floating Left Arrow (Hidden on mobile to eliminate overflow bugs) */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label={isEn ? "Previous destinations" : "Điểm đến trước"}
          className="hidden md:flex absolute -left-12 lg:-left-16 top-1/2 z-20 -translate-y-1/2 text-white/90 hover:text-white transition drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] hover:scale-110 cursor-pointer"
        >
          <ChevronLeft className="size-12 md:size-16 stroke-[1.2]" />
        </button>

        {/* Desktop Floating Right Arrow (Hidden on mobile to eliminate overflow bugs) */}
        <button
          type="button"
          onClick={handleNext}
          aria-label={isEn ? "Next destinations" : "Điểm đến tiếp theo"}
          className="hidden md:flex absolute -right-12 lg:-right-16 top-1/2 z-20 -translate-y-1/2 text-white/90 hover:text-white transition drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] hover:scale-110 cursor-pointer"
        >
          <ChevronRight className="size-12 md:size-16 stroke-[1.2]" />
        </button>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 transition-opacity duration-300">
          {currentItems.map((d) => {
            const displayName = isEn && d.name_en ? d.name_en : d.name;
            const displaySummary = isEn && d.summary_en ? d.summary_en : d.summary;

            return (
              <Link
                href={`/destinations/${d.slug}`}
                key={d.id}
                className="group block w-full"
                title={displayName}
              >
                <article className="overflow-hidden bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl rounded-[2px]">
                  <div className="relative h-[220px] sm:h-[230px] md:h-[240px] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={d.image_url}
                      alt={displayName}
                      fill
                      unoptimized
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4 sm:p-5">
                    <h3 className="display-title text-xl sm:text-2xl font-bold tracking-wider text-[#1e293b] uppercase">
                      {displayName}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs sm:text-sm font-light text-[#555] leading-relaxed">
                      {displaySummary}
                    </p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Mobile Navigation Controls: Clean Buttons & Dots */}
        <div className="flex md:hidden items-center justify-between mt-6 px-1">
          <button
            type="button"
            onClick={handlePrev}
            className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-700 bg-white/95 rounded-[2px] border border-slate-200 shadow-sm active:scale-95"
            aria-label={isEn ? "Previous" : "Trước"}
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
            aria-label={isEn ? "Next" : "Sau"}
          >
            <span>{isEn ? "Next" : "Sau"}</span>
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
