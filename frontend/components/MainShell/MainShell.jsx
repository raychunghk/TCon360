'use client';
import { SignOut as clientSignOut } from '@/app/lib/auth-action';
import { useStaffData } from '@/components/hooks/useStaffData';
import useUIStore from '@/components/stores/useUIStore';
import useStore from '@/components/stores/zstore.js';
import { AppShell, Burger, Button, Center, Group, LoadingOverlay, Text, Title, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles/Button.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.layer.css';
import { IconLogin, IconLogout } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { destroyCookie, parseCookies } from 'nookies';
import { useCallback, useEffect, useState } from 'react';
import useCustRouter from '../useCustRouter';
import HeaderPopover from './LayoutHeader/HeaderPopover';
import * as classes from './MainShell.css';
import styles from './MainShell.module.css';
import AppShellNavBar from './NavBar/AppShellNavBar';

export function MainShell({ children, contentpadding = '10px' }) {
  const theme = useMantineTheme();
  const { siteTitle } = useUIStore();
  const { navbarwidth, basepath, setBasepath, MainshellOverlayVisible, setMainshellOverlayVisible, config, fetchStaffData } = useStore();
  const { activeUser, status, isAuthenticated } = useStaffData();
  const [opened, setOpened] = useState(false);
  const router = useCustRouter();

  const clearAllCookies = useCallback(() => {
    const cookies = parseCookies();
    Object.keys(cookies).forEach((cookieName) => {
      destroyCookie(null, cookieName, { path: '/' });
    });
    console.log('MainShell: All cookies cleared');
  }, []);

  const handleSignout = useCallback(() => {
    console.log('MainShell: Initiating sign-out');
    clearAllCookies();
    clientSignOut();
  }, [clearAllCookies]);

  useEffect(() => {
    console.log('MainShell: Setting basepath and fetching staff data', { basepath });
    setMainshellOverlayVisible(false);
    if (!basepath) {
      setBasepath(process.env.NEXT_PUBLIC_BASEPATH || 'http://localhost:3800');
    }
    if (basepath) {
      fetchStaffData();
    }
  }, [basepath, setBasepath, setMainshellOverlayVisible, fetchStaffData]);

  useEffect(() => {
    if (status === 'unauthenticated' && !isAuthenticated) {
      console.log('MainShell: Redirecting to login', { status, isAuthenticated });
      router.push('/auth/login');
    }
  }, [status, isAuthenticated, router]);

  if (status === 'loading') {
    console.log('MainShell: Rendering loading state');
    return <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />;
  }

  console.log('MainShell: Rendering main content', { activeUser, siteTitle });

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 30 }}
      navbar={{
        width: navbarwidth,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header className={classes.header}>
        <Group justify="space-between" pl={15} w="100%">
          <Group>
            <Burger
              hiddenFrom="xs"
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="sm"
            />
            <Link href="/">
              <Image src={`${config?.basepath}/favicon.svg`} alt="Icon" width={30} height={30} />
            </Link>
            <Title className={classes.title} ta="center" mt={5}>
              Welcome to{' '}
              <Text
                inherit
                variant="gradient"
                gradient={{ from: 'violet', to: 'red', deg: 90 }}
                span
              >
                {siteTitle} - Timesheet and Vacations manager
              </Text>
            </Title>
          </Group>
          <Group justify="right" mr={15}>
            {activeUser ? (
              <>
                <HeaderPopover />
                <Button
                  className={styles.clsSignupBtn}
                  onClick={handleSignout}
                  leftSection={
                    <IconLogout
                      size="1.625rem"
                      style={{
                        color: 'var(--mantine-color-orange-1)',
                        marginRight: '0.5rem',
                      }}
                    />
                  }
                >
                  <Text size="sm" fw={500}>
                    Sign out
                  </Text>
                </Button>
              </>
            ) : (
              <Group>
                <Link href={`${config?.basepath}/auth/login`} passHref>
                  <Button
                    className={styles.clsSignupBtn}
                    leftSection={
                      <IconLogin
                        size="1.625rem"
                        style={{
                          color: 'var(--mantine-color-orange-1)',
                          marginRight: '0.5rem',
                        }}
                      />
                    }
                  >
                    <Text>Login</Text>
                  </Button>
                </Link>
                <Link href={`${basepath}/auth/signup`} className={styles.links}>
                  <Button
                    variant="subtle"
                    className={styles.headerButtonsStyle}
                    leftSection={<IconLogin size="1rem" />}
                  >
                    <Text size="sm">Signup</Text>
                  </Button>
                </Link>
              </Group>
            )}
          </Group>
        </Group>
      </AppShell.Header>
      {activeUser && <AppShellNavBar opened={opened} />}
      <AppShell.Main>
        <LoadingOverlay
          visible={MainshellOverlayVisible}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
        {children}
      </AppShell.Main>
      <AppShell.Footer h={30}>
        <Center h={30}>
          <Text size="sm">Developed by Ray &#x2B1C;&#x1F538;&#x2502;</Text>
        </Center>
      </AppShell.Footer>
    </AppShell>
  );
}