import { SoftwareHeader } from "@/components/layout/SoftwareHeader";
import { Footer } from "@/components/layout/Footer";
import React from "react";

// The Props type MUST match the parent's structure
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// The component MUST be `async`.
export default async function SoftwarePageLayout({ children, params }: Props) {
  // We MUST await the params, even if we don't use the locale directly here.
  // This satisfies the type system and prevents rendering before the locale is known.
  await params;

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <SoftwareHeader />
      <main className="flex-1 container mx-auto py-8">{children}</main>
      <Footer />
    </div>
  );
}
