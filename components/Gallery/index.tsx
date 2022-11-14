import React from 'react';

import ImageTile from '@components/ImageTile';
import { useGallery } from 'hooks/gallery';
import Preloader from '@components/Preloader';

const Gallery: React.FC = () => {
  const { images, isLoading } = useGallery();

  return (
    <div className="flex min-h-[250px] w-full items-center justify-center">
      {!images && !isLoading ? (
        <span className="text-xl">
          Start searching to see something awesome
        </span>
      ) : null}

      {isLoading ? <Preloader /> : null}

      {!isLoading && images ? (
        <div className="columns-1 gap-8 md:columns-2 lg:columns-4">
          {images.map((img) => (
            <ImageTile key={img.id} {...img} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Gallery;
