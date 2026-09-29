import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AudioProvider } from '@/components/AudioPlayerContext';
import { RentalProvider } from '@/components/RentalContext';
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
  title: 'Maryam Attar | Audio Engineer & Music Producer',
  description:
    'Sound for music, spaces and moving images. Production, mixing, sound design, and audio equipment rental based in Jeddah, Saudi Arabia.',
  keywords: [
    'Maryam Attar',
    'Music Producer',
    'Audio Engineer',
    'Sound Design',
    'Jeddah Music',
    'Saudi Audio Production',
    'Equipment Rental',
    'Analog Mixing'
  ],
  authors: [{ name: 'Maryam Attar' }],
  openGraph: {
    title: 'Maryam Attar — Audio Engineer & Music Producer',
    description: 'Sound for music, spaces and moving images.',
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F7F5F0] text-[#181716] pb-24 selection:bg-[#B8532B] selection:text-white">
        <NoiseOverlay />
        <AudioProvider>
          <RentalProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <RentalDrawer />
            <AudioPlayerBar />
            <Footer />
          </RentalProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
