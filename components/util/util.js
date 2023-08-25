import { destroyCookie } from 'nookies';
import { signOut } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';

import { clearAllState } from 'pages/reducers/calendarReducer';
const dispatch = useDispatch();
export const handleSignout = () => {
  destroyCookie(null, 'token');
  dispatch(clearAllState());

  signOut();
};
