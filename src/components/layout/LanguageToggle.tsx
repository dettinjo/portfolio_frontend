"use client";

import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import React from "react";

export function LanguageToggle() {
  const locale = useLocale();

  const toggleLanguage = () => {
    const nextLocale = locale === "de" ? "en" : "de";

    // Set the cookie to expire in one year
    const date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${nextLocale};expires=${date.toUTCString()};path=/`;

    // Force a full page reload to make the server read the new cookie
    window.location.reload();
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      <span className="text-sm font-semibold">{locale.toUpperCase()}</span>
    </Button>
  );
}
