import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { CollectionPage, WithContext } from "schema-dts";

import { ContactSection } from "@/components/sections/software/ContactSection";
import { HeroSection } from "@/components/sections/software/HeroSection";
import { ProjectsSection } from "@/components/sections/software/ProjectsSection";
import { SkillsSection } from "@/components/sections/software/SkillsSection";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import {
  fetchSoftwareProjects,
  fetchSkillCategories,
  getTechIconMap,
  type Skill,
} from "@/lib/strapi";

// ============================================================================
// --- SEO METADATA GENERATION ---
// ============================================================================

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: "software.SoftwarePageSEO",
  });
  const softwareDomain =
    process.env.NEXT_PUBLIC_SOFTWARE_DOMAIN || "codeby.joeldettinger.de";
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "joeldettinger.de";

  return {
    title: t("siteName"),
    description: t("description"),
    openGraph: {
      title: t("siteName"),
      description: t("description"),
      url: `https://${softwareDomain}`,
      siteName: "Code by Joel",
      images: [
        {
          url: `https://${rootDomain}/og-software.png`,
          width: 1200,
          height: 630,
          alt: "An overview of software projects by Joel Dettinger",
        },
      ],
      type: "website",
      locale: locale,
    },
    alternates: {
      canonical: `https://${softwareDomain}`,
      languages: {
        en: `https://${softwareDomain}`,
        de: `https://de.${softwareDomain}`,
        "x-default": `https://${softwareDomain}`,
      },
    },
  };
}

// ============================================================================
// --- PAGE COMPONENT ---
// ============================================================================

export default async function DevPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [
    projectsData,
    skillsDataForDisplay,
    techIconMap, // This is now guaranteed to be correct
  ] = await Promise.all([
    fetchSoftwareProjects(locale),
    fetchSkillCategories(locale),
    getTechIconMap(),
  ]);

  console.log(
    "--- [DEBUG] 5. techIconMap received by Software Page:",
    JSON.stringify(techIconMap, null, 2)
  );

  const t = await getTranslations({
    locale: locale,
    namespace: "software.SoftwareProjectsSection",
  });

  const skillsForDisplay = skillsDataForDisplay
    .filter((cat) => cat && Array.isArray(cat.skills))
    .map((cat) => ({
      category: cat.name,
      skills: cat.skills.map((skill: Skill) => skill),
    }));

  const cleanProjectsData = projectsData.filter(Boolean);

  const softwareDomain =
    process.env.NEXT_PUBLIC_SOFTWARE_DOMAIN || "codeby.joeldettinger.de";

  const jsonLd: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("title"),
    description: t("subtitle"),
    url: `https://${softwareDomain}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: cleanProjectsData.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        url: `https://${softwareDomain}/${project.slug}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <div className="max-w-6xl mx-auto px-6">
        <div className="py-24">
          <ProjectsSection
            projects={cleanProjectsData}
            techIconMap={techIconMap} // Pass the correctly built map
          />
        </div>
        <ScrollIndicator href="#skills" />
        <div className="py-24">
          {/* Use the locale-specific data for display */}
          <SkillsSection skills={skillsForDisplay} />
        </div>
        <ScrollIndicator href="#kontakt" />
        <div className="pt-24 pb-64 md:pb-96">
          <ContactSection />
        </div>
      </div>
    </>
  );
}
