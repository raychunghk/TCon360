import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useDispatch } from 'react-redux';
import { setStaff } from 'pages/reducers/calendarReducer';
import { basepath } from '/global';

interface StaffData {
  formValues: any;
  editing: boolean;
  setFormValues: (values: any) => void;
  refreshFormValues: () => void;
}

export function useStaffData(): StaffData {
  const [formValues, setFormValues] = useState({});
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const cookies = parseCookies();
  const tokenCookie = cookies.token;

  const fetchData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${tokenCookie}`,
      };

      const response = await axios.get(`${basepath}/api/user/myuser`, {
        headers,
      });

      if ([200, 201].includes(response.status)) {
        const _staff = response.data.staff[0];
        console.log(_staff);
        setFormValues(_staff);
        setEditing(true);
        dispatch(setStaff(_staff));
      }
    } catch (error) {
      console.error('Failed to fetch staff data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshFormValues = async () => {
    await fetchData();
  };

  return { formValues, editing, setFormValues, refreshFormValues };
}
