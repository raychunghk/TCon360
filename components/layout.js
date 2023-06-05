
import styles from './layout.module.css';
import Head from 'next/head';

import AppShellNavBar from '../components/NavBar/NavBar';

import { useState } from 'react';
import {
    AppShell,
    Navbar,
    Flex,
    Header,
    Footer,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
} from '@mantine/core';

const name = 'Ray Chung';
export const siteTitle = 'Next.js Sample WebsiteBBB';
export default function Layout({ children, home }) {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
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
                <Header height={{ base: 35, md: 38 }} p="md">
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

                        <Text>TS Generator</Text>
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

 