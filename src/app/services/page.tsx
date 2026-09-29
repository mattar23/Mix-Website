import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SERVICES } from '@/data/services';
import { ArrowRight, CheckCircle2, FileAudio } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-20">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#E2DDD4] pb-12">
        <div className="lg:col-span-8 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8532B]">
            Studio Capabilities
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#181716] tracking-tight">
            Mixing, Production & Sound Design
          </h1>
          <p className="text-base sm:text-lg text-[#6B665F] leading-relaxed max-w-2xl font-light">
            Focused, detail-oriented audio services for music, film, installations, and commercial projects. Moving between experimental sonic textures and calibrated audio precision.
          </p>
        </div>
        <div className="lg:col-span-4 relative aspect-[16/9] w-full rounded overflow-hidden border border-[#E2DDD4]">
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
            className="p-8 md:p-12 bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg space-y-8 shadow-xs scroll-mt-24"
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-[#EFECE5] pb-6">
              <div className="flex items-center gap-3">
                <span className="text-xl font-mono font-bold text-[#B8532B]">
                  {service.number}
                </span>
                <h2 className="text-2xl sm:text-3xl font-light text-[#181716] tracking-tight">
                  {service.title}
                </h2>
              </div>
              <Link
                href={`/contact?service=${service.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#181716] text-[#F7F5F0] hover:bg-[#B8532B] transition-colors text-xs font-mono uppercase tracking-wider rounded"
              >
                <span>Request a Quote</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Description & Deliverables */}
              <div className="lg:col-span-7 space-y-6">
                <p className="text-base text-[#181716] leading-relaxed font-normal">
                  {service.shortDesc}
                </p>
                <p className="text-sm text-[#6B665F] leading-relaxed">
                  {service.fullDesc}
                </p>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs uppercase font-mono tracking-wider text-[#181716]">
                    Included Deliverables
                  </h4>
                  <ul className="space-y-2">
                    {service.deliverables.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-[#6B665F]"
                      >
                        <CheckCircle2 size={15} className="text-[#B8532B] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Requirements & Guidelines (especially for Mixing) */}
              {service.requirements && (
                <div className="lg:col-span-5 bg-[#F7F5F0] p-6 rounded border border-[#E2DDD4] space-y-5">
                  <div className="flex items-center gap-2">
                    <FileAudio size={16} className="text-[#B8532B]" />
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#181716]">
                      Delivery Requirements
                    </h4>
                  </div>
                  <div className="space-y-4">
                    {service.requirements.map((req, rIdx) => (
                      <div key={rIdx} className="space-y-1">
                        <h5 className="text-xs font-semibold text-[#181716]">
                          {req.heading}
                        </h5>
                        <ul className="space-y-1 text-xs text-[#6B665F]">
                          {req.points.map((p, pIdx) => (
                            <li key={pIdx} className="list-disc list-inside">
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-[#E2DDD4] text-[11px] font-mono text-[#6B665F]">
                    Turnaround confirmed upon project confirmation · Mastering not included
                  </div>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* CTA Box */}
      <div className="p-8 md:p-12 bg-[#F1EDE4] border border-[#E2DDD4] rounded-lg text-center space-y-4 max-w-3xl mx-auto">
        <h3 className="text-2xl font-light text-[#181716]">
          Have a project with custom requirements?
        </h3>
        <p className="text-sm text-[#6B665F] max-w-lg mx-auto">
          From short social clips to complete EP production and site-specific gallery audio installations, get in touch for custom rates and scheduling.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#B8532B] hover:bg-[#9E431E] text-white text-xs font-mono uppercase tracking-wider rounded transition-colors"
          >
            <span>Start a Conversation</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
