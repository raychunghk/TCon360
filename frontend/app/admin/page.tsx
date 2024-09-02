'use client';
import { GetServerSideProps, GetStaticProps } from 'next';
import { useState, useEffect } from 'react';
import { useForm as useHookForm } from 'react-hook-form';
import { TextInput, Checkbox, Code, Text, Stack, Tabs, Modal } from '@mantine/core';
import { MainShell } from '@/components/MainShell/MainShell';
import Head from 'next/head';
import useStore from '@/components/stores/zstore';
import { parseCookies } from 'nookies';
import commonstyle from '@/styles/common.module.css';
import axios from 'axios';
import { useForm as uForm } from 'react-hook-form';
import UserManagementTab from './UserManagerTab';
import CalendarManagementTab from './CalendarManagerTab';
import { default as useRouter } from '@/components/useCustRouter';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';

import { IconCalendarEvent, IconUser, IconSunMoon } from '@tabler/icons-react';
import { useShallow } from 'zustand/react/shallow';
import { useSearchParams } from 'next/navigation';
const Page = () => {
  const { register, handleSubmit, reset } = useHookForm();
  //const { basepath, initialActiveTab = 'userManagement' } = props; // Added initialActiveTab prop
  const [formValues, setFormValues] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  const [activeUser, basepath] = useStore(
    useShallow((state) => [state.activeUser, state.basepath])
  );
  const initialTab = 'userManagement';
  const [activeTab, setActiveTab] = useState(initialTab); // Set initial active tab
  const searchParams = useSearchParams();

  const tabid = searchParams.get('tab') ?? 'userManagement'; // default value is "1"

  useEffect(() => {
    //onst { tab } = tabid;
    console.log('tabid?', tabid);
    if (tabid === 'calendarManagement') {
      setActiveTab('calendarManagement');
    }
  }, []);

  if (!activeUser) {
    return (
      <MainShell home>
        <Head>
          <title>Admin</title>
        </Head>
        <p>Loading...</p>
      </MainShell>
    );
  }
  if (activeUser?.role?.name !== 'admin') {
    return (
      <MainShell home>
        <Head>
          <title>Admin</title>
        </Head>
        <p>Sorry, you are not authorized to access this page.</p>
      </MainShell>
    );
  }

  const onSubmit = async () => {
    setSubmitting(true);
    const cookies = parseCookies();
    const tokenCookie = cookies.token;
    const headers = {
      Authorization: `Bearer ${tokenCookie}`,
    };

    try {
      const response = await axios.put(`${basepath}/api/admin/${formValues.id}`, formValues, {
        headers,
      });

      if (response.status === 200) {
      } else {
        console.error('Failed to update staff record:', response);
      }
    } catch (error) {
      console.error('Failed to update staff record:', error);
    }

    setSubmitting(false);
  };

  const handleTabChange = (value: String) => {
    setActiveTab(value);
  };

  return (
    <MainShell home>
      <Head>
        <title>Admin</title>
      </Head>

      <Tabs
        defaultValue={initialTab}
        value={activeTab}
        onChange={handleTabChange}
        style={{ width: '100%', height: '100%' }}
      >
        <Tabs.List>
          <Tabs.Tab value="userManagement" leftSection={<IconUser />}>
            User Management
          </Tabs.Tab>
          <Tabs.Tab value="calendarManagement" leftSection={<IconCalendarEvent />}>
            Calendar Management
          </Tabs.Tab>
          <Tabs.Tab value="themeManagement" leftSection={<IconSunMoon />}>
            Change Theme
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="userManagement" pt="xs" style={{ width: '100%', height: '100%' }}>
          <UserManagementTab />
        </Tabs.Panel>
        <Tabs.Panel value="calendarManagement" pt="xs">
          <CalendarManagementTab />
        </Tabs.Panel>{' '}
        <Tabs.Panel value="themeManagement" pt="xs">
          <ColorSchemeToggle />
        </Tabs.Panel>
      </Tabs>
    </MainShell>
  );
};

export default Page;
