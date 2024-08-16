// import { createStyles } from '@mantine/core';

import { style } from '@vanilla-extract/css';

// export default createStyles((theme) => ({
//   title: {
//     color: theme.colorScheme === 'dark' ? theme.white : theme.black,
//     fontSize: 18,

//     letterSpacing: 0,

//     [theme.fn.smallerThan('md')]: {
//       fontSize: 12,
//     },
//   },
//   buttonStyles: {
//     display: 'flex',
//     alignItems: 'center',
//     backgroundColor: '#F0F4F8', // Light grey-blue background
//     border: 'none',
//     cursor: 'pointer',
//     transition: 'background-color 0.2s ease, color 0.2s ease',

//     '&:hover': {
//       backgroundColor: '#C0C7D1', // Deeper background color on hover
//     },
//   },
// }));

export const title = style({
  color: 'black',
  fontSize: '22px !important',
  letterSpacing: 0,
  alignItems: 'center',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: 12,
    },
  },
});
export const header = style({
  display: 'flex',
  alignItems: 'center',
});
export const footerStyles = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});
export const buttonStyles = style({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#F0F4F8',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease, color 0.2s ease',

  ':hover': {
    backgroundColor: '#C0C7D1',
    color: '--mantine-color-grey-0',
  },
});
export const headerButtonsStyle = style({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#F0F4F8',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease, color 0.2s ease',

  ':hover': {
    backgroundColor: '#C0C7D1',
    color: '--mantine-color-grey-0',
  },
});
