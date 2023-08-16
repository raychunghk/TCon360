import { Title, Text, Anchor, Group, Drawer } from '@mantine/core';

import { differenceInBusinessDays, subDays } from 'date-fns';
import { useEffect, useState, useRef } from 'react';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import FullCalendar from '@fullcalendar/react';
import LeaveRequestForm from 'components/LeaveRequest/LeaveRequestForm';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import { useDisclosure, useInputState } from '@mantine/hooks';
import { parseCookies, setCookie } from 'nookies';
import { useSession } from 'next-auth/react';
export function FrontPageCalendar(props) {
  const [opened, { open, close }] = useDisclosure(false);
  console.log('Calendar prosp?');
  const calendarRef = useRef(null);
  const basepath = process.env.basepath; //props.basepath;
  console.log(props);
  console.log('basepath?');
  console.log(basepath);

  const [calendarEvents, setCalendarEvents] = useState([]);
  const [leaveRequestId, setleaveRequestId] = useState(null);
  const [LeaveRequestPeriod, setLeaveRequestPeriod] = useState(null);
  const [formType, setFormType] = useState(null);
  const [selectedDatesCount, setSelectedDatesCount] = useState(0);
  //const [selectedDates, setSelectedDates] = useState([]);
  const [leavePurpose, setleavePurpose] = useState(null);
  const [staff, setStaff] = useState(null);
  const apiurl = `${basepath}/api/timesheet/calendar`;
  console.log('calendarurl');
  console.log(apiurl);
  async function fetchEvents() {
    try {
      const cookies = parseCookies();
      const _token = cookies.token;
      console.log(_token);
      if (!_token) {
        const { accessToken } = session;
        console.log(accessToken);
      }
      const headers = {
        Authorization: `Bearer ${_token}`,
      };
      const response = await axios.get(apiurl, {
        headers,
      });
      if ([200, 201].includes(response.status)) {
        console.log('gettting calendar');
        const events = await response.data;
        console.log(events);
        /*setCalendarEvents([
          { title: 'nice event', start: new Date(), end : new Date('18 aug 2023'), resourceId: 'a' },
        ]);*/
        console.log('calendar event length');
        console.log(calendarEvents.length);
        if (events.length >= calendarEvents.length) {
          setCalendarEvents(events);
        }
      } else {
        console.error('Failed to fetch events:', response);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  }

  const { data: session, status } = useSession();
  useEffect(() => {
    console.log('session?');
    console.log(session);

    if (session) {
      const sessionexpirydate = new Date(session.expires);
      const cookies = parseCookies();

      setCookie(null, 'token', cookies.token, {
        expires: sessionexpirydate,
        path: '/',
      });

      console.log(session.user.staff);
      setStaff(session.user.staff);
      const _tkn = session?.token;
      console.log('token???');
      console.log(_tkn);
      fetchEvents();
    }
  }, [session]);
  /*
  useEffect(() => {
  

    fetchEvents();
  }, []);*/
  const [date, setDate] = useState(new Date());
  const handleDeleteEvent = (eventId) => {
    // Call FullCalendar's removeEvent method to remove the event
    try {
      calendarRef.current.getApi().getEventById(eventId).remove();
      fetchEvents();
    } catch (error) {
      throw error;
      console.log(error);
    }
  };
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  const handleSelect = (arg) => {
    console.log(arg.start);
    console.log(arg.end);
  };
  const fnEventclick = (e) => {
    console.log('event click');
    console.log(e.event);
    console.log(e.event.title);
    console.log(e.event.id);
    const _leaveRequestid = e.event.extendedProps.result.LeaveRequestId;
    setleaveRequestId(_leaveRequestid);
    console.log('leave request id ');
    setFormType('edit');
    open();
  };
  const handleDateSelect = (selectInfo) => {
    console.log(selectInfo);

    const _start = selectInfo.start;
    const _end = selectInfo.end;
    const count = differenceInBusinessDays(_end, _start);
    console.log(`datediffer? ${count}`);
    const leaveRequestPeriodEnd = count == 1 ? null : subDays(_end, 1);

    setLeaveRequestPeriod({
      start: selectInfo.start,
      end: leaveRequestPeriodEnd,
    });

    const _leavePurpose = prompt(
      `Selected ${count} days, (${selectInfo.startStr} to ${selectInfo.endStr}) Enter a title for your event`,
    );
    if (_leavePurpose) {
      setleavePurpose(_leavePurpose);
      setFormType('create');
      setleaveRequestId(0);
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
      <Drawer opened={opened} onClose={close} size={550} title="Leave Request">
        {/* Drawer content */}
        {formType && (
          <LeaveRequestForm
            formType={formType}
            leaveRequestId={leaveRequestId}
            onDeleteEvent={handleDeleteEvent} // pass the callback function
            onClose={close}
            LeaveRequestPeriod={LeaveRequestPeriod}
            fetchEvents={fetchEvents}
            leavePurpose={leavePurpose}
          />
        )}
      </Drawer>

      <FullCalendar
        ref={calendarRef}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'resourceTimelineWeek,dayGridMonth,timeGridWeek',
        }}
        plugins={[dayGridPlugin, interactionPlugin]}
        height={'100%'}
        eventClick={fnEventclick}
        aspectRatio={1.5}
        initialView="dayGridMonth"
        selectable={true}
        events={calendarEvents}
        select={handleDateSelect} // Specify callback function for date range selection
      />
    </>
  );
}
