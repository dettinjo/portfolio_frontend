import { SoftwareHeader } from "@/components/layout/SoftwareHeader";
import { Footer } from "@/components/layout/Footer";
import React from "react";
import { Metadata } from "next";

// The Props type MUST match the parent's structure
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Code by Joel",
  description: "Software Development by Joel Dettinger",
  icons: {
    icon: {
      url: "/favicon-software.svg",
      type: "image/svg+xml",
    },
    shortcut: "/favicon-software.svg",
  },
};

export default async function SoftwarePageLayout({ children, params }: Props) {
  await params;
  return <>{children}</>;
}
