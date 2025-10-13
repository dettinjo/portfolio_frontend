"use client";

import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import React from "react";
import { useAlternateLinks } from "@/context/AlternateLinksProvider";
import { usePathname } from "@/i18n/navigation";

export function LanguageToggle() {
  const currentLocale = useLocale();
  const { alternateSlugs } = useAlternateLinks();
  const pathname = usePathname();

  const nextLocale = currentLocale === "de" ? "en" : "de";

  const handleLanguageSwitch = () => {
    const date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${nextLocale};expires=${date.toUTCString()};path=/`;

    if (alternateSlugs && alternateSlugs[nextLocale]) {
      window.location.href = alternateSlugs[nextLocale];
    } else {
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
      <span className="text-sm font-semibold">
        {currentLocale.toUpperCase()}
      </span>
    </Button>
  );
}
