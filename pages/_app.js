import Head from 'next/head';
import './globals.css';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Neubele</title>
        <meta name="description" content="Description of your site" />
      </Head>
      <Script src="/components/bag-count.js" strategy="beforeInteractive" />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
