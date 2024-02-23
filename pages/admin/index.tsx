import { GetServerSideProps, GetStaticProps } from 'next';
import { useState, useEffect } from 'react';
import { useForm as useHookForm } from 'react-hook-form';
import {
  TextInput,
  Checkbox,
  Code,
  Text,
  Stack,
  Tabs,
  Modal,
} from '@mantine/core';
import Layout from '../../components/layout';
import { IconCalendarEvent, IconUser } from '@tabler/icons';
import Head from 'next/head';
import useStore from 'pages/reducers/zstore';
import { parseCookies } from 'nookies';
import commonstyle from '../../styles/common.module.css';
import axios from 'axios';
import { useForm as uForm } from 'react-hook-form';
import UserManagementTab from './UserManagerTab';
import CalendarManagementTab from './CalendarManagerTab';
import { useRouter } from 'next/router';

const Admin = (props) => {
  const { register, handleSubmit, reset } = useHookForm();
  const { basepath, initialActiveTab = 'userManagement' } = props; // Added initialActiveTab prop
  const [formValues, setFormValues] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { activeUser } = useStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(initialActiveTab); // Set initial active tab
  useEffect(() => {
    const { tab } = router.query;
    console.log('tab?', tab);
    if (tab === 'calendarManagement') {
      setActiveTab('calendarManagement');
    }
  }, []);
 
  if (activeUser?.role?.name !== 'admin') {
    return (
      <Layout home>
        <Head>
          <title>Admin</title>
        </Head>
        <p>Sorry, you are not authorized to access this page.</p>
      </Layout>
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
      const response = await axios.put(
        `${basepath}/api/admin/${formValues.id}`,
        formValues,
        { headers },
      );

      if (response.status === 200) {
      } else {
        console.error('Failed to update staff record:', response);
      }
    } catch (error) {
      console.error('Failed to update staff record:', error);
    }

    setSubmitting(false);
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <Layout home>
      <Head>
        <title>Admin</title>
      </Head>

      <Tabs
        defaultValue={initialActiveTab}
        value={activeTab}
        onChange={handleTabChange}
        style={{ width: '100%', height: '100%' }}
      >
        <Tabs.List>
          <Tabs.Tab value="userManagement" leftSection={<IconUser />}>
            User Management
          </Tabs.Tab>
          <Tabs.Tab
            value="calendarManagement"
            leftSection={<IconCalendarEvent />}
          >
            Calendar Management
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel
          value="userManagement"
          pt="xs"
          style={{ width: '100%', height: '100%' }}
        >
          <UserManagementTab />
        </Tabs.Panel>

        <Tabs.Panel value="calendarManagement" pt="xs">
          <CalendarManagementTab />
        </Tabs.Panel>
      </Tabs>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default Admin;
