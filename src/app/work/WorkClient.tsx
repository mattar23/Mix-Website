'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PROJECTS, AUDIO_SAMPLES, FILMS } from '@/data/projects';
import { useAudio } from '@/components/AudioPlayerContext';
import { useReducedMotion } from '@/components/useReducedMotion';
import { Glyph } from '@/components/Glyph';
import { FilmPlate } from '@/components/FilmPlate';

export default function WorkClient() {
  const { currentTrack, isPlaying, playTrack } = useAudio();
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(PROJECTS[0]?.id);
  const [videoReady, setVideoReady] = useState(false);

  const shown = PROJECTS.find((p) => p.id === activeId) ?? PROJECTS[0];

  const focus = (id: string) => {
    if (id === activeId) return;
    setActiveId(id);
    setVideoReady(false);
  };

  return (
    <>
      <section className="wrap step">
        <span className="accent-rule" aria-hidden="true" />
        <h1 className="hero-type" style={{ maxWidth: '11ch' }}>
          Work
        </h1>
        <p className="prose" style={{ marginTop: '2rem', maxWidth: '34em' }}>
          Commissions and collaborations across music, film, and exhibition.
        </p>
      </section>

      <section className="wrap step-b">
        <div className="work">
          <div className="index">
            {PROJECTS.map((p) => {
              const sample = AUDIO_SAMPLES.find((s) => s.src === p.audioSrc);
              const on = sample && currentTrack?.id === sample.id;

              return (
                <div
                  key={p.id}
                  className="index__row index__row-static"
                  onMouseEnter={() => focus(p.id)}
                  onFocus={() => focus(p.id)}
                >
                  <span className="index__year">{p.year}</span>

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
                      {p.clientOrArtist}, {p.role}
                    </span>

                    <p
                      className="prose prose-fine"
                      style={{ marginTop: '0.9rem', maxWidth: '44ch' }}
                    >
                      {p.description}
                    </p>

                    {sample && (
                      <button
                        className="listen"
                        style={{ color: on ? 'var(--spot)' : undefined }}
                        onClick={() => playTrack(sample)}
                      >
                        <Glyph playing={Boolean(on && isPlaying)} size={10} />
                        {on && isPlaying ? 'Playing' : 'Listen'}
                        <span className="num">{sample.duration}</span>
                      </button>
                    )}

                    {p.image && (
                      <div className="figure index__thumb">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes="100vw"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}
                  </span>

                  <span className="index__end">{p.category}</span>
                </div>
              );
            })}
          </div>

          {/* The plate follows what you point at. Stills are stacked and faded so
              switching rows costs nothing; the loop mounts only for the active row. */}
          <div className="work__plate" aria-hidden="true">
            <div className="plate">
              {PROJECTS.filter((p) => p.image).map((p) => (
                <Image
                  key={p.id}
                  className={`plate__img${p.id === shown?.id ? ' plate__img-on' : ''}`}
                  src={p.image as string}
                  alt=""
                  fill
                  sizes="26rem"
                  style={{ objectFit: 'cover' }}
                />
              ))}

              {shown?.video && !reducedMotion && (
                <video
                  key={shown.id}
                  // The element mounts only for the hovered project, so loading
                  // here is already lazy. Safari ignores autoPlay often enough
                  // that the explicit play() on mount is worth keeping.
                  ref={(el) => {
                    if (el) void el.play().catch(() => {});
                  }}
                  className={`plate__vid${videoReady ? ' plate__vid-on' : ''}`}
                  src={shown.video}
                  poster={shown.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onPlaying={() => setVideoReady(true)}
                />
              )}

              {shown && !shown.image && (
                <div className="plate__card">
                  <ul>
                    {shown.tags.map((tag) => (
                      <li className="plate__tag" key={tag}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {shown && (
                <div className="plate__caption">
                  <p className="meta meta-micro">
                    {shown.clientOrArtist}, {shown.year}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="wrap step-b" id="films">
        <hr className="rule" />
        <div className="doc" style={{ paddingTop: '2.5rem' }}>
          <p className="meta doc__margin">Films</p>
          <div className="stack stack-lg">
            {FILMS.map((film) => (
              <FilmPlate
                key={film.id}
                film={film}
                project={PROJECTS.find((p) => p.id === film.projectId)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
