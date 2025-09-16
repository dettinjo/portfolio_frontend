import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de'] as const,
 
  // Used when no locale matches
  defaultLocale: 'en',

  // --- THIS IS CRITICAL ---
  // We set this back to 'always'. This tells the i18n middleware that when it
  // receives a path without a locale (like our rewritten `/software` path),
  // it MUST perform a redirect to a path WITH a locale (e.g., `/de/software`).
  localePrefix: 'always'
});

// Helper type for type safety
export type Locale = (typeof routing.locales)[number];

// Helper type guard for type safety
export function isValidLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}