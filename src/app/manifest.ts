import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { asset } from '@/lib/asset';

// Required for metadata routes under output: 'export'.
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: 'Maryam Attar',
    description: siteConfig.description,
    start_url: asset('/'),
    display: 'standalone',
    background_color: '#f4f0e7',
    theme_color: '#f4f0e7',
    icons: [{ src: asset('/favicon.ico'), sizes: 'any', type: 'image/x-icon' }],
  };
}
