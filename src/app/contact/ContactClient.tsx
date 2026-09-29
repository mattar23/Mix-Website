'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ARTIST_INFO } from '@/data/bio';
import { Mail, MapPin, ArrowUpRight, Send, CheckCircle2, Disc, Globe } from 'lucide-react';

function ContactFormContent() {
  const searchParams = useSearchParams();
  const defaultService = searchParams.get('service') || 'mixing';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: defaultService,
    budget: '',
    timeline: '',
    location: '',
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
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
          Initiate a Project · Jeddah & Worldwide
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-[var(--text-main)] tracking-tight">
          Let’s work together.
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
          For mixing, original music production, audiovisual sound design, or equipment rental in Jeddah, send a message below or contact directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Direct Info & Socials */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg space-y-6">
            <h3 className="text-sm font-semibold uppercase font-mono tracking-wider text-[var(--text-main)]">
              Direct Contact
            </h3>
            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-[var(--accent)] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[var(--text-muted)] block text-[10px] uppercase">Email</span>
                  <a
                    href={`mailto:${ARTIST_INFO.email}`}
                    className="text-sm font-sans font-medium text-[var(--text-main)] hover:text-[var(--accent)] transition-colors"
                  >
                    {ARTIST_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[var(--accent)] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[var(--text-muted)] block text-[10px] uppercase">Studio Location</span>
                  <span className="text-sm font-sans text-[var(--text-main)]">{ARTIST_INFO.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe size={16} className="text-[var(--accent)] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[var(--text-muted)] block text-[10px] uppercase">Remote Clients</span>
                  <span className="text-sm font-sans text-[var(--text-main)]">Riyadh, Dubai, London & Worldwide</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
              <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">
                Social & Profiles
              </span>
              <div className="space-y-2">
                {ARTIST_INFO.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs text-[var(--text-main)] hover:text-[var(--accent)] py-1 border-b border-[var(--border-subtle)] transition-colors group"
                  >
                    <span className="font-mono">{s.name}</span>
                    <ArrowUpRight
                      size={14}
                      className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 bg-[var(--bg-subtle)] border border-[var(--border-color)] rounded text-xs text-[var(--text-muted)] space-y-2">
            <div className="flex items-center gap-2 text-[var(--text-main)] font-semibold font-mono uppercase text-[11px]">
              <Disc size={14} className="text-[var(--accent)]" />
              <span>Session Protocol</span>
            </div>
            <p className="leading-relaxed">
              Inquiries are typically reviewed within 24–48 hours. Multitrack files can be securely transferred via WeTransfer or Google Drive in native sample rates.
            </p>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-7 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-8 md:p-10">
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-light text-[var(--text-main)]">Inquiry Received</h3>
              <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
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
                    location: '',
                    message: '',
                  });
                }}
                className="mt-4 px-6 py-2.5 bg-[var(--text-main)] hover:bg-[var(--accent)] text-[var(--bg-main)] hover:text-white text-xs font-mono uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-light text-[var(--text-main)]">Project Brief & Inquiry</h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Fill in the parameters below to initiate a production or rental consultation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[var(--text-main)] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sultan Al-Otaibi"
                    className="w-full bg-[var(--bg-subtle)] border border-[var(--border-color)] px-4 py-2.5 text-xs text-[var(--text-main)] rounded outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--text-main)] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sultan@studio.com"
                    className="w-full bg-[var(--bg-subtle)] border border-[var(--border-color)] px-4 py-2.5 text-xs text-[var(--text-main)] rounded outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[var(--text-main)] mb-1.5">
                    Service Required
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[var(--bg-subtle)] border border-[var(--border-color)] px-4 py-2.5 text-xs text-[var(--text-main)] rounded outline-none focus:border-[var(--accent)] transition-colors cursor-pointer"
                  >
                    <option value="mixing">Mixing (Singles / EP / Album)</option>
                    <option value="production">Music Production & Composition</option>
                    <option value="sound-design">Sound Design & Spatial Audio</option>
                    <option value="restoration">Audio Restoration / De-noise</option>
                    <option value="equipment">Equipment Rental (Jeddah pickup/delivery)</option>
                    <option value="other">Other Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--text-main)] mb-1.5">
                    Your Location (City / Country)
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Jeddah, Riyadh, London..."
                    className="w-full bg-[var(--bg-subtle)] border border-[var(--border-color)] px-4 py-2.5 text-xs text-[var(--text-main)] rounded outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-main)] mb-1.5">
                  Project Description & Vision *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about the tracks, sound references, desired tone, instrumentation, or gear specifications..."
                  className="w-full bg-[var(--bg-subtle)] border border-[var(--border-color)] px-4 py-2.5 text-xs text-[var(--text-main)] rounded outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
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

export default function ContactClient() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-6 py-16 text-xs font-mono text-[var(--text-muted)]">Loading inquiry module...</div>}>
      <ContactFormContent />
    </Suspense>
  );
}
