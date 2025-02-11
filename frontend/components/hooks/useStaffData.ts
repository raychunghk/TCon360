import { baseconfig } from '@/../baseconfig';
import useStore from '@/components/stores/zstore';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';

interface StaffData {
  activeUser: any;
  activeStaff: any;
  activeContract: any;
  isAuthenticated: boolean;
  status: string;
  refreshFormValues:any;
}

export function useStaffData(): StaffData {
  const cookies = parseCookies();
  const tokenCookie = cookies.token;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [status, setStatus] = useState('loading');

  const {
    activeContract,
    setActiveContract,
    activeStaff,
    setActiveStaff,
    activeUser,
    setActiveUser,
    userStatus,
    basepath,
    setBasepath,
  } = useStore();

  const fetchData = async () => {
    if (!tokenCookie) {
      setStatus('unauthenticated');
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${tokenCookie}` };
      const response = await axios.get(`${basepath}/api/user/myuser`, { headers });

      if (response.status === 200 || response.status === 201) {
        const userData = response.data;
        setIsAuthenticated(true);
        setActiveUser(userData);

        const staffMember = userData.staff[0];
        setActiveStaff(staffMember);

        const activeContracts = staffMember.contracts.filter(contract => contract.IsActive);
        setActiveContract(activeContracts.length > 0 ? activeContracts[0] : null);

        setStatus('authenticated');
      } else {
        throw new Error('Invalid response status');
      }
    } catch (error) {
      console.error('Failed to fetch staff data:', error);
      setIsAuthenticated(false);
      setStatus('unauthenticated');
    }
  };

  useEffect(() => {
    const _basepath = baseconfig.basepath;
    if (!basepath) {
      setBasepath(_basepath);
    }
  }, [basepath, setBasepath]);

  useEffect(() => {
    if (basepath) {
      fetchData();
    }
  }, [basepath, tokenCookie]);

  const refreshFormValues = async () => {
    await fetchData();
  };

  return {
    activeUser,
    activeStaff,
    activeContract,
    isAuthenticated,
    status,refreshFormValues,
  };
}