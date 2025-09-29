import { getTranslations } from "next-intl/server";
import { PhotographyTabs } from "@/components/sections/photography/PhotographyTabs";
import { ProfileHeaderSection } from "@/components/sections/photography/ProfileHeaderSection";
import { fetchAlbums, fetchTestimonials } from "@/lib/strapi";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

const profileData = {
  name: "Joel Dettinger",
  avatarSrc: "/images/profile.png",
};

export default async function PhotographyPage() {
  const t = await getTranslations("photography.PhotographyPage");
  const rawAlbums = await fetchAlbums();
  const rawTestimonials = await fetchTestimonials();

  // --- Data Transformation for Albums ---
  const albums = rawAlbums
    .filter((album) => album && album.slug)
    .map((album) => {
      // Check if coverImage exists and has a URL. If not, log it.
      if (!album.coverImage?.url) {
        console.warn(
          `Album "${album.title}" (ID: ${album.id}) is missing a cover image. Using fallback.`
        );
      }
      return {
        id: album.id,
        slug: album.slug,
        title: album.title,
        coverImageUrl: album.coverImage?.url
          ? `${STRAPI_URL}${album.coverImage.url}`
          : "/placeholder.jpg", // This fallback requires the file to exist in /public
        images: (album.images || []).map((img) => `${STRAPI_URL}${img.url}`),
      };
    });

  // --- THIS IS THE FIX for the TypeScript error ---
  // We now correctly extract only the rating fields into the `ratings` object.
  const testimonials = rawTestimonials
    .filter((testimonial) => testimonial && testimonial.name)
    .map((testimonial) => ({
      name: testimonial.name,
      quote: testimonial.quote,
      role: testimonial.role,
      avatar: testimonial.avatarUrl,
      ratings: {
        communication: testimonial.communication || 0,
        creativity: testimonial.creativity || 0,
        professionalism: testimonial.professionalism || 0,
        value: testimonial.value || 0,
      },
    }));

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 md:py-24">
      <ProfileHeaderSection
        name={profileData.name}
        bio={t("profileBio")}
        avatarSrc={profileData.avatarSrc}
      />

      <PhotographyTabs
        albums={albums}
        testimonials={testimonials}
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
