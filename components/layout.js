import styles from './layout.module.css';
import Head from 'next/head';
import linkstyle from './NavBar/mainlinks.module.css';
import AppShellNavBar from '../components/NavBar/NavBar';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useStyles from '../styles/layout.styles';
import { basepath } from '/global';
import { format, parseISO } from 'date-fns';
import {
  Popover,
  Button,
  Title,
  TextInput,
  AppShell,
  Box,
  ThemeIcon,
  Flex,
  Header,
  Footer,
  Grid,
  Text,
  Group,
  MediaQuery,
  Burger,
  ActionIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import {
  IconLogout,
  IconLogin,
  IconUser,
  IconSquareRoundedX,
} from '@tabler/icons-react';
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
  const [openedPop, setOpenedPop] = useState(false);

  const handleOpen = () => {
    setOpenedPop(true);
  };

  const handleClose = () => {
    setOpenedPop(false);
  };

  const handleOutsideClick = () => {
    if (openedpop) {
      setOpenedPop(false);
    }
  };
  const dispatch = useDispatch();
  const { staff, user } = useSelector((state) => ({
    staff: state.calendar.staff,
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
  const handleSignout = () => {
    destroyCookie(null, 'token');
    dispatch(clearAllState());
    signOut();
  };
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
  const formatDate = (dateString) => {
    if (dateString) {
      const date = parseISO(dateString);
      const formattedDate = format(date, 'yyyy-MMM-dd');
      return formattedDate;
    }
  };

  const userFields = [
    { label: 'Staff Name:', value: user?.staff.StaffName },
    { label: 'Agent Name:', value: user?.staff.AgentName },
    { label: 'Staff Category:', value: user?.staff.StaffCategory },
    { label: 'Department:', value: user?.staff.Department },
    { label: 'Post Unit:', value: user?.staff.PostUnit },
    { label: 'Manager Name:', value: user?.staff.ManagerName },
    { label: 'Manager Title:', value: user?.staff.ManagerTitle },
    { label: 'Manager Email:', value: user?.staff.ManagerEmail },
    {
      label: 'Contract Start Date:',
      value: formatDate(user?.staff.ContractStartDate),
    },
    {
      label: 'Contract End Date:',
      value: formatDate(user?.staff.ContractEndDate),
    },
    { label: 'Annual Leave:', value: user?.staff.AnnualLeave },
  ];
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
                    <Popover
                      width={390}
                      trapFocus
                      position="bottom"
                      withArrow
                      shadow="md"
                      gutter={10}
                      opened={openedPop}
                      closeDelay={500}
                      onClose={handleClose}
                    >
                      <Popover.Target>
                        <Button
                          variant="link"
                          onMouseEnter={handleOpen}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: 'white',
                            backgroundColor: '#15487E', // Subtle background color

                            textDecoration: 'none',
                            transition:
                              'background-color 0.2s ease, color 0.2s ease',
                            '&:hover': {
                              backgroundColor: 'transparent',
                              color: 'blue',
                            },
                          }}
                        >
                          <IconUser
                            size={18}
                            sx={{
                              marginRight: '0.5rem',
                            }}
                          />
                          {user?.name}
                        </Button>
                      </Popover.Target>
                      <Popover.Dropdown
                        sx={(theme) => ({
                          background: ` linear-gradient(to top, #051937, #0a2448, #0e2f59, #123b6b, #15487e);`,
                          borderRadius: theme.radius.md,
                          color: 'white',
                          boxShadow: theme.shadows.md,
                          padding: theme.spacing.md,
                        })}
                      >
                        <ActionIcon
                          variant="filled"
                          size="xs"
                          style={{
                            position: 'absolute',
                            top: '5px',
                            right: '5px',
                            zIndex: '1',
                          }}
                          onClick={handleClose}
                        >
                          <IconSquareRoundedX />
                        </ActionIcon>
                        <Grid gutter="sm">
                          {userFields.map((field, index) => (
                            <React.Fragment key={index}>
                              <Grid.Col span={5}>
                                <Text align="right" size="sm" weight={500}>
                                  {field.label}
                                </Text>
                              </Grid.Col>
                              <Grid.Col span={7}>
                                <Text size="sm">{field.value}</Text>
                              </Grid.Col>
                            </React.Fragment>
                          ))}
                        </Grid>
                      </Popover.Dropdown>
                    </Popover>

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
      navbar={<AppShellNavBar opened={opened} />}
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
