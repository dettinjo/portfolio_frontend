// src/app/photography/page.tsx

import { HeroSection } from "@/components/sections/photography/HeroSection";
import { GalleriesSection } from "@/components/sections/photography/GalleriesSection";
import { ServicesSection } from "@/components/sections/photography/ServicesSection";
import { ContactSection } from "@/components/sections/photography/ContactSection";

// --- Beispieldaten (später von API) ---
const albumsData = [
  {
    id: 1,
    slug: "portraits-sw",
    title: "Portraits in S/W",
    description: "Kontrastreiche Charakterstudien.",
    coverImageUrl:
      "https://placehold.co/600x400/000000/FFFFFF/png?text=Portrait",
  },
  {
    id: 2,
    slug: "architektur-berlin",
    title: "Architektur in Berlin",
    description: "Linien, Formen und Strukturen.",
    coverImageUrl:
      "https://placehold.co/600x400/000000/FFFFFF/png?text=Architektur",
  },
  {
    id: 3,
    slug: "natur-alpen",
    title: "Natur in den Alpen",
    description: "Majestätische Berglandschaften.",
    coverImageUrl: "https://placehold.co/600x400/000000/FFFFFF/png?text=Natur",
  },
];

export default function graphyPage() {
  return (
    <div className="space-y-24">
      <HeroSection />
      <GalleriesSection albums={albumsData} />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}
