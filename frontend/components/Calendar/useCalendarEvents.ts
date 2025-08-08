// hooks/useCalendarEvents.ts
import useUIStore from '@/components/stores/useUIStore';
import useStore from '@/components/stores/zstore';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useCallback, useEffect, useState } from 'react';

interface CalendarEvent {
  // Define the structure of your calendar events
  // This is a placeholder, adjust based on your actual event structure
  id: string;
  title: string;
  start: string;
  end?: string;
  extendedProps: {
    result: {
      LeaveRequestId: number;
      Year: number;
      Month: number;
      leaveDays: number;
      leavePeriodStart: string;
      leavePeriodEnd?: string;
    };
  };
}

interface UseCalendarEventsResult {
  calendarEvents: CalendarEvent[];
  isLoading: boolean;
  error: string | null;
  hasCalendar: boolean;
  refetchEvents: () => void;
}

export const useCalendarEvents = (
  basepath: string,
  activeStaff: any, // Adjust type as needed
  handleSignout: () => void,
): UseCalendarEventsResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasCalendar, setHasCalendar] = useState(true);

  const { calendarEvents, setCalendarEvents } = useStore((state) => ({
    calendarEvents: state.calendarEvents,
    setCalendarEvents: state.setCalendarEvents,
  }));
  const { isEventUpdated, setIsEventUpdated } = useUIStore();

  const fetchEvents = useCallback(async () => {
    if (!basepath) return;

    setIsLoading(true);
    setError(null);
    try {
      const apiurl = `${basepath}/api/timesheet/calendar`;
      const cookies = parseCookies();
      const _token = cookies.token;

      if (!_token) {
        console.log('No token found, redirecting to login');
        handleSignout();
        return;
      }

      const headers = { Authorization: `Bearer ${_token}` };
      const response = await axios.get(apiurl, { headers });

      if ([200, 201].includes(response.status)) {
        const events: CalendarEvent[] = response.data;
        // Only update if truly different or forced update
        if (
          !calendarEvents ||
          isEventUpdated ||
          events.length !== calendarEvents.length ||
          JSON.stringify(events) !== JSON.stringify(calendarEvents)
        ) {
          setCalendarEvents(events);
          setIsEventUpdated(false); // Reset after update
        }
        setHasCalendar(events.length > 0);
      } else {
        console.error(`Unexpected response status: ${response.status}`);
        setHasCalendar(false);
        setError(`Failed to fetch calendar events: Status ${response.status}`);
      }
    } catch (err) {
      console.error('fetchEvents error:', err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        console.log('Unauthorized, redirecting to login');
        handleSignout();
      }
      setHasCalendar(false);
      setError('Failed to load calendar events. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [basepath, handleSignout, setCalendarEvents, isEventUpdated, calendarEvents, setIsEventUpdated]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents, activeStaff]); // activeStaff added as a dependency if calendar content depends on it

  const refetchEvents = useCallback(() => {
    setIsEventUpdated(true); // Trigger a refetch
  }, [setIsEventUpdated]);

  return { calendarEvents, isLoading, error, hasCalendar, refetchEvents };
};