export interface Project {
  id: string;
  title: string;
  clientOrArtist: string;
  role: string;
  year: string;
  category: 'Music' | 'Commercial' | 'Art' | 'Sound Design';
  description: string;
  audioSrc?: string;
  externalLink?: string;
  /** Further posts or reels for the same piece, from Maryam's weblinks document. */
  moreLinks?: { label: string; url: string }[];
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'cloud-walker',
    title: 'Cloud Walker, Expo 2020 Dubai',
    clientOrArtist: 'MDLBEAST / Saudi Arabia Pavilion',
    role: 'Original Music Composition & Production',
    year: '2021',
    category: 'Commercial',
    description:
      'Composed and produced original music for the Saudi Arabia Pavilion\'s animated promotional campaign at Expo 2020 Dubai, capturing Saudi cultural essence and the forward-looking vision of 2030.',
    externalLink: 'https://www.youtube.com/watch?v=CLok4hx-Cms',
    tags: ['Original Score', 'MDLBeast', 'Orchestral Hybrid', 'Expo 2020']
  },
  {
    id: 'nadine-jewellery-rawda',
    title: 'Rawda Collection Campaign',
    clientOrArtist: 'Nadine Jewellery',
    role: 'Music Production, Voiceover Recording & Mix',
    year: '2022/23',
    category: 'Commercial',
    description:
      'Music production and complete audio mixing for luxury campaign videos celebrating nature, heritage, and poetic storytelling. Recorded, edited, and balanced voiceover narration across multiple collection chapters.',
    audioSrc: '/audio/gemma-nj-rawda.mp3',
    externalLink: 'https://www.instagram.com/reel/DQGjQg6AAw3/',
    moreLinks: [{ label: 'Second reel', url: 'https://www.instagram.com/reel/DPrX-A0gAWj/' }],
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
    externalLink: 'https://www.instagram.com/p/B47bRS3ALwa/',
    moreLinks: [
      { label: 'Second post', url: 'https://www.instagram.com/p/B3ZnYL0ACzE/' },
      { label: 'Third post', url: 'https://www.instagram.com/p/B3md0tuAcj7/' },
    ],
    tags: ['Sound Design', 'Contemporary Art', 'Spatial Texture']
  },
  {
    id: 'blending-in',
    title: 'Blending In, Audiovisual Performance',
    clientOrArtist: 'Nur Taibah',
    role: 'Original Music Production & Audio Narrative',
    year: '2021',
    category: 'Art',
    description:
      'Produced original music for an audiovisual performance art piece combining spoken word, intimate field recordings, and moving video for a public exhibition.',
    tags: ['Audiovisual Art', 'Spoken Word', 'Experimental Electronic']
  },
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
    title: 'Gemma Chapter, Rawda Campaign',
    subtitle: 'Nadine Jewellery · Voiceover Mix & Original Production',
    src: '/audio/gemma-nj-rawda.mp3',
    duration: '1:40',
    category: 'Commercial'
  },
  {
    id: 'haya',
    title: 'Haya Chapter, Rawda Campaign',
    subtitle: 'Nadine Jewellery · Voiceover Mix & Sound Design',
    src: '/audio/haya-nj-rawda.mp3',
    duration: '2:07',
    category: 'Commercial'
  },
  {
    id: 'manna',
    title: 'Manna Chapter, Rawda Campaign',
    subtitle: 'Nadine Jewellery · Voiceover Mix & Atmosphere',
    src: '/audio/manna-nj-rawda.mp3',
    duration: '2:16',
    category: 'Commercial'
  },
  {
    id: 'palma',
    title: 'Palma Chapter, Rawda Campaign',
    subtitle: 'Nadine Jewellery · Voiceover Mix',
    src: '/audio/palma-nj-rawda.mp3',
    duration: '1:50',
    category: 'Commercial'
  },
  {
    id: 'rosa',
    title: 'Rosa Chapter, Rawda Campaign',
    subtitle: 'Nadine Jewellery · Spatial Tone & Voiceover Mix',
    src: '/audio/rosa-nj-rawda.mp3',
    duration: '1:34',
    category: 'Commercial'
  },
  {
    id: 'yasmina',
    title: 'Yasmina Chapter, Rawda Campaign',
    subtitle: 'Nadine Jewellery · Intimate Spoken Voiceover & Sonic Space',
    src: '/audio/yasmina-nj-rawda.mp3',
    duration: '1:18',
    category: 'Commercial'
  }
];

/** A finished film carrying Maryam's sound, shown with its audio on. */
export interface Film {
  id: string;
  title: string;
  /** Links the film to its entry in PROJECTS for the client name. */
  projectId: string;
  /** Maryam's credit on this film. The voiceover on the films was not hers. */
  credit: string;
  src: string;
  poster: string;
  duration: string;
}

export const FILMS: Film[] = [
  {
    id: 'rawda-botanica',
    title: 'Rawda Botanica',
    projectId: 'nadine-jewellery-rawda',
    credit: 'Music Production & Mix',
    src: '/video/rawda-botanica.mp4',
    poster: '/images/films/rawda-botanica.jpg',
    duration: '0:38'
  },
  {
    id: 'rawda-gemma',
    title: 'Rawda Gemma',
    projectId: 'nadine-jewellery-rawda',
    credit: 'Music Production & Mix',
    src: '/video/rawda-gemma.mp4',
    poster: '/images/films/rawda-gemma.jpg',
    duration: '0:31'
  }
];
