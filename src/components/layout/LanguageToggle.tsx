"use client";

import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import React from "react";
import { usePathname, Link } from "@/i18n/navigation";
import { useAlternateLinks } from "@/context/AlternateLinksProvider";

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const { alternateSlugs } = useAlternateLinks();

  const nextLocale = locale === "de" ? "en" : "de";

  if (alternateSlugs && alternateSlugs[nextLocale]) {
    return (
      <Button asChild variant="ghost" size="icon" aria-label="Toggle language">
        <Link href={alternateSlugs[nextLocale]} locale={nextLocale}>
          <span className="text-sm font-semibold">
            {nextLocale.toUpperCase()}
          </span>
        </Link>
      </Button>
    );
  }

  const toggleLanguageWithReload = () => {
    const date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${nextLocale};expires=${date.toUTCString()};path=/`;
    window.location.href = pathname;
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguageWithReload}
      aria-label="Toggle language"
    >
      <span className="text-sm font-semibold">{nextLocale.toUpperCase()}</span>
    </Button>
  );
}
