import { parseCookies, setCookie } from 'nookies';
import { signIn } from 'next-auth/react';

export async function handleLoginSuccess(response, router) {
  const data = await response.json();
  const token = data.accessToken;
  const _maxAge = process.env.TOKEN_MAX_AGE;
  console.log('_maxage in handleLoginSuccess');
  console.log(_maxAge);
  // set the user's session token in localStorage
  setCookie(null, 'token', token, {
    maxAge: parseInt(_maxAge), // cookie expiration time (in seconds)
    path: '/', // cookie path
  });

  console.log('token cookie');
  const cookies = parseCookies();
  const tokenCookie = cookies.token;
  console.log(tokenCookie);
  //setJwtToken(token);
  const signInResult = await signIn('custom-provider', {
    token: tokenCookie,
    redirect: false,
  });
  /* if (signInResult.error) { // Handle Error on client side
        console.log('sign in result')
        console.log(signInResult)
        console.log(signInResult.error)
    }*/
  router.push('/'); // redirect to the dashboard page on successful login
}
