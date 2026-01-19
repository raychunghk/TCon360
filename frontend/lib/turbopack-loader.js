/**
 * NOTE: This file is intentionally JavaScript.
 * Turbopack loads loaders directly from disk and (today) expects JS.
 *
 * Source-of-truth is `turbopack-loader.ts`.
 */

async function turbopackLoader(source, inputSourceMap) {
  // Parse source map if provided
  let map = inputSourceMap;
  if (typeof map === 'string') {
    try {
      map = JSON.parse(map);
    } catch {
      // leave original if parse fails
    }
  }

  const callback = this.async();

  try {
    const opts = this.getOptions ? this.getOptions() : {};

    const integrationModule = await import('@vanilla-extract/integration');
    const integration = integrationModule.default ?? integrationModule;

    const { getPackageInfo, transform } = integration;

    const { name: packageName } = getPackageInfo(this.rootContext);

    const identOption =
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
    callback(err);
  }
}

module.exports = turbopackLoader;
module.exports.default = turbopackLoader;
