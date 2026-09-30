import React from 'react';
import Link from 'next/link';
import { ARTIST_INFO } from '@/data/bio';

export function Colophon() {
  return (
    <footer className="step-t">
      <div className="wrap">
        <hr className="rule" />
        <div className="doc" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
          <p className="meta doc__margin">Colophon</p>

          <div className="split">
            <div className="stack stack-sm">
              <p className="prose prose-fine" style={{ maxWidth: '26em', color: 'var(--ink)' }}>
                Maryam Attar records, mixes, and designs sound in Jeddah, and works
                remotely with artists and directors elsewhere.
              </p>
              <p className="meta">
                <a className="ul-link" href={`mailto:${ARTIST_INFO.email}`}>
                  {ARTIST_INFO.email}
                </a>
              </p>
            </div>

            <div className="stack stack-sm">
              {ARTIST_INFO.socials.map((s) => (
                <p className="meta" key={s.name}>
                  <a
                    className="ul-link"
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.name}
                  </a>
                </p>
              ))}
              <p className="meta">
                <Link className="ul-link" href="/contact">
                  Contact
                </Link>
              </p>
            </div>

            <p className="meta meta-micro quiet">
              © {new Date().getFullYear()} Maryam Attar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
