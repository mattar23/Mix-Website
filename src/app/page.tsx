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
    <section className="spread">
      {/* Cropped to the column around her face, which sits right of centre
          in the frame. */}
      <div className="figure spread__photo spread__photo-wide">
        <Image
          src={asset('/images/maryam-portrait.jpg')}
          alt="Maryam Attar at her desk in the studio"
          fill
          priority
          sizes="(max-width: 880px) 100vw, 40vw"
          style={{ objectFit: 'cover', objectPosition: '70% center' }}
        />
      </div>
      <div className="spread__text">
        <h1 className="hero-type" style={{ maxWidth: '13ch' }}>
          Helping shape what you already set in motion
        </h1>
        <span className="accent-rule" aria-hidden="true" />
        <p className="prose" style={{ marginTop: '1.4em' }}>
          Mixing and voiceover engineer based in {ARTIST_INFO.location}.
        </p>
        <p style={{ marginTop: '1.5em' }}>
          <Link className="btn" href="/work">
            Explore work
          </Link>
        </p>

        <ul className="entries">
          {ENTRIES.map((e) => (
            <li key={e.title}>
              <h2 className="display">{e.title}</h2>
              <p className="prose prose-fine">{e.body}</p>
              <Link className="ul-link meta" href={e.href}>
                {e.cta}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
