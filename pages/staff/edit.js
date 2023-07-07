import { useState, useEffect } from 'react';
import { useForm as useHookForm } from 'react-hook-form';
import { parseCookies } from 'nookies';
import axios from 'axios';
import Head from 'next/head';
import {
  TextInput,
  Grid,
  Button,
  Text,
  Code,
  Card,
  Modal
} from '@mantine/core';
import Layout from '../../components/layout';
import MyCard from '../../components/MyCard';
import MyModal from '../../components/MyModal';
import { basepath } from '/global';
import UserStyle from '../../styles/User.module.css';

require('dotenv').config();

export default function User() {
  const staffModel = {
    StaffName: '',
    AgentName: '',
    StaffCategory: '',
    Department: '',
    PostUnit: '',
    ManagerName: '',
    ManagerTitle: '',
    ManagerEmail: ''
    ,userId:''
    ,id:null
  };
  
  const [formValues, setFormValues] = useState(staffModel);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);
  const { register, handleSubmit, reset } = useHookForm();
  const cookies = parseCookies();
  const tokenCookie = cookies.token;

  useEffect(() => {
    const getStaffData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${tokenCookie}`
        };

        const response = await axios.get(`${basepath}/api/user/myuser`, { headers });

        if (response.status === 200) {
          const _staff = response.data.staff[0];
          console.log(_staff);
          setFormValues(_staff);
          setEditing(true)
        }
      } catch (error) {
        console.error('Failed to fetch staff data:', error);
      }
    };

    getStaffData();
  }, []);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = async () => {
    setSubmitting(true);

    const headers = {
      Authorization: `Bearer ${tokenCookie}`
    };

    try {
      const response = await axios.put(`${basepath}/api/staff/${formValues.id}`, formValues, { headers });

      if (response.status === 200) {
        setModalOpen(true);
        setEditing(false);
      } else {
        console.error('Failed to update staff record:', response);
      }
    } catch (error) {
      console.error('Failed to update staff record:', error);
    }

    setSubmitting(false);
  };
  return (
    <Layout home>
      <Head>
        <title>User Information</title>
      </Head>

      <form onSubmit={handleSubmit(onSubmit)}>
        <MyCard title="Staff Info">
          <Grid pb={30}>
            <Grid.Col span={6}>
              <TextInput label="Staff Name" placeholder="Staff name" {...register('StaffName', { required: true })}
                onChange={handleInputChange} disabled={!editing} value={formValues.StaffName} />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput label="Agent name" placeholder="Agentname" name="AgentName" onChange={handleInputChange}
                disabled={!editing} value={formValues.AgentName} />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput label="Staff category" placeholder="Staff category" name="StaffCategory" onChange={handleInputChange}
                disabled={!editing} value={formValues.StaffCategory} />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput label="Department" placeholder="Department" name="Department" onChange={handleInputChange}
                disabled={!editing} value={formValues.Department} />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput label="Post unit" placeholder="Post unit" name="PostUnit" onChange={handleInputChange}
                disabled={!editing} value={formValues.PostUnit} />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput label="Manager name" placeholder="Manager name" name="ManagerName" onChange={handleInputChange}
                disabled={!editing} value={formValues.ManagerName} />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput label="Manager title" placeholder="Manager title" name="ManagerTitle" onChange={handleInputChange}
                disabled={!editing} value={formValues.ManagerTitle} />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput label="Manager email" placeholder="Manager email" name="ManagerEmail" onChange={handleInputChange}
                disabled={!editing} value={formValues.ManagerEmail} />
            </Grid.Col>
          </Grid>

          <Button type="submit" variant="outline" color="blue" disabled={!editing || submitting}>
            Save
          </Button>
        </MyCard>
      </form>

      <MyModal isOpen={modalOpen} onClose={handleModalClose}>
        <Text align="center" size="lg">
          Staff record updated successfully!
        </Text>
        <Code>{JSON.stringify(formValues, null, 2)}</Code>
      </MyModal>
    </Layout>
  );
}