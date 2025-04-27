// ~/workspace/vm/js/TCon360/frontend/next.config.mjs
import bundleAnalyzer from '@next/bundle-analyzer';
import { config } from '@tcon360/config';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

console.log('config', config); // For debugging
const _basepath = config.feprefix;
const _assetPrefix = config.feprefix;

const nextConfig = {
  basePath: _basepath,
  assetPrefix: _assetPrefix,
  reactStrictMode: false,
  transpilePackages: ['@tcon360/config'],
  webpack: (config) => {
    config.resolve.alias['@tcon360/config'] = '/config/workspace/vm/js/TCon360/packages/config/dist/index';
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    TOKEN_MAX_AGE: process.env.TOKEN_MAX_AGE,
    //   basepath: useReverseProxy ? _basepath : feconfig.feprefix,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks', 'next-auth'],
    serverActions: {
      allowedOrigins: ['localhost:*', '127.0.0.1:*', '*.raygor.cc', '*.raygor.cc:*'],
    },
  },
  swcMinify: true,
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
        destination: 'http://localhost:3000/api/auth/:path*',
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
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withVanillaExtract(withBundleAnalyzer(nextConfig));