// src/app/[locale]/connect/google/callback/page.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";

export default function GoogleCallbackPage() {
  const t = useTranslations("Auth.CallbackPage");
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // We are now looking for 'access_token' from the URL query
    const accessToken = searchParams.get("access_token");

    if (accessToken) {
      // Use this token to fetch the user's details from Strapi
      fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(async (res) => {
          if (res.ok) {
            const userData = await res.json();
            // If successful, log the user in and redirect to the dashboard
            login(accessToken, userData);
            router.push("/dashboard");
          } else {
            // Handle cases where the token is invalid
            router.push("/login?error=google_failed");
          }
        })
        .catch(() => {
          router.push("/login?error=google_failed");
        });
    } else {
      // Handle cases where the access_token is missing
      router.push("/login?error=token_missing");
    }
  }, [searchParams, login, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>{t("message")}</p>
    </div>
  );
}
