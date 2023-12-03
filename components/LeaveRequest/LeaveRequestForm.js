import * as Yup from 'yup';
import { getToken } from 'next-auth/jwt';
import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { parseCookies } from 'nookies';
import {
  Button,
  TextInput,
  Grid,
  Col,
  useMantineTheme,
  rem,
  Card,
  Select,
  Text,
  Flex,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import axios from 'axios';
import MyCard from 'components/MyCard';
import { usePublicHolidays } from 'components/util/usePublicHolidays';
import MyModal from '../../components/MyModal';

import { format, parseISO, isWeekend } from 'date-fns';
import { basepath } from '/global';
import Head from 'next/head';
import { useForm as uForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import {
  getBusinessDays,
  formatResponseDate,
  adjustTimeZoneVal,
  // setPublicHolidays,
  excludeHoliday,
  myRenderDay,
  getNextWorkingDate,
  ampmOptions,
  ampmOptionsEnd,
  ampmOptionsEndNoDate,
  leaveTypes,
} from '../../components/util/leaverequest.util';
import {
  IconCalendarPlus,
  IconCalendarX,
  IconCalendarUp,
  IconFileSpreadsheet,
} from '@tabler/icons-react';

import useStore from 'pages/reducers/zstore';

export async function getServerSideProps(context) {
  const session = await getServerSession(context);
  const staff = session.staff;
  console.log(' in server staff');
  console.log(staff);
  return {
    props: {
      staff,
    },
  };
}

export default function LeaveRequestForm({
  formType,
  leaveRequestId,
  onDeleteEvent,
  onClose,
  LeaveRequestPeriod,
  fetchEvents,
  leavePurpose,
}) {
  console.log('form type?', formType);

  console.log('leave Request ID?', leaveRequestId);

  //const { publicHolidays, loadPublicHolidays } = usePublicHolidays();
  const { publicHolidays, setPublicHolidays, setActiveContract } = useStore();
  //setPublicHolidays(publicHolidays);
  console.log('_public holiday?', publicHolidays);

  const title =
    formType === 'create' ? 'Create Leave Request' : 'Edit Leave Request';
  const theme = useMantineTheme();
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  //const [staff, setStaff] = useState(null);

  const { activeStaff, activeContract } = useStore();
  const staff = activeStaff;
  const [errors, setErrors] = useState({});
  const { reset, handleSubmit } = useForm();
  const newLeaveRequest = {
    title: LeaveRequestPeriod?.title ?? null,
    leavePeriodStart: LeaveRequestPeriod?.start ?? null,
    leavePeriodEnd: LeaveRequestPeriod?.end ?? null,
    AMPMStart: 'AMPM',
    AMPMEnd: '',
    leaveDays: 0,
    dateOfReturn: null,
    staffSignDate: new Date(),
    staffId: null,
    fileId: null,
    error: null,
    helper: null,

    leaveType: 'vacation',
    leavePurpose: 'Vacation',
  };
  const [leaveRequest, setLeaveRequest] = useState(newLeaveRequest);

  const handleModalClose = () => {
    setModalOpen(false);
    if (onClose) {
      onClose(); // Close the drawers
    }
  };
  const cookies = parseCookies();
  const tokenCookie = cookies.token;
  const headers = {
    Authorization: `Bearer ${tokenCookie}`,
  };

  const { data: session } = useSession();
  //const activeContract = useStore((state) => state.activeContract);
  useEffect(() => {
    console.log('session?', session);
    if (session?.user) {
      //console.log(session.user.staff);
      //setStaff(session.user.staff);
      setLeaveRequest({ ...leaveRequest, staffId: session.user.staff.id });
    }
  }, [session]);
  const getTextinputProps = (fieldName) => {
    return {
      name: fieldName,
      id: fieldName,
      error: errors[fieldName],
    };
  };

  useEffect(() => {
    if (formType === 'edit') {
      const getLeaveRequestData = async () => {
        try {
          const headers = {
            Authorization: `Bearer ${tokenCookie}`,
          };

          const response = await axios.get(
            `${basepath}/api/leaverequest/${leaveRequestId}`,
            {
              headers,
            },
          );

          if (response.status === 200) {
            console.log('leaverequest response data', response.data);
            const {
              leavePeriodStart,
              leavePeriodEnd,
              dateOfReturn,
              staffSignDate,
              ...rest
            } = response.data;

            const formattedData = {
              ...rest,
              leavePeriodStart: leavePeriodStart
                ? new Date(leavePeriodStart)
                : null,
              leavePeriodEnd: leavePeriodEnd ? new Date(leavePeriodEnd) : null,
              dateOfReturn: new Date(dateOfReturn),
              staffSignDate: new Date(staffSignDate),
            };

            setLeaveRequest(formattedData);
          }
        } catch (error) {
          console.error('Failed to fetch staff data:', error);
        }
      };

      getLeaveRequestData();
    }
  }, [formType]);
  useEffect(() => {
    const { leavePeriodStart, leavePeriodEnd, AMPMStart, AMPMEnd } =
      leaveRequest;
    const startDate = new Date(leavePeriodStart);
    const endDate = leavePeriodEnd ? new Date(leavePeriodEnd) : null;
    let days = 0;
    let returnDate = null;
    let _ampmend = AMPMEnd;
    let _ampmstart = AMPMStart;
    if (!leavePeriodStart) {
      leaveRequest.leavePeriodEnd = null;
      leaveRequest.leaveDays = 0;
      leaveRequest.dateOfReturn = null;
    }
    if (endDate) {
      if (!AMPMEnd || AMPMEnd === 'NA') {
        _ampmend = 'AMPM';
      }
      if (AMPMStart === 'AM') {
        _ampmstart = 'AMPM';
        //AMPMStart = _ampmstart;
      }
      const startIsAM = AMPMStart === 'AM' || AMPMStart === 'AMPM';
      const startIsPM = AMPMStart === 'PM';
      const endIsAM = AMPMEnd === 'AM';
      const endIsPM = AMPMEnd === 'AMPM';
      if (startIsAM && endIsAM) {
        days = getBusinessDays(startDate, endDate) - 0.5;
        returnDate = endDate;
      } else if (startIsPM && endIsPM) {
        days = getBusinessDays(startDate, endDate) - 0.5;
        returnDate = getNextWorkingDate(endDate);
      } else if (startIsPM && endIsAM) {
        days = getBusinessDays(startDate, endDate) - 1;
        returnDate = endDate;
      } else if (startIsAM && endIsPM) {
        days = getBusinessDays(startDate, endDate);
        returnDate = getNextWorkingDate(endDate);

        console.log(returnDate);
      }
    } else {
      _ampmend = 'NA';
      if (AMPMStart === 'AMPM') {
        days = 1;
        returnDate = getNextWorkingDate(startDate);
      } else if (AMPMStart === 'AM') {
        days = 0.5;
        returnDate = startDate;
      } else if (AMPMStart === 'PM') {
        days = 0.5;
        returnDate = getNextWorkingDate(startDate);
      }
    }
    setLeaveRequest((prevRequest) => ({
      ...prevRequest,
      AMPMEnd: _ampmend,
      AMPMStart: _ampmstart,
      leaveDays: days,
      dateOfReturn: returnDate,
    }));
  }, [
    leaveRequest.AMPMStart,
    leaveRequest.AMPMEnd,
    leaveRequest.leavePeriodStart,
    leaveRequest.leavePeriodEnd,
  ]);

  const updateOnClick = async (e) => {};
  const deleteOnClick = async (e) => {
    leaveRequestId = leaveRequest.id;
    setSubmitting(true);
    const url = `${basepath}/api/leaverequest/${leaveRequestId}`;
    try {
      const response = await axios.delete(
        url,

        {
          headers: headers,
        },
      );

      if ([200, 201].includes(response.status)) {
        setModalMsg('Leave Record Deleted Successfully');
        setModalOpen(true);
        reset();

        console.log('Delete Response', formatResponseDate(response.data));
        await onDeleteEvent(leaveRequestId);
      } else {
        console.error('Failed to create leave request:', response);
      }
      // Do something with the response data
    } catch (error) {
      console.error(error);
      // Handle error
    }

    setSubmitting(false);
  };

  const validationSchema = Yup.object().shape({
    leavePurpose: Yup.string().required('Leave Request is required'),
    leaveType: Yup.string().required('Leave Type is required'),
    leavePeriodStart: Yup.date().required('Leave period start is required'),
    AMPMStart: Yup.string().required(
      'Leave start: AM/PM/Whole day is required',
    ),
    // leavePeriodEnd: Yup.date().required('Leave period end is required'),
    // AMPMEnd: Yup.string().required('Leave end: AM/PM/Whole day is required'),
    staffSignDate: Yup.date().required('Staff sign date is required'),
    dateOfReturn: Yup.date().required('Date of Return is required'),
  });

  const onSubmit = async (e) => {
    setSubmitting(true);
    const state = useStore.getState(); // Access the entire store state

    console.log('all zustand states:', state); // Print the state object to the console

    const newData = {
      // staffId: parseInt(leaveRequest.staffId),
      leavePeriodStart: adjustTimeZoneVal(leaveRequest.leavePeriodStart),
      leavePeriodEnd: adjustTimeZoneVal(leaveRequest.leavePeriodEnd),
      AMPMEnd: leaveRequest.AMPMEnd,
      AMPMStart: leaveRequest.AMPMStart,
      leaveDays: leaveRequest.leaveDays,
      dateOfReturn: adjustTimeZoneVal(leaveRequest.dateOfReturn),
      //staffSignDate: adjustTimeZoneVal(leaveRequest.staffSignDate),
      staffSignDate: leaveRequest.staffSignDate,
      leavePurpose: leaveRequest.leavePurpose,
      leaveType: leaveRequest.leaveType,

      contractId: activeContract.id,
    };
    console.log('newdata: ', newData);
    //console.log('original leave start');
    //console.log(leaveRequest.leavePeriodStart);
    try {
      await validationSchema.validate(leaveRequest, { abortEarly: false });
      const response = await axios[formType === 'create' ? 'post' : 'put'](
        `${basepath}/api/leaverequest/`,
        newData,
        {
          headers: headers,
        },
      );

      if ([200, 201].includes(response.status)) {
        setModalMsg('Leave Record Created Successfully');
        setModalOpen(true);
        reset();

        let _data = formatResponseDate(response.data);
        console.log('responsedata', _data);

        setLeaveRequest({
          ..._data,
        });
        setErrors({});
        if (fetchEvents) {
          await fetchEvents();
        }
      } else {
        console.error('Failed to create leave request:', response);
      }
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      console.error('err submiting form ', err);
      // Handle error
    }
    setSubmitting(false);
  };

  const disabledDates = {
    daysOfWeek: [0, 6], // 0 is Sunday, 6 is Saturday
  };

  const handleLeaveStartSelect = (date, stateobj) => {
    if (!stateobj.leavePeriodEnd) {
      stateobj.dateOfReturn = date;
    }
    handleDateInputSelect(date, stateobj);
  };
  const handleDateInputSelect = (date, stateobj) => {
    console.log('handle date input select', date);
    if (!excludeHoliday(date)) {
      setLeaveRequest(stateobj);
    }
  };
  const dtPickerProps = {
    valueFormat: 'DD-MM-YYYY',
    firstDayOfWeek: 0,
    excludeDate: excludeHoliday,
    renderDay: myRenderDay,
  };
  function getDatePickerProps(fieldName) {
    const dtPickerProps = {
      valueFormat: 'DD-MM-YYYY',
      firstDayOfWeek: 0,
      excludeDate: excludeHoliday,
      renderDay: myRenderDay,
      name: fieldName,
      error: errors[fieldName],
      value: leaveRequest[fieldName],
    };

    return dtPickerProps;
  }

  return (
    <>
      <Head>
        <title>Create new vacation request and download form</title>
      </Head>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <MyCard title={title}>
          <Grid gutter={theme.spacing.md} py={20}>
            <Col span={6}>
              <Text weight={500}>Staff Name:</Text>{' '}
              <Text>{staff && staff.StaffName}</Text>
            </Col>
            <Col span={6}>
              <Text weight={500}>Agent Name:</Text>{' '}
              <Text>{staff && staff.AgentName}</Text>
            </Col>
            <Col span={6}>
              <Text weight={500}>Staff Category:</Text>{' '}
              <Text>{staff && staff.StaffCategory}</Text>
            </Col>

            <Grid.Col span={12}>
              {leaveRequest.leavePeriodStart &&
                leaveRequest.AMPMStart &&
                leaveRequest.leavePeriodEnd &&
                leaveRequest.AMPMEnd && (
                  <p>
                    <label>Leave Period</label>
                    <br />{' '}
                    {`${format(leaveRequest.leavePeriodStart, 'dd-MMM-yyyy')} ${
                      leaveRequest.AMPMStart === 'AMPM'
                        ? ''
                        : leaveRequest.AMPMStart
                    } to ${format(
                      leaveRequest.leavePeriodEnd,
                      'dd-MMM-yyyy',
                    )} ${
                      leaveRequest.AMPMEnd == 'AMPM' ? '' : leaveRequest.AMPMEnd
                    }`}{' '}
                  </p>
                )}{' '}
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                // id="leavePurpose"
                // name="leavePurpose"
                // error={errors['leavePurpose']}
                {...getTextinputProps('leavePurpose')}
                label="Leave purpose"
                value={leaveRequest.leavePurpose}
                onChange={(event) => {
                  const updatedLeaveRequest = {
                    ...leaveRequest,
                    leavePurpose: event.target.value,
                  };
                  setLeaveRequest(updatedLeaveRequest);
                }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Leave Type"
                data={leaveTypes}
                defaultValue="vacation"
                value={leaveRequest.leaveType}
                onChange={(value) =>
                  setLeaveRequest({
                    ...leaveRequest,
                    leaveType: value,
                  })
                }
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <DatePickerInput
                clearable
                label="Leave period start"
                required
                onChange={(_date) =>
                  handleLeaveStartSelect(_date, {
                    ...leaveRequest,
                    leavePeriodStart: _date,
                  })
                }
                {...getDatePickerProps('leavePeriodStart')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Leave start: AM/PM/Whole day"
                data={ampmOptions}
                defaultValue="AMPM"
                value={leaveRequest.AMPMStart}
                onChange={(value) =>
                  setLeaveRequest({
                    ...leaveRequest,
                    AMPMStart: value,
                  })
                }
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <DatePickerInput
                label="Leave period end"
                minDate={
                  new Date(
                    new Date(leaveRequest.leavePeriodStart).getTime() +
                      24 * 60 * 60 * 1000,
                  )
                }
                onChange={(_date) =>
                  handleDateInputSelect(_date, {
                    ...leaveRequest,
                    leavePeriodEnd: _date,
                  })
                }
                clearable
                disabled={!leaveRequest.leavePeriodStart}
                {...getDatePickerProps('leavePeriodEnd')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Leave end: AM/PM/Whole day"
                data={
                  leaveRequest.leavePeriodEnd
                    ? ampmOptionsEnd
                    : ampmOptionsEndNoDate
                }
                value={leaveRequest.AMPMEnd}
                defaultValue="AMPM"
                onChange={(value) =>
                  setLeaveRequest({
                    ...leaveRequest,
                    AMPMEnd: value,
                    error: null,
                    helper: null,
                  })
                }
                disabled={!leaveRequest.leavePeriodStart}
                error={leaveRequest.error?.AMPMEnd}
                description={leaveRequest.helper?.AMPMEnd}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                {...getTextinputProps('leaveDays')}
                label="Leave Days"
                value={leaveRequest.leaveDays}
                readOnly
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <DatePickerInput
                label="Staff sign date"
                clearable
                placeholder="Staff sign date"
                onChange={(_date) =>
                  handleDateInputSelect(_date, {
                    ...leaveRequest,
                    staffSignDate: _date,
                    error: null,
                    helper: null,
                  })
                }
                defaultDate={new Date()}
                disabled={!leaveRequest.leavePeriodStart}
                defaultValue={new Date()}
                {...getDatePickerProps('staffSignDate')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <DatePickerInput
                clearable
                // name="dateOfReturn"
                label="Date of Return"
                disabled={!leaveRequest.leavePeriodStart}
                // {...dtPickerProps}
                {...getDatePickerProps('dateOfReturn')}
              />
            </Grid.Col>
            <Grid.Col span={6} display={Flex}>
              <Flex
                mih={50}
                justify="center"
                align="flex-end"
                direction="row"
                wrap="wrap"
              >
                {leaveRequest.fileId && (
                  <Button
                    component="a"
                    target="_blank"
                    leftIcon={<IconFileSpreadsheet size={rem(18)} />}
                    href={`${basepath}/api/staff/download/${leaveRequest.fileId}`}
                  >
                    Download Leave Form
                  </Button>
                )}
              </Flex>
            </Grid.Col>
          </Grid>
          <Card.Section
            bg="indigo.2"
            py="md"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 'md',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            {' '}
            <Flex
              mih={50}
              gap="md"
              justify="center"
              align="center"
              direction="row"
              wrap="wrap"
            >
              {formType === 'create' && (
                <Button
                  type="submit"
                  fullWidth
                  loading={submitting}
                  leftIcon={<IconCalendarPlus size={rem(18)} />}
                  maw={250}
                  radius="md"
                >
                  Create Leave Request
                </Button>
              )}

              {formType === 'edit' && (
                <>
                  <Button
                    loading={submitting}
                    maw={250}
                    radius="md"
                    leftIcon={<IconCalendarUp size={rem(18)} />}
                    onClick={updateOnClick}
                  >
                    Update
                  </Button>
                  <Button
                    loading={submitting}
                    maw={250}
                    radius="md"
                    onClick={deleteOnClick}
                    variant="gradient"
                    gradient={{ from: 'orange', to: 'red' }}
                    leftIcon={<IconCalendarX size={rem(18)} />}
                  >
                    Delete
                  </Button>
                </>
              )}
            </Flex>
          </Card.Section>
        </MyCard>
      </form>
      <MyModal open={modalOpen} onClose={handleModalClose} msg={modalMsg} />
    </>
  );
}
