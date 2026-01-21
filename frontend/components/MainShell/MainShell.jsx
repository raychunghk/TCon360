/* eslint-disable react/react-in-jsx-scope */
'use client';
import { bauthClient } from '@/app/lib/bauthclient';
import useUIStore from '@/components/stores/useUIStore';
import useStore from '@/components/stores/zstore.ts';
import { palette } from '@/styles/palette';
import {
  AppShell,
  Burger,
  Button,
  Center,
  Group,
  LoadingOverlay,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import '@mantine/core/styles/Button.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.layer.css';
import { IconLogin } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { destroyCookie, parseCookies } from 'nookies';
import { useCallback, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import HeaderPopover from './LayoutHeader/HeaderPopover';
import * as classes from './MainShell.css';
import AppShellNavBar from './NavBar/AppShellNavBar';
export function MainShell({ children, contentpadding = '10px' }) {
  const theme = useMantineTheme();
  const { siteTitle } = useUIStore();
  const {
    navbarwidth,
    basepath,
    MainshellOverlayVisible,
    setMainshellOverlayVisible,
    fetchStaffData,
    status,
    isAuthenticated,
    activeUser,
    activeStaff,
    activeContract,
  } = useStore(
    useShallow((state) => ({
      navbarwidth: state.navbarwidth,
      basepath: state.basepath,
      MainshellOverlayVisible: state.MainshellOverlayVisible,
      setMainshellOverlayVisible: state.setMainshellOverlayVisible,
      fetchStaffData: state.fetchStaffData,
      status: state.status,
      isAuthenticated: state.isAuthenticated,
      activeUser: state.activeUser,
      activeStaff: state.activeStaff,
      activeContract: state.activeContract,
    })),
  );
  const router = useRouter();

  const [opened, setOpened] = useState(false);
  const pathname = usePathname();

  const clearAllCookies = useCallback(() => {
    const cookies = parseCookies();
    Object.keys(cookies).forEach((cookieName) => {
      destroyCookie(null, cookieName, { path: '/' });
    });
    console.log('MainShell: All cookies cleared');
  }, []);

  const handleSignout = useCallback(async () => {
    console.log('MainShell: Initiating sign-out');
    clearAllCookies();
    bauthClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
        },
      },
    });
  }, [clearAllCookies, router]);

  useEffect(() => {
    console.log('MainShell: Fetching staff data', {
      status,
      isAuthenticated,
      activeUser,
    });
    setMainshellOverlayVisible(false);
    if (
      !activeUser &&
      !pathname.startsWith('/auth/login') &&
      !pathname.startsWith('/auth/signup')
    ) {
      fetchStaffData();
    }
  }, [status, activeUser, pathname, setMainshellOverlayVisible, fetchStaffData]);

  if (status === 'loading') {
    console.log('MainShell: Rendering loading state', { pathname });
    return (
      <LoadingOverlay
        visible
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
    );
  }

  if (
    (status === 'unauthenticated' || !isAuthenticated) &&
    !pathname.startsWith('/auth/login') &&
    !pathname.startsWith('/auth/signup')
  ) {
    console.log(
      'MainShell: Unauthenticated state detected, preventing main render',
      { pathname, status, isAuthenticated },
    );
    return null;
  }

  console.log('MainShell: Rendering main content', {
    activeUser,
    siteTitle,
    pathname,
  });

  return (
    <>
    <AppShell
      header={{ height: 60, zIndex: 1000}}
      footer={{ height: 35,zIndex:9999 }}
      navbar={{
        width: navbarwidth,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
        zIndex:1,

      }}
      padding="md"
      className={classes.MainShell}
       transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <AppShell.Header

      className={classes.header}>

        <Group justify="space-between" className={classes.headerInner}>
          <Group>
            <Burger
              hiddenFrom="xs"
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.white}
              mr="sm"
            />
            <Link href="/" className={classes.logoLink}>
              <Image
                src={`${basepath}/favicon.svg`}
                alt="Icon"
                width={30}
                height={30}
              />
            </Link>
            <Title ta="center" mt={5} component="div" fz={{ base: 18, sm: 20, md: 28 }} className={classes.headerTitle}>
              {/* <Text fw={"300"} inherit span className={classes.welcomeText}>Welcome to {' '}</Text> */}

                {siteTitle} - Timesheet and Vacations manager

            </Title>
          </Group>
          <Group gap="xs">
            {activeUser && isAuthenticated ? (
              <>
                {/* HeaderPopover moved to absolute position */}
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  href={`${basepath}/auth/login`}
                  variant="filled"
                  color={palette.primaryRed}
                  size="sm"
                  radius="md"
                  leftSection={<IconLogin size={18} />}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  href={`${basepath}/auth/signup`}
                  variant="subtle"
                  color={palette.goldenYellow}
                  size="sm"
                  radius="md"
                >
                  Sign Up
                </Button>
              </>
            )}
          </Group>
        </Group>
      </AppShell.Header>

      {/* HeaderPopover positioned absolutely in top-right corner */}
      {activeUser && isAuthenticated && (
        <div style={{
          position: 'absolute',
          top: '70px',
          right: '20px',
          zIndex: 1001,
          pointerEvents: 'none'
        }}>
          <div style={{ pointerEvents: 'auto' }}>
            <HeaderPopover />
          </div>
        </div>
      )}

        {activeUser && <AppShellNavBar opened={opened} handleSignout={handleSignout} />}
      <AppShell.Main>
        <LoadingOverlay
          visible={MainshellOverlayVisible}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          />
        {children}
      </AppShell.Main>

      <AppShell.Footer className={classes.footer}>
        <Center className={classes.footerCenter}>
          <Text size="md" c="dimmed" fw={700}>
            Developed by Ray &#x2B1C;&#x1F538;&#x2502;
          </Text>
        </Center>
      </AppShell.Footer>
    </AppShell></>
  );
}
