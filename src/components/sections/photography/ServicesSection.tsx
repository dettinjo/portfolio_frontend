"use client";

import React, { useState, useMemo } from "react";
// ... (imports remain the same)
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
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
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ServicesSection() {
  const t = useTranslations("photography.ServicesSection");
  const yourEmail = "your-photo-email@example.com";

  // ... (calculator state and logic remain the same)
  const [hours, setHours] = useState(1);
  const [images, setImages] = useState(10);
  const [retouchLevel, setRetouchLevel] = useState(1);
  const [distance, setDistance] = useState("");
  const [addExpress, setAddExpress] = useState(false);
  const retouchLevels = [
    t("calculator.levels.basic"),
    t("calculator.levels.advanced"),
    t("calculator.levels.pro"),
  ];
  const calculatedPrice = useMemo(() => {
    const sessionFee = 40;
    const hourlyRate = 55;
    let pricePerImage = 4;
    if (retouchLevel === 2) pricePerImage = 8;
    if (retouchLevel === 3) pricePerImage = 15;
    const numDistance = parseInt(distance, 10) || 0;
    let subtotal =
      sessionFee +
      hours * hourlyRate +
      images * pricePerImage +
      numDistance * 0.5;
    if (addExpress) subtotal *= 1.2;
    return Math.round(subtotal);
  }, [hours, images, retouchLevel, distance, addExpress]);

  const packages = [
    {
      type: "standard",
      icon: <Box className="h-8 w-8 text-foreground" />,
      price: "120",
    },
    {
      type: "advanced",
      icon: <Crown className="h-8 w-8 text-foreground" />,
      price: "380",
    },
  ];

  const individualMailto = `mailto:${yourEmail}?subject=${encodeURIComponent(
    "Inquiry for Individual Shoot"
  )}&body=${encodeURIComponent(
    `Hi,\n\nI'd like to book a custom session with the following configuration:\n- Duration: ${hours} hours\n- Edited Images: ${images}\n- Retouching Level: ${
      retouchLevels[retouchLevel - 1]
    }\n- Travel Distance: ${distance || 0} km\n- Express Delivery (24h): ${
      addExpress ? "Yes" : "No"
    }\n\nEstimated Price: ${calculatedPrice} €\n\nLooking forward to hearing from you!`
  )}`;

  return (
    <section id="services">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold">{t("title")}</h2>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* --- THIS IS THE DEFINITIVE FIX: Grid with auto-rows --- */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        // `grid-rows-auto` is the key. It tells the grid to make all cells in a row
        // as tall as the tallest cell in that row.
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:grid-flow-row"
      >
        {packages.map((pkg) => (
          <motion.div
            key={pkg.type}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            {/* `h-full` is still used to make the card fill the grid cell's height */}
            <Card className="flex flex-col h-full">
              <CardHeader className="p-6">
                <div className="flex items-center gap-4">
                  {pkg.icon}
                  <CardTitle className="text-2xl font-bold">
                    {t(`${pkg.type}.title`)}
                  </CardTitle>
                </div>
                <CardDescription className="pt-1 min-h-[40px]">
                  {t(`${pkg.type}.description`)}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow p-6 pt-0">
                <Separator className="mb-6" />
                <ul className="space-y-4">
                  {/* `t.raw` is used to get the array of strings from your JSON file */}
                  {t.raw(`${pkg.type}.items`).map((item: string) => (
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
                  <div className="text-sm text-muted-foreground">
                    {t("price.fixed")}
                  </div>
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
                      t(`${pkg.type}.subject`)
                    )}`}
                  >
                    <Mail className="mr-2 h-4 w-4" /> {t("button")}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          <Card className="flex flex-col border-2 border-primary shadow-lg shadow-primary/10 h-full">
            <CardHeader className="p-6">
              <div className="flex items-center gap-4">
                <Lightbulb className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl font-bold text-primary">
                  {t("individual.title")}
                </CardTitle>
              </div>
              <CardDescription className="pt-1 min-h-[40px]">
                {t("individual.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-6 pt-0">
              <Separator className="mb-6" />
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <Label htmlFor="hours" className="flex items-center gap-2">
                      <Clock className="h-4 w-4" /> {t("calculator.duration")}
                    </Label>
                    <span className="font-semibold">
                      {hours} {t("calculator.hours")}
                    </span>
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
                      <ImageIcon className="h-4 w-4" /> {t("calculator.images")}
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
                      <Wand2 className="h-4 w-4" /> {t("calculator.retouching")}
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
                    <MapPin className="h-4 w-4" /> {t("calculator.travel")}
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
                    <Zap className="h-4 w-4" /> {t("calculator.express")}
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
                  {t("price.estimated")}
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
                  <Mail className="mr-2 h-4 w-4" /> {t("buttonIndividual")}
                </a>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
