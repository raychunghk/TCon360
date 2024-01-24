import { FrontPageCalendar } from '../components/Calendar/FrontPageCalendar';
import Layout from '../components/layout';
import Head from 'next/head';
import useUIStore from './reducers/useUIStore';
export default function HomePage(props, basepath, fnhandleSignout) {
  console.log('basepath??? in home??');
  console.log(basepath);
  const { siteTitle } = useUIStore();
  return (
    <Layout home contentpadding="0px">
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <FrontPageCalendar {...props} handleSignout={fnhandleSignout} />
      {/* <ColorSchemeToggle /> */}
    </Layout>
  );
}
