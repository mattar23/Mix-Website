'use client';

import React, { useState } from 'react';
import { PROJECTS, AUDIO_SAMPLES, type Project } from '@/data/projects';
import { useAudio } from '@/components/AudioPlayerContext';
import { Glyph } from '@/components/Glyph';
import { FilmViewer } from '@/components/FilmViewer';

export default function WorkClient() {
  const { currentTrack, isPlaying, playTrack } = useAudio();
  const [watching, setWatching] = useState<Project | null>(null);

  return (
    <>
      <section className="wrap step">
        <h1 className="hero-type">Work</h1>
        <span className="accent-rule" aria-hidden="true" />
      </section>

      {/* Each row says what the job was and who it was for, nothing more. */}
      <section className="wrap step-b">
        <div className="index">
          {PROJECTS.map((p) => {
            const samples = AUDIO_SAMPLES.filter((s) => p.audioSrcs?.includes(s.src));

            return (
              <div key={p.id} className="index__row index__row-static index__row-two">
                <span>
                  <span className="index__title">{p.title}</span>
                  <span className="meta index__sub" style={{ display: 'block' }}>
                    {p.role} for {p.clientOrArtist}
                  </span>
                </span>

                <span className="cluster cluster-lg meta">
                  {p.externalLink && (
                    <a
                      className="ul-link"
                      href={p.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {p.externalLink.includes('youtube') ? 'Watch on YouTube' : 'View on Instagram'}
                    </a>
                  )}
                  {p.moreLinks?.map((l) => (
                    <a
                      key={l.url}
                      className="ul-link"
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {l.label}
                    </a>
                  ))}
                  {p.film && (
                    <button
                      className="listen"
                      style={{ marginTop: 0 }}
                      onClick={() => setWatching(p)}
                    >
                      <Glyph playing={false} size={10} />
                      Watch
                      <span className="num">{p.film.duration}</span>
                    </button>
                  )}
                  {samples.map((sample) => {
                    const on = currentTrack?.id === sample.id;
                    return (
                      <button
                        key={sample.id}
                        className="listen"
                        style={{ marginTop: 0, color: on ? 'var(--spot)' : undefined }}
                        onClick={() => playTrack(sample)}
                      >
                        <Glyph playing={on && isPlaying} size={10} />
                        {on && isPlaying ? 'Playing' : 'Listen'}
                        <span className="num">{sample.duration}</span>
                      </button>
                    );
                  })}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <FilmViewer project={watching} onClose={() => setWatching(null)} />
    </>
  );
}
