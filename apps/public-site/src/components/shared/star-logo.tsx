"use client";

import Link from "next/link";

export interface StarLogoProps {
  /**
   * Lockup layout variant:
   * - 'integrated': Golden star emblem cleanly positioned beside flowing script wordmark (Zero overlap, crystal-clear readability)
   * - 'horizontal': Star icon positioned beside geometric STAR wordmark (Header/Navbar modern style)
   * - 'stacked': Star icon centered above the STAR wordmark (Centered luxury style)
   * - 'script': Cursive signature style with standalone golden star
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
      star: "size-3.5 sm:size-4",
      text: "text-sm sm:text-[15px]",
      desc: "text-[7.5px] sm:text-[8px]",
      scriptText: "text-xl sm:text-2xl",
      gap: "gap-1",
    },
    md: {
      star: "size-4.5 sm:size-5",
      text: "text-lg sm:text-xl",
      desc: "text-[8.5px] sm:text-[9px]",
      scriptText: "text-2xl sm:text-3xl",
      gap: "gap-1.5",
    },
    lg: {
      star: "size-6 sm:size-7",
      text: "text-2xl sm:text-3xl",
      desc: "text-[10px] sm:text-xs",
      scriptText: "text-4xl sm:text-5xl",
      gap: "gap-2",
    },
    xl: {
      star: "size-8 sm:size-10",
      text: "text-4xl sm:text-5xl",
      desc: "text-xs sm:text-sm",
      scriptText: "text-5xl sm:text-6xl",
      gap: "gap-2.5",
    },
  }[size];

  const textColor = inverted ? "text-white" : "text-slate-900";
  const descColor = inverted ? "text-white/85" : "text-slate-500";

  // Luxury 3D Faceted Golden Star Jewel with metallic light/shadow facets
  const StarIcon = ({ iconClass = "" }: { iconClass?: string }) => (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={`shrink-0 drop-shadow-[0_2px_8px_rgba(234,179,8,0.55)] transition-all duration-300 group-hover:scale-115 group-hover:rotate-12 pointer-events-none ${iconClass}`}
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
          <StarIcon iconClass={sizeClasses.star} />
        </div>
      );
    }

    if (variant === "integrated" || variant === "script") {
      // Clean Signature Script Lockup with 3D star and flank lines underneath
      return (
        <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
          <span
            className={`logo-title ${sizeClasses.scriptText} leading-none ${textColor} select-none tracking-normal font-normal flex items-baseline`}
          >
            <span>Star</span>
            {showDescriptor && <span className="ml-1.5 sm:ml-2">Travels</span>}
          </span>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <span
              className={`h-[1px] w-3.5 sm:w-5 ${
                inverted
                  ? "bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"
                  : "bg-gradient-to-r from-transparent via-amber-600/40 to-transparent"
              }`}
            />
            <StarIcon iconClass={sizeClasses.star} />
            <span
              className={`h-[1px] w-3.5 sm:w-5 ${
                inverted
                  ? "bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"
                  : "bg-gradient-to-r from-transparent via-amber-600/40 to-transparent"
              }`}
            />
          </div>
        </div>
      );
    }

    // Default & Horizontal / Stacked Lockup: STAR wordmark on top, 3D golden star centered underneath, TRAVELS below
    return (
      <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
        {/* Luxury Roman Serif Wordmark */}
        <span
          className={`brand-wordmark font-bold uppercase tracking-[0.26em] ${sizeClasses.text} ${textColor} leading-none transition-colors duration-200 group-hover:text-amber-400`}
        >
          STAR
        </span>

        {/* 3D Faceted Golden Star positioned directly underneath the word Star with subtle flank lines */}
        <div className="flex items-center justify-center gap-1.5 my-1 w-full">
          <span
            className={`h-[1px] w-3 sm:w-4 ${
              inverted
                ? "bg-gradient-to-r from-transparent via-amber-300/70 to-transparent"
                : "bg-gradient-to-r from-transparent via-amber-600/50 to-transparent"
            }`}
          />
          <StarIcon iconClass={sizeClasses.star} />
          <span
            className={`h-[1px] w-3 sm:w-4 ${
              inverted
                ? "bg-gradient-to-r from-transparent via-amber-300/70 to-transparent"
                : "bg-gradient-to-r from-transparent via-amber-600/50 to-transparent"
            }`}
          />
        </div>

        {/* Descriptor TRAVELS in refined letter-spaced typography */}
        {showDescriptor && (
          <span
            className={`tracking-[0.35em] uppercase font-semibold ${sizeClasses.desc} ${descColor} leading-none`}
          >
            TRAVELS
          </span>
        )}
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
