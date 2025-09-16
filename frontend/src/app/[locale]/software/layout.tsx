import { SoftwareHeader } from "@/components/layout/SoftwareHeader";
import { Footer } from "@/components/layout/Footer";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// THE FIX: We accept `params` but don't use it, which is valid.
export default async function SoftwarePageLayout({ children, params }: Props) {
  // Awaiting the promise is still necessary to match the expected type.
  await params;

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <SoftwareHeader />
      <main className="flex-1 container mx-auto py-8">{children}</main>
      <Footer />
    </div>
  );
}
