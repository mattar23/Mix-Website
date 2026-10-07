import { Metadata } from 'next';
import ContactClient from './ContactClient';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Maryam Attar for mixing, podcast and voiceover mixing, or audio equipment hire in Jeddah, Saudi Arabia. Remote sessions across the GCC.',
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: 'Contact | Maryam Attar',
    description: 'Book a mixing session, a voiceover session, or hire gear in Jeddah.',
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
