// theme.ts
import { createTheme } from '@mantine/core';
import { themeToVars } from '@mantine/vanilla-extract';

// Do not forget to pass theme to MantineProvider
export const mytheme = createTheme({
  fontFamily: 'serif',
  primaryColor: 'cyan',
});
export const vars = themeToVars(mytheme);
