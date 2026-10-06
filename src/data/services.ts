export interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  includes?: string[];
  excludes?: string[];
  extras?: string[];
  requirements?: { heading: string; points: string[] }[];
  delivery?: string[];
}

// Copy below is Maryam's own, from "Wesbite Services.pages", lightly
// punctuated. Keep it in her voice when editing.
export const SERVICES: ServiceDetail[] = [
  {
    id: 'mixing',
    title: 'Mixing',
    shortDesc:
      'Build on what is already there: a finished mix ready for mastering that keeps the creative direction and the character of the track intact.',
    fullDesc:
      'I work with singles, EPs and albums. Sessions are preferably supplied as consolidated WAV multitracks. Ableton Live or Logic Pro project files can also be accepted.',
    requirements: [
      {
        heading: 'Session and file format',
        points: [
          'Supply consolidated WAV multitracks, exported from the same start point at the session’s native sample rate and bit depth.',
          'Alternatively, Ableton Live or Logic Pro sessions can be supplied as a zipped project folder containing all required audio files.',
        ],
      },
      {
        heading: 'Session organisation',
        points: [
          'Tracks should be clearly named and organised. Remove unused tracks, takes and files that are not intended to be part of the final mix.',
        ],
      },
      {
        heading: 'Rough mix and references',
        points: [
          'Include the latest producer or rough mix as a reference for the existing balance, production choices and effects.',
          'Provide a short playlist of reference tracks that reflect the sound, feel or overall direction you have in mind for the final mix.',
        ],
      },
      {
        heading: 'Effects and processing',
        points: [
          'Any effects or processing that are important to the production should be included. Where applicable, supply both wet and dry versions so the original choices can be referenced while keeping flexibility during the mix.',
        ],
      },
      {
        heading: 'Vocals and editing',
        points: [
          'Vocals should arrive comped, edited, cleaned and tuned where required. Minor corrective work is handled during the mix. Extensive comping, editing, pitch correction or cleanup is charged separately.',
        ],
      },
    ],
    delivery: [
      'Three rounds of revisions are included. Send revision notes as one consolidated list, with timestamps where applicable. Additional rounds are charged separately.',
      'The final approved mix is delivered as a high resolution WAV file ready for mastering.',
      'Turnaround depends on the size and complexity of the session and is confirmed before the project begins.',
      'Mastering is not included.',
    ],
    extras: [
      'Rush delivery, dependent on availability.',
      'Additional revision rounds beyond the three included.',
      'Mixed stems: processed stem groups such as drums, instruments, lead vocals and background vocals.',
      'Alternate versions: instrumental, a cappella, clean, performance or TV, and vocal up mixes.',
      'Vocal editing and tuning beyond the minor corrective work included in the mix.',
    ],
  },
  {
    id: 'voiceover',
    title: 'Podcast & Voiceover Mixing',
    shortDesc:
      'Editing, cleanup and mixing for podcasts, voiceovers and other spoken word recordings. Clear, consistent dialogue with a natural sound throughout.',
    fullDesc:
      'Audio can also be mixed and synced to supplied video where required. Turnaround and final delivery specifications are confirmed based on the requirements of each project.',
    includes: [
      'Dialogue editing',
      'EQ and compression',
      'De-essing',
      'Level balancing',
      'Minor noise, click and pop removal',
      'Light timing edits',
      'Mixing of supplied music and sound effects',
      'Final audio delivery to the required format',
    ],
    excludes: [
      'Source recordings should be clean and properly recorded before delivery.',
      'Extensive audio restoration and editorial or content editing are not included.',
    ],
  },
];
