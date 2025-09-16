// src/appsections/software/page.tsx

// Importieren Sie Ihre neuen Sektions-Komponenten
import { ContactSection } from "@/components/sections/software/ContactSection";
import { HeroSection } from "@/components/sections/software/HeroSection";
import { ProjectsSection } from "@/components/sections/software/ProjectsSection";
import { SkillsSection } from "@/components/sections/software/SkillsSection";

// --- Beispieldaten (später von API) ---
const projectsData = [
  {
    id: 1,
    slug: "portfolio-website-v2",
    title: "Portfolio Webseite",
    description:
      "Eine dynamische Portfolio-Seite, gebaut mit Next.js, Strapi CMS und shadcn/ui für ein voll anpassbares Erlebnis.",
    tags: ["Next.js", "React", "Strapi", "TypeScript"],
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1280&auto=format&fit=crop",
    projectType: "Full-Stack Web App",
  },
  {
    id: 2,
    slug: "e-commerce-platform-api",
    title: "E-Commerce Plattform API",
    description:
      "Eine robuste Backend-API, die Produktmanagement, Benutzerauthentifizierung und Bestellabwicklung unterstützt.",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
    // --- NEW IMAGE --- (Abstract blue server/network lights)
    imageUrl:
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1280&auto=format&fit=crop",
    projectType: "Backend & API",
  },
  {
    id: 3,
    slug: "real-time-chat-app",
    title: "Real-Time Chat App",
    description:
      "Eine Web-Anwendung für sofortige Kommunikation, die WebSockets für eine nahtlose Echtzeit-Interaktion nutzt.",
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
      "Automatisierung von Build-, Test- und Deployment-Prozessen für eine Microservices-Architektur mit Docker und GitHub Actions.",
    tags: ["Docker", "GitHub Actions", "CI/CD", "DevOps"],
    // --- NEW IMAGE --- (Physical representation of a pipeline/flow)
    imageUrl:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1332&auto=format&fit=crop",
    projectType: "DevOps & Automation",
  },
  {
    id: 5,
    slug: "data-visualization-dashboard",
    title: "Datenvisualisierungs-Dashboard",
    description:
      "Ein interaktives Dashboard zur Visualisierung komplexer Datensätze mit D3.js, das Einblicke in Geschäftskennzahlen bietet.",
    tags: ["D3.js", "React", "Datenvisualisierung"],
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1280&auto=format&fit=crop",
    projectType: "Data Visualization",
  },
  {
    id: 6,
    slug: "ai-powered-image-tagger",
    title: "KI-gestützter Image Tagger",
    description:
      "Ein Python-Service, der ein Machine-Learning-Modell verwendet, um Bilder automatisch zu analysieren und relevante Tags zu generieren.",
    tags: ["Python", "TensorFlow", "FastAPI", "AI/ML"],
    imageUrl:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1280&auto=format&fit=crop",
    projectType: "AI / Machine Learning",
  },
];

// src/app/(app)/[locale]/software/page.tsx

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
    category: "DevOps & Tools",
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
export default async function DevPage() {
  return (
    <div className="space-y-24">
      <HeroSection />
      <ProjectsSection projects={projectsData} />
      <SkillsSection skills={skillsData} />
      <ContactSection />
    </div>
  );
}
