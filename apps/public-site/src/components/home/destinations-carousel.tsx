"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Destination } from "@/lib/types";
import { VIETNAM_DESTINATIONS_PAGES } from "@/data/seed";
import { useLanguage } from "@/lib/i18n/context";

interface DestinationsCarouselProps {
  initialDestinations?: Destination[];
}

export function DestinationsCarousel({ initialDestinations }: DestinationsCarouselProps) {
  const { locale } = useLanguage();
  const isEn = locale === "en";

  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Filter out any invalid test items and ensure valid image presence
  const validDestinations = (initialDestinations || []).filter(
    (d) => !d.slug.startsWith("test-") && !d.name.includes("E2E") && Boolean(d.image_url?.trim())
  );

  const pages: Destination[][] =
    validDestinations.length > 0
      ? Array.from(
          { length: Math.ceil(validDestinations.length / 4) },
          (_, i) => validDestinations.slice(i * 4, i * 4 + 4)
        )
      : VIETNAM_DESTINATIONS_PAGES;

  const totalPages = pages.length;
  const currentItems = pages[currentPage] || pages[0] || [];

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
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  return (
    <div
      className="relative w-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Cards Grid with Navigation Buttons */}
      <div className="relative">
        {/* Desktop Floating Left Arrow */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label={isEn ? "Previous destinations" : "Điểm đến trước"}
          className="hidden md:flex absolute -left-12 lg:-left-16 top-1/2 z-20 -translate-y-1/2 text-slate-800 hover:text-[#0098a2] transition drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="size-12 md:size-16 stroke-[1.2]" />
        </button>

        {/* Desktop Floating Right Arrow */}
        <button
          type="button"
          onClick={handleNext}
          aria-label={isEn ? "Next destinations" : "Điểm đến tiếp theo"}
          className="hidden md:flex absolute -right-12 lg:-right-16 top-1/2 z-20 -translate-y-1/2 text-slate-800 hover:text-[#0098a2] transition drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="size-12 md:size-16 stroke-[1.2]" />
        </button>

        {/* 4 Cards Grid with staggered entry animation */}
        <div
          key={`dest-page-${currentPage}`}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-scale"
        >
          {currentItems.map((d, idx) => {
            const displayName = isEn && d.name_en ? d.name_en : d.name;
            const displaySummary = isEn && d.summary_en ? d.summary_en : d.summary;
            const delayClass = idx === 0 ? "" : idx === 1 ? "animation-delay-100" : idx === 2 ? "animation-delay-200" : "animation-delay-300";
            const imageUrl = d.image_url?.trim() || "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80";

            return (
              <Link
                href={`/destinations/${d.slug}`}
                key={d.id}
                className={`group block w-full transform-gpu ${delayClass}`}
                title={displayName}
              >
                <article className="overflow-hidden bg-white shadow-md travel-card-lift rounded-[2px] h-full flex flex-col justify-between border border-slate-100/80">
                  <div>
                    <div className="relative h-[220px] sm:h-[230px] md:h-[240px] w-full overflow-hidden bg-slate-100">
                      <Image
                        src={imageUrl}
                        alt={displayName}
                        fill
                        unoptimized
                        className="object-cover travel-img-zoom"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>

                    <div className="p-4 sm:p-5 pb-5 sm:pb-6">
                      <h3 className="script-title text-2xl sm:text-3xl font-bold text-[#1e293b] group-hover:text-[#0098a2] transition-colors leading-tight">
                        {displayName}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs sm:text-sm font-light text-[#555] leading-relaxed">
                        {displaySummary}
                      </p>
                    </div>
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
                  idx === currentPage ? "w-5 bg-[#da251d]" : "w-1.5 bg-slate-300"
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
