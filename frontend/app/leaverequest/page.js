'use client';
//import Layout from '../../components/layout';
import LeaveRequestForm from '@/components/LeaveRequest/LeaveRequestForm';
import { MainShell } from '@/components/MainShell/MainShell';
//import { StaffService } from 'src/server/staff/service/staff.service';
//import { LeaveRequestService } from 'src/server/leaverequest/service/leaverequest.service';

//import { PrismaClient } from '@prisma/client';
//import MainLinks from '../../components/MainShell/NavBar/mainlinks';

//export default function LeaveRequestForm({ staff, publicholidays }) {
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
 