/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Important for CSS
  swcMinify: true,
  
  // Disable CSS optimization temporarily
  experimental: {
    optimizeCss: false,
  },
  
  images: {
    domains: ['localhost', 'via.placeholder.com', 'cdn.simpleicons.org', 'skillicons.dev'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig;