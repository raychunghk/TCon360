import styles from './layout.module.css';
//import '@mantine/core/styles.css';
import linkstyle from './NavBar/mainlinks.module.css';
import AppShellNavBar from './NavBar/AppShellNavBar';
import Link from 'next/link';
import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import { basepath } from '/global';
import '@mantine/dates/styles.css';
import HeaderPopover from './LayoutHeader/HeaderPopover';
import {
  Title,
  AppShell,
  Center,
  ThemeIcon,
  Flex,
  Text,
  Group,
  MediaQuery,
  Burger,
  Button,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { IconLogout, IconLogin } from '@tabler/icons-react';
import { useSession, signOut } from 'next-auth/react';
import { destroyCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import { useStaffData } from 'components/useStaffData';
import * as classes from './MainShell.css';
import useUIStore from 'pages/reducers/useUIStore';
import useStore from '@/components/stores/zstore';

import useTokenExpiration from './useTokenExpiration';
import { child } from 'winston';
export default function Layout({ children, home, contentpadding = '10px' }) {
  const theme = useMantineTheme();
  const { siteTitle } = useUIStore();
  const { clearAllState, navbarwidth } = useStore();
  const [opened, setOpened] = useState(false);

  const clearAllCookies = () => {
    const cookies = parseCookies(); // Get all cookies
    const cookieNames = Object.keys(cookies);
    destroyCookie({}, 'token', { path: '/' }); // Remove each cookie
    console.log('Cookienames', cookieNames);
    const cookies2 = parseCookies();
    console.log('validate if cookie deleted:cookies2', cookies2);
  };
  const router = useRouter();
  const handleSignout = () => {
    clearAllCookies();
    clearAllState();

    router.push('/login');
  };

  const { activeUser, activeStaff, status } = useStaffData();

  if (status === 'loading') {
    <p>Loading...</p>;
  }

  const buttonStyles = (theme) => ({
    display: 'block',
    width: '115px',
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  });

  //const [opened, { toggle }] = useDisclosure();
  //return children;
  if (true)
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
        <AppShell.Header>
          <Group justify="space-between" pl={15}>
            <Group>
              <Burger
                hiddenFrom="xs"
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
              <Title className={classes.title} ta="center" ml={5} mt={5}>
                <Link href="/">
                  <Image
                    src={`${basepath}/favicon.svg`}
                    alt="Icon"
                    width={30}
                    height={30}
                    style={{ marginRight: '5px' }}
                  />
                </Link>
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
                    onClick={() => handleSignout()}
                    className={styles.clsSignupBtn}
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
                  <Link href="/login" className={linkstyle.links}>
                    <UnstyledButton className={classes.buttonStyles}>
                      <Group>
                        <ThemeIcon variant="light">
                          <IconLogin />
                        </ThemeIcon>
                        <Text size="sm">Login</Text>
                      </Group>
                    </UnstyledButton>
                  </Link>{' '}
                  <Link href="/signup" className={linkstyle.links}>
                    <UnstyledButton className={styles.clsSignupBtn}>
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

        <AppShell.Main> {activeUser ? children : null}</AppShell.Main>
        <AppShell.Footer h={30}>
          <Center h={30}>
            <div>Developed by Ray &#x2B1C;&#x1F538;&#x2502;</div>
          </Center>
        </AppShell.Footer>
      </AppShell>
    );
}
