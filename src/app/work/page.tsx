'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PROJECTS, AUDIO_SAMPLES } from '@/data/projects';
import { useAudio } from '@/components/AudioPlayerContext';
import { Play, Pause, Disc, ExternalLink } from 'lucide-react';

const CATEGORIES = ['All', 'Commercial', 'Music', 'Art', 'Sound Design'] as const;

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { currentTrack, isPlaying, playTrack } = useAudio();

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <span className="text-xs font-mono uppercase tracking-widest text-[#B8532B]">
          Selected Portfolio & Credits
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-[#181716] tracking-tight">
          Works & Samples
        </h1>
        <p className="text-base sm:text-lg text-[#6B665F] leading-relaxed">
          Compositions, mixing, and sound design for cultural campaigns, independent artists, fashion films, and audiovisual exhibitions.
        </p>
      </div>

      {/* FILTER TABS */}
      <div className="border-b border-[#E2DDD4] flex items-center gap-6 sm:gap-8 overflow-x-auto pb-3 text-xs font-mono uppercase tracking-wider">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`transition-colors relative pb-3 cursor-pointer whitespace-nowrap ${
              activeCategory === cat
                ? 'text-[#181716] font-bold'
                : 'text-[#6B665F] hover:text-[#181716]'
            }`}
          >
            {cat}
            {activeCategory === cat && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8532B]" />
            )}
          </button>
        ))}
      </div>

      {/* PROJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group bg-[#FFFFFF] border border-[#E2DDD4] rounded overflow-hidden flex flex-col hover:border-[#181716] transition-all duration-300"
          >
            <div className="relative aspect-[16/10] w-full bg-[#EFECE5] overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 bg-[#181716]/80 text-[#FFFFFF] rounded">
                {project.year}
              </span>
              <span className="absolute top-3 left-3 text-[10px] font-mono px-2 py-0.5 bg-[#F7EDE7] text-[#B8532B] rounded">
                {project.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#B8532B]">
                  {project.clientOrArtist}
                </span>
                <h3 className="text-lg font-semibold text-[#181716] group-hover:text-[#B8532B] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-[#6B665F]">{project.role}</p>
                <p className="text-xs text-[#6B665F] leading-relaxed pt-1">
                  {project.description}
                </p>
              </div>

              {/* Tags and Links */}
              <div className="space-y-3 pt-4 border-t border-[#EFECE5]">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 bg-[#EFECE5] text-[#6B665F] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  {project.audioSrc ? (
                    <button
                      onClick={() =>
                        playTrack({
                          id: project.id,
                          title: project.title,
                          subtitle: `${project.clientOrArtist} · ${project.role}`,
                          src: project.audioSrc!,
                          duration: '0:55',
                          category: project.category,
                        })
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#B8532B] hover:text-[#9E431E] transition-colors cursor-pointer"
                    >
                      <Play size={14} />
                      <span>Audition Audio</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-mono text-[#6B665F]">
                      Studio Project
                    </span>
                  )}

                  {project.externalLink && (
                    <a
                      href={project.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-[#181716] hover:text-[#B8532B] transition-colors"
                    >
                      <span>Media Link</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AUDIO SAMPLES TAPE STATION */}
      <section className="mt-16 p-8 md:p-12 bg-[#181716] text-[#F7F5F0] rounded-lg space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Disc size={15} className="text-[#B8532B] animate-spin" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#B8532B]">
                Audio Vault
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight mt-1 text-white">
              Direct Audio Stems & Mix Auditions
            </h2>
          </div>
          <p className="text-xs font-mono text-white/60">
            RECORDED & MIXED BY MARYAM ATTAR
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
                    {isThisPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
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
      </section>
    </div>
  );
}
