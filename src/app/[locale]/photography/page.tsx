import { getTranslations } from "next-intl/server";
// 1. Import the new client component that will contain the tabs
import { PhotographyTabs } from "@/components/sections/photography/PhotographyTabs";
import { ProfileHeaderSection } from "@/components/sections/photography/ProfileHeaderSection";
import { profileData, albumsData, testimonialsData } from "@/lib/mock-data";

export default async function PhotographyPage() {
  const t = await getTranslations("photography.PhotographyPage");

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 md:py-24">
      <ProfileHeaderSection
        name={profileData.name}
        bio={t("profileBio")}
        avatarSrc={profileData.avatarSrc}
      />

      {/* 2. Render the new client component, passing down data and translations */}
      <PhotographyTabs
        albums={albumsData}
        testimonials={testimonialsData}
        translations={{
          feed: t("tabs.feed"),
          services: t("tabs.services"),
          testimonials: t("tabs.testimonials"),
          contact: t("tabs.contact"),
        }}
      />
    </div>
  );
}
