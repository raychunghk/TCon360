'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';

type sessionProps = {
  children: React.ReactNode;
};
function Providers({ children }: sessionProps) {
  //return <SessionProvider basePath="/absproxy/3333/api/auth">{children}</SessionProvider>;
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}

export default Providers;
