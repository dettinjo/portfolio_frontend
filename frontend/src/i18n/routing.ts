import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de'] as const,
 
  // Used when no locale matches
  defaultLocale: 'en',

  // --- THIS IS THE CRITICAL AND FINAL FIX ---
  // We explicitly tell next-intl to NEVER add a prefix to the URL.
  // The language will be handled by a cookie, not the path.
  localePrefix: 'never'
});

// Helper type for type safety
export type Locale = (typeof routing.locales)[number];

// Helper type guard for type safety
export function isValidLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}