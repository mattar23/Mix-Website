import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { SERVICES, ADDITIONAL_SERVICES } from '@/data/services';
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

/** A run of titled paragraphs, as her document sets requirements and extras. */
function Titled({ items }: { items: { heading: string; body: string }[] }) {
  return (
    <div className="service__items">
      {items.map((i) => (
        <div key={i.heading}>
          <h4>{i.heading}</h4>
          <p className="prose prose-fine">{i.body}</p>
        </div>
      ))}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="speclist">
      {items.map((i) => (
        <li className="prose prose-fine" key={i}>
          {i}
        </li>
      ))}
    </ul>
  );
}

// One column, in the order of her document: what the service is, then a
// headed section for each part of it. Every service uses the same three
// heading levels, so the page reads the same way top to bottom.
export default function ServicesPage() {
  return (
    <>
      <section className="wrap step">
        <h1 className="hero-type">Services</h1>
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
          <article className="service">
            <h2 className="display">{service.title}</h2>
            <p className="prose service__lead">{service.shortDesc}</p>
            {service.fullDesc && <p className="prose">{service.fullDesc}</p>}

            {service.includes && (
              <section>
                <h3>Services Include</h3>
                <Bullets items={service.includes} />
              </section>
            )}

            {service.notes && (
              <section className="prose prose-fine service__notes">
                {service.notes.map((n) => (
                  <p key={n}>{n}</p>
                ))}
              </section>
            )}

            {/* Needed once a project is agreed, so it opens on request. */}
            {service.requirements && (
              <details className="fold service__fold">
                <summary>
                  <h3>Mix Delivery Requirements</h3>
                </summary>
                <Titled items={service.requirements} />
              </details>
            )}

            {service.delivery && (
              <section>
                <h3>Revisions & Delivery</h3>
                <Bullets items={service.delivery} />
              </section>
            )}

            <p className="service__cta">
              <Link className="btn" href={`/contact?service=${service.id}`}>
                Request a quote
              </Link>
            </p>
          </article>
        </section>
      ))}

      <section
        className="wrap step-b"
        id={ADDITIONAL_SERVICES.id}
        style={{ scrollMarginTop: '6rem' }}
      >
        <hr className="rule" />
        <article className="service">
          <h2 className="display">{ADDITIONAL_SERVICES.title}</h2>
          <p className="prose service__lead">{ADDITIONAL_SERVICES.intro}</p>
          <Titled items={ADDITIONAL_SERVICES.items} />
          <p className="service__cta">
            <Link className="btn" href="/contact">
              Request a quote
            </Link>
          </p>
        </article>
      </section>
    </>
  );
}
