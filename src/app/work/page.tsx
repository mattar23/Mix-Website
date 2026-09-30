import { Metadata } from 'next';
import WorkClient from './WorkClient';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected commissions and collaborations by Maryam Attar across music, film, and exhibition, including MDLBEAST, Athr Gallery, and Nadine Jewellery.',
  alternates: { canonical: `${siteConfig.url}/work` },
  openGraph: {
    title: 'Work | Maryam Attar',
    description: 'Scoring, sound design, and mixing for records, campaigns, and exhibitions.',
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
