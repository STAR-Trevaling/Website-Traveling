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

  const textColor = inverted ? "text-white" : "text-slate-950";
  const descColor = inverted ? "text-white/90" : "text-slate-600";

  // Luxury 3D Faceted Golden Star Emblem with radiant, luminous 18K gold tones (No muddy browns)
  const StarIcon = ({ iconClass = "" }: { iconClass?: string }) => (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={`shrink-0 drop-shadow-[0_4px_20px_rgba(234,179,8,0.4)] transition-all duration-500 group-hover:scale-105 pointer-events-none ${iconClass}`}
    >
      <defs>
        {/* Facet Light Gradient: High-luster Radiant 18K Champagne Gold */}
        <linearGradient id="starLightGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="45%" stopColor="#FEF08A" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
        {/* Facet Shadow Gradient: Warm Luminous Golden Amber (Crisp, clean, no dark brown) */}
        <linearGradient id="starDarkGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="55%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
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
      <circle cx="50" cy="50" r="2" fill="#FEF9C3" stroke="#F59E0B" strokeWidth="0.5" opacity="0.85" />
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
      // Large 3D golden star emblem watermark behind brand name - never drowns out or overpowers text
      return (
        <div
          className={`relative inline-flex items-center justify-center text-center select-none ${sizeClasses.container} ${className}`}
        >
          {/* Luminous Golden Star Backdrop (Crisp 5-point faceted star, warm gold without dark brown) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <StarIcon iconClass={`${sizeClasses.starBg} opacity-70 sm:opacity-75 group-hover:opacity-90 transition-opacity`} />
          </div>

          {/* Brand Name Text lying directly ON TOP OF the star with bold calligraphy stroke and radiant light halo */}
          <span
            className={`logo-title ${sizeClasses.scriptText} leading-none ${textColor} select-none tracking-normal font-bold relative z-10 flex items-baseline [-webkit-text-stroke:0.6px_currentColor] drop-shadow-[0_2px_4px_rgba(255,255,255,1)] drop-shadow-[0_0_10px_rgba(255,255,255,0.95)] drop-shadow-[0_0_22px_rgba(255,255,255,0.9)] ${
              inverted ? "drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]" : ""
            }`}
          >
            <span>Star</span>
            {showDescriptor && <span className="ml-2 sm:ml-2.5">Travels</span>}
          </span>
        </div>
      );
    }

    // Default & Stacked / Horizontal Lockup: Luminous golden star backdrop, STAR & TRAVELS text overlaid on top
    return (
      <div
        className={`relative inline-flex items-center justify-center text-center select-none ${sizeClasses.container} ${className}`}
      >
        {/* Luminous Golden Star Backdrop */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <StarIcon iconClass={`${sizeClasses.starBg} opacity-70 sm:opacity-75 group-hover:opacity-90 transition-opacity`} />
        </div>

        {/* Brand Name Text overlaid ON TOP OF the star */}
        <div className={`relative z-10 flex flex-col items-center justify-center leading-none ${sizeClasses.padding}`}>
          <span
            className={`brand-wordmark font-bold uppercase tracking-[0.18em] ${sizeClasses.text} ${textColor} leading-none transition-colors duration-200 group-hover:text-amber-500 drop-shadow-[0_1px_4px_rgba(255,255,255,1)] drop-shadow-[0_0_10px_rgba(255,255,255,0.95)] ${
              inverted ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" : ""
            }`}
          >
            STAR
          </span>
          {showDescriptor && (
            <span
              className={`tracking-[0.28em] uppercase font-semibold ${sizeClasses.desc} ${descColor} mt-0.5 sm:mt-1 leading-none drop-shadow-[0_1px_2px_rgba(255,255,255,1)] drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] ${
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
