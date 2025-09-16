import "./globals.css";
import "devicon/devicon.min.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/Theme-Provider";
import { NextIntlClientProvider, useMessages } from "next-intl";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  /* ... */
};

// This root layout does NOT receive the locale param
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = useMessages();

  return (
    // The lang here will be overridden by the nested layout
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen ...", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* The i18n provider now wraps everything */}
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
