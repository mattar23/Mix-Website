import React from 'react';
import Image from 'next/image';
import { asset } from '@/lib/asset';
import { Metadata } from 'next';
import { ARTIST_INFO } from '@/data/bio';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Maryam Attar is a mixing and voiceover engineer in Jeddah, Saudi Arabia, with credits for MDLBEAST, Athr Gallery, Nadine Jewellery, and Nur Taibah.',
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: 'About | Maryam Attar',
    description: 'A mixing and voiceover engineer in Jeddah, and the work behind the credits.',
    url: `${siteConfig.url}/about`,
    images: [
      {
        url: `${siteConfig.url}/images/og-portrait.jpg`,
        width: 1200,
        height: 630,
        alt: 'Maryam Attar in the studio',
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <section className="spread">
      {/* The dark background session photo Maryam chose for this page,
          cut 4:5 around the two figures from the 40 megapixel original. */}
      <div className="figure spread__photo">
        <Image
          src={asset('/images/maryam-session.jpg')}
          alt="Maryam Attar listening back with a collaborator during a session"
          fill
          priority
          sizes="(max-width: 880px) 100vw, 40vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="spread__text">
        <h1 className="hero-type">About</h1>
        <span className="accent-rule" aria-hidden="true" />
        <div className="prose about__bio">
          {ARTIST_INFO.longBio.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
