export interface EquipmentItem {
  id: string;
  name: string;
  brand: string;
  category:
    | 'Microphones'
    | 'Recording & Interfaces'
    | 'DI Boxes & Signal'
    | 'Guitar Pedals & FX'
    | 'Amplifiers'
    | 'Cables & Accessories';
  quantity: number;
  dayRateSAR: number;
  weekRateSAR: number; // typically 3x daily rate
  description: string;
  image?: string;
  highlight?: boolean;
}

export const EQUIPMENT_INVENTORY: EquipmentItem[] = [
  // MICROPHONES
  {
    id: 'shure-sm57',
    name: 'SM57 Dynamic Instrument Microphone',
    brand: 'Shure',
    category: 'Microphones',
    quantity: 3,
    dayRateSAR: 50,
    weekRateSAR: 150,
    description: 'The industry-standard cardioid dynamic microphone for guitar cabs, snares, and high-SPL sound sources.',
    image: '/images/gear/sm57.jpg',
    highlight: true,
  },
  {
    id: 'shure-sm7b',
    name: 'SM7B Vocal Dynamic Microphone',
    brand: 'Shure',
    category: 'Microphones',
    quantity: 1,
    dayRateSAR: 120,
    weekRateSAR: 360,
    description: 'Iconic smooth, flat, wide-range frequency response microphone for broadcast, voiceover, and studio lead vocals.',
    image: '/images/gear/sm7b.jpg',
    highlight: true,
  },
  {
    id: 'akg-p220',
    name: 'P220 Large-Diaphragm Condenser',
    brand: 'AKG',
    category: 'Microphones',
    quantity: 1,
    dayRateSAR: 80,
    weekRateSAR: 240,
    description: 'Warm, clear condenser microphone tailored for acoustic guitars, percussion, and expressive female/male vocals.',
  },
  {
    id: 'shure-pga27',
    name: 'PGA27 Side-Address Condenser',
    brand: 'Shure',
    category: 'Microphones',
    quantity: 1,
    dayRateSAR: 80,
    weekRateSAR: 240,
    description: 'Large diaphragm cardioid condenser with high dynamic range and flat, neutral frequency reproduction.',
  },

  // RECORDING & INTERFACES
  {
    id: 'tascam-model-12',
    name: 'Model 12 Analog & USB Mixer / Multi-track Recorder',
    brand: 'Tascam',
    category: 'Recording & Interfaces',
    quantity: 1,
    dayRateSAR: 200,
    weekRateSAR: 600,
    description: 'All-in-one integrated multi-track recording suite combining warm analog routing, DAW controller, and high-fidelity interface.',
    image: '/images/gear/tascam-model12.jpg',
    highlight: true,
  },
  {
    id: 'zoom-h6',
    name: 'H6 6-Track Handy Audio Recorder',
    brand: 'Zoom',
    category: 'Recording & Interfaces',
    quantity: 1,
    dayRateSAR: 100,
    weekRateSAR: 300,
    description: 'Portable field recorder with interchangeable microphone capsules and 4 XLR/TRS combo inputs for location sound.',
    image: '/images/gear/zoom-h6.jpg',
  },

  // DI BOXES & SIGNAL
  {
    id: 'cloudlifter-cl1',
    name: 'CL-1 Mic Activator (+25dB Clean Gain)',
    brand: 'Cloudlifter',
    category: 'DI Boxes & Signal',
    quantity: 1,
    dayRateSAR: 50,
    weekRateSAR: 150,
    description: 'Ultra-clean inline discrete JFET gain booster tailored for low-output dynamic mics like the Shure SM7B.',
    image: '/images/gear/cloudlifter.jpg',
  },
  {
    id: 'cloudlifter-cl2',
    name: 'CL-2 Dual-Channel Mic Activator',
    brand: 'Cloudlifter',
    category: 'DI Boxes & Signal',
    quantity: 1,
    dayRateSAR: 60,
    weekRateSAR: 180,
    description: 'Two independent channels of ultra-transparent gain, ideal for stereo acoustic mic pairs or dual ribbon setups.',
  },
  {
    id: 'radial-pzdi',
    name: 'PZ-DI Acoustic & Piezo Direct Box',
    brand: 'Radial Engineering',
    category: 'DI Boxes & Signal',
    quantity: 2,
    dayRateSAR: 80,
    weekRateSAR: 240,
    description: 'Optimized impedance-matching DI box for piezo transducers, magnetic pickups, and acoustic instruments.',
    image: '/images/gear/radial-pzdi.jpg',
  },
  {
    id: 'bss-ar133',
    name: 'AR133 Active Direct Box',
    brand: 'BSS Audio',
    category: 'DI Boxes & Signal',
    quantity: 1,
    dayRateSAR: 60,
    weekRateSAR: 180,
    description: 'Rugged professional active direct box renowned for bulletproof roadworthiness and noise rejection.',
  },

  // GUITAR PEDALS & FX
  {
    id: 'gamechanger-auto-reverb',
    name: 'Auto Reverb Ambient Soundscape Processor',
    brand: 'Gamechanger Audio',
    category: 'Guitar Pedals & FX',
    quantity: 1,
    dayRateSAR: 75,
    weekRateSAR: 225,
    description: 'Experimental modular dynamic reverb that responds to player dynamics and envelope shaping.',
    highlight: true,
  },
  {
    id: 'ehx-cathedral',
    name: 'Cathedral Stereo Reverb',
    brand: 'Electro-Harmonix',
    category: 'Guitar Pedals & FX',
    quantity: 1,
    dayRateSAR: 55,
    weekRateSAR: 165,
    description: 'Programmable true stereo reverb pedal with lush spring, hall, room, plate, reverse, and infinite hold modes.',
  },
  {
    id: 'jhs-clover',
    name: 'Clover Preamp / Clean Boost & 3-Band EQ',
    brand: 'JHS Pedals',
    category: 'Guitar Pedals & FX',
    quantity: 1,
    dayRateSAR: 55,
    weekRateSAR: 165,
    description: 'Faithful reproduction of the legendary Boss FA-1 preamp circuit with balanced XLR output and sweepable EQ.',
  },
  {
    id: 'jhs-moonshine-v2',
    name: 'Moonshine V2 Overdrive',
    brand: 'JHS Pedals',
    category: 'Guitar Pedals & FX',
    quantity: 1,
    dayRateSAR: 50,
    weekRateSAR: 150,
    description: 'High-headroom overdrive with clean blend control for maintaining low-end punch and transparency.',
  },
  {
    id: 'tc-nova-delay',
    name: 'ND-1 Nova Delay Dual Engine',
    brand: 'TC Electronic',
    category: 'Guitar Pedals & FX',
    quantity: 1,
    dayRateSAR: 50,
    weekRateSAR: 150,
    description: 'Studio-quality delay lines with tap tempo, modulation, dynamic delay, and presets.',
  },
  {
    id: 'ehx-goodvibes',
    name: 'GoodVibes Uni-Vibe Analog Chorus & Vibrato',
    brand: 'Electro-Harmonix',
    category: 'Guitar Pedals & FX',
    quantity: 1,
    dayRateSAR: 50,
    weekRateSAR: 150,
    description: 'Photocell-based retro 1960s warmth and swirl with undulating modulation depth.',
  },
  {
    id: 'mxr-compressor',
    name: 'Dyna Comp / Studio Compressor',
    brand: 'MXR',
    category: 'Guitar Pedals & FX',
    quantity: 1,
    dayRateSAR: 45,
    weekRateSAR: 135,
    description: 'Classic analog sustain and percussive attack evening out dynamics for guitar, synths, and percussion.',
  },

  // AMPLIFIERS
  {
    id: 'roland-bass-amp',
    name: 'CUBE Bass Stage Amplifier',
    brand: 'Roland',
    category: 'Amplifiers',
    quantity: 1,
    dayRateSAR: 120,
    weekRateSAR: 360,
    description: 'Versatile low-end tone with punchy COSM amp modeling, onboard effects, and direct balanced recording output.',
  },

  // CABLES & ACCESSORIES
  {
    id: 'xlr-cables-bundle',
    name: 'Professional XLR Balanced Cables (3m, 6m, 10m, 20m, 30m)',
    brand: 'York / Quiklok',
    category: 'Cables & Accessories',
    quantity: 12,
    dayRateSAR: 15,
    weekRateSAR: 45,
    description: 'Heavy duty, low-noise shielded balanced oxygen-free copper XLR microphone and line cables.',
    image: '/images/gear/cables.jpg',
  },
  {
    id: 'ts-extension-bundle',
    name: 'Shielded Instrument TS Cables & Extensions',
    brand: 'Custom / York',
    category: 'Cables & Accessories',
    quantity: 5,
    dayRateSAR: 10,
    weekRateSAR: 30,
    description: 'High-purity instrument cables with gold-plated connectors for interference-free guitar and synth tracking.',
  },
  {
    id: 'boom-mic-stands',
    name: 'Heavy Duty Studio Boom Mic Stands',
    brand: 'Professional Studio',
    category: 'Cables & Accessories',
    quantity: 4,
    dayRateSAR: 20,
    weekRateSAR: 60,
    description: 'Stable cast-base and tripod boom stands with vibration damping for precision mic placement.',
  },
];

export const RENTAL_TERMS = {
  periods: 'Daily and weekly rates available. Weekly rentals automatically qualify for a 3-day rate cap (get 7 days for the price of 3).',
  pickupDelivery: 'Pickup and return windows arranged in Jeddah, Saudi Arabia. Courier delivery available upon request.',
  deposit: 'A refundable security deposit or signed rental agreement is required before gear handover. Deposits are promptly returned following inspection.',
  conditionTesting: 'All equipment is fully tested, cleaned, and checked for calibrated performance prior to release.',
};
