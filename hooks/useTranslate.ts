'use client';

import { useState, useEffect, useCallback } from 'react';
import { translations, SupportedLanguages } from '@/lib/translations';

const LANGUAGE_STORAGE_KEY = 'pixl-language';
const DEFAULT_LANGUAGE: SupportedLanguages = 'en';

export function useTranslate() {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguages>(DEFAULT_LANGUAGE);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize language from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as SupportedLanguages;
      if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
        setCurrentLanguage(savedLanguage);
      } else {
        // Detect browser language if no saved language
        const browserLanguage = navigator.language.split('-')[0] as SupportedLanguages;
        if (Object.keys(translations).includes(browserLanguage)) {
          setCurrentLanguage(browserLanguage);
        }
      }
      setIsInitialized(true);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
    }
  }, [currentLanguage, isInitialized]);

  // Function to change language
  const setLanguage = useCallback((language: SupportedLanguages) => {
    setCurrentLanguage(language);
  }, []);

  // Function to get translation by key
  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found in current language
        value = translations['en'];
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found in any language
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  }, [currentLanguage]);

  return {
    currentLanguage,
    setLanguage,
    t,
    isInitialized,
    supportedLanguages: Object.keys(translations) as SupportedLanguages[],
  };
}