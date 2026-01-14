import { style } from '@vanilla-extract/css';

import { palette, paletteAlpha } from '@/styles/palette';

export const navbar = style({
  background:
    'linear-gradient(180deg, rgba(7, 18, 24, 1) 0%, rgba(5, 14, 18, 1) 100%)',
  color: 'rgba(255, 255, 255, 0.92)',
  borderRight: `1px solid ${paletteAlpha.darkTeal55}`,
  boxShadow: '2px 0 18px rgba(0, 0, 0, 0.25)',
});

export const divider = style({
  borderColor: paletteAlpha.white10,
});

export const createTimesheetWrapper = style({
  display: 'flex',
  justifyContent: 'center',
});

export const linksWrapper = style({
  backgroundColor: paletteAlpha.white06,
  border: `1px solid ${paletteAlpha.darkTeal35}`,
  borderLeft: `3px solid ${palette.primaryRed}`,
  borderRadius: 12,
  padding: 10,
  boxShadow: `0 10px 28px ${paletteAlpha.black35}`,
});
