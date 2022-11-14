export type IPagination = {
  page: number;
  limit: number;
};

export type IImagesRequest = IPagination & { query: string };

export type IImage = {
  id: string;
  url: string;
  description: string;
  // tags: string[];
};

export type IImagesResponse = {
  images?: IImage[];
};
