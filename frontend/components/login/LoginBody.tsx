/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { SignIn } from '@/app/lib/auth-action';
import { bauthClient } from '@/app/lib/bauthclient';

import useStore from '@/components/stores/zstore.ts';
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
//import { signIn } from 'better-auth/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { parseCookies, setCookie } from 'nookies';
import { useRef, useState } from 'react';
function decodeJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Failed to decode JWT:', e);
    return null;
  }
}

export default function LoginBody(props: any) {
  const router = useRouter();
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const { setAuthtoken, basepath, setIsUnauthorized, setStatus, setIsAuthenticated, fetchStaffData } = useStore();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      if (passwordInputRef.current) {
        passwordInputRef.current.focus();
      }
    }
  };
  const [password, setPassword] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [visible, { open, close }] = useDisclosure(false);

  let clientLoginInitiatedTime: number | null = null;

  async function handleLoginSuccess(response: Response, router: AppRouterInstance) {
    try {
      const data = await response.json();
      const token = data.accessToken;
      setAuthtoken(token);
      setStatus('authenticated');
      setIsAuthenticated(true);
      setIsUnauthorized(false);
      const _maxAge = data.tokenMaxAge;
      if (_maxAge) {
        await setCookie(null, 'token', token, {
          maxAge: parseInt(_maxAge),
          path: '/',
        });
      } else {
        console.error('TOKEN_MAX_AGE is not defined by the server.');
      }

      // Fetch staff data to populate activeUser
      await fetchStaffData();

      const decodedToken = decodeJwt(token);
      if (decodedToken) {
        if (typeof decodedToken.exp === 'number') {
          const expiryTimestampSeconds = decodedToken.exp;
          const expiryDate = new Date(expiryTimestampSeconds * 1000);
          const now = new Date();
          const timeRemainingMs = expiryDate.getTime() - now.getTime();

          if (timeRemainingMs > 0) {
            const minutes = Math.floor(timeRemainingMs / (1000 * 60));
            const seconds = Math.floor((timeRemainingMs % (1000 * 60)) / 1000);
            console.log(
              `[Token Expiry] Token expires in: ${minutes} minutes and ${seconds} seconds. ` +
              `Expiry Date/Time (Client Local): ${expiryDate.toLocaleString()}`
            );
          } else {
            console.log('[Token Expiry] Token has already expired.');
          }
        } else {
          console.warn('[Token Expiry] Could not determine token expiry from JWT (exp claim missing or invalid).');
        }

        if (typeof decodedToken.iat === 'number' && clientLoginInitiatedTime !== null) {
          const iatTimestampSeconds = decodedToken.iat;
          const iatDate = new Date(iatTimestampSeconds * 1000);
          const clientInitiatedDate = new Date(clientLoginInitiatedTime);
          const timeDifferenceMs = iatDate.getTime() - clientLoginInitiatedTime;

          console.log(
            `[Time Sync Check] Client Login Initiated: ${clientInitiatedDate.toLocaleString()} (ms: ${clientLoginInitiatedTime})\n` +
            `[Time Sync Check] Token Issued At (iat): ${iatDate.toLocaleString()} (ms: ${iatTimestampSeconds * 1000})\n` +
            `[Time Sync Check] Difference (iat - client_initiated): ${timeDifferenceMs} ms`
          );

          if (Math.abs(timeDifferenceMs) > 5000) {
            console.warn('[Time Sync Check] Significant time difference detected between client initiation and token iat!');
          } else {
            console.log('[Time Sync Check] Time difference is within acceptable limits.');
          }
        } else {
          console.warn('[Time Sync Check] Could not perform iat time sync check (iat claim missing or client timestamp not captured).');
        }
      } else {
        console.error('Failed to decode token for time checks.');
      }

      const cookies = parseCookies();
      const tokenCookie = cookies.token;
      const signInResult = await SignIn(tokenCookie);
      if (signInResult.error) {
        console.error('Error during sign in:', signInResult.error);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Error in handleLoginSuccess:', error);
    }
  }


  const handleLoginx = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Correct way to call signIn for the emailAndPassword provider
      //bauthClient.signIn.email

      //bauthClient.signIn.external({ username: 'a', password: 'b' });
      bauthClient.signInCredentials({ username: 'a', password: 'b' });

    } catch (error) {
      console.error('An unexpected error occurred during login:', error);
    }
  };
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    open();

    clientLoginInitiatedTime = Date.now();
    console.log(`[Client] Login process initiated at: ${new Date(clientLoginInitiatedTime).toLocaleString()} (Unix ms: ${clientLoginInitiatedTime})`);

    const loginURL = `${basepath}/api/user/login`;

    try {
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
        const errorData = await response.json();
        setLoginStatus(errorData.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Network or unexpected error during login:', error);
      setLoginStatus('An unexpected error occurred. Please try again.');
    } finally {
      close();
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