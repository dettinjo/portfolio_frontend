"use client";

import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "@/i18n/navigation";
import { useAlternateLinks } from "@/context/AlternateLinksProvider";

export function LanguageToggle() {
  const locale = useLocale();
  const { alternateSlugs } = useAlternateLinks();

  const nextLocale = locale === "de" ? "en" : "de";

  // If the context provides a slug for the next language, render a smart Link.
  if (alternateSlugs && alternateSlugs[nextLocale]) {
    return (
      <Button
        asChild
        variant="ghost"
        size="icon"
        aria-label={`Switch to ${nextLocale.toUpperCase()}`}
      >
        <Link href={alternateSlugs[nextLocale]} locale={nextLocale}>
          <span className="text-sm font-semibold">
            {nextLocale.toUpperCase()}
          </span>
        </Link>
      </Button>
    );
  }

  // Fallback for pages that don't provide alternate slugs (e.g., homepage).
  const toggleLanguageWithReload = () => {
    const date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${nextLocale};expires=${date.toUTCString()};path=/`;
    // A simple reload is enough. The middleware will catch the new cookie and rerender.
    window.location.reload();
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguageWithReload}
      aria-label={`Switch to ${nextLocale.toUpperCase()}`}
    >
      <span className="text-sm font-semibold">{nextLocale.toUpperCase()}</span>
    </Button>
  );
}
