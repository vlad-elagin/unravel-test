import React from 'react';
import useSWR from 'swr';
import { IImage, ITagsResponse } from 'interfaces';
import ImageTile from '@components/ImageTile';

const ImageTileContainer: React.FC<IImage> = (image) => {
  const [shouldFetchTags, fetchTags] = React.useState(false);

  const { data, error } = useSWR<ITagsResponse>(
    shouldFetchTags
      ? `/api/tags?${new URLSearchParams({ url: image.url })}`
      : null,
    { suspense: false },
  );

  React.useEffect(() => {
    if (error) {
      alert("Couldn't load tags 😱");
    }
  }, [error]);

  return <ImageTile {...image} tags={data?.tags} fetchTags={fetchTags} />;
};

export default ImageTileContainer;
