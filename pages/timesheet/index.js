import { useEffect, useState } from 'react';
import TsTable from '../../components/TimesheetTable'
import axios from 'axios';
import { basepath } from '/global';
import Layout from '../../components/layout';
import Head from 'next/head';
export default function ExcelPage({ data }) {
    const [excelData, setExcelData] = useState('');



    return (
        <Layout home>
            <Head>
                <title>TimeSheet</title>
            </Head>
            <div>
                <TsTable data={data} />
            </div>
        </Layout>

    );
}
export async function getStaticProps() {
    const url = (process.env.URL || '') + `${basepath}/api/timesheet/content`
    console.log(url)
    const response = await axios.get(url);
    const data = response.data;
    console.log(data)
    return {
        props: { data },
    };
}