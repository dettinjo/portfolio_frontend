import createMiddleware from 'next-intl/middleware';
import {routing} from './src/i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // This matcher ensures the middleware runs on all paths
  // except for specific asset folders and files with extensions.
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)'
};