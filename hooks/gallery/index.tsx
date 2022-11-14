import React from 'react';
import { IImage, IImagesResponse } from 'interfaces';

interface IGalleryContext {
  images: IImage[] | null;
  isLoading: boolean;
  loadImages: (query: string) => void;
}

const GalleryContext = React.createContext<IGalleryContext>({
  images: null,
  isLoading: false,

  // stubs to be overwritten
  loadImages: () => {},
});

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setLoading] = React.useState(false);
  const [images, setImages] = React.useState<IImage[] | null>(null);

  const loadImages = async (query: string) => {
    setLoading(true);
    try {
      const requestQuery = new URLSearchParams({ query });

      const res = await fetch('/api/images?' + requestQuery.toString());
      const { images: loadedImages } = (await res.json()) as IImagesResponse;

      if (!loadedImages) {
        throw new Error();
      }

      setImages(loadedImages);
    } catch (err) {
      alert("Couldn't load images 😒");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GalleryContext.Provider value={{ images, isLoading, loadImages }}>
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => React.useContext(GalleryContext);
