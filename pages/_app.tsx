import { format, parseISO, isWeekend } from 'date-fns';
import { useState, createContext, useEffect } from 'react';
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
import {
  SessionProvider,
  SessionProviderProps,
  getSession,
  useSession,
} from 'next-auth/react';
import { basePath } from 'src/shared/constants/env';
import { parseCookies } from 'nookies';
import session from 'express-session';

interface CustomSessionProviderProps extends SessionProviderProps {
  token: string;
}
import { GlobalStyles } from '@mantine/core';
import '../styles/styles.css'
import axios from 'axios';



// Create a context for publicholidays
export const PublicHolidaysContext = createContext(null);

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;

  const title = pageProps.title;
  const basepath = props.router.basePath;

  const cookies = parseCookies();
  const token = cookies.token;
  //const token = localStorage.getItem("token");
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme,
  );
  const [publicholidays, setPublicHolidays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  useEffect(() => {
    const loadPublicHolidays = async () => {
      try {
        const response = await axios.get(`${basepath}/api/timesheet/publicholidays`);
        const data = response.data;
        const formattedPublicHolidays = data.map((holiday) => ({
          Summary: holiday.Summary,
          
          StartDate: format((new Date(holiday.StartDate)),'M/d/yyyy'),
        }));
        console.log('formatted public holidays?')
        console.log(formattedPublicHolidays)
        setPublicHolidays(formattedPublicHolidays);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    loadPublicHolidays();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <PublicHolidaysContext.Provider value={publicholidays}>
          <MantineProvider
            theme={{ colorScheme: 'light' }}
            withGlobalStyles
            withNormalizeCSS
          >
            <Component {...pageProps} basepath={basepath} />
            <Notifications />
          </MantineProvider></PublicHolidaysContext.Provider>
      </ColorSchemeProvider>
    </SessionProvider>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);

  const pageProps = { session, ...appProps.pageProps } || {}; // Extract pageProps object

  console.log('basePath' + basePath);
  //console.log('pageprops:' + { ...pageProps } + pageProps.title);
  //console.log(pageProps)
  //  console.log(pageProps.session())

  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',

    title: pageProps.title,
  };
};
