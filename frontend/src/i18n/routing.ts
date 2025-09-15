import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'de'] as const,
  defaultLocale: 'en',
  localePrefix: 'always'
});

export type Locale = (typeof routing.locales)[number];

// THE FIX IS HERE: Replace `any` with `string`
export function isValidLocale(value: string): value is Locale {
  // We cast the locales array to a generic string array for the .includes() check
  return (routing.locales as readonly string[]).includes(value);
}