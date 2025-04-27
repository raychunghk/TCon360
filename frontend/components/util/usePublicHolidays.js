import useStore from '@/components/stores/zstore';
import axios from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

export function usePublicHolidays() {
  const { publicHolidays, setPublicHolidays, basepath } = useStore();
  const [loading, setLoading] = useState(true); // Reintroduce loading state

  async function loadPublicHolidays() {
    try {
      setLoading(true);
      const response = await axios.get(`${basepath}/api/timesheet/publicholidays`);
      /*
      
            // Memoize the transformed data
            const processedHolidays = useMemo(() => {
              return response.data.map((holiday) => ({
                Summary: holiday.Summary,
                StartDate: format(new Date(holiday.StartDate), 'M/d/yyyy'),
              }));
            }, [response.data]); // Only recompute if response.data changes
      
            setPublicHolidays(processedHolidays);
      */
      const pldays = response.data.map((holiday) => ({
        Summary: holiday.Summary,
        StartDate: format(new Date(holiday.StartDate), 'M/d/yyyy'),
      }));
      setPublicHolidays(pldays);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    const fetchHolidays = async () => {
      if (!publicHolidays || publicHolidays.length === 0) {
        await loadPublicHolidays();
      } else {
        setLoading(false); // Set loading to false if data already exists
      }
    };
    if (basepath)
      fetchHolidays();
  }, [publicHolidays, basepath]); // Add basepath as a dependency

  return { publicHolidays, loading, loadPublicHolidays }; // Include loading state
}