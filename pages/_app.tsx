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
import { SessionProvider } from "next-auth/react"
import { basePath } from 'src/shared/constants/env';
export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const title = pageProps.title;
  const basepath = pageProps.basePath;
  const session = pageProps.session;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme,
  );


  console.log('session?')
  console.log(session)
  const router = useRouter();
  console.log(router.pathname)
  if (router.pathname === '/absproxy/5000/login') {
    router.replace('/absproxy/5000/user/login');
  }
  if (router.pathname === '/absproxy/5000/signup') {
    router.replace('/absproxy/5000/user/signup');
  }
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
    <SessionProvider session={pageProps.session} basePath='/absproxy/5000/api/auth'>

      <Head>
        <title>{title ? title : "Mantine next example"}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href={`${basePath}/favicon.svg`} />
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
          <Component {...pageProps} />
          <Notifications />
        </MantineProvider>
      </ColorSchemeProvider>

    </SessionProvider>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  const basePath = `${process.env.basepath}` || '';
  const pageProps = appProps.pageProps || {}; // Extract pageProps object
  console.log("pageprops:" + { ...pageProps } + pageProps.title);
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
    basePath,
    title: pageProps.title,
  };
};
