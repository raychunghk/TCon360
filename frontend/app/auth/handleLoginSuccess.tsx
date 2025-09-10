import useStore from '@/components/stores/zstore.js';
import { signIn } from 'next-auth/react';
import { parseCookies, setCookie } from 'nookies';
//import { setAuthtoken } from 'pages/reducers/calendarReducer';
export async function handleLoginSuccess(response, router) {
  const data = await response.json();
  const token = data.accessToken;
  const { setAuthtoken } = useStore();
  const _maxAge = process.env.TOKEN_MAX_AGE;
  console.log('_maxage in handleLoginSuccess');
  console.log(_maxAge);
  // set the user's session token in localStorage
  setCookie(null, 'token', token, {
    maxAge: parseInt(_maxAge || '1800'), // cookie expiration time (in seconds)
    path: '/', // cookie path
  });

  console.log('token cookie');
  const cookies = parseCookies();
  const tokenCookie = cookies.token;
  console.log(tokenCookie);
  setAuthtoken(tokenCookie);
  //dispatch(setAuthtoken(tokenCookie));
  //setJwtToken(token);
  const signInResult = await signIn('custom-provider', {
    token: tokenCookie,
    redirect: false,
  });

  router.push('/'); // redirect to the dashboard page on successful login
}
