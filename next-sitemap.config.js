/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://taskdey.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/404'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/404'],
      },
    ],
  },
}