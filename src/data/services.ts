export interface ServiceDetail {
  id: string;
  title: string;
  /** One line for the home page, taken from Maryam's home mockup. */
  teaser: string;
  shortDesc: string;
  fullDesc?: string;
  includes?: string[];
  /** Closing paragraphs that carry no heading in her document. */
  notes?: string[];
  requirements?: { heading: string; body: string }[];
  delivery?: string[];
}

// Every sentence below is Maryam's own, word for word, from
// "Wesbite Services.pages". She asked for her wording to be used as written,
// so do not tidy, shorten, or respell it. Headings in the page come from the
// same document.
export const SERVICES: ServiceDetail[] = [
  {
    id: 'mixing',
    title: 'Mixing',
    teaser: 'Detailed, intentional mixes for artists, songs and audio projects.',
    shortDesc:
      'My approach to mixing is to build on what is already there, bringing the production to a finished mix ready for mastering while keeping the artist’s creative direction and the character of the track intact.',
    fullDesc:
      'I work with singles, EPs and albums. Sessions are preferably supplied as consolidated WAV multitracks. Ableton Live or Logic Pro project files can also be accepted.',
    requirements: [
      {
        heading: 'Session / File Format',
        body: 'Supply consolidated WAV multitracks, exported from the same start point at the session’s native sample rate and bit depth. Alternatively, Ableton Live or Logic Pro sessions can be supplied as a zipped project folder containing all required audio files.',
      },
      {
        heading: 'Session Organization',
        body: 'Tracks should be clearly named and organized. Remove unused tracks, takes and files that are not intended to be part of the final mix.',
      },
      {
        heading: 'Rough Mix / References',
        body: 'Include the latest producer or rough mix as a reference for the existing balance, production choices and effects. Please also provide a short playlist of reference tracks that reflect the sound, feel or overall direction you have in mind for the final mix.',
      },
      {
        heading: 'Effects & Processing',
        body: 'Any effects or processing that are important to the production should be included. Where applicable, supply both wet and dry versions so the original production choices can be referenced while retaining flexibility during the mix.',
      },
      {
        heading: 'Vocals / Editing',
        body: 'Vocals should arrive comped, edited, cleaned and tuned where required. Minor corrective work can be handled during the mix, but extensive comping, editing, pitch correction or cleanup will incur an additional cost.',
      },
    ],
    delivery: [
      'Three rounds of revisions are included. Revision notes should be sent as one consolidated list, with timestamps where applicable. Additional revision rounds are charged separately.',
      'The final approved mix is delivered as a high-resolution WAV file ready for mastering.',
      'Turnaround is based on the size and complexity of the session and will be confirmed before the project begins.',
      'Mastering is not included.',
    ],
  },
  {
    id: 'voiceover',
    title: 'Podcast & Voiceover Mixing',
    teaser: 'Editing, mixing and sync for podcast, voiceover and spoken word.',
    shortDesc:
      'Editing, cleanup and mixing for podcasts, voiceovers and other spoken-word recordings. The focus is on clear, consistent dialogue while maintaining a natural sound throughout the recording.',
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
    notes: [
      'Audio can also be mixed and synced to supplied video where required.',
      'Source recordings should be clean and properly recorded before delivery. Extensive audio restoration and editorial/content editing are not included.',
      'Turnaround and final delivery specifications are confirmed based on the requirements of each project.',
    ],
  },
];

// Her document lists these under Mixing. She asked on 2026-10-07 for them to
// stand as their own section at the end of the page, after both services.
export const ADDITIONAL_SERVICES = {
  id: 'additional',
  title: 'Additional Services & Deliverables',
  intro: 'Optional services are available depending on the needs of the project.',
  items: [
    {
      heading: 'Rush Delivery',
      body: 'Faster turnaround dependent on availability and project requirements.',
    },
    {
      heading: 'Additional Revisions',
      body: 'Additional revision rounds beyond the three included with the mix.',
    },
    {
      heading: 'Mixed Stems',
      body: 'Processed stem groups from the final mix, such as drums, instruments, lead vocals and background vocals.',
    },
    {
      heading: 'Alternate Versions',
      body: 'Additional versions of the final mix, including instrumental, a cappella, clean, performance/TV and vocal-up mixes.',
    },
    {
      heading: 'Vocal Editing / Tuning',
      body: 'Extensive vocal comping, editing, pitch correction or cleanup beyond the minor corrective work included in the mix.',
    },
  ],
};
