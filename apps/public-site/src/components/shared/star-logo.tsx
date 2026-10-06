"use client";

import Link from "next/link";

export interface StarLogoProps {
  /**
   * Lockup layout variant:
   * - 'integrated': Golden star situated directly behind the wordmark (Footer/Hero style)
   * - 'horizontal': Star icon positioned beside the STAR wordmark (Header/Navbar style)
   * - 'stacked': Star icon centered above the STAR wordmark
   * - 'icon-only': Standalone golden star emblem
   */
  variant?: "horizontal" | "integrated" | "stacked" | "icon-only";
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
      star: "size-6",
      integratedStar: "size-8",
      text: "text-2xl sm:text-3xl",
      desc: "text-[11px]",
      gap: "gap-1.5",
    },
    md: {
      star: "size-8",
      integratedStar: "size-10 sm:size-12",
      text: "text-3xl sm:text-4xl",
      desc: "text-xs",
      gap: "gap-2",
    },
    lg: {
      star: "size-12",
      integratedStar: "size-16 sm:size-20",
      text: "text-5xl sm:text-6xl",
      desc: "text-sm",
      gap: "gap-3",
    },
    xl: {
      star: "size-16 sm:size-20 md:size-24 lg:size-28",
      integratedStar: "size-16 sm:size-20 md:size-24 lg:size-28",
      text: "text-6xl sm:text-7xl md:text-8xl lg:text-[96px]",
      desc: "text-base sm:text-lg",
      gap: "gap-3 sm:gap-4",
    },
  }[size];

  const textColor = inverted ? "text-white" : "text-slate-900";
  const descColor = inverted ? "text-white/80" : "text-slate-600";

  // SVG Precision 5-Point Golden Star Emblem
  const StarIcon = ({ iconClass = "" }: { iconClass?: string }) => (
    <svg
      viewBox="0 0 100 100"
      fill="#eab308"
      aria-hidden="true"
      className={`shrink-0 text-[#eab308] drop-shadow-[0_2px_12px_rgba(234,179,8,0.45)] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105 pointer-events-none ${iconClass}`}
    >
      <polygon points="50,5 64,36 98,38 72,60 80,94 50,75 20,94 28,60 2,38 36,36" />
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

    if (variant === "integrated") {
      // Official Brand Design: Golden star emblem situated directly behind the wordmark 'STAR'
      return (
        <span
          className={`logo-title ${sizeClasses.text} leading-none ${textColor} select-none tracking-normal font-normal flex items-center ${className}`}
        >
          <span className="relative inline-flex items-center justify-center">
            <StarIcon
              iconClass={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-85 -z-10 ${sizeClasses.integratedStar}`}
            />
            <span className="relative z-10">STAR</span>
          </span>
          {showDescriptor && <span className="ml-2.5 sm:ml-3">Travels</span>}
        </span>
      );
    }

    if (variant === "stacked") {
      return (
        <div className={`flex flex-col items-center text-center select-none ${className}`}>
          <StarIcon iconClass={sizeClasses.star} />
          <span className={`mt-2 font-black tracking-widest uppercase ${sizeClasses.text} ${textColor}`}>
            STAR
          </span>
          {showDescriptor && (
            <span className={`tracking-[0.28em] uppercase font-semibold mt-0.5 ${sizeClasses.desc} ${descColor}`}>
              TRAVELS
            </span>
          )}
        </div>
      );
    }

    // Default: Horizontal Lockup (Star icon next to STAR Travels)
    return (
      <div className={`inline-flex items-center ${sizeClasses.gap} select-none ${className}`}>
        <StarIcon iconClass={sizeClasses.star} />
        <div className="flex flex-col leading-none">
          <span className={`font-black tracking-wider uppercase ${sizeClasses.text} ${textColor}`}>
            STAR
          </span>
          {showDescriptor && (
            <span className={`tracking-[0.25em] uppercase font-semibold ${sizeClasses.desc} mt-0.5 ${descColor}`}>
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
