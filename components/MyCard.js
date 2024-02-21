import { Card, Text } from '@mantine/core';
import commonstyle from '../styles/common.module.css';
import cardStyles from './MyCard.module.css';
function MyCard({ title, children, cardwidth = 500 }) {
  return (
    <Card
      miw={cardwidth}
      withBorder
      className={cardStyles.mycard}
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
        p={10}
        ta="center"
        fz={'1rem'}
      >
        <Text fw={500}>{title}</Text>
      </Card.Section>

      {children}
    </Card>
  );
}

export default MyCard;
