'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PROJECTS, AUDIO_SAMPLES } from '@/data/projects';
import { useAudio } from '@/components/AudioPlayerContext';
import { Play, Pause, Disc, ExternalLink } from 'lucide-react';

const CATEGORIES = ['All', 'Commercial', 'Music', 'Art', 'Sound Design'] as const;

export default function WorkClient() {
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
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
          Selected Portfolio & Credits
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-[var(--text-main)] tracking-tight">
          Works & Samples
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
          Compositions, mixing, and sound design for cultural campaigns, independent artists, fashion films, and audiovisual exhibitions.
        </p>
      </div>

      {/* FILTER TABS */}
      <div className="border-b border-[var(--border-color)] flex items-center gap-6 sm:gap-8 overflow-x-auto pb-3 text-xs font-mono uppercase tracking-wider">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`transition-colors relative pb-3 cursor-pointer whitespace-nowrap ${
              activeCategory === cat
                ? 'text-[var(--text-main)] font-bold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            {cat}
            {activeCategory === cat && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)]" />
            )}
          </button>
        ))}
      </div>

      {/* PROJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded overflow-hidden flex flex-col hover:border-[var(--text-main)] transition-all duration-300"
          >
            <div className="relative aspect-[16/10] w-full bg-[var(--bg-subtle)] overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 bg-black/75 text-white rounded">
                {project.year}
              </span>
              <span className="absolute top-3 left-3 text-[10px] font-mono px-2 py-0.5 bg-[var(--accent-light)] text-[var(--accent)] rounded border border-[var(--accent)]/20">
                {project.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent)]">
                  {project.clientOrArtist}
                </span>
                <h3 className="text-lg font-semibold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-[var(--text-muted)]">{project.role}</p>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed pt-1">
                  {project.description}
                </p>
              </div>

              {/* Tags and Links */}
              <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 bg-[var(--bg-subtle)] text-[var(--text-muted)] rounded border border-[var(--border-subtle)]"
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
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors cursor-pointer"
                    >
                      <Play size={14} />
                      <span>Audition Audio</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">
                      Commissioned Work
                    </span>
                  )}

                  {project.externalLink && (
                    <a
                      href={project.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-[var(--text-main)] hover:text-[var(--accent)] transition-colors"
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
      <section className="mt-16 p-8 md:p-12 bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-main)] rounded-lg space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[var(--border-color)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Disc size={15} className="text-[var(--accent)] animate-spin" />
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
                Audio Vault
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight mt-1 text-[var(--text-main)]">
              Direct Audio Stems & Mix Auditions
            </h2>
          </div>
          <p className="text-xs font-mono text-[var(--text-muted)]">
            RECORDED & MIXED BY MARYAM ATTAR
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
                    {isThisPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
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
      </section>
    </div>
  );
}
