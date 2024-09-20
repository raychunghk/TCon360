'use client';
import { Welcome } from '../components/Welcome/Welcome';
import { MainShell } from '@/components/MainShell/MainShell';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import useUIStore from '@/components/stores/useUIStore';
import useStore from '@/components/stores/zstore';
import { useShallow } from 'zustand/react/shallow';
import FrontPageCalendar from '@/components/Calendar/FrontPageCalendar';


export default function Page() {
  //const { siteTitle } = useUIStore();
  const [siteTitle] = useUIStore(useShallow((state) => [state.siteTitle]));
  const [setTimesheetDefaultDate, basepath] = useStore(
    useShallow((state) => [state.setTimesheetDefaultDate, state.basepath])
  );
  const handleTimesheetDateChange = (date: any) => {
    setTimesheetDefaultDate(date);
  };
  return (
    <MainShell contentpadding="0px">
      {basepath && <FrontPageCalendar handleTimesheetDateChange />}
    </MainShell>
  );
}
