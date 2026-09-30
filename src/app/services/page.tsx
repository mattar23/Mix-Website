import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { SERVICES } from '@/data/services';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Mixing, production, sound design, and audio restoration by Maryam Attar, with the session and delivery requirements for each.',
  alternates: { canonical: `${siteConfig.url}/services` },
  openGraph: {
    title: 'Services | Maryam Attar',
    description:
      'What each kind of session covers, what you get back, and how to prepare your files.',
    url: `${siteConfig.url}/services`,
  },
};

export default function ServicesPage() {
  return (
    <>
      <section className="wrap step">
        <h1 className="hero-type" style={{ maxWidth: '12ch' }}>
          Services
        </h1>
        <p className="prose" style={{ marginTop: '2rem' }}>
          Four kinds of session. Each one lists what comes back to you and how to
          prepare your files, so there are no surprises once we start.
        </p>
      </section>

      {SERVICES.map((service) => (
        <section className="wrap step-b" key={service.id} id={service.id} style={{ scrollMarginTop: '6rem' }}>
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

              <p className="prose prose-fine" style={{ marginTop: '1.75rem' }}>
                {service.fullDesc}
              </p>

              <div className="two-col" style={{ marginTop: '3rem' }}>
                <div>
                  <p className="meta">What you get back</p>
                  <ul className="speclist" style={{ marginTop: '0.75rem' }}>
                    {service.deliverables.map((d) => (
                      <li className="prose prose-fine" key={d}>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {service.requirements && (
                  <div className="stack stack-lg">
                    {service.requirements.map((req) => (
                      <div key={req.heading}>
                        <p className="meta">{req.heading}</p>
                        <ul className="speclist" style={{ marginTop: '0.75rem' }}>
                          {req.points.map((p) => (
                            <li className="prose prose-fine" key={p}>
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <p style={{ marginTop: '2.5rem' }}>
                <Link className="btn" href={`/contact?service=${service.id}`}>
                  Ask about {service.title.toLowerCase()}
                </Link>
              </p>
            </div>
          </div>
        </section>
      ))}

      <section className="wrap step-b">
        <hr className="rule" />
        <div style={{ paddingTop: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
          <h2 className="hero-type" style={{ maxWidth: '14ch' }}>
            Something that fits none of these?
          </h2>
          <p className="prose" style={{ marginTop: '1.75rem' }}>
            Installations, scores, and long-form work get quoted on their own terms.
            Describe the piece and we will find the shape of it.
          </p>
          <p style={{ marginTop: '2.5rem' }}>
            <Link className="btn btn-solid" href="/contact">
              Start a conversation
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
