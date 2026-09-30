'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PROJECTS, AUDIO_SAMPLES } from '@/data/projects';
import { EQUIPMENT_INVENTORY } from '@/data/equipment';
import { useAudio } from '@/components/AudioPlayerContext';
import { useReducedMotion } from '@/components/useReducedMotion';
import { Glyph } from '@/components/Glyph';

export default function HomePage() {
  const { currentTrack, isPlaying, playTrack } = useAudio();
  const reducedMotion = useReducedMotion();

  return (
    <>
      {/* The page opens with the sentence, at size. Nothing above it. */}
      <section className="wrap step">
        <h1 className="hero-type" style={{ maxWidth: '14ch' }}>
          Sound for music, spaces, and moving images.
        </h1>

        <div className="doc" style={{ marginTop: 'clamp(2.5rem, 6vw, 5rem)' }}>
          <p className="meta doc__margin">Jeddah, and remotely</p>
          <p className="prose">
            Maryam Attar is a producer and sound designer. She works by taking sound
            apart, recording, processing, resampling, until it becomes something other
            than what it was, then building a world around it.
          </p>
        </div>
      </section>

      {/* Listening comes before anything is claimed about the work. */}
      <section className="wrap step-b">
        <div className="doc">
          <p className="meta doc__margin">Listen</p>

          <div className="tracklist">
            {AUDIO_SAMPLES.map((sample) => {
              const on = currentTrack?.id === sample.id;
              return (
                <button
                  key={sample.id}
                  className={`track${on ? ' track-on' : ''}`}
                  onClick={() => playTrack(sample)}
                  aria-label={`${on && isPlaying ? 'Pause' : 'Play'} ${sample.title}`}
                >
                  <span className="track__glyph">
                    <Glyph playing={on && isPlaying} />
                  </span>
                  <span>
                    <span className="track__title">{sample.title}</span>
                    <span className="meta" style={{ display: 'block', marginTop: '0.2rem' }}>
                      {sample.subtitle}
                    </span>
                  </span>
                  <span className="track__dur">{sample.duration}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Silent on purpose: this band is a picture. The films play with their
          sound on the Work page, and the caption says so. */}
      <section className="wrap step-b">
        <div className="figure" style={{ aspectRatio: '16 / 7' }}>
          {reducedMotion ? (
            <Image
              src="/images/films/rawda-reel.jpg"
              alt=""
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <video
              // Safari ignores autoPlay often enough that an explicit play()
              // on mount is worth keeping, as on the work plate.
              ref={(el) => {
                if (el) void el.play().catch(() => {});
              }}
              className="figure__video"
              src="/video/rawda-reel.mp4"
              poster="/images/films/rawda-reel.jpg"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
          )}
        </div>
        <p className="split meta" style={{ marginTop: '0.9rem' }}>
          <span className="muted">Rawda, for Nadine Jewellery, 2022/23</span>
          <Link className="ul-link" href="/work#films">
            Watch both films with sound
          </Link>
        </p>
      </section>

      <section className="wrap step-b">
        <div className="split" style={{ marginBottom: '2rem' }}>
          <h2 className="display">Selected work</h2>
          <Link className="meta ul-link" href="/work">
            All {PROJECTS.length} projects
          </Link>
        </div>

        <div className="index">
          {PROJECTS.slice(0, 4).map((p) => (
            <Link key={p.id} href="/work" className="index__row">
              <span className="index__year">{p.year}</span>
              <span>
                <span className="index__title">{p.title}</span>
                <span className="meta index__sub" style={{ display: 'block' }}>
                  {p.clientOrArtist}, {p.role}
                </span>
              </span>
              <span className="index__end">{p.category}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap step-b">
        <div className="doc">
          <p className="meta doc__margin">Equipment</p>
          <div className="stack stack-lg">
            <p className="prose">
              Microphones, recorders, preamps, and pedals available to hire in Jeddah.{' '}
              {EQUIPMENT_INVENTORY.length} items, with day and week rates published in
              full.
            </p>
            <Link className="btn" href="/equipment">
              See the rate sheet
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap step-b">
        <hr className="rule" />
        <div style={{ paddingTop: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
          <h2 className="hero-type" style={{ maxWidth: '13ch' }}>
            Have something you want heard?
          </h2>
          <p className="cluster cluster-lg" style={{ marginTop: '2.5rem' }}>
            <Link className="btn btn-solid" href="/contact">
              Start a project
            </Link>
            <Link className="btn" href="/services">
              What a session includes
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
