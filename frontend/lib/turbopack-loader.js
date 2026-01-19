const { getPackageInfo, transform } = require("@vanilla-extract/integration");

/**
 * A Turbopack-compatible loader for vanilla-extract CSS.
 *
 * Transforms .css.ts files into compiled CSS and TypeScript modules.
 * Used by Turbopack in development, Webpack uses the official plugin.
 *
 * Note: This file is .js (not .ts) because Turbopack loads it directly
 * without TypeScript compilation at runtime.
 */
module.exports = async function turbopackLoader(source, inputSourceMap) {
  // Parse source map if provided
  let map = inputSourceMap;
  if (typeof map === "string") {
    try {
      map = JSON.parse(map);
    } catch {
      // leave original if parse fails
    }
  }

  const callback = this.async();
  try {
    const opts = this.getOptions() || {};

    const { name: packageName } = getPackageInfo(this.rootContext);

    const identOption =
      opts.identifiers ?? (this.mode === "production" ? "short" : "debug");

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
};
