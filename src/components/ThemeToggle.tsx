'use client';

import React from 'react';
import { useTheme } from './ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'night console' : 'day archive'} theme`}
      className="group relative flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-(--border-color) bg-(--bg-card) hover:border-(--accent) transition-all cursor-pointer text-xs font-mono select-none"
      title="Toggle Studio Lighting (Day / Night Console)"
    >
      {/* Analog LED indicator */}
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            theme === 'dark' ? 'bg-[#E07A5F]' : 'bg-[#B8532B]'
          }`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            theme === 'dark'
              ? 'bg-[#E07A5F] shadow-[0_0_6px_#E07A5F]'
              : 'bg-[#B8532B]'
          }`}
        />
      </span>

      {/* Label */}
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-(--text-muted) group-hover:text-(--text-main) transition-colors">
        <span className="opacity-60 hidden lg:inline">LIGHT:</span>
        <span className="font-semibold text-(--text-main)">
          {theme === 'dark' ? 'NIGHT' : 'DAY'}
        </span>
      </div>
    </button>
  );
}
