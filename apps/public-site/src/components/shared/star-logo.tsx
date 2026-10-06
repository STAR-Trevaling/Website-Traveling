"use client";

import Link from "next/link";

export interface StarLogoProps {
  /**
   * Lockup layout variant:
   * - 'integrated': Flat golden star emblem positioned on the left with cursive "Star" lying directly on top (Template Footer style)
   * - 'horizontal': Flat golden star icon to the left of geometric STAR wordmark (Header/Navbar/Drawer style)
   * - 'stacked': Star icon centered above the STAR wordmark
   * - 'script': Cursive signature style with flat golden star
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
      starBg: "w-14 h-14 sm:w-16 sm:h-16",
      iconStar: "size-4 sm:size-5",
      text: "text-sm sm:text-[15px]",
      desc: "text-[8px] sm:text-[9px]",
      scriptText: "text-3xl sm:text-4xl",
    },
    md: {
      starBg: "w-20 h-20 sm:w-24 sm:h-24",
      iconStar: "size-5 sm:size-6",
      text: "text-lg sm:text-xl",
      desc: "text-[9.5px] sm:text-[10.5px]",
      scriptText: "text-4xl sm:text-5xl",
    },
    lg: {
      starBg: "w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48",
      iconStar: "size-7 sm:size-8",
      text: "text-2xl sm:text-3xl",
      desc: "text-xs sm:text-sm",
      scriptText: "text-5xl sm:text-6xl md:text-7xl lg:text-[78px]",
    },
    xl: {
      starBg: "w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56",
      iconStar: "size-9 sm:size-10",
      text: "text-3xl sm:text-4xl",
      desc: "text-sm sm:text-base",
      scriptText: "text-6xl sm:text-7xl md:text-8xl",
    },
  }[size];

  const textColor = inverted ? "text-white" : "text-slate-950";
  const descColor = inverted ? "text-white/95" : "text-slate-600";

  // Flat 5-Point Golden Star Emblem (Ngôi sao vàng phẳng sắc nét, màu vàng tươi rạng rỡ)
  const StarIcon = ({ iconClass = "" }: { iconClass?: string }) => (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={`shrink-0 overflow-visible drop-shadow-[0_2px_8px_rgba(234,179,8,0.45)] transition-all duration-300 pointer-events-none ${iconClass}`}
    >
      <polygon
        points="50,2 64,36 98,38 72,60 80,94 50,75 20,94 28,60 2,38 36,36"
        fill="#EAB308"
      />
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
      // Lockup B (Template Footer): Ngôi sao vàng phẳng nằm dưới, bị chữ Star đè lên
      return (
        <div
          className={`relative inline-flex items-center select-none py-3 px-2 sm:px-4 ${className}`}
        >
          {/* Cụm chữ Star nằm đè trực tiếp lên ngôi sao vàng phẳng */}
          <span className="relative inline-flex items-center justify-center">
            {/* Ngôi sao vàng phẳng (Flat Golden Star) nằm ngay dưới chữ Star */}
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 flex items-center justify-center"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 100 100"
                className={`${sizeClasses.starBg} overflow-visible drop-shadow-[0_4px_14px_rgba(234,179,8,0.45)] transition-transform duration-300 group-hover:scale-105`}
              >
                <polygon
                  points="50,2 64,36 98,38 72,60 80,94 50,75 20,94 28,60 2,38 36,36"
                  fill="#EAB308"
                />
              </svg>
            </span>

            {/* Chữ Star đè lên ngôi sao vàng */}
            <span
              className={`logo-title ${sizeClasses.scriptText} leading-none ${textColor} select-none font-black relative z-10 drop-shadow-[0_2px_4px_rgba(255,255,255,0.7)]`}
            >
              Star
            </span>
          </span>

          {/* Chữ Travels đi kèm phía sau */}
          {showDescriptor && (
            <span
              className={`logo-title ${sizeClasses.scriptText} leading-none ${textColor} select-none font-black relative z-10 ml-3 sm:ml-4 drop-shadow-[0_2px_4px_rgba(255,255,255,0.7)]`}
            >
              Travels
            </span>
          )}
        </div>
      );
    }

    if (variant === "stacked") {
      return (
        <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
          <div className="mb-2 shrink-0">
            <StarIcon iconClass={sizeClasses.iconStar} />
          </div>
          <span
            className={`brand-wordmark font-black uppercase tracking-[0.16em] ${sizeClasses.text} ${textColor} leading-none`}
          >
            STAR
          </span>
          {showDescriptor && (
            <span
              className={`tracking-[0.24em] uppercase font-bold ${sizeClasses.desc} ${descColor} mt-1 leading-none`}
            >
              TRAVELS
            </span>
          )}
        </div>
      );
    }

    // Default: Horizontal Lockup (Star icon on the left, wordmark on the right)
    return (
      <div className={`relative inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
        <div className="shrink-0">
          <StarIcon iconClass={sizeClasses.iconStar} />
        </div>
        <div className="flex flex-col leading-none">
          <span
            className={`brand-wordmark font-black uppercase tracking-[0.14em] ${sizeClasses.text} ${textColor} leading-none transition-colors duration-200 group-hover:text-amber-500`}
          >
            STAR
          </span>
          {showDescriptor && (
            <span
              className={`tracking-[0.24em] uppercase font-bold ${sizeClasses.desc} ${descColor} mt-0.5 leading-none`}
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
