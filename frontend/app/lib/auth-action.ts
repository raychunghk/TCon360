'use server';
import { auth, signOut as authSignOut, signIn } from '@/auth';
import { Session, User } from 'next-auth';
import { redirect } from 'next/navigation';

export async function SignIn(tokenCookie: string) {
  console.log('Next server side called: SignIn initiated');
  const result = await signIn('custom-provider', {
    token: tokenCookie,
    redirect: false,
  });
  console.log('Next server side called: SignIn completed', { result });
  return result;
}

interface CustomSession extends Session {
  user?: User;
}

export async function getMySession(): Promise<Session | null> {
  console.log('Next server side called: getMySession started');
  const session = await auth();
  console.log('Next server side called: auth() retrieved session', { session });

  if (!session) {
    console.log('Next server side called: No session retrieved from auth()');
  } else {
    console.log('Next server side called: Session details', {
      user: session.user,
      expires: session.expires,
      rawSession: session,
    });
  }

  if (!session || !session.user) {
    console.log('Next server side called: Session or user is null/undefined');
    console.log('Next server side called: Session is invalid or expired, initiating sign-out');
    await authSignOut({ redirect: false });
    console.log('Next server side called: authSignOut executed');
    return null;
  }

  console.log('Next server side called: getMySession returning valid session');
  return session;
}

export async function SignOut() {
  console.log('Next server side called: SignOut initiated');
  await authSignOut({ redirect: false });
  console.log('Next server side called: authSignOut executed in SignOut');
  redirect('/auth/login');
  return { success: true };
}