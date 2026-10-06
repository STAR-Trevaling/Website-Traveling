"use client";

import { useEffect, useState } from "react";
import { Globe, X, Check } from "lucide-react";
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
      className={`fixed bottom-5 sm:bottom-6 right-4 sm:right-6 left-4 sm:left-auto sm:w-[390px] z-50 transition-all duration-300 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-6 opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 text-slate-900 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.22),0_0_1px_1px_rgba(15,23,42,0.06)]">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-slate-50 border border-slate-200/70 text-slate-700 shrink-0">
              <Globe className="size-4.5" />
            </div>
            <div>
              <h2
                id="language-prompt-title"
                className="text-sm font-semibold text-slate-900 tracking-tight leading-snug"
              >
                {locale === "en" ? "Select Language" : "Chọn ngôn ngữ"}
              </h2>
              <span className="text-[11.5px] text-slate-500 font-normal">
                Star Travels Vietnam
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label={locale === "en" ? "Close prompt" : "Đóng bảng thông báo"}
            className="flex size-7 items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Description */}
        <div id="language-prompt-desc" className="mt-3 text-xs text-slate-600 leading-relaxed">
          <p>
            {locale === "en"
              ? "Please choose your preferred browsing language for Star Travels."
              : "Vui lòng chọn ngôn ngữ bạn muốn sử dụng khi trải nghiệm Star Travels."}
          </p>
        </div>

        {/* 2 Language Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {/* Vietnamese Button */}
          <button
            type="button"
            onClick={() => handleSelectLanguage("vi")}
            className={`group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
              locale === "vi"
                ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                : "bg-slate-50/70 border-slate-200 text-slate-800 hover:bg-white hover:border-slate-300 hover:shadow-xs"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider ${
                  locale === "vi" ? "bg-white/20 text-white" : "bg-slate-200/80 text-slate-600"
                }`}
              >
                VN
              </span>
              <div className="truncate">
                <span className="block text-xs font-semibold leading-tight">Tiếng Việt</span>
                <span
                  className={`block text-[10px] mt-0.5 leading-tight ${
                    locale === "vi" ? "text-slate-300" : "text-slate-400"
                  }`}
                >
                  {locale === "en" ? "Vietnamese" : "Đang chọn"}
                </span>
              </div>
            </div>
            {locale === "vi" && (
              <Check className="size-3.5 shrink-0 text-white ml-1.5" />
            )}
          </button>

          {/* English Button */}
          <button
            type="button"
            onClick={() => handleSelectLanguage("en")}
            className={`group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
              locale === "en"
                ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                : "bg-slate-50/70 border-slate-200 text-slate-800 hover:bg-white hover:border-slate-300 hover:shadow-xs"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider ${
                  locale === "en" ? "bg-white/20 text-white" : "bg-slate-200/80 text-slate-600"
                }`}
              >
                EN
              </span>
              <div className="truncate">
                <span className="block text-xs font-semibold leading-tight">English</span>
                <span
                  className={`block text-[10px] mt-0.5 leading-tight ${
                    locale === "en" ? "text-slate-300" : "text-slate-400"
                  }`}
                >
                  {locale === "en" ? "Selected" : "Tiếng Anh"}
                </span>
              </div>
            </div>
            {locale === "en" && (
              <Check className="size-3.5 shrink-0 text-white ml-1.5" />
            )}
          </button>
        </div>

        {/* Subtle footer */}
        <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>{locale === "en" ? "Saved automatically in your browser" : "Lựa chọn được lưu tự động trên trình duyệt"}</span>
        </div>
      </div>
    </aside>
  );
}
