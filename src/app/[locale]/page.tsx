import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { CollectionPage, WithContext } from "schema-dts";

import { ContactSection } from "@/components/sections/software/ContactSection";
import { HeroSection } from "@/components/sections/software/HeroSection";
import { ProjectsSection } from "@/components/sections/software/ProjectsSection";
import { SkillsSection } from "@/components/sections/software/SkillsSection";
import { ScrollIndicator } from "@/components/ScrollIndicator";
// --- FIX: Import the Skill type for explicit typing ---
import { fetchSoftwareProjects, fetchSkills, type Skill } from "@/lib/strapi";

// ============================================================================
// --- SEO METADATA GENERATION ---
// ============================================================================

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; // Await the promise to get the locale
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
          url: `https://${rootDomain}/og-software.png`, // A dedicated OG image for this page
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
        de: `https://de.${softwareDomain}`, // Adjust if your German domain is different
        "x-default": `https://${softwareDomain}`,
      },
    },
  };
}

// ============================================================================
// --- PAGE COMPONENT ---
// ============================================================================

export default async function DevPage({ params }: Props) {
  const { locale } = await params; // Await the promise to get the locale
  const projectsData = await fetchSoftwareProjects();
  const skillsData = await fetchSkills();
  const t = await getTranslations({
    locale: locale,
    namespace: "software.SoftwareProjectsSection",
  });

  // --- DEFINITIVE FIX for Skills Data & Key Warning ---
  // The logic now correctly handles the flat SkillCategory structure.
  const skills = skillsData
    .filter((cat) => cat && Array.isArray(cat.skills))
    .map((cat) => ({
      category: cat.name,
      // We also add an explicit type to the 'skill' parameter to fix the implicit 'any' error.
      skills: cat.skills.map((skill: Skill) => skill),
    }));

  const cleanProjectsData = projectsData.filter(Boolean);

  const techIconMap: { [key: string]: string } = {};
  skills.forEach((category) => {
    category.skills.forEach((skill) => {
      techIconMap[skill.name] = skill.iconClassName;
    });
  });

  const softwareDomain =
    process.env.NEXT_PUBLIC_SOFTWARE_DOMAIN || "codeby.joeldettinger.de";

  // Create the JSON-LD structured data object
  const jsonLd: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("title"),
    description: t("subtitle"),
    url: `https://${softwareDomain}`,
    mainEntity: {
      "@type": "ItemList",
      // FIX: Access properties directly from the project object
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
      {/* This script injects the structured data into the page's <head> */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroSection />

      <div className="max-w-6xl mx-auto px-6">
        <div className="py-24">
          <ProjectsSection
            projects={cleanProjectsData}
            techIconMap={techIconMap}
          />
        </div>
        <ScrollIndicator href="#skills" />
        <div className="py-24">
          <SkillsSection skills={skills} />
        </div>
        <ScrollIndicator href="#kontakt" />
        <div className="pt-24 pb-64 md:pb-96">
          <ContactSection />
        </div>
      </div>
    </>
  );
}
