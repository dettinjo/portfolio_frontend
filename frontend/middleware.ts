import { NextRequest, NextResponse } from 'next/server';

const SOFTWARE_DOMAIN = process.env.NEXT_PUBLIC_SOFTWARE_DOMAIN || 'codeby.joeldettinger.de';
const PHOTOGRAPHY_DOMAIN = process.env.NEXT_PUBLIC_PHOTOGRAPHY_DOMAIN || 'photosby.joeldettinger.de';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('x-forwarded-host') || request.headers.get('host');

  // Skip middleware for Next.js internal files and static assets
  if (pathname.startsWith('/_next') || /\..*$/.test(pathname)) {
    return;
  }

  // --- THIS IS THE DEFINITIVE ROUTING LOGIC ---
  let rewritePath = pathname;
  
  if (hostname === SOFTWARE_DOMAIN) {
    rewritePath = `/software${pathname}`;
  } else if (hostname === PHOTOGRAPHY_DOMAIN) {
    rewritePath = `/photography${pathname}`;
  }

  // Rewrite to the internal path. The URL in the browser remains clean.
  // The locale is implicitly handled by the cookie via `request.ts`.
  return NextResponse.rewrite(new URL(rewritePath, request.url));
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
};