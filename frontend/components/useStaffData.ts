'use client';
import useStore from '@/components/stores/zstore';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useCallback, useEffect, useRef, useState } from 'react';

interface StaffData {
  activeUser: any;
  activeStaff: any;
  activeContract: any;
  isAuthenticated: boolean;
  status: string;
  refreshFormValues: () => Promise<void>;
}

export function useStaffData(): StaffData {
  const cookies = parseCookies();
  const tokenCookie = cookies.token;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [status, setStatus] = useState('loading');
  const [fetchCount, setFetchCount] = useState(0); // For debugging loop

  const { activeContract, setActiveContract, activeStaff, setActiveStaff, activeUser, setActiveUser, basepath, setBasepath } = useStore();

  // Use a ref to prevent multiple initial fetches
  const hasFetchedRef = useRef(false);

  const fetchData = useCallback(async () => {
    if (!tokenCookie || !basepath) {
      setStatus('unauthenticated');
      setIsAuthenticated(false);
      return;
    }

    try {
      console.log(`Fetching /api/user/myuser (Attempt #${fetchCount + 1}) at ${new Date().toISOString()}`);
      setFetchCount((prev) => prev + 1);

      const headers = { Authorization: `Bearer ${tokenCookie}` };
      const response = await axios.get(`${basepath}/api/user/myuser`, { headers });

      if (response.status === 200 || response.status === 201) {
        const userData = response.data;
        // Only update state if data has changed to prevent re-renders
        if (JSON.stringify(userData) !== JSON.stringify(activeUser)) {
          setActiveUser(userData);
        }
        setIsAuthenticated(true);

        const staffMember = userData.staff?.[0];
        if (staffMember) {
          if (JSON.stringify(staffMember) !== JSON.stringify(activeStaff)) {
            setActiveStaff(staffMember);
          }
          const activeContracts = staffMember.contracts?.filter((contract: any) => contract.IsActive) || [];
          const newContract = activeContracts.length > 0 ? activeContracts[0] : null;
          if (JSON.stringify(newContract) !== JSON.stringify(activeContract)) {
            setActiveContract(newContract);
          }
        } else {
          if (activeStaff !== null) setActiveStaff(null);
          if (activeContract !== null) setActiveContract(null);
        }

        setStatus('authenticated');
      } else {
        throw new Error(`Invalid response status: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Failed to fetch staff data:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });

      if (error.response?.status === 401) {
        setStatus('unauthenticated');
        setIsAuthenticated(false);
        window.location.href = '/auth/login'; // Redirect to login on 401
      } else {
        setStatus('error');
        setIsAuthenticated(false);
      }
    }
  }, [basepath, tokenCookie, activeUser, activeStaff, activeContract, setActiveUser, setActiveStaff, setActiveContract, fetchCount]);

  // Initialize basepath once on mount
  useEffect(() => {
    if (!basepath) {
      setBasepath(process.env.NEXT_PUBLIC_BASEPATH || 'http://localhost:3800');
    }
  }, [basepath, setBasepath]);

  // Fetch data only once on mount or when token changes
  useEffect(() => {
    if (basepath && tokenCookie && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchData();
    }
  }, [basepath, tokenCookie, fetchData]);

  const refreshFormValues = useCallback(async () => {
    hasFetchedRef.current = false; // Allow refresh to trigger fetch
    await fetchData();
  }, [fetchData]);

  return {
    activeUser,
    activeStaff,
    activeContract,
    isAuthenticated,
    status,
    refreshFormValues,
  };
}