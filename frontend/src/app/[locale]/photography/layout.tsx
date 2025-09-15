import { PhotographyHeader } from "@/components/layout/PhotographyHeader";
import { Footer } from "@/components/layout/Footer";
import React from "react";

// Define the correct props type where params is a Promise
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// The component MUST be async
export default async function PhotographyPageLayout({
  children,
  params,
}: Props) {
  // We don't need the locale here, but we MUST await params to satisfy the type.
  await params;

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <PhotographyHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
