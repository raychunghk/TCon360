'use client';
import { MainShell } from '@/components/MainShell/MainShell';

import FrontPageCalendar from '@/components/Calendar/FrontPageCalendar';

export default function Page() {

  return (

    <MainShell contentpadding="0px">
      <FrontPageCalendar />
    </MainShell>
  );
}
