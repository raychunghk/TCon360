import { style } from '@vanilla-extract/css';

import { palette, paletteAlpha } from '@/styles/palette';

export const navbar = style({
  background: `linear-gradient(180deg, ${palette.navyDark} 0%, ${palette.navy} 100%)`,
  color: 'rgba(255, 255, 255, 0.92)',
  borderRight: `1px solid ${paletteAlpha.navyLight55}`,
  boxShadow: '2px 0 18px rgba(0, 0, 0, 0.25)',
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
});
