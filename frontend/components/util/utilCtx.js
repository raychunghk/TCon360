import { createContext } from 'react';
import { dispatch } from 'react-redux';
import { destroyCookie } from 'nookies';
import { signOut } from 'next-auth/react';
export const UtilsContext = createContext();
export const handleSignout = () => {
  destroyCookie(null, 'token');
  dispatch(clearAllState());
  signOut();
};
