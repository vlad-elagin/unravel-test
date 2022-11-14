import React from 'react';
import Image from 'next/image';

import { IImage } from 'interfaces';
import clsx from 'clsx';

const tags = ['tag1', 'tag2', 'tag3'];

const ImageTile: React.FC<IImage> = (image) => {
  const imageAspectRatio =
    Number((image.height / image.width).toFixed(2)) * 100;

  return (
    <figure className="mb-8 break-inside-avoid">
      <div className="relative" style={{ paddingTop: `${imageAspectRatio}%` }}>
        <Image
          src={image.url}
          alt={image.description}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          className="relative rounded-xl object-cover"
          priority
          placeholder="blur"
          blurDataURL={image.blurHash}
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
