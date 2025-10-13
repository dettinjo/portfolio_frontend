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
  icons: [
    {
      media: "(prefers-color-scheme: light)",
      url: "/favicon-software-light.svg",
      href: "/favicon-software-light.svg",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/favicon-software-dark.svg",
      href: "/favicon-software-dark.svg",
    },
  ],
};

export default async function SoftwarePageLayout({ children, params }: Props) {
  await params;
  return <>{children}</>;
}
