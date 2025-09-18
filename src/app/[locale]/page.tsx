// frontend/src/app/[locale]/page.tsx

import { Terminal, Camera } from "lucide-react";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const softwareDomain =
    process.env.NEXT_PUBLIC_SOFTWARE_DOMAIN || "codeby.joeldettinger.de";
  const photographyDomain =
    process.env.NEXT_PUBLIC_PHOTOGRAPHY_DOMAIN || "photosby.joeldettinger.de";

  const isDevelopment = process.env.NODE_ENV === "development";

  // --- THIS IS THE DEFINITIVE FIX ---
  // We set all color logic on the parent link.
  // 1. `text-foreground`: Sets the default color for the icon and text inside.
  // 2. `hover:bg-foreground`: Inverts the background color on hover.
  // 3. `hover:text-background`: Inverts the text/icon color on hover.
  // The children will now reliably inherit these changes.
  const linkClassName =
    "group flex flex-col items-center justify-center gap-6 rounded-xl p-16 transition-all duration-300 text-foreground hover:scale-105 hover:bg-foreground hover:text-background";

  return (
    <>
      <MinimalHeader />
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        <div className="grid w-full max-w-4xl grid-cols-1 gap-12 md:grid-cols-2">
          {/* --- CONDITIONAL LINK FOR SOFTWARE --- */}
          {isDevelopment ? (
            <Link href="/software" className={linkClassName}>
              <Terminal className="h-28 w-28" />
              <span className="text-3xl font-semibold">{t("code")}</span>
            </Link>
          ) : (
            <a href={`https://${softwareDomain}`} className={linkClassName}>
              <Terminal className="h-28 w-28" />
              <span className="text-3xl font-semibold">{t("code")}</span>
            </a>
          )}

          {/* --- CONDITIONAL LINK FOR PHOTOGRAPHY --- */}
          {isDevelopment ? (
            <Link href="/photography" className={linkClassName}>
              <Camera className="h-28 w-28" />
              <span className="text-3xl font-semibold">{t("photos")}</span>
            </Link>
          ) : (
            <a href={`https://${photographyDomain}`} className={linkClassName}>
              <Camera className="h-28 w-28" />
              <span className="text-3xl font-semibold">{t("photos")}</span>
            </a>
          )}
        </div>
      </div>
    </>
  );
}
