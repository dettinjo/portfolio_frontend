"use client"; // This component now contains client components, so this is required.

import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle"; // 1. Import the LanguageToggle

export function MinimalHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 p-4">
      <div className="container mx-auto flex justify-end">
        {/* 2. Add a flex container for both toggles */}
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
