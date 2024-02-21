import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import { useForm as useHookForm } from 'react-hook-form';
import {
  TextInput,
  Checkbox,
  Code,
  Text,
  Stack,
  Input,
  Tabs,
  Modal,
} from '@mantine/core';
import Layout from '../../components/layout';

import Head from 'next/head';
import useStore from 'pages/reducers/zstore';
import { parseCookies } from 'nookies';
import commonstyle from '../../styles/common.module.css';
import axios from 'axios';
import { useForm as uForm } from 'react-hook-form';
import UserManagementTab from './UserManagerTab';
import CalendarManagementTab from './CalendarManagerTab';

const Admin = (props) => {
  const { register, handleSubmit, reset } = useHookForm();
  const { basepath } = props;
  const [formValues, setFormValues] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { activeUser } = useStore();

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
    useEffect(() => {
      console.log('active user?', activeUser);
    }, []);
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
  const [activeTab, setActiveTab] = useState('userManagement');

  const handleTabChange = (value) => {
    setActiveTab(value);
  };
  return (
    <Layout home>
      <Head>
        <title>Admin</title>
      </Head>

      <Tabs
        defaultValue="userManagement"
        onChange={handleTabChange}
        style={{ width: '100%', height: '100%' }}
      >
        <Tabs.List>
          <Tabs.Tab value="userManagement">User Management</Tabs.Tab>
          <Tabs.Tab value="calendarManagement">Calendar Management</Tabs.Tab>
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
