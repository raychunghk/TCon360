'user client'
import LeaveRequestForm from '@/components/LeaveRequest/LeaveRequestForm';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Button, Drawer, Text } from '@mantine/core';
import axios, { AxiosError } from 'axios';
import { differenceInBusinessDays, format, subDays } from 'date-fns';
import { signOut } from 'next-auth/react';
import { destroyCookie, parseCookies } from 'nookies';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  handleSelectAllow
} from './calendar.util';
import CustomView from './customeView';

import { getBusinessDays } from '@/components/util/leaverequest.util';

import useUIStore from '@/components/stores/useUIStore';
import useStore from '@/components/stores/zstore';
import router from 'next/router';
import { useShallow } from 'zustand/react/shallow';

const FrontPageCalendar = () => {
  const handleSignout = () => {
    destroyCookie(null, 'token');
    clearAllState();
    signOut();
  };
  type FormType = 'create' | 'edit';
  const setLeaveRequestPeriodAction = (period) => {
    setLeaveRequestPeriod(period);
    period;
  };
  //const [leavePurpose, setleavePurpose] = useState(null);
  const [leavePurpose, setleavePurpose] = useState<string | null>(null);

  const [formType, setFormType] = useState<FormType | undefined>(undefined);
  const { drawerOpened, setDrawerOpen, setDrawerClose } = useUIStore();
  const {
    setLeaveRequestPeriod,
    setStaffVacation,
    setCalendarEvents,
    setIsFrontCalendarChangeEvent,
    setSelectedMonth,
    clearAllState,
    timesheetDefaultDate,
    calendarEvents,
    setChargeableDays,
    setLeaveRequestId,
    leaveRequestId, activeStaff, setTimesheetDefaultDate

  } = useStore();
  const [LeaveRequestPeriod, isMonthPickerChangeEvent, isFrontCalendarChangeEvent, activeUser, activeContract, basepath] = useStore(
    useShallow((state) => [
      state.LeaveRequestPeriod,
      state.isMonthPickerChangeEvent,
      state.isFrontCalendarChangeEvent,
      state.activeUser,
      state.activeContract,
      state.basepath
    ])
  );
  const { isEventUpdated, setIsEventUpdated } = useUIStore();
  const [renderCount, setRenderCount] = useState(0);
  const calendarRef = useRef<FullCalendar | null>(null);
  //const calendarRef = useRef<FullCalendarType | null>(null);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(null);
  const [customTitle, setCustomTitle] = useState('');
  const [hasCalendar, setHasCalendar] = useState(true);


  useEffect(() => {
    setRenderCount(renderCount + 1);
  }, []);
  const fetchEvents = useCallback(async () => {
    try {
      const apiurl = `${basepath}/api/timesheet/calendar`;
      const cookies = parseCookies();
      const _token = cookies.token;
      if (!_token) {
        return;
      }
      const headers = {
        Authorization: `Bearer ${_token}`,
      };
      const response = await axios.get(apiurl, { headers });
      if ([200, 201].includes(response.status)) {
        const events = response.data;
        if (!calendarEvents || isEventUpdated || events.length !== calendarEvents.length) {
          await setCalendarEvents(events);
        }
        if (events.length === 0 && calendarEvents.length === 0) {
          setHasCalendar(false);
        }
      } else {
        console.error('Failed to fetch events:', response);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          handleSignout();
        } else {
          console.error('Error! Failed to fetch events:', axiosError);
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }, [basepath, calendarEvents, isEventUpdated]);
  useEffect(() => {
    if (isEventUpdated === true) {
      fetchEvents();
      setIsEventUpdated(false);
    }
  }, [isEventUpdated]);
  const memoizedFetchEvents = useMemo(() => fetchEvents, [basepath, handleSignout]);
  useEffect(() => {
    if (basepath) {
      memoizedFetchEvents();
    }
  }, [basepath, activeStaff]);



  useEffect(() => {
    // Calculate total chargeable days whenever calendar events or date changes
    if (calendarEvents && calendarEvents.length > 0) {
      //setTitle(timesheetDefaultDate);
      if (activeUser) {
        setVacationSummary(activeUser, calendarEvents);
      }
      if (timesheetDefaultDate) {
        console.log('use effect: timesheet default date:', timesheetDefaultDate);
        setTitle(timesheetDefaultDate);

        setIsFrontCalendarChangeEvent(true);
        handleJumpToMonth(timesheetDefaultDate);
      }
    }
  }, [calendarEvents, timesheetDefaultDate]);
  function handleMonthYearChange(info, isUserClick = false) {
    console.log('isMonthPickerChangeEvent, ', isMonthPickerChangeEvent);
    if (calendarEvents.length === 0) {
      fetchEvents();
    }
    const _timesheetDefaultDate = info.view.currentStart;
    console.log('fullcalendar date', _timesheetDefaultDate);

    //setTimesheetDefaultDate(_timesheetDefaultDate);
    setSelectedMonth(_timesheetDefaultDate);
    setTitle(_timesheetDefaultDate);
    if (calendarRef.current) {
      const view = calendarRef.current.getApi().view;
      if (view.type === 'dayGridMonth') {
        setCurrentCalendarDate(_timesheetDefaultDate);
        //console.log('currentCalendarDate!!', currentCalendarDate)
      }
    }
    console.log('handleMonthYearChange, current start?', _timesheetDefaultDate);
  }
  /**
   * A function to handle jumping to a specific month on the calendar.
   *
   * @param {_date} _date - the date to jump to
   * @return {void}
   */
  const handleJumpToMonth = (_date) => {
    try {
      if (calendarRef.current) {
        // const calendarApi = calendarRef.current.getApi();
        console.log('timesheet default date _date in handleJumpToMonth', _date);
        calendarRef.current.getApi().gotoDate(_date);
        //calendarApi.gotoDate(_date);
      }
    } catch (error) {
      console.log(error);
    }

  };

  const handleOpenAdminPage = () => {
    router.push({
      pathname: '/admin',
      query: { tab: 'calendarManagement' },
    });
  };
  if (!hasCalendar || !calendarEvents) {
    return (
      <>
        <Text fw={500}>Calendar database is not initialized</Text>
        <Button variant="filled" onClick={handleOpenAdminPage}>
          Click to initialize Calendar in setting page
        </Button>
      </>
    );
  } else if (calendarEvents.length < 1) {
    return <Text>Loading Calendar...</Text>;
  }

  const handleDeleteEvent = async (eventId, _evtdate) => {
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

    if (_leaveRequestid) {
      setFormType('edit');
      setDrawerOpen();
    }
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
      const _leaveperiodend = evt.leavePeriodEnd ? new Date(evt.leavePeriodEnd) : null;

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
      const _leaveperiodend = evt.leavePeriodEnd ? new Date(evt.leavePeriodEnd) : null;

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
      if (_leaveperiodend > ContractStartDate && _leaveperiodstart < ContractStartDate) {
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
    const currentYear = newDate.getFullYear();
    const currentMonth = newDate.getMonth();

    const formattedFirstDay = format(new Date(currentYear, currentMonth, 1), 'd-MMM-yyyy');
    const formattedLastDay = format(new Date(currentYear, currentMonth + 1, 0), 'd-MMM-yyyy');

    const _dateRange = `${formattedFirstDay} to ${formattedLastDay}`;

    if (!activeUser) {
      setCustomTitle(_dateRange);
      return;
    }

    const filteredEvents = calendarEvents.filter(
      (event) =>
        event.extendedProps.result.Year === currentYear &&
        event.extendedProps.result.Month === currentMonth + 1
    );

    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const leaveDays = filteredEvents.reduce(
      (total, event) => total + (event.extendedProps.result.leaveDays || 0),
      0
    );

    const _chargeableDays = totalDaysInMonth - leaveDays;
    const _customTitle = `${_dateRange} (Chargable days: ${_chargeableDays})`;

    setCustomTitle(_customTitle);
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
      `Selected ${count} days, (${selectInfo.startStr} to ${selectInfo.endStr}) Enter a title for your event`
    );
    if (_leavePurpose) {
      setleavePurpose(_leavePurpose);
      setFormType('create');

      setLeaveRequestId(0);

      setDrawerOpen();
    }
  };

  return (
    <>
      {formType && (
        <Drawer opened={drawerOpened} onClose={setDrawerClose} size={550} title="Vacation">
          {/* Drawer content */}
          {leaveRequestId >= 0 && (
            <LeaveRequestForm
              formType={formType}
              leaveRequestId={leaveRequestId}
              onDeleteEvent={handleDeleteEvent} // pass the callback function
              onClose={setDrawerClose}
              LeaveRequestPeriod={LeaveRequestPeriod}
              leavePurpose={leavePurpose}
              CalendarDate={currentCalendarDate}
              isCalendarIntegrated={true} // Default to false for standalone pages
            />
          )}
        </Drawer>
      )}
      <style data-fullcalendar id="fcstyle" />
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin]}
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
          selectAllow={(selectinfo) => handleSelectAllow(selectinfo, calendarEvents)}
          datesSet={(info) => {
            handleMonthYearChange(info, isMonthPickerChangeEvent);
          }} // Pass isUserClick = true
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
              component: (props) => <CustomView {...props} userStaff={activeStaff} />,
              buttonText: 'Vacations',
              events: calendarEvents,
              // Pass the events object to the custom view component
            },
          }}
        />
        {/* {renderCount} */}
      </div>
    </>
  );
};

export default React.memo(FrontPageCalendar);