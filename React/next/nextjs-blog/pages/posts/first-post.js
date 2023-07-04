import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout'
import Message from '../../components/message'

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      <h1>First Post</h1>
      <Message type="success">This is a success message</Message>
      <Message type="error">This is a error message</Message>
    </Layout>
  )
}