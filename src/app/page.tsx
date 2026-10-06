import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { asset } from '@/lib/asset';
import { SERVICES } from '@/data/services';

const ENTRIES = [
  ...SERVICES.map((s) => ({
    title: s.title,
    body: s.shortDesc,
    href: `/services#${s.id}`,
    cta: `About ${s.title.toLowerCase()}`,
  })),
  {
    title: 'Equipment Rental',
    body: 'Microphones, recorders, DI boxes, pedals, and amplifiers for hire in Jeddah, with day and week rates published in full.',
    href: '/equipment',
    cta: 'See the rate sheet',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="wrap step">
        <div className="hero">
          <div>
            <span className="accent-rule" aria-hidden="true" />
            <h1 className="hero-type" style={{ maxWidth: '12ch' }}>
              Sound for music, spaces, and moving images.
            </h1>
            <p className="prose" style={{ marginTop: '2rem', maxWidth: '34em' }}>
              Maryam Attar is a mixing and voiceover engineer in Jeddah, Saudi
              Arabia, working with artists, podcasters, and directors here and
              remotely across the Gulf.
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
              sizes="(max-width: 1024px) 100vw, 40rem"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <section className="wrap step-b">
        <hr className="rule" />
        <ol className="trio">
          {ENTRIES.map((e, i) => (
            <li key={e.title}>
              <p className="meta num">0{i + 1}</p>
              <h2 className="display" style={{ marginTop: '0.75rem' }}>
                {e.title}
              </h2>
              <p className="prose prose-fine" style={{ marginTop: '1rem' }}>
                {e.body}
              </p>
              <p style={{ marginTop: '1.5rem' }}>
                <Link className="ul-link meta" href={e.href}>
                  {e.cta}
                </Link>
              </p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
