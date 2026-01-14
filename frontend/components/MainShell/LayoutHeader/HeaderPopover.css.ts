import { style } from '@vanilla-extract/css';

import { palette, paletteAlpha } from '@/styles/palette';

export const popoverDropdown = style({
  background:
    'linear-gradient(180deg, rgba(7, 18, 24, 1) 0%, rgba(5, 14, 18, 1) 100%)',
  borderRadius: 10,
  color: 'white',
  boxShadow: `0 12px 40px ${paletteAlpha.black45}`,
  padding: 16,
  border: `1px solid ${paletteAlpha.darkTeal35}`,
});

export const popoverButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  color: 'white',
  backgroundColor: palette.darkTeal,
  fontWeight: 600,
  borderRadius: 8,
  padding: '8px 14px',
  border: `1px solid ${paletteAlpha.darkTeal55}`,
  transition: 'all 160ms ease',
  ':hover': {
    backgroundColor: palette.primaryRed,
    borderColor: palette.primaryRed,
    boxShadow: `0 0 0 3px ${paletteAlpha.primaryRed25}`,
  },
  ':active': {
    transform: 'translateY(1px)',
  },
});

export const userIcon = style({
  marginRight: '0.5rem',
});

export const closeButton = style({
  position: 'absolute',
  top: 5,
  right: 5,
  zIndex: 1,
});
