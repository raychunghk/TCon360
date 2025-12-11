/* eslint-disable react/react-in-jsx-scope */
// CreateTimesheetPage.tsx

'use client';
import useStore from '@/components/stores/zstore.ts';
import { Button, Card, Center, Grid, Group, MantineSize, Modal, Text } from '@mantine/core';
import { MonthPicker } from '@mantine/dates';
import { IconTableExport } from '@tabler/icons-react';
import axios from 'axios';
import download from 'downloadjs';
import { useEffect, useState } from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
import MyCard from '../MyCard';
import styles from './mp.module.css';

interface CreateTimesheetPageProps {
  pickersize?: MantineSize;
}
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
  const { handleSubmit } = useReactHookForm();
  const [submitting, setSubmitting] = useState(false);
  const [fileid, setfileid] = useState<boolean | null>(null);
  // defaultdate state is not strictly needed if selectedMonth is the source of truth
  // const [defaultdate, setDefaultDate] = useState<Date | string | undefined>(undefined); 
  const {
    setTimesheetDefaultDate,
    selectedMonth,
    setSelectedMonth,
    isMonthPickerChangeEvent,
    setIsMonthPickerChangeEvent,
    basepath,
    calendarRef,

  } = useStore();

  const [displayDate, setDisplayDate] = useState<Date>(selectedMonth);


  // Debugging: Log selectedMonth changes
  useEffect(() => {
    console.log('CreateTimesheetPage: selectedMonth updated to', selectedMonth);
    console.log('CreateTimesheetPage: selectedMonth year is', selectedMonth.getFullYear());
    setDisplayDate(selectedMonth);
  }, [selectedMonth]);

  // Sync: Calendar to Picker (already works via selectedMonth)
  useEffect(() => {
    if (isMonthPickerChangeEvent) {
      setIsMonthPickerChangeEvent(false);
    }
  }, [isMonthPickerChangeEvent, setIsMonthPickerChangeEvent]);

  // Sync: Picker to Calendar
  const handleMonthChange = (value: Date | null) => { // Changed value type to Date | null
    if (fileid) setfileid(null);
    if (!value) return; // Handle null case if user can clear selection

    console.log(`CreateTimesheetPage: MonthPicker onChange: value:`, value);
    const _date = new Date(value)
    const firstOfMonth = new Date(_date.getFullYear(), _date.getMonth(), 1);

    setIsMonthPickerChangeEvent(true);
    setTimesheetDefaultDate(firstOfMonth);
    setSelectedMonth(firstOfMonth);
    // setDefaultDate(new Date(value.getFullYear(), value.getMonth())); // This line is likely not needed
    const api = calendarRef?.current?.getApi();
    if (api) {
      api.gotoDate(firstOfMonth);
    }
  };

  const onSubmit = async () => {
    setSubmitting(true);
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth() + 1;

    const response = await axios.post(`${basepath}/api/timesheet/create`, { year, month });
    setSubmitting(false);

    if ([200, 201].includes(response.status)) {
      setfileid(response.data.fileid);
      setModalOpen(true);
    }
  };

  const handleDownloadFile = async () => {
    const url = `${basepath}/api/staff/download/${fileid}`;
    const response = await axios.get(url, { responseType: 'blob' });
    const filename = response.headers['content-disposition']
      ?.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)?.[1]
      ?? `${fileid}.xml`;
    download(response.data, filename);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    if (fileid) handleDownloadFile();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MyCard title="Create TimeSheet" cardwidth={225}>
          <Grid pb={5} ta="center">
            <Grid.Col span={12}>
              <Group justify="center">
                <MonthPicker
                  size={pickersize}
                  onChange={handleMonthChange}

                  // REMOVED: defaultDate prop, as 'value' makes it a controlled component
                  // defaultDate={new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1)}
                  value={selectedMonth} // Date object
                  date={displayDate}
                  onRateChange={setDisplayDate}
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
          <Card.Section bg="indigo.2" py="md" style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" loading={submitting} maw="70%" radius="md">
              Submit
            </Button>
          </Card.Section>
        </MyCard>
      </form>

      <Modal.Root opened={modalOpen} onClose={handleModalClose}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header bg="indigo.4" c="white">
            <Modal.Title><Text fw={700} fz="md">Success</Text></Modal.Title>
            <Modal.CloseButton bg="indigo.2" />
          </Modal.Header>
          <Modal.Body>
            <Text mt="md">Timesheet record created successfully!</Text>
            <Center>
              <Button mt="md" onClick={handleModalClose}>Ok</Button>
            </Center>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}