import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { ARTIST_INFO } from '@/data/bio';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Maryam Attar is a mixing and voiceover engineer in Jeddah, Saudi Arabia, with credits for MDLBEAST, Athr Gallery, Nadine Jewellery, and the Saudi Music Commission.',
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
    <>
      <section className="wrap step">
        <span className="accent-rule" aria-hidden="true" />
        <h1 className="hero-type" style={{ maxWidth: '10ch' }}>
          Maryam Attar
        </h1>

        <div
          className="hero"
          style={{ marginTop: 'clamp(2.5rem, 6vw, 5rem)', alignItems: 'start' }}
        >
          <div className="doc">
            <p className="meta doc__margin">
              {ARTIST_INFO.title}
              <br />
              {ARTIST_INFO.location}
            </p>
            <div className="prose">
              {ARTIST_INFO.longBio.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
          {/* Same 1024px portrait as the home page, held to a width it can carry. */}
          <div className="figure hero__portrait">
            <Image
              src="/images/maryam-portrait.jpg"
              alt="Maryam Attar at her desk in the studio"
              fill
              sizes="(max-width: 1024px) 100vw, 40rem"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <section className="wrap step-b">
        <hr className="rule" />
        <div className="doc" style={{ paddingTop: '2.5rem' }}>
          <p className="meta doc__margin">Credits</p>
          <div className="index" style={{ borderTop: 0 }}>
            {ARTIST_INFO.clientsAndCredits.map((credit) => (
              <div className="index__row index__row-static" key={credit.name}>
                <span className="index__year">{credit.name}</span>
                <span className="prose prose-fine" style={{ maxWidth: '40ch' }}>
                  {credit.detail}
                </span>
                <span />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
