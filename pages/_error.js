import Link from 'next/link';
import Layout from '../components/layout';
import Head from 'next/head';
function Error({ statusCode }) {
    return (
        <Layout home>
            <Head>
                <title>TimeSheet</title>
            </Head>
            <div>
                <div>
                    <p>
                        {statusCode
                            ? `An error ${statusCode} occurred on server`
                            : 'An error occurred on client'}
                    </p>
                    <Link href="/">
                        Return to home page 
                    </Link>
                </div>
            </div>
        </Layout>

    );
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;