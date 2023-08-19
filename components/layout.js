import styles from './layout.module.css';
import Head from 'next/head';
import linkstyle from './NavBar/mainlinks.module.css';
import AppShellNavBar from '../components/NavBar/NavBar';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useStyles from '../styles/layout.styles';
import { basepath } from '/global';
import HeaderPopover from './LayoutHeader/HeaderPopover';

import {
  Title,
  AppShell,
  ThemeIcon,
  Flex,
  Header,
  Footer,
  Text,
  Group,
  MediaQuery,
  Burger,
  ActionIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { IconLogout, IconLogin } from '@tabler/icons-react';
import { useSession, signOut } from 'next-auth/react';
import { destroyCookie } from 'nookies';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearAllState,
  setUser,
  setStaff,
} from 'pages/reducers/calendarReducer';

export const siteTitle = 'NxTime';
export default function Layout({ children, home, contentpadding = '10px' }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { data: session } = useSession();
  const { classes } = useStyles();

  const dispatch = useDispatch();
  const handleSignout = () => {
    destroyCookie(null, 'token');
    dispatch(clearAllState());
    signOut();
  };
  const { user } = useSelector((state) => ({
    user: state.calendar.user,
  }));

  useEffect(() => {
    if (!session) {
      destroyCookie(null, 'token');
      dispatch(setUser(null));
      dispatch(clearAllState());
      // handleSignout();
    } else {
      if (session?.user) {
        dispatch(setUser(session.user));
        dispatch(setStaff(session.user.staff));
      }
    }
  }, [session]);

  const buttonStyles = (theme) => ({
    display: 'block',
    width: '115px',
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  });

  return (
    <AppShell
      padding={contentpadding}
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      header={
        <Header height={{ base: 45, md: 50 }} p="sx">
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Group position="apart" style={{ width: '100%' }} p="10px">
              <Group position="left">
                <Image
                  src={`${basepath}/favicon.svg`}
                  alt="Icon"
                  width={30}
                  height={30}
                  style={{ marginRight: '5px' }}
                />

                <Title className={classes.title} align="center">
                  Welcome to{' '}
                  <Text inherit variant="gradient" component="span">
                    NxTime - Timesheet and Leave Form manager
                  </Text>
                </Title>
              </Group>

              <Group position="right">
                {user ? (
                  <>
                    <HeaderPopover></HeaderPopover>
                    <UnstyledButton
                      onClick={() => handleSignout()}
                      sx={buttonStyles}
                    >
                      <Group style={{ width: '150px' }}>
                        <ThemeIcon variant="light">
                          <IconLogout />
                        </ThemeIcon>
                        <Text size="sm">Logout</Text>
                      </Group>
                    </UnstyledButton>
                  </>
                ) : (
                  <Group>
                    <Link href="/login" className={linkstyle.links}>
                      <UnstyledButton sx={buttonStyles}>
                        <Group>
                          <ThemeIcon variant="light">
                            <IconLogin />
                          </ThemeIcon>
                          <Text size="sm">Login</Text>
                        </Group>
                      </UnstyledButton>
                    </Link>{' '}
                    <Link href="/signup" className={linkstyle.links}>
                      <UnstyledButton sx={buttonStyles}>
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
          </div>
        </Header>
      }
      navbar={user ? <AppShellNavBar opened={opened} /> : null}
      footer={
        <Footer height={28}>
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            gap={{ base: 'sm', sm: '0.5g' }}
            justify={{ sm: 'center' }}
            className={styles.flex}
          >
            <div>Developed by Ray &#x2B1C;&#x1F538;&#x2502;</div>
          </Flex>
        </Footer>
      }
    >
      {children}
    </AppShell>
  );
}
