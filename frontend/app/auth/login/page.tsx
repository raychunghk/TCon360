// pages/auth/login/page.tsx (or wherever your LoginPage is located)
'use client';

import LoginBody from '@/components/login/LoginBody';
import useStore from '@/components/stores/zstore.ts'; // Import your Zustand store
import { useEffect } from 'react'; // Import useEffect

export default function LoginPage(props: any) {
  // Access the clearAllState action from your store
  const clearAllState = useStore((state) => state.clearAllState);

  useEffect(() => {
    // This useEffect will run once when the LoginPage component mounts.
    // It's the ideal place to clear any lingering state from a previous session.
    console.log('LoginPage mounted: Clearing all store state.');
    clearAllState();
  }, [clearAllState]); // Depend on clearAllState to ensure it's always the latest function

  return (
    <LoginBody />
  );
}