import { Metadata } from 'next';
import WorkClient from './WorkClient';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Selected Works & Audio Samples',
  description:
    'Explore portfolio works, original compositions, and audio mixing credits by Maryam Attar for MDLBeast Expo 2020 Dubai, Nadine Jewellery, Athr Gallery, and independent artists.',
  alternates: {
    canonical: `${siteConfig.url}/work`,
  },
  openGraph: {
    title: 'Selected Works & Audio Samples | Maryam Attar',
    description:
      'Listen to commercial scoring, sound design, and vocal mix samples produced in Jeddah and available worldwide.',
    url: `${siteConfig.url}/work`,
    images: [
      {
        url: `${siteConfig.url}/images/projects/cloud-walker.jpg`,
        width: 1200,
        height: 630,
        alt: 'Maryam Attar Selected Works',
      },
    ],
  },
};

export default function WorkPage() {
  return <WorkClient />;
}
