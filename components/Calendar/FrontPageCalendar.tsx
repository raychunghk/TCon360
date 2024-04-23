import { Button, Drawer, Text } from '@mantine/core';
import { differenceInBusinessDays, format, subDays } from 'date-fns';
import { useEffect, useState, useRef } from 'react';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import LeaveRequestForm from 'components/LeaveRequest/LeaveRequestForm';
import axios from 'axios';
import styles from './calendar.module.css';
import { useDisclosure, useInputState } from '@mantine/hooks';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { signOut, useSession } from 'next-auth/react';
import useStore from 'pages/reducers/zstore';
import useUIStore from 'pages/reducers/useUIStore';

import {
  convertDateStringToDate,
  isPublicHoliday,
  handleSelectAllow,
  isSameDate,
} from './calendar.util';
import CustomView from './customeView';
import { useStaffData } from 'components/useStaffData';
import { getBusinessDays } from 'components/util/leaverequest.util';
import { useRouter } from 'next/router';

export function FrontPageCalendar() {
  const handleSignout = () => {
    destroyCookie(null, 'token');
    //   dispatch(clearAllState());
    clearAllState();
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

  const [formType, setFormType] = useState(null);
  const { drawerOpened, setDrawerOpen, setDrawerClose } = useUIStore();
  const {
    LeaveRequestPeriod,
    setLeaveRequestPeriod,
    setStaffVacation,

    setCalendarEvents,
    calendarEvents,
    setChargeableDays,
    leaveRequestId,
    setLeaveRequestId,
    clearAllState,
    timesheetDefaultDate,
    setTimesheetDefaultDate,
  } = useStore();

  const { isEventUpdated, setIsEventUpdated } = useUIStore();
  const calendarRef = useRef(null);
  const basepath = process.env.basepath; //props.basepath;
  const [customTitle, setCustomTitle] = useState('');
  const [hasCalendar, setHasCalendar] = useState(true);
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

        console.log(
          `calendar event length, ${calendarEvents.length}\r\n fetched event lenght: ${events.length}`,
        );

        if (isEventUpdated || events.length != calendarEvents.length) {
          await setCalendarEvents(events);
        }
        if (events.length === 0 && calendarEvents.length === 0) {
          setHasCalendar(false);
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
  //  const { data: session, status } = useSession();

  useEffect(() => {
    if (activeStaff) {
      fetchEvents();
    }

    return () => {
      // observer.disconnect();
    };
  }, []);
  const router = useRouter();
  useEffect(() => {
    if (isEventUpdated) {
      fetchEvents();
      setIsEventUpdated(false);
    }
  }, [isEventUpdated]);

  useEffect(() => {
    // Calculate total chargeable days whenever calendar events or date changes
    if (calendarEvents.length > 0) {
      setTitle(timesheetDefaultDate);
      if (activeUser) {
        setVacationSummary(activeUser, calendarEvents);
      }
    }
    //handleJumpToMonth(timesheetDefaultDate);
  }, [calendarEvents]);
  useEffect(() => {
    setTitle(timesheetDefaultDate);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
    }
    // handleJumpToMonth(timesheetDefaultDate);
  }, [timesheetDefaultDate]);

  /**
   * A function to handle jumping to a specific month on the calendar.
   *
   * @param {_date} _date - the date to jump to
   * @return {void}
   */
  const handleJumpToMonth = (_date) => {
    // if (!calendarRef.current) {

    try {
      const calendarApi = calendarRef.current.getApi();

      calendarApi.gotoDate(_date);
    } catch (error) {
      console.log(error);
    }
    //}
  };

  const handleOpenAdminPage = () => {
    router.push({
      pathname: '/admin',
      query: { tab: 'calendarManagement' },
    });
  };
  if (!hasCalendar) {
    return (
      <>
        <Text fw={500}>Calendar database is not initialized</Text>
        <Button variant="filled" onClick={handleOpenAdminPage}>
          Click to initialize Calendar in setting page
        </Button>
      </>
    );
  } else if (calendarEvents.length < 1) {
    return <Text>Loading...</Text>;
  }

  const handleDeleteEvent = async (eventId) => {
    // Call FullCalendar's removeEvent method to remove the event
    try {
      setIsEventUpdated(true);
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  };

  const fnEventclick = (e) => {
    console.log('event click', e.event);

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
    const timesheetDefaultDate = info.view.currentStart;
    //setCurrentStart(currentStart);
    setTimesheetDefaultDate(timesheetDefaultDate);
    console.log(' handleMonthYearChange, current start?', timesheetDefaultDate);
  }
  const { isWeekend } = require('date-fns');

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

    const vacationLeaveDays = vacationEvents.reduce((sum, event) => {
      const evt = event.extendedProps.result;
      const _end = new Date(event.end);
      const _leaveperiodstart = new Date(evt.leavePeriodStart);
      const _leaveperiodend = evt.leavePeriodEnd
        ? new Date(evt.leavePeriodEnd)
        : null;

      // If the event ends before the contract start date, don't count it
      if (_end < ContractStartDate) {
        return sum;
      }

      // If the event has no end date, count the full number of leave days
      if (!_leaveperiodend) {
        return sum + evt.leaveDays;
      }

      // If the event end date is after the contract end date, count the number of leave days up to the contract end date
      if (ContractEndDate < _leaveperiodend) {
        return sum + getBusinessDays(_leaveperiodstart, ContractEndDate);
      }

      // If the event start date is before the contract start date and the event end date is after the contract start date, count the number of leave days from the contract start date to the event end date
      if (
        _leaveperiodend > ContractStartDate &&
        _leaveperiodstart < ContractStartDate
      ) {
        return sum + getBusinessDays(ContractStartDate, _leaveperiodend);
      }

      // If the event end date is before the contract start date, don't count it
      if (_leaveperiodend < ContractStartDate) {
        return sum;
      }

      // Otherwise, count the full number of leave days
      return sum + evt.leaveDays;
    }, 0);

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
    const _customTitle = `${_dateRange} (Chargable days: ${_chargeableDays})`;
    setCustomTitle(_customTitle);
    // Update the state with the calculated chargeable days

    setChargeableDays(_chargeableDays);
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
      <style data-fullcalendar id="fcstyle" />
      <div className="calendar-container">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            listPlugin,
            timeGridPlugin,
          ]}
          aspectRatio={2.3}
          initialView="dayGridMonth"
          ref={calendarRef}
          headerToolbar={{
            center: 'title',
            start: 'dayGridMonth,cv',

            end: 'prev,next today',
          }}
          titleFormat={() => customTitle}
          eventClick={fnEventclick}
          events={calendarEvents}
          selectable={true}
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
      </div>
    </>
  );
}
