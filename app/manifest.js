export default function manifest() {
  return {
    name: 'Anand Kumar | Senior Mobile & Full-Stack Developer',
    short_name: 'Anand Kumar',
    description: 'Senior Flutter Developer & Full-Stack Architect portfolio showcasing high-performance cross-platform mobile apps and modern web systems.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0f19',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '128x128',
        type: 'image/png',
      },
    ],
  };
}
