import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { CollectionPage, WithContext } from "schema-dts";

// Import your page sections and components
import { ContactSection } from "@/components/sections/software/ContactSection";
import { HeroSection } from "@/components/sections/software/HeroSection";
import { ProjectsSection } from "@/components/sections/software/ProjectsSection";
import { SkillsSection } from "@/components/sections/software/SkillsSection";
import { ScrollIndicator } from "@/components/ScrollIndicator";

// ============================================================================
// --- MOCK DATA & API FUNCTIONS ---
// In a real application, this data and these functions would live in a
// separate directory (e.g., /src/lib/strapi.ts) and fetch data from your CMS.
// ============================================================================

const projectsData = [
  {
    id: 1,
    slug: "portfolio-website-v2",
    title: "Portfolio Website",
    description:
      "A dynamic portfolio site built with Next.js, Strapi CMS, and shadcn/ui for a fully customizable experience.",
    tags: ["Next.js", "React", "Strapi", "TypeScript"],
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1280&auto=format&fit=crop",
    projectType: "Full-Stack Web App",
  },
  {
    id: 2,
    slug: "e-commerce-platform-api",
    title: "E-Commerce Platform API",
    description:
      "A robust backend API supporting product management, user authentication, and order processing.",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
    imageUrl:
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1280&auto=format&fit=crop",
    projectType: "Backend & API",
  },
  {
    id: 3,
    slug: "real-time-chat-app",
    title: "Real-Time Chat App",
    description:
      "A web application for instant communication, utilizing WebSockets for seamless real-time interaction.",
    tags: ["React", "Socket.IO", "Node.js"],
    imageUrl:
      "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=1280&auto=format&fit=crop",
    projectType: "Full-Stack Web App",
  },
  {
    id: 4,
    slug: "devops-ci-cd-pipeline",
    title: "DevOps CI/CD Pipeline",
    description:
      "Automating build, test, and deployment processes for a microservices architecture using Docker and GitHub Actions.",
    tags: ["Docker", "GitHub Actions", "CI/CD", "DevOps"],
    imageUrl:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1332&auto=format&fit=crop",
    projectType: "DevOps & Automation",
  },
];

const skillsData = [
  {
    category: "Frontend",
    skills: [
      {
        name: "TypeScript",
        iconClassName: "devicon-typescript-plain",
        level: 5,
        url: "https://www.typescriptlang.org/",
      },
      {
        name: "React",
        iconClassName: "devicon-react-original",
        level: 5,
        url: "https://react.dev/",
      },
      {
        name: "Next.js",
        iconClassName: "devicon-nextjs-plain",
        level: 4,
        url: "https://nextjs.org/",
      },
      {
        name: "Tailwind CSS",
        iconClassName: "devicon-tailwindcss-plain",
        level: 5,
        url: "https://tailwindcss.com/",
      },
      {
        name: "Framer Motion",
        iconClassName: "devicon-framermotion-original",
        level: 3,
        url: "https://www.framer.com/motion/",
      },
      {
        name: "HTML5",
        iconClassName: "devicon-html5-plain",
        level: 5,
        url: "https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5",
      },
    ],
  },
  {
    category: "Backend",
    skills: [
      {
        name: "Node.js",
        iconClassName: "devicon-nodejs-plain",
        level: 4,
        url: "https://nodejs.org/",
      },
      {
        name: "Express.js",
        iconClassName: "devicon-express-original",
        level: 4,
        url: "https://expressjs.com/",
      },
      {
        name: "Python",
        iconClassName: "devicon-python-plain",
        level: 3,
        url: "https://www.python.org/",
      },
      {
        name: "FastAPI",
        iconClassName: "devicon-fastapi-plain",
        level: 2,
        url: "https://fastapi.tiangolo.com/",
      },
      {
        name: "PostgreSQL",
        iconClassName: "devicon-postgresql-plain",
        level: 4,
        url: "https://www.postgresql.org/",
      },
      {
        name: "Strapi",
        iconClassName: "devicon-strapi-plain",
        level: 4,
        url: "https://strapi.io/",
      },
    ],
  },
  {
    category: "DevOps",
    skills: [
      {
        name: "Docker",
        iconClassName: "devicon-docker-plain",
        level: 3,
        url: "https://www.docker.com/",
      },
      {
        name: "Git",
        iconClassName: "devicon-git-plain",
        level: 5,
        url: "https://git-scm.com/",
      },
      {
        name: "GitHub Actions",
        iconClassName: "devicon-githubactions-plain",
        level: 3,
        url: "https://github.com/features/actions",
      },
      {
        name: "Vercel",
        iconClassName: "devicon-vercel-original",
        level: 5,
        url: "https://vercel.com/",
      },
      {
        name: "Linux",
        iconClassName: "devicon-linux-plain",
        level: 3,
        url: "https://www.linux.org/",
      },
      {
        name: "Figma",
        iconClassName: "devicon-figma-plain",
        level: 2,
        url: "https://www.figma.com/",
      },
    ],
  },
];

// Mock API function placeholders
async function fetchProjects(locale: string) {
  console.log(`Fetching projects for locale: ${locale}`);
  return Promise.resolve(projectsData);
}

async function fetchSkills(locale: string) {
  console.log(`Fetching skills for locale: ${locale}`);
  return Promise.resolve(skillsData);
}

// ============================================================================
// --- SEO METADATA GENERATION ---
// This function runs on the server at build time to create the page's metadata.
// ============================================================================

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // To make this truly dynamic, fetch SEO fields from a "Software Page" Single Type in Strapi.
  // For now, we'll use a dedicated namespace in the translation files.
  const t = await getTranslations({
    locale: params.locale,
    namespace: "SoftwarePageSEO",
  });
  const softwareDomain =
    process.env.NEXT_PUBLIC_SOFTWARE_DOMAIN || "codeby.joeldettinger.de";
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "joeldettinger.de";

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
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
      locale: params.locale,
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
// This is the main component for the software landing page.
// ============================================================================

export default async function DevPage({ params }: Props) {
  // Fetch all necessary data for the page
  const projects = await fetchProjects(params.locale);
  const skills = await fetchSkills(params.locale);
  const t = await getTranslations({
    locale: params.locale,
    namespace: "SoftwareProjectsSection",
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
      itemListElement: projects.map((project, index) => ({
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
          <ProjectsSection projects={projects} />
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
