import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { ARTIST_INFO } from '@/data/bio';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Maryam Attar is a producer, sound designer, and audio engineer in Jeddah, working in experimental electronic music and sound for film and exhibition.',
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: 'About | Maryam Attar',
    description:
      'Sound design and production rooted in experimental electronic music and narrative listening.',
    url: `${siteConfig.url}/about`,
    images: [
      {
        url: `${siteConfig.url}/images/maryam-session-collab.jpg`,
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
        <h1 className="hero-type" style={{ maxWidth: '10ch' }}>
          Maryam Attar
        </h1>

        <div className="doc" style={{ marginTop: 'clamp(2.5rem, 6vw, 5rem)' }}>
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
      </section>

      <section className="wrap step-b">
        <div className="figure" style={{ aspectRatio: '16 / 7' }}>
          <Image
            src="/images/maryam-session-collab.jpg"
            alt="Maryam Attar working with a collaborator in the studio"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
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

      <section className="wrap step-b">
        <hr className="rule" />
        <div className="doc" style={{ paddingTop: '2.5rem' }}>
          <p className="meta doc__margin">Background</p>

          <div className="two-col">
            <div>
              <p className="meta">Study</p>
              <div className="stack" style={{ marginTop: '0.75rem' }}>
                {ARTIST_INFO.education.map((edu) => (
                  <div key={edu.degree}>
                    <p style={{ fontWeight: 500, letterSpacing: '-0.012em' }}>{edu.degree}</p>
                    <p className="meta">
                      {edu.institution}, {edu.period}
                      {edu.honors ? ` · ${edu.honors}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="meta">Tools in regular use</p>
              <ul className="speclist" style={{ marginTop: '0.75rem' }}>
                {ARTIST_INFO.toolkit.map((tool) => (
                  <li className="prose prose-fine" key={tool}>
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap step-b">
        <hr className="rule" />
        <div style={{ paddingTop: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
          <h2 className="hero-type" style={{ maxWidth: '12ch' }}>
            Work together.
          </h2>
          <p className="cluster cluster-lg" style={{ marginTop: '2.5rem' }}>
            <Link className="btn btn-solid" href="/contact">
              Get in touch
            </Link>
            <Link className="btn" href="/work">
              See the work
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
