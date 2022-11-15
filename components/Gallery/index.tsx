import React from 'react';
import useSWRInfinite from 'swr/infinite';

import ImageTile from '@components/ImageTile';
import { IImagesResponse } from 'interfaces';

const Gallery: React.FC<{ query: string }> = ({ query }) => {
  const { data, size, setSize } = useSWRInfinite<IImagesResponse>(
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
    <>
      <div className="mb-4 columns-1 gap-8 md:columns-2 lg:columns-4">
        {images?.map((img) => (
          <ImageTile key={img.id} {...img} />
        ))}
      </div>

      <button onClick={() => setSize(size + 1)}>load more</button>
    </>
  );
};

export default Gallery;
