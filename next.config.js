/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Required for static export on GitHub Pages
  output: 'export',
  
  // Only apply basePath in production to avoid 404 during local development
  basePath: isProd ? '/Skeumorphic-Calendar-Project' : '',
  
  // GitHub Pages doesn't support the default Next.js Image Optimization
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
