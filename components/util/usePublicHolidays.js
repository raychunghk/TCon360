import { useState, useEffect } from 'react';
import axios from 'axios';

import { format } from 'date-fns';
import { basepath } from '/global';
import useStore from 'pages/reducers/zstore';
export function usePublicHolidays() {
  const [loading, setLoading] = useState(false);

  const { publicHolidays, setPublicHolidays } = useStore();
  async function loadPublicHolidays() {
    try {
      setLoading(true);
      const response = await axios.get(
        `${basepath}/api/timesheet/publicholidays`,
      );
      const pldays = response.data.map((holiday) => ({
        Summary: holiday.Summary,
        StartDate: format(new Date(holiday.StartDate), 'M/d/yyyy'),
      }));

      // dispatch(setPublicHolidays(pldays));
      setPublicHolidays(pldays);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!publicHolidays || publicHolidays.length === 0) {
      loadPublicHolidays();
    }
  }, []);

  return { publicHolidays, loading, loadPublicHolidays };
}
