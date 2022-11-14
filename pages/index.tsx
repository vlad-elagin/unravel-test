import Head from 'next/head';

import Gallery from '@components/Gallery';

export default function Home() {
  return (
    <>
      <Head>
        <title>Gallery - Unravel Test</title>
      </Head>

      <Gallery />
    </>
  );
}
