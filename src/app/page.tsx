import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { asset } from '@/lib/asset';
import { SERVICES } from '@/data/services';
import { ARTIST_INFO } from '@/data/bio';

const ENTRIES = [
  ...SERVICES.map((s) => ({
    title: s.title,
    body: s.teaser,
    href: `/services#${s.id}`,
    cta: 'What is included',
  })),
  {
    title: 'Equipment Rental',
    body: 'A selection of audio equipment available for short and long term rental.',
    href: '/equipment',
    cta: 'See the rates',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="wrap" style={{ paddingBlock: '2rem' }}>
        <div className="hero">
          <div>
            <h1 className="hero-type" style={{ maxWidth: '13ch' }}>
              Helping shape what you already set in motion
            </h1>
            <span className="accent-rule" aria-hidden="true" />
            <p className="prose" style={{ marginTop: '1.5rem', textWrap: 'balance' }}>
              Mixing and voiceover engineer based in {ARTIST_INFO.location}.
            </p>
            <p style={{ marginTop: '2rem' }}>
              <Link className="btn" href="/work">
                Explore work
              </Link>
            </p>
          </div>
          {/* The only portrait is 1024px wide, so it is held to a size it can
              carry rather than run full bleed. */}
          <div className="figure hero__portrait">
            <Image
              src={asset('/images/maryam-portrait.jpg')}
              alt="Maryam Attar at her desk in the studio"
              fill
              priority
              sizes="(max-width: 880px) 100vw, 40rem"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <section className="wrap step-b">
        <hr className="rule" />
        <ul className="trio">
          {ENTRIES.map((e) => (
            <li key={e.title}>
              <h2 className="display">{e.title}</h2>
              <p className="prose prose-fine" style={{ marginTop: '0.75rem' }}>
                {e.body}
              </p>
              <p>
                <Link className="ul-link meta" href={e.href}>
                  {e.cta}
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
