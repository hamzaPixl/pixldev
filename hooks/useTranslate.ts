"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { translations, SupportedLanguages } from "@/lib/translations";

const LOCALES: SupportedLanguages[] = ["en", "fr", "nl"];

/** Derive the active locale from the URL path (/fr/... , /nl/... , else en). */
export function localeFromPath(pathname: string): SupportedLanguages {
  const seg = pathname.split("/")[1];
  return (LOCALES as string[]).includes(seg) && seg !== "en"
    ? (seg as SupportedLanguages)
    : "en";
}

/** Swap the locale prefix on a path, keeping the rest of the route. */
export function pathForLocale(pathname: string, locale: SupportedLanguages): string {
  const parts = pathname.split("/");
  const hasPrefix = (LOCALES as string[]).includes(parts[1]) && parts[1] !== "en";
  const rest = hasPrefix ? "/" + parts.slice(2).join("/") : pathname;
  const clean = rest === "/" ? "" : rest;
  return locale === "en" ? clean || "/" : `/${locale}${clean}`;
}

export function useTranslate() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const currentLanguage = localeFromPath(pathname);

  // Switching language = navigating to the same route under the target locale.
  const setLanguage = useCallback(
    (language: SupportedLanguages) => {
      router.push(pathForLocale(pathname, language));
    },
    [pathname, router],
  );

  const getValue = useCallback(
    (key: string): unknown => {
      const keys = key.split(".");
      let value: unknown = translations[currentLanguage];
      for (const k of keys) {
        if (value && typeof value === "object" && !Array.isArray(value) && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          // Fallback to English if the key is missing in the current language
          value = translations["en"];
          for (const fk of keys) {
            if (value && typeof value === "object" && !Array.isArray(value) && fk in value) {
              value = (value as Record<string, unknown>)[fk];
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

  const t = useCallback(
    (key: string): string => {
      const value = getValue(key);
      return typeof value === "string" ? value : key;
    },
    [getValue],
  );

  const tArray = useCallback(
    (key: string): string[] => {
      const value = getValue(key);
      return Array.isArray(value) ? value : [];
    },
    [getValue],
  );

  const tObject = useCallback(
    <T = unknown>(key: string): T | undefined => getValue(key) as T | undefined,
    [getValue],
  );

  return {
    currentLanguage,
    setLanguage,
    t,
    tArray,
    tObject,
    isInitialized: true,
    supportedLanguages: LOCALES,
  };
}
