import { DatePickerInput } from '@mantine/dates';
import { excludeHoliday, myRenderDay } from './util/leaverequest.util';
function MyCustomDatePickerInput({ ...rest }) {
  return (
    <DatePickerInput
      valueFormat="DD-MM-YYYY"
      firstDayOfWeek={0}
      excludeDate={excludeHoliday}
      renderDay={myRenderDay}
      {...rest}
    />
  );
}
