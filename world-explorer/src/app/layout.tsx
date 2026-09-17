import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'World Explorer — Learn the world. One country at a time.',
  description:
    'Explore countries, discover fascinating flags, learn languages, and test your knowledge through interactive challenges, maps, and guided lessons.',
  keywords: [
    'geography',
    'world map',
    'countries',
    'national flags',
    'capitals',
    'languages',
    'phrases',
    'educational games',
    'quiz',
  ],
  authors: [{ name: 'World Explorer Team' }],
  openGraph: {
    title: 'World Explorer — Learn the world. One country at a time.',
    description:
      'Explore countries, discover fascinating flags, learn languages, and test your knowledge through interactive challenges.',
    type: 'website',
    locale: 'en_US',
    siteName: 'World Explorer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'World Explorer',
    description: 'Learn the world. One country at a time.',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0d9488' },
    { media: '(prefers-color-scheme: dark)', color: '#090d16' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased selection:bg-teal-500/20 selection:text-teal-700 dark:selection:text-teal-300">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
