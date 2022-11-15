import { IImagesResponse, ITagsResponse } from 'interfaces';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getTags } from 'services/imagga';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ITagsResponse>,
) {
  switch (req.method) {
    case 'GET':
      const { url } = req.query;

      if (!url) {
        res.status(403).send({});
        return;
      }

      try {
        // get tags
        const tags = await getTags(url as string);

        res.status(200).send({ tags });
      } catch (err) {
        res.status(500).send({});
      }
      return;

    default:
      res.status(404).send({});
  }
}
