import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { vi } from './locales/vi';
import { en } from './locales/en';

export type SupportedLocale = 'vi' | 'en';

type Translations = typeof vi;

interface I18nContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  toggleLocale: () => void;
  t: (path: string, params?: Record<string, string | number>) => string;
  isVi: boolean;
  isEn: boolean;
}

const dictionaries: Record<SupportedLocale, Translations> = {
  vi,
  en: en as unknown as Translations,
};

const I18nContext = createContext<I18nContextType | null>(null);

const STORAGE_KEY = 'lumina_app_locale';

export const I18nProvider: React.FC<{ children: React.ReactNode; defaultLocale?: SupportedLocale }> = ({
  children,
  defaultLocale = 'vi',
}) => {
  const [locale, setLocaleState] = useState<SupportedLocale>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as SupportedLocale;
      if (saved && (saved === 'vi' || saved === 'en')) {
        return saved;
      }
    }
    return defaultLocale;
  });

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale;
    }
  };

  const toggleLocale = () => {
    setLocale(locale === 'vi' ? 'en' : 'vi');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const t = useMemo(() => {
    return (path: string, params?: Record<string, string | number>): string => {
      const keys = path.split('.');
      let current: any = dictionaries[locale];

      for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
          current = current[key];
        } else {
          // Fallback to Vietnamese if key is missing
          let fallback: any = dictionaries.vi;
          for (const fbKey of keys) {
            if (fallback && typeof fallback === 'object' && fbKey in fallback) {
              fallback = fallback[fbKey];
            } else {
              return path;
            }
          }
          current = fallback;
          break;
        }
      }

      if (typeof current !== 'string') {
        return path;
      }

      if (params) {
        return Object.entries(params).reduce((str, [paramKey, paramValue]) => {
          return str.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue));
        }, current);
      }

      return current;
    };
  }, [locale]);

  const value: I18nContextType = {
    locale,
    setLocale,
    toggleLocale,
    t,
    isVi: locale === 'vi',
    isEn: locale === 'en',
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
