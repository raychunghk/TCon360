'use client';
import { useState, useEffect } from 'react';

import { Text, Stack, Tabs } from '@mantine/core';
import { MainShell } from '@/components/MainShell/MainShell';
import Head from 'next/head';
import useStore from '@/components/stores/zstore';
import axios from 'axios';
import UserManagementTab from '@/components/admin/UserManagerTab';
import CalendarManagementTab from '@/components/admin/CalendarManagerTab';

import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';

import { IconCalendarEvent, IconUser, IconSunMoon } from '@tabler/icons-react';
import { useShallow } from 'zustand/react/shallow';
import { useSearchParams } from 'next/navigation';
import { parseCookies } from 'nookies';
export default function Page() {

  const [formValues, setFormValues] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [activeUser, basepath] = useStore(
    useShallow((state) => [state.activeUser, state.basepath])
  );
  const [activeTab, setActiveTab] = useState('userManagement');
  const searchParams = useSearchParams();

  useEffect(() => {
    const tabId = searchParams.get('tab');
    if (tabId === 'calendarManagement') {
      setActiveTab('calendarManagement');
    }
  }, [searchParams]);

  if (!activeUser || activeUser?.role?.name !== 'admin') {
    return (
      <MainShell contentpadding="20px">
        <Head>
          <title>Admin</title>
        </Head>
        <p>
          {activeUser
            ? 'Sorry, you are not authorized to access this page.'
            : 'Loading...'}
        </p>
      </MainShell>
    );
  }

  const onSubmit = async () => {
    setSubmitting(true);
    try {
      if (formValues) {
        /*const cookies = document.cookie.split('; ');
        const tokenCookie = cookies.find((cookie) => cookie.startsWith('token='));
        */
        const cookies = parseCookies();
        const tokenCookie = cookies.token;
        const token = tokenCookie ? tokenCookie.split('=')[1] : null;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.put(
          `${basepath}/api/admin/${formValues.id}`,
          formValues,
          { headers }
        );

        if (response.status !== 200) {
          console.error('Failed to update record:', response);
        }
      }
    } catch (error) {
      console.error('Failed to update record:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MainShell contentpadding="20px">
      <Head>
        <title>Admin</title>
      </Head>

      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        onChange={setActiveTab}
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
        </Tabs.Panel>
        <Tabs.Panel value="themeManagement" pt="xs">
          <ColorSchemeToggle />
        </Tabs.Panel>
      </Tabs>
    </MainShell>
  );
};

