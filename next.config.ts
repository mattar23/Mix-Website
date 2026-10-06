import type { NextConfig } from 'next';

// Static export: the site has no server code, so it ships as files and is
// served from GitHub Pages under Maryam's own account. See DEPLOY.md.
const nextConfig: NextConfig = {
  output: 'export',
  // Empty on the real domain. Set to /Mix-Website while the site is previewed
  // from the GitHub project URL, see DEPLOY.md.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
