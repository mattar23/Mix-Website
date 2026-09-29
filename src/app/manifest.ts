import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: 'Maryam Attar',
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#F7F5F0',
    theme_color: '#0D0C0B',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
