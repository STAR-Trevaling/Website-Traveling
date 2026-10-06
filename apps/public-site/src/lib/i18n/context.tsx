"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { Locale, TranslationDictionary } from "./types";
import { DICTIONARY } from "./dictionary";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  confirmLanguageChoice: (locale: Locale) => void;
  reopenLanguagePrompt: () => void;
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
  reopenLanguagePrompt: () => {},
  hasChosenLanguage: true,
  t: DICTIONARY[DEFAULT_LOCALE],
  isVietnamese: true,
  isEnglish: false,
});

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLocale?: Locale;
  initialConfirmed?: boolean;
}

export function LanguageProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
  initialConfirmed = false,
}: LanguageProviderProps) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [hasChosenLanguage, setHasChosenLanguage] = useState<boolean>(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved && (saved === "vi" || saved === "en")) {
        setLocaleState(saved);
        document.documentElement.lang = saved;
      } else if (typeof navigator !== "undefined" && navigator.language) {
        // Automatically adapt to the user's browser language
        const browserPrefersEn =
          navigator.language.toLowerCase().startsWith("en") &&
          !navigator.language.toLowerCase().startsWith("vi");
        const detected: Locale = browserPrefersEn ? "en" : "vi";
        setLocaleState(detected);
        document.documentElement.lang = detected;
      } else {
        document.documentElement.lang = initialLocale;
      }
    } catch {
      // Fallback in case of SSR or storage restriction
    }
  }, [initialLocale]);

  const setLocale = useCallback(
    (newLocale: Locale) => {
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
      try {
        router.refresh();
      } catch {
        // Ignore router errors
      }
    },
    [router]
  );

  const confirmLanguageChoice = useCallback(
    (newLocale: Locale) => {
      setLocale(newLocale);
    },
    [setLocale]
  );

  const reopenLanguagePrompt = useCallback(() => {
    // No-op: Rely on browser language and translation
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      confirmLanguageChoice,
      reopenLanguagePrompt,
      hasChosenLanguage,
      t: DICTIONARY[locale] || DICTIONARY[DEFAULT_LOCALE],
      isVietnamese: locale === "vi",
      isEnglish: locale === "en",
    }),
    [locale, setLocale, confirmLanguageChoice, reopenLanguagePrompt, hasChosenLanguage]
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
