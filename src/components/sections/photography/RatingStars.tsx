"use client";

import { Star, StarHalf } from "lucide-react"; // StarHalf is still needed

interface RatingStarsProps {
  rating: number;
  max?: number;
}

export function RatingStars({ rating, max = 5 }: RatingStarsProps) {
  // --- THIS IS THE DEFINITIVE FIX (PART 1): Standard Rounding ---
  // This rounds the rating to the nearest 0.5.
  // Example: 3.7 becomes 3.5, 3.8 becomes 4.0.
  const roundedRating = Math.round(rating * 2) / 2;

  return (
    <div className="flex items-center">
      {/* --- THIS IS THE DEFINITIVE FIX (PART 2): Layered Icon Logic --- */}
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;

        // Condition for a full star
        if (roundedRating >= starValue) {
          return (
            <Star
              key={index}
              className="h-5 w-5 fill-foreground text-foreground"
            />
          );
        }

        // Condition for a half star
        if (roundedRating === starValue - 0.5) {
          return (
            // We create a relative container to stack the icons
            <div key={index} className="relative h-5 w-5">
              {/* The empty star is the bottom layer */}
              <Star className="absolute top-0 left-0 h-5 w-5 fill-muted text-muted-foreground" />
              {/* The half-filled star is the top layer */}
              <StarHalf className="absolute top-0 left-0 h-5 w-5 fill-foreground text-foreground" />
            </div>
          );
        }

        // Otherwise, it's an empty star
        return (
          <Star
            key={index}
            className="h-5 w-5 fill-muted text-muted-foreground"
          />
        );
      })}
    </div>
  );
}
