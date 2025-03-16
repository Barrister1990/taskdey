module.exports = {
    siteUrl: 'https://taskdey.com',
    generateRobotsTxt: true,
    outDir: 'public',
    sitemapSize: 7000,
    exclude: ['/admin/*', '/dashboard/*'],
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    },
  };