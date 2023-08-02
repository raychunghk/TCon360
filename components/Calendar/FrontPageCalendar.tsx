import { Title, Text, Anchor, Group, Drawer } from '@mantine/core'
import useStyles from './Calendar.styles'

import { Calendar } from '@mantine/dates'
import { differenceInBusinessDays, subDays } from 'date-fns'
import { useEffect, useState, useRef } from 'react'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import FullCalendar from '@fullcalendar/react'
import LeaveRequestForm from 'components/LeaveRequest/LeaveRequestForm'
import dayGridPlugin from '@fullcalendar/daygrid'
import axios from 'axios'
import { useDisclosure } from '@mantine/hooks'
export function FrontPageCalendar(props) {
  const [opened, { open, close }] = useDisclosure(false);
  console.log('Calendar prosp?')
  const calendarRef = useRef(null);
  const basepath = process.env.basepath //props.basepath;
  console.log(props)
  console.log('basepath?')
  console.log(basepath)
  const { classes } = useStyles()
  const [calendarEvents, setCalendarEvents] = useState([])
  const [leaveRequestId, setleaveRequestId] = useState(null);
  const [LeaveRequestPeriod, setLeaveRequestPeriod] = useState(null)
  const [formType, setFormType] = useState(null);
  const [selectedDatesCount, setSelectedDatesCount] = useState(0);
  const [selectedDates, setSelectedDates] = useState([])

  const apiurl = `${basepath}/api/timesheet/calendar`
  console.log('calendarurl')
  console.log(apiurl)
  async function fetchEvents() {
    const response = await axios.get(apiurl
      //   , {
      //   params: { year: year, month: month },
      // }
    );
    if ([200, 201].includes(response.status)) {
      console.log('gettting calendar');
      console.log(response.data);
      const events = await response.data;
      setCalendarEvents(events);
    } else {
      console.error('Failed to fetch events:', response);
    }
  }
  useEffect(() => {
    /*const fetchEvents = async () => {
      const response = await axios.get(apiurl, {
        params: { year: 2023, month: 7 }, // adjust parameters as needed
      })
      if ([200, 201].includes(response.status)) {
        console.log('gettting calendar')
        console.log(response.data)
        const events = await response.data
        setCalendarEvents(events)
        // reset();
      } else {
        console.error('Failed to create timesheet record:', response)
      }
    }*/

    fetchEvents();
  }, [])
  const [date, setDate] = useState(new Date())
  const handleDeleteEvent = (eventId) => {
    // Call FullCalendar's removeEvent method to remove the event
    try {
      calendarRef.current.getApi().getEventById(eventId).remove();
      fetchEvents();
    } catch (error) {
      throw (error);
      console.log(error)
    }

  };
  const handleDateChange = newDate => {
    setDate(newDate)
  }
  const handleSelect = arg => {
    console.log(arg.start)
    console.log(arg.end)
  }
  const fnEventclick = e => {
    console.log("event click")
    console.log(e.event)
    console.log(e.event.title)
    console.log(e.event.id)
    const _leaveRequestid = e.event.extendedProps.result.LeaveRequestId;
    setleaveRequestId(_leaveRequestid);
    console.log('leave request id ')
    setFormType('edit')
    open();
  }
  const handleDateSelect = (selectInfo) => {
    console.log(selectInfo)


    let count;
    const _start = selectInfo.start;
    const _end = selectInfo.end;
    count = differenceInBusinessDays(_end, _start);
    console.log(`datediffer? ${count}`)
    let leaveRequestPeriodEnd = count == 1 ? null : subDays(_end, 1);

    setLeaveRequestPeriod({
      start: selectInfo.start,
      end: leaveRequestPeriodEnd
    })
    const selectedDates = [];
    let date = selectInfo.start;
    /* while (date < selectInfo.end) {
       selectedDates.push(date);
       date = new Date(date.getTime() + 24 * 60 * 60 * 1000); // add one day
     }
     setSelectedDatesCount(selectedDates.length);
 */

    const title = prompt(`Selected ${count} days, (${selectInfo.startStr} to ${selectInfo.endStr}) Enter a title for your event`);
    if (title) {
      setFormType('create')
      setleaveRequestId(0)
      open();
      /*
      setCalendarEvents([...calendarEvents, {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      }]);*/
    }
  };
  return (
    <>
      <Title className={classes.title} align='center' mt={20}>
        Welcome to{' '}
        <Text inherit variant='gradient' component='span'>
          NxTime
        </Text>
      </Title>
      <Drawer opened={opened} onClose={close} size={550} title="Leave Request">
        {/* Drawer content */}
        {formType && <LeaveRequestForm formType={formType} leaveRequestId={leaveRequestId} onDeleteEvent={handleDeleteEvent} // pass the callback function
          onClose={close}
          LeaveRequestPeriod={LeaveRequestPeriod}
          fetchEvents={fetchEvents}
        />}

      </Drawer>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        height={600}
        eventClick={fnEventclick}
        aspectRatio={1.5}

        initialView='dayGridMonth'
        selectable={true}

        events={calendarEvents}
        select={handleDateSelect} // Specify callback function for date range selection
      />
    </>
  )
}
