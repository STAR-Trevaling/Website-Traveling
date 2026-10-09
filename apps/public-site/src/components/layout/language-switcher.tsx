"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { Locale } from "@/lib/i18n/types";

interface LanguageSwitcherProps {
  overlay?: boolean;
  className?: string;
  showIcon?: boolean;
}

const SUPPORTED_LOCALES: Array<{
  code: Locale;
  label: string;
  name: string;
  flag: string;
}> = [
  { code: "vi", label: "VI", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en", label: "EN", name: "English", flag: "🇬🇧" },
];

export function LanguageSwitcher({
  overlay = false,
  className = "",
  showIcon = true,
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full p-0.5 transition-all text-xs font-semibold ${
        overlay
          ? "bg-black/35 border border-white/25 backdrop-blur-md text-white shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
          : "bg-slate-100 border border-slate-200/90 text-slate-700 shadow-xs"
      } ${className}`}
      role="group"
      aria-label="Language selection / Chọn ngôn ngữ"
    >
      {showIcon && (
        <span
          className={`flex items-center pl-1.5 pr-0.5 ${
            overlay ? "text-white/80" : "text-slate-400"
          }`}
          aria-hidden="true"
        >
          <Globe className="size-3.5" />
        </span>
      )}

      {SUPPORTED_LOCALES.map((item) => {
        const isActive = locale === item.code;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLocale(item.code)}
            aria-pressed={isActive}
            aria-label={`Chuyển sang ${item.name}`}
            title={`Chuyển sang ${item.name} (${item.label})`}
            className={`flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs tracking-wider transition-all duration-200 cursor-pointer ${
              isActive
                ? overlay
                  ? "bg-white text-slate-900 shadow-sm font-bold scale-[1.02]"
                  : "bg-white text-slate-900 shadow-sm font-bold scale-[1.02]"
                : overlay
                ? "text-white/80 hover:text-white hover:bg-white/15 font-medium"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 font-medium"
            }`}
          >
            <span className="text-[12px] leading-none" aria-hidden="true">
              {item.flag}
            </span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
