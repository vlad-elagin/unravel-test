import type { AppProps } from 'next/app';
import { Nunito } from '@next/font/google';

import '../styles/globals.css';
import Layout from '@components/Layout';

const nunito = Nunito({ variable: '--font-nunito', subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout className={nunito.variable}>
      <Component {...pageProps} />
    </Layout>
  );
}
