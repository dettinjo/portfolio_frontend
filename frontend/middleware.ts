import createMiddleware from 'next-intl/middleware';
import {routing} from './src/i18n/routing';
 
// This is the standard middleware from the next-intl documentation.
// Its only job is to set the language context for the request based on the cookie.
// It will NOT change the URL because of our routing config.
export default createMiddleware(routing);
 
export const config = {
  // This matcher ensures the middleware runs on all paths to set the language context.
  matcher: ['/', '/(de|en)/:path*'] // Keep this matcher for robustness
};