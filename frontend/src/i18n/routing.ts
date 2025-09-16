import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'de'] as const,
  defaultLocale: 'en',
  
  // --- THIS IS THE CRITICAL FIX ---
  // This tells the middleware:
  // - For the default locale 'en', DO NOT add a prefix.
  // - For all other locales, DO add a prefix.
  localePrefix: 'as-needed'
});

export type Locale = (typeof routing.locales)[number];

export function isValidLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}