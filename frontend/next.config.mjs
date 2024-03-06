import bundleAnalyzer from '@next/bundle-analyzer';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import dotenv from 'dotenv';

dotenv.config();
import baseconf from '../baseconfig.js';
 
const { baseconfig } = baseconf;
const _basepath = baseconfig.prefix;
console.log('_basepath?', _basepath);
const nextConfig = {
  //basePath: _basepath,
  //assetPrefix behind proxy
  assetPrefix: _basepath,
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  // exportPathMap() {
  //   return {
  //     '/': { page: '/' },
  //   };
  // },
  env: {
    TOKEN_MAX_AGE: process.env.TOKEN_MAX_AGE,
    basepath: _basepath,
  },
  swcMinify: true,
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/images/:path*',
        destination: `${_basepath}/images/:path*`,
      },
    ];
  },
  images: {
    path: `${_basepath}/_next/image`,
  },
  webpack: (config, { dev, isServer }) => {
    // if (!isServer) {
    //   config.resolve.alias['@emotion/react'] = require.resolve('@emotion/react');
    //   config.resolve.alias['@emotion/styled'] = require.resolve('@emotion/styled');
    // }
    // config.module.rules.push({
    //   test: /\.css$/,
    //   loader: 'postcss-loader',
    //   options: {
    //     postcssOptions: {
    //       plugins: [require('tailwindcss'), require('autoprefixer')],
    //     },
    //   },
    // });
    config.resolve.fallback = { fs: false };
    // if (isServer) {
    //   config.node = {
    //     fs: 'empty',
    //   };
    // }
    return config;
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
