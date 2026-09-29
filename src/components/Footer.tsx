import React from 'react';
import { ARTIST_INFO } from '@/data/bio';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-main)] mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[var(--border-color)]">
          <div>
            <h3 className="text-base font-bold uppercase tracking-tight text-[var(--text-main)]">
              {ARTIST_INFO.name}
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Audio Engineering · Music Production · Sound Design · Equipment Rental
            </p>
            <p className="text-[11px] font-mono text-[var(--text-muted)] mt-1">
              Studio: Jeddah, Saudi Arabia · Available regionally across the GCC and worldwide for remote mixing & scoring.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-6">
            {ARTIST_INFO.socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono uppercase tracking-wider text-[var(--text-main)] hover:text-[var(--accent)] transition-colors flex items-center gap-1 group"
              >
                <span>{s.name}</span>
                <ArrowUpRight
                  size={13}
                  className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ))}
            <a
              href={`mailto:${ARTIST_INFO.email}`}
              className="text-xs font-mono uppercase tracking-wider text-[var(--text-main)] hover:text-[var(--accent)] transition-colors flex items-center gap-1 group"
            >
              <span>Email</span>
              <ArrowUpRight size={13} className="text-[var(--text-muted)] group-hover:text-[var(--accent)]" />
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <span className="uppercase text-[var(--text-main)]">JEDDAH 21°32&apos;N 39°10&apos;E</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span>STUDIO ONLINE</span>
            </span>
          </div>
          <div>
            © {new Date().getFullYear()} Maryam Attar. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
