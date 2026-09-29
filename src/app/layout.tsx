import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AudioProvider } from '@/components/AudioPlayerContext';
import { RentalProvider } from '@/components/RentalContext';
import { ThemeProvider } from '@/components/ThemeContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AudioPlayerBar } from '@/components/AudioPlayerBar';
import { RentalDrawer } from '@/components/RentalDrawer';
import { NoiseOverlay } from '@/components/NoiseOverlay';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Maryam Attar | Audio Engineer, Music Producer & Sound Designer',
  description:
    'Sound for music, spaces and moving images. Production, mixing, sound design, and audio equipment rental based in Jeddah, Saudi Arabia — working with artists and clients across the region and worldwide.',
  keywords: [
    'Maryam Attar',
    'Music Producer Saudi Arabia',
    'Audio Engineer Jeddah',
    'Sound Design Middle East',
    'MDLBeast Producer',
    'Equipment Rental Jeddah',
    'Remote Audio Mixing',
    'Analog Recording Studio'
  ],
  authors: [{ name: 'Maryam Attar' }],
  openGraph: {
    title: 'Maryam Attar — Audio Engineer & Music Producer',
    description: 'Sound for music, spaces and moving images. Jeddah & Worldwide.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Maryam Attar Music',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} data-theme="light">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('maryam_theme');
                const theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
                if (theme === 'dark') document.documentElement.classList.add('dark');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg-main)] text-[var(--text-main)] pb-24 transition-colors duration-200">
        <NoiseOverlay />
        <ThemeProvider>
          <AudioProvider>
            <RentalProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <RentalDrawer />
              <AudioPlayerBar />
              <Footer />
            </RentalProvider>
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
