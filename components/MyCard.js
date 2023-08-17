import { Card, Text } from '@mantine/core';
import UserStyle from '../styles/User.module.css';
function MyCard({ title, children, cardwidth = 500 }) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      maw={cardwidth}
      withBorder
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        borderRadius: theme.radius.md,
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[5]
              : theme.colors.gray[1],
        },
      })}
    >
      <Card.Section
        className={UserStyle.mySection}
        mah={60}
        padding={15}
        ta="center"
        sx={{ padding: '10px', fontSize: '1rem' }}
      >
        <Text weight={500}>{title}</Text>
      </Card.Section>
      {children}
    </Card>
  );
}

export default MyCard;
