'use client';

import LeaveRequestForm from '@/components/LeaveRequest/LeaveRequestForm';
import { MainShell } from '@/components/MainShell/MainShell';

export default function Page() {
  const LeaveRequestPeriod = {
    leavePeriodStart: null,
    leavePeriodEnd: null,
  };
  return (
    <MainShell contentpadding="20px">
      <LeaveRequestForm formType={'create'} LeaveRequestPeriod={LeaveRequestPeriod} />
    </MainShell>
  );
}
