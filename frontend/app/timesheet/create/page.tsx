import { MainShell } from '@/components/MainShell/MainShell';
import Head from 'next/head';
import CreateTimesheetPage from '@/components/timesheet/CreateTimeSheet';

export default async function Page() {

  return (
    <MainShell >
      <Head>
        <title>Create Timesheet</title>
      </Head>
      <CreateTimesheetPage pickersize="sm" />
    </MainShell>
  );
}
