'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useForm as useReactHookForm } from 'react-hook-form';
import { MonthPicker } from '@mantine/dates';
import { Button, Card, Grid, Modal, Text, Center, Group, MantineSize } from '@mantine/core';
import { IconTableExport } from '@tabler/icons-react';

import MyCard from '../MyCard';

import download from 'downloadjs';

import styles from './mp.module.css';
import useStore from '@/components/stores/zstore';

export default function CreateTimesheetPage({ pickersize = 'md' }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { handleSubmit, reset } = useReactHookForm();
  const [submitting, setSubmitting] = useState(false);
  const [fileid, setfileid] = useState(false);

  const [monthValue, setMonthValue] = useState<Date | null>(new Date());

  const {
    timesheetDefaultDate,
    setTimesheetDefaultDate,
    selectedMonth,
    setSelectedMonth,
    isMonthPickerChangeEvent,
    setIsMonthPickerChangeEvent,
    isFrontCalendarChangeEvent, basepath
  } = useStore();
  const [defaultdate, setDefaultDate] = useState(new Date());
  useEffect(
    () => {
      if (isFrontCalendarChangeEvent) {
        console.log(
          'selected month change triggered by frontpagecalendar',
          selectedMonth,
        );
        if (timesheetDefaultDate != selectedMonth) {
          //setTimesheetDefaultDate(selectedMonth);
        }
      }
      return () => { };
    },
    //eslint-disable-next-line
    [selectedMonth],
  );
  useEffect(() => {
    console.log('timesheetDefaultDate?', timesheetDefaultDate);
    const _defaultDate = new Date(timesheetDefaultDate.getFullYear(), 1);
    const _selectedMonth = new Date(
      timesheetDefaultDate.getFullYear(),
      timesheetDefaultDate.getMonth(),
      1,
    );

    // Check if it's not a month picker change event
    if (!isMonthPickerChangeEvent) {
    }

    // Reset the isMonthPickerChangeEvent state
    if (isMonthPickerChangeEvent) setIsMonthPickerChangeEvent(false);
  }, [timesheetDefaultDate, isMonthPickerChangeEvent]);
  const handleMonthChange = (_date) => {
    if (fileid) {
      setfileid(null);
    }
    console.log('handle month change', _date);
    setIsMonthPickerChangeEvent(true);
    setTimesheetDefaultDate(_date);
  };

  const onSubmit = async (event) => {
    setSubmitting(true);
    const year = timesheetDefaultDate.getFullYear();
    const month = timesheetDefaultDate.getMonth() + 1;
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
                  value={selectedMonth}
                  onChange={handleMonthChange}
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
                    href={`${basepath}/api/staff/download/${fileid}`}
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
