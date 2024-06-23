import Head from 'next/head';
import './globals.css';
import Menu from '../components/Menu';
import Script from 'next/script';

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        <title>Neubele</title>
        <meta name="description" content="Description of your site" />
        <Script src="/components/bag-count.js" strategy="beforeInteractive" />
      </Head>
      <body>
        <Menu />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
