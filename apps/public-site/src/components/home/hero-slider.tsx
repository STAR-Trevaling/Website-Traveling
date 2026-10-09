"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { DiscoverySearch } from "./discovery-search";
import { VIETNAM_IMAGES } from "@/lib/assets";
import { useLanguage } from "@/lib/i18n/context";

export function HeroSlider() {
  const { t, isEnglish } = useLanguage();
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

  const scrollToDestinations = () => {
    const el = document.getElementById("popular-destinations");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" });
    }
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
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        );
      })}

      {/* Subtle modern cinematic overlay keeping landmark photos bright, sunny and vibrant while text remains crystal-clear */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/55 pointer-events-none" />

      {/* Hero Content (Positioned with generous breathing room and optical centering) */}
      <div className="relative z-10 flex min-h-[680px] sm:min-h-[720px] md:min-h-[750px] lg:min-h-[780px] w-full flex-col items-center justify-center px-4 pt-16 sm:pt-18 md:pt-20 pb-24 sm:pb-28 md:pb-32 text-white">
        {/* Main Center Content: Title, Subtitle, with Discovery Search below */}
        <div className="w-full max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Animated Hero Text Block shifted gently upward for perfect visual balance */}
          <div className="flex flex-col items-center -translate-y-2 sm:-translate-y-4 md:-translate-y-6">
            {/* Animated Hero Title on slide change */}
            <h1
              key={`hero-title-${currentSlide}`}
              className="display-title template-shadow-text leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[72px] animate-fade-in-up text-balance drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)]"
            >
              {t.hero.slides[currentSlide]?.title || slides[currentSlide]?.title}
            </h1>

            {/* Animated Hero Script Subtitle */}
            <p
              key={`hero-sub-${currentSlide}`}
              className="script-title mt-1.5 sm:mt-2.5 leading-normal text-white/95 [-webkit-text-stroke:.3px_#fff] text-2xl sm:text-3xl md:text-4xl lg:text-5xl animate-fade-in-up animation-delay-100 text-balance drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
            >
              {t.hero.slides[currentSlide]?.subtitle || slides[currentSlide]?.subtitle}
            </p>
          </div>

          {/* Search Bar: Dời xuống chổ nút xem thêm */}
          <div className="w-full max-w-[1100px] mt-8 sm:mt-12 md:mt-14 lg:mt-16 animate-fade-in-scale animation-delay-200">
            <DiscoverySearch />
          </div>
        </div>
      </div>

      {/* Nút Xem Thêm: Dời xuống cuối banner */}
      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-20 animate-fade-in animation-delay-300 pointer-events-auto">
        <button
          type="button"
          onClick={scrollToDestinations}
          className="group flex flex-col items-center gap-1 cursor-pointer select-none transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
          aria-label={isEnglish ? "See more" : "Xem thêm"}
        >
          <span className="script-title text-xl sm:text-2xl md:text-3xl text-white/95 group-hover:text-amber-300 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] tracking-wide">
            {isEnglish ? "See more" : "Xem thêm"}
          </span>
          <svg
            className="w-5 h-7 sm:w-6 sm:h-8 text-white/90 group-hover:text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transition-all duration-300 transform-gpu group-hover:translate-y-1 animate-bounce"
            viewBox="0 0 32 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Curved stem swooping gracefully downward */}
            <path
              d="M11 4 C 25 8, 26 24, 16 34"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Downward arrowhead */}
            <path
              d="M9 26 L 16 34 L 23 27"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
