import React from 'react';
import Image from 'next/image';
import useSWR from 'swr';

import { IImage } from 'interfaces';

const tags = ['tag1', 'tag2', 'tag3'];

const ImageTile: React.FC<IImage> = (image) => {
  const { data: imageDataUrl } = useSWR(image.url, (url) =>
    fetch(url)
      .then((res) => res.blob())
      .then((res) => URL.createObjectURL(res)),
  );

  if (!imageDataUrl) {
    return null;
  }

  const imageAspectRatio =
    Number((image.height / image.width).toFixed(2)) * 100;

  return (
    <figure className="mb-8 break-inside-avoid">
      <div className="relative" style={{ paddingTop: `${imageAspectRatio}%` }}>
        <Image
          src={imageDataUrl}
          alt={image.description}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          className="relative rounded-xl object-cover"
          priority
          fill
        />
      </div>

      <figcaption className="mt-4">
        <span className="mb-4 block text-xl font-bold text-_navy">
          {image.description}
        </span>

        <div className="flex">
          {tags.map((t) => (
            <span
              key={`${image.id}-${t}`}
              className="mr-2 block bg-_grey px-2.5 py-2 text-_navy"
            >
              {t}
            </span>
          ))}
        </div>
      </figcaption>
    </figure>
  );
};

export default ImageTile;
