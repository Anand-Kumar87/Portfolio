import './globals.css';
import dynamic from 'next/dynamic';
import { Providers } from '@/components/Providers';

const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://portfolio-app-dun-mu.vercel.app'),
  title: {
    default: 'Anand Kumar | Full Stack Developer & Software Engineer',
    template: '%s | Anand Kumar',
  },
  description: 'Professional portfolio of Anand Kumar showcasing full-stack web applications, technical skills, certifications, and engineering projects.',
  keywords: [
    'Anand Kumar',
    'Full Stack Developer',
    'Software Engineer',
    'Next.js Developer',
    'React Developer',
    'Node.js',
    'Portfolio',
    'Web Development',
  ],
  authors: [{ name: 'Anand Kumar' }],
  creator: 'Anand Kumar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Anand Kumar | Full Stack Developer & Software Engineer',
    description: 'Explore full-stack web applications, modern UI/UX designs, and engineering projects by Anand Kumar.',
    siteName: 'Anand Kumar Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anand Kumar | Full Stack Developer',
    description: 'Explore full-stack web applications, modern UI/UX designs, and engineering projects by Anand Kumar.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        <Providers>
          <LoadingScreen />
          {children}
        </Providers>
      </body>
    </html>
  );
}
