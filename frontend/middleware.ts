import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

// Get the domain names from environment variables
const SOFTWARE_DOMAIN = process.env.NEXT_PUBLIC_SOFTWARE_DOMAIN || 'codeby.joeldettinger.de';
const PHOTOGRAPHY_DOMAIN = process.env.NEXT_PUBLIC_PHOTOGRAPHY_DOMAIN || 'photosby.joeldettinger.de';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  
  // Get the hostname from the headers
  const hostname = request.headers.get('x-forwarded-host') || request.headers.get('host');

  // Ignore requests for static assets and API routes
  if (
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/_next') ||
    /\..*$/.test(url.pathname)
  ) {
    return;
  }

  // --- THIS IS THE DEFINITIVE ROUTING LOGIC ---

  // 1. Check if the request is for a subdomain.
  if (hostname === SOFTWARE_DOMAIN) {
    // 2. If it is, rewrite the path INTERNALLY to the correct folder.
    // e.g., a request for `/de` on the software domain becomes a request for `/de/software`
    // The URL in the user's browser remains `codeby.joeldettinger.de/de`.
    url.pathname = `/software${url.pathname}`;

  } else if (hostname === PHOTOGRAPHY_DOMAIN) {
    // Do the same for the photography domain.
    url.pathname = `/photography${url.pathname}`;
  }
  
  // 3. We create a new request with the MODIFIED path and pass it to the
  //    standard `next-intl` middleware. The i18n middleware now handles
  //    language detection and prefixing for the CORRECT, rewritten path.
  const newRequest = new NextRequest(url, request);
  return createIntlMiddleware(routing)(newRequest);
}

export const config = {
  // This matcher ensures the middleware runs on every single request.
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
};