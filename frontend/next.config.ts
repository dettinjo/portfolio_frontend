import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
 
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  
  // --- THIS IS THE DEFINITIVE ROUTING LOGIC ---
  async rewrites() {
    return [
      // Rule for the software domain
      {
        source: '/:path*', // Match any path on this host (e.g., /, /project-slug)
        // Internally, map it to the /software path.
        destination: '/software/:path*', 
        has: [
          {
            type: 'host',
            value: process.env.NEXT_PUBLIC_SOFTWARE_DOMAIN || 'codeby.joeldettinger.de',
          },
        ],
      },
      // Rule for the photography domain
      {
        source: '/:path*',
        destination: '/photography/:path*',
        has: [
          {
            type: 'host',
            value: process.env.NEXT_PUBLIC_PHOTOGRAPHY_DOMAIN || 'photosby.joeldettinger.de',
          },
        ],
      },
    ];
  },
  
  // --- YOUR EXISTING IMAGE CONFIGURATION ---
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
};
 
export default withNextIntl(nextConfig);