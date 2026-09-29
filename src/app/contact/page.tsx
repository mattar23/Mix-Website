import { Metadata } from 'next';
import ContactClient from './ContactClient';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact & Studio Inquiries | Maryam Attar',
  description:
    'Initiate a music production, audio mixing, sound design, or equipment rental inquiry with Maryam Attar. Based in Jeddah, Saudi Arabia and serving regional and international clients.',
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: 'Contact & Studio Inquiries | Maryam Attar',
    description:
      'Book a mixing session, original composition project, or audio equipment hire in Jeddah or remotely worldwide.',
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
