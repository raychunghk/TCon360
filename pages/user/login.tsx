import {
  Paper,
  createStyles,
  TextInput, Container,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import { useRouter } from "next/router";
import bg from 'public/images/loginbg1.webp'
const useStyles = createStyles((theme) => ({
  wrapper: {

    backgroundSize: "cover",
    backgroundImage: `url('${bg.src}')`,
    height: '100vh',
  },
  form: {
    borderRight: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
    maxWidth: 450,
    paddingTop: 80,
    height: "100vh",
    marginLeft: "auto", // set marginLeft to auto to align the Paper component to the right
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
    marginRight: "150px",
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function LoginPage(props) {
  const { classes } = useStyles();
 
  const router = useRouter();

  const handleSignupClick = () => {
    router.push("/user/signup");
  };
  return (

    <Container fluid className={classes.wrapper}  >
      <Paper className={classes.form} radius={0} p={30}>
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={50}
        >
          Welcome to TS Generator!
        </Title>

        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
        />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button fullWidth mt="xl" size="md">
          Login
        </Button>

        <Text align="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor<"a">
            href="#"
            weight={700}
            onClick={handleSignupClick}
          >
            Sign Up
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}
LoginPage.getInitialProps = async (ctx) => {
  return {
    title: 'Login TS Generator',
  };
};
