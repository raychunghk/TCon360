'use client';
import MyModal from '@/components/MyModal';
import useStore from '@/components/stores/zstore.ts';
import { Box, Button, Card, LoadingOverlay, Text, TextInput, Tooltip } from '@mantine/core';
import { IconCalendarEvent } from '@tabler/icons-react';
import axios from 'axios';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import commonstyle from '/styles/common.module.css';

import { SignOut } from '@/app/lib/auth-action';
import { usePublicHolidays } from '@/components/hooks/usePublicHolidays';

const CalendarManagementTab = () => {
  const [icsUrl, setIcsUrl] = useState('https://www.1823.gov.hk/common/ical/tc.json');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('Calendar is updated');
  const { loadPublicHolidays, publicHolidays } = usePublicHolidays();
  const [basepath, setIsUnauthorized] = useStore(useShallow((state) => [state.basepath, state.setIsUnauthorized]));

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleGeneratePublicHoliday = async (event) => {
    event.preventDefault();
    const api = `${basepath}/api/admin/publicholiday`;
    setLoading(true);

    try {
      const response = await axios.post(api, { icsUrl });
      if ([200, 201].includes(response.status)) {
        console.log('Public holiday records generated successfully');
        if (!publicHolidays || publicHolidays.length === 0) {
          console.log('No public holidays in state, refreshing');
          await loadPublicHolidays();
        } else {
          console.log('Public holidays already in state, skipping refresh');
        }
        setModalMsg(response.data.message);
        setModalOpen(true);
      } else {
        console.error('Error generating public holiday records:', response.statusText);
        setModalMsg(`Error: ${response.statusText}`);
        setModalOpen(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.message);
        if (error.response?.status === 401) {
          console.log('Received 401 Unauthorized, initiating sign-out');
          setIsUnauthorized(true);
          try {
            await SignOut();
            console.log('Sign-out successful');
            setModalMsg('Unauthorized: You have been signed out.');
          } catch (signOutError) {
            console.error('Sign-out failed:', signOutError);
            setModalMsg('Error: Sign-out failed.');
          }
        } else if (error.response) {
          setModalMsg(`Error: ${error.response.data.message || error.message}`);
        } else if (error.request) {
          setModalMsg('Error: No response from server.');
        } else {
          setModalMsg(`Error: ${error.message}`);
        }
      } else {
        console.error('Unexpected Error:', error);
        setModalMsg('An unexpected error occurred.');
      }
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maw={800} pos="relative">
      <LoadingOverlay visible={loading} overlayProps={{ radius: 'sm', blur: 2 }} />
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section p="sm" className={commonstyle.adminSectionHeader}>
          <Text size="xl" fw={700} color="white">
            Calendar Manager
          </Text>
        </Card.Section>
        <form onSubmit={handleGeneratePublicHoliday}>
          <TextInput
            my="sm"
            label="Hong Kong Public Holidays Data (Traditional Chinese)"
            value={icsUrl}
            onChange={(event) => setIcsUrl(event.target.value)}
            placeholder="Enter Hong Kong Government public holiday JSON file URL"
          />
          <Tooltip
            position="right"
            withArrow
            label="To generate calendar for the next 4 years and update public holiday database."
          >
            <Button type="submit" color="blue" leftSection={<IconCalendarEvent />}>
              Update Public Holiday Database
            </Button>
          </Tooltip>
        </form>
        <MyModal open={modalOpen} onClose={handleModalClose} msg={modalMsg} />
      </Card>
    </Box>
  );
};

export default CalendarManagementTab;