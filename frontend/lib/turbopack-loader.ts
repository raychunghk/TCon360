import {
  getPackageInfo,
  transform,
  type IdentifierOption,
} from '@vanilla-extract/integration';
import type { LoaderContext } from 'webpack';

type TurbopackLoaderOptions = {
  /** How to render class and variable identifiers */
  identifiers?: IdentifierOption;
};

/**
 * A Turbopack-compatible loader for vanilla-extract CSS.
 *
 * Transforms .css.ts files into compiled CSS and TypeScript modules.
 * Used by Turbopack in development, Webpack uses the official plugin.
 */
export default async function turbopackLoader(
  this: LoaderContext<TurbopackLoaderOptions>,
  source: string,
  inputSourceMap: string,
) {
  // Parse source map if provided
  let map: any = inputSourceMap;
  if (typeof map === 'string') {
    try {
      map = JSON.parse(map);
    } catch {
      // leave original if parse fails
    }
  }

  const callback = this.async();
  try {
    const opts = this.getOptions();

    const { name: packageName } = getPackageInfo(this.rootContext);

    const identOption: IdentifierOption =
      opts.identifiers ?? (this.mode === 'production' ? 'short' : 'debug');

    const result = await transform({
      source,
      filePath: this.resourcePath,
      rootPath: this.rootContext,
      packageName,
      identOption,
    });

    callback(null, result, map);
  } catch (err) {
    callback(err as Error);
  }
}
