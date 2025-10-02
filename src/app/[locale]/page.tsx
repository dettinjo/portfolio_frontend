// portfolio-frontend/src/app/[locale]/page.tsx
import { getTranslations } from "next-intl/server";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { Footer } from "@/components/layout/Footer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Code, Camera } from "lucide-react";
import Link from "next/link"; // Use standard Next.js Link for external/cross-domain URLs
import { Metadata } from "next";

// SEO Metadata for the landing page
export async function generateMetadata(): Promise<Metadata> {
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "joeldettinger.de";
  return {
    title: "Joel Dettinger - Software & Photography",
    description:
      "The central portfolio hub for Joel Dettinger, showcasing professional work in software development and photography.",
    alternates: {
      canonical: `https://${rootDomain}`,
      languages: {
        en: `https://${rootDomain}`,
        de: `https://${rootDomain}`, // Both languages are served from the same root domain
        "x-default": `https://${rootDomain}`,
      },
    },
  };
}

// The new landing page component
export default async function HomePage() {
  const t = await getTranslations("HomePage");
  const softwareDomain =
    process.env.NEXT_PUBLIC_SOFTWARE_DOMAIN || "codeby.joeldettinger.de";
  const photographyDomain =
    process.env.NEXT_PUBLIC_PHOTOGRAPHY_DOMAIN || "photosby.joeldettinger.de";

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <MinimalHeader />
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 md:flex-row">
          {/* Software Card */}
          <Link href={`https://${softwareDomain}`} className="w-full max-w-sm">
            <Card className="text-center transition-transform duration-300 hover:-translate-y-2 focus-visible:-translate-y-2">
              <CardHeader className="items-center p-8">
                <Code className="h-16 w-16 mb-4" />
                <CardTitle className="text-3xl font-bold">
                  {t("code")}
                </CardTitle>
                <CardDescription className="text-lg">
                  Software Portfolio
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* Photography Card */}
          <Link
            href={`https://${photographyDomain}`}
            className="w-full max-w-sm"
          >
            <Card className="text-center transition-transform duration-300 hover:-translate-y-2 focus-visible:-translate-y-2">
              <CardHeader className="items-center p-8">
                <Camera className="h-16 w-16 mb-4" />
                <CardTitle className="text-3xl font-bold">
                  {t("photos")}
                </CardTitle>
                <CardDescription className="text-lg">
                  Photography Portfolio
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
