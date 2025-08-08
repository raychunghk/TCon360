'use server';
import { auth, signOut as authSignOut, signIn } from '@/auth';
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
export async function SignOut() {
  console.log('Next server side called: SignOut');
  // Calling NextAuth's signOut.
  // redirect: false means NextAuth will not automatically redirect the user
  // after signing out. This allows the client-side code to handle the navigation
  // after any local state cleanup.
  await authSignOut({ redirect: false });
  // You can return a success status if the client needs to confirm the action.
  return { success: true };
}