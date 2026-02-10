import './globals.css';
import dynamic from 'next/dynamic';
import { Providers } from '@/components/Providers';

const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false });

export const metadata = {
  title: 'My Portfolio - Full Stack Developer',
  description: 'Professional portfolio showcasing my projects and skills',
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
