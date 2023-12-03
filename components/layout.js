import styles from './layout.module.css';
import Head from 'next/head';
import linkstyle from './NavBar/mainlinks.module.css';
import AppShellNavBar from '../components/NavBar/NavBar';
import Link from 'next/link';
import React, { useEffect, useState, useContext } from 'react';
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
  Button,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { IconLogout, IconLogin } from '@tabler/icons-react';
import { useSession, signOut } from 'next-auth/react';
import { destroyCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearAllState,
  setUser,
  setStaff,
  setBasepath,
} from 'pages/reducers/calendarReducer';
import { useStaffData } from 'components/useStaffData';
//import { PublicHolidaysContext } from 'pages/_app';
//import { setPublicHolidays } from 'pages/reducers/calendarReducer';
import { useShallow } from 'zustand/shallow';
export const siteTitle = 'NxTime';
import useStore from 'pages/reducers/zstore';
import useTokenExpiration from './useTokenExpiration';
export default function Layout({ children, home, contentpadding = '10px' }) {
  const theme = useMantineTheme();

  /*const _publicholidays = useContext(PublicHolidaysContext);
  const publicholidays = _publicholidays;
  */
  //setPublicHolidays(publicholidays);

  const [opened, setOpened] = useState(false);

  const { data: session } = useSession();
  const { classes } = useStyles();
  const dispatch = useDispatch();

  //const setActiveContract = useStore((state) => state.setActiveContract);
  // const [setActiveContract] = useStore(
  //   useShallow((state) => [state.setActiveContract]),
  // );
  //const { publicHolidays, setPublicHolidays, setActiveContract } = useStore();
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
    //destroyCookie(null, 'token');
    clearAllCookies();
    dispatch(clearAllState());
    router.push('/login');
    //signOut();
  };
  /*
  const { user, staff } = useSelector((state) => ({
    user: state.calendar.user,
    staff: state.calendar.staff,
  }));*/
  const { activeUser, activeStaff, activeContract, isAuthenticated, status } =
    useStaffData();

  console.log('user?', activeUser);
  console.log('activestaff?', activeStaff);
  //useTokenExpiration();

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch(setUser(activeUser));

      if (activeStaff) {
        dispatch(setStaff(activeStaff));
      }
    }
  }, [activeStaff]);
  if (status === 'loading') {
    //return <p>Loading...</p>;
  }

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
                <Link href="/">
                  <Image
                    src={`${basepath}/favicon.svg`}
                    alt="Icon"
                    width={30}
                    height={30}
                    style={{ marginRight: '5px' }}
                  />
                </Link>
                <Title className={classes.title} align="center">
                  Welcome to{' '}
                  <Text inherit variant="gradient" component="span">
                    NxTime - Timesheet and Leave Form manager
                  </Text>
                </Title>
              </Group>

              <Group position="right">
                {activeUser ? (
                  <>
                    <HeaderPopover></HeaderPopover>
                    <Button
                      onClick={() => handleSignout()}
                      className={classes.buttonStyles}
                      leftIcon={
                        <IconLogout
                          size="1.625rem"
                          style={{
                            color: '#7d022f', // Set the color to purple
                            marginRight: '0.5rem',
                          }}
                        />
                      }
                    >
                      <Text size="sm" color="black">
                        Sign out
                      </Text>
                    </Button>
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
      navbar={activeUser ? <AppShellNavBar opened={opened} /> : null}
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
      {activeUser ? children : null}
    </AppShell>
  );
}
