export type IPagination = {
  page: number;
  limit: number;
};

export type IImagesRequest = IPagination & { query: string };

export type IImage = {
  id: string;
  url: string;
  description: string;

  /**
   * Calculated property which affects height of image tile
   */
  orientation: 'portrait' | 'landscape';

  // tags: string[];
};

export type IImagesResponse = {
  images?: IImage[];
};
