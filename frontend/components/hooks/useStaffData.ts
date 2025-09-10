'use client';
import useStore from '@/components/stores/zstore.js';

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