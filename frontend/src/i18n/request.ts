import {cookies, headers} from 'next/headers';
import {getRequestConfig} from 'next-intl/server';
import {isValidLocale, routing} from './routing';
 
export default getRequestConfig(async () => {
  // We correctly `await` the `cookies()` function.
  const cookieStore = await cookies();
  let locale = cookieStore.get('NEXT_LOCALE')?.value;

  // We check for the locale only if the cookie was not found.
  if (!locale) {
    // --- THIS IS THE CRITICAL AND FINAL FIX ---
    // We MUST `await` the `headers()` function to get the headers object.
    const headersStore = await headers();
    const acceptLanguage = headersStore.get('accept-language');

    if (acceptLanguage) {
      const primaryLanguage = acceptLanguage.split(',')[0].split('-')[0];
      if (isValidLocale(primaryLanguage)) {
        locale = primaryLanguage;
      }
    }
  }
  
  // Fallback to the default locale if no other was found.
  if (!locale || !isValidLocale(locale)) {
    locale = routing.defaultLocale;
  }
 
  return {
    locale,
    // The path here is also corrected to `../../`
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});