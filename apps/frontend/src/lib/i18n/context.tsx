"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { Locale, TranslationDictionary } from "./types";
import { DICTIONARY } from "./dictionary";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationDictionary;
  isVietnamese: boolean;
  isEnglish: boolean;
}

const STORAGE_KEY = "star_travels_locale";
const DEFAULT_LOCALE: Locale = "vi";

const LanguageContext = createContext<LanguageContextType>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: DICTIONARY[DEFAULT_LOCALE],
  isVietnamese: true,
  isEnglish: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved && (saved === "vi" || saved === "en")) {
        setLocaleState(saved);
        document.documentElement.lang = saved;
      } else {
        document.documentElement.lang = DEFAULT_LOCALE;
      }
    } catch {
      // Fallback in case of SSR or storage restriction
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.cookie = `${STORAGE_KEY}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = newLocale;
    } catch {
      // Ignore storage errors
    }
  };

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: DICTIONARY[locale] || DICTIONARY[DEFAULT_LOCALE],
      isVietnamese: locale === "vi",
      isEnglish: locale === "en",
    }),
    [locale]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
