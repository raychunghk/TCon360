'use client';
import styles from './MainShell.module.css';
//import '@mantine/core/styles.css';
import linkstyle from './NavBar/mainlinks.module.css';
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
  Flex,
  Text,
  Group,
  Burger,
  Button,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { IconLogout, IconLogin } from '@tabler/icons-react';
import { useSession, signOut } from 'next-auth/react';
import { destroyCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { useDisclosure } from '@mantine/hooks';
import { useStaffData } from '/components/useStaffData';
//import * as classes from './MainShell.css';
import useUIStore from '../store/useUIStore';
import useStore from '../store/zstore';

import useTokenExpiration from '/components/useTokenExpiration';
import { child } from 'winston';
//export function MainShell({ children: any, home, contentpadding = '10px' }) {
export function MainShell({ children, contentpadding = '10px' }) {
  const theme = useMantineTheme();
  const { siteTitle } = useUIStore();
  const { clearAllState, navbarwidth } = useStore();
  const [opened, setOpened] = useState(false);
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
      <AppShell.Main> {children} </AppShell.Main>
      <AppShell.Footer h={30}>
        <Center h={30}>
          <div>Developed by Ray &#x2B1C;&#x1F538;&#x2502;</div>
        </Center>
      </AppShell.Footer>
    </AppShell>
  );
}
