import { Metadata } from 'next';
import EquipmentClient from './EquipmentClient';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Audio Equipment Rental Jeddah | Microphones, Mixers & Pedals',
  description:
    'Rent professional studio and field recording equipment in Jeddah, Saudi Arabia. Shure SM7B, SM57, Tascam Model 12, Cloudlifter, Radial DIs, and boutique guitar pedals available on daily and weekly rates.',
  keywords: [
    'Audio Equipment Rental Jeddah',
    'Shure SM7B Rental Saudi Arabia',
    'Tascam Model 12 Hire Jeddah',
    'Microphone Rental Jeddah',
    'Cloudlifter Hire',
    'Audio Gear Rent KSA',
    'Studio Equipment Hire Jeddah',
  ],
  alternates: {
    canonical: `${siteConfig.url}/equipment`,
  },
  openGraph: {
    title: 'Audio Equipment Rental Catalog | Maryam Attar (Jeddah, KSA)',
    description:
      'Browse professional studio audio hardware available for hire in Jeddah. Transparent daily and weekly pricing with 3x weekly rate caps.',
    url: `${siteConfig.url}/equipment`,
    images: [
      {
        url: `${siteConfig.url}/images/aesthetic/equipment-flightcase.jpg`,
        width: 1200,
        height: 630,
        alt: 'Audio Equipment Rental Flight Case',
      },
    ],
  },
};

export default function EquipmentPage() {
  return <EquipmentClient />;
}
