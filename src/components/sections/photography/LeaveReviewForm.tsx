"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, CheckCircle2, Edit, Send } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RatingStars } from "@/components/sections/photography/RatingStars";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const ratingCategories = [
  { id: "communication", label: "Communication" },
  { id: "creativity", label: "Creativity" },
  { id: "professionalism", label: "Professionalism" },
  { id: "value", label: "Value" },
];

// --- THIS IS THE DEFINITIVE FIX (PART 2) ---
// Define specific types for the props instead of using `any`
interface PreviewTestimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string | null;
  ratings: Record<string, number>;
}

// Get the type of the translation function from the hook itself
type TFunction = ReturnType<typeof useTranslations>;

const PreviewCard = ({
  testimonial,
  t,
}: {
  testimonial: PreviewTestimonial;
  t: TFunction;
}) => {
  const averageRating = useMemo(() => {
    const ratingValues = Object.values(testimonial.ratings);
    const total = ratingValues.reduce((sum, val) => sum + val, 0);
    const ratedCategories = ratingValues.filter((val) => val > 0).length;
    return ratedCategories > 0 ? total / ratedCategories : 0;
  }, [testimonial.ratings]);

  return (
    <Card className="flex flex-col">
      <CardContent className="p-6">
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
            <p className="font-semibold text-lg">
              {testimonial.name || t("preview.defaultName")}
            </p>
            <p className="text-sm text-muted-foreground">
              {testimonial.role || t("preview.defaultRole")}
            </p>
          </div>
        </div>
        <p className="mt-4 text-muted-foreground italic">
          &quot;{testimonial.quote || t("preview.defaultQuote")}&quot;
        </p>
      </CardContent>
      <CardContent className="p-6 pt-0">
        <Separator className="mb-6" />
        <div className="space-y-4">
          <h3 className="font-semibold">{t("ratings.title")}</h3>
          {ratingCategories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-muted-foreground">
                {t(`ratings.${cat.id}`)}
              </span>
              <RatingStars rating={testimonial.ratings[cat.id] || 0} />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex-col items-start gap-6">
        <Separator />
        <div className="w-full flex items-center justify-between font-bold text-lg">
          <span>{t("preview.overallRating")}</span>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-foreground text-foreground" />
            <span>{averageRating.toFixed(1)}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export function LeaveReviewForm() {
  const t = useTranslations("photography.LeaveReviewPage");
  const [step, setStep] = useState(1);
  const [authorName, setAuthorName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [ratings, setRatings] = useState<Record<string, number>>({
    communication: 3,
    creativity: 4,
    professionalism: 5,
    value: 4,
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState("idle");

  const isFormComplete = authorName && quote;

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const handlePreview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormComplete) setStep(2);
  };

  const handleSubmit = async () => {
    setSubmissionStatus("submitting");
    const submissionFormData = new FormData();
    submissionFormData.append(
      "data",
      JSON.stringify({ authorName, role, quote, ratings })
    );
    if (photoFile)
      submissionFormData.append("files.photo", photoFile, photoFile.name);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/testimonials`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TESTIMONIAL_TOKEN}`,
          },
          body: submissionFormData,
        }
      );
      if (!response.ok) throw new Error("Testimonial creation failed");
      setStep(3);
      setSubmissionStatus("success");
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus("error");
    }
  };

  if (step === 3) {
    return (
      <div className="container mx-auto max-w-2xl py-24 text-center">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold">{t("success.title")}</h1>
        <p className="text-muted-foreground mt-2">{t("success.message")}</p>
      </div>
    );
  }

  const previewData = {
    name: authorName,
    role: role,
    quote: quote,
    avatar: photoPreview,
    ratings: ratings,
  };

  return (
    <div className="container mx-auto max-w-2xl py-12 md:py-24">
      {step === 1 ? (
        <Card>
          <div className="p-6">
            <div className="text-center mb-6">
              <CardTitle className="text-3xl">{t("title")}</CardTitle>
              <CardDescription className="mt-1">
                {t("subtitle")}
              </CardDescription>
            </div>
            <form onSubmit={handlePreview} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">{t("form.nameLabel")}</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder={t("form.namePlaceholder")}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="role">{t("form.roleLabel")}</Label>
                  <Input
                    type="text"
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder={t("form.rolePlaceholder")}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>{t("form.photoLabel")}</Label>
                <div className="flex items-center gap-4">
                  {/* The real input is now invisible but still functional */}
                  <Input
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handlePhotoChange}
                    className="sr-only" // This class hides it visually but keeps it accessible
                  />
                  {/* This is our new, styled, and translatable button */}
                  <Label
                    htmlFor="photo"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "cursor-pointer"
                    )}
                  >
                    {t("form.buttonUpload")}
                  </Label>
                  {/* This span displays the selected file name or a default message */}
                  <span className="text-sm text-muted-foreground truncate">
                    {photoFile ? photoFile.name : t("form.noFileChosen")}
                  </span>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">{t("form.testimonialLabel")}</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder={t("form.testimonialPlaceholder")}
                  className="min-h-[120px]"
                  required
                />
              </div>
              <Separator />
              {ratingCategories.map((cat) => (
                <div key={cat.id} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <Label htmlFor={cat.id}>{t(`ratings.${cat.id}`)}</Label>
                    <span className="font-semibold">{ratings[cat.id]} / 5</span>
                  </div>
                  <Slider
                    id={cat.id}
                    value={[ratings[cat.id]]}
                    onValueChange={([val]) =>
                      setRatings((prev) => ({ ...prev, [cat.id]: val }))
                    }
                    min={0}
                    max={5}
                    step={1}
                  />
                </div>
              ))}
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!isFormComplete}
                >
                  {t("form.buttonPreview")}
                </Button>
              </div>
            </form>
          </div>
        </Card>
      ) : (
        <div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">{t("preview.title")}</h1>
            <p className="text-muted-foreground">{t("preview.subtitle")}</p>
          </div>
          <PreviewCard testimonial={previewData} t={t} />
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={() => setStep(1)}>
              <Edit className="mr-2 h-4 w-4" /> {t("preview.buttonEdit")}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submissionStatus === "submitting"}
            >
              {submissionStatus === "submitting" ? (
                t("preview.buttonSubmitting")
              ) : (
                <>
                  {" "}
                  <Send className="mr-2 h-4 w-4" /> {t("preview.buttonSubmit")}{" "}
                </>
              )}
            </Button>
          </div>
          {submissionStatus === "error" && (
            <p className="text-sm text-red-500 text-center mt-4">
              {t("error")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
