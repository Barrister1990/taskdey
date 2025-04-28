// pages/api/sitemap.js
import { getServerSideSitemap } from 'next-sitemap';

export default async function handler(req, res) {
  const services = [
    'electricians', 'plumbers', 'carpenters', 'painters', 'mechanics', 'cleaners',
    'gardeners', 'tailors', 'masons', 'welders', 'chefs', 'drivers',
    'hairdressers', 'makeup-artists', 'barbers', 'photographers', 'videographers',
    'fashion-designers', 'interior-decorators', 'furniture-makers', 'ac-technicians',
    'tilers', 'roofers', 'event-planners', 'dj-services', 'bakers', 'laundry-services',
    'security-guards', 'nannies', 'bricklayers', 'plasterers', 'solar-installers',
    'pool-cleaners', 'pest-control', 'flooring-specialists', 'sign-writers', 'computer-repair',
  ];

  const cities = ['accra', 'kumasi', 'takoradi', 'tamale', 'cape-coast'];

  const fields = [
    { loc: 'https://www.taskdey.com', lastmod: new Date().toISOString(), changefreq: 'daily', priority: 1.0 },
  ];

  services.forEach((service) => {
    fields.push({
      loc: `https://www.taskdey.com/services/${service}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
    });

    cities.forEach((city) => {
      fields.push({
        loc: `https://www.taskdey.com/services/${service}/${city}`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      });
    });
  });

  cities.forEach((city) => {
    fields.push({
      loc: `https://www.taskdey.com/location/${city}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
    });
  });

  return getServerSideSitemap(req, res, fields);
}
