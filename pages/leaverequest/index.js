import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';

import Layout from '../../components/layout';
import LeaveRequestForm from '../../components/LeaveRequest/LeaveRequestForm';
import MyModal from '../../components/MyModal';
import { format, parseISO, isWeekend } from 'date-fns';
import { basepath } from '/global';
import Head from 'next/head';
import { useForm as uForm } from 'react-hook-form';
import { StaffService } from 'src/server/staff/service/staff.service';
import { LeaveRequestService } from 'src/server/leaverequest/service/leaverequest.service';

import { UtilsContext } from '../../components/util/utilCtx';
import { PrismaClient } from '@prisma/client';
import { PublicHolidaysContext } from '../_app';
//export default function LeaveRequestForm({ staff, publicholidays }) {
export default function CreateLeaveRequestForm({ staff }) {
  const LeaveRequestPeriod = {
    leavePeriodStart: null,
    leavePeriodEnd: null,
  };
  return (
    <Layout>
      <LeaveRequestForm
        staff={staff}
        formType={'new'}
        LeaveRequestPeriod={LeaveRequestPeriod}
      />
    </Layout>
  );
}
export const getServerSideProps = async ({ params }) => {
  const staffService = new StaffService();
  const staff = await staffService.getStaffById(1);
  const prisma = new PrismaClient();
  const leaveReqSvc = new LeaveRequestService(prisma);

  return {
    props: {
      staff,
    },
  };
};
