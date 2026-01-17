'use client'
import { Card, Text } from '@mantine/core';
import commonstyle from '../styles/common.module.css';

function MyCard({ title, children, cardwidth = 500, className }) {
  return (
    <Card
      miw={cardwidth}
      withBorder
      className={`${commonstyle.mycard} ${className || ''}`}
      // style={{
      //   backgroundColor:
      //     theme.colorScheme === 'dark'
      //       ? theme.colors.dark[6]
      //       : theme.colors.gray[0],
      //   borderRadius: theme.radius.md,
      //   '&:hover': {
      //     backgroundColor:
      //       theme.colorScheme === 'dark'
      //         ? theme.colors.dark[5]
      //         : theme.colors.gray[1],
      //   },
      // }}
    >
      <Card.Section
        className={commonstyle.mySection}
        mah={60}
        p={8}
        ta="center"
      >
        <Text fw={600} fz={'1.1rem'} c="white">
          {title}
        </Text>
      </Card.Section>

      {children}
    </Card>
  );
}

export default MyCard;
