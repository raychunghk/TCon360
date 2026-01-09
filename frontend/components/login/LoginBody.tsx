/* eslint-disable react/react-in-jsx-scope */
'use client';
import { CustomSignInResponseData } from '@/app/lib/CustomSignInResponseData';
import { SignIn } from '@/app/lib/auth-action';
import { signIn } from '@/app/lib/bauthclient';

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
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
//import { signIn } from 'better-auth/react';
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
  const {
    setBetterAuthToken,
    setAuthtoken,
    basepath,
    setIsUnauthorized,
    setStatus,
    setIsAuthenticated,
    setActiveUser,
    setActiveStaff,
    setActiveContract,
    fetchStaffData,
  } = useStore();

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


  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    open();
    try {
      // Correct way to call signIn for the emailAndPassword provider

      const response = await signIn.credentials({ email: identifier, username: identifier, password });
      console.log(`better auth login resonse:`, JSON.stringify(response));
      //await signIn.email({ email: 'a@a.com', password: 'b' });
      //start

      if (response && !response.error && response.data) {
        //console.log('Login successful, processing response:', response);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { token, extUser } = response.data as CustomSignInResponseData;

        // 1. Set token and auth status in store
        setStatus('authenticated');
        setIsAuthenticated(true);
        setIsUnauthorized(false);

        // 2. Process user data from response and set it in the store
        if (extUser) {
          const staffMember = extUser.staff && extUser.staff.length > 0 ? extUser.staff[0] : null;
          const _activeContract = staffMember?.contracts?.find((c: any) => c.IsActive) || null;

          setActiveUser(extUser);
          setActiveStaff(staffMember);
          setActiveContract(_activeContract);
          const nestJwt = extUser.nestJwt;
          setAuthtoken(nestJwt);
          // 3. Set cookie for session persistence
          const loginSuccessTime = new Date().toISOString();
          console.log(`[Login Success] Storing login time in cookie: ${loginSuccessTime}`);
          await setCookie(null, 'login_success_time', loginSuccessTime, {
            path: '/',
          });


          setBetterAuthToken(token);
          const maxAge = extUser.tokenMaxAge || 3600; // Default to 1 hour
          // Clear the previous session null time to reset debugging for this new session
          await setCookie(null, 'first_session_null_time', '', {
            maxAge: -1, // Expire the cookie
            path: '/',
          });
          await setCookie(null, 'token', nestJwt, { maxAge: maxAge, path: '/' });
        }
        // ──────────────────────────────────────────────────────────────
        // 3. Session Expiration Logging (same as old handleLoginSuccess)
        // ──────────────────────────────────────────────────────────────
        if (extUser?.nestJwt) {
          const decoded = decodeJwt(extUser.nestJwt);

          if (decoded) {
            if (typeof decoded.exp === 'number') {
              const expiryTimestampSeconds = decoded.exp;
              const expiryDate = new Date(expiryTimestampSeconds * 1000);
              const now = new Date();
              const timeRemainingMs = expiryDate.getTime() - now.getTime();

              if (timeRemainingMs > 0) {
                const minutes = Math.floor(timeRemainingMs / (1000 * 60));
                const seconds = Math.floor((timeRemainingMs % (1000 * 60)) / 1000);
                console.log(
                  `[Token Expiry] NestJS token expires in: ${minutes} minutes and ${seconds} seconds. ` +
                  `Expiry Date/Time (Client Local): ${expiryDate.toLocaleString()}`
                );
              } else {
                console.log('[Token Expiry] NestJS token has already expired.');
              }
            }

            if (typeof decoded.iat === 'number') {
              const iatTimestampSeconds = decoded.iat;
              const clientLoginInitiatedTime: number | null = null;
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
            }
          } else {
            console.error('Failed to decode NestJS JWT for expiration checks.');
          }
        }
        // 4. Redirect to home page
        router.push('/');
      } else {

        const errorMsg = response.error.message;
        setLoginStatus(errorMsg || 'Login failed.');

      }
      //end
    } catch (error) {
      console.error('An unexpected error occurred during login:', error);
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