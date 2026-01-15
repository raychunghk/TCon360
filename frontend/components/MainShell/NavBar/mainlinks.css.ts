import { palette, paletteAlpha } from '@/styles/palette';
import { style } from '@vanilla-extract/css';

// Parent button/link container
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
  },
});

// Style for the ThemeIcon wrapper or the icon itself
export const themeIcon = style({
  // Your normal icon styles here...
  transition: 'background-color 160ms ease, border-color 160ms ease',

  selectors: {
    [`${button}:hover &`]: {
      backgroundColor: paletteAlpha.primaryRed25,
      borderColor: palette.primaryRed,
    },
  },
});

export const link = style({
  textDecoration: 'none',
  fontSize: 'var(--mantine-font-size-md)',
  color: 'rgba(255, 255, 255, 0.88)',
  display: 'block',
});

export const childItem = style({
  marginLeft: 20,
});