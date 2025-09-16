import { Terminal, Camera } from "lucide-react";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const softwareDomain =
    process.env.NEXT_PUBLIC_SOFTWARE_DOMAIN || "codeby.joeldettinger.de";
  const photographyDomain =
    process.env.NEXT_PUBLIC_PHOTOGRAPHY_DOMAIN || "photosby.joeldettinger.de";

  return (
    <>
      <MinimalHeader />
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        <div className="grid w-full max-w-4xl grid-cols-1 gap-12 md:grid-cols-2">
          {/* Use standard <a> tags to navigate to the absolute subdomain URLs */}
          <a
            href={`https://${softwareDomain}`}
            className="group flex flex-col items-center justify-center gap-6 rounded-xl border-4 border-foreground p-16 ..."
          >
            <Terminal className="h-28 w-28 text-foreground ..." />
            <span className="text-3xl font-semibold text-foreground">
              {t("code")}
            </span>
          </a>
          <a
            href={`https://${photographyDomain}`}
            className="group flex flex-col items-center justify-center gap-6 rounded-xl border-4 border-foreground p-16 ..."
          >
            <Camera className="h-28 w-28 text-foreground ..." />
            <span className="text-3xl font-semibold text-foreground">
              {t("photos")}
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
