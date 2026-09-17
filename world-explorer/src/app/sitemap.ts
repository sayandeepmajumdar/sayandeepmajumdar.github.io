import { MetadataRoute } from 'next';
import { COUNTRIES } from '@/data/countries';
import { CONTINENTS } from '@/data/continents';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://world-explorer.edu';

  const staticRoutes = [
    '',
    '/explore',
    '/countries',
    '/continents',
    '/flags',
    '/languages',
    '/games',
    '/games/flag-quiz',
    '/games/country-quiz',
    '/games/memory',
    '/games/continents',
    '/learn',
    '/compare',
    '/daily-challenge',
    '/progress',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const countryRoutes = COUNTRIES.map((c) => ({
    url: `${baseUrl}/countries/${c.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const learnRoutes = COUNTRIES.map((c) => ({
    url: `${baseUrl}/learn/${c.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const continentRoutes = CONTINENTS.map((c) => ({
    url: `${baseUrl}/continents/${c.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...continentRoutes, ...countryRoutes, ...learnRoutes];
}
