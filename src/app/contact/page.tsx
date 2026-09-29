'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ARTIST_INFO } from '@/data/bio';
import { Mail, MapPin, ArrowUpRight, Send, CheckCircle2, Disc } from 'lucide-react';

function ContactFormContent() {
  const searchParams = useSearchParams();
  const defaultService = searchParams.get('service') || 'mixing';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: defaultService,
    budget: '',
    timeline: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <span className="text-xs font-mono uppercase tracking-widest text-[#B8532B]">
          Initiate a Project
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#181716] tracking-tight">
          Let’s work together.
        </h1>
        <p className="text-base sm:text-lg text-[#6B665F] leading-relaxed">
          For mixing, original music production, audiovisual sound design, or equipment rental inquiries, send a message below or email directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Direct Info & Socials */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg space-y-6">
            <h3 className="text-sm font-semibold uppercase font-mono tracking-wider text-[#181716]">
              Direct Contact
            </h3>
            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-[#B8532B] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#6B665F] block text-[10px] uppercase">Email</span>
                  <a
                    href={`mailto:${ARTIST_INFO.email}`}
                    className="text-sm font-sans font-medium text-[#181716] hover:text-[#B8532B] transition-colors"
                  >
                    {ARTIST_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#B8532B] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#6B665F] block text-[10px] uppercase">Studio Location</span>
                  <span className="text-sm font-sans text-[#181716]">{ARTIST_INFO.location}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EFECE5] space-y-3">
              <span className="text-[10px] font-mono uppercase text-[#6B665F] block">
                Social & Profiles
              </span>
              <div className="space-y-2">
                {ARTIST_INFO.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs text-[#181716] hover:text-[#B8532B] py-1 border-b border-[#F7F5F0] transition-colors group"
                  >
                    <span className="font-mono">{s.name}</span>
                    <ArrowUpRight size={14} className="text-[#6B665F] group-hover:text-[#B8532B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#EFECE5] border border-[#E2DDD4] rounded text-xs text-[#6B665F] space-y-2">
            <div className="flex items-center gap-2 text-[#181716] font-semibold font-mono uppercase text-[11px]">
              <Disc size={14} className="text-[#B8532B]" />
              <span>Studio Protocol</span>
            </div>
            <p className="leading-relaxed">
              Inquiries are typically reviewed within 24–48 hours. For urgent multitrack delivery turnaround or rush rental needs, please specify your project timeline in the message.
            </p>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg p-8 md:p-10">
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#F7EDE7] text-[#B8532B] flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-light text-[#181716]">Inquiry Received</h3>
              <p className="text-sm text-[#6B665F] max-w-md mx-auto leading-relaxed">
                Thank you for reaching out, {formData.name}. Maryam will review your project parameters and reply with availability and proposal details shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    service: 'mixing',
                    budget: '',
                    timeline: '',
                    message: '',
                  });
                }}
                className="mt-4 px-6 py-2.5 bg-[#181716] hover:bg-[#B8532B] text-white text-xs font-mono uppercase tracking-wider rounded transition-colors"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-light text-[#181716]">Project Brief & Inquiry</h3>
                <p className="text-xs text-[#6B665F]">
                  Fill in the parameters below to initiate a production or rental consultation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#181716] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sultan Al-Otaibi"
                    className="w-full bg-[#F7F5F0] border border-[#E2DDD4] px-4 py-2.5 text-xs text-[#181716] rounded outline-none focus:border-[#B8532B] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#181716] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sultan@studio.com"
                    className="w-full bg-[#F7F5F0] border border-[#E2DDD4] px-4 py-2.5 text-xs text-[#181716] rounded outline-none focus:border-[#B8532B] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#181716] mb-1.5">
                    Service Required
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#F7F5F0] border border-[#E2DDD4] px-4 py-2.5 text-xs text-[#181716] rounded outline-none focus:border-[#B8532B] transition-colors cursor-pointer"
                  >
                    <option value="mixing">Mixing (Singles / EP / Album)</option>
                    <option value="production">Music Production & Composition</option>
                    <option value="sound-design">Sound Design & Spatial Audio</option>
                    <option value="restoration">Audio Restoration / De-noise</option>
                    <option value="equipment">Equipment Rental Inquiries</option>
                    <option value="other">Other Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#181716] mb-1.5">
                    Target Timeline
                  </label>
                  <input
                    type="text"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    placeholder="e.g. Next 2 weeks, October 2026"
                    className="w-full bg-[#F7F5F0] border border-[#E2DDD4] px-4 py-2.5 text-xs text-[#181716] rounded outline-none focus:border-[#B8532B] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#181716] mb-1.5">
                  Project Description & Vision *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about the tracks, sound references, desired tone, instrumentation, or gear specifications..."
                  className="w-full bg-[#F7F5F0] border border-[#E2DDD4] px-4 py-2.5 text-xs text-[#181716] rounded outline-none focus:border-[#B8532B] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#B8532B] hover:bg-[#9E431E] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Send Project Inquiry</span>
                <Send size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-6 py-16 text-xs font-mono text-[#6B665F]">Loading inquiry module...</div>}>
      <ContactFormContent />
    </Suspense>
  );
}
