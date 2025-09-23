import { signOut } from 'next-auth/react';
import { destroyCookie } from 'nookies';
import { createContext } from 'react';
import { dispatch } from 'react-redux';
export const UtilsContext = createContext();
export const handleSignout = () => {
  destroyCookie(null, 'token');
  dispatch(clearAllState());
  signOut();
};
