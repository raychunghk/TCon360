import { useState, useEffect } from 'react';
import axios from 'axios';

import { format } from 'date-fns';

import useStore from '@/components/stores/zstore';
export function usePublicHolidays() {
  //const [loading, setLoading] = useState(false);
  const { publicHolidays, setPublicHolidays, basepath } = useStore();

  async function loadPublicHolidays() {
    try {
      //  setLoading(true);
      const response = await axios.get(`${basepath}/api/timesheet/publicholidays`);
      const pldays = response.data.map((holiday) => ({
        Summary: holiday.Summary,
        StartDate: format(new Date(holiday.StartDate), 'M/d/yyyy'),
      }));
      setPublicHolidays(pldays);
    } catch (error) {
      console.error(error);
    } finally {
      //setLoading(false);
    }
  }

  useEffect(() => {
    const fetchHolidays = async () => {
      if (!publicHolidays || publicHolidays.length === 0) {
        await loadPublicHolidays();
      }
    };
    fetchHolidays();
  }, [publicHolidays]); // Added publicHolidays to the dependency array

  return { publicHolidays, loadPublicHolidays };
}