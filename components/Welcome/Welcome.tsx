import { Title, Text, Anchor, Group } from '@mantine/core';
import useStyles from './Welcome.styles';

import { Calendar } from '@mantine/dates';

import { useEffect, useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
export function Welcome(props) {
  const basepath = process.env.basepath; //props.basepath;
  console.log(props);
  console.log('basepath?', basepath);
  console.log(basepath);
  const { classes } = useStyles();
  const [calendarEvents, setCalendarEvents] = useState([]);
  const apiurl = `${basepath}/api/timesheet/calendar`;
  console.log('calendarurl', apiurl);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get(apiurl, {
        params: { year: 2023, month: 7 }, // adjust parameters as needed
      });
      if ([200, 201].includes(response.status)) {
        console.log('gettting calendar', response.data);

        const events = await response.data;
        setCalendarEvents(events);
      } else {
        console.error('Failed to create timesheet record:', response);
      }
    };

    fetchEvents();
  }, []);
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const fnEventclick = (e) => {
    console.log(e.event);
    console.log(e.event.title);
  };
  return (
    <>
      <Title className={classes.title} align="center" mt={20}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span">
          NxTime
        </Text>
      </Title>

      <FullCalendar
        plugins={[dayGridPlugin]}
        height={600}
        eventClick={fnEventclick}
        aspectRatio={1.5}
        initialView="dayGridMonth"
        events={calendarEvents}
      />
    </>
  );
}
