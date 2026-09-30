import { Metadata } from 'next';
import EquipmentClient from './EquipmentClient';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Equipment hire in Jeddah',
  description:
    'Microphones, recorders, preamps, and pedals for hire in Jeddah. Shure SM7B and SM57, Tascam Model 12, Cloudlifter, and Radial DIs, with day and week rates published in full.',
  keywords: [
    'audio equipment rental Jeddah',
    'Shure SM7B rental Saudi Arabia',
    'Tascam Model 12 hire Jeddah',
    'microphone rental Jeddah',
    'studio equipment hire Jeddah',
  ],
  alternates: { canonical: `${siteConfig.url}/equipment` },
  openGraph: {
    title: 'Equipment hire in Jeddah | Maryam Attar',
    description: 'Studio and field recording gear for hire, with day and week rates.',
    url: `${siteConfig.url}/equipment`,
    images: [
      {
        url: `${siteConfig.url}/images/aesthetic/equipment-flightcase.jpg`,
        width: 1200,
        height: 630,
        alt: 'Audio equipment ready for hire',
      },
    ],
  },
};

export default function EquipmentPage() {
  return <EquipmentClient />;
}
