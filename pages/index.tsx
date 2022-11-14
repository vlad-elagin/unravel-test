import React from 'react';
import Head from 'next/head';

import Gallery from '@components/Gallery';
import Searchbar from '@components/Searchbar';
import Preloader from '@components/Preloader';

export default function Home() {
  const [query, setQuery] = React.useState<string | null>(null);

  return (
    <>
      <Head>
        <title>Gallery - Unravel Test</title>
      </Head>

      <Searchbar
        className="mb-8 lg:mb-20"
        onSearch={(newQuery) => setQuery(newQuery)}
      />

      <div className="flex min-h-[250px] w-full items-center justify-center">
        {query && query.length > 2 ? (
          <React.Suspense fallback={<Preloader />}>
            <Gallery query={query} />
          </React.Suspense>
        ) : (
          <span className="text-xl">
            Start searching to see something awesome
          </span>
        )}
      </div>
    </>
  );
}
