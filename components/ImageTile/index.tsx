import React from 'react';
import Image from 'next/image';

import { IImage } from 'interfaces';
import clsx from 'clsx';

const tags = ['test', 'test', 'test'];

const ImageTile: React.FC<IImage> = (image) => {
  return (
    <figure className="mb-8 break-inside-avoid">
      <div
        className={clsx('relative', {
          'h-[480px]': image.orientation === 'portrait',
          'h-[215px]': image.orientation === 'landscape',
        })}
      >
        <Image
          src={image.url}
          alt={image.description}
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          className="relative rounded-xl object-cover"
        />
      </div>

      <figcaption className="mt-4">
        <span className="mb-4 block text-xl font-bold text-_navy">
          {image.description}
        </span>

        <div className="flex">
          {tags.map((t) => (
            <span
              key={t}
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