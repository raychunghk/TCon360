'use client';
import MyCard from '@/components/MyCard';
import MyModal from '@/components/MyModal';
import {
  adjustTimeZoneVal,
  ampmOptions,
  ampmOptionsEnd,
  ampmOptionsEndNoDate,
  excludeHoliday,
  formatResponseDate,
  getBusinessDays,
  getNextWorkingDate, leaveRequestValidationSchema, leaveTypes,
  myRenderDay
} from '@/components/util/leaverequest.util';
import { leaveRequestService } from '@/services/leaveRequestService';
import { Button, Card, Flex, Grid, Select, Text, TextInput, useMantineTheme } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import {
  IconCalendarPlus,
  IconCalendarUp,
  IconCalendarX,
  IconFileSpreadsheet,
} from '@tabler/icons-react';
import { format } from 'date-fns';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LeaveRequestStaffInfo } from './leaveRequestStaffInfo';

import { getMySession } from '@/app/lib/auth-action';
import useUIStore from '@/components/stores/useUIStore';
import useStore from '@/components/stores/zstore';
import { useShallow } from 'zustand/react/shallow';

export default function LeaveRequestForm({
  formType,
  leaveRequestId,
  onDeleteEvent,
  onClose,
  LeaveRequestPeriod,
  leavePurpose,
  CalendarDate,
  isCalendarIntegrated = false, // Default to false for standalone pages
}) {
  console.log('form type?', formType);
  console.log('leave Request ID?', leaveRequestId);
  console.log('leave purpose?', leavePurpose);


  const [publicHolidays, activeUser, activeStaff, activeContract, basepath, timesheetDefaultDate, setTimesheetDefaultDate, setIsMonthPickerChangeEvent, selectedMonth, setSelectedMonth] = useStore(
    useShallow((state) => [
      state.publicHolidays,
      state.activeUser,
      state.activeStaff,
      state.activeContract,
      state.basepath,
      state.timesheetDefaultDate,
      state.setTimesheetDefaultDate,
      state.setIsMonthPickerChangeEvent,
      state.selectedMonth,
      state.setSelectedMonth,
    ])
  );
  const [isEventUpdated, setIsEventUpdated] = useUIStore(
    useShallow((state) => [state.isEventUpdated, state.setIsEventUpdated])
  );
  console.log('_public holiday?', publicHolidays);

  const title = formType === 'create' ? 'Create Leave Request' : 'Edit Leave Request';
  const theme = useMantineTheme();
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showAsError, setShowAsError] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [isFetchingData, setIsFetchingData] = useState(false);
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
    leavePurpose: leavePurpose ? leavePurpose : 'Vacation',
  };
  const [leaveRequest, setLeaveRequest] = useState(newLeaveRequest);

  const handleModalClose = () => {
    setModalOpen(false);
    setShowAsError(false);
    if (onClose) {
      onClose(); // Close the drawers
    }
  };
  const cookies = parseCookies();
  const tokenCookie = cookies.token;
  const headers = {
    Authorization: `Bearer ${tokenCookie}`,
  };

  // const { data: session } = useSession();
  const sessiondata = null;
  console.log('session', sessiondata);
  useEffect(() => {
    // Function to fetch session and update state
    const fetchSessionData = async () => {
      try {
        const session = await getMySession();
        if (!leaveRequest) {
          console.log('in useeffect ActiveUser, leaveRequest is null');
        }

        // Check if activeStaff.id exists and is different from session.user.staff.id
        if (activeStaff?.id !== session.user.staff.id) {
          setLeaveRequest({ ...leaveRequest, staffId: session.user.staff.id });
        }
      } catch (error) {
        console.error('Error fetching session:', error);
        // Handle error, e.g., display an error message
      }
    };

    // Only fetch session if activeStaff is not already set (initial fetch)
    if (!activeStaff?.id) {
      fetchSessionData();
    }
  }, [activeStaff]); // Depend on activeStaff to trigger only on changes
  const getTextinputProps = (fieldName) => {
    return {
      name: fieldName,
      id: fieldName,
      error: errors[fieldName],
    };
  };

  // Fetch leave request data for edit mode
  useEffect(() => {
    if (basepath && formType === 'edit' && leaveRequestId) {
      const getLeaveRequestData = async () => {
        try {
          const response = await leaveRequestService.getLeaveRequest(leaveRequestId, tokenCookie, basepath);
          if (response.status === 200) {
            console.log('leaverequest response data', response.data);
            const { leavePeriodStart, leavePeriodEnd, dateOfReturn, staffSignDate, ...rest } = response.data;
            const formattedData = {
              ...rest,
              leavePeriodStart: leavePeriodStart ? new Date(leavePeriodStart) : null,
              leavePeriodEnd: leavePeriodEnd ? new Date(leavePeriodEnd) : null,
              dateOfReturn: dateOfReturn ? new Date(dateOfReturn) : null,
              staffSignDate: new Date(staffSignDate),
            };
            setLeaveRequest(formattedData);
          }
        } catch (error) {
          console.error('Failed to fetch leave request data:', error);
        }
      };
      getLeaveRequestData();
    }
  }, [formType, leaveRequestId, basepath, tokenCookie]);


  useEffect(() => {
    const handleFormValueChange = async () => {
      const startDate = new Date(leavePeriodStart);
      const endDate = leavePeriodEnd ? new Date(leavePeriodEnd) : null;
      let _leavedays = 0;
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
        }
        const startIsAM = AMPMStart === 'AM' || AMPMStart === 'AMPM';
        const startIsPM = AMPMStart === 'PM';
        const endIsAM = AMPMEnd === 'AM';
        const endIsPM = AMPMEnd === 'AMPM';
        if (startIsAM && endIsAM) {
          _leavedays = getBusinessDays(startDate, endDate) - 0.5;
          returnDate = endDate;
        } else if (startIsPM && endIsPM) {
          _leavedays = getBusinessDays(startDate, endDate) - 0.5;
          returnDate = getNextWorkingDate(endDate);
        } else if (startIsPM && endIsAM) {
          _leavedays = getBusinessDays(startDate, endDate) - 1;
          returnDate = endDate;
        } else if (startIsAM && endIsPM) {
          _leavedays = getBusinessDays(startDate, endDate);
          returnDate = getNextWorkingDate(endDate);
          console.log('return to work date?', returnDate);
        }
      } else {
        _ampmend = 'NA';
        if (AMPMStart === 'AMPM') {
          _leavedays = 1;
          returnDate = getNextWorkingDate(startDate);
        } else if (AMPMStart === 'AM') {
          _leavedays = 0.5;
          returnDate = startDate;
        } else if (AMPMStart === 'PM') {
          _leavedays = 0.5;
          returnDate = getNextWorkingDate(startDate);
        }
      }
      console.log('leavedays?', _leavedays);
      console.log('In use Effect LeaveRequest form value change, prevRequest:', leaveRequest);
      setLeaveRequest((prevRequest) => ({
        ...prevRequest,
        AMPMEnd: _ampmend,
        AMPMStart: _ampmstart,
        leaveDays: _leavedays,
        dateOfReturn: returnDate,
      }));
    };
    const { leavePeriodStart, leavePeriodEnd, AMPMStart, AMPMEnd } = leaveRequest;
    if (leavePeriodStart) handleFormValueChange();
  }, [
    leaveRequest.AMPMStart,
    leaveRequest.AMPMEnd,
    leaveRequest.leavePeriodStart,
    leaveRequest.leavePeriodEnd,
  ]);

  const deleteOnClick = async () => {
    if (!leaveRequest.id) {
      setModalMsg('No leave request ID provided');
      setModalOpen(true);
      return;
    }
    console.log('Delete click Timesheet default date ', timesheetDefaultDate);
    setSubmitting(true);
    try {
      const response = await leaveRequestService.deleteLeaveRequest(leaveRequest.id, tokenCookie, basepath);
      if ([200, 201].includes(response.status)) {
        console.log('Delete Response', formatResponseDate(response.data));
        if (isCalendarIntegrated) {
          setSelectedMonth(CalendarDate);
          await setTimesheetDefaultDate(CalendarDate);
        }
        await onDeleteEvent(leaveRequest.id, timesheetDefaultDate);
        setModalMsg('Leave Record Deleted Successfully');
        setModalOpen(true);
        reset();
      }
    } catch (error) {
      console.error('Failed to delete leave request:', error);
      setModalMsg('Failed to delete leave request');
      setModalOpen(true);
    }
    setSubmitting(false);
  };

  const handleFormSubmit = async (formTypeOverride) => {
    setSubmitting(true);
    const effectiveFormType = formTypeOverride || formType;
    const state = useStore.getState();
    console.log('all zustand states:', state);

    const newData = {
      leavePeriodStart: adjustTimeZoneVal(leaveRequest.leavePeriodStart),
      leavePeriodEnd: adjustTimeZoneVal(leaveRequest.leavePeriodEnd),
      AMPMEnd: leaveRequest.AMPMEnd,
      AMPMStart: leaveRequest.AMPMStart,
      leaveDays: leaveRequest.leaveDays,
      dateOfReturn: adjustTimeZoneVal(leaveRequest.dateOfReturn),
      staffSignDate: leaveRequest.staffSignDate,
      leavePurpose: leaveRequest.leavePurpose,
      leaveType: leaveRequest.leaveType,
      contractId: activeContract.id,
    };
    console.log('newdata: ', newData);

    try {
      await leaveRequestValidationSchema.validate(leaveRequest, { abortEarly: false });
      let response;
      if (effectiveFormType === 'create') {
        response = await leaveRequestService.createLeaveRequest(newData, tokenCookie, basepath);
      } else {
        if (!leaveRequest.id) {
          throw new Error('No leave request ID provided for update');
        }
        response = await leaveRequestService.updateLeaveRequest(leaveRequest.id, newData, tokenCookie, basepath);
      }

      if ([200, 201].includes(response.status)) {
        if (response.data.error) {
          console.error('Failed to process leave request:', response.data.error);
          setShowAsError(true);
          setModalMsg(response.data.error);
          setModalOpen(true);
        } else {
          if (isCalendarIntegrated) {
            setSelectedMonth(CalendarDate);
            await setTimesheetDefaultDate(CalendarDate);
          }
          setModalMsg(`Leave Record ${effectiveFormType === 'create' ? 'Created' : 'Updated'} Successfully`);
          setModalOpen(true);
          reset();

          let _data = formatResponseDate(response.data);
          console.log('responsedata', _data);

          setLeaveRequest({ ..._data });
          setErrors({});
          setIsEventUpdated(true);
        }
      } else {
        console.error('Failed to process leave request:', response);
      }
    } catch (err) {
      if (err.name === 'ValidationError') {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      } else if (err.response && err.response.status === 401) {
        setModalMsg('Session timeout, you are not authorized, please login again');
        setModalOpen(true);
      } else if (err.response) {
        const errorData = err.response.data;
        const newErrors = {};
        Object.keys(errorData).forEach((key) => {
          newErrors[key] = errorData[key].join(', ');
        });
        setErrors(newErrors);
      } else {
        console.error('Error processing leave request:', err);
        setModalMsg('Failed to process leave request');
        setModalOpen(true);
      }
    }
    setSubmitting(false);
  };


  const disabledDates = {
    daysOfWeek: [0, 6], // 0 is Sunday, 6 is Saturday
  };
  const btnSize = 18;
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
        <title>{title}</title>
      </Head>
      <form method="post" onSubmit={handleSubmit(() => handleFormSubmit(formType))}>
        <MyCard title={title}>
          <Grid gutter={theme.spacing.md} py={20}>
            <Grid.Col span={12}>
              <LeaveRequestStaffInfo staff={staff} />
            </Grid.Col>


            <Grid.Col span={12}>
              {leaveRequest.leavePeriodStart &&
                leaveRequest.AMPMStart &&
                leaveRequest.leavePeriodEnd &&
                leaveRequest.AMPMEnd && (
                  <p>
                    <Text fw={500}>Leave Period:</Text>

                    {`${format(leaveRequest.leavePeriodStart, 'dd-MMM-yyyy')} ${leaveRequest.AMPMStart === 'AMPM' ? '' : leaveRequest.AMPMStart
                      } to ${format(leaveRequest.leavePeriodEnd, 'dd-MMM-yyyy')} ${leaveRequest.AMPMEnd == 'AMPM' ? '' : leaveRequest.AMPMEnd
                      }`}
                  </p>
                )}
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                {...getTextinputProps('leavePurpose')}
                label="Leave purpose"
                loading={isFetchingData}
                value={leaveRequest.leavePurpose}
                aria-label="Enter the purpose of the leave"
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
                loading={isFetchingData}
                label="Leave period start"
                required
                //   description="Holidays and weekends are excluded"
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
                loading={isFetchingData}
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
                  new Date(new Date(leaveRequest.leavePeriodStart).getTime() + 24 * 60 * 60 * 1000)
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
                defaultValue="AMPM"
                data={leaveRequest.leavePeriodEnd ? ampmOptionsEnd : ampmOptionsEndNoDate}
                value={leaveRequest.AMPMEnd}
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
                label="Date of Return"
                disabled={!leaveRequest.leavePeriodStart}
                {...getDatePickerProps('dateOfReturn')}
              />
            </Grid.Col>
            <Grid.Col span={6} display={Flex}>
              <Flex mih={50} justify="center" align="flex-end" direction="row" wrap="wrap">
                {leaveRequest.fileId && (
                  <Button
                    component="a"
                    target="_blank"
                    leftSection={<IconFileSpreadsheet />}
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
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'md',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Flex mih={50} gap="md" justify="center" align="center" direction="row" wrap="wrap">
              {formType === 'create' && (
                <Button
                  type="submit"
                  fullWidth
                  loading={submitting}
                  leftSection={<IconCalendarPlus />}
                  maw={250}
                  radius="md"
                >
                  Create Leave Request
                </Button>
              )}
              {formType === 'edit' && (
                <>
                  <Button
                    type="submit"
                    loading={submitting}
                    maw={250}
                    radius="md"
                    leftSection={<IconCalendarUp />}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit(() => handleFormSubmit('edit'))();
                    }}
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
                    leftSection={<IconCalendarX />}
                  >
                    Delete
                  </Button>
                </>
              )}
            </Flex>
          </Card.Section>
        </MyCard>
      </form>
      <MyModal open={modalOpen} onClose={handleModalClose} msg={modalMsg} isError={showAsError} />
    </>
  );
}
