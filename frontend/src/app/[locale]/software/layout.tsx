import { SoftwareHeader } from "@/components/layout/SoftwareHeader";
import { Footer } from "@/components/layout/Footer";
import React from "react";

// Define the correct props type where params is a Promise
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// The component MUST be async
export default async function SoftwarePageLayout({ children, params }: Props) {
  // We don't need the locale here, but we MUST await params to satisfy the type.
  await params;

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <SoftwareHeader />
      <main className="flex-1 container mx-auto py-8">{children}</main>
      <Footer />
    </div>
  );
}
