import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Read domain names from environment variables
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || '';
  const softwareDomain = process.env.NEXT_PUBLIC_SOFTWARE_DOMAIN || '';
  const photographyDomain = process.env.NEXT_PUBLIC_PHOTOGRAPHY_DOMAIN || '';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/photography/leave-a-review/',
      },
    ],
    sitemap: [
      `https://${rootDomain}/sitemap.xml`,
      `https://${softwareDomain}/sitemap.xml`,
      `https://${photographyDomain}/sitemap.xml`,
    ],
  };
}