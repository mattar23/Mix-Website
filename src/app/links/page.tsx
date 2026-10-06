import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ARTIST_INFO } from '@/data/bio';
import { siteConfig } from '@/config/site';
import { asset } from '@/lib/asset';

export const metadata: Metadata = {
  title: 'Links',
  description:
    'Maryam Attar on Instagram and SoundCloud, with links to her work, mixing and voiceover services, and equipment hire in Jeddah.',
  alternates: { canonical: `${siteConfig.url}/links` },
  openGraph: {
    title: 'Links | Maryam Attar',
    description: 'Everywhere Maryam Attar is, on one page.',
    url: `${siteConfig.url}/links`,
  },
};

// The page a social bio points at. One column, every destination a row,
// nothing else to read. It stays out of the masthead on purpose.
const ROWS = [
  ...ARTIST_INFO.socials.map((s) => ({
    label: s.name,
    detail: s.handle,
    href: s.url,
    external: true,
  })),
  { label: 'Listen to the work', detail: 'Rawda chapters and films', href: '/work', external: false },
  { label: 'Mixing and voiceover', detail: 'What a session includes', href: '/services', external: false },
  { label: 'Equipment hire', detail: 'Rate sheet, Jeddah', href: '/equipment', external: false },
  { label: 'Email', detail: ARTIST_INFO.email, href: `mailto:${ARTIST_INFO.email}`, external: true },
];

export default function LinksPage() {
  return (
    <section className="wrap step">
      <div className="linklist">
        <div className="figure linklist__portrait">
          <Image
            src={asset('/images/maryam-portrait.jpg')}
            alt="Maryam Attar"
            fill
            sizes="7rem"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <span className="accent-rule" aria-hidden="true" />
        <h1 className="display" style={{ fontSize: 'var(--t-head)' }}>
          {ARTIST_INFO.name}
        </h1>
        <p className="meta" style={{ marginTop: '0.75rem' }}>
          {ARTIST_INFO.title}, {ARTIST_INFO.location}
        </p>

        <ul className="index" style={{ marginTop: '2.5rem' }}>
          {ROWS.map((row) =>
            row.external ? (
              <li key={row.label}>
                <a
                  className="index__row linklist__row"
                  href={row.href}
                  target={row.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={row.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                >
                  <span className="index__title">{row.label}</span>
                  <span className="meta">{row.detail}</span>
                </a>
              </li>
            ) : (
              <li key={row.label}>
                <Link className="index__row linklist__row" href={row.href}>
                  <span className="index__title">{row.label}</span>
                  <span className="meta">{row.detail}</span>
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
}
