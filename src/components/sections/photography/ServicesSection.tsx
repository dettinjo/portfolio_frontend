"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Box,
  Crown,
  Lightbulb,
  Check,
  Clock,
  Image as ImageIcon,
  Wand2,
  MapPin,
  Zap,
} from "lucide-react";

export function ServicesSection() {
  const yourEmail = "your-photo-email@example.com";

  // --- (Calculator State and Logic remain the same) ---
  const [hours, setHours] = useState(1);
  const [images, setImages] = useState(10);
  const [retouchLevel, setRetouchLevel] = useState(1);
  const [distance, setDistance] = useState("");
  const [addExpress, setAddExpress] = useState(false);
  const retouchLevels = ["Basic", "Advanced", "Pro"];
  const calculatedPrice = useMemo(() => {
    const sessionFee = 40;
    const hourlyRate = 55;
    let pricePerImage = 4;
    if (retouchLevel === 2) pricePerImage = 8;
    if (retouchLevel === 3) pricePerImage = 15;
    const numDistance = parseInt(distance, 10) || 0;
    let subtotal = 0;
    subtotal += sessionFee;
    subtotal += hours * hourlyRate;
    subtotal += images * pricePerImage;
    subtotal += numDistance * 0.5;
    if (addExpress) subtotal *= 1.2;
    return Math.round(subtotal);
  }, [hours, images, retouchLevel, distance, addExpress]);

  // --- THIS IS THE DEFINITIVE FIX: Updated Package Content & Price ---
  const packages = [
    {
      title: "Standard Package",
      price: "120",
      icon: <Box className="h-8 w-8 text-foreground" />,
      description: "Ideal for impactful portraits or product shots.",
      items: [
        "1 Hour Session",
        "10 Edited Images (Basic)",
        "Pre-shoot Consultation",
        "Private Online Gallery",
      ],
      subject: "Inquiry about Standard Package",
    },
    {
      title: "Advanced Package",
      price: "380", // Recalculated price for more value
      icon: <Crown className="h-8 w-8 text-foreground" />,
      description: "Perfect for families, events, or branding.",
      items: [
        "Up to 3 Hours Session", // Increased duration
        "30 Edited Images (Advanced)", // Increased image count
        "Advanced Skin Retouching",
        "Multiple locations or outfit changes", // New Feature
        "Priority support & consultation", // New Feature
        "Full resolution downloads",
      ],
      subject: "Inquiry about Advanced Package",
    },
  ];

  const individualMailto = `mailto:${yourEmail}?subject=${encodeURIComponent(
    "Inquiry for Individual Shoot"
  )}&body=${encodeURIComponent(`Hi,

I'd like to book a custom session with the following configuration:
- Duration: ${hours} hours
- Edited Images: ${images}
- Retouching Level: ${retouchLevels[retouchLevel - 1]}
- Travel Distance: ${distance || 0} km
- Express Delivery (24h): ${addExpress ? "Yes" : "No"}

Estimated Price: ${calculatedPrice} €

Looking forward to hearing from you!
`)}`;

  return (
    <section id="services">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold">Packages & Pricing</h2>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          Choose a pre-defined package or build your own for a fully custom
          experience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {packages.map((pkg) => (
          <Card key={pkg.title} className="flex flex-col h-full">
            <CardHeader className="p-6">
              <div className="flex items-center gap-4">
                {pkg.icon}
                <CardTitle className="text-2xl font-bold">
                  {pkg.title}
                </CardTitle>
              </div>
              <CardDescription className="pt-1 min-h-[40px]">
                {pkg.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-6 pt-0">
              <Separator className="mb-6" />
              <ul className="space-y-4">
                {pkg.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-4 w-4 flex-shrink-0 text-green-500 mt-1" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4 p-6 pt-0 mt-auto">
              <Separator className="mb-6" />
              <div>
                <div className="text-sm text-muted-foreground">Fixed Price</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{pkg.price}</span>
                  <span className="text-xl font-semibold text-muted-foreground">
                    EUR
                  </span>
                </div>
              </div>
              <Button asChild className="w-full">
                <a
                  href={`mailto:${yourEmail}?subject=${encodeURIComponent(
                    pkg.subject
                  )}`}
                >
                  <Mail className="mr-2 h-4 w-4" /> Inquire Now
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}

        {/* ... (Individual Calculator Card remains the same) ... */}
        <Card className="flex flex-col border-2 border-primary shadow-lg shadow-primary/10 h-full">
          <CardHeader className="p-6">
            <div className="flex items-center gap-4">
              <Lightbulb className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl font-bold text-primary">
                Individual
              </CardTitle>
            </div>
            <CardDescription className="pt-1 min-h-[40px]">
              Build your own package for a perfect fit.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow p-6 pt-0">
            <Separator className="mb-6" />
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <Label htmlFor="hours" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Duration
                  </Label>
                  <span className="font-semibold">{hours} Hours</span>
                </div>
                <Slider
                  id="hours"
                  value={[hours]}
                  onValueChange={([val]) => setHours(val)}
                  min={1}
                  max={8}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <Label htmlFor="images" className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" /> Edited Images
                  </Label>
                  <span className="font-semibold">{images}</span>
                </div>
                <Slider
                  id="images"
                  value={[images]}
                  onValueChange={([val]) => setImages(val)}
                  min={5}
                  max={50}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <Label
                    htmlFor="retouching"
                    className="flex items-center gap-2"
                  >
                    <Wand2 className="h-4 w-4" /> Retouching
                  </Label>
                  <span className="font-semibold">
                    {retouchLevels[retouchLevel - 1]}
                  </span>
                </div>
                <Slider
                  id="retouching"
                  value={[retouchLevel]}
                  onValueChange={([val]) => setRetouchLevel(val)}
                  min={1}
                  max={3}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="distance"
                  className="flex items-center gap-2 text-sm"
                >
                  <MapPin className="h-4 w-4" /> Travel Distance (km)
                </Label>
                <Input
                  id="distance"
                  type="number"
                  placeholder="e.g., 20"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="express" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" /> Express Delivery (24h)
                </Label>
                <Switch
                  id="express"
                  checked={addExpress}
                  onCheckedChange={setAddExpress}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4 p-6 pt-0 mt-auto">
            <Separator className="mb-6" />
            <div>
              <div className="text-sm text-muted-foreground">
                Your Estimated Price
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">{calculatedPrice}</span>
                <span className="text-xl font-semibold text-muted-foreground">
                  EUR
                </span>
              </div>
            </div>
            <Button asChild className="w-full">
              <a href={individualMailto}>
                <Mail className="mr-2 h-4 w-4" /> Inquire with this Setup
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
