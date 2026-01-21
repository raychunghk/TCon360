/**
 * Design Token Definitions
 * Single source of truth for all color tokens
 * Used by palette.ts and future CSS Variables, Tailwind, CSS Modules
 */

export const colorTokens = {
  primaryRed: 'rgba(191, 26, 56, 1)',
  darkTeal: 'rgba(19, 87, 114, 1)',
  goldenYellow: 'rgba(242, 182, 4, 1)',
  orange: 'rgba(242, 159, 4, 1)',
  darkOrange: 'rgba(216, 106, 10, 1)',
  activeGold: '#dc8f16',

  // Navy Family (5 levels)
  navy: '#314c84ff',
  navyLight: '#5C72A1',
  navyLightest: '#6B92C9',
  navyDark: '#1a315dff',
  navyDarker: '#162741ff',

  // Burgundy Family (5 levels)
  burgundy: '#7A2631',
  burgundyLight: '#A64450',
  burgundyLighter: '#C65970',
  burgundyDark: '#541A22',
  burgundyDarker: '#3D1218',

  grey: '#A1A1A1',
  greyLight: '#C2C2C2',
  greyDark: '#7A7A7A',

  // Ice color family - 5 levels
  ice: {
    lightest: '#FAFBFC',
    light: '#F4F7F9',
    base: '#E8EEF2',
    darker: '#D6E0E9',
    darkest: '#C0CDD6',
  },

  // Pearl color family - 7 levels
  pearl: {
    lightest: '#FFFFFF',
    lighter: '#FCFDFE',
    light: '#FAFBFC',
    base: '#F8FAFC',
    dark: '#E9ECF0',
    darker: '#DAE0E5',
    darkest: '#CBD3DA',
  },

  cream: '#EFE6D5',
  creamLight: '#F7F2E9',
  creamDark: '#D1C1A2',

  amber: '#75633F',
  amberLight: '#99845B',
  amberDark: '#52452C',

  slate: '#6C7280',
  white: '#FFFFFF',
  roseLight: '#FDEFF0',

  spruce: '#267A6F',
  spruceLight: '#44A69A',
  spruceDark: '#1A544C',
} as const;

export const alphaTokens = {
  primaryRed10: 'rgba(191, 26, 56, 0.10)',
  primaryRed15: 'rgba(191, 26, 56, 0.15)',
  primaryRed25: 'rgba(191, 26, 56, 0.25)',
  darkTeal20: 'rgba(19, 87, 114, 0.20)',
  darkTeal35: 'rgba(19, 87, 114, 0.35)',
  darkTeal55: 'rgba(19, 87, 114, 0.55)',

  navyLight20: 'rgba(92, 114, 161, 0.20)',
  navyLight35: 'rgba(92, 114, 161, 0.35)',
  navyLight55: 'rgba(92, 114, 161, 0.55)',

  burgundy10: 'rgba(122, 38, 49, 0.10)',
  burgundy15: 'rgba(122, 38, 49, 0.15)',
  burgundy25: 'rgba(122, 38, 49, 0.25)',

  spruce20: 'rgba(38, 122, 111, 0.20)',
  spruce35: 'rgba(38, 122, 111, 0.35)',

  ice10: 'rgba(225, 233, 235, 0.10)',
  ice18: 'rgba(225, 233, 235, 0.18)',

  white06: 'rgba(255, 255, 255, 0.06)',
  white10: 'rgba(255, 255, 255, 0.10)',
  white14: 'rgba(255, 255, 255, 0.14)',
  white18: 'rgba(255, 255, 255, 0.18)',
  black35: 'rgba(0, 0, 0, 0.35)',
  black45: 'rgba(0, 0, 0, 0.45)',
} as const;
