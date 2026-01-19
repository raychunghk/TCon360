# Bundler Setup: Turbopack vs Webpack

## Current Configuration

This project supports **both Turbopack (fast dev) and Webpack (stable fallback)** on Next.js 16.1.3.

### Why Both?
- **Turbopack**: significantly faster dev startup + HMR
- **Webpack**: proven stable + matches production behavior
- **vanilla-extract issue**: vanilla-extract doesn’t natively support Turbopack yet
- **Workaround**: a custom loader bridges the gap (see `lib/vanilla-extract-turbopack-plugin.ts`)

Reference:
- Turbopack status: https://areweturboyet.com/
- vanilla-extract issue: https://github.com/vanilla-extract-css/vanilla-extract/issues/1367

---

## Quick Start

> Use `pnpm` in this repo (workspace), but the scripts are the same for `npm`.

### Run with Turbopack (fast)
```bash
pnpm run dev:turbo
# or
pnpm run dev -- --turbo
```

### Run with Webpack (stable fallback)
```bash
pnpm run dev:webpack
# or
pnpm run dev -- --no-turbo
```

### Default dev (this repo: Turbopack)
```bash
pnpm run dev
```

---

## How It Works

### Architecture

```
┌──────────────────────────────────────────┐
│ vanilla-extract-turbopack-plugin.ts      │
└──────────────┬───────────────────────────┘
               │
        ┌──────┴───────┐
        │              │
     Webpack        Turbopack
   (fallback)       (dev)
        │              │
  @vanilla-extract     │
   /next-plugin        │
        │              │
        └──────┬───────┘
               │
     turbopack-loader.js
   (source: turbopack-loader.ts)
```

### Turbopack (development)
1. Next/Turbopack matches `*.css.ts`
2. Turbopack runs `lib/turbopack-loader.js`
3. The loader calls `@vanilla-extract/integration.transform()`
4. The transformed JS is returned to the bundler
5. vanilla-extract exports remain type-safe

### Webpack (fallback + production-like)
1. Next/Webpack uses the official `@vanilla-extract/next-plugin`
2. CSS is extracted/bundled as usual

---

## Switching Bundlers

### Temporary (single run)
```bash
pnpm run dev:turbo
pnpm run dev:webpack
```

### Permanent
Prefer switching via scripts/flags.

If you *must* force Webpack in configuration (not recommended unless debugging), disable Turbopack and run Webpack dev:
```bash
pnpm run dev:webpack
```

---

## Troubleshooting

### Turbopack not recognizing `.css.ts`
Fallback to Webpack:
```bash
pnpm run dev:webpack
```

### CSS not compiling
Check:
1. `lib/turbopack-loader.ts` exists (source)
2. `lib/turbopack-loader.js` exists (runtime loader)
3. `lib/vanilla-extract-turbopack-plugin.ts` is applied in `next.config.ts`

### Hot reload not working
Restart the dev server and/or swap bundlers:
```bash
pnpm run dev:turbo
# or
pnpm run dev:webpack
```

---

## When to Use Each

### Use Turbopack (`dev:turbo`) when
- you want faster dev startup/HMR
- you’re OK with beta bundler behavior

### Use Webpack (`dev:webpack`) when
- Turbopack hits a bundler edge-case
- you need “production-like” behavior locally

---

## Related Files

- `lib/vanilla-extract-turbopack-plugin.ts` — main plugin (Webpack + Turbopack)
- `lib/turbopack-loader.ts` — loader source (TypeScript)
- `lib/turbopack-loader.js` — loader runtime (JavaScript)
- `next.config.ts` — Next config applying the plugin
- `package.json` — scripts (`dev:turbo`, `dev:webpack`)
