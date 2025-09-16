import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';


// Get the domain names from environment variables
const SOFTWARE_DOMAIN = process.env.NEXT_PUBLIC_SOFTWARE_DOMAIN || 'codeby.joeldettinger.de';
const PHOTOGRAPHY_DOMAIN = process.env.NEXT_PUBLIC_PHOTOGRAPHY_DOMAIN || 'photosby.joeldettinger.de';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('x-forwarded-host') || request.headers.get('host');
  
  // Check if the URL already has a valid locale prefix (e.g., /en, /de/software)
  const pathnameIsMissingLocale = routing.locales.every(
    (locale) => !request.nextUrl.pathname.startsWith(`/${locale}/`) && request.nextUrl.pathname !== `/${locale}`
  );

  // --- THIS IS THE DEFINITIVE ROUTING LOGIC ---

  // 1. Perform our custom subdomain rewrite ONLY IF a locale prefix is missing.
  // This is the critical guard clause that prevents the infinite redirect loop.
  if (pathnameIsMissingLocale) {
    if (hostname === SOFTWARE_DOMAIN) {
      // Internally rewrite the path to the correct content folder.
      request.nextUrl.pathname = `/software${request.nextUrl.pathname}`;
    } else if (hostname === PHOTOGRAPHY_DOMAIN) {
      request.nextUrl.pathname = `/photography${request.nextUrl.pathname}`;
    }
  }

  // 2. Now, we call the official `next-intl` middleware and pass it the
  //    (potentially) MODIFIED request. It will now handle language detection,
  //    redirection, and MOST IMPORTANTLY, it will set the server-side context
  //    correctly for the right content folder.
  return createIntlMiddleware(routing)(request);
}

export const config = {
  // This matcher ensures the middleware runs on every single navigation request.
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
};