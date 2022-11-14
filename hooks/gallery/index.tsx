import React from 'react';
import { IImage, IImagesRequest } from 'interfaces';

interface IGalleryContext {
  images: IImage[];
  loadImages: (query: string) => void;
}

const GalleryContext = React.createContext<IGalleryContext>({
  images: [],

  // stubs to be overwritten
  loadImages: () => {},
});

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [images, setImages] = React.useState<IImage[]>([]);

  const loadImages = async (query: string) => {
    try {
      const requestQuery = new URLSearchParams({ query });

      const res = await fetch('/api/images?' + requestQuery.toString());
      const { loadedImages } = await res.json();

      if (!loadedImages) {
        throw new Error();
      }

      console.log(loadedImages);
      setImages(loadedImages);
    } catch (err) {
      alert("Couldn't load images 😒");
    }
  };

  return (
    <GalleryContext.Provider value={{ images, loadImages }}>
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => React.useContext(GalleryContext);
