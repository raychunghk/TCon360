import { useState, useEffect ,useContext} from 'react';
import { useForm } from 'react-hook-form';

import {
  Button,
  TextInput,
  Grid,
  Col,
  useMantineTheme,
  Center,
  NumberInput,
  Modal,
  Card,
  Select,
  Text,
  Flex,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import axios from 'axios';
import MyCard from '../../components/MyCard';
import Layout from '../../components/layout';
import MyModal from '../../components/MyModal';
import { format, parseISO, isWeekend } from 'date-fns';
import { basepath } from '/global';
import Head from 'next/head';
import { useForm as uForm } from 'react-hook-form';
import { StaffService } from 'src/server/staff/service/staff.service';
import { LeaveRequestService } from 'src/server/leaverequest/service/leaverequest.service';
import {
  getBusinessDays,
  formatResponseDate,
  adjustTimeZoneVal,
  setPublicHolidays,
  excludeHoliday,
  myRenderDay,
  getNextWorkingDate,
} from '../../components/util/leaverequest.util';
import { UtilsContext } from '../../components/util/utilCtx';
import { PrismaClient } from '@prisma/client';
import { PublicHolidaysContext } from '../_app'
//export default function LeaveRequestForm({ staff, publicholidays }) {
export default function LeaveRequestForm({ staff }) {
  
  const _publicholidays = useContext(PublicHolidaysContext);
  const publicholidays = _publicholidays;
  setPublicHolidays(publicholidays);
  console.log('_public holiday?')
  console.log(publicholidays)
  const theme = useMantineTheme();
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const [leaveRequest, setLeaveRequest] = useState({
    leavePeriodStart: null,
    leavePeriodEnd: null,
    AMPMStart: 'AMPM',
    AMPMEnd: '',
    leaveDays: 0,
    dateOfReturn: null,
    staffSignDate: new Date(),
    staffId: staff.id,
    fileId: null,
    error: null,
    helper: null,
  });
  console.log('publicholidays');
  console.log(publicholidays);
  const handleModalClose = () => {
    setModalOpen(false);
  };

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

  const ampmOptions = [
    {
      value: 'AMPM',
      label: 'Whole day',
    },
    {
      value: 'AM',
      label: 'AM',
    },
    {
      value: 'PM',
      label: 'PM',
    },
  ];
  const ampmOptionsEnd = [
    {
      value: 'NA',
      label: 'N/A',
    },
    {
      value: 'AMPM',
      label: 'Whole day',
    },
    {
      value: 'AM',
      label: 'AM',
    },
  ];

  const onSubmit = async (e) => {
    setSubmitting(true);

    const newData = {
      // staffId: parseInt(leaveRequest.staffId),
      leavePeriodStart: adjustTimeZoneVal(leaveRequest.leavePeriodStart),
      leavePeriodEnd: adjustTimeZoneVal(leaveRequest.leavePeriodEnd),
      AMPMEnd: leaveRequest.AMPMEnd,
      AMPMStart: leaveRequest.AMPMStart,
      leaveDays: leaveRequest.leaveDays,
      dateOfReturn: adjustTimeZoneVal(leaveRequest.dateOfReturn),
      staffSignDate: adjustTimeZoneVal(leaveRequest.staffSignDate),
    };
    console.log('newdata: ');
    console.log(newData);
    console.log('original leave start');
    console.log(leaveRequest.leavePeriodStart);
    try {
      const response = await axios.post(
        `${basepath}/api/leaverequest/${leaveRequest.staffId}`,
        newData,
      );

      if ([200, 201].includes(response.status)) {
        setModalOpen(true);
        reset();

        let _data = formatResponseDate(response.data);
        console.log('responsedata');
        console.log(_data);
        setLeaveRequest({
          ..._data,
        });
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
    console.log('handle date input select');
    console.log(date);
    if (!excludeHoliday(date)) {
      setLeaveRequest(stateobj);
    }
  };

  return (
    
    <Layout>
      <Head>
        <title>Create new vacation request and download form</title>
      </Head>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <MyCard title="Create Vacation Request">
          <Grid gutter={theme.spacing.md} py={20}>
            <Col span={6}>
              <Text weight={500}>Staff Name:</Text>{' '}
              <Text>{staff.StaffName}</Text>
            </Col>
            <Col span={6}>
              <Text weight={500}>Agent Name:</Text>{' '}
              <Text>{staff.AgentName}</Text>
            </Col>
            <Col span={6}>
              <Text weight={500}>Staff Category:</Text>{' '}
              <Text>{staff.StaffCategory}</Text>
            </Col>
            <Col span={6} />
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
              <DatePickerInput
                clearable
                label="Leave period start"
                required
                name="leavePeriodStart"
                value={leaveRequest.leavePeriodStart}
                onChange={(_date) =>
                  handleLeaveStartSelect(_date, {
                    ...leaveRequest,
                    leavePeriodStart: _date,
                  })
                }
                valueFormat="DD-MM-YYYY"
                firstDayOfWeek={0}
                excludeDate={excludeHoliday}
                renderDay={myRenderDay}
              />{' '}
              {errors.leavePeriodStart && (
                <span className="error">Leave period start is required</span>
              )}{' '}
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
                value={leaveRequest.leavePeriodEnd}
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
                valueFormat="DD-MM-YYYY"
                firstDayOfWeek={0}
                excludeDate={excludeHoliday}
                renderDay={myRenderDay}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Leave end: AM/PM/Whole day"
                data={ampmOptionsEnd}
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
                id="leaveDays"
                name="leaveDays"
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
                name="staffSignDate"
                onChange={(_date) =>
                  handleDateInputSelect(_date, {
                    ...leaveRequest,
                    staffSignDate: _date,
                    error: null,
                    helper: null,
                  })
                }
                value={leaveRequest.staffSignDate}
                defaultDate={new Date()}
                defaultValue={new Date()}
                valueFormat="DD-MM-YYYY"
                firstDayOfWeek={0}
                excludeDate={excludeHoliday}
                renderDay={myRenderDay}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <DatePickerInput
                clearable
                name="dateOfReturn"
                label="Date of Return"
                value={leaveRequest.dateOfReturn}
                valueFormat="DD-MM-YYYY"
                firstDayOfWeek={0}
                excludeDate={excludeHoliday}
                renderDay={myRenderDay}
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
                    href={`${basepath}/api/staff/download/${leaveRequest.fileId}`}
                  >
                    Download Leave Form
                  </Button>
                )}{' '}
              </Flex>
            </Grid.Col>
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
              fullWidth
              loading={submitting}
              maw={250}
              radius="md"
            >
              Submit
            </Button>
          </Card.Section>
        </MyCard>
      </form>
      <MyModal
        open={modalOpen}
        onClose={handleModalClose}
        msg={'Leave Record Created Successfully'}
      />
    </Layout>
  );
}
export const getServerSideProps = async ({ params }) => {
  const staffService = new StaffService();
  const staff = await staffService.getStaffById(1);
  const prisma = new PrismaClient();
  const leaveReqSvc = new LeaveRequestService(prisma);
  const _publicholidays = await leaveReqSvc.findAllPublicHoliday();
  const publicholidays = _publicholidays.map((holiday) => ({
    Summary: holiday.Summary,
    StartDate: holiday.StartDate.toLocaleDateString(),
  }));
  console.log(publicholidays);

  return {
    props: {
      staff,
      publicholidays,
    },
  };
};
