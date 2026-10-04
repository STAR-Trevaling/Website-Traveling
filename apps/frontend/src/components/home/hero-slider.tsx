"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DiscoverySearch } from "./discovery-search";
import { VIETNAM_IMAGES } from "@/lib/assets";

export function HeroSlider() {
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
    <div className="relative h-[820px] md:h-[760px] lg:h-[820px] w-full overflow-hidden">
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
        aria-label="Slide trước"
        className="absolute left-4 md:left-8 top-1/2 z-20 -translate-y-1/2 flex size-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition hover:bg-[#0098a2] hover:scale-110"
      >
        <ChevronLeft className="size-7" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Slide tiếp theo"
        className="absolute right-4 md:right-8 top-1/2 z-20 -translate-y-1/2 flex size-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition hover:bg-[#0098a2] hover:scale-110"
      >
        <ChevronRight className="size-7" />
      </button>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-between pb-14 pt-24 text-white">
        <div className="mt-20 text-center px-4 max-w-5xl">
          <h1 className="display-title template-shadow-text text-5xl leading-tight sm:text-6xl md:text-7xl lg:text-[76px] transition-all duration-700">
            {slides[currentSlide].title || "Your Dream Vacation Awaits"}
          </h1>

          <p className="script-title mt-4 text-3xl leading-tight sm:text-4xl md:text-5xl text-white/95 [-webkit-text-stroke:.4px_#fff]">
            {slides[currentSlide].subtitle || "Explore the World with us."}
          </p>
        </div>

        {/* Search Bar at the bottom of hero matching template */}
        <div className="w-full px-4 mb-2">
          <div className="mx-auto max-w-[1060px]">
            <DiscoverySearch />
          </div>
        </div>
      </div>
    </div>
  );
}
