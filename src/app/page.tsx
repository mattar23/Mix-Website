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
      <section className="spread spread-wide">
        {/* The whole frame, uncropped: the picture is a close shot, so
            nothing of it is spared. */}
        <div className="figure spread__photo">
          <Image
            src={asset('/images/maryam-portrait.jpg')}
            alt="Maryam Attar at her desk in the studio"
            fill
            priority
            sizes="(max-width: 880px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="spread__text">
          <h1 className="hero-type" style={{ maxWidth: '13ch' }}>
            Helping shape what you already set in motion
          </h1>
          <span className="accent-rule" aria-hidden="true" />
          <p className="prose" style={{ marginTop: '1.25em' }}>
            Mix engineer based in {ARTIST_INFO.location}.
          </p>
          <p style={{ marginTop: '1.75em' }}>
            <Link className="btn" href="/work">
              Explore work
            </Link>
          </p>
        </div>
      </section>

      <section className="offers-band">
        <ul className="wrap offers">
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
      </section>
    </>
  );
}
