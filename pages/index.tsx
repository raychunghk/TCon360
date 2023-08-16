import { FrontPageCalendar } from '../components/Calendar/FrontPageCalendar';
import Layout from '../components/layout';
import Head from 'next/head';

export default function HomePage(props) {
  return (
    <Layout home contentpadding="0px">
      <Head>
        <title>NxTime</title>
      </Head>
      <FrontPageCalendar {...props} />
      {/* <ColorSchemeToggle /> */}
    </Layout>
  );
}
