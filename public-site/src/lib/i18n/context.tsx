"use client";

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { Locale, TranslationDictionary } from "./types";
import { DICTIONARY } from "./dictionary";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  confirmLanguageChoice: (locale: Locale) => void;
  hasChosenLanguage: boolean;
  t: TranslationDictionary;
  isVietnamese: boolean;
  isEnglish: boolean;
}

const STORAGE_KEY = "star_travels_locale";
const PREFERENCE_CONFIRMED_KEY = "star_travels_locale_confirmed";
const DEFAULT_LOCALE: Locale = "vi";

const LanguageContext = createContext<LanguageContextType>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  confirmLanguageChoice: () => {},
  hasChosenLanguage: true,
  t: DICTIONARY[DEFAULT_LOCALE],
  isVietnamese: true,
  isEnglish: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [hasChosenLanguage, setHasChosenLanguage] = useState<boolean>(true); // default true until client checks
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const isConfirmed = localStorage.getItem(PREFERENCE_CONFIRMED_KEY) === "true";
      setHasChosenLanguage(isConfirmed);

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

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setHasChosenLanguage(true);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      localStorage.setItem(PREFERENCE_CONFIRMED_KEY, "true");
      document.cookie = `${STORAGE_KEY}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      document.cookie = `${PREFERENCE_CONFIRMED_KEY}=true; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = newLocale;
    } catch {
      // Ignore storage errors
    }
  }, []);

  const confirmLanguageChoice = useCallback(
    (newLocale: Locale) => {
      setLocale(newLocale);
    },
    [setLocale]
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      confirmLanguageChoice,
      hasChosenLanguage,
      t: DICTIONARY[locale] || DICTIONARY[DEFAULT_LOCALE],
      isVietnamese: locale === "vi",
      isEnglish: locale === "en",
    }),
    [locale, setLocale, confirmLanguageChoice, hasChosenLanguage]
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
