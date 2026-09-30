export interface ServiceDetail {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  requirements?: {
    heading: string;
    points: string[];
  }[];
}

export const SERVICES: ServiceDetail[] = [
  {
    id: 'mixing',
    number: '01',
    title: 'Mixing',
    shortDesc: 'A considered, musical approach to mixing that maintains the character of the track while enhancing clarity, depth, and impact.',
    fullDesc:
      'My approach to mixing is to build on what is already there, bringing the production to a finished mix ready for mastering while keeping the artist’s creative direction and the organic character of the track intact. I work across singles, EPs, and full-length albums.',
    deliverables: [
      'High-resolution 24-bit / 48kHz (or native) WAV master mix files',
      'Instrumental, TV, and Acapella alternate passes',
      'Stems export upon prior agreement',
      'Three consolidated revision rounds included with detailed turnaround tracking'
    ],
    requirements: [
      {
        heading: 'Session & File Format',
        points: [
          'Supply consolidated WAV multitracks, exported from the same start point (00:00:00) at your session’s native sample rate and bit depth (e.g. 48kHz / 24-bit).',
          'Alternatively, zipped Ableton Live or Logic Pro project folders containing all collected audio assets are accepted.'
        ]
      },
      {
        heading: 'Session Organization',
        points: [
          'Ensure tracks are clearly named (e.g. Kick_In, Bass_DI, Vox_Lead).',
          'Mute or purge inactive takes, ghost clips, and unused channels not intended for the final mix.'
        ]
      },
      {
        heading: 'Rough Mix & References',
        points: [
          'Include the latest producer or rough mix as an essential benchmark for existing balance and spatial ideas.',
          'Share a short playlist (2 to 3 tracks) representing the tone, energy, or aesthetic vibe you envision.'
        ]
      },
      {
        heading: 'Vocals & Tuning Preparation',
        points: [
          'Vocals should arrive comped, edited, de-essed, and pitch-corrected if required. Minor corrective balance is handled during mixing.'
        ]
      }
    ]
  },
  {
    id: 'production',
    number: '02',
    title: 'Music Production & Composition',
    shortDesc: 'Support across concept development, recording, synthesis, and creative arrangement to bring ideas from early seeds to a polished body of work.',
    fullDesc:
      'Moving between experimentation and intention, allowing sound itself to shape the direction of a piece while using tone, texture, and space to build an immersive environment around its narrative. Specializing in experimental electronic music, trip-hop, alternative rock, and hybrid scoring.',
    deliverables: [
      'Full arrangement and musical production',
      'Original synthesis, drum programming, and instrumentation',
      'Vocal tracking and creative direction',
      'Ready-to-mix multitrack project assets'
    ],
    requirements: [
      {
        heading: 'Project Kickoff',
        points: [
          'Voice memo demos, chord progressions, acoustic sketches, or lyric outlines.',
          'Creative brief outlining aesthetic goals, instrumentation preferences, and target deadlines.'
        ]
      }
    ]
  },
  {
    id: 'sound-design',
    number: '03',
    title: 'Sound Design & Spatial Audio',
    shortDesc: 'Custom sonic landscapes for visual media, film, contemporary art installations, and spatial brand narratives.',
    fullDesc:
      'Designing unique auditory signatures for moving pictures, fashion films, museum exhibits, and interactive installations. Utilizing tactile physical objects, modular synthesis, and granular processing to craft sounds that feel visceral rather than merely heard.',
    deliverables: [
      'Custom Foley, sound effects, and auditory motifs',
      'Sync-to-picture stereo and spatial audio deliverables',
      'Ambience and environmental audio loops for gallery installations',
      'Comprehensive audio post-production stems'
    ]
  },
  {
    id: 'restoration',
    number: '04',
    title: 'Audio Restoration & Archive Mastering',
    shortDesc: 'Precision spectral repair, artifact removal, and tonal balance for sample libraries, podcasts, and historical recordings.',
    fullDesc:
      'Using industry-standard spectral repair tools (iZotope RX Advanced) to eliminate clicks, pops, hum, hiss, phase issues, and clipping without sacrificing the natural harmonic warmth of the original recording.',
    deliverables: [
      'Cleaned, de-noised, and phase-aligned audio tracks',
      'High-fidelity project-ready sample packs',
      'Before / After spectral verification checks'
    ]
  }
];
