import React from 'react';
import Masonry from '@mui/lab/Masonry';

import { IImage } from 'interfaces';
import ImageTileContainer from 'containers/ImageTile';

const Gallery: React.FC<{ images: IImage[] }> = ({ images }) => {
  return (
    <Masonry className="mb-4" spacing={4} columns={{ xs: 1, sm: 2, lg: 4 }}>
      {images.map((img) => (
        <ImageTileContainer key={img.id} {...img} />
      ))}
    </Masonry>
  );
};

export default Gallery;
