import Layout from '../../components/layout';
import LeaveRequestForm from '../../components/LeaveRequest/LeaveRequestForm';

import { StaffService } from 'src/server/staff/service/staff.service';
import { LeaveRequestService } from 'src/server/leaverequest/service/leaverequest.service';

import { PrismaClient } from '@prisma/client';

//export default function LeaveRequestForm({ staff, publicholidays }) {
export default function CreateLeaveRequestForm() {
  const LeaveRequestPeriod = {
    leavePeriodStart: null,
    leavePeriodEnd: null,
  };
  return (
    <Layout contentpadding="20px">
      <LeaveRequestForm
        formType={'create'}
        LeaveRequestPeriod={LeaveRequestPeriod}
      />
    </Layout>
  );
}
export const getServerSideProps = async ({ params }) => {
  const staffService = new StaffService();
  const prisma = new PrismaClient();
  const leaveReqSvc = new LeaveRequestService(prisma);

  return {
    props: {},
  };
};
