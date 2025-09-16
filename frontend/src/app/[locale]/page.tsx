"use client"; // This page uses the `useTranslations` hook, so it must be a client component.

import { Terminal, Camera } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation"; // Use the special i18n-aware Link component
import { MinimalHeader } from "@/components/layout/MinimalHeader";

// This is your new "root" page, which lives at `/de`, `/en`, etc.
export default function LocaleHomePage() {
  const t = useTranslations("HomePage");

  return (
    <>
      <MinimalHeader />
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        <div className="grid w-full max-w-4xl grid-cols-1 gap-12 md:grid-cols-2">
          {/* 
            This i18n-aware Link component correctly navigates to /de/software or /en/software
            based on the current locale.
          */}
          <Link
            href="/software"
            className="group flex flex-col items-center justify-center gap-6 rounded-xl border-4 border-foreground p-16 transition-colors duration-300 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-4 focus:ring-offset-background"
          >
            <Terminal
              className="h-28 w-28 text-foreground transition-transform duration-300 group-hover:scale-110"
              strokeWidth={1.25}
            />
            <span className="text-3xl font-semibold text-foreground">
              {t("code")}
            </span>
          </Link>

          <Link
            href="/photography"
            className="group flex flex-col items-center justify-center gap-6 rounded-xl border-4 border-foreground p-16 transition-colors duration-300 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-4 focus:ring-offset-background"
          >
            <Camera
              className="h-28 w-28 text-foreground transition-transform duration-300 group-hover:scale-110"
              strokeWidth={1.25}
            />
            <span className="text-3xl font-semibold text-foreground">
              {t("photos")}
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
