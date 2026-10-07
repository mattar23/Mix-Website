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

/** A run of headed paragraphs, as her document sets requirements and extras. */
function Headed({ items }: { items: { heading: string; body: string }[] }) {
  return (
    <>
      {items.map((i) => (
        <div key={i.heading}>
          <p className="meta">{i.heading}</p>
          <p className="prose prose-fine" style={{ marginTop: '0.35rem' }}>
            {i.body}
          </p>
        </div>
      ))}
    </>
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
                style={{ fontSize: 'var(--t-sub)', lineHeight: 1.32, maxWidth: '26em' }}
              >
                {service.shortDesc}
              </p>
              {service.fullDesc && (
                <p className="prose prose-fine" style={{ marginTop: '1.75rem', maxWidth: '44em' }}>
                  {service.fullDesc}
                </p>
              )}

              <div className="two-col" style={{ marginTop: '2rem' }}>
                {service.includes && <List heading="Services Include" items={service.includes} />}
                {service.notes && (
                  <div className="prose prose-fine">
                    {service.notes.map((n) => (
                      <p key={n}>{n}</p>
                    ))}
                  </div>
                )}
                {service.delivery && (
                  <List heading="Revisions & Delivery" items={service.delivery} />
                )}
                {service.extras && (
                  <div>
                    <p className="meta">Additional Services & Deliverables</p>
                    <p className="prose prose-fine" style={{ marginTop: '0.75rem' }}>
                      {service.extrasIntro}
                    </p>
                    <div className="stack" style={{ marginTop: '1rem' }}>
                      <Headed items={service.extras} />
                    </div>
                  </div>
                )}
              </div>

              {/* Needed once a project is agreed, so it opens on request. */}
              {service.requirements && (
                <details className="fold">
                  <summary>Mix Delivery Requirements</summary>
                  <div className="fold__cols">
                    <Headed items={service.requirements} />
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
