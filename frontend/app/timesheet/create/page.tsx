import { MainShell } from '@/components/MainShell/MainShell';
import Head from 'next/head';
import CreateTimesheetPage from '@/components/timesheet/CreateTimeSheet';

export default function CreateTimesheet() {
  /*const { data: session, status } = useSession();
  if (status === 'loading') {
    return <p>Loading...</p>;
  }
  if (status === 'unauthenticated') {
    //return <p>Access Denied</p>
    return (
      <div>
        <p>Access Denied</p>
        session:{session}
      </div>
    );
  }*/
  return (
    <MainShell home>
      <Head>
        <title>Create Timesheet</title>
      </Head>
      <CreateTimesheetPage pickersize="sm" />
    </MainShell>
  );
}
