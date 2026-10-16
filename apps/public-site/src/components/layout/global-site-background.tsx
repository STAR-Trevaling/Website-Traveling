"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const DEFAULT_BG = "/images/hero/nha-trang.jpg";

export function GlobalSiteBackground() {
  const [activeBg, setActiveBg] = useState(DEFAULT_BG);
  const [outgoingBg, setOutgoingBg] = useState<string | null>(null);

  useEffect(() => {
    const handleBgChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ image: string }>;
      const nextImage = customEvent.detail?.image;
      if (nextImage && nextImage !== activeBg) {
        setOutgoingBg(activeBg);
        setActiveBg(nextImage);
      }
    };

    window.addEventListener("star_site_bg_change", handleBgChange);
    return () => window.removeEventListener("star_site_bg_change", handleBgChange);
  }, [activeBg]);

  // Clean up outgoing image after transition completes (1000ms)
  useEffect(() => {
    if (!outgoingBg) return;
    const timer = setTimeout(() => {
      setOutgoingBg(null);
    }, 1100);
    return () => clearTimeout(timer);
  }, [outgoingBg]);

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden select-none">
      {/* Outgoing Image for smooth cross-fade */}
      {outgoingBg && (
        <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-0">
          <Image
            src={outgoingBg}
            alt="Star Travels Vietnam Background"
            fill
            unoptimized
            className="object-cover object-center"
          />
        </div>
      )}

      {/* Active Banner Background Image */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-100">
        <Image
          src={activeBg}
          alt="Star Travels Vietnam Background"
          fill
          priority
          unoptimized
          className="object-cover object-center"
        />
      </div>

      {/* Translucent glassmorphism overlay ensuring text & cards are crisp and readable */}
      <div className="absolute inset-0 bg-[#edf7f6]/55 backdrop-blur-[1.5px]" />
    </div>
  );
}
