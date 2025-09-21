"use client";

import React from "react";
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
import { useTranslations } from "next-intl";

interface TestimonialDialogProps {
  testimonial: {
    quote: string;
    name: string;
    role: string;
    avatar: string | null;
    ratings: Record<string, number>;
  };
  children?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function TestimonialDialog({
  testimonial,
  children,
  isOpen,
  onOpenChange,
}: TestimonialDialogProps) {
  const t = useTranslations("photography.TestimonialsSection");

  const ratingValues = Object.values(testimonial.ratings);
  const averageRating =
    ratingValues.length > 0
      ? ratingValues.reduce((sum, rating) => sum + rating, 0) /
        ratingValues.length
      : 0;

  // --- THIS IS THE DEFINITIVE FIX ---
  // This handler correctly solves the focus race condition.
  const handleOpenChange = (open: boolean) => {
    // Pass the state change up to the parent if needed (for the preview page)
    if (onOpenChange) {
      onOpenChange(open);
    }

    // If the dialog is closing...
    if (!open) {
      // ...we use setTimeout with a 0ms delay. This schedules our code to run
      // immediately AFTER the browser has finished its current tasks, which includes
      // the dialog's own logic that returns focus to the card.
      setTimeout(() => {
        // We find whatever element is currently focused (which will be the card)
        // and tell it to .blur(), removing the focus state and the border.
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }, 0);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        // The problematic onCloseAutoFocus is removed, as we now handle it manually.
        className="sm:max-w-[480px]"
      >
        <DialogHeader>
          <DialogTitle className="text-center">{t("dialog.title")}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={testimonial.avatar || undefined}
                alt={testimonial.name}
              />
              <AvatarFallback>
                {testimonial.name
                  ? testimonial.name.charAt(0).toUpperCase()
                  : "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-lg">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">
                {testimonial.role || t("dialog.defaultRole")}
              </p>
            </div>
          </div>
          <p className="mt-4 text-muted-foreground italic">
            &quot;{testimonial.quote}&quot;
          </p>
          <Separator className="my-6" />
          <div className="space-y-4">
            <h3 className="font-semibold">{t("dialog.ratingsTitle")}</h3>
            {Object.entries(testimonial.ratings).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-muted-foreground">
                  {t(`dialog.ratings.${key.toLowerCase()}`)}
                </span>
                <RatingStars rating={value} />
              </div>
            ))}
          </div>
          <Separator className="my-6" />
          <div className="flex items-center justify-between font-bold text-lg">
            <span>{t("dialog.overallRating")}</span>
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
