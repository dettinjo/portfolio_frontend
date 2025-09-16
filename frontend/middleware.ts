import { NextRequest, NextResponse } from 'next/server';
import { routing, isValidLocale } from './src/i18n/routing';

// Get the domain names from environment variables
const SOFTWARE_DOMAIN = process.env.NEXT_PUBLIC_SOFTWARE_DOMAIN || 'codeby.joeldettinger.de';
const PHOTOGRAPHY_DOMAIN = process.env.NEXT_PUBLIC_PHOTOGRAPHY_DOMAIN || 'photosby.joeldettinger.de';
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'joeldettinger.de';

// A helper function to determine the user's preferred language
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // A simple parser to get the primary language (e.g., 'de' from 'de-DE,de;q=0.9...')
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
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\..*$/.test(pathname)
  ) {
    return;
  }

  // --- THIS IS THE DEFINITIVE ROUTING LOGIC ---

  // 1. Determine the user's locale
  const locale = getLocale(request);
  let finalPath = '';

  // 2. Determine the internal path based on the domain
  if (hostname === SOFTWARE_DOMAIN) {
    // A request to codeby.joeldettinger.de/some/path becomes an internal request
    // to /en/software/some/path
    finalPath = `/${locale}/software${pathname}`;
  } else if (hostname === PHOTOGRAPHY_DOMAIN) {
    // A request to photosby.joeldettinger.de/some/path becomes an internal request
    // to /en/photography/some/path
    finalPath = `/${locale}/photography${pathname}`;
  } else {
    // A request to the root domain joeldettinger.de/some/path becomes
    // an internal request to /en/some/path
    finalPath = `/${locale}${pathname}`;
  }
  
  // 3. Rewrite the request to the final, internal path.
  // The URL in the user's browser remains clean and unchanged.
  return NextResponse.rewrite(new URL(finalPath, request.url));
}

export const config = {
  // Match all paths to give the middleware full control
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
};