'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, Pause, Disc, ArrowUpRight, Globe, MapPin } from 'lucide-react';
import { PROJECTS, AUDIO_SAMPLES } from '@/data/projects';
import { EQUIPMENT_INVENTORY } from '@/data/equipment';
import { useAudio } from '@/components/AudioPlayerContext';
import { useRental } from '@/components/RentalContext';

export default function HomePage() {
  const { currentTrack, isPlaying, playTrack } = useAudio();
  const { addToCart } = useRental();

  const primarySample = AUDIO_SAMPLES[0];
  const isPrimaryPlaying = currentTrack?.id === primarySample?.id && isPlaying;
  const featuredGear = EQUIPMENT_INVENTORY.filter((item) => item.highlight).slice(0, 4);

  return (
    <div className="space-y-24 md:space-y-32 pb-20">
      {/* TECHNICAL STUDIO HEADER STRIP */}
      <section className="border-b border-[var(--border-color)] bg-[var(--bg-subtle)]/50 py-2.5 text-[11px] font-mono tracking-wider text-[var(--text-muted)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[var(--text-main)]">
              <MapPin size={12} className="text-[var(--accent)]" />
              <span>JEDDAH STUDIO</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Globe size={12} className="text-[var(--accent)]" />
              <span>GCC & WORLDWIDE REMOTE SESSIONS</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[10px]">
            <span>FORMAT: 24-BIT / 48kHz WAV</span>
            <span>·</span>
            <span className="text-[var(--accent)] font-semibold">DIRECTOR & ARTIST BOOKINGS 2026</span>
          </div>
        </div>
      </section>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-4 md:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & Bio */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
                  Maryam Attar · Audio Engineer & Music Producer
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[var(--text-main)] leading-[1.08]">
                Sound for <br />
                <span className="font-normal italic">music</span>, spaces <br />
                and moving images.
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-xl font-light">
              Mixing, original production, sound design, and equipment hire. Anchored in Jeddah, Saudi Arabia, and collaborating with artists, cultural organizations, and directors across the region and internationally.
            </p>

            {/* Tactile Audio Sample Audition Box */}
            <div className="p-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg max-w-lg shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <button
                  onClick={() => playTrack(primarySample)}
                  className="w-12 h-12 rounded-full bg-[var(--text-main)] text-[var(--bg-main)] flex items-center justify-center hover:bg-[var(--accent)] transition-colors shrink-0 shadow-sm cursor-pointer"
                  aria-label={isPrimaryPlaying ? 'Pause sample' : 'Listen to audio sample'}
                >
                  {isPrimaryPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[var(--text-main)] uppercase tracking-wide truncate">
                      {primarySample.title}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--accent)] bg-[var(--accent-light)] px-1.5 py-0.5 rounded shrink-0">
                      Sample
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] truncate">{primarySample.subtitle}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">
                {primarySample.duration}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/work"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[var(--text-main)] text-[var(--bg-main)] text-xs font-mono uppercase tracking-wider hover:bg-[var(--accent)] hover:text-white transition-colors rounded shadow-xs"
              >
                <span>View Portfolio & Work</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/equipment"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-[var(--border-color)] text-[var(--text-main)] text-xs font-mono uppercase tracking-wider hover:border-[var(--text-main)] hover:bg-[var(--bg-card)] transition-colors rounded"
              >
                <span>Rent Equipment</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Studio Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden border border-[var(--border-color)] shadow-md group">
              <Image
                src="/images/maryam-studio-portrait.jpg"
                alt="Maryam Attar in studio"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono flex justify-between items-center">
                <span>STUDIO SESSION · JEDDAH</span>
                <span className="opacity-80">24-BIT / 48kHz</span>
              </div>
            </div>
            {/* Studio Badge */}
            <div className="absolute -bottom-6 -left-6 bg-[var(--bg-card)] p-4 border border-[var(--border-color)] rounded shadow-md hidden sm:block">
              <p className="text-[11px] font-mono uppercase text-[var(--accent)]">Dean&apos;s List Honor</p>
              <p className="text-xs font-semibold text-[var(--text-main)]">Berklee College of Music</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3-PILLAR HORIZONTAL SERVICE SPLIT */}
      <section className="border-y border-[var(--border-color)] bg-[var(--bg-card)]/40 transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border-color)]">
            {/* Pillar 1 */}
            <div className="py-6 md:py-0 md:px-8 first:pl-0 space-y-3 group">
              <span className="text-xs font-mono text-[var(--accent)]">01</span>
              <h3 className="text-2xl font-normal text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors">
                Mixing
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Detailed, intentional mixes for singles, EPs, and albums that maintain dynamic character while enhancing depth, punch, and translation across systems.
              </p>
              <Link
                href="/services#mixing"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-main)] group-hover:text-[var(--accent)] pt-2"
              >
                <span>Mix Requirements</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Pillar 2 */}
            <div className="py-6 md:py-0 md:px-8 space-y-3 group">
              <span className="text-xs font-mono text-[var(--accent)]">02</span>
              <h3 className="text-2xl font-normal text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors">
                Production & Sound Design
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Creative concept development, experimental analog synthesis, bespoke Foley, and auditory world-building for visual media and galleries.
              </p>
              <Link
                href="/services#production"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-main)] group-hover:text-[var(--accent)] pt-2"
              >
                <span>Production Scope</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Pillar 3 */}
            <div className="py-6 md:py-0 md:px-8 last:pr-0 space-y-3 group">
              <span className="text-xs font-mono text-[var(--accent)]">03</span>
              <h3 className="text-2xl font-normal text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors">
                Equipment Rental
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Curated selection of studio dynamic microphones (SM7B, SM57), Tascam analog mixers, boutique pedals, and clean Cloudlifters for hire in Jeddah.
              </p>
              <Link
                href="/equipment"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-main)] group-hover:text-[var(--accent)] pt-2"
              >
                <span>Browse Inventory</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED WORK PORTFOLIO PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[var(--border-color)] pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
              Selected Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-[var(--text-main)] tracking-tight mt-1">
              Works & Audio Commissions
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-main)] hover:text-[var(--accent)] transition-colors group"
          >
            <span>View All Works ({PROJECTS.length})</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROJECTS.slice(0, 4).map((p) => (
            <div
              key={p.id}
              className="group flex flex-col bg-[var(--bg-card)] border border-[var(--border-color)] rounded overflow-hidden hover:border-[var(--text-main)] transition-all duration-300"
            >
              <div className="relative aspect-[16/10] w-full bg-[var(--bg-subtle)] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 bg-black/70 text-white rounded">
                  {p.year}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)]">
                    {p.clientOrArtist}
                  </span>
                  <h3 className="text-base font-medium text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2">{p.description}</p>
                </div>
                <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--text-muted)]">{p.role}</span>
                  {p.externalLink && (
                    <ArrowUpRight size={14} className="text-[var(--text-main)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AUDIO SAMPLES LISTENING STATION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="p-8 md:p-12 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg space-y-8 relative overflow-hidden shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[var(--border-color)] pb-6">
            <div>
              <div className="flex items-center gap-2">
                <Disc size={14} className="text-[var(--accent)] animate-spin" />
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
                  Tape Deck Monitor
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight mt-1 text-[var(--text-main)]">
                Commercial & Narrative Voiceover Samples
              </h2>
            </div>
            <p className="text-xs font-mono text-[var(--text-muted)]">
              CLICK ANY TRACK TO AUDITION DIRECTLY
            </p>
          </div>

          <div className="divide-y divide-[var(--border-subtle)]">
            {AUDIO_SAMPLES.map((sample) => {
              const isThisPlaying = currentTrack?.id === sample.id && isPlaying;
              return (
                <div
                  key={sample.id}
                  onClick={() => playTrack(sample)}
                  className={`py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-[var(--bg-subtle)] px-3 rounded transition-colors group ${
                    isThisPlaying ? 'bg-[var(--bg-subtle)]' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <button
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                        isThisPlaying
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-[var(--bg-subtle)] text-[var(--text-main)] group-hover:bg-[var(--accent)] group-hover:text-white'
                      }`}
                      aria-label={`Play ${sample.title}`}
                    >
                      {isThisPlaying ? (
                        <Pause size={15} />
                      ) : (
                        <Play size={15} className="ml-0.5" />
                      )}
                    </button>
                    <div>
                      <h4
                        className={`text-sm font-medium ${
                          isThisPlaying ? 'text-[var(--accent)]' : 'text-[var(--text-main)]'
                        }`}
                      >
                        {sample.title}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)]">{sample.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-muted)]">
                    <span className="hidden sm:inline px-2 py-0.5 rounded bg-[var(--bg-subtle)] text-[10px] border border-[var(--border-subtle)]">
                      {sample.category}
                    </span>
                    <span>{sample.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED EQUIPMENT RENTAL INVENTORY */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[var(--border-color)] pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
              Hardware Inventory
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-[var(--text-main)] tracking-tight mt-1">
              Studio Equipment for Rent
            </h2>
          </div>
          <Link
            href="/equipment"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-main)] hover:text-[var(--accent)] transition-colors group"
          >
            <span>View Full Rental Inventory ({EQUIPMENT_INVENTORY.length} items)</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredGear.map((item) => (
            <div
              key={item.id}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded p-5 flex flex-col justify-between space-y-4 hover:border-[var(--text-main)] transition-colors"
            >
              {item.image && (
                <div className="relative aspect-[4/3] w-full bg-[var(--bg-subtle)] rounded overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              )}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-[var(--accent)]">
                  {item.brand} · {item.category}
                </span>
                <h3 className="text-sm font-semibold text-[var(--text-main)]">{item.name}</h3>
                <p className="text-xs text-[var(--text-muted)] line-clamp-2">{item.description}</p>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <div>
                  <span className="text-base font-semibold font-mono text-[var(--text-main)]">
                    {item.dayRateSAR} SAR
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]"> / day</span>
                </div>
                <button
                  onClick={() => addToCart(item, 'day')}
                  className="px-3 py-1.5 bg-[var(--text-main)] hover:bg-[var(--accent)] text-[var(--bg-main)] hover:text-white text-xs font-mono uppercase rounded transition-colors cursor-pointer"
                >
                  + Inquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LET'S WORK TOGETHER / REGIONAL & WORLDWIDE CONTACT BANNER */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="p-8 md:p-16 border border-[var(--border-color)] bg-[var(--bg-card)] rounded-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
              Jeddah · Regional · Global Collaborations
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[var(--text-main)] tracking-tight">
              Let’s work together.
            </h2>
            <p className="text-base text-[var(--text-muted)] max-w-xl leading-relaxed">
              Available for music production, mixing, audiovisual sound design, and equipment rentals in Jeddah, and across the globe via remote multitrack workflows.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link
              href="/contact"
              className="px-6 py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded text-center transition-colors"
            >
              Get In Touch
            </Link>
            <Link
              href="/services"
              className="px-6 py-3.5 border border-[var(--border-color)] hover:border-[var(--text-main)] text-[var(--text-main)] text-xs font-mono uppercase tracking-wider rounded text-center transition-colors"
            >
              View Service Specs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
