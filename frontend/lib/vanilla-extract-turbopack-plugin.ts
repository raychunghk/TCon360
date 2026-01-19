import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';
import path from 'node:path';

/**
 * A Next.js plugin that adds Webpack & Turbopack support for vanilla-extract.
 *
 * - Uses official vanilla-extract plugin for Webpack builds
 * - Uses custom turbopack-loader for Turbopack (dev with --turbo flag)
 *
 * Status: Workaround until Turbopack has native vanilla-extract support
 * See: https://github.com/vanilla-extract-css/vanilla-extract/issues/1367
 */
export function createVanillaExtractTurbopackPlugin(options: Record<string, unknown> = {}) {
  return (existingConfig: NextConfig): NextConfig => {
    // 1. Base Next.js (webpack) + vanilla-extract config
    const webpackPlugin = createVanillaExtractPlugin(options as any);

    // Apply the webpack plugin first to ensure compatibility with existing config
    const nextConfig = webpackPlugin(existingConfig);

    // 2. Add Turbopack rule for vanilla-extract using our custom loader
    const tp = (((nextConfig as any).turbopack ??= {}) as Record<string, any>);
    tp.rules ??= {};

    const glob = '*.css.ts';
    tp.rules[glob] = {
      // Tell Turbopack to treat all .css.ts files as .ts
      as: '*.ts',
      // ...and run them through our vanilla-extract loader
      loaders: [
        {
          // Loader must be JavaScript (Turbopack loads it directly)
          loader: path.resolve(process.cwd(), 'lib', 'turbopack-loader.js'),
          options,
        },
      ],
    };

    return nextConfig;
  };
}
