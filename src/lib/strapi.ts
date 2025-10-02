// src/lib/strapi.ts
import qs from "qs";
import { type BlocksContent } from '@strapi/blocks-react-renderer';

// A flat representation of a Strapi Image object
interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

interface StrapiResponseWrapper<T> {
  data: T;
}

export interface SoftwareProject {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription?: BlocksContent;
  projectType: string;
  developedAt?: string;
  liveUrl?: string;
  repoUrl?: string;
  tags: string[];
  coverImage: StrapiImage | null;
  gallery: StrapiImage[] | null;
}

export interface Skill {
  id: number;
  name: string;
  iconClassName: string;
  level: number;
  url: string;
}

export interface SkillCategory {
  id: number;
  name: string;
  order: number;
  skills: Skill[];
}

export interface Album {
  id: number;
  slug: string;
  title: string;
  coverImage: StrapiImage;
  images: StrapiImage[];
}

export interface Testimonial {
    id: number;
    quote: string;
    name: string;
    role: string;
    avatar: StrapiImage | null;
    communication: number;
    creativity: number;
    professionalism: number;
    value: number;
}


const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

async function fetchAPI<T>(path: string, urlParamsObject = {}, options = {}): Promise<T> {
  try {
    const mergedOptions = {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    };
    
    const queryString = qs.stringify(urlParamsObject, {
      encodeValuesOnly: true,
    });

    const requestUrl = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(requestUrl, mergedOptions);
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Error fetching ${requestUrl}: ${response.status} ${response.statusText}`);
      console.error(`Error body:`, errorBody);
      throw new Error(`An error occurred please try again`);
    }
    const jsonData = await response.json();
    return (jsonData as StrapiResponseWrapper<T>).data || jsonData;
  } catch (error) {
    console.error(error);
    throw new Error(`An error occurred please try again`);
  }
}


export async function fetchSoftwareProjects(): Promise<SoftwareProject[]> {
  // --- THIS IS THE FIX ---
  // The 'populate' parameter is now an object, which qs will correctly stringify
  // into `populate[coverImage]=true&populate[gallery]=true`
  return fetchAPI<SoftwareProject[]>('/software-projects', { 
    populate: {
      coverImage: true,
      gallery: true,
    }
  });
}

export async function fetchSoftwareProjectBySlug(slug: string): Promise<SoftwareProject | null> {
    const projects = await fetchAPI<SoftwareProject[]>('/software-projects', {
        filters: { slug: { $eq: slug } },
        populate: {
          coverImage: true,
          gallery: true,
        },
    });
    return projects?.[0] || null;
}

export async function fetchAllProjectSlugs(): Promise<{ slug: string }[]> {
    const projects = await fetchAPI<{ slug: string }[]>('/software-projects', { fields: ['slug'] });
    return projects.map(p => ({ slug: p.slug }));
}

export async function fetchSkills(): Promise<SkillCategory[]> {
    return fetchAPI<SkillCategory[]>('/skill-categories', {
        populate: {
          skills: true,
        },
        sort: 'order:asc',
    });
}

export async function fetchAlbums(): Promise<Album[]> {
    // --- THIS IS THE FIX ---
    // The 'populate' parameter is now an object
    return fetchAPI<Album[]>('/albums', { 
      populate: {
        coverImage: true,
        images: true,
      }
    });
}

export async function fetchAllAlbumSlugs(): Promise<{ slug: string }[]> {
    const albums = await fetchAPI<{ slug: string }[]>('/albums', { fields: ['slug'] });
    return albums.map(a => ({ slug: a.slug }));
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
    return fetchAPI<Testimonial[]>('/testimonials', { 
      populate: {
        avatar: true,
      }
    });
}

export async function fetchAlbumBySlug(slug: string): Promise<Album | null> {
    const albums = await fetchAPI<Album[]>('/albums', {
        filters: { slug: { $eq: slug } },
        populate: {
          images: true,
          coverImage: true,
        },
    });
    return albums?.[0] || null;
}