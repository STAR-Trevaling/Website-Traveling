"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { DiscoverySearch } from "./discovery-search";
import { VIETNAM_IMAGES } from "@/lib/assets";
import { useLanguage } from "@/lib/i18n/context";

export function HeroSlider() {
  const { t, locale } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const slides = VIETNAM_IMAGES.heroSlides;

  // Auto-advance slides every 5 seconds, pausing on hover or interaction
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

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
      className="relative min-h-[680px] sm:min-h-[720px] md:min-h-[750px] lg:min-h-[780px] w-full overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Background Images with smooth cinematic motion */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out transform-gpu ${
              isActive ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
            }`}
          >
            <div className={`relative h-full w-full transform-gpu ${isActive ? "animate-ken-burns" : ""}`}>
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

      {/* Hero Content (Positioned with generous breathing room and optical centering) */}
      <div className="relative z-10 flex min-h-[680px] sm:min-h-[720px] md:min-h-[750px] lg:min-h-[780px] w-full flex-col items-center justify-center px-4 pt-24 sm:pt-26 md:pt-28 pb-12 sm:pb-16 text-white">
        {/* Main Center Content: Title, Subtitle, with Discovery Search below */}
        <div className="w-full max-w-5xl mx-auto text-center flex flex-col items-center">
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
          <div className="w-full max-w-[1100px] mt-6 sm:mt-8 md:mt-9 lg:mt-10 animate-fade-in-scale animation-delay-200">
            <DiscoverySearch />
          </div>
        </div>
      </div>
    </div>
  );
}
