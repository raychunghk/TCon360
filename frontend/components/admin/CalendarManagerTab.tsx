import { useState } from 'react';
import { Text, Button, LoadingOverlay, TextInput, Card, Box, Tooltip } from '@mantine/core';
 
import commonstyle from '/styles/common.module.css';

import MyModal from '@/components/MyModal';
import useStore from '@/components/stores/zstore';
import { useShallow } from 'zustand/react/shallow';
  import axios, { AxiosError } from 'axios'; // Import AxiosError
import { IconCalendarEvent } from '@tabler/icons-react';
const CalendarManagementTab = () => {
  const [icsUrl, setIcsUrl] = useState('https://www.1823.gov.hk/common/ical/tc.json');
  const [loading, setLoading] = useState(false); // State to handle loading overlay
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('Calendar is updated'); // Default modal message
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const [basepath] = useStore(useShallow((state) => [state.basepath]));


const handleGeneratePublicHoliday = async (event) => {
  event.preventDefault(); 
  const api = `${basepath}/api/admin/publicholiday`;
  setLoading(true);

  try {
    const response = await axios.post(api, {
      icsUrl: icsUrl,
    });

    if ([200, 201].includes(response.status)) {
      console.log('Public holiday records generated successfully.');
      setModalMsg(response.data.message); 
      setModalOpen(true);
    } else {
      // Handle non-200/201 responses as errors
      console.error('Error generating public holiday records:', response.statusText);
      setModalMsg(`Error: ${response.statusText}`); 
      setModalOpen(true);
    }
  } catch (error) {
    // Use AxiosError for better type safety
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.message);
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Data:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
        setModalMsg(`Error: ${error.response.data.message || error.message}`); 
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request:', error.request);
        setModalMsg('Error: No response from server.'); 
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
        setModalMsg(`Error: ${error.message}`); 
      }
    } else {
      // Handle unexpected errors
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
              Update Calendar Database
            </Button>
          </Tooltip>
        </form>{' '}
        <MyModal open={modalOpen} onClose={handleModalClose} msg={modalMsg} />
      </Card>
    </Box>
  );
};

export default CalendarManagementTab;
