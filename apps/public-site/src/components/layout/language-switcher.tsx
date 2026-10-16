"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

interface LanguageSwitcherProps {
  overlay?: boolean;
  className?: string;
  showIcon?: boolean;
}

export function LanguageSwitcher({
  overlay = false,
  className = "",
  showIcon = true,
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();
  const isEn = locale === "en";

  const toggleLocale = () => {
    setLocale(isEn ? "vi" : "en");
  };

  // Shows current active language: "VI" when in Vietnamese, "EN" when in English
  const currentCode = isEn ? "EN" : "VI";
  const targetName = isEn ? "Tiếng Việt (VI)" : "English (EN)";
  const titleText = isEn
    ? "Current language: English (EN) — Click to switch to Tiếng Việt"
    : "Đang hiển thị: Tiếng Việt (VI) — Nhấn để chuyển sang English";

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={`Chuyển sang ${targetName}`}
      title={titleText}
      className={`group inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer ${
        overlay
          ? "bg-black/35 hover:bg-black/55 border border-white/25 hover:border-white/45 text-white backdrop-blur-md shadow-sm hover:scale-[1.03] active:scale-95"
          : "bg-slate-100 hover:bg-slate-200/90 border border-slate-200/90 hover:border-slate-300 text-slate-700 hover:text-slate-900 shadow-xs hover:scale-[1.03] active:scale-95"
      } ${className}`}
    >
      {showIcon && (
        <Globe className="size-3.5 transition-transform duration-300 group-hover:rotate-45" />
      )}
      <span className="uppercase text-[11px] sm:text-xs font-bold tracking-wide">
        {currentCode}
      </span>
    </button>
  );
}
