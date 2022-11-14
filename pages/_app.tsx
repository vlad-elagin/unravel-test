import type { AppProps } from 'next/app';
import { Nunito } from '@next/font/google';

import '../styles/globals.css';
import Layout from '@components/Layout';
import { GalleryProvider } from 'hooks/gallery';

const nunito = Nunito({ variable: '--font-nunito', subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GalleryProvider>
      <Layout className={nunito.variable}>
        <Component {...pageProps} />
      </Layout>
    </GalleryProvider>
  );
}
