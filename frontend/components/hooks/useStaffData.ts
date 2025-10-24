'use client';
import useStore from '@/components/stores/zstore.ts';

export function useStaffData() {
  const {
    activeUser,
    activeStaff,
    activeContract,
    isAuthenticated,
    status,
    fetchStaffData: refreshStaffData,
  } = useStore();

  return {
    activeUser,
    activeStaff,
    activeContract,
    isAuthenticated,
    status,
    refreshStaffData,
  };
}