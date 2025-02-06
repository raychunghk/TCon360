import bundleAnalyzer from '@next/bundle-analyzer';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import dotenv from 'dotenv';
import baseconf from '../baseconfig.js';
//https://poe.com/s/1XIh5Ypw2UL25fudpAIl
const withVanillaExtract = createVanillaExtractPlugin();

import { default as feconfig } from './frontendconfig.js';
console.log('feconfig', feconfig);
//const { feconfig } = require("./frontend/frontendconfig");
// Import base configuration
const { baseconfig } = baseconf;
// Load environment variables from .env file
dotenv.config();
const _basepath = baseconfig.prefix;
//const _basepath = feconfig.feprefix;
const _assetPrefix = feconfig.feprefix;

console.log('feconfig', feconfig);
console.log('next config _basepath?', _basepath);
console.log('next config  asset prefix?', _assetPrefix);
const useReverseProxy = feconfig.useReverseProxy;
const nextConfig = {

  // Set the base path for the application (commented out)
  //basePath: feconfig.feprefix,
  // Set the base path for the application
  ...(useReverseProxy === false ? { basePath: feconfig.feprefix } : {}),
  // Set the asset prefix for the application (used behind a proxy)
  assetPrefix: useReverseProxy ? _basepath : feconfig.feprefix,
  //assetPrefix: feconfig.feprefix,

  // Disable React's strict mode
  reactStrictMode: false,

  // Configure ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
  //typescript: {
  // !! WARN !!
  // Dangerously allow production builds to successfully complete even if
  // your project has type errors.
  // !! WARN !!
  //  ignoreBuildErrors: true,
  // },
  // Enable experimental package import optimization
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks', 'next-auth'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:*', '127.0.0.1:*', '*.raygor.cc', '*.raygor.cc:*'],
    },
  },
  // Define environment variables
  env: {
    TOKEN_MAX_AGE: process.env.TOKEN_MAX_AGE,
    basepath: useReverseProxy ? _basepath : feconfig.feprefix,
  },

  // Enable SWC minification
  swcMinify: true,

  // Enable trailing slashes
  trailingSlash: true,

  // Define URL rewrites
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
          destination: 'http://localhost:3000/api/auth/:path*', // proxy to self
        },
        {
          source: '/api/:path*',
          destination: 'http://127.0.0.1:3800/api/:path*', // proxy to Backend
        },

        {
          source: '/absproxy/3000/api/:path*',
          destination: 'http://127.0.0.1:3800/api/:path*', // proxy to Backend
        }
      ] : []),
    ];
  },

  // Configure image loader
  images: {
    path: `${useReverseProxy ? _basepath : feconfig.feprefix}/_next/image`,
  },

  // Configure Webpack
  webpack: (config, { dev, isServer }) => {
    // Configure CSS loader (commented out)
    // config.module.rules.push({
    //   test: /\.css$/,
    //   loader: 'postcss-loader',
    //   options: {
    //     postcssOptions: {
    //       plugins: [require('tailwindcss'), require('autoprefixer')],
    //     },
    //   },
    // });

    // Set fallback for "fs" module
    config.resolve.fallback = { fs: false };

    // Configure "fs" module for server-side rendering (commented out)
    // if (isServer) {
    //   config.node = {
    //     fs: 'empty',
    //   };
    // }

    // Return modified Webpack configuration
    return config;
  },
};

// Enable bundle analysis if "ANALYZE" environment variable is set to "true"
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
console.log('next config', nextConfig);
// Export Next.js configuration with bundle analysis plugin
export default withVanillaExtract(withBundleAnalyzer(nextConfig));
