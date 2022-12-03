import React from 'react';
import useSWR from 'swr';
import { IImage, ITagsResponse } from 'interfaces';
import ImageTile from '@components/ImageTile';

const ImageTileContainer: React.FC<IImage> = (image) => {
  const [shouldFetchTags, fetchTags] = React.useState(false);

  const { data, error, isValidating } = useSWR<ITagsResponse>(
    shouldFetchTags
      ? `/api/tags?${new URLSearchParams({ url: image.url })}`
      : null,
    { suspense: false, revalidateOnFocus: false },
  );

  React.useEffect(() => {
    if (error) {
      alert("Couldn't load tags 😱");
    }
  }, [error]);

  return (
    <ImageTile
      {...image}
      tags={data?.tags}
      fetchTags={fetchTags}
      tagsLoading={isValidating}
    />
  );
};

export default ImageTileContainer;
