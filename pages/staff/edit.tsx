import { useState, useEffect } from 'react';
import createContractForm from './createContractForm';
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
  Switch,
  NumberInput,
  useMantineTheme,
  Stack,
  Flex,
  Title,
  Paper,
} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { DatePickerInput, DateTimePicker } from '@mantine/dates';
import Layout from '../../components/layout';
import MyCard from '../../components/MyCard';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  MRT_EditActionButtons,
} from 'mantine-react-table';
import MyModal from '../../components/MyModal';
import { useDispatch, useSelector } from 'react-redux';
import { basepath } from '/global';
import UserStyle from '../../styles/User.module.css';
import {
  clearAllState,
  setUser,
  setStaff,
  setPublicHolidays,
} from 'pages/reducers/calendarReducer';
import { useForm } from '@mantine/form';
import { Param } from '@nestjs/common';
import { usePublicHolidays } from './usePublicHolidays';
import { format } from 'date-fns';
import EditIsActiveCell, {
  AnnualLeaveEditor,
  DateCell,
  EditContractModalContent,
  createEditDateColumn,
  inputFields,
  staffModel,
} from './edit.util';
import {
  excludeHoliday,
  myRenderDay,
  setDatepickerPlDay,
} from 'components/util/leaverequest.util';
import CreateContractForm from './createContractForm';
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
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useHookForm();
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('Sucess');
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
    setDatepickerPlDay(publicHolidays);
  }, [publicHolidays]);
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 60,
      enableEditing: false,
    },
    {
      accessorKey: 'ContractStartDate',
      header: 'Contract Start Date',

      Edit: (param) =>
        createEditDateColumn(
          param,
          'ContractStartDate',
          'Contract Start Date',
          formValues,
          setFormValues,
          excludeHoliday,
          myRenderDay,
        ),

      Cell: DateCell,
    },
    {
      accessorKey: 'ContractEndDate',
      header: 'Contract End Date',

      Edit: (param) =>
        createEditDateColumn(
          param,
          'ContractEndDate',
          'Contract End Date',
          formValues,
          setFormValues,
          excludeHoliday,
          myRenderDay,
        ),
      Cell: DateCell,
    },

    {
      accessorKey: 'AnnualLeave',
      header: 'Annual leave',
      size: 100,

      Edit: (param) => AnnualLeaveEditor(param, formValues, setFormValues),
      enableEditing: true,
    },
    {
      accessorKey: 'IsActive',
      header: 'Is Active',
      size: 100,
      enableEditing: true,
      Cell: (param) => (
        <Text>{param.cell.getValue() ? 'Active' : 'Inactive'}</Text>
      ),
      Edit: (param) => EditIsActiveCell(param, formValues, setFormValues),
    },
  ];

  const handleSaveRow = async (rowEditEvent) => {
    setSaving(true);
    const { row, values, exitEditingMode } = rowEditEvent;

    try {
      // Submit the contract to the API
      //const apiurl = `${basepath}/api/staff/contract/${values.id}`;
      const apiurl = `${basepath}/api/staff/updatecontracts`;

      const contract = formValues.contracts.filter((f) => f.id === values.id);
      const contractResponse = await axios.put(apiurl, formValues.contracts);
      if (contractResponse.status === 200) {
        // Call getStaffData() to refresh the staff data
        setModalContent('Staff contract updated successfully');
        setModalOpen(true);
        await getStaffData();
      } else {
        // Display error message using Mantine modal
        setModalContent(contractResponse.data.message);
        setModalOpen(true);
      }
      // if (contract.length > 0) {
      //   const contractStartDate = contract[0].ContractStartDate;
      //   const contractEndDate = contract[0].ContractEndDate;

      //   const updatecontract = {
      //     ContractStartDate:
      //       typeof contractStartDate === 'string'
      //         ? new Date(contractStartDate)
      //         : contractStartDate,
      //     ContractEndDate:
      //       typeof contractEndDate === 'string'
      //         ? new Date(contractEndDate)
      //         : contractEndDate,
      //     AnnualLeave: contract[0].AnnualLeave,
      //     IsActive: contract[0].IsActive,
      //   };
      //   console.log('update value from formvalues', updatecontract);

      //   const contractResponse = await axios.put(apiurl, updatecontract);
      //   if (contractResponse.status === 200) {
      //     // Call getStaffData() to refresh the staff data
      //     setModalContent('Staff contract updated successfully');
      //     setModalOpen(true);
      //     await getStaffData();
      //   } else {
      //     // Display error message using Mantine modal
      //     setModalContent(contractResponse.data.message);
      //     setModalOpen(true);
      //   }
      // }
      // Handle the response and perform necessary actions
      // ...

      // Exit editing mode
    } catch (error) {
      // Handle error
      setModalContent(error.message);
      setModalOpen(true);
    }
    exitEditingMode();
    setSaving(false);
    // Handle saving the edited row here
  };
  const clearCacheData = () => {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
    alert('Complete Cache Cleared');
  };
  const table =
    publicHolidays &&
    useMantineReactTable({
      columns,
      data: formValues.contracts,
      createDisplayMode: 'row',
      editDisplayMode: 'modal',
      renderEditRowModalContent: (params) =>
        EditContractModalContent(params, 'Update Contract'),
      onEditingRowSave: handleSaveRow,
      enableColumnResizing: true,
      enableEditing: true,
      renderTopToolbarCustomActions: () => (
        <Button
          color="secondary"
          variant="filled"
          onClick={() => setCreateModalOpen(true)}
        >
          Create New Account
        </Button>
      ),
      mantineEditTextInputProps: ({ cell }) => ({
        onBlur: (event) => {},
      }),
      positionActionsColumn: 'last',
      initialState: {
        columnVisibility: {
          'mrt-row-expand': false,
        },
      },
      mantineTableContainerProps: {
        sx: {
          minHeight: '200px',
        },
      },
      state: {
        isLoading: loading,
        isSaving: saving,
      },
    });

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
  const handleCreateNewContract = () => {
    getStaffData();
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
  const handleFormToggle = () => {
    setCreateModalOpen(!createModalOpen);
  };
  return (
    <Layout home>
      <Head>
        <title>User Information</title>
      </Head>

      <form onSubmit={handleSubmit(onSubmit)}>
        <MyCard title="Staff Info" cardwidth={800}>
          {/* <StaffFormGrid
            formValues={formValues}
            handleInputChange={handleInputChange}
            editing={editing}
          /> */}
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
            {publicHolidays && <MantineReactTable table={table} />}
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
      <button onClick={handleFormToggle}>Open Form</button>
      <CreateContractForm
        open={createModalOpen}
        onClose={handleFormToggle}
        onSubmit={handleCreateNewContract}
      />
      <MyModal open={modalOpen} onClose={handleModalClose} msg={modalContent} />

      <Code>{JSON.stringify(formValues, null, 2)}</Code>
      {/* <Code>{JSON.stringify(publicHolidays)}</Code>
      <Code>{JSON.stringify(calendarEvents)}</Code> */}
    </Layout>
  );
}
