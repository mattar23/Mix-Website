import React from 'react';

/** Play and pause, drawn rather than imported. Two shapes is not a dependency. */
export function Glyph({ playing, size = 12 }: { playing: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      {playing ? (
        <>
          <rect x="1.5" y="1" width="3" height="10" />
          <rect x="7.5" y="1" width="3" height="10" />
        </>
      ) : (
        <path d="M2 1 L11 6 L2 11 Z" />
      )}
    </svg>
  );
}
