"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";

export function Footer() {
  const t = useTranslations("Footer");
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{t("made_with")}</span>
          <Heart className="h-5 w-5 fill-foreground text-foreground" />
          <span>{t("by_me")}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a
            href={`https://${rootDomain}/imprint`}
            className="transition-colors hover:text-foreground"
          >
            {t("imprint")}
          </a>
          <a
            href={`https://${rootDomain}/privacy_policy`}
            className="transition-colors hover:text-foreground"
          >
            {t("privacy")}
          </a>
        </div>
      </div>
    </footer>
  );
}
