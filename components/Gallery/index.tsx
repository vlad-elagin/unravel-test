import React from 'react';
import useSWRInfinite from 'swr/infinite';
import Masonry from '@mui/lab/Masonry';
import InfiniteScroll from 'react-swr-infinite-scroll';

import ImageTile from '@components/ImageTile';
import { IImagesResponse } from 'interfaces';
import { DEFAULT_LIMIT } from '@utils/const';
import Preloader from '@components/Preloader';

const Gallery: React.FC<{ query: string }> = ({ query }) => {
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

  const { data } = swr;

  // pluck multiple pages response
  const { images, total } = React.useMemo(
    () =>
      data
        ? data.reduce(
            (acc, val) => {
              if (!acc.total) {
                acc.total = val.total;
              }
              acc.images = acc.images!.concat(val.images!);
              return acc;
            },
            { images: [] },
          )
        : {},
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
      <Masonry className="mb-4" spacing={4} columns={{ xs: 1, sm: 2, lg: 4 }}>
        {images!.map((img) => (
          <ImageTile key={img.id} {...img} />
        ))}
      </Masonry>
    </InfiniteScroll>
  );
};

export default Gallery;
