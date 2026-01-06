import bundleAnalyzer from '@next/bundle-analyzer';
import { config } from '@tcon360/config';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import path from 'path';

const withVanillaExtract = createVanillaExtractPlugin();
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

console.log('=====================================');
console.log('NEXT CONFIG FILE LOADED: next.config.mjs');
console.log('=====================================');
console.log('[next.config.mjs] NODE_ENV:', process.env.NODE_ENV);
console.log('[next.config.mjs] FRONTEND_PORT (raw):', process.env.FRONTEND_PORT);
console.log('[next.config.mjs] config.feprefix:', config.feprefix);

const FRONTEND_PORT = Number(process.env.FRONTEND_PORT) || config.frontendport;
const BACKEND_PORT = config.backendport;
const isDocker = FRONTEND_PORT === 8255;

console.log('[next.config.mjs] FRONTEND_PORT (parsed):', FRONTEND_PORT);
console.log('[next.config.mjs] BACKEND_PORT:', BACKEND_PORT);
console.log('[next.config.mjs] isDocker (FRONTEND_PORT === 8255):', isDocker);

const _basepath = isDocker ? '' : config.feprefix;
const _assetPrefix = isDocker ? '' : config.feprefix;

console.log('[next.config.mjs] basePath:', _basepath || '(empty string)');
console.log('[next.config.mjs] assetPrefix:', _assetPrefix || '(empty string)');
console.log('[next.config.mjs] useBetterAuth:', config.useBetterAuth || '(empty string)');
console.log('-------------------------------------');

const nextConfig = {
  basePath: _basepath,
  assetPrefix: _assetPrefix,
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    const originalAlias = config.resolve.alias || {};

    if (!isServer) {
      config.resolve.alias = {
        ...originalAlias,
        '@tcon360/config': path.resolve(process.cwd(), '../packages/config/dist/index.js'),
        'node:module': false,
        // 'node:fs': false,
        // 'node:path': false,
      };
    } else {
      config.resolve.alias = {
        ...originalAlias,
        '@tcon360/config': path.resolve(process.cwd(), '../packages/config/dist/index.js'),
      };
    }

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
  trailingSlash: false,
  async rewrites() {
    const rewrites = [
      {
        source: '/images/:path*',
        destination: `${_basepath}/images/:path*`,
      },
      {
        source: '/:path*',
        destination: `${_basepath}/:path*`,
      },
      // Exclude NextAuth routes from backend proxying
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
      {
        source: '/absproxy/:port([0-9]+)/api/auth/:path*',
        destination: '/api/auth/:path*',
      },

      // Better Auth
      {
        source: '/api/bauth/:path*',
        destination: '/api/bauth/:path*',
      },
      {
        source: '/absproxy/:port([0-9]+)/api/bauth/:path*',
        destination: '/api/bauth/:path*',
      },

      // Backend API proxy
      {
        source: '/absproxy/:port([0-9]+)/api/:path*',
        destination: `http://127.0.0.1:${BACKEND_PORT}/api/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `http://127.0.0.1:${BACKEND_PORT}/api/:path*`,
      },
    ];

    return rewrites;
  },
  images: {
    path: `${_basepath}/_next/image`,
  },
};



export default withVanillaExtract(withBundleAnalyzer(nextConfig));