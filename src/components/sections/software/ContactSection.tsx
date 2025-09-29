"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Instagram, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
export function ContactSection() {
  const t = useTranslations("software.SoftwareContactSection");
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  // --- Form Submission Handler ---
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionStatus("submitting");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT!,
        {
          // <-- REPLACE WITH YOUR FORMSPREE ID
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        setSubmissionStatus("success");
      } else {
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmissionStatus("error");
    }
  };

  return (
    <section id="kontakt">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* Column 1: Call-to-Action Text & Socials */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold tracking-tight">{t("title")}</h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex items-center justify-start gap-4">
            <p className="text-sm text-muted-foreground">{t("socials_text")}</p>
            <a
              href="https://github.com/dettinjo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
            </a>
            <a
              href="https://linkedin.com/in/joeldettinger/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
            </a>
            <a
              href="https://instagram.com/[your-handle]"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
            </a>
          </div>
        </motion.div>

        {/* Column 2: The Interactive Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* 2. Conditional rendering based on submission status */}
          {submissionStatus === "success" ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-foreground p-8 text-center h-[380px]">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold">{t("success_title")}</h3>
              <p className="text-muted-foreground mt-2">
                {t("success_message")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">{t("form_name")}</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={t("form_name_placeholder")}
                  required
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">{t("form_email")}</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t("form_email_placeholder")}
                  required
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="message">{t("form_message")}</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t("form_message_placeholder")}
                  className="min-h-[100px]"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={submissionStatus === "submitting"}
              >
                {submissionStatus === "submitting"
                  ? t("form_submitting")
                  : t("form_submit")}
              </Button>
              {submissionStatus === "error" && (
                <p className="text-sm text-red-500 text-center">
                  {t("error_message")}
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
