// hooks/useCalendarTitle.ts
import useStore from '@/components/stores/zstore'; // Assuming zstore has activeUser, calendarEvents, setChargeableDays
import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';

interface CalendarEvent {
  extendedProps: {
    result: {
      Year: number;
      Month: number;
      leaveDays: number;
    };
  };
}

interface UseCalendarTitleResult {
  currentCalendarDate: Date | null;
  setCurrentCalendarDate: React.Dispatch<React.SetStateAction<Date | null>>;
  customTitle: string;
}

export const useCalendarTitle = (): UseCalendarTitleResult => {
  const [currentCalendarDate, setCurrentCalendarDate] = useState<Date | null>(null);
  const [customTitle, setCustomTitle] = useState('');

  const { activeUser, calendarEvents, setChargeableDays } = useStore((state) => ({
    activeUser: state.activeUser,
    calendarEvents: state.calendarEvents,
    setChargeableDays: state.setChargeableDays,
  }));

  const calculateTitleAndChargeableDays = useCallback(
    (date: Date) => {
      const currentYear = date.getFullYear();
      const currentMonth = date.getMonth(); // 0-indexed

      const formattedFirstDay = format(new Date(currentYear, currentMonth, 1), 'd-MMM-yyyy');
      const formattedLastDay = format(new Date(currentYear, currentMonth + 1, 0), 'd-MMM-yyyy'); // Last day of the month

      const _dateRange = `${formattedFirstDay} to ${formattedLastDay}`;

      if (!activeUser || !calendarEvents) {
        return { title: _dateRange, chargeableDays: 0 };
      }

      const filteredEvents = calendarEvents.filter(
        (event: CalendarEvent) =>
          event.extendedProps.result.Year === currentYear &&
          event.extendedProps.result.Month === currentMonth + 1, // Month in event data is likely 1-indexed
      );

      const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const leaveDays = filteredEvents.reduce(
        (total, event) => total + (event.extendedProps.result.leaveDays || 0),
        0,
      );

      const _chargeableDays = totalDaysInMonth - leaveDays;
      const _customTitle = `${_dateRange} (Chargable days: ${_chargeableDays})`;

      return { title: _customTitle, chargeableDays: _chargeableDays };
    },
    [activeUser, calendarEvents],
  );

  useEffect(() => {
    const dateToUse = currentCalendarDate || new Date(); // Fallback to current date if not set
    const { title, chargeableDays } = calculateTitleAndChargeableDays(dateToUse);
    setCustomTitle(title);
    setChargeableDays(chargeableDays);
  }, [currentCalendarDate, calculateTitleAndChargeableDays, setChargeableDays]);

  return { currentCalendarDate, setCurrentCalendarDate, customTitle };
};