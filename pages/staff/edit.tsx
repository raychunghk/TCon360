import { useState, useEffect } from 'react';
import createContractForm from './createContractForm';
import { useForm as useHookForm } from 'react-hook-form';
import { parseCookies } from 'nookies';
import axios from 'axios';
import Head from 'next/head';
import { TextInput, Grid, Button, Text, Code, Card } from '@mantine/core';

import { useRouter } from 'next/router';

import Layout from '../../components/layout';
import MyCard from '../../components/MyCard';

import MyModal from '../../components/MyModal';
import { useDispatch, useSelector } from 'react-redux';
import { basepath } from '/global';
import UserStyle from '../../styles/User.module.css';
import {
  setStaff,
  setPublicHolidays,
  setBasepath,
} from 'pages/reducers/calendarReducer';
import { useForm } from '@mantine/form';
import { Param } from '@nestjs/common';
import { usePublicHolidays } from './usePublicHolidays';
import { format } from 'date-fns';
import { inputFields, staffModel } from './edit.util';
import { setDatepickerPlDay } from 'components/util/leaverequest.util';

import ContractTable from './ContractTable';
require('dotenv').config();

export default function EditStaff() {
  const { staff, user, staffVacation, calendarEvents } = useSelector(
    (state) => ({
      staff: state.calendar.staff,
      user: state.calendar.user,
      staffVacation: state.calendar.staffVacation,
      //  publicHolidays: state.calendar.publicHolidays,
      calendarEvents: state.calendar.calendarEvents,
    }),
  );

  const [formValues, setFormValues] = useState(staffModel);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('Sucess');
  const { register, handleSubmit, reset } = useHookForm();
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const router = useRouter();
  const cookies = parseCookies();
  const tokenCookie = cookies.token;
  const dispatch = useDispatch();
  const getStaffData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${tokenCookie}`,
      };

      const response = await axios.get(`${basepath}/api/user/myuser`, {
        headers,
      });

      if ([200, 201].includes(response.status)) {
        const _staff = response.data.staff[0];
        console.log(_staff);
        setFormValues(_staff);
        setEditing(true);
        dispatch(setStaff(_staff));
      }
    } catch (error) {
      console.error('Failed to fetch staff data:', error);
    }
  };
  const { publicHolidays, loadPublicHolidays } = usePublicHolidays();

  useEffect(() => {
    getStaffData();
    dispatch(setBasepath(basepath));
    setDatepickerPlDay(publicHolidays);
  }, [publicHolidays]);
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleInputChange = (event) => {
    let val = event.target.value;

    // Check if the value is a valid date
    if (val instanceof Date) {
      val = new Date(val);
      val.setHours(0, 0, 0, 0);
    }
    setFormValues({
      ...formValues,
      [event.target.name]: val,
    });
  };

  const onSubmit = async () => {
    setSubmitting(true);

    const headers = {
      Authorization: `Bearer ${tokenCookie}`,
    };

    try {
      const response = await axios.put(
        `${basepath}/api/staff/${formValues.id}`,
        formValues,
        { headers },
      );

      if (response.status === 200) {
        setModalContent('Staff record updated successfully');
        setModalOpen(true);
        setEditing(true);
        getStaffData();
      } else {
        console.error('Failed to update staff record:', response);
      }
    } catch (error) {
      console.error('Failed to update staff record:', error);
    }

    setSubmitting(false);
  };

  const form = useForm({
    initialValues: { ...formValues },
    validate: (values) => {
      const errors = {};

      inputFields.forEach((field) => {
        if (!values[field.name]) {
          errors[field.name] = `${field.label} is required`;
        } else if (field.type === 'number' && values[field.name] <= 0) {
          errors[field.name] = `${field.label} must be greater than 0`;
        } else if (
          field.type === 'text' &&
          field.subtype === 'email' &&
          !/^\S+@\S+$/.test(values[field.name])
        ) {
          errors[field.name] = 'Invalid email format';
        }
      });

      // if (values.ContractEndDate <= values.ContractStartDate) {
      //   errors.ContractEndDate =
      //     'Contract end date should be later than Contract start date';
      // }

      return errors;
    },
  });
  if (!user) {
    //router.push('/');
  }
  return (
    <Layout home>
      <Head>
        <title>Edit Staff Information</title>
      </Head>
      {user ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <MyCard title="Staff Info" cardwidth={800}>
              <Grid pb={20} pt={10}>
                {inputFields.map((field) => (
                  <Grid.Col span={4} key={field.name}>
                    {field.type === 'text' && (
                      <TextInput
                        label={field.label}
                        placeholder={field.label}
                        name={field.name}
                        onChange={handleInputChange}
                        disabled={!editing}
                        value={formValues[field.name]}
                      />
                    )}
                  </Grid.Col>
                ))}
                {publicHolidays && (
                  <ContractTable
                    formValues={formValues}
                    setFormValues={setFormValues}
                    setModalOpen={setModalOpen}
                    setModalContent={setModalContent}
                    getStaffData={getStaffData}
                  />
                )}
              </Grid>
              <Card.Section
                bg="indigo.2"
                py="md"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <Button
                  type="submit"
                  maw={250}
                  radius="md"
                  color="blue"
                  disabled={!editing || submitting}
                >
                  Save
                </Button>
                <Button
                  type="button"
                  maw={250}
                  radius="md"
                  color="cyan"
                  disabled={!editing || submitting}
                  onClick={getStaffData}
                >
                  test
                </Button>
              </Card.Section>
            </MyCard>
          </form>
          <MyModal
            open={modalOpen}
            onClose={handleModalClose}
            msg={modalContent}
          />
          <Code>{JSON.stringify(formValues, null, 2)}</Code>{' '}
        </>
      ) : null}
      {/* <Code>{JSON.stringify(publicHolidays)}</Code>
      <Code>{JSON.stringify(calendarEvents)}</Code> */}
    </Layout>
  );
}
