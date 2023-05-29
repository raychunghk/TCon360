const _basepath = `/absproxy/5000`
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  basePath: _basepath,
  assetPrefix: _basepath,
  exportPathMap: function () {
    return {
      '/': { page: '/' }
    }
  },
  reactStrictMode: false,
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/images/:path*',
        destination: `${_basepath}/images/:path*`, // The :path parameter isn't used here so will be automatically passed in the query
      },
    ]
  },
  images: {
    path: `${_basepath}/_next/image`,
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
}

module.exports = withBundleAnalyzer(
  nextConfig
);
/*
module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
});*/
