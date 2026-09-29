'use client';

import React from 'react';
import { useAudio } from './AudioPlayerContext';
import { Play, Pause, Disc, Volume2 } from 'lucide-react';

export function AudioPlayerBar() {
  const { currentTrack, isPlaying, currentTime, duration, togglePlay, seek } = useAudio();

  if (!currentTrack) return null;

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--player-bg)] backdrop-blur-md border-t border-[var(--border-color)] px-4 md:px-8 py-3 transition-colors duration-200 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-[200px] md:min-w-[280px]">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause sample' : 'Play sample'}
            className="w-10 h-10 rounded-full bg-[var(--text-main)] text-[var(--bg-main)] flex items-center justify-center hover:bg-[var(--accent)] transition-colors shrink-0 cursor-pointer shadow-sm"
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
          </button>
          <div className="overflow-hidden">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-main)] truncate">
                {currentTrack.title}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono px-1.5 py-0.5 bg-[var(--bg-subtle)] text-[var(--text-muted)] rounded border border-[var(--border-subtle)]">
                <Disc size={10} className={isPlaying ? 'animate-spin' : ''} />
                24-Bit / 48kHz
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] truncate">{currentTrack.subtitle}</p>
          </div>
        </div>

        {/* Scrubber / Progress */}
        <div className="flex-1 max-w-xl hidden sm:flex items-center gap-3">
          <span className="text-xs font-mono text-[var(--text-muted)] w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <div className="relative flex-1 flex items-center">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              className="audio-scrubber w-full"
              aria-label="Audio progress bar"
            />
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)] w-10">
            {formatTime(duration)}
          </span>
        </div>

        {/* Analog hardware status and mini VU meter */}
        <div className="flex items-center gap-4 text-right">
          {/* Mini Analog VU Bars */}
          <div className="hidden lg:flex items-end gap-1 h-4 px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded">
            <span
              className={`w-1 bg-[var(--accent)] rounded-xs transition-all duration-150 ${
                isPlaying ? 'h-3 animate-pulse' : 'h-1 opacity-40'
              }`}
            />
            <span
              className={`w-1 bg-[var(--accent)] rounded-xs transition-all duration-200 ${
                isPlaying ? 'h-4 animate-pulse delay-75' : 'h-1.5 opacity-40'
              }`}
            />
            <span
              className={`w-1 bg-[var(--accent)] rounded-xs transition-all duration-100 ${
                isPlaying ? 'h-2 animate-pulse delay-150' : 'h-1 opacity-40'
              }`}
            />
          </div>

          <div className="hidden md:flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                isPlaying
                  ? 'bg-[var(--accent)] shadow-[0_0_6px_var(--accent)]'
                  : 'bg-[var(--text-muted)] opacity-50'
              }`}
            />
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
              {isPlaying ? 'TAPE RUNNING' : 'STANDBY'}
            </span>
          </div>

          <div className="text-[var(--text-muted)] hidden sm:block">
            <Volume2 size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
