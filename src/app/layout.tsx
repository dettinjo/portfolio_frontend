import "./globals.css";
import "devicon/devicon.min.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/Theme-Provider";

// 1. Import the Vercel components here
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

// --- SEO ENHANCEMENT ---
export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Joel Dettinger - Software & Photography", // A fallback title
  },
  description: "Software Development and Photography by Joel Dettinger",
  // Define alternates for hreflang tags here for the root page
  alternates: {
    canonical: `https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    languages: {
      en: `https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
      de: `https://de.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, // Example alternate
      "x-default": `https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
