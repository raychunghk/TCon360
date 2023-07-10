import { Card, Grid, Text } from '@mantine/core';
import UserStyle from '../styles/User.module.css';
const SignupCard = ({ title, cols }) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
  
      mt={20}
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
        className={UserStyle.tsSection}
        mah={55}
        p={8}
        ta="center"
        sx={{ padding: '8px', fontSize: '1rem' }}
      >
        <Text weight={500}>{title}</Text>
      </Card.Section>

      <Grid style={{ fontSize: '0.9rem' }} mt={10}>
        {cols}
      </Grid>
    </Card>
  );
};

export default SignupCard;
