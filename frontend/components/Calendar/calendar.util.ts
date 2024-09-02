 

export const  isPublicHoliday=(date, evts) =>{
 
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
}
export const convertDateStringToDate = (dateString) => {
  const parts = dateString.split('-');
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1;
  const day = parseInt(parts[2]);

  return new Date(year, month, day);
};
export const isSameDate = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};


export const handleSelectAllow = (selectInfo, calendarEvents) => {
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

  //return true;
};
