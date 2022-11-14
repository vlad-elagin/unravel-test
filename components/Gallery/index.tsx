import React from 'react';

import ImageTile from '@components/ImageTile';
import { useGallery } from 'hooks/gallery';

const Gallery: React.FC = () => {
  const { images } = useGallery();

  return (
    <div className="min-h-[150px] w-full columns-1 gap-8 md:columns-2 lg:columns-4">
      {images.map((img) => (
        <ImageTile key={img.id} {...img} />
      ))}
    </div>
  );
};

export default Gallery;
