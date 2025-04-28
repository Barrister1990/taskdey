/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.taskdey.com',
  generateRobotsTxt: true, // Generate robots.txt
  outDir: 'public',        // Sitemap will be generated into public/
  sitemapSize: 7000,       // Number of entries per sitemap file
  exclude: ['/admin/*', '/dashboard/*'], // Exclude admin or private routes
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://www.taskdey.com/server-sitemap.xml', // if you have dynamic ones
    ],
  },
};
