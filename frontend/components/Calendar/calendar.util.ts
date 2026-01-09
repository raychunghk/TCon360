export interface CalendarEvent {
  start: string;
  end?: string;
  extendedProps: {
    result: {
      eventType?: string;
      leavePeriodStart: string;
      [key: string]: any;
    };
  };
  [key: string]: any;
}

export const isPublicHoliday = (date: Date, evts: CalendarEvent[]): boolean => {
  const publicHolidays = evts.filter((event) => {
    const evt = event.extendedProps.result;
    return evt.eventType === 'publicholiday';
  });

  for (const holiday of publicHolidays) {
    const holidayDate = new Date(holiday.extendedProps.result.leavePeriodStart);
    if (date.getTime() === holidayDate.getTime()) {
      return true;
    }
  }

  return false;
};

export const convertDateStringToDate = (dateString: string): Date => {
  const parts = dateString.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  return new Date(year, month, day);
};

export const isSameDate = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};


export interface SelectInfo {
  start: Date;
  end: Date;
  [key: string]: any;
}

export const handleSelectAllow = (selectInfo: SelectInfo, calendarEvents: CalendarEvent[]): boolean => {
  const selectedDate = selectInfo.start;

  // Disable selection on weekends (Saturday and Sunday)
  if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
    return false;
  }

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
};
