// frontend/src/app/[locale]/page.tsx

import { Terminal, Camera } from "lucide-react";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation"; // 1. Import the i18n Link component

export default function HomePage() {
  const t = useTranslations("HomePage");
  const softwareDomain =
    process.env.NEXT_PUBLIC_SOFTWARE_DOMAIN || "codeby.joeldettinger.de";
  const photographyDomain =
    process.env.NEXT_PUBLIC_PHOTOGRAPHY_DOMAIN || "photosby.joeldettinger.de";

  // 2. Determine if we are in the development environment
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <>
      <MinimalHeader />
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        <div className="grid w-full max-w-4xl grid-cols-1 gap-12 md:grid-cols-2">
          {/* --- CONDITIONAL LINK FOR SOFTWARE --- */}
          {isDevelopment ? (
            <Link
              href="/software"
              className="group flex flex-col items-center justify-center gap-6 rounded-xl border-4 border-foreground p-16 transition-transform hover:scale-105"
            >
              <Terminal className="h-28 w-28 text-foreground" />
              <span className="text-3xl font-semibold text-foreground">
                {t("code")}
              </span>
            </Link>
          ) : (
            <a
              href={`https://${softwareDomain}`}
              className="group flex flex-col items-center justify-center gap-6 rounded-xl border-4 border-foreground p-16 transition-transform hover:scale-105"
            >
              <Terminal className="h-28 w-28 text-foreground" />
              <span className="text-3xl font-semibold text-foreground">
                {t("code")}
              </span>
            </a>
          )}

          {/* --- CONDITIONAL LINK FOR PHOTOGRAPHY --- */}
          {isDevelopment ? (
            <Link
              href="/photography"
              className="group flex flex-col items-center justify-center gap-6 rounded-xl border-4 border-foreground p-16 transition-transform hover:scale-105"
            >
              <Camera className="h-28 w-28 text-foreground" />
              <span className="text-3xl font-semibold text-foreground">
                {t("photos")}
              </span>
            </Link>
          ) : (
            <a
              href={`https://${photographyDomain}`}
              className="group flex flex-col items-center justify-center gap-6 rounded-xl border-4 border-foreground p-16 transition-transform hover:scale-105"
            >
              <Camera className="h-28 w-28 text-foreground" />
              <span className="text-3xl font-semibold text-foreground">
                {t("photos")}
              </span>
            </a>
          )}
        </div>
      </div>
    </>
  );
}
