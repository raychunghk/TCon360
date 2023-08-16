import { parseCookies, setCookie } from 'nookies';
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
  LoadingOverlay,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useDisclosure } from '@mantine/hooks';
import bg from 'public/images/loginbg1.webp';
import { useState } from 'react';
import { siteTitle } from 'components/util/label';
import { handleLoginSuccess } from './handleLoginSuccess';
const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundSize: 'cover',
    backgroundImage: `url('${bg.src}')`,
    height: '100vh',
  },
  form: {
    borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
    maxWidth: 450,
    paddingTop: 80,
    height: '100vh',
    marginLeft: 'auto', // set marginLeft to auto to align the Paper component to the right
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
    marginRight: '150px',
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export default function LoginPage(props) {
  const { classes } = useStyles();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [loginStatus, setLoginStatus] = useState(null); // add login status state variable
  const [visible, { toggle, open, close }] = useDisclosure(false);
  const handleLogin = async (event) => {
    event.preventDefault();
    open();
    const response = await fetch('/absproxy/5000/api/user/login', {
      // the URL of your Nest.js API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }), // send the identifier (username or email) and password in the request body
    });

    if (response.ok) {
      await handleLoginSuccess(response, router);
    } else {
      close();
      setLoginStatus('Login failed.'); // set the login status to a failure message
    }
  };

  const handleSignupClick = () => {
    router.push('/signup');
  };

  return (
    <Container fluid className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>

        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={50}
        >
          {siteTitle}
        </Title>
        {loginStatus && (
          <Text color="red" fw={700} fz="md" align="center">
            {loginStatus}
          </Text>
        )}{' '}
        {/* show the login status message if present */}
        <form onSubmit={handleLogin}>
          <LoadingOverlay
            visible={visible}
            overlayBlur={2}
            transitionDuration={500}
          />
          <TextInput
            label="Email address or username"
            placeholder="hello@gmail.com"
            size="md"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
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
          <Button type="submit" fullWidth mt="xl" size="md"  >
            Login
          </Button>
        </form>
        <Text align="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor<'a'> href="#" weight={700} onClick={handleSignupClick}>
            Sign Up
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}
LoginPage.getInitialProps = async (ctx) => {
  return {
    title: `Login ${siteTitle}`,
  };
};
