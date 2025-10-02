"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PhotoGridSection } from "./PhotoGridSection";
import { ServicesSection } from "./ServicesSection";
import { ContactSection } from "./ContactSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { Grid3x3, Briefcase, Star, Mail } from "lucide-react";
import { motion } from "framer-motion";

interface Album {
  id: number;
  slug: string;
  title: string;
  coverImageUrl: string;
  images: string[];
}

// --- THIS IS THE FIX (Part 2) ---
// The Testimonial interface now correctly allows the avatar to be string | null.
interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string | null; // Changed from string
  ratings: Record<string, number>;
}

interface PhotographyTabsProps {
  albums: Album[];
  testimonials: Testimonial[];
  translations: {
    feed: string;
    services: string;
    testimonials: string;
    contact: string;
  };
}

export function PhotographyTabs({
  albums,
  testimonials,
  translations,
}: PhotographyTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="sticky z-40 bg-background pt-4"
      style={{ top: "var(--header-offset, 56px)" }}
    >
      <Tabs defaultValue="feed" className="mt-8 md:mt-12">
        <TabsList className="grid w-full grid-cols-4 bg-transparent p-0 border-b">
          <TabsTrigger
            value="feed"
            className="flex-col items-center justify-center gap-2 p-4"
            aria-label={translations.feed}
          >
            <Grid3x3 className="h-6 w-6" />
          </TabsTrigger>
          <TabsTrigger
            value="services"
            className="flex-col items-center justify-center gap-2 p-4"
            aria-label={translations.services}
          >
            <Briefcase className="h-6 w-6" />
          </TabsTrigger>
          <TabsTrigger
            value="testimonials"
            className="flex-col items-center justify-center gap-2 p-4"
            aria-label={translations.testimonials}
          >
            <Star className="h-6 w-6" />
          </TabsTrigger>
          <TabsTrigger
            value="contact"
            className="flex-col items-center justify-center gap-2 p-4"
            aria-label={translations.contact}
          >
            <Mail className="h-6 w-6" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="feed" className="mt-0">
          <PhotoGridSection albums={albums} />
        </TabsContent>
        <TabsContent value="services" className="mt-8">
          <ServicesSection />
        </TabsContent>
        <TabsContent value="testimonials" className="mt-8">
          <TestimonialsSection testimonials={testimonials} />
        </TabsContent>
        <TabsContent value="contact" className="mt-8">
          <ContactSection />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
