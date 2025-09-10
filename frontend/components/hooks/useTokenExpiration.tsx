import { useEffect } from 'react';

import useStore from '@/components/stores/zstore.js';
import { differenceInSeconds, format } from 'date-fns';
import { usePathname } from 'next/navigation'; // Add this import
import { destroyCookie, parseCookies } from 'nookies';

import { default as useRouter } from '@/components/useCustRouter';

export default function useTokenExpiration() {
  const router = useRouter();
  const { activeUser } = useStore(); const pathname = usePathname();
  console.log('router pathname', pathname);
  useEffect(() => {
    if (['/user/login', '/user/signup'].includes(pathname)) {
      // Skip token expiration logic for '/user/login' page
      return;
    }
    console.log('active User in useToekn Expiry hook:', activeUser);
    const cookies = parseCookies();
    const token = cookies.token;

    if (!token) {
      //if (!token || !activeUser) {
      // Token is not present, perform logout action
      router.push('/login'); // Redirect to the login page or any other appropriate route
      return;
    }

    // Parse the token and get the expiration timestamp
    const { exp, iat } = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = exp * 1000; // Convert to milliseconds

    const formattedExpDate = format(expirationTime, 'yyyy-MM-dd hh:mm:ss');
    console.log('Token Expiry time(logout time) :', formattedExpDate); // Output: 2023-02-06 07:12:17

    let timeToExpInSeconds = differenceInSeconds(expirationTime, Date.now());
    console.log('!Initial timeout to logout from now (seconds):', timeToExpInSeconds);

    const timeout = setTimeout(() => {
      // Token has expired, perform logout action
      console.log('Logging out, now is:', format(Date.now(), 'yyyy-MM-dd hh:mm:ss'));
      destroyCookie({}, 'token', {
        path: '/', // THE KEY IS TO SET THE SAME PATH
      });
      router.push('/login'); // Redirect to the login page or any other appropriate route
    }, timeToExpInSeconds * 1000);

    return () => clearTimeout(timeout);
    // below version is to log the time and countdown per second
    /*const countdownTimeout = setInterval(() => {
      console.log(`Token will expire in ${timeToExpInSeconds} seconds`);
      timeToExpInSeconds--;

      if (timeToExpInSeconds <= 0) {
        clearInterval(countdownTimeout);
        console.log(
          'Logging out, now is:',
          format(Date.now(), 'yyyy-MM-dd hh:mm:ss'),
        );

        destroyCookie({}, 'token', {
          path: '/',
        });
        //router.push('/login'); // Redirect to the login page or any other appropriate route
      }
    }, 1000);

    return () => clearInterval(countdownTimeout);*/
  }, [activeUser]);
}
