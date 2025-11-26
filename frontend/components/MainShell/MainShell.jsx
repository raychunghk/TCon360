/* eslint-disable react/react-in-jsx-scope */
'use client';
import { SignOut as clientSignOut } from '@/app/lib/auth-action';
import { useStaffData } from '@/components/hooks/useStaffData.ts';
import useUIStore from '@/components/stores/useUIStore';
import useStore from '@/components/stores/zstore.ts';
import { AppShell, Burger, Button, Center, Group, LoadingOverlay, Text, Title, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles/Button.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.layer.css';
import { IconLogin } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { destroyCookie, parseCookies } from 'nookies';
import { useCallback, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow'; // Import useShallow
import HeaderPopover from './LayoutHeader/HeaderPopover';
import * as classes from './MainShell.css';
import AppShellNavBar from './NavBar/AppShellNavBar';
import SignOutButton from './SignOutButton';

export function MainShell({ children, contentpadding = '10px' }) {
  const theme = useMantineTheme();
  const { siteTitle } = useUIStore();
  const { navbarwidth, basepath, MainshellOverlayVisible, setMainshellOverlayVisible, fetchStaffData, status, isAuthenticated, activeUser } = useStore(
    useShallow((state) => ({
      navbarwidth: state.navbarwidth,
      basepath: state.basepath,
      MainshellOverlayVisible: state.MainshellOverlayVisible,
      setMainshellOverlayVisible: state.setMainshellOverlayVisible,
      fetchStaffData: state.fetchStaffData,
      status: state.status,
      isAuthenticated: state.isAuthenticated,
      activeUser: state.activeUser
    }))
  );
  const { activeUser: staffActiveUser } = useStaffData();
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
    await clientSignOut();
  }, [clearAllCookies]);

  useEffect(() => {
    console.log('MainShell: Fetching staff data', { status, isAuthenticated, activeUser });
    setMainshellOverlayVisible(false);
    if (!activeUser && !pathname.startsWith('/auth/login') && !pathname.startsWith('/auth/signup')) {
      fetchStaffData();
    }
  }, [status, activeUser, pathname, setMainshellOverlayVisible, fetchStaffData]);

  if (status === 'loading') {
    console.log('MainShell: Rendering loading state', { pathname });
    return <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />;
  }

  if ((status === 'unauthenticated' || !isAuthenticated) && !pathname.startsWith('/auth/login') && !pathname.startsWith('/auth/signup')) {
    console.log('MainShell: Unauthenticated state detected, preventing main render', { pathname, status, isAuthenticated });
    return null;
  }

  console.log('MainShell: Rendering main content', { activeUser, siteTitle, pathname });

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
              <Image src={`${basepath}/favicon.svg`} alt="Icon" width={30} height={30} />
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
          <Group gap="xs">
  {activeUser && isAuthenticated ? (
    <>
      <HeaderPopover />
      <SignOutButton handleSignout={handleSignout}></SignOutButton>
      {/* <Button
        variant="light"
        color="orange"
        size="sm"
        radius="md"
        onClick={handleSignout}
        leftSection={<IconLogout size={18} />}
      >
        Sign Out
      </Button> */}
    </>
  ) : (
    <>
      <Button
        component={Link}
        href={`${basepath}/auth/login`}
        variant="filled"
        color="violet"
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
        color="gray"
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
      {activeUser && <AppShellNavBar opened={opened} />}
      <AppShell.Main>
        <LoadingOverlay
          visible={MainshellOverlayVisible}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
        {children}
      </AppShell.Main>
      <AppShell.Footer h={30} bg="var(--mantine-color-gray-0)" style={{ borderTop: `1px solid var(--mantine-color-gray-3)` }}>
        <Center h={30} >
          <Text size="sm" c="dimmed" fw={500}>Developed by Ray &#x2B1C;&#x1F538;&#x2502;</Text>
        </Center>
      </AppShell.Footer>
      
    </AppShell>
  );
}