'use client';
import { parseCookies, setCookie } from 'nookies';
import {
  Paper,
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
import { useRouter } from 'next/navigation';
//import { signIn } from 'next-auth/react';
import { signOut } from '@/auth';
import { SignIn } from '@/lib/auth-action';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { siteTitle } from '@/components/util/label';
import useStore from '@/components/store/zstore';
import * as classes from './login.css';
import '@mantine/core/styles.css';
import { baseconfig } from '@/../baseconfig';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
async function getProviders() {
  const basepath = baseconfig.prefix;
  const loginURL = `${basepath}/api/user/login`;
  //const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/providers`);
  const res = await fetch(`${basepath}/api/auth/providers`);

  if (!res.ok) {
    throw new Error('Failed to fetch providers');
  } else {
    console.log(res.body);
  }

  return res.json();
}
export default function LoginPage(props: any) {
  const router = useRouter();
  const { setAuthtoken } = useStore();
  // const resp: ReturnType<typeof getProviders> = (await getProviders()) || {};
  const [password, setPassword] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [loginStatus, setLoginStatus] = useState(''); // add login status state variable
  const [visible, { toggle, open, close }] = useDisclosure(false);

  async function handleLoginSuccess(response: Response, router: AppRouterInstance | string[]) {
    try {
      const data = await response.json();
      const token = data.accessToken;
      setAuthtoken(token);
      //const _maxAge = process.env.TOKEN_MAX_AGE;
      const _maxAge = data.tokenMaxAge;

      console.log('_maxage in handleLoginSuccess', _maxAge);
      // set the user's session token in localStorage
      if (_maxAge) {
        await setCookie(null, 'token', token, {
          maxAge: parseInt(_maxAge), // cookie expiration time (in seconds)
          path: '/', // cookie path
        });
      } else {
        console.error('TOKEN_MAX_AGE is not defined');
      }

      const cookies = parseCookies();
      const tokenCookie = cookies.token;
      console.log('token cookie', tokenCookie);
      console.log('Token max age(process.env.TOKEN_MAX_AGE/cookies.maxAge):', cookies.maxAge);

      const signInResult = await SignIn(tokenCookie);
      if (signInResult.error) {
        console.error('Error during sign in:', signInResult.error);
      }
      router.push(`${baseconfig.prefix}/`); // redirect to the dashboard page on successful login
    } catch (error) {
      console.error('Error in handleLoginSuccess:', error);
    }
  }

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    open();
    const basepath = baseconfig.prefix;
    const loginURL = `${basepath}/api/user/login`;
    console.log('login url?', loginURL);

    const response = await fetch(loginURL, {
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
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          {siteTitle}
        </Title>
        {loginStatus && (
          <Text c="red" fw={700} fz="md" ta="center">
            {loginStatus}
          </Text>
        )}{' '}
        {/* show the login status message if present */}
        <form onSubmit={handleLogin}>
          <LoadingOverlay
            visible={visible}
            overlayProps={{
              blur: 2,
            }}
            transitionProps={{ duration: 500 }}
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
          <Button type="submit" fullWidth mt="xl" size="md">
            Login
          </Button>
        </form>
        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor<'a'> href="#" fw={700} onClick={handleSignupClick}>
            Sign Up
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}

LoginPage.getInitialProps = async (ctx: any) => {
  return {
    title: `Login ${siteTitle}`,
  };
};
