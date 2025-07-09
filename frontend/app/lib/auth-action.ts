'use server';
import { auth, signIn } from '@/auth';
import { Session, User } from 'next-auth';

export async function SignIn(tokenCookie: String) {
  console.log('Next server side called');
  return await signIn('custom-provider', {
    token: tokenCookie,
    redirect: false,
  });
}
interface CustomSession extends Session {
  user?: User;
}
//export async function getMySession(tokenCookie: String) {
export async function getMySession(): Promise<Session | null> {
  console.log('Next server side called, getSession');
  const session = await auth();
  console.log('getMySessionResult:', session);
  if (!session || !session.user) return null;
  return session;
}