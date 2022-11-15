import React from 'react';
import useSWRInfinite from 'swr/infinite';

import ImageTile from '@components/ImageTile';
import { IImagesResponse } from 'interfaces';
import InfiniteScroll from 'react-swr-infinite-scroll';
import { DEFAULT_LIMIT } from '@utils/const';

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
      isReachingEnd={data[data.length - 1]?.images!.length < DEFAULT_LIMIT}
    >
      <div className="mb-4 columns-1 gap-8 md:columns-2 lg:columns-4">
        {images?.map((img) => (
          <ImageTile key={img.id} {...img} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Gallery;
