import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/404'],
      },
    ],
    sitemap: 'https://taskdey.com/sitemap.xml',
  };
}
