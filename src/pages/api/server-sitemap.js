import { getServerSideSitemap } from 'next-sitemap';

export default async function handler(req, res) {
  const services = [
    'electricians',
    'plumbers',
    'carpenters',
    'painters',
    'mechanics',
    'cleaners',
    'gardeners',
    'tailors',
    'masons',
    'welders',
    'chefs',
    'drivers'
  ];
  
  const cities = [
    'accra',
    'kumasi',
    'takoradi',
    'tamale',
    'cape-coast'
  ];

  // Start with the homepage
  const fields = [
    {
      loc: 'https://taskdey.com',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
    }
  ];
  
  // Add "virtual" service pages
  services.forEach((service) => {
    fields.push({
      loc: `https://taskdey.com/services/${service}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
    });
    
    // Add location-specific service pages
    cities.forEach((city) => {
      fields.push({
        loc: `https://taskdey.com/services/${service}/${city}`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      });
    });
  });
  
  // Add city pages
  cities.forEach((city) => {
    fields.push({
      loc: `https://taskdey.com/location/${city}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
    });
  });
  
  return getServerSideSitemap(req, res, fields);
}