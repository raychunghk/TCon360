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
  Button,
  Grid,
  Center,
  Card,
  CardSection,
  Container,
} from '@mantine/core';
import Layout from '../../components/layout';
import MyCard from '../../components/MyCard';
import Head from 'next/head';

import MyModal from '../../components/MyModal';
import { parseCookies } from 'nookies';
import UserStyle from '../../styles/User.module.css';
import axios from 'axios';
import { useForm as uForm } from 'react-hook-form';
import UserManagementTab from './UserManagerTab';
import CalendarManagementTab from './CalendarManagerTab';

const Admin = (props) => {
  const { register, handleSubmit, reset } = useHookForm();
  const { basepath } = props;
  const [formValues, setFormValues] = useState(null);
  const [submitting, setSubmitting] = useState(false);
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
  const [activeTab, setActiveTab] = useState('userManagement');

  const handleTabChange = (value) => {
    setActiveTab(value);
  };
  return (
    <Layout home>
      <Head>
        <title>Admin</title>
      </Head>
      <Container p="xl">
        <Tabs defaultValue="userManagement" onChange={handleTabChange}>
          <Tabs.List>
            <Tabs.Tab value="userManagement">User Management</Tabs.Tab>
            <Tabs.Tab value="calendarManagement">Calendar Management</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="userManagement" pt="xs">
            <UserManagementTab />
          </Tabs.Panel>

          <Tabs.Panel value="calendarManagement" pt="xs">
            <CalendarManagementTab />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default Admin;
function register(
  arg0: string,
  arg1: { required: boolean },
): import('react').JSX.IntrinsicAttributes &
  import('@mantine/core').TextInputProps &
  import('react').RefAttributes<HTMLInputElement> {
  throw new Error('Function not implemented.');
}
