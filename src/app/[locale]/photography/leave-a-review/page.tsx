import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { LeaveReviewForm } from "@/components/sections/photography/LeaveReviewForm";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
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
