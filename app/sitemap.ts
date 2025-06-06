import { MetadataRoute } from 'next';
import { NAV_LINKS } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://taskdey.com';

  const routes = NAV_LINKS.map((link) => ({
    url: `${baseUrl}${link.href}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: link.href === '/' ? 1 : 0.8,
  }));

  return routes;
}