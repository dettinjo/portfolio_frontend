"use client";

import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import React from "react";
import { useAlternateLinks } from "@/context/AlternateLinksProvider";

export function LanguageToggle() {
  const currentLocale = useLocale();
  const { alternateSlugs } = useAlternateLinks();

  const nextLocale = currentLocale === "de" ? "en" : "de";

  const handleLanguageSwitch = () => {
    // --- THIS IS THE DEFINITIVE FIX ---

    // 1. Prepare cookie attributes
    const date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000); // Expires in 1 year
    const expires = `expires=${date.toUTCString()}`;
    const path = "path=/";

    // 2. Get the root domain from environment variables
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "";

    // 3. Construct the base cookie string
    let cookieString = `NEXT_LOCALE=${nextLocale};${expires};${path}`;

    // 4. IMPORTANT: Add the Domain attribute ONLY if not on localhost.
    // Browsers will reject cookies with a `domain` attribute for localhost.
    // We check if the current hostname ends with the root domain.
    if (window.location.hostname.endsWith(rootDomain)) {
      // The leading dot makes the cookie valid for the root domain and all subdomains.
      cookieString += `;domain=.${rootDomain}`;
    }

    // 5. Set the final, correctly scoped cookie.
    document.cookie = cookieString;

    // 6. Navigate as before.
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
