'use client';

import { MantineProvider } from '@mantine/core';
import React from 'react';
import { theme } from './theme';

import { ModalsProvider } from '@mantine/modals';
type sessionProps = {
  children: React.ReactNode;
};
function Providers({ children }: sessionProps) {
  //return <SessionProvider basePath="/absproxy/3333/api/auth">{children}</SessionProvider>;
  return <MantineProvider theme={theme}><ModalsProvider>{children}</ModalsProvider></MantineProvider>;
}

export default Providers;
