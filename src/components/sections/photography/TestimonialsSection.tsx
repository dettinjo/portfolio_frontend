"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ExternalLink } from "lucide-react";
import { TestimonialDialog } from "./TestimonialDialog";
import { RatingStars } from "./RatingStars";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string | null;
  ratings: Record<string, number>;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  const t = useTranslations("photography.TestimonialsSection");

  const allRatings = testimonials.flatMap((t) => Object.values(t.ratings));
  const totalAverage =
    allRatings.length > 0
      ? allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length
      : 0;
  const totalReviews = testimonials.length;

  return (
    <section id="testimonials">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold">{t("title")}</h2>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <Star className="h-6 w-6 fill-foreground text-foreground" />
          <span className="text-xl font-bold">{totalAverage.toFixed(1)}</span>
          <span className="text-muted-foreground">
            {t("averageRatingText", { count: totalReviews })}
          </span>
        </div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }} // Animation triggers when 10% is visible
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        className="flex flex-col gap-8 max-w-2xl mx-auto"
      >
        {testimonials.map((item, index) => {
          const ratingValues = Object.values(item.ratings);
          const averageRating =
            ratingValues.reduce((sum, rating) => sum + rating, 0) /
            ratingValues.length;

          return (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <TestimonialDialog testimonial={item}>
                <Card className="relative group flex flex-col cursor-pointer transition-transform duration-200 hover:-translate-y-1">
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <CardContent className="pt-6 flex-grow">
                    <div className="mb-2">
                      <RatingStars rating={averageRating} />
                    </div>
                    <p className="text-muted-foreground italic line-clamp-4">
                      &quot;{item.quote}&quot;
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center gap-4 pb-6">
                    <Avatar>
                      {/* FIX: Explicitly pass undefined if avatar is falsy (null or "") */}
                      <AvatarImage
                        src={item.avatar ? item.avatar : undefined}
                        alt={item.name}
                      />
                      <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.role}
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              </TestimonialDialog>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
