import { Title, Drawer } from '@mantine/core';

import { differenceInBusinessDays, format, subDays } from 'date-fns';
import { useEffect, useState, useRef } from 'react';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import LeaveRequestForm from 'components/LeaveRequest/LeaveRequestForm';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import styles from './calendar.module.css';
import { useDisclosure, useInputState } from '@mantine/hooks';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { signOut, useSession } from 'next-auth/react';

import { useDispatch, useSelector } from 'react-redux';
import {
  setOpen,
  setClose,
  setLeaveRequestId,
  setLeaveRequestPeriod,
  // setLeavePurpose,
  setStaff,
  setChargeableDays,
  //setCustomTitle,
  setCalendarEvents,
  setstaffVacation,
  clearAllState,
  // setFormType,
  // setSelectedDatesCount,
} from 'pages/reducers/calendarReducer';
import {
  convertDateStringToDate,
  handleSelectAllow,
  isSameDate,
} from './calendar.util';
import timeGridPlugin from '@fullcalendar/timegrid';
import CustomView from './customeView';

export function FrontPageCalendar() {
  const dispatch = useDispatch();
  const handleSignout = () => {
    destroyCookie(null, 'token');
    dispatch(clearAllState());
    signOut();
  };
  const {
    opened,
    leaveRequestId,
    LeaveRequestPeriod,
    chargeableDays,
    //   customTitle,
    calendarEvents,
    user,
    staffVacation,
    //  currentStart,
    //  formType,
    //  selectedDatesCount,
    //  leavePurpose,
    //  staff,
    //  session,
  } = useSelector((state) => ({
    opened: state.calendar.opened,
    leaveRequestId: state.calendar.leaveRequestId,
    LeaveRequestPeriod: state.calendar.LeaveRequestPeriod,
    chargeableDays: state.calendar.chargeableDays,
    customTitle: state.calendar.customTitle,
    calendarEvents: state.calendar.calendarEvents,
    user: state.calendar.user,
    staffVacation: state.calendar.staffVacation,
    //  currentStart: state.calendar.currentStart,
    //  formType: state.calendar.formType,
    //  selectedDatesCount: state.calendar.selectedDatesCount,
    //  leavePurpose: state.calendar.leavePurpose,
    //  staff: state.calendar.staff,
    //  session: state.calendar.session,
  }));

  const open = () => {
    dispatch(setOpen());
  };

  const close = () => {
    dispatch(setClose());
  };

  const setLeaveRequestPeriodAction = (period) => {
    dispatch(setLeaveRequestPeriod(period));
  };
  const [leavePurpose, setleavePurpose] = useState(null);
  //fconst [staff, setStaff] = useState(null);

  const [CurrentStart, setCurrentStart] = useState(new Date());
  const [formType, setFormType] = useState(null);

  const calendarRef = useRef(null);
  const basepath = process.env.basepath; //props.basepath;
  const [customTitle, setCustomTitle] = useState('');
  console.log('basepath?', basepath);

  //const [selectedDates, setSelectedDates] = useState([]);
  const apiurl = `${basepath}/api/timesheet/calendar`;

  async function fetchEvents() {
    if (session) {
      try {
        const cookies = parseCookies();
        const _token = cookies.token;
        console.log('_token?', _token);
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
          const events = await response.data;
          console.log('gettting calendar', events);

          console.log('calendar event length', calendarEvents.length);

          if (events.length != calendarEvents.length) {
            await dispatch(setCalendarEvents(events));
          }
        } else {
          console.error('Failed to fetch events:', response);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          handleSignout();
        } else {
          console.error('Error! Failed to fetch events:', error);
        }
      }
    }
  }

  const { data: session, status } = useSession();
  useEffect(() => {
    if (session) {
      const sessionexpirydate = new Date(session.expires);
      const cookies = parseCookies();
      if (cookies.token) {
        setCookie(null, 'token', cookies.token, {
          expires: sessionexpirydate,
          path: '/',
        });
      }

      const _tkn = session?.token;
      console.log('token???', _tkn);

      fetchEvents();
    }
  }, [session]);
  useEffect(() => {
    // Calculate total chargeable days whenever calendar events or date changes
    // const currentDate = new Date();
    setTitle(CurrentStart);
  }, [calendarEvents, CurrentStart]);
  useEffect(() => {
    if (user) {
      getVacationDays(user, calendarEvents);
    }
  }, [ calendarEvents]);
  const [date, setDate] = useState(new Date());
  const handleDeleteEvent = async (eventId) => {
    // Call FullCalendar's removeEvent method to remove the event
    try {
      calendarRef.current.getApi().getEventById(eventId).remove();
      fetchEvents();
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  };

  const fnEventclick = (e) => {
    console.log('event click');
    console.log(e.event);

    const _leaveRequestid = e.event.extendedProps.result.LeaveRequestId;
    dispatch(setLeaveRequestId(_leaveRequestid));
    console.log('leave request props?', e.event.extendedProps.result);

    if (_leaveRequestid) {
      setFormType('edit');
      open();
    }
  };

  function handleMonthYearChange(info) {
    if (calendarEvents.length == 0) {
      fetchEvents();
    }
    setTitle(info.view.currentStart);
  }
  function getVacationDays(_user, _events) {
    if (_user) {
      const ContractStartDate = new Date(user?.staff.ContractStartDate);
      const ContractEndDate = new Date(user?.staff.ContractEndDate);
      const vacationEvents = _events.filter((event) => {
        const evt = event.extendedProps.result;

        return evt.LeaveRequestId !== null;
      });

      const vacationLeaveDays = vacationEvents.reduce((sum, event) => {
        // Calculate the leaveDays based on the condition for paramEndDate
        const evt = event.extendedProps.result;
        const _leaveperiodstart = new Date(evt.leavePeriodStart);
        const _leaveperiodend = evt.leavePeriodEnd
          ? new Date(evt.leavePeriodEnd)
          : null;
        const leaveDays =
          ContractEndDate < _leaveperiodend
            ? (ContractEndDate - _leaveperiodstart) / (1000 * 60 * 60 * 24)
            : evt.leaveDays;

        return sum + leaveDays;
      }, 0);
      dispatch(
        setstaffVacation({
          total: user.staff.AnnualLeave,
          used: vacationLeaveDays,
          balance: user.staff.AnnualLeave - vacationLeaveDays,
        }),
      );
      console.log('vacationleavedays', vacationLeaveDays);
    }
  }
  function setTitle(newDate = new Date()) {
    // setCurrentStart(newDate);
    const currentYear = newDate.getFullYear(); // Get the year
    const currentMonth = newDate.getMonth(); // Get the month

    const formatDate = (date) => format(date, 'd-MMM-yyyy');
    const formattedFirstDay = formatDate(
      new Date(currentYear, currentMonth, 1),
    );
    const formattedLastDay = formatDate(
      new Date(currentYear, currentMonth + 1, 0),
    );

    const _dateRange = `${formattedFirstDay} to ${formattedLastDay}`;
    if (!user) {
      setCustomTitle(_dateRange);
      return;
    }
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
    dispatch(setChargeableDays(_chargeableDays));
    // Your logic here...
  }
  const handleDateSelect = (selectInfo) => {
    console.log(selectInfo);

    const _start = selectInfo.start;
    const _end = selectInfo.end;
    const count = differenceInBusinessDays(_end, _start);
    console.log(`datediffer? ${count}`);
    const leaveRequestPeriodEnd = count == 1 ? null : subDays(_end, 1);

    setLeaveRequestPeriodAction({
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
      dispatch(setLeaveRequestId(0));
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
          start: 'dayGridMonth,cv',

          end: 'prev,next today',
        }}
        titleFormat={() => customTitle}
        plugins={[dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin]}
        height={'100%'}
        eventClick={fnEventclick}
        aspectRatio={1.5}
        events={calendarEvents}
        selectable={true}
        // selectAllow={() => true}
        // initialView="timeGrid"
        initialView="dayGridMonth"
        selectAllow={(selectinfo) =>
          handleSelectAllow(selectinfo, calendarEvents)
        }
        datesSet={handleMonthYearChange}
        select={handleDateSelect} // Specify callback function for date range selection
        views={{
          dayGridMonth: {
            buttonText: 'Month',
          },
          listWeek: {
            type: 'list',
            //  duration: { weeks: 1 },
            buttonText: 'List',
          },
          timeGridFourDay: {
            type: 'timeGrid',
            duration: { days: 365 },
          },
          cv: {
            component: CustomView,
            buttonText: 'Leave Requests',
            events: calendarEvents,
            // Pass the events object to the custom view component
          },
        }}
      />
    </>
  );
}
