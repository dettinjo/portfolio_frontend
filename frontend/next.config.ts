import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
 
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        // THE FIX: Adding pathname to be more explicit and match the type
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        // THE FIX: Adding pathname to be more explicit and match the type
        pathname: '/**',
      },
    ],
  },
};
 
export default withNextIntl(nextConfig);