import { style } from '@vanilla-extract/css';

import { palette, paletteAlpha } from '@/styles/palette';

export const popoverDropdown = style({
  background: `linear-gradient(180deg, ${palette.navyDark} 0%, ${palette.navy} 55%, ${palette.burgundyDark} 100%)`,
  borderRadius: 10,
  color: 'white',
  boxShadow: `0 12px 40px ${paletteAlpha.black45}`,
  padding: 16,
  border: '1px solid rgba(184, 201, 205, 0.35)',
});

export const popoverButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  color: 'white',
  backgroundColor: `${palette.burgundy} !important`,
  fontWeight: 600,
  borderRadius: 8,
  padding: '8px 14px',
  border: `1px solid ${palette.burgundyDark}`,
  transition: 'all 160ms ease',
  ':hover': {
    backgroundColor: `${palette.burgundyLight} !important`,
    borderColor: palette.burgundyLight,
    boxShadow: `0 0 0 3px ${paletteAlpha.burgundy25}`,
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
