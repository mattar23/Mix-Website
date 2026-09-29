import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ARTIST_INFO } from '@/data/bio';
import { ArrowRight, Award, GraduationCap, Cpu, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-20">
      {/* Hero Split Section (Directly from Mockup 4) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Authentic Collaboration Portrait */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] sm:aspect-[1/1] w-full rounded-lg overflow-hidden border border-[#E2DDD4] shadow-md group">
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
              <span className="text-[#B8532B] font-semibold">EST. 2019</span>
            </div>
          </div>

          <div className="p-5 bg-[#FFFFFF] border border-[#E2DDD4] rounded text-xs text-[#6B665F] space-y-2">
            <div className="flex items-center gap-2 text-[#181716] font-semibold uppercase font-mono text-[11px]">
              <Award size={14} className="text-[#B8532B]" />
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
            <div className="w-12 h-1 bg-[#B8532B]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#B8532B]">
              Biography
            </span>
            <h1 className="text-4xl sm:text-5xl font-light text-[#181716] tracking-tight">
              Maryam Attar
            </h1>
            <p className="text-sm font-mono text-[#6B665F]">
              {ARTIST_INFO.title} · {ARTIST_INFO.location}
            </p>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-[#181716] leading-relaxed font-light border-l-2 border-[#E2DDD4] pl-6">
            {ARTIST_INFO.longBio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-4 flex items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#181716] hover:bg-[#B8532B] text-[#F7F5F0] text-xs font-mono uppercase tracking-wider rounded transition-colors"
            >
              <span>Work Together</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#E2DDD4] hover:border-[#181716] text-[#181716] text-xs font-mono uppercase tracking-wider rounded transition-colors"
            >
              <span>View Portfolio</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CREDENTIALS, EDUCATION & TOOLKIT */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#E2DDD4]">
        {/* Education & Academic Honors */}
        <div className="bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg p-6 space-y-5">
          <div className="flex items-center gap-2">
            <GraduationCap size={18} className="text-[#B8532B]" />
            <h3 className="text-sm font-semibold uppercase font-mono tracking-wider text-[#181716]">
              Education & Honors
            </h3>
          </div>
          <div className="space-y-4">
            {ARTIST_INFO.education.map((edu, idx) => (
              <div key={idx} className="space-y-1">
                <h4 className="text-sm font-medium text-[#181716]">{edu.degree}</h4>
                <p className="text-xs text-[#6B665F]">{edu.institution}</p>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#6B665F]">
                  <span>{edu.period}</span>
                  {edu.honors && (
                    <span className="text-[#B8532B] font-semibold">{edu.honors}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Toolkit */}
        <div className="bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Cpu size={18} className="text-[#B8532B]" />
            <h3 className="text-sm font-semibold uppercase font-mono tracking-wider text-[#181716]">
              Technical Toolkit
            </h3>
          </div>
          <ul className="space-y-2.5">
            {ARTIST_INFO.toolkit.map((tool, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs text-[#6B665F]">
                <CheckCircle2 size={14} className="text-[#B8532B] shrink-0" />
                <span>{tool}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Selected Clients & Credits */}
        <div className="bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Award size={18} className="text-[#B8532B]" />
            <h3 className="text-sm font-semibold uppercase font-mono tracking-wider text-[#181716]">
              Selected Credits
            </h3>
          </div>
          <div className="space-y-3">
            {ARTIST_INFO.clientsAndCredits.map((credit, idx) => (
              <div key={idx} className="space-y-0.5">
                <span className="text-xs font-semibold text-[#181716]">
                  {credit.name}
                </span>
                <p className="text-xs text-[#6B665F]">{credit.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
