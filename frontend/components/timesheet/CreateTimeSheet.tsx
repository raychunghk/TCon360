'use client';
import useStore from '@/components/stores/zstore.js';
import { Button, Card, Center, Grid, Group, MantineSize, Modal, Text } from '@mantine/core';
import { MonthPicker } from '@mantine/dates';
import { IconTableExport } from '@tabler/icons-react';
import axios from 'axios';
import download from 'downloadjs';
import { useEffect, useRef, useState } from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
import MyCard from '../MyCard';
import styles from './mp.module.css';

interface CreateTimesheetPageProps {
  pickersize?: MantineSize;
}

// Utility function to format Date to "YYYY-MM-DD" string
// Utility function to format Date to "YYYY-MM-DD" string, adding one day
const formatDateToString = (date: Date): string => {
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1); // Add one day as requested
  const year = nextDay.getFullYear();
  const month = String(nextDay.getMonth() + 1).padStart(2, '0'); // Months are 0-based, add 1
  const day = String(nextDay.getDate()).padStart(2, '0');
  const rtnval = `${year}-${month}-${day}`;
  console.log('formatDateToString:', rtnval);
  return rtnval;
};

export default function CreateTimesheetPage({ pickersize = 'md' }: CreateTimesheetPageProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const { handleSubmit, reset } = useReactHookForm();
  const [submitting, setSubmitting] = useState(false);
  const [fileid, setfileid] = useState<boolean | null>(null);
  const [monthValue, setMonthValue] = useState<Date | null>(new Date());

  const {
    timesheetDefaultDate,
    setTimesheetDefaultDate,
    selectedMonth,
    setSelectedMonth,
    isMonthPickerChangeEvent,
    setIsMonthPickerChangeEvent,
    isFrontCalendarChangeEvent,
    basepath,
  } = useStore();

  const [defaultdate, setDefaultDate] = useState(new Date());
  const monthPickerRef = useRef(null);

  useEffect(() => {
    if (isFrontCalendarChangeEvent) {
      console.log('selected month change triggered by frontpagecalendar', selectedMonth);
      if (timesheetDefaultDate !== selectedMonth) {
        // setTimesheetDefaultDate(selectedMonth);
      }
    }
    return () => { };
  }, [selectedMonth]);

  useEffect(() => {
    console.log('timesheetDefaultDate?', timesheetDefaultDate);
    const _defaultDate = new Date(timesheetDefaultDate.getFullYear(), 1);
    const _selectedMonth = new Date(
      timesheetDefaultDate.getFullYear(),
      timesheetDefaultDate.getMonth(),
      1,
    );

    if (!isMonthPickerChangeEvent) {
    }

    if (isMonthPickerChangeEvent) setIsMonthPickerChangeEvent(false);
  }, [timesheetDefaultDate, isMonthPickerChangeEvent]);

  const handleMonthChange = (value: string | null) => {
    if (fileid) {
      setfileid(null);
    }
    console.log('handle month change', value);

    // Handle null or invalid input
    if (!value) {
      console.warn('No date selected (null value received)');
      return;
    }

    // Parse the incoming "YYYY-MM-DD" string
    const [year, month] = value.split('-').map(Number);
    if (!year || !month || isNaN(year) || isNaN(month)) {
      console.error('Invalid date string format:', value);
      return;
    }

    // Create a Date object for the first day of the selected month in local timezone
    const dateValue = new Date(year, month - 1, 1); // month is 1-based in string, 0-based in Date

    // Validate the date
    if (!isNaN(dateValue.getTime())) {
      setIsMonthPickerChangeEvent(true);
      setTimesheetDefaultDate(dateValue);
      setSelectedMonth(dateValue); // Update selectedMonth for consistency
    } else {
      console.error('Invalid date created from:', value);
    }
  };

  const onSubmit = async (event) => {
    setSubmitting(true);
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth() + 1;

    const response = await axios.post(`${basepath}/api/timesheet/create`, {
      year,
      month,
    });
    setSubmitting(false);
    if ([200, 201].includes(response.status)) {
      setfileid(response.data.fileid);
      setModalOpen(true);
    } else {
      console.error('Failed to create timesheet record:', response);
    }
  };

  const handleDownloadFile = async () => {
    const url = `${basepath}/api/staff/download/${fileid}`;
    const response = await axios.get(url, { responseType: 'blob' });
    const disposition = response.headers['content-disposition'];
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    const filename = matches ? matches[1] : `${fileid}.xml`;
    download(response.data, filename);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    if (fileid) {
      handleDownloadFile();
    }
  };

  return (
    <>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <MyCard title={'Create TimeSheet'} cardwidth={225}>
          <Grid pb={5} ta="center">
            <Grid.Col span={12}>
              <Group justify="center">
                <MonthPicker
                  size={pickersize}
                  onChange={handleMonthChange}
                  ref={monthPickerRef}
                  value={selectedMonth ? formatDateToString(selectedMonth) : null}
                  className={styles.monthPickerButtons}
                />
              </Group>
            </Grid.Col>
            <Grid.Col span={12}>
              <Group justify="center">
                {fileid && (
                  <Button
                    component="a"
                    target="_blank"
                    leftSection={<IconTableExport size="1rem" />}
                    href={`${basepath}/api/staff/download/${fileid} `}
                  >
                    Download TimeSheet
                  </Button>
                )}
              </Group>
            </Grid.Col>
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
            <Button type="submit" fullWidth loading={submitting} maw={'70%'} radius="md">
              Submit
            </Button>
          </Card.Section>
        </MyCard>
      </form>
      <Modal.Root opened={modalOpen} onClose={handleModalClose}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header bg="indigo.4" c="white">
            <Modal.Title>
              <Text fw={700} fz="md">
                Success
              </Text>
            </Modal.Title>
            <Modal.CloseButton bg="indigo.2" />
          </Modal.Header>
          <Modal.Body>
            <Text mt="md">Timesheet record created successfully!</Text>
            <Center>
              <Button mt="md" onClick={handleModalClose}>
                Ok
              </Button>
            </Center>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
