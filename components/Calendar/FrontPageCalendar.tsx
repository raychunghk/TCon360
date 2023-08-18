import { Title, Text, Anchor, Group, Drawer } from '@mantine/core';

import { differenceInBusinessDays, subDays } from 'date-fns';
import { useEffect, useState, useRef } from 'react';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import FullCalendar from '@fullcalendar/react';
import LeaveRequestForm from 'components/LeaveRequest/LeaveRequestForm';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import styles from './calendar.module.css';
import { useDisclosure, useInputState } from '@mantine/hooks';
import { parseCookies, setCookie } from 'nookies';
import { useSession } from 'next-auth/react';
export function FrontPageCalendar(props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [leaveRequestId, setleaveRequestId] = useState(null);
  const [LeaveRequestPeriod, setLeaveRequestPeriod] = useState(null);
  const [leavePurpose, setleavePurpose] = useState(null);
  const [staff, setStaff] = useState(null);
  const [chargeableDays, setChargeableDays] = useState(0);
  const [customTitle, setCustomTitle] = useState('');
  const [calendarEvents, setCalendarEvents] = useState([]);

  const [CurrentStart, setCurrentStart] = useState(new Date());
  const [formType, setFormType] = useState(null);
  const [selectedDatesCount, setSelectedDatesCount] = useState(0);
  console.log('Calendar prosp?');
  const calendarRef = useRef(null);
  const basepath = process.env.basepath; //props.basepath;
  console.log(props);
  console.log('basepath?');
  console.log(basepath);
  //const [selectedDates, setSelectedDates] = useState([]);
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

        console.log('calendar event length');
        console.log(calendarEvents.length);
        if (events.length != calendarEvents.length) {
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
  useEffect(() => {
    // Calculate total chargeable days whenever calendar events or date changes
    // const currentDate = new Date();
    setTitle(CurrentStart);
  }, [calendarEvents, CurrentStart]);
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

    const _leaveRequestid = e.event.extendedProps.result.LeaveRequestId;
    setleaveRequestId(_leaveRequestid);
    console.log('leave request props?');
    console.log(e.event.extendedProps.result);
    if (_leaveRequestid) {
      setFormType('edit');
      open();
    }
  };
  const convertDateStringToDate = (dateString) => {
    const parts = dateString.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const day = parseInt(parts[2]);

    return new Date(year, month, day);
  };
  const isSameDate = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  const handleSelectAllow = (selectInfo) => {
    const selectedDate = selectInfo.start;

    // Disable selection on weekends (Saturday and Sunday)
    if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
      return false;
    }
    /*const hasEventsOnSelectedDate = calendarEvents.some((event) =>
      isSameDate(convertDateStringToDate(event.start), selectedDate),
    );*/
    const hasEventsOnSelectedDate = calendarEvents.some((event) => {
      const eventStartDate = convertDateStringToDate(event.start);
      const eventEndDate = event.end
        ? convertDateStringToDate(event.end)
        : eventStartDate;

      if (isSameDate(eventStartDate, selectedDate)) {
        return true;
      }

      if (
        event.end &&
        selectedDate >= eventStartDate &&
        selectedDate < eventEndDate
      ) {
        return true;
      }

      return false;
    });
    return !hasEventsOnSelectedDate;

    //return true;
  };
  function handleMonthYearChange(info) {
    if (calendarEvents.length == 0) {
      fetchEvents();
    }
    setTitle(info.view.currentStart);
  }
  function setTitle(newDate) {
    setCurrentStart(newDate);
    const currentYear = newDate.getFullYear(); // Get the year
    const currentMonth = newDate.getMonth(); // Get the month
    console.log('New year:', currentYear);
    console.log('New month:', currentMonth);

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const formattedFirstDay = firstDayOfMonth.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const formattedLastDay = lastDayOfMonth.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const _dateRange = `${formattedFirstDay} to ${formattedLastDay}`;

    const filteredEvents = calendarEvents.filter(
      (event) =>
        event.extendedProps.result.Year === currentYear &&
        event.extendedProps.result.Month === currentMonth + 1,
    );

    const totalDaysInMonth = new Date(
      currentYear,
      currentMonth + 1,
      0,
    ).getDate();
    console.log('total days in month', totalDaysInMonth);
    const leaveDays = filteredEvents.reduce(
      (total, event) => (total += event.extendedProps.result.leaveDays || 0),
      0,
    );
    console.log('total leave days ', leaveDays);

    const _chargeableDays = totalDaysInMonth - leaveDays;
    const _customTitle = `${_dateRange} (chargable days: ${_chargeableDays})`;
    setCustomTitle(_customTitle);
    // Update the state with the calculated chargeable days
    setChargeableDays(_chargeableDays);
    // Your logic here...
  }
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

    //const selectedDate = arg.start;

    // Access the events data from the FullCalendar component

    // Iterate through the events to check if any events intersect with the selected date

    const _leavePurpose = prompt(
      `Selected ${count} days, (${selectInfo.startStr} to ${selectInfo.endStr}) Enter a title for your event`,
    );
    if (_leavePurpose) {
      setleavePurpose(_leavePurpose);
      setFormType('create');
      setleaveRequestId(0);
      open();
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
          center: 'title',
          start: '',

          end: 'prev,next today',
        }}
        titleFormat={() => customTitle}
        // views={{
        //   customTitle: {
        //     type: 'dayGridMonth',
        //     // Other view-specific options...
        //   },
        // }}
        // customButtons={{
        //   customTitle: {
        //     text: 'Custom Text', // Specify your custom text here

        //     click: function () {
        //       // Handle custom title click event (optional)
        //     },
        //   },
        // }}
        plugins={[dayGridPlugin, interactionPlugin]}
        height={'100%'}
        eventClick={fnEventclick}
        aspectRatio={1.5}
        initialView="dayGridMonth"
        selectable={true}
        events={calendarEvents}
        selectAllow={handleSelectAllow}
        select={handleDateSelect} // Specify callback function for date range selection
        datesSet={handleMonthYearChange}
      />
    </>
  );
}
