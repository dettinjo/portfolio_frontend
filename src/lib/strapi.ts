// src/lib/strapi.ts
import qs from "qs";
// --- THIS IS THE FIX (Part 1): Import the specific type for Strapi's Rich Text field ---
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

// Correct, flat interfaces for all content types
export interface SoftwareProject {
  id: number;
  slug: string;
  title: string;
  description: string;
  // --- THIS IS THE FIX (Part 2): Replace 'any' with the correct 'BlocksContent' type ---
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
    avatarUrl: string;
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
  return fetchAPI<SoftwareProject[]>('/software-projects', { populate: 'coverImage' });
}

export async function fetchSoftwareProjectBySlug(slug: string): Promise<SoftwareProject | null> {
    const projects = await fetchAPI<SoftwareProject[]>('/software-projects', {
        filters: { slug: { $eq: slug } },
        populate: ['coverImage', 'gallery'],
    });
    return projects?.[0] || null;
}

export async function fetchAllProjectSlugs(): Promise<{ slug: string }[]> {
    const projects = await fetchAPI<{ slug: string }[]>('/software-projects', { fields: ['slug'] });
    return projects.map(p => ({ slug: p.slug }));
}

export async function fetchSkills(): Promise<SkillCategory[]> {
    return fetchAPI<SkillCategory[]>('/skill-categories', {
        populate: 'skills',
        sort: 'order:asc',
    });
}

export async function fetchAlbums(): Promise<Album[]> {
    return fetchAPI<Album[]>('/albums', { populate: '*' });
}

export async function fetchAllAlbumSlugs(): Promise<{ slug: string }[]> {
    const albums = await fetchAPI<{ slug: string }[]>('/albums', { fields: ['slug'] });
    return albums.map(a => ({ slug: a.slug }));
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
    return fetchAPI<Testimonial[]>('/testimonials');
}

export async function fetchAlbumBySlug(slug: string): Promise<Album | null> {
    const albums = await fetchAPI<Album[]>('/albums', {
        filters: { slug: { $eq: slug } },
        populate: ['images', 'coverImage'],
    });
    return albums?.[0] || null;
}