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
    projectType: "Full-Stack Web App", // <-- Neues Feld
  },
  {
    id: 2,
    slug: "e-commerce-platform-api",
    title: "E-Commerce Plattform API",
    description:
      "Eine robuste Backend-API, die Produktmanagement, Benutzerauthentifizierung und Bestellabwicklung unterstützt.",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
    imageUrl:
      "https://images.unsplash.com/photo-1580894742597-87bc8789db3d?q=80&w=1280&auto=format&fit=crop",
    projectType: "Backend & API", // <-- Neues Feld
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
    // Abstract pipeline / automation graphic
    imageUrl:
      "https://images.unsplash.com/photo-1581093450021-4a7360aa9a2f?q=80&w=1280&auto=format&fit=crop",
    projectType: "DevOps & Automation",
  },
  {
    id: 5,
    slug: "data-visualization-dashboard",
    title: "Datenvisualisierungs-Dashboard",
    description:
      "Ein interaktives Dashboard zur Visualisierung komplexer Datensätze mit D3.js, das Einblicke in Geschäftskennzahlen bietet.",
    tags: ["D3.js", "React", "Datenvisualisierung"],
    // Colorful charts and graphs on a screen
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
    // Abstract neural network / AI graphic
    imageUrl:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1280&auto=format&fit=crop",
    projectType: "AI & Machine Learning",
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
      },
      { name: "React", iconClassName: "devicon-react-original", level: 5 },
      { name: "Next.js", iconClassName: "devicon-nextjs-plain", level: 4 },
      {
        name: "Tailwind CSS",
        iconClassName: "devicon-tailwindcss-plain",
        level: 5,
      },
      {
        name: "Framer Motion",
        iconClassName: "devicon-framermotion-original",
        level: 3,
      },
      { name: "HTML5", iconClassName: "devicon-html5-plain", level: 5 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", iconClassName: "devicon-nodejs-plain", level: 4 },
      {
        name: "Express.js",
        iconClassName: "devicon-express-original",
        level: 4,
      },
      { name: "Python", iconClassName: "devicon-python-plain", level: 3 },
      { name: "FastAPI", iconClassName: "devicon-fastapi-plain", level: 2 },
      {
        name: "PostgreSQL",
        iconClassName: "devicon-postgresql-plain",
        level: 4,
      },
      { name: "Strapi", iconClassName: "devicon-strapi-plain", level: 4 },
    ],
  },
  {
    category: "DevOps & Tools",
    skills: [
      { name: "Docker", iconClassName: "devicon-docker-plain", level: 3 },
      { name: "Git", iconClassName: "devicon-git-plain", level: 5 },
      {
        name: "GitHub Actions",
        iconClassName: "devicon-githubactions-plain",
        level: 3,
      },
      { name: "Vercel", iconClassName: "devicon-vercel-plain", level: 5 },
      { name: "Linux", iconClassName: "devicon-linux-plain", level: 3 },
      { name: "Figma", iconClassName: "devicon-figma-plain", level: 2 },
    ],
  },
];

export default function DevPage() {
  return (
    <div className="space-y-24">
      <HeroSection />
      <ProjectsSection projects={projectsData} />
      <SkillsSection skills={skillsData} />
      <ContactSection />
    </div>
  );
}
