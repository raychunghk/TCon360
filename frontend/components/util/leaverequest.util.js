import { usePublicHolidays } from '@/components/hooks/usePublicHolidays';
import useStore from '@/components/stores/zstore.ts';
import { format, isWeekend, parse } from 'date-fns';
import * as Yup from 'yup';
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
export function adjustTimeZoneVal(dateparam) {
  let dateval = null;

  if (typeof dateparam === 'string') {
    // Attempt to parse the string using the expected format 'yyyy-MM-dd'
    // We assume the date string is in 'yyyy-MM-dd' format based on the original JS logic.
    const parsedDate = parse(dateparam, 'yyyy-MM-dd', new Date());

    // Check if parsing was successful
    if (!isNaN(parsedDate.getTime())) {
      dateval = parsedDate;
    } else {
      console.warn(`adjustTimeZoneVal: Failed to parse date string: ${dateparam}. Expected format 'yyyy-MM-dd'.`);
      return undefined;
    }

  } else if (dateparam instanceof Date && !isNaN(dateparam.getTime())) {
    // If it's a valid Date object
    dateval = dateparam;
  } else if (dateparam === null || dateparam === undefined) {
    // Null or undefined input
    return undefined;
  }

  if (dateval) {
    // Calculate the time in milliseconds, adjusted by the local timezone offset.
    // Subtracting the offset ensures that when toISOString() converts the time to UTC, 
    // it lands exactly at 00:00:00.000Z on the desired date.
    const offsetMs = dateval.getTimezoneOffset() * 60000;
    const adjustedTime = dateval.getTime() - offsetMs;

    const adjustedDate = new Date(adjustedTime);
    const rtnval = adjustedDate.toISOString();

    console.log('adjustTimeZoneVal', rtnval);
    return rtnval;
  }

  return undefined;
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
  if (!state.publicHolidays) {
    const { publicHolidays, loadPublicHolidays } = usePublicHolidays();
    // await plHoliday.loadPublicHolidays();

  }

  return state.publicHolidays;
};

export const isPublicHoliday = (date) => {
  const formattedDate = format(date, 'yyyy-MM-dd'); // assuming formatDate is a function to format the date into the same format as in the events array, e.g. '1/1/2022'
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
export const myRenderDay = (dateInput) => {
  const date = new Date(dateInput);
  const isDisabled = !excludeHoliday(date);
  const day = date.getDate();
  const tootip = isDisabled ? '' : getSummaryByDate(date);
  const style = isDisabled ? null : isWeekend(date) ? weekendstyle : dayStyle;
  const parsedDate = parse(dateInput, 'yyyy-MM-dd', new Date());
  return (
    <div style={style} title={isDisabled ? '' : tootip}>
      {day}
    </div>
  );
};
export const excludeHoliday = (date) => {
  try {
    if (date) {
      const isWeekendDay = isWeekend(date);
      const formattedDate = format(date, 'yyyy-MM-dd');

      //const _publicholidays = useContext(PublicHolidaysContext);
      const _publicholidays = getPublicHolidays();
      const isHoliday = _publicholidays.some((holiday) => holiday.StartDate === formattedDate);
      const rtn = isWeekendDay || isHoliday;

      return rtn;
    } else {
      return null;
    }
  } catch (exception) {
    console.log(`error ${date}`, exception);
  }

};



export const leaveRequestValidationSchema = Yup.object().shape({
  leavePurpose: Yup.string().required('Leave Request is required'),
  leaveType: Yup.string().required('Leave Type is required'),
  leavePeriodStart: Yup.date().required('Leave period start is required'),
  AMPMStart: Yup.string().required('Leave start: AM/PM/Whole day is required'),
  staffSignDate: Yup.date().required('Staff sign date is required'),
  dateOfReturn: Yup.date().required('Date of Return is required'),
});