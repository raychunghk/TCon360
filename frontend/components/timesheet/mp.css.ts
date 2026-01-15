import { palette } from '@/styles/palette';
import { style } from '@vanilla-extract/css';

export const monthButton = style({
  width: 50,

  selectors: {
    '&[data-selected]': {
      backgroundColor: `${palette.primaryRed} !important`,
      color: 'var(--mantine-color-white) !important',
    },
  },
});