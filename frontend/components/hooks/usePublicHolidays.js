'use client';
import useStore from '@/components/stores/zstore.ts';

export function usePublicHolidays() {
  const { publicHolidays, loadPublicHolidays } = useStore();
  return { publicHolidays, loadPublicHolidays };
}