"use client";

import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import React from "react";

export function LanguageToggle() {
  const locale = useLocale();

  const toggleLanguage = () => {
    const nextLocale = locale === "de" ? "en" : "de";
    const date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${nextLocale};expires=${date.toUTCString()};path=/`;
    window.location.reload();
  };

  return (
    // --- THIS IS THE FIX ---
    // Change variant="outline" to variant="ghost"
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      <span className="text-sm font-semibold">{locale.toUpperCase()}</span>
    </Button>
  );
}
