import bundleAnalyzer from '@next/bundle-analyzer';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import dotenv from 'dotenv';
import { NextConfig } from 'next';
//import baseconf from '../baseconfig.js';

const withVanillaExtract = createVanillaExtractPlugin();

const feconfig = require('./frontendconfig.js');
console.log('feconfig', feconfig);

//const { baseconfig } = baseconf;

// Load environment variables from .env file
dotenv.config();
const _basepath: string = feconfig.prefix;
const _assetPrefix: string = feconfig.feprefix;

console.log('next config _basepath?', _basepath);
console.log('next config asset prefix?', _assetPrefix);
const useReverseProxy: boolean = feconfig.useReverseProxy;

const nextConfig: NextConfig = {
  ...(useReverseProxy === false ? { basePath: feconfig.feprefix } : {}),
  assetPrefix: useReverseProxy ? _basepath : feconfig.feprefix,
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks', 'next-auth'],
    serverActions: {
      allowedOrigins: ['localhost:*', '127.0.0.1:*', '*.raygor.cc', '*.raygor.cc:*'],
    },
  },
  env: {
    TOKEN_MAX_AGE: process.env.TOKEN_MAX_AGE,
    basepath: useReverseProxy ? _basepath : feconfig.feprefix,
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
      ...(useReverseProxy === false ? [
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
      ] : []),
    ];
  },
  images: {
    path: `${useReverseProxy ? _basepath : feconfig.feprefix}/_next/image`,
  },
  webpack: (config, { dev, isServer }) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
console.log('next config', nextConfig);

export default withVanillaExtract(withBundleAnalyzer(nextConfig));