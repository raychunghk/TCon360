
import Script from 'next/script';
import Layout, { siteTitle } from '../../components/layout';
import Head from 'next/head'
import timesheetx from '../../backend/timesheet.mjs'
import Link from 'next/link'
import { format } from 'date-fns'

export const getStaticProps = async () => {
  const tsmonth = dt.getMonth()+1;
  let objcalendar = await timesheetx(tsmonth);
  console.log(objcalendar)
  return {
    props: { calendar: JSON.parse(JSON.stringify(objcalendar)) }
  }
}

const pageCalendar = ({ calendar }) => {
  // console.log(ninjas)
  console.log('hihi')
  console.log(calendar);

  return (

    <Layout home>
      <Head>
        <title>Calendar</title>
      </Head>

      <h1>{calendar[0].Month}</h1>
      <div>
        {calendar.map(objday => (
          <Link key={objday.id} href={'/day/' + objday.id}>
            <h3 key={objday.id}>{format(new Date(objday.CalendarDate), 'dd/MM/yyyy')}</h3>
            <div key={objday.id}> {objday.WeekDayName}</div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export default pageCalendar; 