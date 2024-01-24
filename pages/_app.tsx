import { format, parseISO, isWeekend, differenceInSeconds } from 'date-fns';
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
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { basePath } from 'src/shared/constants/env';
import { destroyCookie, parseCookies } from 'nookies';
import session from 'express-session';
interface CustomSessionProviderProps extends SessionProviderProps {
  token: string;
}
import { GlobalStyles } from '@mantine/core';
import '../styles/styles.css';
import axios from 'axios';

import { Provider } from 'react-redux';
import { store } from './reducers/store';
import { ModalsProvider } from '@mantine/modals';
import useStore from './reducers/zstore';
import { useShallow } from 'zustand/react/shallow';
import useTokenExpiration from 'components/useTokenExpiration';
import { usePublicHolidays } from 'components/util/usePublicHolidays';

// Create a context for publicholidays
export const PublicHolidaysContext = createContext(null);

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;

  const title = pageProps.title || 'TCon360 - T Contractor Timesheet Manager';
  const basepath = props.router.basePath;

  const cookies = parseCookies();
  const token = cookies.token;

  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme,
  );
  //const [publicholidays, setPublicHolidays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [
    activeContract,
    setActiveContract,
    activeStaff,
    setActiveStaff,
    activeUser,
    setActiveUser,
    userStatus,

    setPublicHolidays,
  ] = useStore(
    useShallow((state) => [
      state.activeContract,
      state.setActiveContract,
      state.activeStaff,
      state.setActiveStaff,
      state.activeUser,
      state.setActiveUser,
      state.userStatus,

      state.setPublicHolidays,
    ]),
  );

  console.log('props?', props);

  //console.log('base path?', basepath);

  const router = useRouter();
  //console.log('router path name?' + router.pathname);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };
  const { publicHolidays, loading, loadPublicHolidays } = usePublicHolidays();
  // useEffect(() => {
  //   const loadPublicHolidays = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${basepath}/api/timesheet/publicholidays`,
  //       );
  //       const data = response.data;
  //       const formattedPublicHolidays = data.map((holiday) => ({
  //         Summary: holiday.Summary,

  //         StartDate: format(new Date(holiday.StartDate), 'M/d/yyyy'),
  //       }));
  //       console.log('formatted public holidays?', formattedPublicHolidays);

  //       setPublicHolidays(formattedPublicHolidays);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error('error', error);
  //     }
  //   };
  //   loadPublicHolidays();
  // }, []);
  useTokenExpiration();

  return (
    <Provider store={store}>
      <SessionProvider
        session={pageProps.session}
        basePath={`${basepath}/api/auth`}
        token={token}
        {...(null as CustomSessionProviderProps)}
      >
        <Head>
          <title>{title}</title>

          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <link rel="shortcut icon" href={`${basepath}/favicon.svg`} />
          <link rel="stylesheet" href={`${basepath}/styles/globals.css`} />
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
          {/* <PublicHolidaysContext.Provider value={publicHolidays}> */}
          <MantineProvider
            theme={{ colorScheme: 'light' }}
            withGlobalStyles
            withNormalizeCSS
          >
            {' '}
            <ModalsProvider>
              <Component {...pageProps} basepath={basepath} token={token} />
              <Notifications />
            </ModalsProvider>
          </MantineProvider>
          {/* </PublicHolidaysContext.Provider> */}
        </ColorSchemeProvider>
      </SessionProvider>
    </Provider>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);

  const pageProps = { session, ...appProps.pageProps } || {}; // Extract pageProps object
  console.log('sesson in _app.tsx', session);

  console.log('basePath' + basePath);

  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',

    title: pageProps.title,
  };
};
