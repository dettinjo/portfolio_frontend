"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{t("made_with")}</span>
          <Heart className="h-5 w-5 fill-background text-foreground" />
          <span>{t("by_me")}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link
            href="/imprint"
            className="transition-colors hover:text-foreground"
          >
            {t("imprint")}
          </Link>
          <Link
            href="/privacy_policy"
            className="transition-colors hover:text-foreground"
          >
            {t("privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
