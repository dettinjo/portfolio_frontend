import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { LeaveReviewForm } from "@/components/sections/photography/LeaveReviewForm";

// This function now correctly awaits the params object before using its properties.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params; // Await the promise to get the locale
  const t = await getTranslations({ locale, namespace: "photography" });
  return {
    title: t("LeaveReviewPage.title"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function LeaveReviewPage() {
  return <LeaveReviewForm />;
}
