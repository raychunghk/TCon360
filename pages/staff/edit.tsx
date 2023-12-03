import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import createContractForm from './CreateContractForm';
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
import { useForm, yupResolver } from '@mantine/form';
import { Param } from '@nestjs/common';
//import { usePublicHolidays } from '. /usePublicHolidays';
import { usePublicHolidays } from 'components/util/usePublicHolidays';
import { setDatepickerPlDay } from 'components/util/leaverequest.util';
import { format } from 'date-fns';
import { inputFields, staffModel } from './edit.util';
import useStore from 'pages/reducers/zstore';
import ContractTable from './ContractTable';
import { useStaffData } from 'components/useStaffData';
require('dotenv').config();

export default function EditStaff() {
  const { staff, user, staffVacation, calendarEvents } = useSelector(
    (state) => ({
      staff: state.calendar.staff,
      // user: state.calendar.user,
      staffVacation: state.calendar.staffVacation,
      //  publicHolidays: state.calendar.publicHolidays,
      calendarEvents: state.calendar.calendarEvents,
    }),
  );
  const { activeUser, activeStaff, activeContract, isAuthenticated } =
    useStaffData();
  const [formValues, setFormValues] = useState(staffModel);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('Sucess');
  const { register, handleSubmit, reset } = useHookForm();
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const setActiveContract = useStore((state) => state.setActiveContract);
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
        form.setValues(_staff);
        dispatch(setStaff(_staff));
        const activeContract = _staff.contracts.filter(
          (contract) => contract.IsActive === true,
        );
        setActiveContract(activeContract ? activeContract[0] : null);
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
    form.setValues({
      ...formValues,
      [event.target.name]: val,
    });
  };

  const onSubmit = (values) => {
    console.log('values para', values);
    console.log('form errors', form.errors);
    console.log('form is valid', form.isValid());
    console.log('submit values', form.values);
  };
  const submitform = async () => {
    setSubmitting(true);
    console.log('form errors', form.errors);
    console.log('form is valid', form.isValid());
    console.log('submit values', form.values);
    console.log('formvalues', formValues);
    try {
      await validationSchema.validate(formValues, { abortEarly: false });

      const headers = {
        Authorization: `Bearer ${tokenCookie}`,
      };

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
      setErrors({});
    } catch (err) {
      console.error('Failed to update staff record:', err);
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      setSubmitting(false);
    }

    setSubmitting(false);
  };
  const validationSchema = Yup.object().shape({
    StaffName: Yup.string().required('Name of Staff is required'),
    AgentName: Yup.string().required('Name of T-contractor is required'),
    StaffCategory: Yup.string().required('Staff category is required'),
    ManagerName: Yup.string().required('Manager name is required'),
    ManagerTitle: Yup.string().required('Manager title is required'),
    ManagerEmail: Yup.string()
      .email('Invalid email format')
      .required('Manager email is required'),
    Department: Yup.string().required('Department is required'),
    PostUnit: Yup.string().required('Post unit is required'),
  });

  const form = useForm({
    initialValues: { ...formValues },
    validateInputOnBlur: true,
    validate: yupResolver(validationSchema),
  });
  if (!activeUser) {
    //router.push('/');
  }
  return (
    <Layout home>
      <Head>
        <title>Edit Staff Information</title>
      </Head>
      {activeUser ? (
        <>
          <form name="frmHeader" onSubmit={handleSubmit(submitform)}>
            {/* <form onSubmit={form.onSubmit((values) => submitform(values))}> */}
            <MyCard title="Staff Info" cardwidth={800}>
              <Grid pb={20} pt={10}>
                {inputFields.map((field, id) => (
                  <Grid.Col span={4} key={field.name}>
                    {field.type === 'text' && (
                      <TextInput
                        label={field.label}
                        placeholder={field.label}
                        name={field.name}
                        value={formValues[field.name]}
                        onChange={handleInputChange}
                        error={errors[field.name]}
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
                    edting={editing}
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
    </Layout>
  );
}
