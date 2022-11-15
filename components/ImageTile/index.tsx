import React from 'react';
import Image from 'next/image';
import useSWR from 'swr';

import { IImage, ITagsResponse } from 'interfaces';

const ImageTile: React.FC<IImage> = (image) => {
  const [shouldFetchTags, fetchTags] = React.useState(false);

  const { data, error } = useSWR<ITagsResponse>(
    shouldFetchTags
      ? `/api/tags?${new URLSearchParams({ url: image.url })}`
      : null,
    { suspense: false },
  );

  React.useEffect(() => {
    if (error) {
      alert("Couldn't load tags 😱");
    }
  }, [error]);

  const imageAspectRatio =
    Number((image.height / image.width).toFixed(2)) * 100;

  return (
    <figure
      className="mb-8 cursor-pointer break-inside-avoid"
      onClick={() => fetchTags(true)}
    >
      <div className="relative" style={{ paddingTop: `${imageAspectRatio}%` }}>
        <Image
          src={image.url}
          alt={`${image.description}, ${
            data?.tags && 'keywords:' + data?.tags.join(',')
          }`}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          className="relative rounded-xl object-cover"
          priority
          fill
          placeholder="blur"
          blurDataURL={image.blurHash}
        />
      </div>

      <figcaption className="mt-4">
        <span className="mb-4 block text-xl font-bold text-_navy">
          {image.description}
        </span>

        {data?.tags ? (
          <div className="flex flex-wrap">
            {data.tags.map((t) => (
              <span
                key={`${image.id}-${t}`}
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
