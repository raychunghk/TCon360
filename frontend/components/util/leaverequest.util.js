import { format, parseISO, isWeekend } from 'date-fns';
import { useContext } from 'react';

import useStore from '@/components/stores/zstore';
let arrPublicHoliday;
export function setPublicHolidays(holidays) {
  arrPublicHoliday = holidays;
}
export function setDatepickerPlDay(holidays) {
  arrPublicHoliday = holidays;
}
export const leaveTypes = [
  {
    value: 'vacation',
    label: 'Vacation',
  },
  {
    value: 'sick',
    label: 'Sick',
  },
];
export const ampmOptions = [
  {
    value: 'AMPM',
    label: 'Whole day',
  },
  {
    value: 'AM',
    label: 'AM',
  },
  {
    value: 'PM',
    label: 'PM',
  },
];
export const ampmOptionsEndNoDate = [
  {
    value: 'NA',
    label: 'N/A',
  },
  {
    value: 'AMPM',
    label: 'Whole day',
  },
  {
    value: 'AM',
    label: 'AM',
  },
];
export const ampmOptionsEnd = [
  {
    value: 'AMPM',
    label: 'Whole day',
  },
  {
    value: 'AM',
    label: 'AM',
  },
];
const dayStyle = {
  backgroundColor: '#de3184',
  color: 'white',
  borderRadius: '35%',
  width: '26px',
  height: '26px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const weekendstyle = {
  backgroundColor: '#f5bcb8',
  color: 'black',
  borderRadius: '38%',
  width: '26px',
  height: '26px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export function formatResponseDate(responseData) {
  for (let key in responseData) {
    let val = responseData[key];
    console.log(key + ': ' + val);
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    if (regex.test(val)) {
      const date = new Date(val);
      // const formattedDate = date.toLocaleDateString('en-GB');
      const formattedDate = `${date.getUTCDate().toString().padStart(2, '0')}-${(
        date.getUTCMonth() + 1
      )
        .toString()
        .padStart(2, '0')}-${date.getUTCFullYear()}`;
      responseData[key] = new Date(val);
    }
  }
  console.log(responseData);
  return responseData;
}
export function getBusinessDays(startDate, endDate) {
  // Copy start and end dates to avoid modifying the originals
  startDate = new Date(startDate.getTime());
  endDate = new Date(endDate.getTime());

  // Swap start and end dates if they are reversed
  if (startDate > endDate) {
    var temp = startDate;
    startDate = endDate;
    endDate = temp;
  }

  var businessDays = 0;
  //var dayMilliseconds = 86400000; // Number of milliseconds in a day

  // Iterate over each day between the two dates
  while (startDate <= endDate) {
    var dayOfWeek = startDate.getDay();
    if (dayOfWeek != 0 && dayOfWeek != 6) {
      // Exclude weekends
      var isHoliday = isPublicHoliday(startDate);
      if (!isHoliday) {
        // Exclude public holidays
        businessDays++;
      }
    }
    startDate = getNextWorkingDate(startDate); // Get next working date
  }

  return businessDays;
}
export function adjustTimeZoneVal(dateval) {
  if (dateval) {
    const rtnval = new Date(dateval.getTime() - dateval.getTimezoneOffset() * 60000).toISOString();
    console.log('adjustTimeZoneVal', rtnval);
    return rtnval;
  }
}
export function getNextWorkingDate(date) {
  const dayOfWeek = date.getDay();

  let daysToAdd = 1;

  switch (dayOfWeek) {
    case 5: // Friday
      daysToAdd = 3;
      break;
    case 6: // Saturday
      daysToAdd = 2;
      break;
    default: // Monday to Thursday
      daysToAdd = 1;
  }

  const nextWorkingDate = new Date(date);

  nextWorkingDate.setDate(date.getDate() + daysToAdd);
  nextWorkingDate.setHours(0, 0, 0, 0);

  // Check if the next working date is a public holiday
  const isHoliday = isPublicHoliday(nextWorkingDate);
  if (isHoliday) {
    // If it is a public holiday, recursively call the function with the next day
    return getNextWorkingDate(nextWorkingDate);
  }

  return nextWorkingDate;
}

export function getNextWorkingDatex(date) {
  const dayOfWeek = date.getDay();
  let daysToAdd = 1;

  switch (dayOfWeek) {
    case 5: // Friday
      daysToAdd = 3;
      break;
    case 6: // Saturday
      daysToAdd = 2;
      break;
    default: // Monday to Thursday
      daysToAdd = 1;
  }

  let nextWorkingDate = new Date(date);
  nextWorkingDate.setDate(date.getDate() + daysToAdd);
  nextWorkingDate.setHours(0, 0, 0, 0);

  let isHoliday = false;

  do {
    nextWorkingDate.setDate(nextWorkingDate.getDate() + 1);
    isHoliday = isPublicHoliday(nextWorkingDate);
  } while (isHoliday);

  return nextWorkingDate;
}
const getPublicHolidays = () => {
  const state = useStore.getState();
  //zustand api call method when getting state outside of comonents.
  return state.publicHolidays;
};
// const getPublicHolidays = () => {
//   if (arrPublicHoliday === null) {
//     // Assuming `publicHolidays` is the React Redux state
//     const { publicHolidays } = useSelector((state) => ({
//       publicHolidays: state.calendar.publicHolidays,
//     }));
//     return publicHolidays;
//   } else {
//     return arrPublicHoliday;
//   }
// };
export const isPublicHoliday = (date) => {
  const formattedDate = format(date, 'M/d/yyyy'); // assuming formatDate is a function to format the date into the same format as in the events array, e.g. '1/1/2022'
  //const _publicholidays = useContext(PublicHolidaysContext);
  //const _plday = arrPublicHoliday;
  const _plday = getPublicHolidays();
  const event = _plday.find((e) => e.StartDate === formattedDate);
  if (event) {
    //  console.log('event public holiday?');
    // console.log(event);
  }
  return event;
};

export const getSummaryByDate = (date) => {
  // const formattedDate = format(date, 'M/d/yyyy'); // assuming formatDate is a function to format the date into the same format as in the events array, e.g. '1/1/2022'
  const event = isPublicHoliday(date);

  return event ? event.Summary : 'Week End';
};
export const myRenderDay = (date) => {
  const isDisabled = !excludeHoliday(date);
  const day = date.getDate();
  const tootip = isDisabled ? '' : getSummaryByDate(date);
  const style = isDisabled ? null : isWeekend(date) ? weekendstyle : dayStyle;
  return (
    <div style={style} title={isDisabled ? '' : tootip}>
      {day}
    </div>
  );
};
export const excludeHoliday = (date) => {
  if (date) {
    const isWeekendDay = isWeekend(date);
    const formattedDate = format(date, 'M/d/yyyy');

    //const _publicholidays = useContext(PublicHolidaysContext);
    const _publicholidays = getPublicHolidays();
    const isHoliday = _publicholidays.some((holiday) => holiday.StartDate === formattedDate);
    const rtn = isWeekendDay || isHoliday;

    return rtn;
  } else {
    return null;
  }
};
