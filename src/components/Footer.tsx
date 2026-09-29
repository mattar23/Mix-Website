import React from 'react';
import { ARTIST_INFO } from '@/data/bio';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[#E2DDD4] bg-[#F7F5F0] mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#E2DDD4]">
          <div>
            <h3 className="text-base font-bold uppercase tracking-tight text-[#181716]">
              {ARTIST_INFO.name}
            </h3>
            <p className="text-xs text-[#6B665F] mt-0.5">
              Audio Engineering · Music Production · Sound Design · Equipment Rental
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
                className="text-xs font-mono uppercase tracking-wider text-[#181716] hover:text-[#B8532B] transition-colors flex items-center gap-1 group"
              >
                <span>{s.name}</span>
                <ArrowUpRight size={13} className="text-[#6B665F] group-hover:text-[#B8532B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
            <a
              href={`mailto:${ARTIST_INFO.email}`}
              className="text-xs font-mono uppercase tracking-wider text-[#181716] hover:text-[#B8532B] transition-colors flex items-center gap-1 group"
            >
              <span>Email</span>
              <ArrowUpRight size={13} className="text-[#6B665F] group-hover:text-[#B8532B]" />
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#6B665F]">
          <div className="flex items-center gap-4">
            <span className="uppercase">{ARTIST_INFO.location}</span>
            <span>·</span>
            <span>STUDIO MONITOR ACTIVE</span>
          </div>
          <div>
            © {new Date().getFullYear()} Maryam Attar. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
