"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RatingStars } from "./RatingStars";

// ... (Interfaces remain the same)
interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  ratings: Record<string, number>;
}

interface TestimonialDialogProps {
  testimonial: Testimonial;
  children: React.ReactNode;
}

export function TestimonialDialog({
  testimonial,
  children,
}: TestimonialDialogProps) {
  const ratingValues = Object.values(testimonial.ratings);
  const averageRating =
    ratingValues.reduce((sum, rating) => sum + rating, 0) / ratingValues.length;

  return (
    // --- THIS IS THE DEFINITIVE FIX ---
    // We add the `onOpenChange` handler to the root Dialog component.
    <Dialog
      onOpenChange={(open) => {
        // When the dialog's state changes to `closed` (open is false)...
        if (!open) {
          // ...we wait for the browser's default focus action to complete...
          setTimeout(() => {
            // ...and then we find whatever element is now active and remove its focus.
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur();
            }
          }, 0);
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[480px]"
      >
        <DialogHeader>
          <DialogTitle className="text-center">Client Feedback</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-lg">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">
                {testimonial.role}
              </p>
            </div>
          </div>
          <p className="mt-4 text-muted-foreground italic">
            &quot;{testimonial.quote}&quot;
          </p>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="font-semibold">Detailed Ratings</h3>
            {Object.entries(testimonial.ratings).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-muted-foreground">{key}</span>
                <RatingStars rating={value} />
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="flex items-center justify-between font-bold text-lg">
            <span>Average Rating</span>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-foreground text-foreground" />
              <span>{averageRating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
