// portfolio-frontend/src/app/[locale]/page.tsx

import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link"; // Use standard Next.js Link
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { Footer } from "@/components/layout/Footer";
import { Terminal, Camera } from "lucide-react";

// SEO Metadata for the landing page
export async function generateMetadata(): Promise<Metadata> {
  return {
    icons: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon-home-light.svg",
        href: "/favicon-home-light.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon-home-dark.svg",
        href: "/favicon-home-dark.svg",
      },
    ],
  };
}

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  const softwareDomain = process.env.NEXT_PUBLIC_SOFTWARE_DOMAIN;
  const photographyDomain = process.env.NEXT_PUBLIC_PHOTOGRAPHY_DOMAIN;

  const linkClassName =
    "group flex flex-col items-center justify-center gap-6 rounded-xl bg-transparent p-16 transition-all duration-300 text-foreground hover:scale-105 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <MinimalHeader />
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto flex min-h-screen items-center justify-center">
          <div className="grid w-full max-w-4xl grid-cols-1 gap-12 md:grid-cols-2">
            {/* Software Link */}
            <Link
              href={`https://${softwareDomain}`}
              className={linkClassName}
              prefetch={false}
            >
              <Terminal className="h-28 w-28" />
              <span className="text-3xl font-semibold">{t("code")}</span>
            </Link>

            {/* Photography Link */}
            <Link
              href={`https://${photographyDomain}`}
              className={linkClassName}
              prefetch={false}
            >
              <Camera className="h-28 w-28" />
              <span className="text-3xl font-semibold">{t("photos")}</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
