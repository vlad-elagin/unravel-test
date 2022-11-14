import { createApi } from 'unsplash-js';
import * as nodeFetch from 'node-fetch';

if (!process.env.UNSPLASH_ACCESS_KEY) {
  throw new Error("Unsplash access key wasn't provided!");
}

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: nodeFetch.default as unknown as typeof fetch,
});

export default unsplash;
