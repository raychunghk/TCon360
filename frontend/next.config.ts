import bundleAnalyzer from '@next/bundle-analyzer';
import { config } from '@tcon360/config';
import type { NextConfig } from 'next';
import path from 'node:path';

import { createVanillaExtractTurbopackPlugin } from './lib/vanilla-extract-turbopack-plugin';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

console.log('=====================================');
console.log('NEXT CONFIG FILE LOADED: next.config.ts');
console.log('=====================================');
console.log('[next.config.ts] NODE_ENV:', process.env.NODE_ENV);
console.log('[next.config.ts] FRONTEND_PORT (raw):', process.env.FRONTEND_PORT);
console.log('[next.config.ts] config.feprefix:', config.feprefix);

const FRONTEND_PORT = Number(process.env.FRONTEND_PORT) || config.frontendport;
const BACKEND_PORT = config.backendport;
const isDocker = FRONTEND_PORT === 8255;

console.log('[next.config.ts] FRONTEND_PORT (parsed):', FRONTEND_PORT);
console.log('[next.config.ts] BACKEND_PORT:', BACKEND_PORT);
console.log('[next.config.ts] isDocker (FRONTEND_PORT === 8255):', isDocker);

const _basepath = isDocker ? '' : config.feprefix;
const _assetPrefix = isDocker ? '' : config.feprefix;

console.log('[next.config.ts] basePath:', _basepath || '(empty string)');
console.log('[next.config.ts] assetPrefix:', _assetPrefix || '(empty string)');
console.log('[next.config.ts] useBetterAuth:', config.useBetterAuth || '(empty string)');
console.log('-------------------------------------');

const nextConfig: NextConfig = {
  basePath: _basepath,
  assetPrefix: _assetPrefix,
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Turbopack + Webpack support for vanilla-extract
  // See: docs/BUNDLER_SETUP.md
  turbopack: {
    resolveAlias: {
      '@tcon360/config': '../packages/config/dist/index.js',
    },
  },

  // Webpack fallback for compatibility
  webpack: (webpackConfig, { isServer }) => {
    const originalAlias = webpackConfig.resolve.alias || {};

    if (!isServer) {
      webpackConfig.resolve.alias = {
        ...originalAlias,
        '@tcon360/config': path.resolve(
          process.cwd(),
          '../packages/config/dist/index.js',
        ),
        'node:module': false,
      };
    } else {
      webpackConfig.resolve.alias = {
        ...originalAlias,
        '@tcon360/config': path.resolve(
          process.cwd(),
          '../packages/config/dist/index.js',
        ),
      };
    }

    webpackConfig.resolve.fallback = { fs: false };

    return webpackConfig;
  },

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
      // testing api
      {
        source: '/api/betterhealth/:path*',
        destination: '/api/betterhealth/:path*',
      },
      {
        source: '/absproxy/:port([0-9]+)/api/betterhealth/:path*',
        destination: '/api/betterhealth/:path*',
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

// Apply vanilla-extract plugin for both Webpack & Turbopack
export default createVanillaExtractTurbopackPlugin()(withBundleAnalyzer(nextConfig));
