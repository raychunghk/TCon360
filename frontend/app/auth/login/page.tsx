// pages/auth/login/page.tsx (or wherever your LoginPage is located)
'use client';

import LoginBody from '@/components/login/LoginBody';
import useStore from '@/components/stores/zstore.ts'; // Import your Zustand store
import { useEffect } from 'react'; // Import useEffect
import { useSearchParams } from 'next/navigation';
import { signIn } from '@/app/lib/bauthclient';

export default function LoginPage(props: any) {
  // Access the clearAllState action from your store
  const clearAllState = useStore((state) => state.clearAllState);
  const searchParams = useSearchParams();

  useEffect(() => {
    // This useEffect will run once when the LoginPage component mounts.
    // It's the ideal place to clear any lingering state from a previous session.
    console.log('LoginPage mounted: Clearing all store state.');
    clearAllState();

    // Handle Google OAuth login completion (existing user login)
    const googleLoginToken = searchParams.get('googleLoginToken');
    if (googleLoginToken) {
      console.log('Google login token detected, establishing session...');
      signIn.credentials({
        email: '',
        username: '',
        password: '',
        provider: 'google-complete',
        token: googleLoginToken,
      }).then((result) => {
        if (!result.error) {
          window.location.href = '/';
        } else {
          console.error('Failed to establish Google login session:', result.error);
        }
      });
    }
  }, [clearAllState, searchParams]); // Depend on clearAllState and searchParams to ensure they're always the latest

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <LoginBody />
  );
}