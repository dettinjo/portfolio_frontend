import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'de'] as const,
  defaultLocale: 'en',
  
  // CRITICAL: We tell next-intl to NEVER touch the URL. Our middleware handles it all.
  localePrefix: 'never'
});

export type Locale = (typeof routing.locales)[number];

export function isValidLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}