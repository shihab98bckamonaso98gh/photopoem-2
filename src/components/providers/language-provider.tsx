
"use client"

import type { FC, ReactNode } from 'react';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import enTranslations from '@/locales/en.json';
import bnTranslations from '@/locales/bn.json';

type Language = "en" | "bn";
type Translations = Record<string, string>;

const translationsMap: Record<Language, Translations> = {
  en: enTranslations,
  bn: bnTranslations,
};

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
}

interface LanguageProviderState {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
  t: (key: string) => key,
};

const LanguageProviderContext = createContext<LanguageProviderState>(initialState);

export const LanguageProvider: FC<LanguageProviderProps> = ({
  children,
  defaultLanguage = "en",
  storageKey = "app-language",
}) => {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedLang = localStorage.getItem(storageKey) as Language;
    if (storedLang && translationsMap[storedLang]) {
      setLanguageState(storedLang);
    }
  }, [storageKey]);
  
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(storageKey, language);
    }
  }, [language, storageKey, isMounted]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    const effectiveLanguage = isMounted ? language : defaultLanguage;
    let translation = translationsMap[effectiveLanguage]?.[key] || translationsMap['en']?.[key] || key;
    if (params) {
      Object.keys(params).forEach(paramKey => {
        translation = translation.replace(`{${paramKey}}`, String(params[paramKey]));
      });
    }
    return translation;
  }, [language, defaultLanguage, isMounted]);

  const value = {
    language: isMounted ? language : defaultLanguage,
    setLanguage,
    t,
  };

  return (
    <LanguageProviderContext.Provider value={value}>
      {children}
    </LanguageProviderContext.Provider>
  );
};

export const useLanguage = (): LanguageProviderState => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
};
