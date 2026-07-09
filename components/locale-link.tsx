"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPath } from "@/hooks/useTranslate";
import type { ComponentProps } from "react";

/**
 * Drop-in for next/link that keeps internal navigation inside the current
 * locale: on /fr/* it prefixes internal hrefs with /fr, etc. Leaves external,
 * mailto, tel, and anchor links untouched.
 */
export function LocaleLink({ href, ...props }: ComponentProps<typeof Link>) {
  const pathname = usePathname() || "/";
  const locale = localeFromPath(pathname);

  let finalHref = href;
  if (typeof href === "string" && href.startsWith("/") && locale !== "en") {
    finalHref = `/${locale}${href === "/" ? "" : href}`;
  }

  return <Link href={finalHref} {...props} />;
}
