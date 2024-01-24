import { Button, Drawer, Text } from '@mantine/core';

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
import useStore from 'pages/reducers/zstore';
import useUIStore from 'pages/reducers/useUIStore';
import { useDispatch, useSelector } from 'react-redux';
import {
  setOpen,
  setClose,
  setLeaveRequestId,
  //setLeaveRequestPeriod,
  // setLeavePurpose,
  setChargeableDays,
  //setCustomTitle,
  //setCalendarEvents,
  clearAllState,
  // setFormType,
  // setSelectedDatesCount,
} from 'pages/reducers/calendarReducer';
import {
  convertDateStringToDate,
  isPublicHoliday,
  handleSelectAllow,
  isSameDate,
} from './calendar.util';
import timeGridPlugin from '@fullcalendar/timegrid';
import CustomView from './customeView';
import { useStaffData } from 'components/useStaffData';
import { useShallow } from 'zustand/react/shallow';

export function FrontPageCalendar() {
  const dispatch = useDispatch();

  const handleSignout = () => {
    destroyCookie(null, 'token');
    dispatch(clearAllState());
    signOut();
  };
  // const { opened } = useSelector((state) => ({
  //   opened: state.calendar.opened,
  // }));

  // const open = () => {
  //   dispatch(setOpen());
  // };

  // const close = () => {
  //   dispatch(setClose());
  // };

  const setLeaveRequestPeriodAction = (period) => {
    setLeaveRequestPeriod(period);
    period;
  };
  const [leavePurpose, setleavePurpose] = useState(null);

  //const [CurrentStart, setCurrentStart] = useState(new Date());
  const [formType, setFormType] = useState(null);
  const { drawerOpened, setDrawerOpen, setDrawerClose } = useUIStore();
  const {
    LeaveRequestPeriod,
    setLeaveRequestPeriod,
    setStaffVacation,
    currentStart,
    setCurrentStart,
    setCalendarEvents,
    calendarEvents,
    setChargeableDays,
    leaveRequestId,
    setLeaveRequestId,
  } = useStore();

  const [isEventUpdated, setIsEventUpdated] = useUIStore(
    useShallow((state) => [state.isEventUpdated, state.setIsEventUpdated]),
  );
  const calendarRef = useRef(null);
  const basepath = process.env.basepath; //props.basepath;
  const [customTitle, setCustomTitle] = useState('');
  console.log('basepath?', basepath);
  const apiurl = `${basepath}/api/timesheet/calendar`;

  async function fetchEvents() {
    try {
      const cookies = parseCookies();
      const _token = cookies.token;
      console.log('_token?', _token);
      if (!_token) {
        return;
      }
      const headers = {
        Authorization: `Bearer ${_token}`,
      };
      const response = await axios.get(apiurl, {
        headers,
      });
      if ([200, 201].includes(response.status)) {
        const events = await response.data;

        console.log('calendar event length', calendarEvents.length);

        if (isEventUpdated || events.length != calendarEvents.length) {
          await setCalendarEvents(events);
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
  const { activeStaff, activeContract, isAuthenticated, activeUser } =
    useStaffData();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (activeStaff) {
      fetchEvents();
    }
  }, []);
  useEffect(() => {
    if (isEventUpdated) {
      fetchEvents();
      setIsEventUpdated(false);
    }
  }, [isEventUpdated]);

  useEffect(() => {
    // Calculate total chargeable days whenever calendar events or date changes
    if (calendarEvents.length > 0) {
      setTitle(currentStart);
      if (activeUser) {
        setVacationSummary(activeUser, calendarEvents);
      }
    }
  }, [calendarEvents, currentStart]);

  if (calendarEvents.length < 1) {
    return <Text>Loading...</Text>;
  }

  // useEffect(() => {

  // }, [calendarEvents]);

  const handleDeleteEvent = async (eventId) => {
    // Call FullCalendar's removeEvent method to remove the event
    try {
      //calendarRef.current.getApi().getEventById(eventId).remove();
      setIsEventUpdated(true);
      // fetchEvents();
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  };

  const fnEventclick = (e) => {
    console.log('event click');
    console.log(e.event);

    const _leaveRequestid = e.event.extendedProps.result.LeaveRequestId;

    setLeaveRequestId(_leaveRequestid);
    console.log('leave request props?', e.event.extendedProps.result);

    if (_leaveRequestid) {
      setFormType('edit');
      setDrawerOpen();
    }
  };

  function handleMonthYearChange(info) {
    if (calendarEvents.length == 0) {
      fetchEvents();
    }
    const currentStart = info.view.currentStart;
    setCurrentStart(currentStart);
    console.log(' handleMonthYearChange, current start?', currentStart);
  }
  const { isWeekend } = require('date-fns');

  const getBusinessDays = (startDate, endDate) => {
    let count = 0;
    const current = new Date(startDate);

    while (current <= endDate) {
      if (!isWeekend(current) && !isPublicHoliday(current, calendarEvents)) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }

    return count;
  };
  function setVacationSummary(_user, _events) {
    if (!_user) {
      return;
    }

    const ContractStartDate = new Date(activeContract.ContractStartDate);
    const ContractEndDate = new Date(activeContract.ContractEndDate);

    const vacationEvents = _events.filter((event) => {
      const evt = event.extendedProps.result;
      const _leaveperiodstart = new Date(evt.leavePeriodStart);
      const _leaveperiodend = evt.leavePeriodEnd
        ? new Date(evt.leavePeriodEnd)
        : null;

      return (
        evt.LeaveRequestId !== null &&
        _leaveperiodstart <= ContractEndDate &&
        (_leaveperiodend !== null || _leaveperiodstart > ContractStartDate)
      );
    });
    console.log('vacation events', vacationEvents);
    const vacationLeaveDays = vacationEvents.reduce((sum, event) => {
      const evt = event.extendedProps.result;
      const _end = new Date(event.end);
      const _leaveperiodstart = new Date(evt.leavePeriodStart);
      const _leaveperiodend = evt.leavePeriodEnd
        ? new Date(evt.leavePeriodEnd)
        : null;

      if (_end < ContractStartDate) {
        return sum;
      }

      if (!_leaveperiodend) {
        return sum + evt.leaveDays;
      }

      if (ContractEndDate < _leaveperiodend) {
        return sum + getBusinessDays(_leaveperiodstart, ContractEndDate);
      }

      if (
        _leaveperiodend > ContractStartDate &&
        _leaveperiodstart < ContractStartDate
      ) {
        return sum + getBusinessDays(ContractStartDate, _leaveperiodend);
      }

      if (_leaveperiodend < ContractStartDate) {
        return sum;
      }

      return sum + evt.leaveDays;
    }, 0);

    console.log('vacationleavedays', vacationLeaveDays);

    setStaffVacation({
      total: activeContract.AnnualLeave,
      used: vacationLeaveDays,
      balance: activeContract.AnnualLeave - vacationLeaveDays,
    });
  }
  function setTitle(newDate = new Date()) {
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
    if (!activeUser) {
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
    //dispatch(setChargeableDays(_chargeableDays));
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

    setLeaveRequestPeriodAction({
      start: selectInfo.start,
      end: leaveRequestPeriodEnd,
    });

    // Access the events data from the FullCalendar component

    // Iterate through the events to check if any events intersect with the selected date

    const _leavePurpose = prompt(
      `Selected ${count} days, (${selectInfo.startStr} to ${selectInfo.endStr}) Enter a title for your event`,
    );
    if (_leavePurpose) {
      setleavePurpose(_leavePurpose);
      setFormType('create');
      //dispatch(setLeaveRequestId(0));
      setLeaveRequestId(0);
      //open();
      setDrawerOpen();
    }
  };

  return (
    <>
      <Drawer
        opened={drawerOpened}
        onClose={setDrawerClose}
        size={550}
        title="Leave Request"
      >
        {/* Drawer content */}
        {formType && (
          <LeaveRequestForm
            formType={formType}
            leaveRequestId={leaveRequestId}
            onDeleteEvent={handleDeleteEvent} // pass the callback function
            onClose={setDrawerClose}
            LeaveRequestPeriod={LeaveRequestPeriod}
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
        //weekNumbers={true}
        //weekNumbersWithinDays={false}
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
            component: (props) => (
              <CustomView {...props} userStaff={activeStaff} />
            ),
            buttonText: 'Leave Requests',
            events: calendarEvents,
            // Pass the events object to the custom view component
          },
        }}
      />
    </>
  );
}
