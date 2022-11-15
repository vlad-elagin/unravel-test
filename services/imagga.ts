import got from 'got';

if (!process.env.IMAGGA_API_KEY || !process.env.IMAGGA_API_SECRET) {
  throw new Error("Imagga credentials wasn't provided!");
}

export const getTags = async (imageUrl: string): Promise<string[]> => {
  const res = await got(
    'https://api.imagga.com/v2/tags?limit=4&image_url=' +
      encodeURIComponent(imageUrl),
    {
      username: process.env.IMAGGA_API_KEY,
      password: process.env.IMAGGA_API_SECRET,
    },
  );

  const body = JSON.parse(res.body) as {
    result: { tags: [{ tag: { en: string } }] };
  };

  const {
    result: { tags },
  } = body;

  return tags.map((r) => r.tag.en);
};
