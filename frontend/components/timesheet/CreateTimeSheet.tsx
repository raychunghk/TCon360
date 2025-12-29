/* eslint-disable react/react-in-jsx-scope */
'use client';
import useStore from '@/components/stores/zstore.ts';
import {
  Button,
  Card,
  Center,
  Grid,
  Group,
  MantineSize,
  Modal,
  Text,
} from '@mantine/core';
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

export default function CreateTimesheetPage({
  pickersize = 'md',
}: CreateTimesheetPageProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const { handleSubmit } = useReactHookForm();
  const [submitting, setSubmitting] = useState(false);
  const [fileid, setFileid] = useState<string | null>(null);

  // ---- Store values -------------------------------------------------------
  const {
    timesheetDefaultDate,
    setTimesheetDefaultDate,
    selectedMonth,
    setSelectedMonth,
    isMonthPickerChangeEvent,
    setIsMonthPickerChangeEvent,
    basepath,
  } = useStore();

  // ---- Local picker state (Date | null) -----------------------------------
  const [displayDate, setDisplayDate] = useState<Date | null>(null);
  const monthPickerRef = useRef<HTMLDivElement>(null);

  // ---- Sync store → local picker -----------------------------------------
  useEffect(() => {
    // Initialise from store (first render or when store changes externally)
    const initDate = selectedMonth ?? timesheetDefaultDate ?? new Date();
    const firstOfMonth = new Date(initDate.getFullYear(), initDate.getMonth(), 1);
    setDisplayDate(firstOfMonth);
  }, [selectedMonth, timesheetDefaultDate]);

  // ---- Picker change → store ---------------------------------------------
  const handlePickerChange = (_date: string) => {
    if (!_date) return;
    const date = new Date(_date);
    const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    console.log('first of month', firstOfMonth);
    setDisplayDate(firstOfMonth);
    setIsMonthPickerChangeEvent(true);
    setTimesheetDefaultDate(firstOfMonth);
    setSelectedMonth(firstOfMonth);
  };

  // ---- Submit ------------------------------------------------------------
  const onSubmit = async () => {
    if (!selectedMonth) return;

    setSubmitting(true);
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth() + 1;

    try {
      const response = await axios.post(`${basepath}/api/timesheet/create`, {
        year,
        month,
      });

      if ([200, 201].includes(response.status)) {
        setFileid(response.data.fileid);
        setModalOpen(true);
      }
    } catch (err) {
      console.error('Failed to create timesheet record:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // ---- Download -----------------------------------------------------------
  const handleDownloadFile = async () => {
    if (!fileid) return;

    const url = `${basepath}/api/staff/download/${fileid}`;
    const response = await axios.get(url, { responseType: 'blob' });
    const disposition = response.headers['content-disposition'] ?? '';
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    const filename = matches ? matches[1].replace(/['"]/g, '') : `${fileid}.xml`;
    download(response.data, filename);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    if (fileid) handleDownloadFile();
  };

  // -------------------------------------------------------------------------
  return (
    <>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <MyCard title="Create TimeSheet" cardwidth={225}>
          <Grid pb={5} ta="center">
            <Grid.Col span={12}>
              <Group justify="center">
                <MonthPicker
                  size={pickersize}
                  date={displayDate ?? undefined}
                  onDateChange={(date) => handlePickerChange(date)}
                  ref={monthPickerRef}
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
            <Button
              type="submit"
              fullWidth
              loading={submitting}
              maw="70%"
              radius="md"
            >
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