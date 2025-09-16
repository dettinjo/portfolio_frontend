import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
 
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  
  // --- THIS IS THE NEW, POWERFUL REWRITE CONFIGURATION ---
  async rewrites() {
    return {
      // These rewrites are checked after the filesystem and middleware.
      // This is crucial because it means the i18n middleware has already
      // added the /de or /en prefix before this rule runs.
      afterFiles: [
        // For the software domain...
        {
          // Match any path on this host (e.g., /de, /de/some-project)
          source: '/:path*', 
          // Internally, treat it as if it were the /software path.
          // e.g., a request for /de on this host becomes a request for /software/de.
          destination: '/software/:path*', 
          has: [
            {
              type: 'host',
              value: 'codeby.joeldettinger.de',
            },
          ],
        },
        // For the photography domain...
        {
          source: '/:path*',
          destination: '/photography/:path*',
          has: [
            {
              type: 'host',
              value: 'photosby.joeldettinger.de',
            },
          ],
        },
      ],
    };
  },
  
  // --- YOUR EXISTING IMAGE CONFIGURATION ---
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};
 
export default withNextIntl(nextConfig);