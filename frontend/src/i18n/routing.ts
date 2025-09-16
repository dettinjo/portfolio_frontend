import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'de'] as const,
  defaultLocale: 'en',
  localePrefix: 'always'
});

export type Locale = (typeof routing.locales)[number];

export function isValidLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}