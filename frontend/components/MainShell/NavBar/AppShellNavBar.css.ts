import { style } from '@vanilla-extract/css';

import { palette, paletteAlpha } from '@/styles/palette';

export const navbar = style({
  background: `linear-gradient(180deg, ${palette.navyDarker} 0%, ${palette.navyDark} 100%)`,
  color: 'rgba(255, 255, 255, 0.92)',
  borderRight: `1px solid ${paletteAlpha.navyLight55}`,
  boxShadow: '2px 0 18px rgba(0, 0, 0, 0.25)',
  zIndex: 100,
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
  zIndex: 100,
});

export const navLink = style({
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  color: palette.slate,
  ':hover': {
    color: palette.white,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
});

export const navLinkActive = style({
  backgroundColor: palette.navy,
  color: palette.white,
  fontWeight: 600,
  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
});
