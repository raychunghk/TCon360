import bundleAnalyzer from '@next/bundle-analyzer';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import { config } from '@tcon360/config'; // ← ONLY THIS
import path from 'path'; // Added path import

const withVanillaExtract = createVanillaExtractPlugin();
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
/* ------------------------------------------------------------------
   LOGGING – appears in `docker-compose build frontend` output
   ------------------------------------------------------------------ */
console.log('=====================================');
console.log('NEXT CONFIG FILE LOADED: next.config.mjs');
console.log('=====================================');
console.log('[next.config.mjs] NODE_ENV:', process.env.NODE_ENV);
console.log('[next.config.mjs] FRONTEND_PORT (raw):', process.env.FRONTEND_PORT);
console.log('[next.config.mjs] config.feprefix:', config.feprefix);
/* ------------------------------------------------------------------
   Detect Docker container (FRONTEND_PORT === 8255)
   ------------------------------------------------------------------ */
const FRONTEND_PORT = Number(process.env.FRONTEND_PORT) || 3000;
const isDocker = FRONTEND_PORT === 8255;
console.log('[next.config.mjs] FRONTEND_PORT (parsed):', FRONTEND_PORT);
console.log('[next.config.mjs] isDocker (FRONTEND_PORT === 8255):', isDocker);
/* ------------------------------------------------------------------
   Base path – empty in Docker, otherwise use shared config prefix
   ------------------------------------------------------------------ */
const _basepath = isDocker ? '' : config.feprefix;
const _assetPrefix = isDocker ? '' : config.feprefix;
console.log('[next.config.mjs] basePath:', _basepath || '(empty string)');
console.log('[next.config.mjs] assetPrefix:', _assetPrefix || '(empty string)');
console.log('-------------------------------------');
/* ------------------------------------------------------------------
   Next.js configuration
   ------------------------------------------------------------------ */
const nextConfig = {
  basePath: _basepath,
  assetPrefix: _assetPrefix,
  reactStrictMode: false,
  
webpack: (config) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@tcon360/config': path.resolve(process.cwd(), '../packages/config/dist'),
  };
  config.resolve.fallback = { fs: false };
  return config;
},
  eslint: { ignoreDuringBuilds: true },
  env: {
    TOKEN_MAX_AGE: process.env.TOKEN_MAX_AGE,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks', 'next-auth'],
    serverActions: {
      allowedOrigins: ['localhost:*', '127.0.0.1:*', '*.raygor.cc', '*.raygor.cc:*'],
    },
  },
  compiler: { styledComponents: true },
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/images/:path*',
        destination: `${_basepath}/images/:path*`,
      },
      {
        source: '/:path*',
        destination: `${_basepath}/:path*`,
      },
      {
        source: '/api/auth/:path*',
        destination: 'http://127.0.0.1:3000/api/auth/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:3800/api/:path*',
      },
      {
        source: '/absproxy/3000/api/:path*',
        destination: 'http://127.0.0.1:3800/api/:path*',
      },
    ];
  },
  images: {
    path: `${_basepath}/_next/image`,
  },
};
export default withVanillaExtract(withBundleAnalyzer(nextConfig));