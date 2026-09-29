import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ARTIST_INFO } from '@/data/bio';
import { ArrowRight, Award, GraduationCap, Cpu, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-20">
      {/* Hero Split Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Portrait */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] sm:aspect-[1/1] w-full rounded-lg overflow-hidden border border-[var(--border-color)] shadow-md group">
            <Image
              src="/images/maryam-session-collab.jpg"
              alt="Maryam Attar working in studio environment"
              fill
              priority
              className="object-cover group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono flex justify-between items-center">
              <span>STUDIO COLLABORATION · JEDDAH</span>
              <span className="text-[var(--accent)] font-semibold">EST. 2019</span>
            </div>
          </div>

          <div className="p-5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded text-xs text-[var(--text-muted)] space-y-2">
            <div className="flex items-center gap-2 text-[var(--text-main)] font-semibold uppercase font-mono text-[11px]">
              <Award size={14} className="text-[var(--accent)]" />
              <span>Philosophy</span>
            </div>
            <p className="leading-relaxed">
              &ldquo;Moving between experimentation and intention, allowing sound itself to shape the direction of a piece while using tone, texture, and space to build an immersive environment around its narrative.&rdquo;
            </p>
          </div>
        </div>

        {/* Right Column: Bio Content */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="w-12 h-1 bg-[var(--accent)]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
              Biography
            </span>
            <h1 className="text-4xl sm:text-5xl font-light text-[var(--text-main)] tracking-tight">
              Maryam Attar
            </h1>
            <p className="text-sm font-mono text-[var(--text-muted)]">
              {ARTIST_INFO.title} · {ARTIST_INFO.location}
            </p>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-[var(--text-main)] leading-relaxed font-light border-l-2 border-[var(--border-color)] pl-6">
            {ARTIST_INFO.longBio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-4 flex items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--text-main)] hover:bg-[var(--accent)] text-[var(--bg-main)] hover:text-white text-xs font-mono uppercase tracking-wider rounded transition-colors"
            >
              <span>Work Together</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-color)] hover:border-[var(--text-main)] text-[var(--text-main)] text-xs font-mono uppercase tracking-wider rounded transition-colors"
            >
              <span>View Portfolio</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CREDENTIALS, EDUCATION & TOOLKIT */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[var(--border-color)]">
        {/* Education & Academic Honors */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-6 space-y-5">
          <div className="flex items-center gap-2">
            <GraduationCap size={18} className="text-[var(--accent)]" />
            <h3 className="text-sm font-semibold uppercase font-mono tracking-wider text-[var(--text-main)]">
              Education & Honors
            </h3>
          </div>
          <div className="space-y-4">
            {ARTIST_INFO.education.map((edu, idx) => (
              <div key={idx} className="space-y-1">
                <h4 className="text-sm font-medium text-[var(--text-main)]">{edu.degree}</h4>
                <p className="text-xs text-[var(--text-muted)]">{edu.institution}</p>
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                  <span>{edu.period}</span>
                  {edu.honors && (
                    <span className="text-[var(--accent)] font-semibold">{edu.honors}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Toolkit */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Cpu size={18} className="text-[var(--accent)]" />
            <h3 className="text-sm font-semibold uppercase font-mono tracking-wider text-[var(--text-main)]">
              Technical Toolkit
            </h3>
          </div>
          <ul className="space-y-2.5">
            {ARTIST_INFO.toolkit.map((tool, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <CheckCircle2 size={14} className="text-[var(--accent)] shrink-0" />
                <span>{tool}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Selected Clients & Credits */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Award size={18} className="text-[var(--accent)]" />
            <h3 className="text-sm font-semibold uppercase font-mono tracking-wider text-[var(--text-main)]">
              Selected Credits
            </h3>
          </div>
          <div className="space-y-3">
            {ARTIST_INFO.clientsAndCredits.map((credit, idx) => (
              <div key={idx} className="space-y-0.5">
                <span className="text-xs font-semibold text-[var(--text-main)]">
                  {credit.name}
                </span>
                <p className="text-xs text-[var(--text-muted)]">{credit.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
