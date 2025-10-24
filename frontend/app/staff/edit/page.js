'use client';
import { Button, Card, Grid, LoadingOverlay, TextInput } from '@mantine/core';
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
import useStore from '@/components/stores/zstore.ts';
import { default as useRouter } from '@/components/useCustRouter';
import { setDatepickerPlDay } from '@/components/util/leaverequest.util';
import { useForm, yupResolver } from '@mantine/form';
import ContractTable from './ContractTable';
import { inputFields, staffModel } from './edit.util';

export default function EditStaff() {
  const { activeUser, status } = useStaffData();
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('Sucess');
  const [showAsError, setShowAsError] = useState(false);
  const { register, handleSubmit, reset } = useHookForm();
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const { setActiveContract, setActiveStaff, nextContractStartDate, basepath, fetchStaffData, publicHolidays, loadPublicHolidays } = useStore();
  const router = useRouter();
  const cookies = parseCookies();
  const tokenCookie = cookies.token;

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
    initialValues: staffModel,
    validateInputOnBlur: true,
    validate: yupResolver(validationSchema),
  });

  useEffect(() => {
    fetchStaffData(); // Use store's fetchStaffData
    setDatepickerPlDay(publicHolidays);
  }, [publicHolidays, fetchStaffData, loadPublicHolidays]); // loadPublicHolidays added if needed for refresh

  useEffect(() => {
    if (activeUser && activeUser.staff && activeUser.staff.length > 0) {
      const _staff = activeUser.staff[0];
      console.log(_staff);
      form.setValues(_staff); // Sync form with activeStaff from store
      setEditing(true);
      setActiveStaff(_staff);
      const activeContract = _staff.contracts.filter((contract) => contract.IsActive === true);
      setActiveContract(activeContract ? activeContract[0] : null);
    }
  }, [activeUser]);

  const handleModalClose = () => {
    setModalOpen(false);
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
    try {
      await validationSchema.validate(form.values, { abortEarly: false });

      const headers = {
        Authorization: `Bearer ${tokenCookie}`,
      };

      const response = await axios.put(`${basepath}/api/staff/${form.values.id}`, form.values, {
        headers,
      });

      if (response.status === 200) {
        setModalContent('Staff record updated successfully');
        setModalOpen(true);
        setEditing(true);
        fetchStaffData(); // Use store's fetchStaffData for refresh
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
      </Head>xxx
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
                        {...form.getInputProps(field.name)} // Use Mantine form props
                      />
                    )}
                  </Grid.Col>
                ))}
                {publicHolidays && (
                  <ContractTable
                    formValues={form.values}
                    setFormValues={form.setValues}
                    setModalOpen={setModalOpen}
                    setModalContent={setModalContent}
                    getStaffData={fetchStaffData}
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
                  onClick={fetchStaffData}
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
          {/* <Code>{JSON.stringify(form.values, null, 2)}</Code> */}
        </>
      ) : null}
    </MainShell>
  );
}