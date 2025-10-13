"use client";

import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import React from "react";
import { useAlternateLinks } from "@/context/AlternateLinksProvider";
import { usePathname } from "@/i18n/navigation";

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const { alternateSlugs } = useAlternateLinks();

  const nextLocale = locale === "de" ? "en" : "de";

  const handleLanguageSwitch = () => {
    // 1. Set the language cookie for the next locale.
    const date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000); // Expires in 1 year
    document.cookie = `NEXT_LOCALE=${nextLocale};expires=${date.toUTCString()};path=/`;

    // 2. Check if we have a specific translated slug for this page.
    if (alternateSlugs && alternateSlugs[nextLocale]) {
      // If yes, perform a full navigation to that new URL.
      window.location.href = alternateSlugs[nextLocale];
    } else {
      // If not (e.g., on the homepage), just reload the current page.
      // The middleware will see the new cookie and serve the correct content.
      window.location.href = pathname;
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleLanguageSwitch}
      aria-label={`Switch to ${nextLocale.toUpperCase()}`}
    >
      {/* This now correctly shows the language you will switch TO. */}
      <span className="text-sm font-semibold">{nextLocale.toUpperCase()}</span>
    </Button>
  );
}
