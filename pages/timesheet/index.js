import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ExcelPage() {
    const [excelData, setExcelData] = useState('');

    useEffect(() => {
        async function fetchData() {
            const url = (process.env.URL || '') + '/api/timesheet/content'
            console.log(url)
            const response = await axios.get(url);
            setExcelData(response.data);
        }
        fetchData();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody>
                {excelData.map(row => (
                    <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.age}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export async function getStaticProps() {
    const url = (process.env.URL || '') + '/api/timesheet/content'
    console.log(url)
    const response = await axios.get(url);
    const data = response.data;
    return {
        props: { data },
    };
}