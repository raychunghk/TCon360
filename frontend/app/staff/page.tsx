'use client'
import { ThemeSwitch } from '@/components/ThemeSwitch/ThemeSwitch';
import { Welcome } from '@/components/Welcome/Welcome';

export default function Page() {
  return (
    <>
      <Welcome />
      <ThemeSwitch />
    </>
  );
}
