"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const nextLocale = locale === "de" ? "en" : "de";

    // THE FINAL FIX: We use `startTransition` to tell React this is a
    // non-urgent update that should trigger a server data refetch.
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleLanguage}
      disabled={isPending} // Disable the button during the transition
      aria-label="Toggle language"
    >
      <span className="text-sm font-semibold">{locale.toUpperCase()}</span>
    </Button>
  );
}
