// src/app/[locale]/login/page.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, Link } from "@/i18n/navigation"; // Use Link from next-intl
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTranslations, useLocale } from "next-intl"; // Import the hook

export default function LoginPage() {
  const t = useTranslations("Auth.LoginPage"); // Initialize translations
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const locale = useLocale();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${strapiUrl}/api/auth/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error.message || t("loginFailed"));
      }

      login(data.jwt, data.user);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("loginFailed"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">{t("emailLabel")}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">{t("passwordLabel")}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">
              {t("submitButton")}
            </Button>
          </form>
          <Separator className="my-6" />
          <div className="space-y-4">
            <Button variant="outline" className="w-full" asChild>
              <a href={`${strapiUrl}/api/connect/google?locale=${locale}`}>
                {t("googleButton")}
              </a>
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {t("noAccount")}{" "}
              <Link
                href="/register"
                className="underline hover:text-foreground"
              >
                {t("registerLink")}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
