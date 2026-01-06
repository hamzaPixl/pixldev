"use client";

import { useState, useEffect, useCallback } from "react";
import { translations, SupportedLanguages } from "@/lib/translations";

const LANGUAGE_STORAGE_KEY = "app-language";
const DEFAULT_LANGUAGE: SupportedLanguages = "en";

export function useTranslate() {
  const [currentLanguage, setCurrentLanguage] =
    useState<SupportedLanguages>(DEFAULT_LANGUAGE);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize language from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem(
        LANGUAGE_STORAGE_KEY,
      ) as SupportedLanguages;
      if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
        setCurrentLanguage(savedLanguage);
      } else {
        // Detect browser language if no saved language
        const browserLanguage = navigator.language.split(
          "-",
        )[0] as SupportedLanguages;
        if (Object.keys(translations).includes(browserLanguage)) {
          setCurrentLanguage(browserLanguage);
        }
      }
      setIsInitialized(true);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
    }
  }, [currentLanguage, isInitialized]);

  // Function to change language
  const setLanguage = useCallback((language: SupportedLanguages) => {
    setCurrentLanguage(language);
  }, []);

  // Helper function to get raw value by key
  const getValue = useCallback(
    (key: string): unknown => {
      const keys = key.split(".");
      let value: Record<string, unknown> | unknown = translations[currentLanguage];

      for (const k of keys) {
        if (value && typeof value === "object" && !Array.isArray(value) && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          // Fallback to English if key not found in current language
          value = translations["en"];
          for (const fallbackKey of keys) {
            if (value && typeof value === "object" && !Array.isArray(value) && fallbackKey in value) {
              value = (value as Record<string, unknown>)[fallbackKey];
            } else {
              return undefined;
            }
          }
          break;
        }
      }

      return value;
    },
    [currentLanguage],
  );

  // Function to get translation by key (returns string)
  const t = useCallback(
    (key: string): string => {
      const value = getValue(key);
      return typeof value === "string" ? value : key;
    },
    [getValue],
  );

  // Function to get array translation by key
  const tArray = useCallback(
    (key: string): string[] => {
      const value = getValue(key);
      return Array.isArray(value) ? value : [];
    },
    [getValue],
  );

  // Function to get object translation by key
  const tObject = useCallback(
    <T = unknown>(key: string): T | undefined => {
      const value = getValue(key);
      return value as T | undefined;
    },
    [getValue],
  );

  return {
    currentLanguage,
    setLanguage,
    t,
    tArray,
    tObject,
    isInitialized,
    supportedLanguages: Object.keys(translations) as SupportedLanguages[],
  };
}
