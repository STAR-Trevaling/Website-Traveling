"use client";

import { useEffect, useState } from "react";
import { Globe, X, Check, Cookie } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export function LanguageConsentBanner() {
  const { hasChosenLanguage, confirmLanguageChoice, locale } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    // Only display if the user has not explicitly confirmed their language choice
    if (!hasChosenLanguage) {
      const timer = setTimeout(() => {
        setIsRendered(true);
        // Small delay to trigger smooth CSS slide-up transition
        requestAnimationFrame(() => setIsVisible(true));
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsRendered(false), 400);
      return () => clearTimeout(timer);
    }
  }, [hasChosenLanguage]);

  const handleSelectLanguage = (selectedLocale: "vi" | "en") => {
    confirmLanguageChoice(selectedLocale);
    setIsVisible(false);
    setTimeout(() => setIsRendered(false), 400);
  };

  const handleDismiss = () => {
    // Dismiss keeping current locale
    confirmLanguageChoice(locale);
    setIsVisible(false);
    setTimeout(() => setIsRendered(false), 400);
  };

  if (!isRendered) return null;

  return (
    <aside
      role="dialog"
      aria-labelledby="language-prompt-title"
      aria-describedby="language-prompt-desc"
      className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 left-4 sm:left-auto sm:w-[420px] z-50 transition-all duration-400 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-8 opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-slate-900/95 p-5 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        {/* Subtle decorative top glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#0098a2]/25 blur-2xl rounded-full pointer-events-none" />

        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-full bg-[#0098a2]/20 text-[#0098a2] border border-[#0098a2]/30 shrink-0">
              <Globe className="size-5" />
            </div>
            <div>
              <h2
                id="language-prompt-title"
                className="text-sm sm:text-[15px] font-bold text-white tracking-wide leading-tight"
              >
                Chọn ngôn ngữ · Language Choice
              </h2>
              <span className="text-[11px] text-slate-400 font-normal">
                Star Travels Vietnam
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Đóng bảng thông báo / Close prompt"
            className="flex size-7 items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Description */}
        <div id="language-prompt-desc" className="mt-3.5 space-y-1 text-xs text-slate-300 leading-relaxed relative z-10">
          <p>
            Vui lòng chọn ngôn ngữ bạn muốn sử dụng. Chúng tôi sẽ ghi nhớ lựa chọn của bạn qua cookie.
          </p>
          <p className="text-slate-400 text-[11px]">
            Please choose your preferred browsing language. Your preference will be remembered via cookies.
          </p>
        </div>

        {/* 2 Language Action Buttons */}
        <div className="mt-4.5 grid grid-cols-2 gap-3 relative z-10">
          {/* Vietnamese Button */}
          <button
            type="button"
            onClick={() => handleSelectLanguage("vi")}
            className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
              locale === "vi"
                ? "bg-[#0098a2] border-[#0098a2] text-white shadow-[0_4px_16px_rgba(0,152,162,0.4)]"
                : "bg-white/10 border-white/15 text-white hover:bg-white/15 hover:border-white/30"
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-base shrink-0" aria-hidden="true">🇻🇳</span>
              <div className="truncate">
                <span className="block text-xs font-bold leading-none">Tiếng Việt</span>
                <span className="block text-[10px] opacity-80 mt-0.5">Vietnamese</span>
              </div>
            </div>
            {locale === "vi" && <Check className="size-4 shrink-0 text-white ml-1" />}
          </button>

          {/* English Button */}
          <button
            type="button"
            onClick={() => handleSelectLanguage("en")}
            className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
              locale === "en"
                ? "bg-[#0098a2] border-[#0098a2] text-white shadow-[0_4px_16px_rgba(0,152,162,0.4)]"
                : "bg-white/10 border-white/15 text-white hover:bg-white/15 hover:border-white/30"
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-base shrink-0" aria-hidden="true">🇬🇧</span>
              <div className="truncate">
                <span className="block text-xs font-bold leading-none">English</span>
                <span className="block text-[10px] opacity-80 mt-0.5">Tiếng Anh</span>
              </div>
            </div>
            {locale === "en" && <Check className="size-4 shrink-0 text-white ml-1" />}
          </button>
        </div>

        {/* Footer cookie notice & reminder */}
        <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center gap-2 text-[10.5px] text-slate-400 relative z-10">
          <Cookie className="size-3.5 shrink-0 text-[#0098a2]" />
          <span className="truncate">
            Lưu qua cookie · Có thể đổi lại bất kỳ lúc nào ở menu trên cùng.
          </span>
        </div>
      </div>
    </aside>
  );
}
