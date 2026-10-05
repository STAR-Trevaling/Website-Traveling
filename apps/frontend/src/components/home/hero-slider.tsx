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
      <div className="relative z-10 flex h-full flex-col items-center justify-between pb-16 sm:pb-20 md:pb-24 lg:pb-28 pt-20 sm:pt-24 text-white">
        <div className="mt-8 sm:mt-12 md:mt-14 text-center px-4 max-w-5xl">
          <h1 className="display-title template-shadow-text text-5xl leading-tight sm:text-6xl md:text-7xl lg:text-[76px] transition-all duration-700">
            {t.hero.slides[currentSlide]?.title || slides[currentSlide].title}
          </h1>

          <p className="script-title mt-4 text-3xl leading-tight sm:text-4xl md:text-5xl text-white/95 [-webkit-text-stroke:.4px_#fff]">
            {t.hero.slides[currentSlide]?.subtitle || slides[currentSlide].subtitle}
          </p>
        </div>

        {/* Search Bar shifted up with safe clearance from bottom edge & PC taskbar */}
        <div className="w-full px-4 mb-4 sm:mb-6 md:mb-8">
          <div className="mx-auto max-w-[1060px]">
            <DiscoverySearch />
          </div>
        </div>
      </div>
    </div>
  );
}
