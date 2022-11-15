import React from 'react';
import Head from 'next/head';

import Searchbar from '@components/Searchbar';
import Preloader from '@components/Preloader';
import GalleryContainer from 'containers/Gallery';

export default function Home() {
  /**
   * NOTE logic ideally should be moved to stateful containers or context.
   * Page-level components should be used only for composition.
   * Not required for such small projects tho
   */
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

      <div className="flex min-h-[250px] w-full flex-col items-center justify-center">
        {query && query.length > 2 ? (
          <React.Suspense fallback={<Preloader />}>
            <GalleryContainer query={query} />
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
