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
import { format } from 'date-fns';
import { AnnualLeaveEditor, inputFields, staffModel } from './edit.util';
import {
  excludeHoliday,
  myRenderDay,
  setDatepickerPlDay,
} from 'components/util/leaverequest.util';
require('dotenv').config();

export default function EditStaff() {
  const { staff, user, staffVacation, publicHolidays, calendarEvents } =
    useSelector((state) => ({
      staff: state.calendar.staff,
      user: state.calendar.user,
      staffVacation: state.calendar.staffVacation,
      publicHolidays: state.calendar.publicHolidays,
      calendarEvents: state.calendar.calendarEvents,
    }));

  const [formValues, setFormValues] = useState(staffModel);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
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
  async function loadPublicHolidays() {
    try {
      const response = await axios.get(
        `${basepath}/api/timesheet/publicholidays`,
      );
      const pldays = response.data.map((holiday) => ({
        Summary: holiday.Summary,

        StartDate: format(new Date(holiday.StartDate), 'M/d/yyyy'),
      }));
      setDatepickerPlDay(pldays);
      await dispatch(setPublicHolidays(pldays));
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    console.log('public holidays?', publicHolidays);

    if (!publicHolidays || publicHolidays.length == 0) {
      loadPublicHolidays();
    }
  }, []);
  useEffect(() => {
    getStaffData();
  }, [publicHolidays]);
  const handleModalClose = () => {
    setModalOpen(false);
  };
  //   ContractStartDate DateTime
  // ContractEndDate   DateTime
  // AnnualLeave       Int
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

      Edit: (param) => {
        const { renderedCellValue, cell, table, column, row } = param;
        const editingRow = table.getState().editingRow;
        const cellval = param.cell.getValue();
        let val;
        if (cellval instanceof Date) {
          val = cellval;
        } else {
          val = new Date(cellval);
        }
        if (editingRow !== null && row.id == editingRow.id) {
          return (
            <>
              <DatePickerInput
                valueFormat="DD-MM-YYYY"
                firstDayOfWeek={0}
                size="xs"
                value={val}
                withCellSpacing={false}
                excludeDate={excludeHoliday}
                renderDay={myRenderDay}
                //dropdownType="modal"
                style={{ zIndex: 9999 }}
                onChange={(newValue) => {
                  const updatedFormValues = { ...formValues };
                  const updatedContracts = [...updatedFormValues.contracts];
                  const newDate = new Date(newValue);
                  if (isNaN(newDate.getTime())) {
                    // Casting failed, set the value to the error message
                    updatedContracts[row.index] = {
                      ...updatedContracts[row.index],
                      ContractStartDate: 'Invalid date',
                    };
                  } else {
                    updatedContracts[row.index] = {
                      ...updatedContracts[row.index],
                      ContractStartDate: newDate,
                    };
                  }
                  updatedFormValues.contracts = updatedContracts;
                  setFormValues(updatedFormValues);
                }}
                // Add any additional props or styling as needed
              />
            </>
          );
        }

        // Use date-fns to format the date as "yyyy-MMM-dd"
        const formattedDate = format(renderedCellValue, 'yyyy-MMM-dd');
        return <Text>{formattedDate}</Text>;
      },

      Cell: ({ cell }) => {
        const cellval = cell.getValue();
        console.log('cellval?', cellval);
        let val;

        try {
          if (cellval instanceof Date) {
            val = format(cellval, 'yyyy-MMM-dd');
          } else {
            val = format(new Date(cellval), 'yyyy-MMM-dd');
          }
        } catch (error) {
          console.error(error);
          val = error.message;
        }
        return <Text>{val}</Text>;
      },
    },
    {
      accessorKey: 'ContractEndDate',
      header: 'Contract End Date',

      Edit: (param) => {
        const { renderedCellValue, cell, table, column, row } = param;
        const editingRow = table.getState().editingRow;
        const cellval = param.cell.getValue();
        let val;
        if (cellval instanceof Date) {
          val = cellval;
        } else {
          val = new Date(cellval);
        }
        if (editingRow !== null && row.id == editingRow.id) {
          return (
            <>
              <DatePickerInput
                valueFormat="DD-MM-YYYY"
                firstDayOfWeek={0}
                size="xs"
                value={val}
                withCellSpacing={false}
                excludeDate={excludeHoliday}
                renderDay={myRenderDay}
                //dropdownType="modal"
                style={{ zIndex: 9999 }}
                onChange={(newValue) => {
                  const updatedFormValues = { ...formValues };
                  const updatedContracts = [...updatedFormValues.contracts];
                  const newDate = new Date(newValue);
                  val = newValue;
                  if (isNaN(newDate.getTime())) {
                    // Casting failed, set the value to the error message
                    updatedContracts[row.index] = {
                      ...updatedContracts[row.index],
                      ContractEndDate: 'Invalid date',
                    };
                  } else {
                    updatedContracts[row.index] = {
                      ...updatedContracts[row.index],
                      ContractEndDate: newDate,
                    };
                  }
                  updatedFormValues.contracts = updatedContracts;
                  setFormValues(updatedFormValues);
                }}
                // Add any additional props or styling as needed
              />
            </>
          );
        }
      },
      Cell: ({ cell }) => {
        const cellval = cell.getValue();
        console.log('cellval?', cellval);
        let val;

        try {
          if (cellval instanceof Date) {
            val = format(cellval, 'yyyy-MMM-dd');
          } else {
            val = format(new Date(cellval), 'yyyy-MMM-dd');
          }
        } catch (error) {
          console.error(error);
          val = error.message;
        }
        return <Text>{val}</Text>;
      },
    },
    // {
    //   accessorKey: 'ContractStartDate',
    //   header: 'Contract Start Date',
    //   size: 150,
    //   enableEditing: true,
    // },
    // {
    //   accessorKey: 'ContractEndDate',
    //   header: 'Contract End Date',
    //   size: 150,
    //   enableEditing: true,
    // },
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
      Cell: (param) => {
        const { cell } = param;
        const cellval = cell.getValue();

        return <Text>{cellval ? 'Active' : 'Inactive'}</Text>;
      },
      Edit: (param) => {
        const { renderedCellValue, cell, table, column, row } = param;
        const editingRow = table.getState().editingRow;
        const theme = useMantineTheme();
        const [cellval, setCellValue] = useState(param.cell.getValue());
        if (editingRow !== null && row.id == editingRow.id) {
          return (
            <>
              <Switch
                checked={cellval}
                onChange={(event) => {
                  setCellValue(event.currentTarget.checked);
                  const updatedFormValues = { ...formValues };
                  let updatedContracts;
                  if (event.currentTarget.checked) {
                    updatedContracts = updatedFormValues.contracts.map(
                      (contract, index) => {
                        if (index === row.index) {
                          return { ...contract, IsActive: true };
                        } else {
                          return { ...contract, IsActive: false };
                        }
                      },
                    );
                  } else {
                    updatedContracts = [...updatedFormValues.contracts];
                    updatedContracts[row.index] = {
                      ...updatedContracts[row.index],
                      IsActive: event.currentTarget.checked,
                    };
                  }
                  updatedFormValues.contracts = updatedContracts;
                  setFormValues(updatedFormValues);
                }}
                color="teal"
                size="md"
                label={cellval ? 'Active' : 'Inactive'}
                thumbIcon={
                  cellval ? (
                    <IconCheck
                      size="0.8rem"
                      color={theme.colors.teal[theme.fn.primaryShade()]}
                      stroke={3}
                    />
                  ) : (
                    <IconX
                      size="0.8rem"
                      color={theme.colors.red[theme.fn.primaryShade()]}
                      stroke={3}
                    />
                  )
                }
              />
            </>
          );
        }
      },
    },
  ];
  const handleSaveRow = (row) => {
    // Handle saving the edited row here
  };
  const table =
    publicHolidays &&
    useMantineReactTable({
      columns,
      data: formValues.contracts,
      createDisplayMode: 'row',
      editDisplayMode: 'modal',
      renderEditRowModalContent: (params) => {
        console.log('params', params);
        const { internalEditComponents, table, row } = params;
        return (
          <Paper style={{ height: '350px' }}>
            <Title order={5}>Edit Contract Detail</Title>
            <Grid gutter="md">
              {internalEditComponents.map((component, index) =>
                index === 0 ? null : (
                  <Grid.Col span={6} key={index} mt={'30px'}>
                    {component}
                  </Grid.Col>
                ),
              )}
            </Grid>
            <Flex
              justify="flex-end"
              mt={'auto'}
              style={{ position: 'absolute', bottom: '20px', right: '20px' }}
            >
              <MRT_EditActionButtons row={row} table={table} variant="text" />
            </Flex>
          </Paper>
        );
      },
      onEditingRowSave: handleSaveRow,
      enableColumnResizing: true,
      enableEditing: true,
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
        <title>User Information</title>
      </Head>

      <form onSubmit={handleSubmit(onSubmit)}>
        <MyCard title="Staff Info" cardwidth={800}>
          {/* <StaffFormGrid
            formValues={formValues}
            handleInputChange={handleInputChange}
            editing={editing}
          /> */}
          <Grid pb={20} pt={20}>
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
                {/* {field.type === 'number' && (
                  <NumberInput
                    label={field.label}
                    placeholder={field.label}
                    name={field.name}
                    onChange={handleInputChange}
                    disabled={!editing}
                    value={formValues[field.name]}
                  />
                )} */}
                {/* {field.type === 'date' && (
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
                  />
                )} */}
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

      <MyModal
        open={modalOpen}
        onClose={handleModalClose}
        msg={' Staff record updated successfully!'}
      />
      <Code>{JSON.stringify(formValues, null, 2)}</Code>
      {/* <Code>{JSON.stringify(publicHolidays)}</Code>
      <Code>{JSON.stringify(calendarEvents)}</Code> */}
    </Layout>
  );
}
