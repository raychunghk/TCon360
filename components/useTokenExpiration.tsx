import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';

export default function useTokenExpiration() {
  const router = useRouter();

  useEffect(() => {
    //const token = getTokenCookie();
    const cookies = parseCookies();
    const token = cookies.token;

    if (!token) {
      // Token is not present, perform logout action
      router.push('/login'); // Redirect to the login page or any other appropriate route
      return;
    }

    // Parse the token and get the expiration timestamp
    //const { exp } = JSON.parse(atob(token.split('.')[1]));
    const decrypted = JSON.parse(atob(token.split('.')[1]));
    console.log('decrypted', decrypted);
    const exp = decrypted.exp;
    const iat = decrypted.iat;
    const date = new Date(exp * 1000); // Multiply by 1000 for milliseconds

    // Extract the components of the date
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Create the formatted date string
    const formattedExpDate = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    console.log(formattedExpDate); // Output: 2023-02-06 07:12:17
    const expirationTime = exp * 1000; // Convert to milliseconds
    console.log('expiration time:', expirationTime);
    console.log('IAT time:', expirationTime);
    const timeout = setTimeout(() => {
      // Token has expired, perform logout action
      //removeTokenCookie();
      destroyCookie({}, 'token', {
        path: '/', // THE KEY IS TO SET THE SAME PATH
      });
      router.push('/login'); // Redirect to the login page or any other appropriate route
    }, expirationTime - Date.now());

    return () => clearTimeout(timeout);
  }, []);
}
