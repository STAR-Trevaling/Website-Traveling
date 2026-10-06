"use client";

import { useLanguage } from "@/lib/i18n/context";
import { Locale } from "@/lib/i18n/types";

interface LanguageSwitcherProps {
  overlay?: boolean;
  className?: string;
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

export function LanguageSwitcher({ overlay = false, className = "" }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full p-0.5 transition-all text-xs font-semibold ${
        overlay
          ? "bg-black/30 border border-white/30 backdrop-blur-sm text-white"
          : "bg-slate-100 border border-slate-200 text-slate-700"
      } ${className}`}
      role="group"
      aria-label="Language selection"
    >
      {SUPPORTED_LOCALES.map((item) => {
        const isActive = locale === item.code;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLocale(item.code)}
            aria-pressed={isActive}
            aria-label={`Switch to ${item.name}`}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
              isActive
                ? overlay
                  ? "bg-white text-slate-900 shadow-sm font-bold scale-[1.02]"
                  : "bg-white text-slate-900 shadow-sm font-bold scale-[1.02]"
                : overlay
                ? "text-white/75 hover:text-white hover:bg-white/10"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <span className="text-[11px] leading-none" aria-hidden="true">
              {item.flag}
            </span>
            <span className="tracking-wider">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
