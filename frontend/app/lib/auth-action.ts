'use server';
import { signIn, auth } from '@/auth';

export async function SignIn(tokenCookie: String) {
  console.log('Next server side called');
  return await signIn('custom-provider', {
    token: tokenCookie,
    redirect: false,
  });
}

export async function getMySession(tokenCookie: String) {
  console.log('Next server side called, getSession');
  const session = await auth();
  console.log('getMySessionResult:', session);
  if (!session.user) return null;
  return session;
}
