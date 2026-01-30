/* eslint-disable react/react-in-jsx-scope */
'use client';

import { useRippleEffect } from '@/components/hooks/useRippleEffect';
import useStore from '@/components/stores/zstore';
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
import { useForm } from 'react-hook-form';
import MyCard from '../MyCard';
import * as classes from './CreateTimeSheet.css';
import * as rippleClasses from '@/styles/ripple.css';
import './MonthPickerGlobalStyles.css';

interface CreateTimesheetPageProps {
  pickersize?: MantineSize;
  cardWidth?: number;
}

function ensureDate(value: unknown, context?: string): Date | null {
  if (value == null) return null;

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      console.warn(
        `CreateTimesheetPage: Invalid Date object${context ? ` (${context})` : ''}:`,
        value,
      );
      return null;
    }
    return value;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    if (typeof value === 'string') {
      console.warn(
        `CreateTimesheetPage: Converting string to Date${context ? ` (${context})` : ''}:`,
        value,
      );
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      console.warn(
        `CreateTimesheetPage: Could not parse date value${context ? ` (${context})` : ''}:`,
        value,
      );
      return null;
    }

    return parsed;
  }

  console.warn(
    `CreateTimesheetPage: Unexpected date value type${context ? ` (${context})` : ''}:`,
    value,
  );
  return null;
}

export default function CreateTimesheetPage({
  pickersize = 'sm',
  cardWidth = 210,
}: CreateTimesheetPageProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fileid, setFileid] = useState<string | null>(null);

  const { handleSubmit } = useForm();
  const handleRipple = useRippleEffect(rippleClasses.ripple);

  // Store values
  const {
    timesheetDefaultDate,
    setTimesheetDefaultDate,
    selectedMonth,
    setSelectedMonth,
    setIsMonthPickerChangeEvent,
    basepath,
    calendarRef,
  } = useStore();

  // Local controlled view date for MonthPicker
  const [displayDate, setDisplayDate] = useState<Date>(() => {
    const initRaw = selectedMonth ?? timesheetDefaultDate ?? new Date();
    const init = ensureDate(initRaw, 'displayDate init') ?? new Date();
    return new Date(init.getFullYear(), init.getMonth(), 1);
  });

  const monthPickerRef = useRef<HTMLDivElement>(null);

  // Sync store → local display date when external changes happen
  useEffect(() => {
    const initRaw = selectedMonth ?? timesheetDefaultDate;
    const init = ensureDate(initRaw, 'store sync');
    if (!init) return;

    const firstOfMonth = new Date(init.getFullYear(), init.getMonth(), 1);
    const safeDateForComparison = ensureDate(displayDate);
    if (!safeDateForComparison) return;  // Skip if invalid

    if (
      firstOfMonth.getFullYear() !== safeDateForComparison.getFullYear() ||
      firstOfMonth.getMonth() !== safeDateForComparison.getMonth()
    ) {
      setDisplayDate(firstOfMonth);
    }

  }, [selectedMonth, timesheetDefaultDate]);

  // When user changes month/year in picker → update store
  const handleDateChange = (newDate: Date) => {
    const parsed = ensureDate(newDate, 'handleDateChange');
    if (!parsed) return;

    const firstOfMonth = new Date(
      parsed.getFullYear(),
      parsed.getMonth(),
      1,
    );

    setDisplayDate(firstOfMonth);
    setIsMonthPickerChangeEvent(true);
    setTimesheetDefaultDate(firstOfMonth);
    setSelectedMonth(firstOfMonth);
  };

  const onSubmit = async () => {
    const selectedMonthDate = ensureDate(selectedMonth, 'onSubmit selectedMonth');
    if (!selectedMonthDate) return;

    setSubmitting(true);

    const year = selectedMonthDate.getFullYear();
    const month = selectedMonthDate.getMonth() + 1;

    try {
      const response = await axios.post(`${basepath}/api/timesheet/create`, {
        year,
        month,
      });

      if (response.status === 200 || response.status === 201) {
        setFileid(response.data.fileid);
        setModalOpen(true);
      }
    } catch (err) {
      console.error('Failed to create timesheet:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadFile = async () => {
    if (!fileid) return;

    try {
      const url = `${basepath}/api/staff/download/${fileid}`;
      const response = await axios.get(url, { responseType: 'blob' });

      const disposition = response.headers['content-disposition'] ?? '';
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(disposition);
      const filename = matches
        ? matches[1].replace(/['"]/g, '')
        : `timesheet_${fileid}.xml`;

      download(response.data, filename, 'application/xml');
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    if (fileid) {
      handleDownloadFile();
    }
  };

  //Do not remove this func, this is made to interact on FrontPageCalendar
  const handleMonthChange = (value: Date | null) => {
    // Changed value type to Date | null
    if (fileid) setFileid(null);

    const parsed = ensureDate(value, 'MonthPicker onChange');
    if (!parsed) return;

    console.log(`CreateTimesheetPage: MonthPicker onChange: value:`, value);

    const firstOfMonth = new Date(parsed.getFullYear(), parsed.getMonth(), 1);

    setIsMonthPickerChangeEvent(true);
    setTimesheetDefaultDate(firstOfMonth);
    setSelectedMonth(firstOfMonth);
    // setDefaultDate(new Date(value.getFullYear(), value.getMonth())); // This line is likely not needed
    const api = calendarRef?.current?.getApi();
    if (api) {
      api.gotoDate(firstOfMonth);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MyCard
          title="Create TimeSheet"
          cardwidth={cardWidth}
          className={`${classes.container} ${classes.myCardOverride}`}
          headerClassName={classes.widgetTitle}

        >
          <Grid pb={2} ta="center">
            <Grid.Col span={12}>
              <Group justify="center">
                <MonthPicker
                  size={pickersize}
                  date={displayDate}
                  onChange={handleMonthChange}
                  value={ensureDate(selectedMonth, 'MonthPicker value') ?? null}
                  onDateChange={setDisplayDate}
                  ref={monthPickerRef}

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
                    onClick={handleRipple}
                    className={`${rippleClasses.rippleContainer} ${rippleClasses.rippleActive}`}
                  >
                    Download TimeSheet
                  </Button>
                )}
              </Group>
            </Grid.Col>
          </Grid>

          <Card.Section inheritPadding className={classes.submitSection}>
            <Button
              type="submit"
              fullWidth
              loading={submitting}
              disabled={submitting}
              radius="md"
              onClick={handleRipple}
              className={`${classes.submitButton} ${rippleClasses.rippleContainer} ${rippleClasses.rippleActive}`}
            >
              {submitting ? 'Submitting...' : 'Submit'}
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
              <Button
                mt="md"
                onClick={(event) => {
                  handleRipple(event);
                  handleModalClose();
                }}
                className={`${rippleClasses.rippleContainer} ${rippleClasses.rippleActive}`}
              >
                Ok
              </Button>
            </Center>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
