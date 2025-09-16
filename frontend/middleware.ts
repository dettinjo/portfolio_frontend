import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

// Get the domain names from environment variables
const SOFTWARE_DOMAIN = process.env.NEXT_PUBLIC_SOFTWARE_DOMAIN || 'codeby.joeldettinger.de';
const PHOTOGRAPHY_DOMAIN = process.env.NEXT_PUBLIC_PHOTOGRAPHY_DOMAIN || 'photosby.joeldettinger.de';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  
  // Get the hostname from the headers
  const hostname = request.headers.get('x-forwarded-host') || request.headers.get('host');

  // --- THIS IS THE DEFINITIVE ROUTING LOGIC ---

  // Check if the hostname matches the software domain AND the path doesn't already have the /software prefix
  if (hostname === SOFTWARE_DOMAIN && !url.pathname.includes('/software')) {
    // Rewrite the path to include the /software prefix
    url.pathname = `/software${url.pathname}`;

  // Check if the hostname matches the photography domain AND the path doesn't already have the /photography prefix
  } else if (hostname === PHOTOGRAPHY_DOMAIN && !url.pathname.includes('/photography')) {
    // Rewrite the path to include the /photography prefix
    url.pathname = `/photography${url.pathname}`;
  }
  
  // We create a new request with the (potentially) MODIFIED path
  const newRequest = new NextRequest(url, request);
  // We pass this new request to the standard `next-intl` middleware,
  // which will handle all the language prefixing and redirection correctly.
  return createMiddleware(routing)(newRequest);
}

export const config = {
  // This matcher ensures the middleware runs on every single navigation request.
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
};