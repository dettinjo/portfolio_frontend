import { PhotographyHeader } from "@/components/layout/PhotographyHeader";
import { Footer } from "@/components/layout/Footer";
import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "photography.PhotographyPageSEO",
  });

  const fullName = process.env.NEXT_PUBLIC_FULL_NAME || "Photographer";
  const firstName = fullName.split(" ")[0];
  const siteTitle = t("siteName", { name: firstName });

  return {
    title: {
      template: `%s | ${siteTitle}`,
      default: siteTitle,
    },
    icons: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon-photography-light.svg",
        href: "/favicon-photography-light.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon-photography-dark.svg",
        href: "/favicon-photography-dark.svg",
      },
    ],
  };
}

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
