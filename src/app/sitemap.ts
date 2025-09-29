// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { fetchAllProjectSlugs, fetchAllAlbumSlugs } from '@/lib/strapi'; // Your actual API functions

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const softwareDomain = process.env.NEXT_PUBLIC_SOFTWARE_DOMAIN;
  const photographyDomain = process.env.NEXT_PUBLIC_PHOTOGRAPHY_DOMAIN;
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  // --- FETCH DYNAMIC SLUGS ---
  const projectSlugs = await fetchAllProjectSlugs();
  const albumSlugs = await fetchAllAlbumSlugs();

  // --- MAP SLUGS TO SITEMAP ENTRIES ---
  const softwareProjectPages = projectSlugs.map(({ slug }) => ({
    url: `https://${softwareDomain}/${slug}`,
    lastModified: new Date(),
  }));

  const photographyAlbumPages = albumSlugs.map(({ slug }) => ({
    url: `https://${photographyDomain}/${slug}`,
    lastModified: new Date(),
  }));

  // --- DEFINE STATIC AND TOP-LEVEL PAGES ---
  const routes = [
    { url: `https://${rootDomain}`, priority: 1.0 },
    { url: `https://${softwareDomain}`, priority: 0.9 },
    { url: `https://${photographyDomain}`, priority: 0.9 },
    { url: `https://${rootDomain}/imprint`, priority: 0.5 },
    { url: `https://${rootDomain}/privacy_policy`, priority: 0.5 },
  ];

  return [
    ...routes,
    ...softwareProjectPages,
    ...photographyAlbumPages,
  ];
}