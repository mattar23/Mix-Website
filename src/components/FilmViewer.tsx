'use client';

import React, { useEffect, useRef } from 'react';
import type { Project } from '@/data/projects';
import { useAudio } from '@/components/AudioPlayerContext';
import { asset } from '@/lib/asset';

/**
 * The viewer a film opens in from its row on the Work page. It is a native
 * dialog, so Escape and the backdrop close it and focus returns to the row.
 * Only one thing on the site makes sound at a time: opening a film pauses
 * the track player, and closing the viewer stops the film.
 */
export function FilmViewer({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const { pauseTrack } = useAudio();
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (project && !d.open) {
      pauseTrack();
      d.showModal();
      void video.current?.play().catch(() => {});
    }
    if (!project && d.open) d.close();
  }, [project, pauseTrack]);

  return (
    <dialog
      ref={dialog}
      className="viewer"
      aria-label={project ? project.title : undefined}
      onClose={() => {
        video.current?.pause();
        onClose();
      }}
      // A click on the dialog itself is a click on the backdrop.
      onClick={(e) => {
        if (e.target === dialog.current) dialog.current?.close();
      }}
    >
      {project?.film && (
        <>
          <video
            key={project.id}
            ref={video}
            className="viewer__video"
            src={asset(project.film.src)}
            poster={asset(project.film.poster)}
            controls
            playsInline
            preload="metadata"
          />
          <div className="viewer__bar">
            <p>
              <span className="small-head">{project.title}</span>
              <span className="meta" style={{ display: 'block' }}>
                {project.role} for {project.clientOrArtist}
              </span>
            </p>
            <button className="ul-link meta" onClick={() => dialog.current?.close()}>
              Close
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}
