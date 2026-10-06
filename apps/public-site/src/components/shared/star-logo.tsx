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
      text: "text-base sm:text-lg",
      desc: "text-[8px] sm:text-[9px]",
      gap: "gap-1",
    },
    md: {
      star: "size-4.5 sm:size-5",
      text: "text-xl sm:text-2xl",
      desc: "text-[9.5px] sm:text-[10px]",
      gap: "gap-1.5",
    },
    lg: {
      star: "size-6 sm:size-7",
      text: "text-2xl sm:text-3xl",
      desc: "text-xs sm:text-sm",
      gap: "gap-2",
    },
    xl: {
      star: "size-8 sm:size-10",
      text: "text-4xl sm:text-5xl",
      desc: "text-sm sm:text-base",
      gap: "gap-2.5",
    },
  }[size];

  const textColor = inverted ? "text-white" : "text-slate-900";
  const descColor = inverted ? "text-white/80" : "text-slate-600";

  // SVG Precision 5-Point Golden Star Emblem with radiant glow
  const StarIcon = ({ iconClass = "" }: { iconClass?: string }) => (
    <svg
      viewBox="0 0 100 100"
      fill="#eab308"
      aria-hidden="true"
      className={`shrink-0 text-[#eab308] drop-shadow-[0_2px_10px_rgba(234,179,8,0.55)] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 pointer-events-none ${iconClass}`}
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

    if (variant === "integrated" || variant === "script") {
      // Clean Signature Lockup: Flowing script wordmark with Golden Star centered underneath
      return (
        <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
          <span
            className={`logo-title ${sizeClasses.text} leading-none ${textColor} select-none tracking-normal font-normal flex items-baseline`}
          >
            <span>Star</span>
            {showDescriptor && <span className="ml-1.5 sm:ml-2">Travels</span>}
          </span>
          <StarIcon iconClass={`${sizeClasses.star} mt-1`} />
        </div>
      );
    }

    if (variant === "stacked") {
      // Centered Luxury Lockup: STAR wordmark on top, Golden Star emblem centered underneath, TRAVELS below
      return (
        <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
          <span className={`font-black tracking-widest uppercase ${sizeClasses.text} ${textColor} leading-none`}>
            STAR
          </span>
          <StarIcon iconClass={`${sizeClasses.star} my-1 sm:my-1.5`} />
          {showDescriptor && (
            <span className={`tracking-[0.28em] uppercase font-semibold ${sizeClasses.desc} ${descColor} leading-none`}>
              TRAVELS
            </span>
          )}
        </div>
      );
    }

    // Default & Horizontal Lockup: STAR wordmark on top, Golden Star centered underneath, TRAVELS below
    return (
      <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
        <span className={`font-black tracking-[0.22em] uppercase ${sizeClasses.text} ${textColor} leading-none`}>
          STAR
        </span>
        <StarIcon iconClass={`${sizeClasses.star} my-0.5 sm:my-1`} />
        {showDescriptor && (
          <span className={`tracking-[0.26em] uppercase font-semibold ${sizeClasses.desc} ${descColor} leading-none`}>
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
