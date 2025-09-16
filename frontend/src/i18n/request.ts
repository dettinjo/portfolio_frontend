import {cookies, headers} from 'next/headers';
import {getRequestConfig} from 'next-intl/server';
import {isValidLocale, routing} from './routing';
 
export default getRequestConfig(async () => {
  // 1. Read the language from the 'NEXT_LOCALE' cookie.
  let locale = (await cookies()).get('NEXT_LOCALE')?.value;

  // 2. If no cookie, check the `Accept-Language` header for the first visit.
  if (!locale) {
    const acceptLanguage = (await headers()).get('accept-language');
    if (acceptLanguage) {
      const primaryLanguage = acceptLanguage.split(',')[0].split('-')[0];
      if (isValidLocale(primaryLanguage)) {
        locale = primaryLanguage;
      }
    }
  }
  
  // 3. Fallback to the default locale if no cookie and no valid header.
  if (!locale || !isValidLocale(locale)) {
    locale = routing.defaultLocale;
  }
 
  return {
    locale,
    // The path here is corrected to `../../` to correctly point
    // from `src/i18n/` to the root `messages` folder.
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});