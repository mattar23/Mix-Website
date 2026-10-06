import type { NextConfig } from 'next';

// Static export: the site has no server code, so it ships as files and is
// served from GitHub Pages under Maryam's own account. See DEPLOY.md.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
