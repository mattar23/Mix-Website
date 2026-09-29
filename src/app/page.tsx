'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, Pause, Disc, ArrowUpRight } from 'lucide-react';
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
    <div className="space-y-24 md:space-y-32 pb-16">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & Bio */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8532B]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#6B665F]">
                  Music Producer & Audio Engineer · Jeddah
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#181716] leading-[1.08]">
                Sound for <br />
                <span className="font-normal italic">music</span>, spaces <br />
                and moving images.
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#6B665F] leading-relaxed max-w-xl font-light">
              Mixing · Production · Sound Design · Equipment Rental. Blending experimental electronic composition with technical audio fidelity for artists, cultural institutions, and visual media.
            </p>

            {/* Quick Audio Sample Player Callout */}
            <div className="p-4 bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg max-w-lg shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => playTrack(primarySample)}
                  className="w-12 h-12 rounded-full bg-[#181716] text-[#FFFFFF] flex items-center justify-center hover:bg-[#B8532B] transition-colors shrink-0 shadow-sm cursor-pointer"
                  aria-label={isPrimaryPlaying ? 'Pause sample' : 'Listen to audio sample'}
                >
                  {isPrimaryPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#181716] uppercase tracking-wide">
                      {primarySample.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#B8532B] bg-[#F7EDE7] px-1.5 py-0.5 rounded">
                      Audio Sample
                    </span>
                  </div>
                  <p className="text-xs text-[#6B665F] truncate">{primarySample.subtitle}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#6B665F] shrink-0">
                {primarySample.duration}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/work"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#181716] text-[#F7F5F0] text-xs font-mono uppercase tracking-wider hover:bg-[#B8532B] transition-colors rounded shadow-xs"
              >
                <span>View Portfolio & Work</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/equipment"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-[#181716] text-[#181716] text-xs font-mono uppercase tracking-wider hover:bg-[#181716] hover:text-[#F7F5F0] transition-colors rounded"
              >
                <span>Rent Equipment</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Authentic Studio Atmosphere Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden border border-[#E2DDD4] shadow-md group">
              <Image
                src="/images/maryam-studio-portrait.jpg"
                alt="Maryam Attar in studio"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono flex justify-between items-center">
                <span>STUDIO SESSION · JEDDAH</span>
                <span className="opacity-80">24-BIT / 48kHz</span>
              </div>
            </div>
            {/* Subtle vintage accent card */}
            <div className="absolute -bottom-6 -left-6 bg-[#F7F5F0] p-4 border border-[#E2DDD4] rounded shadow-md hidden sm:block">
              <p className="text-[11px] font-mono uppercase text-[#B8532B]">Dean&apos;s List Honor</p>
              <p className="text-xs font-semibold text-[#181716]">Berklee College of Music</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3-PILLAR HORIZONTAL SERVICE SPLIT (Inspired by Mockup 3) */}
      <section className="border-y border-[#E2DDD4] bg-[#FFFFFF]/60">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E2DDD4]">
            {/* Pillar 1 */}
            <div className="py-6 md:py-0 md:px-8 first:pl-0 space-y-3 group">
              <span className="text-xs font-mono text-[#B8532B]">01</span>
              <h3 className="text-2xl font-normal text-[#181716] group-hover:text-[#B8532B] transition-colors">
                Mixing
              </h3>
              <p className="text-sm text-[#6B665F] leading-relaxed">
                Detailed, intentional mixes for singles, EPs, and albums that maintain dynamic character while enhancing depth, punch, and translation across systems.
              </p>
              <Link
                href="/services#mixing"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#181716] group-hover:text-[#B8532B] pt-2"
              >
                <span>Mix Requirements</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Pillar 2 */}
            <div className="py-6 md:py-0 md:px-8 space-y-3 group">
              <span className="text-xs font-mono text-[#B8532B]">02</span>
              <h3 className="text-2xl font-normal text-[#181716] group-hover:text-[#B8532B] transition-colors">
                Production & Sound Design
              </h3>
              <p className="text-sm text-[#6B665F] leading-relaxed">
                Creative concept development, experimental analog synthesis, bespoke Foley, and auditory world-building for visual media and galleries.
              </p>
              <Link
                href="/services#production"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#181716] group-hover:text-[#B8532B] pt-2"
              >
                <span>Production Scope</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Pillar 3 */}
            <div className="py-6 md:py-0 md:px-8 last:pr-0 space-y-3 group">
              <span className="text-xs font-mono text-[#B8532B]">03</span>
              <h3 className="text-2xl font-normal text-[#181716] group-hover:text-[#B8532B] transition-colors">
                Equipment Rental
              </h3>
              <p className="text-sm text-[#6B665F] leading-relaxed">
                Curated selection of studio dynamic microphones (SM7B, SM57), Tascam analog mixers, boutique pedals, and clean Cloudlifters for hire.
              </p>
              <Link
                href="/equipment"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#181716] group-hover:text-[#B8532B] pt-2"
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
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#E2DDD4] pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#B8532B]">
              Selected Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-[#181716] tracking-tight mt-1">
              Works & Audio Commissions
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#181716] hover:text-[#B8532B] transition-colors group"
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
              className="group flex flex-col bg-[#FFFFFF] border border-[#E2DDD4] rounded overflow-hidden hover:border-[#181716] transition-all duration-300"
            >
              <div className="relative aspect-[16/10] w-full bg-[#EFECE5] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 bg-[#181716]/80 text-[#FFFFFF] rounded">
                  {p.year}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#B8532B]">
                    {p.clientOrArtist}
                  </span>
                  <h3 className="text-base font-medium text-[#181716] group-hover:text-[#B8532B] transition-colors line-clamp-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#6B665F] line-clamp-2">{p.description}</p>
                </div>
                <div className="pt-2 border-t border-[#EFECE5] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#6B665F]">{p.role}</span>
                  {p.externalLink && (
                    <ArrowUpRight size={14} className="text-[#181716] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AUDIO SAMPLES LISTENING STATION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="p-8 md:p-12 bg-[#181716] text-[#F7F5F0] rounded-lg space-y-8 relative overflow-hidden">
          {/* Subtle decorative background detail */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-radial from-white to-transparent pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <Disc size={14} className="text-[#B8532B] animate-spin" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#B8532B]">
                  Tape Deck Monitor
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight mt-1 text-white">
                Commercial & Narrative Voiceover Samples
              </h2>
            </div>
            <p className="text-xs font-mono text-white/60">
              CLICK ANY TRACK TO AUDITION DIRECTLY
            </p>
          </div>

          <div className="divide-y divide-white/10">
            {AUDIO_SAMPLES.map((sample) => {
              const isThisPlaying = currentTrack?.id === sample.id && isPlaying;
              return (
                <div
                  key={sample.id}
                  onClick={() => playTrack(sample)}
                  className={`py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 px-3 rounded transition-colors group ${
                    isThisPlaying ? 'bg-white/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <button
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                        isThisPlaying
                          ? 'bg-[#B8532B] text-white'
                          : 'bg-white/10 text-white group-hover:bg-[#B8532B]'
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
                          isThisPlaying ? 'text-[#B8532B]' : 'text-white'
                        }`}
                      >
                        {sample.title}
                      </h4>
                      <p className="text-xs text-white/60">{sample.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-white/60">
                    <span className="hidden sm:inline px-2 py-0.5 rounded bg-white/10 text-[10px]">
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
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#E2DDD4] pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#B8532B]">
              Hardware Inventory
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-[#181716] tracking-tight mt-1">
              Studio Equipment for Rent
            </h2>
          </div>
          <Link
            href="/equipment"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#181716] hover:text-[#B8532B] transition-colors group"
          >
            <span>View Full Rental Inventory ({EQUIPMENT_INVENTORY.length} items)</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredGear.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFFFF] border border-[#E2DDD4] rounded p-5 flex flex-col justify-between space-y-4 hover:border-[#181716] transition-colors"
            >
              {item.image && (
                <div className="relative aspect-[4/3] w-full bg-[#F7F5F0] rounded overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              )}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#B8532B]">
                  {item.brand} · {item.category}
                </span>
                <h3 className="text-sm font-semibold text-[#181716]">{item.name}</h3>
                <p className="text-xs text-[#6B665F] line-clamp-2">{item.description}</p>
              </div>

              <div className="pt-3 border-t border-[#EFECE5] flex items-center justify-between">
                <div>
                  <span className="text-base font-semibold font-mono text-[#181716]">
                    {item.dayRateSAR} SAR
                  </span>
                  <span className="text-[10px] font-mono text-[#6B665F]"> / day</span>
                </div>
                <button
                  onClick={() => addToCart(item, 'day')}
                  className="px-3 py-1.5 bg-[#181716] hover:bg-[#B8532B] text-[#FFFFFF] text-xs font-mono uppercase rounded transition-colors cursor-pointer"
                >
                  + Inquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LET'S WORK TOGETHER / CONTACT BANNER */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="p-8 md:p-16 border border-[#E2DDD4] bg-[#FFFFFF] rounded-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B8532B]">
              New Collaborations & Inquiries
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#181716] tracking-tight">
              Let’s work together.
            </h2>
            <p className="text-base text-[#6B665F] max-w-xl leading-relaxed">
              Available for music production, mixing, audiovisual sound design, and equipment rentals in Jeddah and remotely worldwide.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link
              href="/contact"
              className="px-6 py-3.5 bg-[#B8532B] hover:bg-[#9E431E] text-[#FFFFFF] text-xs font-mono uppercase tracking-wider font-semibold rounded text-center transition-colors"
            >
              Get In Touch
            </Link>
            <Link
              href="/services"
              className="px-6 py-3.5 border border-[#E2DDD4] hover:border-[#181716] text-[#181716] text-xs font-mono uppercase tracking-wider rounded text-center transition-colors"
            >
              View Service Specs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
