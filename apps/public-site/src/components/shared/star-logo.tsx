"use client";

import Link from "next/link";

export interface StarLogoProps {
  /**
   * Lockup layout variant:
   * - 'integrated': Large 3D golden star emblem encompassing behind flowing script wordmark (Star Travels)
   * - 'horizontal': Large 3D star emblem encompassing behind geometric STAR wordmark (Header/Navbar style)
   * - 'stacked': Star emblem centered behind the STAR wordmark
   * - 'script': Cursive signature style with 3D golden star backdrop
   * - 'icon-only': Standalone golden star emblem
   */
  variant?: "horizontal" | "integrated" | "stacked" | "script" | "icon-only";
  size?: "sm" | "md" | "lg" | "xl";
  showDescriptor?: boolean;
  inverted?: boolean;
  asLink?: boolean;
  href?: string;
  className?: string;
}

export function StarLogo({
  variant = "integrated",
  size = "md",
  showDescriptor = true,
  inverted = false,
  asLink = true,
  href = "/",
  className = "",
}: StarLogoProps) {
  const sizeClasses = {
    sm: {
      container: "min-h-[44px] sm:min-h-[48px] px-2 py-1",
      starBg: "w-12 h-12 sm:w-14 sm:h-14",
      iconStar: "size-4 sm:size-4.5",
      text: "text-xs sm:text-[13px]",
      desc: "text-[7px] sm:text-[7.5px]",
      scriptText: "text-xl sm:text-2xl",
      padding: "py-0.5 px-2",
    },
    md: {
      container: "min-h-[100px] sm:min-h-[120px] px-3 py-2",
      starBg: "w-28 h-28 sm:w-32 sm:h-32",
      iconStar: "size-5 sm:size-6",
      text: "text-sm sm:text-base",
      desc: "text-[8px] sm:text-[8.5px]",
      scriptText: "text-3xl sm:text-4xl",
      padding: "py-1.5 px-3",
    },
    lg: {
      container: "min-h-[160px] sm:min-h-[200px] md:min-h-[220px] px-4 py-2",
      starBg: "w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80",
      iconStar: "size-7 sm:size-8",
      text: "text-xl sm:text-2xl",
      desc: "text-[9.5px] sm:text-[10px]",
      scriptText: "text-4xl sm:text-5xl md:text-[50px]",
      padding: "py-2 px-4",
    },
    xl: {
      container: "min-h-[220px] sm:min-h-[260px] md:min-h-[300px] px-6 py-4",
      starBg: "w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96",
      iconStar: "size-9 sm:size-10",
      text: "text-2xl sm:text-3xl",
      desc: "text-xs sm:text-sm",
      scriptText: "text-5xl sm:text-6xl md:text-7xl",
      padding: "py-3 px-6",
    },
  }[size];

  const textColor = inverted ? "text-white" : "text-slate-900";
  const descColor = inverted ? "text-white/85" : "text-slate-500";

  // Luxury 3D Faceted Golden Star Jewel with metallic light/shadow facets
  const StarIcon = ({ iconClass = "" }: { iconClass?: string }) => (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={`shrink-0 drop-shadow-[0_4px_24px_rgba(234,179,8,0.5)] transition-all duration-500 group-hover:scale-105 pointer-events-none ${iconClass}`}
    >
      <defs>
        {/* Facet Light Gradient: High-luster 18K Radiant Gold */}
        <linearGradient id="starLightGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF9D2" />
          <stop offset="45%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#EAB308" />
        </linearGradient>
        {/* Facet Shadow Gradient: Antique Burnished Bronze Gold */}
        <linearGradient id="starDarkGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#CA8A04" />
          <stop offset="60%" stopColor="#A16207" />
          <stop offset="100%" stopColor="#713F12" />
        </linearGradient>
      </defs>

      {/* 5 Dimensional Light Facets */}
      <polygon points="50,50 50,5 60.1,36.1" fill="url(#starLightGold)" />
      <polygon points="50,50 92.8,36.1 66.4,55.3" fill="url(#starLightGold)" />
      <polygon points="50,50 76.4,86.4 50,67.2" fill="url(#starLightGold)" />
      <polygon points="50,50 23.6,86.4 33.6,55.3" fill="url(#starLightGold)" />
      <polygon points="50,50 7.2,36.1 39.9,36.1" fill="url(#starLightGold)" />

      {/* 5 Dimensional Shadow Facets */}
      <polygon points="50,50 50,5 39.9,36.1" fill="url(#starDarkGold)" />
      <polygon points="50,50 92.8,36.1 60.1,36.1" fill="url(#starDarkGold)" />
      <polygon points="50,50 76.4,86.4 66.4,55.3" fill="url(#starDarkGold)" />
      <polygon points="50,50 23.6,86.4 50,67.2" fill="url(#starDarkGold)" />
      <polygon points="50,50 7.2,36.1 33.6,55.3" fill="url(#starDarkGold)" />

      {/* Center Core Jewel Sparkle */}
      <circle cx="50" cy="50" r="2.4" fill="#FEF9C3" stroke="#92400E" strokeWidth="0.6" />
    </svg>
  );

  const content = (() => {
    if (variant === "icon-only") {
      return (
        <div className={`relative inline-flex items-center justify-center ${className}`}>
          <StarIcon iconClass={sizeClasses.iconStar} />
        </div>
      );
    }

    if (variant === "integrated" || variant === "script") {
      // Large 3D star emblem encompassing behind flowing script wordmark
      return (
        <div
          className={`relative inline-flex items-center justify-center text-center select-none ${sizeClasses.container} ${className}`}
        >
          {/* Large Golden Star Emblem positioned BEHIND brand name (Encompassing backdrop) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <StarIcon iconClass={`${sizeClasses.starBg} opacity-90 group-hover:opacity-100 transition-opacity`} />
          </div>

          {/* Brand Name Text lying directly ON TOP OF the star (Brand name nằm đè lên ngôi sao) */}
          <span
            className={`logo-title ${sizeClasses.scriptText} leading-none ${textColor} select-none tracking-normal font-normal relative z-10 flex items-baseline drop-shadow-[0_2px_4px_rgba(255,255,255,0.95)] drop-shadow-[0_0_8px_rgba(255,255,255,0.85)] ${
              inverted ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]" : ""
            }`}
          >
            <span>Star</span>
            {showDescriptor && <span className="ml-2 sm:ml-2.5">Travels</span>}
          </span>
        </div>
      );
    }

    // Default & Stacked / Horizontal Lockup: Large 3D star emblem behind, STAR & TRAVELS text overlaid on top
    return (
      <div
        className={`relative inline-flex items-center justify-center text-center select-none ${sizeClasses.container} ${className}`}
      >
        {/* Large 3D Faceted Golden Star positioned BEHIND text (Encompasses brand name) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <StarIcon iconClass={`${sizeClasses.starBg} opacity-90 group-hover:opacity-100 transition-opacity`} />
        </div>

        {/* Brand Name Text overlaid ON TOP OF the star */}
        <div className={`relative z-10 flex flex-col items-center justify-center leading-none ${sizeClasses.padding}`}>
          <span
            className={`brand-wordmark font-bold uppercase tracking-[0.18em] ${sizeClasses.text} ${textColor} leading-none transition-colors duration-200 group-hover:text-amber-400 drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)] ${
              inverted ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" : ""
            }`}
          >
            STAR
          </span>
          {showDescriptor && (
            <span
              className={`tracking-[0.28em] uppercase font-semibold ${sizeClasses.desc} ${descColor} mt-0.5 sm:mt-1 leading-none drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)] ${
                inverted ? "drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]" : ""
              }`}
            >
              TRAVELS
            </span>
          )}
        </div>
      </div>
    );
  })();

  if (asLink) {
    return (
      <Link
        href={href}
        className="group relative inline-flex items-center justify-center transition-transform hover:scale-[1.02]"
        aria-label="STAR Travels"
      >
        {content}
      </Link>
    );
  }

  return <div className="group relative inline-flex items-center justify-center">{content}</div>;
}
