"use client";

import { useState, useEffect, useId } from "react";

export interface StarCreatureMascotProps {
  size?: "xs" | "sm" | "md" | "lg";
  eyeOffset?: { x: number; y: number };
  isHovered?: boolean;
  isHappy?: boolean;
  showOrbit?: boolean;
  showShadow?: boolean;
  className?: string;
}

export function StarCreatureMascot({
  size = "md",
  eyeOffset = { x: 0, y: 0 },
  isHovered = false,
  isHappy = false,
  showOrbit = false,
  showShadow = false,
  className = "",
}: StarCreatureMascotProps) {
  const [isBlinking, setIsBlinking] = useState(false);
  const rawId = useId();
  const uniqueId = rawId.replace(/[^a-zA-Z0-9]/g, "_");
  const starGradId = `starGrad_${size}_${uniqueId}`;
  const cheekGradId = `cheekGrad_${size}_${uniqueId}`;
  const bloomFilterId = `bloomFilter_${size}_${uniqueId}`;

  // Natural Blinking Cycle (Every ~3.8s)
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      blinkTimeout = setTimeout(() => {
        setIsBlinking(false);
      }, 140);
    }, 3800);

    return () => {
      clearInterval(blinkInterval);
      if (blinkTimeout) clearTimeout(blinkTimeout);
    };
  }, []);

  const sizeClasses = {
    xs: "size-9 sm:size-10",
    sm: "size-11 sm:size-12",
    md: "size-14 sm:size-16",
    lg: "size-20 sm:size-22",
  }[size];

  const happyState = isHovered || isHappy;

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Ambient Celestial Glow */}
      <div
        className={`absolute inset-0 rounded-full bg-amber-400/30 blur-lg transition-all duration-300 pointer-events-none ${
          happyState ? "scale-130 opacity-70" : "scale-100 opacity-40 animate-pulse"
        }`}
      />

      {/* Orbiting Starlight Sparkle (Optional) */}
      {showOrbit && (
        <div
          className="absolute -inset-2.5 rounded-full pointer-events-none"
          style={{
            animation: `spin ${happyState ? "4s" : "8s"} linear infinite`,
          }}
        >
          <span className="absolute top-0 left-1/2 -translate-x-1/2 size-2 rounded-full bg-amber-300 shadow-[0_0_8px_#fde047] flex items-center justify-center">
            <span className="size-1 rounded-full bg-white animate-ping" />
          </span>
        </div>
      )}

      {/* Living Star Body */}
      <div
        className="relative z-10 transition-transform duration-200"
        style={{
          animation: happyState
            ? "creatureJiggle 0.6s ease-in-out infinite alternate"
            : "creatureBobbing 3s ease-in-out infinite",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className={`${sizeClasses} overflow-visible filter drop-shadow-[0_6px_16px_rgba(234,179,8,0.65)]`}
        >
          <defs>
            {/* Soft 3D Golden Gradient */}
            <linearGradient id={starGradId} x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#FFF9A6" />
              <stop offset="30%" stopColor="#FFD426" />
              <stop offset="80%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* Rosy Cheek Blush */}
            <radialGradient id={cheekGradId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF4D6D" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF4D6D" stopOpacity="0" />
            </radialGradient>

            {/* Bloom Filter */}
            <filter id={bloomFilterId} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#FEF08A" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* 1. Chubby 5-Pointed Rounded Star Body */}
          <path
            d="M 50,6 C 54,6 59,26 65,29 C 71,32 92,33 94,38 C 96,43 78,54 76,60 C 74,66 82,86 78,89 C 74,92 56,80 50,80 C 44,80 26,92 22,89 C 18,86 26,66 24,60 C 22,54 4,43 6,38 C 8,32 29,32 35,29 C 41,26 46,6 50,6 Z"
            fill={`url(#${starGradId})`}
            filter={`url(#${bloomFilterId})`}
          />

          {/* 2. Forehead 3D Gloss Highlight */}
          <ellipse
            cx="50"
            cy="20"
            rx="9"
            ry="4.5"
            fill="#FFFFFF"
            opacity="0.48"
            transform="rotate(-5 50 20)"
          />

          {/* 3. Soft Chubby Tummy Highlight */}
          <ellipse
            cx="50"
            cy="62"
            rx="16"
            ry="11"
            fill="#FFF7AA"
            opacity="0.32"
          />

          {/* 4. Rosy Blushing Cheeks */}
          <circle cx="32" cy="54" r="5.5" fill={`url(#${cheekGradId})`} />
          <circle cx="68" cy="54" r="5.5" fill={`url(#${cheekGradId})`} />

          {/* 5. Expressive Eyes */}
          {happyState ? (
            /* Joyful Crescent Arch Eyes (^_^) */
            <g stroke="#6B2E0A" strokeWidth="2.8" strokeLinecap="round" fill="none">
              <path d="M 36,47 Q 41,40 46,47" />
              <path d="M 54,47 Q 59,40 64,47" />
            </g>
          ) : isBlinking ? (
            /* Blinking Line */
            <g stroke="#6B2E0A" strokeWidth="2.5" strokeLinecap="round">
              <line x1="36" y1="47" x2="46" y2="47" />
              <line x1="54" y1="47" x2="64" y2="47" />
            </g>
          ) : (
            /* Anime Eyes following cursor */
            <g>
              {/* Left Eye */}
              <ellipse cx="41" cy="46" rx="4.5" ry="6" fill="#6B2E0A" />
              <g transform={`translate(${eyeOffset.x}, ${eyeOffset.y})`}>
                <ellipse cx="41" cy="46" rx="3.5" ry="5" fill="#1C1917" />
                <circle cx="42.5" cy="44" r="1.8" fill="#FFFFFF" />
                <circle cx="39.5" cy="48" r="0.9" fill="#FFFFFF" opacity="0.85" />
              </g>

              {/* Right Eye */}
              <ellipse cx="59" cy="46" rx="4.5" ry="6" fill="#6B2E0A" />
              <g transform={`translate(${eyeOffset.x}, ${eyeOffset.y})`}>
                <ellipse cx="59" cy="46" rx="3.5" ry="5" fill="#1C1917" />
                <circle cx="60.5" cy="44" r="1.8" fill="#FFFFFF" />
                <circle cx="57.5" cy="48" r="0.9" fill="#FFFFFF" opacity="0.85" />
              </g>
            </g>
          )}

          {/* 6. Cute Expressive Mouth */}
          {happyState ? (
            /* Cheerful Open Smile with Tongue (:D) */
            <g>
              <path d="M 44,53 Q 50,61 56,53 Z" fill="#6B2E0A" />
              <path d="M 46,57 Q 50,60.5 54,57 Z" fill="#FB7185" />
            </g>
          ) : (
            /* Sweet Kitty Smile (3) */
            <path
              d="M 45,53 Q 50,57.5 55,53"
              stroke="#6B2E0A"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
          )}
        </svg>
      </div>

      {/* Ground Shadow (Optional) */}
      {showShadow && (
        <div
          className="mt-1 w-12 sm:w-14 h-2.5 bg-slate-950/20 rounded-full blur-[2.5px] pointer-events-none"
          style={{
            animation: "creatureShadow 3s ease-in-out infinite",
          }}
        />
      )}

      {/* Embedded CSS Keyframes so Mascot animations work everywhere */}
      <style jsx global>{`
        @keyframes creatureBobbing {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-5px) rotate(2.5deg);
          }
        }

        @keyframes creatureShadow {
          0%, 100% {
            transform: scaleX(1) scaleY(1);
            opacity: 0.35;
          }
          50% {
            transform: scaleX(0.8) scaleY(0.7);
            opacity: 0.18;
          }
        }

        @keyframes creatureJiggle {
          0% {
            transform: translateY(-3px) rotate(-4deg) scale(1.06);
          }
          100% {
            transform: translateY(-7px) rotate(4deg) scale(1.12);
          }
        }
      `}</style>
    </div>
  );
}
