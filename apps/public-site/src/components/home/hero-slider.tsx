"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { DiscoverySearch } from "./discovery-search";
import { VIETNAM_IMAGES } from "@/lib/assets";
import { useLanguage } from "@/lib/i18n/context";

export function HeroSlider() {
  const { t } = useLanguage();
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

      {/* Subtle modern cinematic overlay keeping landmark photos bright, sunny and vibrant while text remains crystal-clear */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/55 pointer-events-none" />

      {/* Hero Content (Positioned higher with generous breathing room and optical balance) */}
      <div className="relative z-10 flex min-h-[680px] sm:min-h-[720px] md:min-h-[760px] lg:min-h-[800px] w-full flex-col items-center justify-center px-4 pt-16 sm:pt-18 md:pt-20 pb-12 text-white">
        {/* Main Center Content: Title & Desc shifted up, Discovery Search distinctly moved down */}
        <div className="w-full max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Text Cluster (Dời lên trên) */}
          <div className="flex flex-col items-center -translate-y-6 sm:-translate-y-10 md:-translate-y-14">
            {/* Animated Hero Title on slide change (Concise single line) */}
            <h1
              key={`hero-title-${currentSlide}`}
              className="display-title template-shadow-text leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl animate-fade-in-up whitespace-nowrap truncate max-w-5xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] tracking-wide"
            >
              {t.hero.slides[currentSlide]?.title || slides[currentSlide]?.title}
            </h1>

            {/* Animated Hero Script Description (Kiểu chữ template, đúng 1 dòng ngắn gọn) */}
            <p
              key={`hero-sub-${currentSlide}`}
              className="script-title mt-2 sm:mt-3 leading-normal text-white/95 [-webkit-text-stroke:.3px_#fff] text-2xl sm:text-3xl md:text-4xl lg:text-[44px] animate-fade-in-up animation-delay-100 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] whitespace-nowrap truncate max-w-4xl"
            >
              {t.hero.slides[currentSlide]?.subtitle || slides[currentSlide]?.subtitle}
            </p>
          </div>

          {/* Search Bar (Dời xích xuống dưới rõ ràng, cân đối và thoáng đãng) */}
          <div className="w-full max-w-[1100px] mt-4 sm:mt-6 md:mt-8 translate-y-3 sm:translate-y-6 md:translate-y-8 animate-fade-in-scale animation-delay-200">
            <DiscoverySearch />
          </div>
        </div>
      </div>
    </div>
  );
}
