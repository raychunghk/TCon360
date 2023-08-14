
import Script from 'next/script';
import Layout, { siteTitle } from '../../components/layout';
import Head from 'next/head'
import timesheet from '../../backend/timesheet.mjs'
import Link from 'next/link'
import { format } from 'date-fns'

export const getStaticProps = async () => {
  //const res = await fetch('https://jsonplaceholder.typicode.com/users');
  // const res = await fetch('/api/calendar');
  let currentmonth = await timesheet();



  return {
    props: { calendar: JSON.parse(JSON.stringify(currentmonth)) }
  }
}

const Ninjas = ({ calendar }) => {
  // console.log(ninjas)
  console.log('hihi')
  console.log(calendar);

  return (
   
    <Layout home>
      <Head>
        <title>Calendar</title>
      </Head>

        <h1>{calendar[0].Month}</h1>
        {calendar.map(objday => (

          <Link href={'/day/' + objday.id} key={objday.id}>

            <h3>{format(new Date(objday.CalendarDate), 'dd/MM//yyyy')}</h3>
            <div> {objday.WeekDayName}</div>
          </Link>
        ))}
    
    </Layout>
  );
}

export default Ninjas;