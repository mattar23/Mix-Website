'use client';

import React, { useEffect } from 'react';
import { useAudio } from './AudioPlayerContext';
import { Glyph } from './Glyph';

function clock(seconds: number) {
  if (!Number.isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export function PlayerBar() {
  const { currentTrack, isPlaying, currentTime, duration, togglePlay, seek } = useAudio();

  // Reserve the bar's height on <body> only while a track is loaded,
  // so pages don't carry dead space when nothing is playing.
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--player-h', currentTrack ? '3.75rem' : '0px');
    return () => root.style.setProperty('--player-h', '0px');
  }, [currentTrack]);

  if (!currentTrack) return null;

  return (
    <div className="player">
      <div className="wrap">
        <div className="player__bar">
          <button
            className="player__toggle"
            onClick={togglePlay}
            aria-label={isPlaying ? `Pause ${currentTrack.title}` : `Play ${currentTrack.title}`}
          >
            <Glyph playing={isPlaying} size={13} />
          </button>

          <span className="player__title">{currentTrack.title}</span>

          <div className="player__scrub">
            <span className="player__time">{clock(currentTime)}</span>
            <input
              className="scrub"
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label="Seek"
            />
            <span className="player__time">{clock(duration)}</span>
          </div>

          <span className="meta meta-micro quiet">{currentTrack.subtitle}</span>
        </div>
      </div>
    </div>
  );
}
