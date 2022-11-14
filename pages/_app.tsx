import type { AppProps } from 'next/app';
import { Nunito } from '@next/font/google';
import { SWRConfig } from 'swr';

import '../styles/globals.css';
import Layout from '@components/Layout';
import { fetcher } from 'utils';

const nunito = Nunito({ variable: '--font-nunito', subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher, suspense: true }}>
      <Layout className={nunito.variable}>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
