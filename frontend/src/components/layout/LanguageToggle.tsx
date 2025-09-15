"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation"; // Use the i18n-aware hooks
import { Button } from "@/components/ui/button";
import React from "react";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // This function is triggered when the button is clicked.
  const toggleLanguage = () => {
    // Determine the next language with a simple ternary operator.
    const nextLocale = locale === "de" ? "en" : "de";

    // Use the i18n-aware router to switch to the new locale.
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button
      // Use the "outline" variant to match the ThemeToggle's style
      variant="outline"
      // Use the "icon" size for a compact, square button, just like the ThemeToggle
      size="icon"
      onClick={toggleLanguage}
      aria-label="Toggle language" // Important for accessibility
    >
      {/* 
        This is the key part for the display.
        It simply shows the current locale, converted to uppercase.
      */}
      <span className="text-sm font-semibold">{locale.toUpperCase()}</span>
    </Button>
  );
}
