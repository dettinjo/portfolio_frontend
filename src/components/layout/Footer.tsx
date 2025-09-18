"use client"; // Required for the useTheme hook

import React from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@/i18n/navigation";
import { Heart } from "lucide-react";

export function Footer() {
  const { resolvedTheme } = useTheme();
  const t = useTranslations("Footer");

  // Determine the correct avatar image source based on the current theme
  const avatarSrc =
    resolvedTheme === "dark"
      ? "/images/avatar-dark.png"
      : "/images/avatar-light.png";

  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
        {/* Left Side: The "Made with" quote */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{t("made_with")}</span>

          {/* THE INVERTED HEART ICON */}
          <Heart className="h-5 w-5 fill-background text-foreground" />

          <span>{t("by_me")}</span>
          {/*           <Avatar className="h-6 w-6">
            <AvatarImage src={avatarSrc} alt="Your profile picture" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar> */}
        </div>

        {/* Right Side: Legal Links */}
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
