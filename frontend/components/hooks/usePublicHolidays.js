'use client';
import useStore from '@/components/stores/zstore.js';

export function usePublicHolidays() {
  const { publicHolidays, loadPublicHolidays } = useStore();
  return { publicHolidays, loadPublicHolidays };
}