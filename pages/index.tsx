import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import AppShellNavBar from '../components/NavBar/NavBar';
import Layout, { siteTitle } from '../components/layout';
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
import Head from 'next/head';

export default function HomePage() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <Layout home>
      <Head>
        <title>Home Page</title>
      </Head>
      <Welcome />
      <ColorSchemeToggle />
      <Text>Resize app to see responsive navbar in action</Text>
    </Layout>
  );
}

/*
  
*/
