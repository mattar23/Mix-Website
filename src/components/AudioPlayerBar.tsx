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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#F1EDE4]/95 backdrop-blur-md border-t border-[#E2DDD4] px-4 md:px-8 py-3 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-[200px] md:min-w-[280px]">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause sample' : 'Play sample'}
            className="w-10 h-10 rounded-full bg-[#181716] text-[#F7F5F0] flex items-center justify-center hover:bg-[#B8532B] transition-colors shrink-0"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </button>
          <div className="overflow-hidden">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#181716] truncate">
                {currentTrack.title}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono px-1.5 py-0.5 bg-[#E2DDD4] text-[#6B665F] rounded">
                <Disc size={10} className={isPlaying ? 'animate-spin' : ''} />
                24-Bit / 48kHz
              </span>
            </div>
            <p className="text-[11px] text-[#6B665F] truncate">{currentTrack.subtitle}</p>
          </div>
        </div>

        {/* Scrubber / Progress */}
        <div className="flex-1 max-w-xl hidden sm:flex items-center gap-3">
          <span className="text-xs font-mono text-[#6B665F] w-10 text-right">
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
          <span className="text-xs font-mono text-[#6B665F] w-10">
            {formatTime(duration)}
          </span>
        </div>

        {/* Vintage indicator & status */}
        <div className="flex items-center gap-3 text-right">
          <div className="hidden lg:flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                isPlaying ? 'bg-[#B8532B] animate-pulse' : 'bg-[#A39D94]'
              }`}
            />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B665F]">
              {isPlaying ? 'PLAYING AUDIO TAPE' : 'MONITOR PAUSED'}
            </span>
          </div>
          <div className="text-[#6B665F] hidden sm:block">
            <Volume2 size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
