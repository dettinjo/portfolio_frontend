// portfolio-frontend/src/lib/strapi.ts
import qs from "qs";
import { type BlocksContent } from '@strapi/blocks-react-renderer';

// --- Interfaces remain the same ---
interface StrapiImage { id: number; url: string; alternativeText: string | null; width: number; height: number; }
interface StrapiResponseWrapper<T> { data: T; }
export interface SoftwareProject { id: number; slug: string; title: string; description: string; longDescription?: BlocksContent; projectType: string; developedAt?: string; liveUrl?: string; repoUrl?: string; tags: string[]; coverImage: StrapiImage | null; gallery: StrapiImage[] | null; }
export interface Skill { id: number; name: string; iconClassName: string; level: number; url: string; }
export interface SkillCategory { id: number; name: string; order: number; skills: Skill[]; }
export interface Album { id: number; slug: string; title: string; coverImage: StrapiImage; images: StrapiImage[]; }
export interface Testimonial { id: number; quote: string; name: string; role: string; avatar: StrapiImage | null; communication: number; creativity: number; professionalism: number; value: number; }


const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

// --- THIS IS THE FIX (Part 1): The core API function now accepts a locale ---
async function fetchAPI<T>(path: string, urlParamsObject = {}, options = {}, locale?: string): Promise<T> {
  try {
    const mergedOptions = { headers: { 'Content-Type': 'application/json' }, ...options };
    
    // Add locale to the parameters if it's provided
    const paramsWithLocale = { ...urlParamsObject, locale };

    const queryString = qs.stringify(paramsWithLocale, { encodeValuesOnly: true });
    const requestUrl = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(requestUrl, mergedOptions);
    if (!response.ok) {
      console.error(`Error fetching ${requestUrl}: ${response.status} ${response.statusText}`);
      throw new Error(`An error occurred please try again`);
    }
    const jsonData = await response.json();
    return (jsonData as StrapiResponseWrapper<T>).data || jsonData;
  } catch (error) {
    console.error(error);
    throw new Error(`An error occurred please try again`);
  }
}

// --- THIS IS THE FIX (Part 2): All fetching functions now accept and pass the locale ---

export async function fetchSoftwareProjects(locale?: string): Promise<SoftwareProject[]> {
  return fetchAPI<SoftwareProject[]>('/software-projects', { populate: { coverImage: true, gallery: true } }, {}, locale);
}

export async function fetchSoftwareProjectBySlug(slug: string, locale?: string): Promise<SoftwareProject | null> {
    const projects = await fetchAPI<SoftwareProject[]>('/software-projects', {
        filters: { slug: { $eq: slug } },
        populate: { coverImage: true, gallery: true },
    }, {}, locale);
    return projects?.[0] || null;
}

export async function fetchAllProjectSlugs(locale?: string): Promise<{ slug: string }[]> {
    const projects = await fetchAPI<{ slug: string }[]>('/software-projects', { fields: ['slug'] }, {}, locale);
    return projects.map(p => ({ slug: p.slug }));
}

export async function fetchSkills(locale?: string): Promise<SkillCategory[]> {
    return fetchAPI<SkillCategory[]>('/skill-categories', {
        populate: { skills: true },
        sort: 'order:asc',
    }, {}, locale);
}

export async function fetchAlbums(locale?: string): Promise<Album[]> {
    return fetchAPI<Album[]>('/albums', { populate: { coverImage: true, images: true } }, {}, locale);
}

export async function fetchAllAlbumSlugs(locale?: string): Promise<{ slug: string }[]> {
    const albums = await fetchAPI<{ slug: string }[]>('/albums', { fields: ['slug'] }, {}, locale);
    return albums.map(a => ({ slug: a.slug }));
}

export async function fetchTestimonials(locale?: string): Promise<Testimonial[]> {
    return fetchAPI<Testimonial[]>('/testimonials', { populate: { avatar: true } }, {}, locale);
}

export async function fetchAlbumBySlug(slug: string, locale?: string): Promise<Album | null> {
    const albums = await fetchAPI<Album[]>('/albums', {
        filters: { slug: { $eq: slug } },
        populate: { images: true, coverImage: true },
    }, {}, locale);
    return albums?.[0] || null;
}