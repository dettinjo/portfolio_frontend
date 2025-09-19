// src/app/[locale]/photography/page.tsx

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// --- UPDATED IMPORTS ---
import { ProfileHeaderSection } from "@/components/sections/photography/ProfileHeaderSection";
import { PhotoGridSection } from "@/components/sections/photography/PhotoGridSection";
// --- END UPDATED IMPORTS ---
import { ServicesSection } from "@/components/sections/photography/ServicesSection";
import { ContactSection } from "@/components/sections/photography/ContactSection";
import { TestimonialsSection } from "@/components/sections/photography/TestimonialsSection";

import { Grid3x3, Briefcase, Star, Mail } from "lucide-react";

// --- MOCK DATA ---
const profileData = {
  name: "Joel Dettinger",
  bio: "Capturing moments from unique perspectives. Exploring the intersection of light, shadow, and emotion through the lens. Available for portrait, event, and product photography.",
  avatarSrc: "/images/profile.png",
};

// --- MOCK DATA (UPDATED WITH MORE IMAGES) ---
const albumsData = [
  {
    id: 1,
    slug: "portraits-sw",
    title: "Portraits in B&W",
    coverImageUrl:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800&h=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1920&auto=format&fit=crop",
    ],
  },
  {
    id: 2,
    slug: "architecture-berlin",
    title: "Architecture in Berlin",
    coverImageUrl:
      "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?q=80&w=800&h=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587579294226-8abe3cbcb7d1?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593902529943-158a1f6a1e3e?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558005888-82a1b1a73954?q=80&w=1920&auto=format&fit=crop",
    ],
  },
  {
    id: 3,
    slug: "nature-alps",
    title: "Nature in the Alps",
    coverImageUrl:
      "https://images.unsplash.com/photo-1517423568342-be24c2f0a8d4?q=80&w=800&h=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1920&auto=format&fit=crop",
    ],
  },
  {
    id: 4,
    slug: "portraits-s4w",
    title: "Portraits in B&W",
    coverImageUrl:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800&h=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1280&auto=format&fit=crop",
    ],
  },
  {
    id: 5,
    slug: "portraits-sw5",
    title: "Portraits in B&W",
    coverImageUrl:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800&h=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1280&auto=format&fit=crop",
    ],
  },
  {
    id: 6,
    slug: "portraits-sw6",
    title: "Portraits in B&W",
    coverImageUrl:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800&h=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1280&auto=format&fit=crop",
    ],
  },
  {
    id: 7,
    slug: "portraits-sw7",
    title: "Portraits in B&W",
    coverImageUrl:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800&h=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1280&auto=format&fit=crop",
    ],
  },
  {
    id: 8,
    slug: "portraits-sw8",
    title: "Portraits in B&W",
    coverImageUrl:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800&h=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1280&auto=format&fit=crop",
    ],
  },
  {
    id: 9,
    slug: "portraits-sw9",
    title: "Portraits in B&W",
    coverImageUrl:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800&h=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1280&auto=format&fit=crop",
    ],
  },
];

const testimonialsData = [
  {
    quote:
      "The photos are absolutely stunning! Joel has a real talent for capturing the perfect moment. We couldn't be happier with our wedding album.",
    name: "Sarah & Tom",
    role: "Wedding Couple",
    avatar: "https://i.pravatar.cc/150?img=1",
    ratings: {
      Communication: 5,
      Creativity: 5,
      Professionalism: 5,
      Value: 4,
    }, // Avg: 4.8
  },
  {
    quote:
      "Professional, creative, and a pleasure to work with. The product shots for our new collection were exactly what we needed to elevate our brand.",
    name: "Jane Doe",
    role: "Marketing Director, Acme Inc.",
    avatar: "https://i.pravatar.cc/150?img=2",
    ratings: {
      Communication: 5,
      Creativity: 4,
      Professionalism: 5,
      Value: 5,
    }, // Avg: 4.8
  },
  {
    quote:
      "Incredible eye for detail. The headshots Joel took for our team's website were professional, modern, and exactly what we were looking for. The whole process was seamless.",
    name: "Alex Johnson",
    role: "Startup Founder",
    avatar: "https://i.pravatar.cc/150?img=3",
    ratings: {
      Communication: 5,
      Creativity: 5,
      Professionalism: 5,
      Value: 5,
    }, // Avg: 5.0
  },
  {
    quote:
      "We hired Joel for our annual corporate event, and the photos were fantastic. He captured the energy of the day perfectly without being intrusive. Highly recommended!",
    name: "Maria Garcia",
    role: "Event Coordinator",
    avatar: "https://i.pravatar.cc/150?img=4",
    ratings: {
      Communication: 4,
      Creativity: 4,
      Professionalism: 5,
      Value: 4,
    }, // Avg: 4.3
  },
  {
    quote:
      "A good experience overall. The final photos were delivered on time and met the brief. There was some initial difficulty scheduling, but it was resolved professionally.",
    name: "Ben Carter",
    role: "Real Estate Agent",
    avatar: "https://i.pravatar.cc/150?img=5",
    ratings: {
      Communication: 3,
      Creativity: 4,
      Professionalism: 4,
      Value: 4,
    }, // Avg: 3.8
  },
  {
    quote:
      "Does great work! The photos for our family portrait session turned out beautifully. Joel was very patient with our kids.",
    name: "The Miller Family",
    role: "Family Portrait",
    avatar: "https://i.pravatar.cc/150?img=6",
    ratings: {
      Communication: 5,
      Creativity: 4,
      Professionalism: 5,
      Value: 4,
    }, // Avg: 4.5
  },
];

export default function PhotographyPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 md:py-24">
      <ProfileHeaderSection
        name={profileData.name}
        bio={profileData.bio}
        avatarSrc={profileData.avatarSrc}
      />

      <div
        className="sticky z-40 bg-background pt-4"
        style={{ top: "var(--header-offset, 56px)" }}
      >
        <Tabs defaultValue="feed" className="mt-8 md:mt-12">
          <TabsList className="grid w-full grid-cols-4 bg-transparent p-0 border-b">
            {/* --- THIS IS THE DEFINITIVE FIX --- */}
            {/* 
              - The text `<span>` has been removed from all triggers.
              - The icon size has been increased from `h-5 w-5` to `h-6 w-6`.
              - `aria-label` has been added for accessibility, so screen readers can announce what the button is for.
            */}
            <TabsTrigger
              value="feed"
              className="flex-col items-center justify-center gap-2 p-4"
              aria-label="Photo Feed"
            >
              <Grid3x3 className="h-6 w-6" />
            </TabsTrigger>
            <TabsTrigger
              value="services"
              className="flex-col items-center justify-center gap-2 p-4"
              aria-label="Services"
            >
              <Briefcase className="h-6 w-6" />
            </TabsTrigger>
            <TabsTrigger
              value="testimonials"
              className="flex-col items-center justify-center gap-2 p-4"
              aria-label="Testimonials"
            >
              <Star className="h-6 w-6" />
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="flex-col items-center justify-center gap-2 p-4"
              aria-label="Contact"
            >
              <Mail className="h-6 w-6" />
            </TabsTrigger>
          </TabsList>

          {/* ... (TabsContent remains the same) ... */}
          <TabsContent value="feed" className="mt-0">
            <PhotoGridSection albums={albumsData} />
          </TabsContent>

          <TabsContent value="services" className="mt-8">
            <ServicesSection />
          </TabsContent>

          <TabsContent value="testimonials" className="mt-8">
            <TestimonialsSection testimonials={testimonialsData} />
          </TabsContent>

          <TabsContent value="contact" className="mt-8">
            <ContactSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
