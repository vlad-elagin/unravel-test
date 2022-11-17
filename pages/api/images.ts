import type { NextApiRequest, NextApiResponse } from 'next';
import { decode } from 'blurhash';
import sharp from 'sharp';

import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@utils/const';
import { IImage, IImagesResponse } from 'interfaces';
import unsplash from 'services/unsplash';

/**
 * Convert base84 encoded blurhash to base64 image.
 * NOTE: this can't be moved outside of /api folder since webpack will try to include it
 * into client build, and sharp can't be used client-side
 */
export const blurhashToDataUrl = async (
  hash: string,
  width: number = 100,
  height: number = 100,
) => {
  const u8 = decode(hash, width, height);
  const blurDataUrlBuffer = await sharp(u8, {
    raw: {
      channels: 4,
      width,
      height,
    },
  })
    .jpeg({
      overshootDeringing: true,
      quality: 40,
    })
    .toBuffer();

  return `data:image/jpeg;base64,${blurDataUrlBuffer.toString('base64')}`;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IImagesResponse>,
) {
  switch (req.method) {
    case 'GET':
      const { query, limit = DEFAULT_LIMIT, page = DEFAULT_PAGE } = req.query;

      if (!query) {
        res.status(403).send({});
        return;
      }

      // get images
      try {
        const { status, response } = await unsplash.search.getPhotos({
          query: query as string,
          orderBy: 'relevant',
          page: parseInt(page as string),
          perPage: parseInt(limit as string),
        });

        if (status !== 200 || !response?.results.length) {
          throw new Error();
        }

        const { results } = response;

        const parsedImages: IImage[] = await Promise.all(
          results.map(async (img) => ({
            id: img.id,
            description: img.alt_description || 'No description 😒',
            url: img.urls.regular,
            width: img.width,
            height: img.height,
            blurHash: await blurhashToDataUrl(
              img.blur_hash!,
              Math.round(img.width / 100),
              Math.round(img.height / 100),
            ),
          })),
        );

        res.status(200).send({ images: parsedImages });
      } catch (err) {
        res.status(500).send({ images: [] });
      }
      return;

    default:
      res.status(404).send({});
  }
}
