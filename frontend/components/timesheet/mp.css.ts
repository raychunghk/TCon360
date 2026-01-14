import { style } from '@vanilla-extract/css';

import { palette } from '@/styles/palette';

export const monthPickerButtons = style({
  selectors: {
    '& button': {
      width: 50,
    },
    '& button[data-selected]': {
      backgroundColor: `${palette.primaryRed} !important`,
      color: 'var(--mantine-color-white) !important',
    },
  },
});
