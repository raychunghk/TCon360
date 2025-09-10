'use client';
import { Button, Card, Code, Grid, LoadingOverlay, TextInput } from '@mantine/core';
import axios from 'axios';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { useForm as useHookForm } from 'react-hook-form';
import * as Yup from 'yup';

import { MainShell } from '@/components/MainShell/MainShell';
import MyCard from '@/components/MyCard';
import MyModal from '@/components/MyModal';
import { useStaffData } from '@/components/hooks/useStaffData';
import useStore from '@/components/stores/zstore.js';
import { default as useRouter } from '@/components/useCustRouter';
import { setDatepickerPlDay } from '@/components/util/leaverequest.util';
import { usePublicHolidays } from '@/components/util/usePublicHolidays';
import { useForm, yupResolver } from '@mantine/form';
import { format } from 'date-fns';
import ContractTable from './ContractTable';
import { inputFields, staffModel } from './edit.util';

export default function EditStaff() {
  const { activeUser, status } = useStaffData();
  const [formValues, setFormValues] = useState(staffModel);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('Sucess');
  const [showAsError, setShowAsError] = useState(false);
  const { register, handleSubmit, reset } = useHookForm();
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const { setActiveContract, setActiveStaff, nextContractStartDate, basepath } = useStore();
  const router = useRouter();
  const cookies = parseCookies();
  const tokenCookie = cookies.token;

  const getStaffData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${tokenCookie}`,
      };
      const url = `${basepath}/api/user/myuser`
      console.log(`my user url:`, url);
      const response = await axios.get(url, {
        headers,
      });

      if ([200, 201].includes(response.status)) {
        const _staff = response.data.staff[0];
        console.log(_staff);
        setFormValues(_staff);
        setEditing(true);
        form.setValues(_staff);
        setActiveStaff(_staff);
        const activeContract = _staff.contracts.filter((contract) => contract.IsActive === true);
        setActiveContract(activeContract ? activeContract[0] : null);
      }
    } catch (error) {
      console.error('Failed to fetch staff data:', error);
      if (error.response.status === 401) {
        setModalContent('User Session Expired, logout in 10 seconds');
        setModalOpen(true);
        setShowAsError(true);
        const timeout = setTimeout(() => {
          console.log('Logging out, now is:', format(Date.now(), 'yyyy-MM-dd hh:mm:ss'));
          router.push('/');
        }, 5 * 1000);

        return () => clearTimeout(timeout);
      }
    }
  };

  const { publicHolidays, loadPublicHolidays } = usePublicHolidays();

  useEffect(() => {
    getStaffData();
    setDatepickerPlDay(publicHolidays);
  }, [publicHolidays]);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleInputChange = (event) => {
    let val = event.target.value;
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

      const response = await axios.put(`${basepath}/api/staff/${formValues.id}`, formValues, {
        headers,
      });

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
    ManagerEmail: Yup.string().email('Invalid email format').required('Manager email is required'),
    Department: Yup.string().required('Department is required'),
    PostUnit: Yup.string().required('Post unit is required'),
  });

  const form = useForm({
    initialValues: { ...formValues },
    validateInputOnBlur: true,
    validate: yupResolver(validationSchema),
  });

  if (!basepath || status === 'loading') {
    return (
      <MainShell>
        <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      </MainShell>
    );
  }

  return (
    <MainShell home>
      <Head>
        <title>Edit Staff Information</title>
      </Head>
      {activeUser ? (
        <>
          <form name="frmHeader" onSubmit={handleSubmit(submitform)}>
            <MyCard title="Staff Info" cardwidth={850}>
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
                style={{
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
            isError={showAsError}
          />
          <Code>{JSON.stringify(formValues, null, 2)}</Code>
        </>
      ) : null}
    </MainShell>
  );
}