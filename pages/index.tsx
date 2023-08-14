import { FrontPageCalendar } from '../components/Calendar/FrontPageCalendar';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import Layout, { siteTitle } from '../components/layout';
import { useState } from 'react';
import {
  Text,
  useMantineTheme,
  Drawer
} from '@mantine/core';
import Head from 'next/head';
import LeaveRequestForm from '../components/LeaveRequest/LeaveRequestForm';
 
export default function HomePage(props) {
  console.log('homepage basepath?')

  const theme = useMantineTheme();
  
  return (
    <Layout home>
      <Head>
        <title>Home Page</title>
      </Head>


      <FrontPageCalendar {...props}/>
      {/* <ColorSchemeToggle /> */}
      
    </Layout>
  );
}

/*
  
*/
