import createMiddleware from 'next-intl/middleware';
import {routing} from './src/i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // This explicitly tells the middleware to run on the root, and on any path
  // that is NOT a system file or an API route.
  matcher: [
    '/',
    '/(de|en)/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};