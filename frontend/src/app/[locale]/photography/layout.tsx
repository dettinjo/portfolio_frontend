import { PhotographyHeader } from "@/components/layout/PhotographyHeader";
import { Footer } from "@/components/layout/Footer";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// THE FIX: We accept `params` but don't use it.
export default async function PhotographyPageLayout({
  children,
  params,
}: Props) {
  // Awaiting the promise is still necessary.
  await params;

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <PhotographyHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
