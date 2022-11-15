import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@utils/const';
import { IImage, IImagesResponse } from 'interfaces';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getTags } from 'services/imagga';
import unsplash from 'services/unsplash';

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

        const { results, total } = response;

        const parsedImages: IImage[] = results.map((img) => ({
          id: img.id,
          description: img.alt_description || 'No description 😒',
          url: img.urls.regular,
          width: img.width,
          height: img.height,
        }));

        // get tags
        // const tags = await Promise.allSettled(
        //   parsedImages.map((i) => getTags(i.url)),
        // );

        res.status(200).send({ images: parsedImages, total });
      } catch (err) {
        console.log(err);

        res.status(500).send({});
      }
      return;

    default:
      res.status(404).send({});
  }
}
