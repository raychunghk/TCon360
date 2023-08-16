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
}));
