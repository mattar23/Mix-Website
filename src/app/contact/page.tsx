import { Metadata } from 'next';
import ContactClient from './ContactClient';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a mixing, production, sound design, or equipment hire enquiry with Maryam Attar in Jeddah, Saudi Arabia.',
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: {
    title: 'Contact | Maryam Attar',
    description: 'Book a session, or hire audio equipment in Jeddah.',
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
