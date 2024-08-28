import { useState, useEffect } from 'react';
import axios from 'axios';

import { format } from 'date-fns';

import useStore from '@/components/stores/zstore';
export function usePublicHolidays() {
  const [loading, setLoading] = useState(false);

  const { publicHolidays, setPublicHolidays, basepath, setBasepath } = useStore();
  async function loadPublicHolidays() {
    try {
      setLoading(true);
      const response = await axios.get(`${basepath}/api/timesheet/publicholidays`);
      const pldays = response.data.map((holiday) => ({
        Summary: holiday.Summary,
        StartDate: format(new Date(holiday.StartDate), 'M/d/yyyy'),
      }));
      console.log('public holidays', pldays);
      // dispatch(setPublicHolidays(pldays));
      setPublicHolidays(pldays);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (basepath) {
      if (!publicHolidays || publicHolidays.length === 0) {
        loadPublicHolidays();
      }
    }
  }, [basepath]);

  return { publicHolidays, loading, loadPublicHolidays };
}
