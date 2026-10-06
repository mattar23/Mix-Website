export const siteConfig = {
  name: 'Maryam Attar',
  title: 'Maryam Attar, Mixing and Voiceover Engineer in Jeddah',
  description:
    'Mixing for records, editing and mixing for podcasts and voiceovers, and audio equipment hire in Jeddah, Saudi Arabia. Maryam Attar works with artists, podcasters, and directors across the Gulf, in person and remotely.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://maryamattar.co',
  ogImage: '/images/og-portrait.jpg',
  locale: 'en_US',
  alternateLocales: ['ar_SA'],
  author: {
    name: 'Maryam Attar',
    role: 'Mixing and Voiceover Engineer',
    email: 'maryamattarmusic@gmail.com',
    location: 'Jeddah, Saudi Arabia',
  },
  keywords: [
    'mixing engineer Jeddah',
    'mixing engineer Saudi Arabia',
    'online mixing GCC',
    'podcast editing Jeddah',
    'voiceover mixing Saudi Arabia',
    'audio equipment rental Jeddah',
    'microphone rental Jeddah',
    'Shure SM7B rental Saudi Arabia',
    'Maryam Attar',
  ],
  // Countries named in the structured data. Remote sessions reach further,
  // but these are where the work is actually sought.
  areaServed: ['Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Bahrain', 'Kuwait', 'Oman'],
  socials: {
    instagram: 'https://www.instagram.com',
    soundcloud: 'https://soundcloud.com',
    linkedin: 'https://linkedin.com',
  },
};
