import { style } from '@vanilla-extract/css';

import { palette, paletteAlpha } from '@/styles/palette';
import { SIDEBAR_COMPONENT_WIDTH } from '@/styles/constants';

export const navbar = style({
  background: `linear-gradient(180deg, ${palette.navyDarker} 0%, ${palette.navyDark} 100%)`,
  color: 'rgba(255, 255, 255, 0.92)',
  borderRight: `1px solid ${paletteAlpha.navyLight55}`,
  boxShadow: '2px 0 18px rgba(0, 0, 0, 0.25)',
  zIndex: 100, // Navbar below header/footer
});

export const divider = style({
  borderColor: 'rgba(184, 201, 205, 0.55)',
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
  padding: 10,
  boxShadow: `0 10px 28px ${paletteAlpha.black35}`,
  zIndex: 100, // Same as navbar
  width: SIDEBAR_COMPONENT_WIDTH, // Align with CreateTimeSheet card width
  alignSelf: 'center', // Center the wrapper in the navbar
});
