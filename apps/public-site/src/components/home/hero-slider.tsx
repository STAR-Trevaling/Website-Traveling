"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DiscoverySearch } from "./discovery-search";
import { VIETNAM_IMAGES } from "@/lib/assets";
import { useLanguage } from "@/lib/i18n/context";

export function HeroSlider() {
  const { t, locale } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = VIETNAM_IMAGES.heroSlides;

  // Auto-advance slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-[860px] sm:h-[800px] md:h-[720px] lg:h-[740px] w-full overflow-hidden">
      {/* Background Images with smooth fade */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          style={{ transitionProperty: "opacity, transform" }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            unoptimized
            className="object-cover"
          />
        </div>
      ))}

      {/* Dark gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/65" />

      {/* Left/Right Navigation Arrows for Hero */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label={locale === "vi" ? "Slide trước" : "Previous slide"}
        className="absolute left-4 md:left-8 top-1/2 z-20 -translate-y-1/2 flex size-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-slate-900 hover:shadow-[0px_8px_25px_rgba(0,0,0,0.35)] hover:scale-105 active:scale-95 cursor-pointer"
      >
        <ChevronLeft className="size-7" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label={locale === "vi" ? "Slide tiếp theo" : "Next slide"}
        className="absolute right-4 md:right-8 top-1/2 z-20 -translate-y-1/2 flex size-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-slate-900 hover:shadow-[0px_8px_25px_rgba(0,0,0,0.35)] hover:scale-105 active:scale-95 cursor-pointer"
      >
        <ChevronRight className="size-7" />
      </button>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-between pb-6 sm:pb-8 md:pb-10 pt-20 sm:pt-24 text-white">
        <div className="mt-8 sm:mt-12 md:mt-14 text-center px-4 max-w-5xl mx-auto">
          <h1 className="display-title template-shadow-text leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-[72px] transition-all duration-700 text-balance">
            {t.hero.slides[currentSlide]?.title || slides[currentSlide].title}
          </h1>

          <p className="script-title mt-4 leading-tight text-white/95 [-webkit-text-stroke:.4px_#fff] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-balance">
            {t.hero.slides[currentSlide]?.subtitle || slides[currentSlide].subtitle}
          </p>
        </div>

        {/* Search Bar & View More Indicator */}
        <div className="w-full flex flex-col items-center px-4 mb-2 sm:mb-4">
          <div className="w-full max-w-[1060px]">
            <DiscoverySearch />
          </div>

          {/* View More with curved downward arrow */}
          <a
            href="#popular-destinations"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("popular-destinations")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group mt-3 sm:mt-4 flex flex-col items-center gap-0.5 text-white/95 hover:text-white transition-all cursor-pointer select-none"
            aria-label="View more"
          >
            <span className="script-title text-2xl sm:text-3xl md:text-4xl text-white tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] group-hover:scale-105 group-hover:text-amber-200 transition-all">
              view more
            </span>
            <svg
              width="34"
              height="42"
              viewBox="0 0 34 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] animate-bounce group-hover:text-amber-200 transition-colors"
              aria-hidden="true"
            >
              <path
                d="M14 2 C 27 7, 30 22, 17 34"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M11 27 L 17 35 L 23 28"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
