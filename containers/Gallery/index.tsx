import React from 'react';
import useSWRInfinite from 'swr/infinite';
import InfiniteScroll from 'react-swr-infinite-scroll';

import { IImage, IImagesResponse } from 'interfaces';
import { DEFAULT_LIMIT } from '@utils/const';
import Gallery from '@components/Gallery';
import Preloader from '@components/Preloader';

const GalleryContainer: React.FC<{ query: string }> = ({ query }) => {
  const swr = useSWRInfinite<IImagesResponse>(
    (pageIndex, prevPageData) => {
      if (prevPageData && !prevPageData.images?.length) {
        return null;
      }
      const requestQuery = new URLSearchParams({
        query,
        page: (pageIndex + 1).toString(),
      });
      return '/api/images?' + requestQuery.toString();
    },
    { revalidateFirstPage: false },
  );

  const { data, error } = swr;

  React.useEffect(() => {
    if (error) {
      alert("Couldn't load images 😱😱😱");
    }
  }, [error]);

  // pluck multiple pages response
  const images = React.useMemo(
    () =>
      data
        ? data.reduce<IImage[]>((acc, val) => {
            acc = acc.concat(val.images!);
            return acc;
          }, [])
        : [],
    [data],
  );

  if (!data) {
    return null;
  }

  return (
    <InfiniteScroll
      swr={swr}
      offset={-50}
      isReachingEnd={
        (data[data.length - 1]?.images?.length || 0) < DEFAULT_LIMIT
      }
      loadingIndicator={<Preloader />}
    >
      <Gallery images={images} />
    </InfiniteScroll>
  );
};

export default GalleryContainer;
