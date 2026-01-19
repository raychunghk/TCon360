# Quick Bundler Reference

## Choose Your Dev Bundler

### Turbopack (fast)
```bash
pnpm run dev:turbo
```
- Faster startup/HMR
- Uses a vanilla-extract workaround loader

### Webpack (stable fallback)
```bash
pnpm run dev:webpack
```
- More stable/production-like
- Uses the official `@vanilla-extract/next-plugin`

## Defaults

```bash
pnpm run dev          # Default (Turbopack)
pnpm run dev:turbo    # Explicit Turbopack
pnpm run dev:webpack  # Webpack fallback
```

If anything breaks, try swapping bundlers.

For details: `docs/BUNDLER_SETUP.md`.
