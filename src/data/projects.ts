export interface Project {
  id: string;
  title: string;
  clientOrArtist: string;
  role: string;
  year: string;
  category: 'Music' | 'Commercial' | 'Art' | 'Sound Design';
  description: string;
  image: string;
  audioSrc?: string;
  externalLink?: string;
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'cloud-walker',
    title: 'Cloud Walker — Expo 2020 Dubai',
    clientOrArtist: 'MDLBEAST / Saudi Arabia Pavilion',
    role: 'Original Music Composition & Production',
    year: '2021',
    category: 'Commercial',
    description:
      'Composed and produced original music for the Saudi Arabia Pavilion\'s animated promotional campaign at Expo 2020 Dubai, capturing Saudi cultural essence and the forward-looking vision of 2030.',
    image: '/images/projects/cloud-walker.jpg',
    externalLink: 'https://www.youtube.com/watch?v=CLok4hx-Cms',
    tags: ['Original Score', 'MDLBeast', 'Orchestral Hybrid', 'Expo 2020']
  },
  {
    id: 'nadine-jewellery-rawda',
    title: 'Rawda Collection Campaign',
    clientOrArtist: 'Nadine Jewellery',
    role: 'Music Production, Voiceover Recording & Mix',
    year: '2022 – 2023',
    category: 'Commercial',
    description:
      'Music production and complete audio mixing for luxury campaign videos celebrating nature, heritage, and poetic storytelling. Recorded, edited, and balanced voiceover narration across multiple collection chapters.',
    image: '/images/projects/nadine-jewellery.jpg',
    audioSrc: '/audio/gemma-nj-rawda.mp3',
    externalLink: 'https://www.instagram.com/reel/DQGjQg6AAw3/',
    tags: ['Music Production', 'Voiceover Mix', 'Brand Scoring', 'Luxury']
  },
  {
    id: 'athr-gallery',
    title: 'Artist Open Call Campaign',
    clientOrArtist: 'Athr Gallery',
    role: 'Sound Design & Audio Production',
    year: '2020',
    category: 'Art',
    description:
      'Created immersive sound design and tactile sonic identity for Athr Gallery’s social media campaign announcing their international contemporary artist open call.',
    image: '/images/projects/athr-gallery.jpg',
    externalLink: 'https://www.instagram.com/p/B47bRS3ALwa/',
    tags: ['Sound Design', 'Contemporary Art', 'Spatial Texture']
  },
  {
    id: 'blending-in',
    title: 'Blending In — Audiovisual Performance',
    clientOrArtist: 'Nur Taibah',
    role: 'Original Music Production & Audio Narrative',
    year: '2021',
    category: 'Art',
    description:
      'Produced original music for an audiovisual performance art piece combining spoken word, intimate field recordings, and moving video for a public exhibition.',
    image: '/images/projects/blending-in.jpg',
    tags: ['Audiovisual Art', 'Spoken Word', 'Experimental Electronic']
  },
  {
    id: 'cultural-sample-pack',
    title: 'Cultural Heritage Audio Restoration',
    clientOrArtist: 'Saudi Music Commission',
    role: 'Audio Restoration & Sample Mastering',
    year: '2022',
    category: 'Sound Design',
    description:
      'Engineered detailed spectral repair and audio restoration for an archival Saudi cultural sample pack, removing artifacts, clicks, and background noise to yield pristine, project-ready creative libraries.',
    image: '/images/aesthetic/analog-mixer.jpg',
    tags: ['iZotope RX', 'Audio Restoration', 'Heritage Archives']
  },
  {
    id: 'independent-artist-sessions',
    title: 'Studio Recording & Vocal Comping',
    clientOrArtist: 'Wall of Sound Label Sessions',
    role: 'Assistant Audio Engineer',
    year: '2021',
    category: 'Music',
    description:
      'Assisted recording sessions for bands and singer-songwriters, handling microphone placement, DAW routing, vocal comping, and production consultation.',
    image: '/images/maryam-session-collab.jpg',
    tags: ['Tracking', 'Analog Desk', 'Vocal Production']
  }
];

export interface AudioSample {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  duration: string;
  category: string;
}

export const AUDIO_SAMPLES: AudioSample[] = [
  {
    id: 'gemma',
    title: 'Gemma Chapter — Rawda Campaign',
    subtitle: 'Nadine Jewellery · Voiceover Mix & Original Production',
    src: '/audio/gemma-nj-rawda.mp3',
    duration: '0:55',
    category: 'Commercial'
  },
  {
    id: 'haya',
    title: 'Haya Chapter — Rawda Campaign',
    subtitle: 'Nadine Jewellery · Voiceover Mix & Sound Design',
    src: '/audio/haya-nj-rawda.mp3',
    duration: '1:10',
    category: 'Commercial'
  },
  {
    id: 'manna',
    title: 'Manna Chapter — Rawda Campaign',
    subtitle: 'Nadine Jewellery · Voiceover Mix & Atmosphere',
    src: '/audio/manna-nj-rawda.mp3',
    duration: '1:15',
    category: 'Commercial'
  },
  {
    id: 'rosa',
    title: 'Rosa Chapter — Rawda Campaign',
    subtitle: 'Nadine Jewellery · Spatial Tone & Voiceover Mix',
    src: '/audio/rosa-nj-rawda.mp3',
    duration: '0:51',
    category: 'Commercial'
  },
  {
    id: 'yasmina',
    title: 'Yasmina Chapter — Rawda Campaign',
    subtitle: 'Nadine Jewellery · Intimate Spoken Voiceover & Sonic Space',
    src: '/audio/yasmina-nj-rawda.mp3',
    duration: '0:43',
    category: 'Commercial'
  }
];
