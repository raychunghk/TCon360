import Layout from '../../components/layout';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { basepath } from '/global';
async function getApiText() {
    const response = await fetch((process.env.URL || '') + `${basepath}/api/test`);
    const data = await response.json();
    const text = data.content;
    return text;
}

export default function ApiTestPage({ text }) {
    // const [apiText, setApiText] = useState(text);

    // useEffect(async () => {
    //     const newText = await getApiText();
    //     setApiText(newText);
    // }, []);

    return (
        <Layout home>
            <Head>
                <title>User Information</title>
            </Head>
            <div>{text}</div>
        </Layout>
    );
}

ApiTestPage.getInitialProps = async () => {
    const text = await getApiText();
    return { text };
};




//export default function test() {
function test() {

    const [content, setContent] = useState('')

    useEffect(() => {
        console.log('basepath?')
        console.log(basepath)
        fetch(`${basepath}/api/test`)
            .then(res => res.json())
            .then(data => setContent(data.content))
    }, [])
    return (
        < Layout home >
            <Head>
                <title>User Information</title>
            </Head>
            <div>
                hello
                {content} x
            </div>
        </Layout >
    );
};
