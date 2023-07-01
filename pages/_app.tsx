import { useState } from 'react';
import NextApp, { AppProps, AppContext } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { SessionProvider, SessionProviderProps ,getSession, useSession} from 'next-auth/react';
import { basePath } from 'src/shared/constants/env';
import { parseCookies } from 'nookies';
import session from 'express-session';

interface CustomSessionProviderProps extends SessionProviderProps {
  token: string;
}
export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;

  const title = pageProps.title;
  const basepath = props.basepath;
  
  const cookies = parseCookies();
  const token = cookies.token;
  //const token = localStorage.getItem("token");
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme,
  );

  console.log('props?');
  console.log(props);

  console.log('base path?');
  console.log(basepath);
  const router = useRouter();
  console.log('router path name?' + router.pathname);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    // <SessionProvider session={session} basePath='/absproxy/5000'>
    <SessionProvider
      session={pageProps.session}
      basePath={`${basepath}/api/auth`}
      token={token}
      {...(null as CustomSessionProviderProps)}
    >
      <Head>
        <title>{title ? title : 'Mantine next example'}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href={`${basepath}/favicon.svg`} />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme: 'light' }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Component {...pageProps} basepath={basepath} />
          <Notifications />
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  const basepath = `${process.env.basepath}` || '';
  const pageProps ={session,  ...appProps.pageProps} || {}; // Extract pageProps object
 
 
  console.log('basePath' + basePath);
  console.log('pageprops:' + { ...pageProps } + pageProps.title);
  console.log(pageProps)
  console.log(pageProps.session())
  console.log(pageProps.session())
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
    basepath,
    title: pageProps.title,
  };
};
