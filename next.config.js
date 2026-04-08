/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for static export on GitHub Pages
  output: 'export',
  
  // Replace 'Skeumorphic-Calendar-Project' with your actual repository name if different
  basePath: '/Skeumorphic-Calendar-Project',
  
  // GitHub Pages doesn't support the default Next.js Image Optimization
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
