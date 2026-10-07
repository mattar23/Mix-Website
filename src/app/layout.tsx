import type { Metadata, Viewport } from 'next';
import { Archivo, Roboto } from 'next/font/google';
import './globals.css';
import { AudioProvider } from '@/components/AudioPlayerContext';
import { Masthead } from '@/components/Masthead';
import { Colophon } from '@/components/Colophon';
import { PlayerBar } from '@/components/PlayerBar';
import { JsonLd } from '@/components/JsonLd';
import { siteConfig } from '@/config/site';
import { asset } from '@/lib/asset';

// One family for the whole site, at Maryam's request. The variable file
// covers every weight; reading text sets at 300, Roboto Light.
const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

// Her name in the masthead keeps the wide Archivo it had before the move to
// Roboto. Nothing else uses it.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#f4f0e7',
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
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: 'Maryam Attar in her Jeddah studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}${siteConfig.ogImage}`],
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
  manifest: asset('/manifest.webmanifest'),
  // Region hints for local search. Harmless where ignored.
  other: {
    'geo.region': 'SA-02',
    'geo.placename': 'Jeddah',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${roboto.variable} ${archivo.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body>
        <AudioProvider>
          <Masthead />
          <main>{children}</main>
          <Colophon />
          <PlayerBar />
        </AudioProvider>
      </body>
    </html>
  );
}
