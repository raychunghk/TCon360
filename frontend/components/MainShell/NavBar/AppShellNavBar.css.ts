import { style } from '@vanilla-extract/css';

import { SIDEBAR_COMPONENT_WIDTH } from '@/styles/constants';
import { palette, paletteAlpha } from '@/styles/palette';

export const navbar = style({
  background: `linear-gradient(180deg, ${palette.navyDarker} 0%, ${palette.navyDark} 100%)`,
  color: 'rgba(255, 255, 255, 0.92)',
  borderRight: `1px solid ${paletteAlpha.navyLight55}`,
  boxShadow: '2px 0 18px rgba(0, 0, 0, 0.25)',
  zIndex: 100, // Navbar below header/footer
});

export const brandingWrapper = style({
  textAlign: 'center',
  padding: '8px 0',
  borderBottom: `1px solid ${paletteAlpha.navyLight55}`,
  marginBottom: '8px',
});

export const brandingTitle = style({
  fontSize: '1.25rem',
  fontWeight: 700,
  color: 'white',
  margin: 0,
  lineHeight: 1.2,
});

export const goldAccent = style({
  color: 'rgb(205, 139, 36)',
  fontWeight: 800,
});

export const brandingSubtitle = style({
  fontSize: '0.75rem',
  color: 'rgba(255, 255, 255, 0.75)',
  marginTop: '2px',
  fontWeight: 400,
});

export const divider = style({
  borderColor: palette.amberLight,
  margin: '4px 0',
});

export const createTimesheetWrapper = style({
  display: 'flex',
  justifyContent: 'center',
});

export const linksWrapper = style({
  backgroundColor: 'rgba(240, 244, 245, 0.08)',
  border: '1px solid rgba(184, 201, 205, 0.35)',
  borderLeft: `3px solid ${palette.burgundy}`,
  borderRadius: 12,
  padding: `5px 10px`,
  boxShadow: `0 10px 28px ${paletteAlpha.black35}`,
  zIndex: 100, // Same as navbar
  width: SIDEBAR_COMPONENT_WIDTH, // Align with CreateTimeSheet card width
  alignSelf: 'center', // Center the wrapper in the navbar
});
