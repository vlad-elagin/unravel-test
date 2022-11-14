import React from 'react';
import useSWR from 'swr';

import ImageTile from '@components/ImageTile';
import { IImagesResponse } from 'interfaces';

const Gallery: React.FC<{ query: string }> = ({ query }) => {
  const requestQuery = new URLSearchParams({ query });
  const { data } = useSWR<IImagesResponse>(
    '/api/images?' + requestQuery.toString(),
  );

  if (!data) {
    return null;
  }

  const { images } = data;

  return (
    <div className="columns-1 gap-8 md:columns-2 lg:columns-4">
      {images?.map((img) => (
        <ImageTile key={img.id} {...img} />
      ))}
    </div>
  );
};

export default Gallery;
