import { Card, Grid, Text } from '@mantine/core';
import commonstyle from '../styles/common.module.css';
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
        className={commonstyle.tsSection}
        mah={55}
        p={8}
        ta="center"
        sx={{ padding: '8px', fontSize: '1rem' }}
      >
        <Text fw={500}>{title}</Text>
      </Card.Section>

      <Grid style={{ fontSize: '0.9rem' }} mt={10}>
        {cols.map(({ label, value, span, valspan }, id) => (
          <>
            <Grid.Col span={span} key={label}>
              <strong>{label}</strong>
            </Grid.Col>
            <Grid.Col span={valspan}>{value}</Grid.Col>
          </>
        ))}
      </Grid>
    </Card>
  );
};

export default SignupCard;
