'use client';
import { SignIn } from '@/app/lib/auth-action';
import useStore from '@/components/stores/zstore';
import { default as useRouter } from '@/components/useCustRouter';
import { siteTitle } from '@/components/util/label';
import * as classes from '@/styles/login.css';
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import '@mantine/core/styles.css';
import { useDisclosure } from '@mantine/hooks';
//import { config } from '@tcon360/config';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { parseCookies, setCookie } from 'nookies';
import { useRef, useState } from 'react';

export default function LoginBody(props: any) {
  const router = useRouter();
  const passwordInputRef = useRef<HTMLInputElement>(null); // Specify HTMLInputElement type
  const { setAuthtoken, basepath } = useStore();

  // Sync basepath with config.feprefix on mount

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      if (passwordInputRef.current) {
        passwordInputRef.current.focus(); // Safe with null check
      }
    }
  };

  const [password, setPassword] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [visible, { toggle, open, close }] = useDisclosure(false);

  async function handleLoginSuccess(response: Response, router: AppRouterInstance | string[]) {
    try {
      const data = await response.json();
      const token = data.accessToken;
      setAuthtoken(token);
      const _maxAge = data.tokenMaxAge;

      if (_maxAge) {
        await setCookie(null, 'token', token, {
          maxAge: parseInt(_maxAge),
          path: '/',
        });
      } else {
        console.error('TOKEN_MAX_AGE is not defined');
      }

      const cookies = parseCookies();
      const tokenCookie = cookies.token;
      console.log('token cookie', tokenCookie);
      console.log('Token max age:', cookies.maxAge);

      const signInResult = await SignIn(tokenCookie);
      if (signInResult.error) {
        console.error('Error during sign in:', signInResult.error);
      }
      router.push('/');
    } catch (error) {
      console.error('Error in handleLoginSuccess:', error);
    }
  }

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`basepath:${basepath}`);
    open();
    const loginURL = `${basepath}/api/user/login`;
    console.log('login url?', loginURL);

    const response = await fetch(loginURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    });

    if (response.ok) {
      await handleLoginSuccess(response, router);
    } else {
      close();
      setLoginStatus('Login failed.');
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
        )}
        <form onSubmit={handleLogin}>
          <LoadingOverlay
            visible={visible}
            overlayProps={{ blur: 2 }}
            transitionProps={{ duration: 500 }}
          />
          <TextInput
            label="Email address or username"
            placeholder="hello@gmail.com"
            size="md"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            ref={passwordInputRef}
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
          Don't have an account?{' '}
          <Anchor<'a'> href="#" fw={700} onClick={handleSignupClick}>
            Sign Up
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}

LoginBody.getInitialProps = async (ctx: any) => {
  return {
    title: `Login ${siteTitle}`,
  };
};