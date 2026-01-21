/**
 * Palette Re-exports (Backward Compatible Facade)
 * 
 * This file maintains the same API as before for all consumers.
 * Internal implementation now delegates to tokens/index.ts.
 * 
 * Consumers: .css.ts files (MonthPickerGlobalStyles, CreateTimeSheet.css.ts, etc.)
 * Import path stays the same: import { palette, paletteAlpha } from '@/styles/palette'
 */

import { colorTokens, alphaTokens } from './tokens';

/**
 * Re-export colorTokens as palette
 * Type and shape identical to previous definition
 */
export const palette = colorTokens;

/**
 * Re-export alphaTokens as paletteAlpha
 * Type and shape identical to previous definition
 */
export const paletteAlpha = alphaTokens;
