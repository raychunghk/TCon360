# Turbopack + vanilla-extract Workaround

## Problem

vanilla-extract is a build-time CSS-in-TS solution that:
- compiles `.css.ts` files
- generates type-safe class/variable exports
- produces CSS output during bundling

Turbopack currently doesn’t natively support vanilla-extract’s compilation model, which can result in errors like:

```
Error: Styles were unable to be assigned to a file
```

## Solution

We apply an **official Webpack plugin** for Webpack builds and a **custom loader** for Turbopack dev.

### Webpack (fallback / production-like)
```
.css.ts → @vanilla-extract/next-plugin → compiled output
```

### Turbopack (dev)
```
.css.ts → lib/turbopack-loader.js → @vanilla-extract/integration.transform() → compiled output
```

## Implementation

### `lib/vanilla-extract-turbopack-plugin.ts`

- wraps the Next.js config with the official vanilla-extract Webpack plugin
- adds a Turbopack rule for `*.css.ts`

Key idea:
```ts
(tp.rules['*.css.ts'] = {
  as: '*.ts',
  loaders: [{ loader: '.../lib/turbopack-loader.js' }],
});
```

### `lib/turbopack-loader.ts` / `lib/turbopack-loader.js`

The loader calls `@vanilla-extract/integration` directly:

```ts
const result = await transform({
  source,
  filePath,
  rootPath,
  packageName,
  identOption,
});
```

Notes:
- **`turbopack-loader.ts`** is the TypeScript source (type-checked)
- **`turbopack-loader.js`** is the runtime loader file Turbopack loads from disk

## Status & Timeline

This is a **temporary workaround** until Turbopack gains native vanilla-extract support.

Tracking issue:
- https://github.com/vanilla-extract-css/vanilla-extract/issues/1367

Turbopack readiness tracking:
- https://areweturboyet.com/

## Safety

- ✅ Intended for development
- ⚠️ Experimental
- Use Webpack (`pnpm run dev:webpack`) if you hit any bundler edge cases
