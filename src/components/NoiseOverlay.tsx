'use client';

import React from 'react';

export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 analog-grain opacity-40"
    />
  );
}
