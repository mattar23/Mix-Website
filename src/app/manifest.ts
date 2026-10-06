import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

// Required for metadata routes under output: 'export'.
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: 'Maryam Attar',
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#e4e2dd',
    theme_color: '#e4e2dd',
    icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
  };
}
