import bundleAnalyzer from '@next/bundle-analyzer';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
const withVanillaExtract = createVanillaExtractPlugin();
import dotenv from 'dotenv';
import baseconf from '../baseconfig.js';
// Import base configuration
const { baseconfig } = baseconf;
// Load environment variables from .env file
dotenv.config();
const _basepath = baseconfig.prefix;
//for testing with frontend stand alone
//const _basepath = 'absproxy/2000';
console.log('next config _basepath?', _basepath);
const _assetPrefix = `${baseconfig.proxypath}/${baseconfig.frontendport}`;
console.log('next config  asset prefix?', _assetPrefix);
// Define Next.js configuration object
const nextConfig = {
  // Set the base path for the application (commented out)
  //basePath: _basepath,

  // Set the asset prefix for the application (used behind a proxy)
  assetPrefix: _basepath,
  //assetPrefix: _assetPrefix,

  // Disable React's strict mode
  reactStrictMode: false,

  // Configure ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Enable experimental package import optimization
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:*', '127.0.0.1:*', '*.raygor.cc', '*.raygor.cc:*'],
    },
  },
  // Define environment variables
  env: {
    TOKEN_MAX_AGE: process.env.TOKEN_MAX_AGE,
    basepath: _basepath,
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
    ];
  },

  // Configure image loader
  images: {
    path: `${_basepath}/_next/image`,
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

// Export Next.js configuration with bundle analysis plugin
//export default withBundleAnalyzer(nextConfig);
export default withVanillaExtract(withBundleAnalyzer(nextConfig));
