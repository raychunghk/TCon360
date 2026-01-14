import { style } from '@vanilla-extract/css';

import { palette, paletteAlpha } from '@/styles/palette';

export const link = style({
  textDecoration: 'none',
  fontSize: 'var(--mantine-font-size-md)',
  color: 'rgba(255, 255, 255, 0.88)',
  display: 'block',
});

export const button = style({
  display: 'block',
  padding: 'var(--mantine-spacing-sm)',
  borderRadius: 10,
  width: '100%',
  maxWidth: 200,
  transition: 'background-color 160ms ease, box-shadow 160ms ease, transform 160ms ease',
  selectors: {
    '&:hover': {
      backgroundColor: paletteAlpha.primaryRed15,
      boxShadow: `0 6px 16px ${paletteAlpha.black35}`,
      transform: 'translateX(2px)',
    },
    '&:focus-visible': {
      outline: `2px solid ${palette.orange}`,
      outlineOffset: 2,
    },
    '&:hover .mantine-ThemeIcon-root': {
      backgroundColor: paletteAlpha.primaryRed25,
      borderColor: palette.primaryRed,
    },
  },
});

export const childItem = style({
  marginLeft: 20,
});
