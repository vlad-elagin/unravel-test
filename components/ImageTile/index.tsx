import React from 'react';
import Image from 'next/image';
import useSWR from 'swr';

import { IImage, ITagsResponse } from 'interfaces';

type IImageTileProps = IImage & {
  tags?: string[];
  fetchTags: (val: boolean) => void;
};

const ImageTile: React.FC<IImageTileProps> = ({
  tags,
  fetchTags,
  id,
  blurHash,
  height,
  width,
  url,
  description,
}) => {
  const imageAspectRatio = Number((height / width).toFixed(2)) * 100;

  return (
    <figure
      className="mb-8 cursor-pointer break-inside-avoid"
      onClick={() => fetchTags(true)}
    >
      <div className="relative" style={{ paddingTop: `${imageAspectRatio}%` }}>
        <Image
          src={url}
          alt={`${description}, ${tags && 'keywords:' + tags.join(',')}`}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          className="rounded-xl object-cover"
          priority
          fill
          placeholder="blur"
          blurDataURL={blurHash}
        />
      </div>

      <figcaption className="mt-4">
        <span className="mb-4 block text-xl font-bold text-_navy">
          {description}
        </span>

        {tags ? (
          <div className="flex flex-wrap">
            {tags.map((t) => (
              <span
                key={`${id}-${t}`}
                className="mr-2 mb-2 block bg-_grey px-2.5 py-2 text-_navy"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </figcaption>
    </figure>
  );
};

export default ImageTile;
