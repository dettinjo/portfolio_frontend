import { Terminal, Camera } from "lucide-react";
import { useTranslations } from "next-intl";
// Use the CORRECT, i18n-aware Link component
import { Link } from "@/i18n/navigation";

export default function LocaleHomePage() {
  const t = useTranslations("HomePage");

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-12 md:grid-cols-2">
        {/* Use the i18n Link to preserve the locale prefix */}
        <Link
          href="/software"
          className="group flex flex-col items-center justify-center gap-6 rounded-xl border-4 border-foreground p-16 ..."
        >
          <Terminal className="h-28 w-28 text-foreground ..." />
          <span className="text-3xl font-semibold text-foreground">
            {t("code")}
          </span>
        </Link>
        <Link
          href="/photography"
          className="group flex flex-col items-center justify-center gap-6 rounded-xl border-4 border-foreground p-16 ..."
        >
          <Camera className="h-28 w-28 text-foreground ..." />
          <span className="text-3xl font-semibold text-foreground">
            {t("photos")}
          </span>
        </Link>
      </div>
    </div>
  );
}
