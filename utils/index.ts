import { decode } from 'blurhash';
import { createCanvas } from 'canvas';

export const blurhashToDataUrl = (
  hash: string,
  width: number = 100,
  height: number = 100,
) => {
  const u8 = decode(hash, width, height);
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(width, height);
  imageData.data.set(u8);
  ctx.putImageData(imageData, 0, 0);
  const blurDataUrl = canvas.toDataURL();
  return blurDataUrl;
};

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
