import React, { useState } from 'react';
import {
  Text,
  Container,
  Button,
  ActionIcon,
  TextInput,
  Card,
} from '@mantine/core';
import { IconCalendarEvent } from '@tabler/icons';
import axios from 'axios';
import UserStyle from '/styles/User.module.css'
import { basepath } from 'global';
const CalendarManagementTab = () => {
  const [icsUrl, setIcsUrl] = useState(
    'https://www.1823.gov.hk/common/ical/gc/tc.ics',
  );
  const handleGeneratePublicHoliday = async () => {
    try {
      await axios.post(`${basepath}/api/admin/publicholiday`, {
        icsFileUrl: 'https://www.1823.gov.hk/common/ical/gc/tc.ics',
      });
      console.log('Public holiday records generated successfully.');
    } catch (error) {
      console.error('Error generating public holiday records:', error);
    }
  };
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section p="sm" background ={`${basepath}/favicon.svg`}   className={UserStyle.adminSectionHeader}>
         <Text size="xl" weight={700} color="white">
          Calendar Manager
        </Text>
      </Card.Section>

      <TextInput
        mb="lg"
        label="ICS File URL"
        value={icsUrl}
        onChange={(event) => setIcsUrl(event.target.value)}
        placeholder="Enter ICS file URL"
      />

      <Button
        color="blue"
        onClick={handleGeneratePublicHoliday}
        leftIcon={<IconCalendarEvent />}
      >
        Generate Public Holidays
      </Button>
    </Card>
  );
};

export default CalendarManagementTab;
