'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { Film, Project } from '@/data/projects';
import { useAudio } from '@/components/AudioPlayerContext';
import { Glyph } from '@/components/Glyph';
import { asset } from '@/lib/asset';

// Only one thing on the site makes sound at a time. Films tell each other
// through this event, and yield to the track player through the audio context.
const FILM_PLAY = 'ma:film-play';

export function FilmPlate({ film, project }: { film: Film; project?: Project }) {
  const { isPlaying: trackPlaying, pauseTrack } = useAudio();
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (trackPlaying) ref.current?.pause();
  }, [trackPlaying]);

  useEffect(() => {
    const onOther = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== film.id) ref.current?.pause();
    };
    document.addEventListener(FILM_PLAY, onOther);
    return () => document.removeEventListener(FILM_PLAY, onOther);
  }, [film.id]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play().catch(() => {});
    else v.pause();
  };

  return (
    <figure className={`film${playing ? ' track-on' : ''}`}>
      <div className="figure film__frame">
        <video
          ref={ref}
          src={asset(film.src)}
          poster={asset(film.poster)}
          preload="none"
          playsInline
          // Native controls appear once the film has started, for scrubbing
          // and fullscreen. Before that the poster stays clean.
          controls={started}
          onClick={started ? undefined : toggle}
          onPlay={() => {
            setStarted(true);
            setPlaying(true);
            pauseTrack();
            document.dispatchEvent(new CustomEvent(FILM_PLAY, { detail: film.id }));
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      </div>

      <figcaption>
        <button className="track" onClick={toggle} aria-pressed={playing}>
          <span className="track__glyph">
            <Glyph playing={playing} size={12} />
          </span>
          <span>
            <span className="track__title" style={{ display: 'block' }}>
              {film.title}
            </span>
            <span className="meta meta-micro muted">
              {project ? `${project.clientOrArtist}, ` : ''}
              {film.credit}
            </span>
          </span>
          <span className="track__dur">{film.duration}</span>
        </button>
      </figcaption>
    </figure>
  );
}
