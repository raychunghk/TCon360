'use server';
import { signIn } from '@/auth';

export async function SignIn(tokenCookie: String) {
  console.log('Next server side called');
  return await signIn('custom-provider', {
    token: tokenCookie,
    redirect: false,
  });
}
