import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { SERVICES } from '@/data/services';
import { ArrowRight, CheckCircle2, FileAudio } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Audio Mixing, Production & Sound Design Services',
  description:
    'Detailed audio mixing, creative music production, bespoke sound design, and audio restoration services by Maryam Attar. Multitrack specifications and delivery requirements included.',
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: 'Studio Services & Technical Specs | Maryam Attar',
    description:
      'Explore delivery guidelines, DAW session requirements, revision policies, and custom quote options for music and visual media.',
    url: `${siteConfig.url}/services`,
  },
};

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-20">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[var(--border-color)] pb-12">
        <div className="lg:col-span-8 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
            Studio Capabilities · Jeddah & Remote Worldwide
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-[var(--text-main)] tracking-tight">
            Mixing, Production & Sound Design
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl font-light">
            Focused, detail-oriented audio services for music, film, installations, and commercial projects. Moving between experimental sonic textures and calibrated audio precision.
          </p>
        </div>
        <div className="lg:col-span-4 relative aspect-[16/9] w-full rounded overflow-hidden border border-[var(--border-color)]">
          <Image
            src="/images/aesthetic/analog-mixer.jpg"
            alt="Studio mixing console"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Services Detailed List */}
      <div className="space-y-16">
        {SERVICES.map((service) => (
          <section
            key={service.id}
            id={service.id}
            className="p-8 md:p-12 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg space-y-8 shadow-xs scroll-mt-24"
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
              <div className="flex items-center gap-3">
                <span className="text-xl font-mono font-bold text-[var(--accent)]">
                  {service.number}
                </span>
                <h2 className="text-2xl sm:text-3xl font-light text-[var(--text-main)] tracking-tight">
                  {service.title}
                </h2>
              </div>
              <Link
                href={`/contact?service=${service.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--text-main)] text-[var(--bg-main)] hover:bg-[var(--accent)] hover:text-white transition-colors text-xs font-mono uppercase tracking-wider rounded"
              >
                <span>Request a Quote</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Description & Deliverables */}
              <div className="lg:col-span-7 space-y-6">
                <p className="text-base text-[var(--text-main)] leading-relaxed font-normal">
                  {service.shortDesc}
                </p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {service.fullDesc}
                </p>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs uppercase font-mono tracking-wider text-[var(--text-main)]">
                    Included Deliverables
                  </h4>
                  <ul className="space-y-2">
                    {service.deliverables.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-[var(--text-muted)]"
                      >
                        <CheckCircle2 size={15} className="text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Requirements & Guidelines */}
              {service.requirements && (
                <div className="lg:col-span-5 bg-[var(--bg-subtle)] p-6 rounded border border-[var(--border-color)] space-y-5">
                  <div className="flex items-center gap-2">
                    <FileAudio size={16} className="text-[var(--accent)]" />
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-main)]">
                      Delivery Requirements
                    </h4>
                  </div>
                  <div className="space-y-4">
                    {service.requirements.map((req, rIdx) => (
                      <div key={rIdx} className="space-y-1">
                        <h5 className="text-xs font-semibold text-[var(--text-main)]">
                          {req.heading}
                        </h5>
                        <ul className="space-y-1 text-xs text-[var(--text-muted)]">
                          {req.points.map((p, pIdx) => (
                            <li key={pIdx} className="list-disc list-inside">
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-[var(--border-color)] text-[11px] font-mono text-[var(--text-muted)]">
                    Turnaround confirmed upon booking · Remote file delivery supported
                  </div>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* CTA Box */}
      <div className="p-8 md:p-12 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg text-center space-y-4 max-w-3xl mx-auto">
        <h3 className="text-2xl font-light text-[var(--text-main)]">
          Have a project with custom requirements?
        </h3>
        <p className="text-sm text-[var(--text-muted)] max-w-lg mx-auto">
          From independent album singles to full-scale museum sound installations, get in touch for custom multitrack packages and scheduling.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-mono uppercase tracking-wider rounded transition-colors"
          >
            <span>Start a Conversation</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
