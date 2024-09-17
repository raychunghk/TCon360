'use client';

import '@mantine/core/styles.css';
//import React from 'react';
import { ColorSchemeScript } from '@mantine/core';

import getConfig from 'next/config';
//import useStore from '../components/store/zstore';
//import { default as baseconfig } from '@/frontendconfig';
import * as feconfig from '@/frontendconfig';
// export const metadata = {
//   title: 'Mantine Next.js template',
//   description: 'I am using Mantine with Next.js!',
// };
import '@/styles/styles.css';
import styles from './layout.module.css';
//import '@mantine/core/styles.css';

//import AppShellNavBar from './NavBar/AppShellNavBar';
import Link from 'next/link';
import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
//import { basepath } from '/global';
import '@mantine/dates/styles.css';


import useStore from '@/components/stores/zstore';

//import useTokenExpiration from '@/components/hooks/useTokenExpiration';

import Providers from '@/components/providers';
export default function RootLayout({ children }: { children: any }) {
  const faviconUrl = `${feconfig.prefix}/favicon.svg`;
  //const { publicHolidays, loading, loadPublicHolidays } = usePublicHolidays();

  //useTokenExpiration();
  const { basepath, setBasepath, setUseReverseProxy } = useStore();
  useEffect(() => {
    const _basepath = feconfig.basepath;

    console.log('on layout');
    if (!basepath) {
      setBasepath(_basepath);
      setUseReverseProxy(feconfig.useReverseProxy)
    }
  }, []);
  return (
    basepath && (
      <>
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
      </>
    )
  );
}

// export const config = {
//   middleware,
// };
