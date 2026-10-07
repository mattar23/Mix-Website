'use client';

import React from 'react';
import { PROJECTS, AUDIO_SAMPLES, FILMS } from '@/data/projects';
import { useAudio } from '@/components/AudioPlayerContext';
import { Glyph } from '@/components/Glyph';
import { FilmPlate } from '@/components/FilmPlate';

export default function WorkClient() {
  const { currentTrack, isPlaying, playTrack } = useAudio();

  return (
    <>
      <section className="wrap step">
        <span className="accent-rule" aria-hidden="true" />
        <h1 className="hero-type">Work</h1>
      </section>

      {/* Each row says what the job was and who it was for, nothing more. */}
      <section className="wrap step-b">
        <div className="index">
          {PROJECTS.map((p) => {
            const sample = AUDIO_SAMPLES.find((s) => s.src === p.audioSrc);
            const on = sample && currentTrack?.id === sample.id;

            return (
              <div key={p.id} className="index__row index__row-static index__row-two">
                <span>
                  {p.externalLink ? (
                    <a
                      className="index__title title-link"
                      href={p.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {p.title}
                    </a>
                  ) : (
                    <span className="index__title">{p.title}</span>
                  )}
                  <span className="meta index__sub" style={{ display: 'block' }}>
                    {p.role} for {p.clientOrArtist}
                  </span>
                </span>

                <span className="cluster cluster-lg meta">
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
                  {sample && (
                    <button
                      className="listen"
                      style={{ marginTop: 0, color: on ? 'var(--spot)' : undefined }}
                      onClick={() => playTrack(sample)}
                    >
                      <Glyph playing={Boolean(on && isPlaying)} size={10} />
                      {on && isPlaying ? 'Playing' : 'Listen'}
                      <span className="num">{sample.duration}</span>
                    </button>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="wrap step-b" id="films">
        <div className="two-col">
          {FILMS.map((film) => (
            <FilmPlate
              key={film.id}
              film={film}
              project={PROJECTS.find((p) => p.id === film.projectId)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
