import { NextRequest, NextResponse } from 'next/server';
import { routing, isValidLocale } from './src/i18n/routing';

// Get the domain names from your environment variables
const SOFTWARE_DOMAIN = process.env.NEXT_PUBLIC_SOFTWARE_DOMAIN || 'codeby.joeldettinger.de';
const PHOTOGRAPHY_DOMAIN = process.env.NEXT_PUBLIC_PHOTOGRAPHY_DOMAIN || 'photosby.joeldettinger.de';

// A helper function to determine the user's preferred language from headers
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const primaryLanguage = acceptLanguage.split(',')[0].split('-')[0];
    if (isValidLocale(primaryLanguage)) {
      return primaryLanguage;
    }
  }
  // Fallback to the default if no supported language is found
  return routing.defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('x-forwarded-host') || request.headers.get('host');

  // Skip middleware for Next.js internal files and static assets
  if (pathname.startsWith('/_next') || /\..*$/.test(pathname)) {
    return;
  }

  // --- THIS IS THE DEFINITIVE ROUTING LOGIC ---

  // 1. Determine the user's locale from their browser settings.
  //    The `LanguageToggle` cookie will override this on subsequent visits.
  const locale = getLocale(request);
  let finalPath = pathname;

  // 2. Determine the internal content folder based on the domain.
  if (hostname === SOFTWARE_DOMAIN) {
    // A request to codeby.joeldettinger.de/some/path becomes an internal request
    // to /software/some/path.
    finalPath = `/software${pathname}`;
  } else if (hostname === PHOTOGRAPHY_DOMAIN) {
    // Does the same for the photography domain.
    finalPath = `/photography${pathname}`;
  }
  
  // 3. Rewrite the request to the final, internal path.
  //    The URL in the user's browser remains clean and unchanged.
  //    e.g., `codeby.joeldettinger.de/` is rewritten internally to `/software/`.
  //    The locale context is handled by `next-intl` reading the cookie/header.
  return NextResponse.rewrite(new URL(finalPath, request.url));
}

export const config = {
  // Match all paths to give the middleware full control
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
};