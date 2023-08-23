import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 18,

    letterSpacing: 0,

    [theme.fn.smallerThan('md')]: {
      fontSize: 12,
    },
  },
  buttonStyles: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F0F4F8', // Light grey-blue background
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, color 0.2s ease',

    '&:hover': {
      backgroundColor: '#C0C7D1', // Deeper background color on hover
    },
  },
}));
