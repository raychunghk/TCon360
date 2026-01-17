import { palette } from './palette';

export type Theme = 'modern' | 'legacy' | 'light-modern' | (string & {});

export interface ThemeColors {
  navy: {
    lightest: string;
    light: string;
    base: string;
    dark: string;
    darker: string;
  };
  burgundy: {
    lighter: string;
    light: string;
    base: string;
    dark: string;
    darker: string;
  };
  ice: {
    lightest: string;
    light: string;
    base: string;
    darker: string;
    darkest: string;
  };
  slate: string;
  white: string;
  roseLight: string;
  primaryRed: string;
  darkTeal: string;
  goldenYellow: string;
  orange: string;
  darkOrange: string;
  activeGold: string;
  grey: string;
  greyLight: string;
  greyDark: string;
  cream: string;
  creamLight: string;
  creamDark: string;
  amber: string;
  amberLight: string;
  amberDark: string;
  spruce: string;
  spruceLight: string;
  spruceDark: string;
}

export const themes: Record<Theme, ThemeColors> = {
  modern: {
    // Current refined colors - the new standard
    navy: {
      lightest: '#6B92C9',
      light: '#5C72A1',
      base: '#314c84ff',
      dark: '#1a315dff',
      darker: '#162741ff',
    },
    burgundy: {
      lighter: '#C65970',
      light: '#A64450',
      base: '#7A2631',
      dark: '#541A22',
      darker: '#3D1218',
    },
    ice: {
      lightest: '#FAFBFC',
      light: '#F4F7F9',
      base: '#E8EEF2',
      darker: '#D6E0E9',
      darkest: '#C0CDD6',
    },
    slate: '#6C7280',
    white: '#FFFFFF',
    roseLight: '#FDEFF0',
    primaryRed: 'rgba(191, 26, 56, 1)',
    darkTeal: 'rgba(19, 87, 114, 1)',
    goldenYellow: 'rgba(242, 182, 4, 1)',
    orange: 'rgba(242, 159, 4, 1)',
    darkOrange: 'rgba(216, 106, 10, 1)',
    activeGold: '#dc8f16',
    grey: '#A1A1A1',
    greyLight: '#C2C2C2',
    greyDark: '#7A7A7A',
    cream: '#EFE6D5',
    creamLight: '#F7F2E9',
    creamDark: '#D1C1A2',
    amber: '#75633F',
    amberLight: '#99845B',
    amberDark: '#52452C',
    spruce: '#267A6F',
    spruceLight: '#44A69A',
    spruceDark: '#1A544C',
  },
  legacy: {
    // Previous CreateTimeSheet colors - preserved for backward compatibility
    navy: {
      lightest: '#6B92C9',
      light: '#5C72A1',
      base: '#314c84ff',
      dark: '#1a315dff',
      darker: '#162741ff',
    },
    burgundy: {
      lighter: '#C65970',
      light: '#A64450',
      base: '#7A2631',
      dark: '#541A22',
      darker: '#3D1218',
    },
    ice: {
      lightest: '#F0F4F5', // Was ice light
      light: '#E1E9EB', // Was ice base
      base: '#C8D0D2', // interpolated
      darker: '#B8C9CD', // was ice dark
      darkest: '#A4B5B9',
    },
    slate: '#6C7280',
    white: '#FFFFFF',
    roseLight: '#FDEFF0',
    primaryRed: 'rgba(191, 26, 56, 1)',
    darkTeal: 'rgba(19, 87, 114, 1)',
    goldenYellow: 'rgba(242, 182, 4, 1)',
    orange: 'rgba(242, 159, 4, 1)',
    darkOrange: 'rgba(216, 106, 10, 1)',
    activeGold: '#dc8f16',
    grey: '#A1A1A1',
    greyLight: '#C2C2C2',
    greyDark: '#7A7A7A',
    cream: '#EFE6D5',
    creamLight: '#F7F2E9',
    creamDark: '#D1C1A2',
    amber: '#75633F',
    amberLight: '#99845B',
    amberDark: '#52452C',
    spruce: '#267A6F',
    spruceLight: '#44A69A',
    spruceDark: '#1A544C',
  },
  'light-modern': {
    // Lighter variant of modern theme
    navy: {
      lightest: '#8CA8D1',
      light: '#7088B9',
      base: '#4A6BA7',
      dark: '#3A5A8F',
      darker: '#2A4477',
    },
    burgundy: {
      lighter: '#D27787',
      light: '#B85D6E',
      base: '#9D4355',
      dark: '#82393F',
      darker: '#672F29',
    },
    ice: {
      lightest: '#FFFFFF',
      light: '#FDFEFE',
      base: '#FAFBFC',
      darker: '#F7FAFB',
      darkest: '#F4F7F9',
    },
    slate: '#8A8F9C',
    white: '#FFFFFF',
    roseLight: '#FFF8F9',
    primaryRed: 'rgba(207, 56, 76, 1)',
    darkTeal: 'rgba(49, 107, 134, 1)',
    goldenYellow: 'rgba(255, 202, 24, 1)',
    orange: 'rgba(255, 179, 24, 1)',
    darkOrange: 'rgba(229, 126, 30, 1)',
    activeGold: '#e6a528',
    grey: '#B1B1B1',
    greyLight: '#D2D2D2',
    greyDark: '#9A9A9A',
    cream: '#F7F2E9',
    creamLight: '#FFFCF3',
    creamDark: '#E9DCC5',
    amber: '#958357',
    amberLight: '#B9A775',
    amberDark: '#72693E',
    spruce: '#469A8F',
    spruceLight: '#64C0B5',
    spruceDark: '#367A6F',
  },
};

export const getTheme = (theme: Theme): ThemeColors => themes[theme] || themes.modern;
