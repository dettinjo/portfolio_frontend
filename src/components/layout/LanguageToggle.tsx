"use client";

import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import React from "react";
import { useAlternateLinks } from "@/context/AlternateLinksProvider";

export function LanguageToggle() {
  // 1. Get the CURRENT active locale for this page (e.g., 'en').
  const currentLocale = useLocale();
  const { alternateSlugs } = useAlternateLinks();

  // 2. Determine the TARGET locale we want to switch to.
  const nextLocale = currentLocale === "de" ? "en" : "de";

  const handleLanguageSwitch = () => {
    // 3. Set the language cookie to our desired TARGET locale.
    const date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000); // Expires in 1 year
    document.cookie = `NEXT_LOCALE=${nextLocale};expires=${date.toUTCString()};path=/`;

    // 4. Navigate to the correct URL.
    if (alternateSlugs && alternateSlugs[nextLocale]) {
      // If a specific translated slug exists, navigate directly to it.
      window.location.href = alternateSlugs[nextLocale];
    } else {
      // Otherwise (e.g., on the homepage), just reload. The middleware will handle the rest.
      window.location.reload();
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleLanguageSwitch}
      aria-label={`Switch language to ${nextLocale.toUpperCase()}`}
    >
      {/* 5. The button's text now correctly displays the TARGET locale. */}
      <span className="text-sm font-semibold">{nextLocale.toUpperCase()}</span>
    </Button>
  );
}
