import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing, isValidLocale } from "@/i18n/routing";
import { notFound } from "next/navigation";
import React from "react";

// For Static Rendering
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// 1. DEFINE THE CORRECT PROPS TYPE
// The `params` prop is a Promise that resolves to the object.
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// 2. THE COMPONENT MUST BE `async`.
export default async function LocaleLayout({ children, params }: Props) {
  // 3. You MUST await the params Promise to get the value.
  const { locale } = await params;

  // 4. From here, the logic is the same, but now it's type-safe.
  if (!isValidLocale(locale)) {
    notFound();
  }
  setRequestLocale(locale);

  // 5. Use the async-compatible `getMessages` function.
  const messages = await getMessages();

  // This component now ONLY provides the i18n context.
  // It does not render <html> or <body>, which are handled by the root layout.
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
