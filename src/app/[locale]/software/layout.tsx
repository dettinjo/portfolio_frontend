import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "software.SoftwarePageSEO",
  });

  const fullName = process.env.NEXT_PUBLIC_FULL_NAME || "Developer";
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
}

export default async function SoftwarePageLayout({ children, params }: Props) {
  await params;
  return <>{children}</>;
}
