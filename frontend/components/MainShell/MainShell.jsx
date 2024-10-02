'use client';
import styles from './MainShell.module.css';
//import '@mantine/core/styles.css';

import linkstyle from './NavBar/mainlinks.module.css';
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/Button.css';
import AppShellNavBar from './NavBar/AppShellNavBar';
import Link from 'next/link';
import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';

import '@mantine/dates/styles.css';
import HeaderPopover from './LayoutHeader/HeaderPopover';
import {
  Title,
  AppShell,
  Center,
  ThemeIcon,

  Text,
  Group,
  Burger,
  Button,
  UnstyledButton,
  useMantineTheme,
  LoadingOverlay,
} from '@mantine/core';
import { IconLogout, IconLogin } from '@tabler/icons-react';

import { destroyCookie, parseCookies } from 'nookies';


import { useStaffData } from '@/components/hooks/useStaffData';
import useTokenExpiration from '@/components/hooks/useTokenExpiration';
import * as classes from './MainShell.css';
import useUIStore from '@/components/stores/useUIStore';
import useStore from '@/components/stores/zstore';
import { baseconfig } from '@/../baseconfig';
import { child } from 'winston';
import useCustRouter from '../useCustRouter';
import { getMySession } from '@/app/lib/auth-action';
import LoginBody from '../login/LoginBody';
//export function MainShell({ children: any, home, contentpadding = '10px' }) {
export function MainShell({ children, contentpadding = '10px' }) {
  const theme = useMantineTheme();
  const [showLoginBody, setShowLoginBody] = useState(false); // New state variable
  const { siteTitle } = useUIStore();

  const {
    clearAllState,
    navbarwidth,
    basepath,
    setBasepath,
    MainshellOverlayVisible,
    setMainshellOverlayVisible,
  } = useStore();

  const [opened, setOpened] = useState(false);
  const clearAllCookies = () => {
    const cookies = parseCookies(); // Get all cookies
    const cookieNames = Object.keys(cookies);
    destroyCookie({}, 'token', { path: '/' }); // Remove each cookie
    console.log('Cookienames', cookieNames);
    const cookies2 = parseCookies();
    console.log('validate if cookie deleted:cookies2', cookies2);
  };
  const router = useCustRouter();
  const handleSignout = () => {
    clearAllCookies();
    //clearAllState();
    console.log('router', router);
    router.push('/auth/login');
  };
  const { activeUser, activeStaff, status, isAuthenticated } = useStaffData();
  useEffect(() => {
    const checksession = async () => {
      let sess = await getMySession();
      setMainshellOverlayVisible(false);
      console.log('MainShell session', sess);
     // setSession(sess);
      if (!sess) {
         router.push('/auth/login');
        setShowLoginBody(true); // Set showLoginBody to true if session is null
        //return (<LoginBody />)
      }
    };
    //checksession();
  }, []);

  if (status === 'loading') {
    //  return ( <p>Loading...</p>);
  }


  const buttonStyles = (theme) => ({
    display: 'block',
    width: '115px',
    padding: theme.spacing.xs,
    borderRadius: theme.radius.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  });
  return (
    <>
      {/* Conditionally render LoginBody */}
      {/*showLoginBody && <LoginBody />*/}
      {/*!showLoginBody &&*/
       (
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
            <Group justify="space-between" pl={15} w={'100%'}>
              <Group>
                <Burger
                  hiddenFrom="xs"
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="sm"
                />{' '}
                <Link href="/">
                  <Image src={`${baseconfig.basepath}/favicon.svg`} alt="Icon" width={30} height={30} />
                </Link>
                <Title className={classes.title} ta="center" mt={5}>
                  Welcome to{' '}
                  <Text inherit variant="gradient" component="span">
                    {siteTitle} - Timesheet and Leave Form manager
                  </Text>
                </Title>
              </Group>
              <Group justify="right" mr={15}>
                {activeUser ? (
                  <>
                    <HeaderPopover></HeaderPopover>
                    <Button
                      className={styles.clsSignupBtn}
                      onClick={() => handleSignout()}
                      leftSection={
                        <IconLogout
                          size="1.625rem"
                          style={{
                            color: 'var(--mantine-color-orange-1)', // Set the color to purple
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
                    <Link href={`${baseconfig.basepath}/auth/login`} passHref>
                      <Button
                        className={styles.clsSignupBtn}
                        leftSection={
                          <IconLogin
                            size="1.625rem"
                            style={{
                              color: 'var(--mantine-color-orange-1)', // Set the color to purple
                              marginRight: '0.5rem',
                            }}
                          />
                        }
                      >
                        <Text>Login</Text>
                      </Button>
                    </Link>
                    <Link href={`${basepath}/auth/signup`} className={linkstyle.links}>
                      <UnstyledButton className={classes.headerButtonsStyle}>
                        <Group style={{ width: '150px' }}>
                          <ThemeIcon variant="light">
                            <IconLogin />
                          </ThemeIcon>
                          <Text size="sm">Signup</Text>
                        </Group>
                      </UnstyledButton>
                    </Link>
                  </Group>
                )}
              </Group>
            </Group>
          </AppShell.Header>
          {activeUser ? <AppShellNavBar opened={opened} /> : null}
          <AppShell.Main>
            {' '}
            <LoadingOverlay
              visible={MainshellOverlayVisible}
              zIndex={1000}
              overlayProps={{ radius: 'sm', blur: 2 }}
            />
            {children}
          </AppShell.Main>
          <AppShell.Footer h={30}>
            <Center h={30}>
              <div>Developed by Ray &#x2B1C;&#x1F538;&#x2502;</div>
            </Center>
          </AppShell.Footer>
        </AppShell>)}
    </>
  );
}
