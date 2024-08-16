'use client';
import { Welcome } from '../components/Welcome/Welcome';
import { MainShell } from '@/components/MainShell/MainShell';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import useUIStore from '@/components/stores/useUIStore';
import useStore from '@/components/stores/zstore';

export default function HomePage() {
  const { siteTitle } = useUIStore();
  const { timesheetDefaultDate, setTimesheetDefaultDate } = useStore();
  const handleTimesheetDateChange = (date: any) => {
    setTimesheetDefaultDate(date);
  };
  return (
    <MainShell contentpadding="0px" handleTimesheetDateChange>
      <Welcome />
      <ColorSchemeToggle />
    </MainShell>
  );
}
