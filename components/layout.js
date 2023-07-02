
import styles from './layout.module.css';
import Head from 'next/head';
import linkstyle from './NavBar/mainlinks.module.css';
import AppShellNavBar from '../components/NavBar/NavBar';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { basepath } from '/global';
import {
    AppShell,
    Navbar, ThemeIcon,
    Flex,
    Header,
    Footer,
    Text, Group,
    Logo, Box,
    MediaQuery,
    Burger, UnstyledButton,
    useMantineTheme,
} from '@mantine/core';
import {
    IconHome2,
    IconGauge,
    IconFingerprint,
    IconCalendarStats,
    IconUser,
    IconCalendarEvent,
    IconCalendarPlus,
    IconEyeglass,
    IconClock,
    IconLogout,
    IconLogin,
    IconSunset2,
    IconTree,
    IconSwitchHorizontal,
} from '@tabler/icons-react';
import { useSession , signOut} from "next-auth/react"
const name = 'Ray Chung';
export const siteTitle = 'NxTimeT';
export default function Layout({ children, home }) {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const { data: session } = useSession()
    const [username, setUsername] = useState(false);
    let _username;
    if (session) {
        console.log('session?');
        console.log(session);
      //  console.log(session.user.username)
        _username = session.user.name;

    } else {
        console.log("no session")
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
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"

            header={
                <Header height={{ base: 45, md: 50 }} p="sx">
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
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
                                <Text id='sitetitle'>TS Generator</Text>
                            </Group>

                            <Group position="right">
                                <Text>{_username}</Text>
                                {_username ? (
                           
                                    <UnstyledButton
                                     onClick={()=>signOut()}
                                        sx={buttonStyles} 
                                    >    <Group>
                                    <ThemeIcon variant="light">
                                        <IconLogout />
                                    </ThemeIcon>
                                        <Text size="sm">Logout</Text>
                                        </Group>
                                    </UnstyledButton>
                            
                                ) : (
                                    <Link href='/login' className={linkstyle.links}>
                                        <UnstyledButton sx={buttonStyles}>
                                            <Group>
                                                <ThemeIcon variant="light">
                                                    <IconLogin />
                                                </ThemeIcon>
                                                <Text size="sm">Login</Text>
                                            </Group>
                                        </UnstyledButton>
                                    </Link>
                                )}
                                <Link href='/signup' className={linkstyle.links}>
                                    <UnstyledButton sx={buttonStyles}>
                                        <Group>
                                            <ThemeIcon variant="light">
                                                <IconLogin />
                                            </ThemeIcon>
                                            <Text size="sm">Signup</Text>
                                        </Group>
                                    </UnstyledButton>
                                </Link>
                            </Group>
                        </Group>

                    </div>



                </Header>
            }

            navbar={<AppShellNavBar opened={opened} />}
            footer={
                <Footer height={28}  >
                    <Flex
                        direction={{ base: 'column', sm: 'row' }}
                        gap={{ base: 'sm', sm: '0.5g' }}
                        justify={{ sm: 'center' }}
                        className={styles.flex}
                    >
                        <div >Developed by RayCWM</div>
                    </Flex>
                </Footer>
            }

        >
            {children}

        </AppShell>

    );
}

