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
        {/* Floating Left Arrow: pure white chevron with drop shadow */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label={isEn ? "Previous destinations" : "Điểm đến trước"}
          className="absolute -left-6 md:-left-12 top-1/2 z-20 -translate-y-1/2 text-white/90 hover:text-white transition drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] hover:scale-110 cursor-pointer"
        >
          <ChevronLeft className="size-12 md:size-16 stroke-[1.2]" />
        </button>

        {/* Floating Right Arrow: pure white chevron with drop shadow */}
        <button
          type="button"
          onClick={handleNext}
          aria-label={isEn ? "Next destinations" : "Điểm đến tiếp theo"}
          className="absolute -right-6 md:-right-12 top-1/2 z-20 -translate-y-1/2 text-white/90 hover:text-white transition drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] hover:scale-110 cursor-pointer"
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
                  <div className="relative h-[230px] md:h-[240px] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={d.image_url}
                      alt={displayName}
                      fill
                      unoptimized
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* White strip on bottom with script title */}
                  <div className="p-4 pt-3.5 pb-4 min-h-[92px] flex flex-col justify-center">
                    <h3 className="script-title text-2xl font-bold leading-none text-[#222] group-hover:text-amber-700 transition-colors truncate">
                      {displayName}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[11px] font-normal leading-relaxed text-[#777]">
                      {displaySummary}
                    </p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
