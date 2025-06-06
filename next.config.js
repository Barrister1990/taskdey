/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,


  eslint: {
    // Lint these directories during builds
    dirs: ['app', 'components', 'lib', 'src'],
    // Do NOT ignore lint errors during builds for production
    // ignoreDuringBuilds: false, // implicitly false by default
  },

  images: {
    // Optimize images using modern formats
    formats: ['image/webp', 'image/avif'],

    // Responsive device widths
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // Static image sizes for optimization
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Domains allowed for external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.taskdey.com',
      },
      // Add other trusted domains as needed, for example:
      // {
      //   protocol: 'https',
      //   hostname: 'images.unsplash.com',
      // },
    ],
  },

  compress: true, // Enable gzip compression for assets

  experimental: {
    optimizeCss: true, // Optimize CSS output for better performance


  },
};

module.exports = nextConfig;
