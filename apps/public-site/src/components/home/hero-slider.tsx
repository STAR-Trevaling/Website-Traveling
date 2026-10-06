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
      className="relative min-h-[760px] sm:min-h-[820px] md:min-h-[860px] lg:min-h-[900px] w-full overflow-hidden select-none"
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

      {/* Hero Content (Positioned with generous breathing room matching template) */}
      <div className="relative z-10 flex min-h-[760px] sm:min-h-[820px] md:min-h-[860px] lg:min-h-[900px] w-full flex-col items-center justify-between pb-6 sm:pb-8 pt-28 sm:pt-32 md:pt-36 lg:pt-40 text-white">
        {/* Main Center Content: Title, Subtitle, with Discovery Search below */}
        <div className="w-full max-w-5xl mx-auto px-4 text-center flex flex-col items-center my-auto">
          {/* Animated Hero Title on slide change */}
          <h1
            key={`hero-title-${currentSlide}`}
            className="display-title template-shadow-text leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[72px] animate-fade-in-up text-balance drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)]"
          >
            {t.hero.slides[currentSlide]?.title || slides[currentSlide].title}
          </h1>

          {/* Animated Hero Script Subtitle */}
          <p
            key={`hero-sub-${currentSlide}`}
            className="script-title mt-2 sm:mt-3 leading-normal text-white/95 [-webkit-text-stroke:.3px_#fff] text-2xl sm:text-3xl md:text-4xl lg:text-5xl animate-fade-in-up animation-delay-100 text-balance drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
          >
            {t.hero.slides[currentSlide]?.subtitle || slides[currentSlide].subtitle}
          </p>

          {/* Search Bar immediately below text in the middle of the page */}
          <div className="w-full max-w-[1100px] mt-8 sm:mt-10 md:mt-12 lg:mt-14 animate-fade-in-scale animation-delay-200">
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

          {/* Thanh hiện số banner ở cuối banner (Màu trắng bóng mờ sang trọng) */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 bg-white/85 hover:bg-white/95 backdrop-blur-xl px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.25),0_2px_8px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.95)] transition-all duration-300">
            <span className="text-[11px] sm:text-xs font-bold text-slate-900 tracking-widest font-mono">
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
                      ? "w-7 sm:w-8 bg-slate-700 shadow-[0_1px_4px_rgba(15,23,42,0.35)]"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 tracking-widest font-mono">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
