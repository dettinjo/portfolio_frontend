import { PhotographyHeader } from "@/components/layout/PhotographyHeader";
import { Footer } from "@/components/layout/Footer";
import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

// --- THIS IS THE DEFINITIVE FIX ---

// We REMOVE the custom `type Props = { ... }` entirely.

// The `generateMetadata` function's props are typed inline.
// This explicitly tells TypeScript what to expect for this function.
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: "photography.PhotographyPageSEO",
  });

  return {
    title: {
      template: `%s | ${t("siteName")}`,
      default: t("siteName"),
    },
    description: "Photography by Joel Dettinger",
    icons: {
      icon: { url: "/favicon-photography.svg", type: "image/svg+xml" },
      shortcut: "/favicon-photography.svg",
    },
  };
}

// The Layout component's props are also typed inline.
// Since it doesn't use the `params` prop, we only need to define `children`.
// This avoids any conflict with Next.js's internal `LayoutProps`.
export default function PhotographyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <PhotographyHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
