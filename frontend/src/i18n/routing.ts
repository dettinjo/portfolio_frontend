import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de'] as const,
 
  // Used when no locale matches
  defaultLocale: 'en',

  // --- THIS IS THE CRITICAL AND FINAL FIX ---
  // This tells the middleware to ALWAYS add the locale prefix to the URL.
  // It forces the language detection to happen before any other routing logic.
  localePrefix: 'always'
});

// This type is now more robust thanks to `as const`.
export type Locale = (typeof routing.locales)[number];

// This is the type guard function for type safety.
export function isValidLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}