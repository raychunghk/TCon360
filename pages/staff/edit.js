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
  Modal,
  NumberInput,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { DatePickerInput, DateTimePicker } from '@mantine/dates';
import Layout from '../../components/layout';
import MyCard from '../../components/MyCard';
import StaffFormGrid from '../../components/StaffFormGrid';
import MyModal from '../../components/MyModal';
import { useDispatch, useSelector } from 'react-redux';
import { basepath } from '/global';
import UserStyle from '../../styles/User.module.css';
import {
  clearAllState,
  setUser,
  setStaff,
} from 'pages/reducers/calendarReducer';
import { useForm } from '@mantine/form';
require('dotenv').config();

export default function EditStaff() {
  const { staff, user, staffVacation } = useSelector((state) => ({
    staff: state.calendar.staff,
    user: state.calendar.user,
    staffVacation: state.calendar.staffVacation,
  }));
  const staffModel = {
    StaffName: '',
    AgentName: '',
    StaffCategory: '',
    Department: '',
    PostUnit: '',
    ManagerName: '',
    ManagerTitle: '',
    ManagerEmail: '',
    ContractStartDate: new Date(),
    ContractEndDate: new Date(),
    AnnualLeave: 0,
    userId: '',
    id: null,
  };
  const [formValues, setFormValues] = useState(staffModel);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useHookForm();
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

  useEffect(() => {
    getStaffData();
  }, []);

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
  const inputFields = [
    {
      label: 'Name of Staff',
      name: 'StaffName',
      type: 'text',
    },
    {
      label: 'Name of T-contractor',
      name: 'AgentName',
      type: 'text',
    },
    {
      label: 'Staff category',
      name: 'StaffCategory',
      type: 'text',
    },
    {
      label: 'Department',
      name: 'Department',
      type: 'text',
    },
    {
      label: 'Post unit',
      name: 'PostUnit',
      type: 'text',
    },
    {
      label: 'Manager name',
      name: 'ManagerName',
      type: 'text',
    },
    {
      label: 'Manager title',
      name: 'ManagerTitle',
      type: 'text',
    },
    {
      label: 'Manager email',
      name: 'ManagerEmail',
      type: 'text',
      subtype: 'email',
    },

    {
      label: 'Contract Start Date',
      name: 'ContractStartDate',
      type: 'date',
    },
    {
      label: 'Contract End Date',
      name: 'ContractEndDate',
      type: 'date',
    },
    {
      label: 'Annual Leave',
      name: 'AnnualLeave',
      type: 'number',
    },
  ];
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

      if (values.ContractEndDate <= values.ContractStartDate) {
        errors.ContractEndDate =
          'Contract end date should be later than Contract start date';
      }

      return errors;
    },
  });
  if (!user) {
    router.push('/');
  }
  return (
    <Layout home>
      <Head>
        <title>User Information</title>
      </Head>

      <form onSubmit={handleSubmit(onSubmit)}>
        <MyCard title="Staff Info">
          {/* <StaffFormGrid
            formValues={formValues}
            handleInputChange={handleInputChange}
            editing={editing}
          /> */}
          <Grid pb={30} pt={30}>
            {inputFields.map((field) => (
              <Grid.Col span={6} key={field.name}>
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
                {field.type === 'number' && (
                  <NumberInput
                    label={field.label}
                    placeholder={field.label}
                    name={field.name}
                    onChange={handleInputChange}
                    disabled={!editing}
                    value={formValues[field.name]}
                  />
                )}
                {field.type === 'date' && (
                  // <DatePickerInput
                  //   label={field.label}
                  //   name={field.name}
                  //   onChange={handleInputChange}
                  //   disabled={!editing}
                  //   value={formValues[field.name]}
                  // />
                  <DatePickerInput
                    clearable
                    label={field.label}
                    name={field.name}
                    onChange={(date) =>
                      handleInputChange({
                        target: {
                          name: field.name,
                          value: date,
                        },
                      })
                    }
                    value={new Date(formValues[field.name])}
                    valueFormat="DD-MM-YYYY"
                    firstDayOfWeek={0}

                    // excludeDate={excludeHoliday}
                    // renderDay={myRenderDay}
                  />
                )}
              </Grid.Col>
            ))}
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
          </Card.Section>
        </MyCard>
      </form>

      <MyModal
        open={modalOpen}
        onClose={handleModalClose}
        msg={' Staff record updated successfully!'}
      />
      {/* <Code>{JSON.stringify(formValues, null, 2)}</Code> */}
    </Layout>
  );
}
