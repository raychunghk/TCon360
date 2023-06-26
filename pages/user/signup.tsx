import { useState } from "react";
import { useRouter } from "next/router";
import { useSession,SessionProvider  } from 'next-auth/react';
import {
  Paper,
  createStyles,
  TextInput,
  Container,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import bg from "public/images/loginbg1.webp";

import Head from "next/head";
import { basepath} from '/global';


const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundSize: "cover",
    backgroundImage: `url('${bg.src}')`,
    height: "100vh",
  },
  form: {
    borderRight: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
    maxWidth: 450,
    paddingTop: 80,
    height: "100vh",
    marginLeft: "auto",
    marginRight: "150px",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
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

export default function SignupPage( ) {
  const router = useRouter();
  const { classes } = useStyles();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [session, loading] = useSession();
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const mainpage = '/'
  async function handleSubmit(event) {
    event.preventDefault();
    const user = {
      email: email,
      username: username,
      password: password,
    };
    const response = await fetch(`${basepath}/api/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      router.push(mainpage);
    } else {
      console.error('Error signing up:', response.statusText);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (session) {
    router.push(mainpage);
  }


  return (

    <>
      <Head>
        <Title>Signup - Create an account!</Title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Container fluid className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title
            order={2}
            className={classes.title}
            align="center"
            mt="md"
            mb={50}
          >
            Create an Account
          </Title>

          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextInput
            label="Username"
            placeholder="johndoe"
            size="md"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button fullWidth mt="xl" size="md" onClick={handleSubmit}>
            Sign Up
          </Button>

          <Text align="center" mt="md">
            Already have an account?{" "}
            <Anchor<"a">
              href={`${basepath}/login`}
              weight={700}
            >
              Login
            </Anchor>
          </Text>
        </Paper>
      </Container></>
  );
}
SignupPage.getInitialProps = async (ctx) => {
  return {
    title: 'Create an account for TS Generator',
  };
};
