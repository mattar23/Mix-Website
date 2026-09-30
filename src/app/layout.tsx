import type { Metadata, Viewport } from 'next';
import { Archivo, Newsreader } from 'next/font/google';
import './globals.css';
import { AudioProvider } from '@/components/AudioPlayerContext';
import { RentalProvider } from '@/components/RentalContext';
import { ThemeProvider } from '@/components/ThemeContext';
import { Masthead } from '@/components/Masthead';
import { Colophon } from '@/components/Colophon';
import { PlayerBar } from '@/components/PlayerBar';
import { RentalDrawer } from '@/components/RentalDrawer';
import { JsonLd } from '@/components/JsonLd';
import { siteConfig } from '@/config/site';

// Display and interface. The width axis, 62 to 125, carries the personality.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

// Reading text. Optical sizing keeps prose warm at length.
const newsreader = Newsreader({
  subsets: ['latin'],
  axes: ['opsz'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e4e2dd' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a09' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s | Maryam Attar',
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    alternateLocale: siteConfig.alternateLocales,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Maryam Attar in the studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: { icon: '/favicon.ico', shortcut: '/favicon.ico', apple: '/favicon.ico' },
  manifest: '/manifest.webmanifest',
};

// Runs before paint so the stored theme never flashes.
const themeInit = `
try {
  var t = localStorage.getItem('ma-theme')
    || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', t);
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // suppressHydrationWarning: the theme script rewrites data-theme before
  // React hydrates, so the server value is meant to differ. It applies to
  // this element's own attributes only, not to anything nested inside.
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${archivo.variable} ${newsreader.variable}`}
    >
      <head>
        <JsonLd />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <ThemeProvider>
          <AudioProvider>
            <RentalProvider>
              <Masthead />
              <main>{children}</main>
              <Colophon />
              <RentalDrawer />
              <PlayerBar />
            </RentalProvider>
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
