import React from 'react';
import Link from 'next/link';
import { ARTIST_INFO } from '@/data/bio';

export function Colophon() {
  return (
    <footer>
      <div className="wrap">
        <hr className="rule" />
        <div className="colophon meta">
          <p className="colophon__links">
            {ARTIST_INFO.socials.map((s) => (
              <a
                key={s.name}
                className="ul-link"
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.name}
              </a>
            ))}
            <Link className="ul-link" href="/contact">
              Contact
            </Link>
          </p>
          <p className="colophon__place">
            <span>{ARTIST_INFO.location}</span>
            <span className="quiet">© {new Date().getFullYear()}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
