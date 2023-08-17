import Layout from '../../components/layout';
import Head from 'next/head';
import CreateTimesheetPage from '../../components/timesheet/createform';
import { useSession } from 'next-auth/react';
export default function CreateTimesheet() {
  const { data: session, status } = useSession();
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
  }
  return (
    <Layout home>
      <Head>
        <title>Create Timesheet</title>
      </Head>
      <CreateTimesheetPage pickersize="sm" />
    </Layout>
  );
}
