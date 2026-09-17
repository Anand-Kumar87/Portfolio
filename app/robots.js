export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://portfolio-devlook.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
