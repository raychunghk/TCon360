import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';

import { setStaff } from 'pages/reducers/calendarReducer';
import { basepath } from '/global';
//import { useDispatch, useSelector } from 'react-redux';import { useShallow } from 'zustand/shallow';
import useStore from 'pages/reducers/zstore';
import { useShallow } from 'zustand/shallow';
interface StaffData {
  activeUser: any;
  activeStaff: any;
  activeContract: any;
  isAuthenticated: boolean;
  status: any;
}

export function useStaffData(): StaffData {
  // const { staff } = useSelector((state) => ({
  //   staff: state.calendar.staff,
  // }));
  //const [formValues, setFormValues] = useState({});
  //const [editing, setEditing] = useState(false);
  //const dispatch = useDispatch();
  const cookies = parseCookies();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [status, setStatus] = useState('loading');
  const tokenCookie = cookies.token;
  /*const [setEditErrors, setNextContractStartDate] = useStore(
    useShallow((state) => [
      state.setEditErrors,
      state.setNextContractStartDate,
    ]),
  );*/
  const [
    activeContract,
    setActiveContract,
    activeStaff,
    setActiveStaff,
    activeUser,
    setActiveUser,
    userStatus,
  ] = useStore(
    useShallow((state) => [
      state.activeContract,
      state.setActiveContract,
      state.activeStaff,
      state.setActiveStaff,
      state.activeUser,
      state.setActiveUser,
      state.userStatus,
    ]),
  );

  const fetchData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${tokenCookie}`,
      };

      const response = await axios.get(`${basepath}/api/user/myuser`, {
        headers,
      });

      if ([200, 201].includes(response.status)) {
        setIsAuthenticated(true);
        const _user = response.data;
        setActiveUser(_user);
        const _staff = _user.staff[0];
        // activeStaff = _staff;
        console.log('usestaff:, setstaff', _staff);
        setActiveStaff(_staff);
        // setFormValues(_staff);
        // setEditing(true);
        // dispatch(setStaff(_staff));
        const _activeContract = _staff.contracts.filter(
          (contract) => contract.IsActive === true,
        );
        const ctract = _activeContract ? _activeContract[0] : null;
        console.log('usestaff:, setActiveContract', ctract);
        setActiveContract(ctract);
        setStatus('authenticated');
      } else {
        setStatus('unauthenticated');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Failed to fetch staff data:', error);
    }
  };

  useEffect(() => {
    if (tokenCookie) fetchData();
  }, []);

  const refreshFormValues = async () => {
    await fetchData();
  };

  return {
    activeUser,
    activeStaff,
    activeContract,
    isAuthenticated,
    status,
  };
}
