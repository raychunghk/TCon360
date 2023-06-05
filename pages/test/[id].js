export default function MyDynamicPage({ example }) {
    return (<Layout home>
        <Head></Head>
        <div>My example is {example}</div>
    </Layout>
    )
}

MyDynamicPage.getInitialProps = ({ query: { example } }) => {
    return { example }
}