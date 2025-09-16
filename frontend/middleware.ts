import { NextRequest, NextResponse } from 'next/server';
import { routing, isValidLocale } from './src/i18n/routing';

// Get the domain names from your environment variables
const SOFTWARE_DOMAIN = process.env.NEXT_PUBLIC_SOFTWARE_DOMAIN || 'codeby.joeldettinger.de';
const PHOTOGRAPHY_DOMAIN = process.env.NEXT_PUBLIC_PHOTOGRAPHY_DOMAIN || 'photosby.joeldettinger.de';
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'joeldettinger.de';

// A helper function to determine the user's preferred language from headers
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const primaryLanguage = acceptLanguage.split(',')[0].split('-')[0];
    if (isValidLocale(primaryLanguage)) {
      return primaryLanguage;
    }
  }
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

  // 1. Check if the URL is missing a supported locale prefix.
  const pathnameIsMissingLocale = routing.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // 2. If the locale is missing, redirect to add it.
  // This is the first and most important step for a new visitor.
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    
    // e.g., A request to / on the root domain will be redirected to /de
    // e.g., A request to / on a subdomain will be redirected to /de
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }

  // 3. If the locale is present, perform the silent, internal rewrite.
  let rewritePath = pathname;
  
  if (hostname === SOFTWARE_DOMAIN) {
    // A request for `codeby.joeldettinger.de/de/some-project` is rewritten
    // internally to `/de/software/some-project`
    rewritePath = pathname.replace(/^\/(\w{2})/, '/$1/software');
  } else if (hostname === PHOTOGRAPHY_DOMAIN) {
    // Does the same for the photography domain
    rewritePath = pathname.replace(/^\/(\w{2})/, '/$1/photography');
  }

  // Rewrite to the final, internal path.
  // The user's URL bar remains clean (e.g., `codeby.joeldettinger.de/de`).
  return NextResponse.rewrite(new URL(rewritePath, request.url));
}

export const config = {
  // Match all paths to give the middleware full control
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
};