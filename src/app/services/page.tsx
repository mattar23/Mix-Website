import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { SERVICES } from '@/data/services';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Mixing and voiceover services',
  description:
    'Mixing for singles, EPs, and albums, and editing and mixing for podcasts and voiceovers, by Maryam Attar in Jeddah, Saudi Arabia. Remote sessions across the GCC, with delivery requirements listed.',
  alternates: { canonical: `${siteConfig.url}/services` },
  openGraph: {
    title: 'Mixing and voiceover services | Maryam Attar',
    description: 'What each session covers, what comes back, and how to prepare your files.',
    url: `${siteConfig.url}/services`,
  },
};

function List({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div>
      <p className="meta">{heading}</p>
      <ul className="speclist" style={{ marginTop: '0.75rem' }}>
        {items.map((i) => (
          <li className="prose prose-fine" key={i}>
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <section className="wrap step">
        <h1 className="hero-type" style={{ maxWidth: '12ch' }}>
          Services
        </h1>
        <span className="accent-rule" aria-hidden="true" />
      </section>

      {SERVICES.map((service) => (
        <section
          className="wrap step-b"
          key={service.id}
          id={service.id}
          style={{ scrollMarginTop: '6rem' }}
        >
          <hr className="rule" />
          <div className="doc" style={{ paddingTop: '2.5rem' }}>
            <h2 className="margin-head doc__margin">{service.title}</h2>
            <div>
              <p
                className="prose"
                style={{ fontSize: 'var(--t-sub)', lineHeight: 1.32, maxWidth: '20em' }}
              >
                {service.shortDesc}
              </p>
              <p className="prose prose-fine" style={{ marginTop: '1.75rem', maxWidth: '44em' }}>
                {service.fullDesc}
              </p>

              <div className="two-col" style={{ marginTop: '2rem' }}>
                {service.includes && <List heading="Included" items={service.includes} />}
                {service.excludes && (
                  <List heading="Before you send" items={service.excludes} />
                )}
                {service.delivery && (
                  <List heading="Revisions and delivery" items={service.delivery} />
                )}
                {service.extras && <List heading="Optional extras" items={service.extras} />}
              </div>

              {/* Needed once a project is agreed, so it opens on request. */}
              {service.requirements && (
                <details className="fold">
                  <summary>Preparing your session</summary>
                  <div className="fold__cols">
                    {service.requirements.map((r) => (
                      <List key={r.heading} heading={r.heading} items={r.points} />
                    ))}
                  </div>
                </details>
              )}

              <p style={{ marginTop: '2rem' }}>
                <Link className="btn" href={`/contact?service=${service.id}`}>
                  Request a quote
                </Link>
              </p>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
