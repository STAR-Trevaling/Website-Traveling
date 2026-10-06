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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
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

  // Mobile swipe handlers
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
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  return (
    <div
      className="relative min-h-[700px] sm:min-h-[760px] md:min-h-[800px] lg:min-h-[820px] w-full overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images with smooth cinematic motion */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-0" : "opacity-0 -z-10"
            }`}
          >
            <div className={`relative h-full w-full ${isActive ? "animate-ken-burns" : ""}`}>
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                unoptimized
                className="object-cover"
              />
            </div>
          </div>
        );
      })}

      {/* Dark gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/70 pointer-events-none" />

      {/* Desktop Left/Right Navigation Arrows for Hero */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label={locale === "vi" ? "Slide trước" : "Previous slide"}
        className="hidden md:flex absolute left-4 md:left-8 top-1/2 z-20 -translate-y-1/2 size-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-slate-900 hover:shadow-[0px_8px_25px_rgba(0,0,0,0.35)] hover:scale-110 active:scale-95 cursor-pointer"
      >
        <ChevronLeft className="size-7" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label={locale === "vi" ? "Slide tiếp theo" : "Next slide"}
        className="hidden md:flex absolute right-4 md:right-8 top-1/2 z-20 -translate-y-1/2 size-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-slate-900 hover:shadow-[0px_8px_25px_rgba(0,0,0,0.35)] hover:scale-110 active:scale-95 cursor-pointer"
      >
        <ChevronRight className="size-7" />
      </button>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-[700px] sm:min-h-[760px] md:min-h-[800px] lg:min-h-[820px] w-full flex-col items-center justify-between pb-4 sm:pb-6 pt-20 sm:pt-24 text-white">
        {/* Main Center Content: Title, Subtitle, and Discovery Search immediately below text */}
        <div className="w-full max-w-5xl mx-auto px-4 text-center flex flex-col items-center my-auto pt-4 sm:pt-6">
          {/* Animated Hero Title on slide change */}
          <h1
            key={`hero-title-${currentSlide}`}
            className="display-title template-shadow-text leading-tight text-3xl sm:text-5xl md:text-6xl lg:text-[70px] animate-fade-in-up text-balance"
          >
            {t.hero.slides[currentSlide]?.title || slides[currentSlide].title}
          </h1>

          {/* Animated Hero Script Subtitle */}
          <p
            key={`hero-sub-${currentSlide}`}
            className="script-title mt-2 sm:mt-3 leading-tight text-white/95 [-webkit-text-stroke:.3px_#fff] text-xl sm:text-3xl md:text-4xl lg:text-5xl animate-fade-in-up animation-delay-100 text-balance"
          >
            {t.hero.slides[currentSlide]?.subtitle || slides[currentSlide].subtitle}
          </p>

          {/* Search Bar immediately below text in the middle of the page */}
          <div className="w-full max-w-[1060px] mt-6 sm:mt-8 md:mt-10 animate-fade-in-scale animation-delay-200">
            <DiscoverySearch />
          </div>
        </div>

        {/* Bottom Banner Content: View More link and Banner Slide Number Bar at the very bottom */}
        <div className="w-full flex flex-col items-center gap-2 sm:gap-3 mt-4 sm:mt-6 pb-2 sm:pb-3">
          {/* View More with curved downward arrow */}
          <a
            href="#popular-destinations"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("popular-destinations")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex flex-col items-center gap-0.5 text-white/90 hover:text-white transition-all cursor-pointer select-none"
            aria-label={locale === "en" ? "View more" : "Xem thêm"}
          >
            <span className="script-title text-base sm:text-2xl text-white tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] group-hover:scale-105 group-hover:text-amber-200 transition-all">
              {locale === "en" ? "view more" : "xem thêm"}
            </span>
            <svg
              width="20"
              height="26"
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

          {/* Thanh hiện số banner ở cuối banner */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 bg-black/40 backdrop-blur-md px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/20 shadow-xl">
            <span className="text-[11px] sm:text-xs font-bold text-white tracking-widest font-mono">
              {String(currentSlide + 1).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    idx === currentSlide
                      ? "w-7 sm:w-8 bg-[#eab308] shadow-[0_0_8px_rgba(234,179,8,0.8)]"
                      : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] sm:text-xs font-semibold text-white/60 tracking-widest font-mono">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
