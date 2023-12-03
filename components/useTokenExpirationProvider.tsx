import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';
import { format, differenceInSeconds } from 'date-fns';

export default function TokenExpirationProvider({ children }) {
  const router = useRouter();

  useEffect(() => {
    const handleTokenExpiration = () => {
        if (router.pathname === '/user/login') {
          // Skip token expiration logic for '/user/login' page
          return;
        }
      const cookies = parseCookies();
      const token = cookies.token;

      if (!token) {
        // Token is not present, perform logout action
        router.push('/login'); // Redirect to the login page or any other appropriate route
        return;
      }

      // Parse the token and get the expiration timestamp
      const { exp } = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = exp * 1000; // Convert to milliseconds

      const formattedExpDate = format(expirationTime, 'yyyy-MM-dd hh:mm:ss');
      console.log('Token Expiry time(logout time) :', formattedExpDate); // Output: 2023-02-06 07:12:17

      const timeToExpInSeconds = differenceInSeconds(
        expirationTime,
        Date.now(),
      );
      console.log('time to expire from now (seconds):', timeToExpInSeconds);

      const timeout = setTimeout(() => {
        // Token has expired, perform logout action
        console.log(
          'Logging out, now is:',
          format(Date.now(), 'yyyy-MM-dd hh:mm:ss'),
        );
        destroyCookie({}, 'token', {
          path: '/', // THE KEY IS TO SET THE SAME PATH
        });
        router.push('/login'); // Redirect to the login page or any other appropriate route
      }, timeToExpInSeconds * 1000);

      return () => clearTimeout(timeout);
    };

    handleTokenExpiration();
  }, []);

  return <>{children}</>;
}
