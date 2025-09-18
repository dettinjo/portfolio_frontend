import { PhotographyHeader } from "@/components/layout/PhotographyHeader";
import { Footer } from "@/components/layout/Footer";
import React from "react";
import { Metadata } from "next";

// The Props type MUST match the parent's structure
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Photos by Joel",
  description: "Photography by Joel Dettinger",
  icons: {
    icon: {
      url: "/favicon-photography.svg",
      type: "image/svg+xml",
    },
    shortcut: "/favicon-photography.svg",
  },
};

// The component MUST be `async`.
export default async function PhotographyPageLayout({
  children,
  params,
}: Props) {
  // We MUST await the params here as well.
  await params;

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <PhotographyHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
