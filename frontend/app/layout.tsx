'use client';

import '@mantine/core/styles.css';
//import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '@/components/theme';
import getConfig from 'next/config';
//import useStore from '../components/store/zstore';
import { baseconfig } from '@/../baseconfig';
// export const metadata = {
//   title: 'Mantine Next.js template',
//   description: 'I am using Mantine with Next.js!',
// };
import '@/styles/styles.css';
import styles from './layout.module.css';
//import '@mantine/core/styles.css';
import linkstyle from './NavBar/mainlinks.module.css';
//import AppShellNavBar from './NavBar/AppShellNavBar';
import Link from 'next/link';
import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
//import { basepath } from '/global';
import '@mantine/dates/styles.css';
import { SessionProvider } from 'next-auth/react';
//import HeaderPopover from './LayoutHeader/HeaderPopover';
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
//import { useSession, signOut } from 'next-auth/react';
import { destroyCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { useDisclosure } from '@mantine/hooks';
import { useStaffData } from '@/components/hooks/useStaffData';
import * as classes from '@/components/layout.css';
import useUIStore from '@/components/stores/useUIStore';
import useStore from '@/components/stores/zstore';
import { usePublicHolidays } from '@/components/util/usePublicHolidays';
//import useTokenExpiration from '@/components/hooks/useTokenExpiration';
import { child } from 'winston';
import Providers from '@/components/providers';
export default function RootLayout({ children }: { children: any }) {
  const faviconUrl = `${baseconfig.prefix}/favicon.svg`;
  const { publicHolidays, loading, loadPublicHolidays } = usePublicHolidays();

  //useTokenExpiration();
  const { basepath, setBasepath } = useStore();
  useEffect(() => {
    const _basepath = baseconfig.basepath;
    if (!basepath) {
      setBasepath(_basepath);
    }
  }, []);
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href={faviconUrl} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// export const config = {
//   middleware,
// };
