import { Metadata } from 'next';
import WorkClient from './WorkClient';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected work by Maryam Attar: mixing, voiceover, and original music for MDLBEAST, Athr Gallery, Nadine Jewellery, and Nur Taibah.',
  alternates: { canonical: `${siteConfig.url}/work` },
  openGraph: {
    title: 'Work | Maryam Attar',
    description: 'Mixing, voiceover, and original music for records, campaigns, and exhibitions.',
    url: `${siteConfig.url}/work`,
    images: [
      {
        url: `${siteConfig.url}/images/projects/rawda-water.jpg`,
        width: 1200,
        height: 630,
        alt: 'Selected work by Maryam Attar',
      },
    ],
  },
};

export default function WorkPage() {
  return <WorkClient />;
}
