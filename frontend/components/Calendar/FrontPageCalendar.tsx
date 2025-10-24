'use client';
import { SignOut as clientSignOut } from '@/app/lib/auth-action';
import LeaveRequestForm from '@/components/LeaveRequest/LeaveRequestForm';
import useUIStore from '@/components/stores/useUIStore';
import useStore from '@/components/stores/zstore.ts';
import { getBusinessDays } from '@/components/util/leaverequest.util';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Button, Drawer, Text } from '@mantine/core';
import axios, { AxiosError } from 'axios';
import { differenceInBusinessDays, format, subDays } from 'date-fns';
import { useRouter } from 'next/navigation';
import { destroyCookie, parseCookies } from 'nookies';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { handleSelectAllow } from './calendar.util';
import CustomView from './customeView';

const FrontPageCalendar = () => {
  type FormType = 'create' | 'edit';

  // State management
  const [leavePurpose, setLeavePurpose] = useState<string | null>(null);
  const [formType, setFormType] = useState<FormType | undefined>(undefined);
  const [currentCalendarDate, setCurrentCalendarDate] = useState<Date | null>(null);
  const [customTitle, setCustomTitle] = useState('');
  const [hasCalendar, setHasCalendar] = useState(true);

  // Refs
  const calendarRef = useRef<FullCalendar | null>(null);

  // Store hooks
  const { drawerOpened, setDrawerOpen, setDrawerClose, isEventUpdated, setIsEventUpdated } = useUIStore();
  const {
    setLeaveRequestPeriod,
    setStaffVacation,
    setCalendarEvents,
    setIsFrontCalendarChangeEvent,
    setSelectedMonth,
    timesheetDefaultDate,
    calendarEvents,
    setChargeableDays,
    setLeaveRequestId,
    leaveRequestId,
    activeStaff,
    setTimesheetDefaultDate,
    setStatus,
    setIsAuthenticated,
    setIsUnauthorized,
    setIsExiting,
  } = useStore();

  const {
    LeaveRequestPeriod,
    isMonthPickerChangeEvent,
    activeUser,
    activeContract,
    basepath,
    isExiting,
  } = useStore(
    useShallow((state) => ({
      LeaveRequestPeriod: state.LeaveRequestPeriod,
      isMonthPickerChangeEvent: state.isMonthPickerChangeEvent,
      activeUser: state.activeUser,
      activeContract: state.activeContract,
      basepath: state.basepath,
      isExiting: state.isExiting,
    }))
  );

  const router = useRouter();

  const handleSignout = async () => {
    console.log('FrontPageCalendar: Initiating sign-out');
    destroyCookie(null, 'token');
    await clientSignOut();
    setStatus('unauthenticated');
    setIsAuthenticated(false);
    setIsUnauthorized(true);
    setIsExiting(true);
    // Rely on ClientLayout.tsx for navigation
  };

  const fetchEvents = useCallback(async () => {
    if (isExiting) {
      console.log('fetchEvents: Skipping due to isExiting=true');
      return;
    }
    try {
      const apiurl = `${basepath}/api/timesheet/calendar`;
      const cookies = parseCookies();
      const token = cookies.token;

      if (!token) {
        console.warn('fetchEvents: No token found, initiating sign-out');
        await handleSignout();
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(apiurl, { headers });

      if ([200, 201].includes(response.status)) {
        const events = response.data;
        if (!calendarEvents || isEventUpdated || events.length !== calendarEvents.length) {
          await setCalendarEvents(events);
        }
        if (events.length === 0 && calendarEvents.length === 0) {
          setHasCalendar(false);
          await handleSignout();
        }
      } else {
        console.error('Failed to fetch events with status:', response.status, response);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          console.warn('Authentication error (401) during fetchEvents. Signing out.');
          await handleSignout();
          return;
        } else {
          console.error('Error! Failed to fetch events:', axiosError);
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }, [basepath, calendarEvents, isEventUpdated, setCalendarEvents, handleSignout, isExiting]);

  useEffect(() => {
    if (isEventUpdated) {
      fetchEvents();
      setIsEventUpdated(false);
    }
  }, [isEventUpdated, fetchEvents, setIsEventUpdated]);

  useEffect(() => {
    if (basepath && !isExiting) {
      fetchEvents();
    }
  }, [basepath, activeStaff, fetchEvents, isExiting]);

  useEffect(() => {
    if (calendarEvents && calendarEvents.length > 0) {
      if (activeUser) {
        setVacationSummary(activeUser, calendarEvents);
      }
      if (timesheetDefaultDate) {
        setTitle(timesheetDefaultDate);
        setIsFrontCalendarChangeEvent(true);
        handleJumpToMonth(timesheetDefaultDate);
      }
    }
  }, [calendarEvents, timesheetDefaultDate, activeUser, setIsFrontCalendarChangeEvent]);

  const handleJumpToMonth = useCallback((targetDate: Date) => {
    try {
      if (calendarRef.current) {
        calendarRef.current.getApi().gotoDate(targetDate);
      }
    } catch (error) {
      console.error('Error jumping to month:', error);
    }
  }, []);

  function handleMonthYearChange(info: any) {
    if (calendarEvents.length === 0) {
      fetchEvents();
    }
    const currentViewStartDate = info.view.currentStart;

    setSelectedMonth(currentViewStartDate);
    setTitle(currentViewStartDate);

    if (calendarRef.current) {
      const view = calendarRef.current.getApi().view;
      if (view.type === 'dayGridMonth') {
        setCurrentCalendarDate(currentViewStartDate);
      }
    }
  }

  const handleOpenAdminPage = () => {
    /*
    router.push({
      pathname: '/admin',
      query: { tab: 'calendarManagement' },
    });*/
    router.push('/admin?tab=calendarManagement');
  };

  const handleDeleteEvent = async () => {
    try {
      setIsEventUpdated(true);
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  };

  const fnEventclick = (e: any) => {
    const leaveRequestIdFromEvent = e.event.extendedProps.result.LeaveRequestId;
    setLeaveRequestId(leaveRequestIdFromEvent);

    if (leaveRequestIdFromEvent) {
      setFormType('edit');
      setDrawerOpen();
    }
  };

  function setVacationSummary(_user: any, _events: any[]) {
    if (!_user || !activeContract) {
      return;
    }

    const ContractStartDate = new Date(activeContract.ContractStartDate);
    const ContractEndDate = new Date(activeContract.ContractEndDate);

    const vacationEvents = _events.filter((event) => {
      const evt = event.extendedProps.result;
      const leavePeriodStart = new Date(evt.leavePeriodStart);
      const leavePeriodEnd = evt.LeavePeriodEnd ? new Date(evt.LeavePeriodEnd) : null;

      return (
        evt.LeaveRequestId !== null &&
        leavePeriodStart <= ContractEndDate &&
        (leavePeriodEnd === null || leavePeriodStart > ContractStartDate || leavePeriodEnd >= ContractStartDate)
      );
    });

    const vacationLeaveDays = vacationEvents.reduce((sum, event) => {
      const evt = event.extendedProps.result;
      const eventEndDate = new Date(event.end);
      const leavePeriodStart = new Date(evt.leavePeriodStart);
      const leavePeriodEnd = evt.LeavePeriodEnd ? new Date(evt.LeavePeriodEnd) : null;

      if (eventEndDate < ContractStartDate) {
        return sum;
      }

      if (!leavePeriodEnd) {
        return sum + evt.leaveDays;
      }

      if (ContractEndDate < leavePeriodEnd) {
        return sum + getBusinessDays(leavePeriodStart, ContractEndDate);
      }

      if (leavePeriodEnd > ContractStartDate && leavePeriodStart < ContractStartDate) {
        return sum + getBusinessDays(ContractStartDate, leavePeriodEnd);
      }

      if (leavePeriodEnd < ContractStartDate) {
        return sum;
      }

      return sum + evt.leaveDays;
    }, 0);

    setStaffVacation({
      total: activeContract.AnnualLeave,
      used: vacationLeaveDays,
      balance: activeContract.AnnualLeave - vacationLeaveDays,
    });
  }

  function setTitle(newDate: Date = new Date()) {
    const currentYear = newDate.getFullYear();
    const currentMonth = newDate.getMonth();

    const formattedFirstDay = format(new Date(currentYear, currentMonth, 1), 'd-MMM-yyyy');
    const formattedLastDay = format(new Date(currentYear, currentMonth + 1, 0), 'd-MMM-yyyy');

    const dateRange = `${formattedFirstDay} to ${formattedLastDay}`;

    if (!activeUser) {
      setCustomTitle(dateRange);
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

    const chargeableDays = totalDaysInMonth - leaveDays;
    const customTitleText = `${dateRange} (Chargable days: ${chargeableDays})`;

    setCustomTitle(customTitleText);
    setChargeableDays(chargeableDays);
  }

  const handleDateSelect = (selectInfo: any) => {
    const startDate = selectInfo.start;
    const endDate = selectInfo.end;
    const count = differenceInBusinessDays(endDate, startDate);
    const leaveRequestPeriodEnd = count === 1 ? null : subDays(endDate, 1);

    setLeaveRequestPeriod({
      start: selectInfo.start,
      end: leaveRequestPeriodEnd,
    });

    const promptedLeavePurpose = prompt(
      `Selected ${count} days, (${selectInfo.startStr} to ${selectInfo.endStr}) Enter a title for your event`
    );
    if (promptedLeavePurpose) {
      setLeavePurpose(promptedLeavePurpose);
      setFormType('create');
      setLeaveRequestId(0);
      setDrawerOpen();
    }
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

  return (
    <>
      {formType && (
        <Drawer opened={drawerOpened} onClose={setDrawerClose} size={550} title="Vacation">
          {leaveRequestId >= 0 && (
            <LeaveRequestForm
              formType={formType}
              leaveRequestId={leaveRequestId}
              onDeleteEvent={handleDeleteEvent}
              onClose={setDrawerClose}
              LeaveRequestPeriod={LeaveRequestPeriod}
              leavePurpose={leavePurpose}
              CalendarDate={currentCalendarDate}
              isCalendarIntegrated={true}
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
            handleMonthYearChange(info);
          }}
          select={handleDateSelect}
          views={{
            dayGridMonth: {
              buttonText: 'Month',
            },
            listWeek: {
              type: 'list',
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
            },
          }}
        />
      </div>
    </>
  );
};

export default React.memo(FrontPageCalendar);